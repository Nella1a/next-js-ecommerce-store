import { css, Global } from '@emotion/react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Layout from '../components/Layout';

const styleheaderone = css`
  margin: 0 auto;
`;

const sectionShoppingCartStyle = css`
  display: flex;
  gap: 96px;
`;

const articleOneShoppingCartStyle = css`
  width: 70%;
  /* background-color: grey; */
  /* border: 1px solid red; */

  div:first-of-type {
    display: flex;
    justify-content: space-around;
    align-items: center;

    height: 256px;
    border-top: 1px solid grey;
    border-bottom: 1px solid grey;
  }
`;

const articleTwoshoppingCartStyle = css`
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 32px;
  background-color: grey;
`;

const divOrderSummaryStyle = css`
  display: flex;
  justify-content: space-around;
`;

function getParsedCookie(key) {
  try {
    return JSON.parse(Cookies.get(key));
  } catch (err) {
    return undefined;
  }
}

export default function ShoppingCart(props) {
  const currentCookies = getParsedCookie('cart');
  console.log('ShoppingCartCookie:', currentCookies);
  console.log('ShoppingCartCookie:', typeof currentCookies);

  return (
    <Layout>
      <Head>
        <title>Shopping Cart Items</title>
        <meta name="description" content="Your Shopping Cart" />
      </Head>

      <section css={styleheaderone}>
        <h1>Your Cart</h1>
      </section>
      <section css={sectionShoppingCartStyle}>
        {/* {props.cartCookie.forEach((product) => {
          console.log(product.price);
        })} */}
        <article css={articleOneShoppingCartStyle}>
          <div>
            <div>
              img
              <div>Plant Name</div>
            </div>
            <div>Price</div>
            <div>Quantity</div>
            <div>total</div>
            <button>x</button>
          </div>
        </article>
        {/* ; // })} */}
        <article css={articleTwoshoppingCartStyle}>
          <h2>Order Summary</h2>
          <div css={divOrderSummaryStyle}>
            <p>Subtotal</p>
            <p>XXX</p>
          </div>
          <div css={divOrderSummaryStyle}>
            <p data-test-id="cart-total">Total</p>
            <p>XXXX</p>
          </div>

          <button data-test-id="cart-checkout">CHECKOUT</button>
        </article>
      </section>
    </Layout>
  );
}
