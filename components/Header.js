import { css, Global } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
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
    top: 1px;
    right: 1.9px;
    font-size: 0.75rem;
  }
`;

export default function Header() {
  const [cartItems, setCartItems] = useState(0); //cart items

  return (
    <header css={navigationStyle}>
      <Link href="http://localhost:3001/">
        <a>LOGO</a>
      </Link>
      <Link href="/Products">
        <a css={marginLiStyle} data-test-id="products-link">
          Products
        </a>
      </Link>
      <Link href="/ShoppingCart" data-test-id="cart-link">
        <a>
          <div css={shoppingCartNavStyleContainer}>
            {' '}
            <div css={shoppingCartIconStyle}>
              {' '}
              <Image src={shoppingBag} alt="shopping cart icon" />
              <div css={shoppintCartQuantityStyle}>
                <span data-test-id="cart-count">1</span>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </header>
  );
}
