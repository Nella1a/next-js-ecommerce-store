import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  plantName,
  shoppingCartSectionHeader,
  shoppingCartStyle,
  underConstruction,
} from '../components/elements';
import Layout from '../components/Layout';
import { disableGrayLayer } from '../hooks';
import { deleteCookie, setParsedCookie } from '../util/cookies';
import { readPlants } from '../util/database';
import {
  addAndUpdateQuantityInCookie,
  cartTotalPrice,
  multiplePriceAndQuantity,
} from '../util/functions';

export default function ShoppingCart(props) {

  const [cookieOfCartItems, setCookieOfCartItems] = useState(
    props.cartCookie,
  );

  disableGrayLayer(props.showGrayLayer, props.setShowGrayLayer)



  let singlePlantPriceTotal = 0;
  const cartSubTotalPrice = [];

  let sumOfProducts = 0
  cookieOfCartItems.forEach((product) => {
     sumOfProducts += product.quantity;



  })

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



  function removeProductFromCart(id) {

    // remove product from shopping
    const newCartCookie = cookieOfCartItems.filter(
        (plant) => plant.plantId !== id,
    );

    // remove product from cookie
    if (newCartCookie.length) {
         setParsedCookie('cart', newCartCookie);
         setCookieOfCartItems(newCartCookie);
    } else {
        deleteCookie('cart');
        setCookieOfCartItems([]);
      }
  }



  function updateCartQuantity(plantId, newPlantQuantity) {

    const add = false
    const newCookie = addAndUpdateQuantityInCookie(
      plantId,
      newPlantQuantity,
      cookieOfCartItems,
      add,
    );
     setCookieOfCartItems(newCookie);
     setParsedCookie('cart', newCookie);
}


  // case: no cookie set
  if (cookieOfCartItems === undefined || !cookieOfCartItems.length) {
    return (
      <Layout
      showGrayLayer={props.showRespMenue}
      setShowGrayLayer={props.setShowRespMenue}
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
        {sumOfProducts > 1 ? <h1>Your Cart ({sumOfProducts} Products)</h1> :
        <h1>Your Cart ({sumOfProducts} Product)</h1>}
      </section>

      <section css={shoppingCartStyle}>
        <article>
          {/* loop over data from DB */}
          {props.plants.map((element) => {
            return (
               /* loop over cookie */
              cookieOfCartItems.map((cookie, index) => {
                return (

                  Number(element.id) === Number(cookie.plantId) && (
                    <div key={`cartItems_${props.plants.id}`}>
                          <div>
                              <Link href={`/Products/${element.id}`} passHref>
                                  <a>
                                      <Image
                                        src={`/image0${cookie.plantId}.jpeg`}
                                        width="98,25"
                                        height="122,87"
                                        alt="succulenten1"
                                      />
                                  </a>
                              </Link>
                          </div>
                          <div>
                              <div css={plantName}>{element.name}</div>
{/*                               <div>Price: € {element.price}</div>
 */}                          <div>
                              <select value={cookie.quantity}
                            onChange={(e) => updateCartQuantity(
                              cookie.plantId,
                              Number(e.target.value),
                              index
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
                                  (singlePlantPriceTotal = multiplePriceAndQuantity(
                                    element.price,
                                    cookie.quantity,

                                  ))
                                }
                                {cartSubTotalPrice.push(singlePlantPriceTotal)}
                              </div>

                              <button
                                data-test-id="delete item from cart"
                                onClick={() =>
                                  removeProductFromCart(cookie.plantId, cookie.quantity)
                                }
                              >
                                remove
                              </button>
                          </div>
                    </div>
                  )
                ); /* end loop over cookie */
              })
            ); /* end loop over */
          })}

        </article>

        <article>
          <div>
            <h2>Total</h2>
            <div>
              <p>
                  <span>Subtotal</span>
                  <span>xxx</span>
              </p>
              <p>
                  <span>Delivery</span>
                  <span>€ 0.00</span>
              </p>

            </div>
            <div>
            <p>
                <span>Total (VAT included)</span>
                <span>€ {cartTotalPrice(cartSubTotalPrice)}</span>
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

  const plants = await readPlants();
  console.log('Cart_plants:', plants[0].plantId);
  console.log("CART_cartCookieObject: ", cartCookie)
  return {
    props: {
      plants: plants,
      cartCookie: cartCookie,
    },
  };
}
