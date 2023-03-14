import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  plantName,
  shoppingCartSectionHeader,
  shoppingCartStyle,
  underConstruction,
} from '../components/elements';
import LayoutCart from '../components/LayoutNoHeader';
import OrderSummeryCart from '../components/OrderSummaryCart';
import ProductImageSmall from '../components/ProductImageSmall';
import { disableGrayLayer } from '../hooks';
import {
  deleteCookie,
  getParsedCookie,
  setParsedCookie,
} from '../util/cookies';
import { getPlantsById } from '../util/database';
import {
  addAndUpdateQuantityInCookie,
  multiplePriceAndQuantity,
} from '../util/functions';
import { CartCookieTwo, PlantsAndQuantity } from './types';

type Props = {
  plants: PlantsAndQuantity[];
  showGrayLayer: boolean;
  setShowGrayLayer: Dispatch<SetStateAction<boolean>>;
};

export default function ShoppingCart(props: Props) {
  const [cartProducts, setCartProducts] = useState(props.plants);
  const [amountOfProducts, setAmountOfProducts] = useState(0);

  disableGrayLayer(props.showGrayLayer, props.setShowGrayLayer);
  console.log('cartPPPLants: ', cartProducts);

  useEffect(() => {
    // update amount of products in cart
    const sumOfProducts = cartProducts.reduce(
      (accumulator, product) => accumulator + (product.quantity ?? 0),
      0,
    );
    setAmountOfProducts(sumOfProducts);
  }, [cartProducts]);

  // calculate total price
  const totalPrice = cartProducts.reduce(
    (accumulator, product) =>
      accumulator + product.price * (product.quantity || 0),
    0,
  );

  //Use map to generate the options for the select element, instead of manually typing them out.
  const options = Array.from({ length: 10 }, (_, i) => i + 1).map((i) => ({
    value: i.toString(),
    text: i,
  }));

  const RemoveProductFromCart = (id: number) => {
    // cookie
    const currentCookie = getParsedCookie('cart');
    const updateCookie =
      currentCookie?.filter((plant) => Number(plant.plantId) !== id) ?? [];

    if (updateCookie?.length) {
      setParsedCookie('cart', updateCookie);
    } else {
      deleteCookie('cart');
      setCartProducts([]);
    }

    //cart
    const updateCartItems = cartProducts.filter(
      (plant) => Number(plant.id) !== id,
    );
    setCartProducts(updateCartItems);
  };

  const updateCartQuantity = (plantId: number, newPlantQuantity: number) => {
    // update quantity
    const cartCookie = getParsedCookie('cart');
    if (cartCookie) {
      const newCookie = addAndUpdateQuantityInCookie(
        plantId,
        newPlantQuantity,
        cartCookie,
      );

      // cart
      const newCartQuantity = cartProducts.map((product) => {
        if (product.id === plantId) {
          product.quantity = newPlantQuantity;
        }
        return product;
      });
      setCartProducts(newCartQuantity);
      setParsedCookie('cart', newCookie);
    }
  };

  // case: no cookie set
  if (!cartProducts.length) {
    return (
      <LayoutCart
        showGrayLayer={props.showGrayLayer}
        setShowGrayLayer={props.setShowGrayLayer}
      >
        <Head>
          <title>Shopping Cart Items</title>
          <meta name="description" content="Your Shopping Cart" />
        </Head>
        <section css={underConstruction}>
          <h1> Your cart is currently empty.</h1>
          <Link href="/products" passHref>
            <button>Continue Shopping</button>
          </Link>
        </section>
      </LayoutCart>
    );
  }

  cartProducts.map((plant) => {
    plant.slugName = plant.name.toLowerCase().replace(/\s+/g, '-');
  });
  const cartItems = (
    <section css={shoppingCartSectionHeader}>
      {amountOfProducts > 1 ? (
        <h1>Your Cart ({amountOfProducts} Products)</h1>
      ) : (
        <h1>Your Cart ({amountOfProducts} Product)</h1>
      )}
    </section>
  );

  // case: cookie set
  return (
    <LayoutCart
      showGrayLayer={props.showGrayLayer}
      setShowGrayLayer={props.setShowGrayLayer}
    >
      <Head>
        <title>Shopping Cart Items</title>
        <meta name="description" content="Your Shopping Cart" />
      </Head>
      {cartItems}
      <section css={shoppingCartStyle}>
        <article>
          {cartProducts.map((plant) => {
            return (
              <div key={`cartItems_${plant.id}`}>
                <div>
                  <Link href={`/product/${plant.slugName}`} passHref>
                    <a>
                      <ProductImageSmall src={`/image0${plant.id}.jpeg`} />
                    </a>
                  </Link>
                </div>
                <div>
                  <div css={plantName}>{plant.name}</div>
                  <div>
                    <select
                      value={plant.quantity}
                      onChange={(e) =>
                        updateCartQuantity(
                          Number(plant.id),
                          Number(e.target.value),
                        )
                      }
                    >
                      {options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.text}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    €
                    {multiplePriceAndQuantity(
                      Number(plant.price),
                      Number(plant.quantity),
                    ).toFixed(2)}
                  </div>
                  <button
                    data-test-id="delete item from cart"
                    onClick={() => RemoveProductFromCart(plant.id)}
                  >
                    remove
                  </button>
                </div>
              </div>
            );
          })}
        </article>
        <OrderSummeryCart totalPrice={Number(totalPrice.toFixed(2))} />
      </section>
    </LayoutCart>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<{ plants: PlantsAndQuantity[] }>> {
  const cartCookie: { plantId: number; quantity: number }[] = JSON.parse(
    context.req.cookies.cart || '[]',
  );

  console.log('second cartCookies: ', cartCookie);

  // typescript narrowing
  if (typeof cartCookie === 'undefined') {
    return {
      props: {
        plants: [],
      },
    };
  }

  // get current products in cookie from db by ids
  const plantIds = cartCookie.map((event) => event.plantId);

  const plants = await getPlantsById(plantIds);
  // combine db-product info with cookie info:
  console.log('PLANTS: ', plants);
  console.log('typeof PLANTS: ', typeof plants);

  const plantsAndQuantity = plants.map((plant) => {
    return {
      ...plant,
      quantity:
        cartCookie.find((productObject) => plant.id === productObject.plantId)
          ?.quantity || 0,
    };
  });

  console.log('plantsAndQuantity', plantsAndQuantity);

  // todo: plants return is: [[{}],[{}]]

  return {
    props: {
      plants: plantsAndQuantity,
    },
  };
}
