import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useContext, useEffect, useState } from 'react';
import shoppingBag from '../../public/shoppingBag.png';
import { CartContext } from '../../util/context/cartContext';
import { CartCookieContext } from '../../util/context/cookieContext';
import { headerStyle, shoppingBagStyle } from '../elements';
import MobileMenu from '../Mobile/MobileMenu';
import NavMenu from './NavMenu';

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
    >
      <button css={shoppingBagStyle}>
        <span>
          <Image
            src={shoppingBag}
            alt="shopping cart icon"
            quality={90}
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
            }}
          />
        </span>
        <span>
          <span data-test-id="cart-count">{cartCount}</span>
        </span>
      </button>
    </Link>
  );

  // const hamburgerIcon = () => (
  //   <button
  //     onClick={toggleMobileMenuHandler}
  //     onKeyDown={toggleMobileMenuHandler}
  //     role="menu"
  //     tabIndex={0}
  //     aria-label={'Open the menu'}
  //     aria-expanded={`${toggleMenu}`}
  //   >
  //     <Image
  //       src="/menu.png"
  //       width="29"
  //       height="29"
  //       alt="menu icon"
  //       aria-hidden={true}
  //     />
  //   </button>
  // );

  return (
    <Fragment>
      {screenwidth < BREAKPOINT_AT_768 && <MobileMenu />}

      <nav css={headerStyle}>
        <div>
          <ul>
            <li>
              <Link href="/" passHref>
                <Image
                  src={'/logo_shelovesplants.svg'}
                  alt={'logo she loves plants'}
                  width={'250'}
                  height={'52'}
                />
              </Link>
            </li>
            {screenwidth > BREAKPOINT_AT_768 ? (
              <NavMenu />
            ) : (
              <li>
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
              </li>
            )}
            <li>{shoppingBagIcon()}</li>
          </ul>
        </div>
      </nav>
    </Fragment>
  );
}
