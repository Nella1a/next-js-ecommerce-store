import Image from 'next/legacy/image';
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

export const BREAKPOINTAT768 = 768;

export default function Navigation() {
  const screenwidth = getScreenSize();
  const { cartCount } = useContext(CartCookieContext);

  const { toggleMobileMenu } = useContext(CartContext);

  const toggleMobileMenuHandler = () => {
    toggleMobileMenu();
  };

  const shoppingBagIcon = () => (
    <button css={shoppingBagStyle}>
      <Link
        href={{
          pathname: '/cart',
        }}
        passHref
      >
        <div>
          <Image src={shoppingBag} alt="shopping cart icon" />
          <div>
            <span data-test-id="cart-count">{cartCount}</span>
          </div>
        </div>
      </Link>
    </button>
  );
  return (
    <Fragment>
      <MobileMenu />

      <nav css={headerStyle}>
        <div>
          <div>
            <Link href="/" passHref>
              <img src="/logo_shelovesplants.svg" alt="logo she loves plants" />
            </Link>
          </div>
          <div>
            {screenwidth > BREAKPOINTAT768 ? (
              <ul>
                <NavMenu />
                <li>{shoppingBagIcon()}</li>
              </ul>
            ) : (
              <ul>
                <li>
                  <button>
                    <span
                      onClick={toggleMobileMenuHandler}
                      onKeyDown={toggleMobileMenuHandler}
                      role="menu"
                      tabIndex={0}
                    >
                      <Image
                        src="/menu.png"
                        width="29"
                        height="29"
                        alt="menu icon"
                      />
                    </span>
                  </button>
                </li>
                <li>{shoppingBagIcon()}</li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </Fragment>
  );
}
