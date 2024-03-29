import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useContext, useEffect, useState } from 'react';
import { CartContext } from '../../util/context/cartContext';
import { CartCookieContext } from '../../util/context/cookieContext';
import MobileMenu from '../Mobile/MobileMenu';
import NavMenu from './NavMenu';

export const navigation = () => css`
  background-color: var(--main-bg-color);
  width: 100vw;
  height: 4rem;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: 10;
  padding-top: 1rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid var(--color-grey-6);

  // container
  > section {
    max-width: 81rem; //1330px;
    margin: 0 1.5rem;
    width: 100%;

    ul {
      list-style-type: none;
      list-style-position: inside;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-md);
      margin: 0;
      padding-left: 0;

      a:link,
      a:visited,
      a:hover,
      a:active {
        font-weight: bold;
      }

      > li:nth-of-type(2) button {
        all: unset;
        cursor: pointer;
        display: flex;
      }

      > li:nth-of-type(2) {
        margin-left: auto;
        display: flex;

        .hamburgerIcon {
          height: 30px;
          width: 30px;
          display: inline-block;
        }
      }

      > li:last-of-type {
        height: 30px;
      }
    }

    @media (max-width: 30rem) {
      grid-template-columns: 1fr 1fr;
    }
  }
`;

const shoppingBagStyle = (itemsInCart: boolean) => css`
  position: relative;
  display: inline-flex;
  text-decoration: none;

  .shoppingBagSVG {
    width: 24px;
    height: 24px;
    display: inline-flex;
  }

  // container circle and quantity
  > span:first-of-type {
    width: 1.5rem;
    height: 1.5rem;
    display: ${itemsInCart ? 'flex' : 'none'};
    border-radius: 50%;
    background-color: var(--color-btn-primary-bg);
    color: var(--color-white);
    position: absolute;
    text-align: center;
    top: -18px;
    right: -5px;

    > span {
      margin: auto auto;
      font-size: 0.8rem;
    }
  }
`;

// get window width
export const getScreenSize = () => {
  const [screenSize, setScreenSize] = useState(0);

  useEffect(() => {
    function handleScreenResize() {
      setScreenSize(window.innerWidth);
    }

    window.addEventListener('resize', handleScreenResize);

    handleScreenResize();

    return () => {
      window.removeEventListener('resize', handleScreenResize);
    };
  }, []);

  return screenSize;
};

export const BREAKPOINT_AT_768 = 768;

export default function Navigation() {
  const screenwidth = getScreenSize();
  const { cartCount } = useContext(CartCookieContext);
  const { toggleMenu, toggleMobileMenu } = useContext(CartContext);

  const toggleMobileMenuHandler = () => {
    toggleMobileMenu();
  };

  const shoppingBagIcon = () => (
    <Link
      href={{
        pathname: '/cart',
      }}
      passHref
      css={shoppingBagStyle(Boolean(cartCount))}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="shoppingBagSVG"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
        />
      </svg>

      <span>
        <span data-test-id="cart-count">{cartCount}</span>
      </span>
    </Link>
  );

  return (
    <Fragment>
      {screenwidth < BREAKPOINT_AT_768 && <MobileMenu />}
      <nav css={navigation}>
        <section>
          <ul>
            <li>
              <Link href="/" passHref>
                <Image
                  src={'/logo_shelovesplants.svg'}
                  alt={'logo she loves plants'}
                  width={'250'}
                  height={'36'}
                />
              </Link>
            </li>
            {screenwidth > BREAKPOINT_AT_768 ? (
              <NavMenu />
            ) : (
              <li>
                <button
                  onClick={toggleMobileMenuHandler}
                  onKeyDown={toggleMobileMenuHandler}
                  role="menu"
                  tabIndex={0}
                  aria-label={'Open the menu'}
                  aria-expanded={`${toggleMenu}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="hamburgerIcon"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </button>
              </li>
            )}
            <li>{shoppingBagIcon()}</li>
          </ul>
        </section>
      </nav>
    </Fragment>
  );
}
