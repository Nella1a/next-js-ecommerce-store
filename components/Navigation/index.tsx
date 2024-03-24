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

  // const shoppingBagIcon = () => (
  //   <Link
  //     href={{
  //       pathname: '/cart',
  //     }}
  //     passHref
  //   >
  //     <button css={shoppingBagStyle}>
  //       <span>
  //         <Image
  //           src={shoppingBag}
  //           alt="shopping cart icon"
  //           quality={90}
  //           fill
  //           sizes="100vw"
  //           style={{
  //             objectFit: 'cover',
  //           }}
  //         />
  //       </span>
  //       <span>
  //         <span data-test-id="cart-count">{cartCount}</span>
  //       </span>
  //     </button>
  //   </Link>
  // );

  const shoppingBagIcon = () => (
    <Link
      href={{
        pathname: '/cart',
      }}
      passHref
      css={shoppingBagStyle}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="shoppingBagStyle"
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
        </div>
      </nav>
    </Fragment>
  );
}
