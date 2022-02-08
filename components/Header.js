import { css, Global } from '@emotion/react';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ShoppingCart from '../pages/Shoppingcart';
import shoppingBag from '../public/shopping-bag.png';

// import shoppingCartIcon from '../public/shoppingCartIcon.svg';

const navigationStyle = css`
  background-color: #3c3e3c;
  color: #fff;
  height: 64px;
  padding-top: 32px;
  width: 80vw;
  height: 96px;
  display: flex;
  gap: 128px;
  padding: 32px;
  margin: 0 auto;
  /* justify-content: space-between; */
  align-items: center;

  a {
    text-decoration: none;
    display: block;
  }
  unvisited link a:link,
  a:visited,
  a:active {
    color: #fff;
  }

  /* mouse over link */

  a:hover {
    /* border-bottom: 3px solid #fff; */
  }
`;

const marginLiStyle = css`
  margin-left: auto;
`;

const shoppingCartNavStyleContainer = css`
  width: 64px;
  height: 64px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const shoppingCartIconStyle = css`
  width: 32px;
  height: 32px;
`;

const shoppintCartQuantityStyle = css`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #ff6900;
  color: #fff;
  position: absolute;
  text-align: center;
  top: 0px;
  right: 3px;

  span {
    position: relative;
    top: 0px;
    right: 0px;
    font-size: 0.75rem;
  }
`;

function getParsedCookie(key) {
  try {
    return JSON.parse(Cookies.get(key));
  } catch (err) {
    return undefined;
  }
}

export default function Header(props) {
  const [sumOfcartItems, setSumOfCartItems] = useState(0);

  const currentCookies = getParsedCookie('cart');

  console.log('currentCookies:', currentCookies);

  useEffect(() => {
    if (currentCookies !== undefined) {
      const abc = currentCookies.map((event) => event.quanity);
      const reducer = (previousValue, currentValue) =>
        previousValue + currentValue;

      setSumOfCartItems(abc.reduce(reducer));
    }
  }, [currentCookies]);

  console.log('SumCartItems:', sumOfcartItems);
  // currentCookies.map((event) => console.log(event.price));

  // console.log('currentCookies:', JSON.parse(currentCookies));

  // JSON.parse(currentCookies).map((event) => {
  //   return console.log(event.quanity);
  // });

  return (
    <header css={navigationStyle}>
      <Link href="http://localhost:3000/">
        <a>LOGO</a>
      </Link>
      <Link href="/Products">
        <a css={marginLiStyle} data-test-id="products-link">
          Products
        </a>
      </Link>
      <Link href="/Shoppingcart" data-test-id="cart-link">
        <a>
          <div css={shoppingCartNavStyleContainer}>
            {' '}
            <div css={shoppingCartIconStyle}>
              {' '}
              <Image src={shoppingBag} alt="shopping cart icon" />
              <div css={shoppintCartQuantityStyle}>
                <span data-test-id="cart-count">{sumOfcartItems}</span>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </header>
  );
}

export function getServerSideProps(context) {
  const cookies = context.req.cookies;
  console.log('cookiesHeader:', cookies);

  // if the cookie is undefined it is going to return an empty array
  // If it is defined it will return everything inside of it
  const cart = context.req.cookies.cart || '[]';
  const cartCookies = JSON.parse(cart);
  console.log('headCookdies:', cartCookies);

  return {
    props: {
      cartCookies: cartCookies,
    },
  };
}
