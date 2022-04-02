// import { css } from '@emotion/react';
// import Cookies from 'js-cookie';
// import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
// import { type } from 'os';
// import { useEffect, useState } from 'react';
import { useState } from 'react';
import {
  plantName,
  shoppingCartStyle,
  underConstruction,
} from '../components/elements';
// import Header from '../components/Header';
import Layout from '../components/Layout';
import {
  deleteCookie,
  // getParsedCookie,
  setParsedCookie,
} from '../util/cookies';
import { readPlants } from '../util/database';
import { cartTotalPrice, multiplePriceAndQuantity } from '../util/functions';

export default function ShoppingCart(props) {
  // const currentCookies = getParsedCookie('cart');
  const [cookieOfCartItems, setCookieOfCartItems] = useState(
    props.currentCookies,
  );

  console.log('ShoppingCartCookie:', cookieOfCartItems);
  console.log('ShoppingCartCookie:', typeof cookieOfCartItems);

  let singlePlantPriceTotal = 0;
  const cartSubTotalPrice = [];

  function eventHandler(id, quan) {
    console.log('id:', id, 'quan:', quan);

    // delete item from shopping cart
    const newCartCookie = cookieOfCartItems.filter(
      (event) => event.plantId !== id,
    );

    /* delete cookies from cart*/
    if (newCartCookie.length) {
      newCartCookie.forEach((cookie) => {
        setParsedCookie('cart', [cookie]);
      });
      setCookieOfCartItems(newCartCookie);
    } else {
      deleteCookie('cart');
      setCookieOfCartItems([]);
    }
  }

  if (cookieOfCartItems === undefined || !cookieOfCartItems.length) {
    return (
      <Layout>
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

  return (
    <Layout>
      <Head>
        <title>Shopping Cart Items</title>
        <meta name="description" content="Your Shopping Cart" />
      </Head>

      <section>
        <h1>Your Cart</h1>
      </section>

      <section css={shoppingCartStyle}>
        <article>
          {props.plants.map((element) => {
            return (
              /* Anfang return 1*/

              cookieOfCartItems.map((cookie) => {
                return (
                  /* Anfang Return 2*/
                  element.id === cookie.plantId && (
                    <div key={`cartItems_${props.plants.id}`}>
                      <div>
                        <Image
                          src={`/image0${cookie.plantId}.jpeg`}
                          width="98,25"
                          height="122,87"
                          alt="succulenten1"
                        />
                        <div css={plantName}>{element.name}</div>
                      </div>
                      <div>Price: € {element.price}</div>
                      <div>Quantity: {cookie.quantity}</div>
                      <div>
                        total: €
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
                          eventHandler(cookie.plantId, cookie.quantity)
                        }
                      >
                        x
                      </button>
                    </div>
                  )
                ); /* Ende Return 2 */
              })
            ); /* Ende return 1*/
          })}
        </article>

        <article>
          <div>
            <h2>Order Summary</h2>
            <div>
              <p>
                <span>Total:</span>
              </p>

              <p>€ {cartTotalPrice(cartSubTotalPrice)}</p>
            </div>

            <Link href="/checkout" passHref>
              <button data-test-id="cart-checkout">CHECKOUT</button>
            </Link>
          </div>
        </article>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // const plantID = context.query.plantID;
  const cartCookies = context.req.cookies.cart || '[]';
  const cartObjectCookie = JSON.parse(cartCookies);

  const plants = await readPlants();
  console.log('Cart:', plants);
  return {
    props: {
      plants: plants,
      currentCookies: cartObjectCookie,
    },
  };
}
