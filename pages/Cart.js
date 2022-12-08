import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
// import { product } from 'puppeteer';
import { useEffect, useState } from 'react';
import {
  plantName,
  shoppingCartSectionHeader,
  shoppingCartStyle,
  underConstruction,
} from '../components/elements';
import Layout from '../components/Layout';
import { disableGrayLayer } from '../hooks';
import { deleteCookie, setParsedCookie } from '../util/cookies';
import { getPlantsById } from '../util/database';
import {
  addAndUpdateQuantityInCookie,
  multiplePriceAndQuantity,
} from '../util/functions';

export default function ShoppingCart(props) {

  const [cookieOfCartItems, setCookieOfCartItems] = useState(
    props.cartCookie,
  );

const [cartProducts, setCartProducts] = useState(props.plants)
const [amountOfProducts, setAmountOfProducts] = useState(0);


useEffect(() => {
  // Update cart
    const updateProducts = cartProducts;
    updateProducts.forEach((e) => {
          e.quantity = cookieOfCartItems.find((c) => Number(c.plantId) === e[0].id).quantity
      })
      setCartProducts(updateProducts);
    },[cartProducts,cookieOfCartItems])


useEffect(() => {
  // amount of products in cart
  const sumOfProducts = cartProducts.reduce((accumulator,product) => accumulator + product.quantity,0)
   setAmountOfProducts(sumOfProducts);
},[cartProducts, cookieOfCartItems])


const totalPrice = cartProducts.reduce((accumulator,product) => accumulator + product[0].price * product.quantity,0)

const options = [
    {value:"1", text: 1},
    {value:"2", text: 2},
    {value:"3", text: 3},
    {value:"4", text: 4},
    {value:"5", text: 5},
    {value:"6", text: 6},
    {value:"7", text: 7},
    {value:"8", text: 8},
    {value:"9", text: 9},
    {value:"10", text: 10},
  ]



  const RemoveProductFromCart = (id) => {
    // filter cookie
    const newCartCookie = cookieOfCartItems.filter(
        (plant) => Number(plant.plantId) !== id,
    );

    // filter current products in cart
    const newCartProduct = cartProducts.filter(
        (plant) => Number(plant[0].id) !== id,
    );

    // update cart
    setCartProducts(newCartProduct);


    // update cookie
    if (newCartCookie.length) {
       setCookieOfCartItems(newCartCookie);
       setParsedCookie('cart', newCartCookie);
    } else {
        deleteCookie('cart');
        setCookieOfCartItems([]);
       // setCartProducts([]);
      }
  }


  function updateCartQuantity(plantId, newPlantQuantity) {
    // update quantity
    const add = false;
    const newCookie = addAndUpdateQuantityInCookie(
      plantId,
      newPlantQuantity,
      cookieOfCartItems,
      add,
    );
     setCookieOfCartItems(newCookie);
     setParsedCookie('cart', newCookie);
}



disableGrayLayer(props.showGrayLayer, props.setShowGrayLayer)


  // case: no cookie set
  if (cookieOfCartItems === undefined || !cookieOfCartItems.length) {
    return (
      <Layout
      showGrayLayer={props.showGrayLayer}
      setShowGrayLayer={props.setShowGrayLayer}
      >
        <Head>
          <title>Shopping Cart Items</title>
          <meta name="description" content="Your Shopping Cart" />
        </Head>
        <section css={underConstruction}>
          <h1> Your cart is currently empty.</h1>
          <Link href="/Products" passHref>
            <button>Continue Shopping</button>
          </Link>
        </section>
      </Layout>
    );
  }

 // case: cookie set
  return (
    <Layout
    showGrayLayer={props.showGrayLayer}
    setShowGrayLayer={props.setShowGrayLayer}
    >
      <Head>
        <title>Shopping Cart Items</title>
        <meta name="description" content="Your Shopping Cart" />
      </Head>

      <section css={shoppingCartSectionHeader}>
        {amountOfProducts  > 1 ? <h1>Your Cart ({amountOfProducts} Products)</h1> :
        <h1>Your Cart ({amountOfProducts} Product)</h1>}
      </section>

      <section css={shoppingCartStyle}>
        <article>
              {cartProducts.map((plant) => {
                return (
                    <div key={`cartItems_${plant[0].id}`}>
                          <div>
                              <Link href={`/Products/${plant[0].id}`} passHref>
                                  <a>
                                      <Image
                                        src={`/image0${plant[0].id}.jpeg`}
                                        width="98,25"
                                        height="122,87"
                                        alt="succulenten1"
                                      />
                                  </a>
                              </Link>
                          </div>
                          <div>
                              <div css={plantName}>{plant[0].name}</div>
                        <div>
                          <select value={plant.quantity}
                            onChange={(e) => updateCartQuantity(
                              Number(plant[0].id),
                              Number(e.target.value)
                              )}
                              >
                                {options.map(option => (
                                  <option key={option.value} value={option.value}>
                                    {option.text}
                                  </option>
                                ))}
                          </select>
                              </div>
                              <div>
                                €
                                {
                                  multiplePriceAndQuantity(
                                    Number(plant[0].price),
                                    plant.quantity,
                                  ).toFixed(2)
                                }
                              </div>
                              <button
                                data-test-id="delete item from cart"
                                onClick={() =>
                                  RemoveProductFromCart(plant[0].id, plant.quantity)
                                }
                              >
                                remove
                              </button>
                          </div>
                    </div>

                ); /* end loop over cookie */

          })}

        </article>

        <article>
          <div>
            <h2>Total</h2>
            <div>
              <p>
                  <span>Subtotal</span>
                  <span>{totalPrice.toFixed(2)}</span>
              </p>
              <p>
                  <span>Delivery</span>
                  <span>€ 0.00</span>
              </p>
            </div>
            <div>
            <p>
                <span>Total (VAT included)</span>
                <span>€ {totalPrice.toFixed(2)}</span>
            </p>
            <Link href="/checkout" passHref>
              <button data-test-id="cart-checkout">Go to checkout</button>
            </Link>
            </div>
          </div>
        </article>
      </section>
    </Layout>


  );
}

export async function getServerSideProps(context) {
  // const plantID = context.query.plantID;
  const cartCookies = context.req.cookies.cart || '[]';
  const cartCookie = JSON.parse(cartCookies);


  // get only plants in cartCookie from DB
  const plantIds = cartCookie.map( event => event.plantId)
  console.log("plantIds: ", plantIds)
  const plants = await getPlantsById(plantIds);
  // todo: plants return is: [[{}],[{}]]

  // combine product info with cookie info:
  const plantsAndQuantity = plants.map( plant => {
    return {
      ...plant,
      quantity: cartCookie.find(
        productObject => plant[0].id === Number(productObject.plantId)).quantity || 0,
    }
  })

return {
    props: {
      plants: plantsAndQuantity,
      cartCookie: cartCookie,
    },
  };
}
