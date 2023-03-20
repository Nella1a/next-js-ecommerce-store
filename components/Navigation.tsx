import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useState } from 'react';
import { PropsTypeGrayLayer } from '../pages/types';
import shoppingBag from '../public/shopping-bag.png';
import { getParsedCookie } from '../util/cookies';
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

export default function Navigation(props: PropsTypeGrayLayer) {
  const [sumOfcartItems, setSumOfcartItems] = useState(props.sumOfcart);
  const screenwidth = GetScreenSize();
  const [showHamburgerIcon, setShowHamburgerIcon] = useState(false);

  const currentCookie = getParsedCookie('cart');

  useEffect(() => {
    if (currentCookie?.length) {
      const quantities = currentCookie.map((cookie) => cookie.quantity);
      const initialValue = 0;
      const sumOfQuantities = quantities.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue,
      );

      setSumOfcartItems(sumOfQuantities);
    } else {
      setSumOfcartItems(0);
    }
  }, [currentCookie]);

  function handleShowMobileMenu() {
    // show responsive menue bar & display grey layer over body
    setShowHamburgerIcon(true);
    props.setShowGrayLayer(true);
  }

  return (
    <Fragment>
      <MobileMenu
        showBurger={showHamburgerIcon}
        setShowBurger={setShowHamburgerIcon}
        setShowGrayLayer={props.setShowGrayLayer}
      />

      <nav css={headerStyle}>
        <div>
          <Link href="/" passHref>
            <a>
              <img src="/logo_shelovesplants.svg" alt="logo she loves plants" />
            </a>
          </Link>
          {/* conditional rendering */}
          {screenwidth > 768 ? (
            <NavMenu />
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
            <div css={shoppingBagStyle}>
              <div>
                <Image src={shoppingBag} alt="shopping cart icon" />
                <div>
                  <span data-test-id="cart-count">{sumOfcartItems}</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </nav>
    </Fragment>
  );
}
