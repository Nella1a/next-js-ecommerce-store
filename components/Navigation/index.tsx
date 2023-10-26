import Image from 'next/legacy/image';
import Link from 'next/link';
import { Fragment, useContext, useEffect, useState } from 'react';
import shoppingBag from '../../public/shopping-bag.png';
import { CartContext } from '../../util/context/cartContext';
import { CartCookieContext } from '../../util/context/cookieContext';
import { headerStyle, shoppingBagStyle } from '../elements';
import MobileMenu from '../Mobile/MobileMenu';
import NavMenu from './NavMenu';

// get window width
const GetScreenSize = () => {
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

const BREAKPOINT = 768;

export default function Navigation() {
  const screenwidth = GetScreenSize();
  const { cartCount } = useContext(CartCookieContext);

  const { toggleMobileMenu } = useContext(CartContext);

  const toggleMobileMenuHandler = () => {
    toggleMobileMenu();
  };

  return (
    <Fragment>
      <MobileMenu />

      <nav css={headerStyle}>
        <div>
          <Link href="/" passHref>
            <img src="/logo_shelovesplants.svg" alt="logo she loves plants" />
          </Link>
        </div>
        <div>
          {screenwidth > BREAKPOINT ? (
            <ul>
              <NavMenu />
            </ul>
          ) : (
            <button>
              <span
                onClick={toggleMobileMenuHandler}
                onKeyDown={toggleMobileMenuHandler}
                role="menu"
                tabIndex={0}
              >
                <Image src="/menu.png" width="29" height="29" alt="menu icon" />
              </span>
            </button>
          )}
          <Link href="/cart" passHref>
            <div css={shoppingBagStyle}>
              <div>
                <Image src={shoppingBag} alt="shopping cart icon" />
                <div>
                  <span data-test-id="cart-count">{cartCount}</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </nav>
    </Fragment>
  );
}
