import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useContext, useEffect, useState } from 'react';
import { useAuth } from '../../AuthProvider';
import { CartContext } from '../../util/context/cartContext';
import { CartCookieContext } from '../../util/context/cookieContext';
import MobileMenuBars from '../Icons/MobileMenuBars';
import ShoppingBag from '../Icons/ShoppingBag';
import User from '../Icons/User';
import MobileMenu from '../Mobile/MobileMenu';
import NavMenu from './NavMenu';

export const navigation = () => css`
  background-color: #50a458;
  width: 100vw;
  height: 4rem;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: 10;
  padding-top: 1rem;
  margin-bottom: 0.5rem;

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
      color: var(--color-white);

      a:link,
      a:visited,
      a:hover,
      a:active {
        color: var(--color-white);
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
    top: -9px;
    right: -9px;

    > span {
      margin: auto auto;
      font-size: 0.8rem;
    }
  }
`;

const userIconStyle = css`
  .userIcon {
    width: 24px;
    height: 24px;
    text-decoration: none;
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

const UserIcon = () => {
  return (
    <Link href={{ pathname: '/myaccount' }} passHref data-test-id="userIcon">
      <User />
    </Link>
  );
};

export default function Navigation() {
  const screenwidth = getScreenSize();
  const { cartCount } = useContext(CartCookieContext);
  const { toggleMenu, toggleMobileMenu } = useContext(CartContext);
  const { user } = useAuth();

  const toggleMobileMenuHandler = () => {
    toggleMobileMenu();
  };

  const shoppingBagIcon = () => (
    <Link
      href={{
        pathname: '/Cart',
      }}
      passHref
      css={shoppingBagStyle(Boolean(cartCount))}
      data-test-id="cart-link"
    >
      <ShoppingBag />
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
              <Link href="/" passHref data-test-id="nav-home-button">
                <Image
                  src={'/shelovesplants-logo-white.png'}
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
                  <MobileMenuBars />
                </button>
              </li>
            )}
            <li css={userIconStyle}>{user.uid && <UserIcon />}</li>
            <li>{shoppingBagIcon()}</li>
          </ul>
        </section>
      </nav>
    </Fragment>
  );
}
