import { css } from '@emotion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useContext, useEffect, useState } from 'react';
import shoppingBag from '../public/shopping-bag.png';
import { CartCookieContext } from '../util/context/cookieContext';
import { GrayLayerContext } from '../util/context/grayLayerContext';
import { headerStyle, shoppingBagStyle } from './elements';
import MobileMenu from './MobileMenu';
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

export default function Navigation() {
  const screenwidth = GetScreenSize();
  const [showHamburgerIcon, setShowHamburgerIcon] = useState(false);
  const { cartCount } = useContext(CartCookieContext);
  const { toggleGrayLayer } = useContext(GrayLayerContext);

  const handleShowMobileMenu = () => {
    // show responsive menue bar & display grey layer over body
    setShowHamburgerIcon(true);
    toggleGrayLayer(true);
  };

  return (
    <Fragment>
      <MobileMenu
        showBurger={showHamburgerIcon}
        setShowBurger={setShowHamburgerIcon}
      />

      <nav css={headerStyle}>
        <div>
          <Link href="/" passHref>
            <a>
              <img src="/logo_shelovesplants.svg" alt="logo she loves plants" />
            </a>
          </Link>
        </div>
        <div>
          {/* conditional rendering */}
          {screenwidth > 768 ? (
            <ul>
              <NavMenu />
            </ul>
          ) : (
            <button>
              <span
                onClick={handleShowMobileMenu}
                onKeyDown={handleShowMobileMenu}
                role="menu"
                tabIndex={0}
              >
                <Image src="/menu.png" width="29" height="29" alt="menu icon" />
              </span>
            </button>
          )}
          <Link href="/cart" passHref>
            <a>
              <div css={shoppingBagStyle}>
                <div>
                  <Image src={shoppingBag} alt="shopping cart icon" />
                  <div>
                    <span data-test-id="cart-count">{cartCount}</span>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        </div>
      </nav>
    </Fragment>
  );
}
