import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { type } from 'os';
import { useEffect, useState } from 'react';
import { plantName, shoppingCartStyle } from '../components/elements';
import Header from '../components/Header';
import Layout from '../components/Layout';
import {
  deleteCookie,
  getParsedCookie,
  setParsedCookie,
} from '../util/cookies';
import { readPlants } from '../util/database';

export default function ShoppingCart(props) {
  const [sumItems, setSumItems] = useState([]);
  const currentCookies = getParsedCookie('cart');
  const [cookieOfCartItems, setCookieOfCartItems] = useState(
    props.currentCookies,
  );

  console.log('ShoppingCartCookie:', cookieOfCartItems);
  console.log('ShoppingCartCookie:', typeof cookieOfCartItems);

  let sumofCartItems = 0;
  let sum = [];

  function eventHandler(id, quan) {
    console.log('id:', id, 'quan:', quan);

    // delete item from shopping cart
    const newCartCookie = cookieOfCartItems.filter(
      (event) => event.plantId !== id,
    );

    console.log('newCartCookie', newCartCookie);
    console.log('newCartCookie Type', typeof newCartCookie);
    // useEffect(() => {
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
    // }, [newCartCookie]);

    console.log('cookieOfCartItem', cookieOfCartItems);
  }

  if (cookieOfCartItems === undefined || !cookieOfCartItems.length) {
    return (
      <Layout>
        <Head>
          <title>Shopping Cart Items</title>
          <meta name="description" content="Your Shopping Cart" />
        </Head>

        <section>
          <h1> Upps - your cart is empty</h1>
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
                      <div>Price: {element.price}</div>
                      <div>Quantity: {cookie.quantity}</div>
                      <div>
                        total:{' '}
                        {
                          (sumofCartItems = (
                            element.price * cookie.quantity
                          ).toFixed(2))
                        }
                        {sum.push(sumofCartItems)}
                      </div>

                      <button
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
        {/* {console.log('PlantsPlants:', props.plants)}
        <article css={articleOneShoppingCartStyle}>
          {props.plants.map((element) => {
            return (
              <div key={`cartItems_${props.plants.id}`}>
                <p>
                  {element.id} {element.price}
                </p>
                ;
              </div>
            );
          })}
        </article> */}

        <article>
          <div>
            <h2>Order Summary</h2>
            <div>
              <p>
                <span>Total:</span>
              </p>
              <p>{sum.reduce((a, b) => a + b)}</p>
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
