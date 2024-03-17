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

  const { toggleMobileMenu } = useContext(CartContext);

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

  const hamburgerIcon = () => (
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
  );

  return (
    <Fragment>
      {screenwidth < BREAKPOINT_AT_768 && <MobileMenu />}

      <nav css={headerStyle}>
        <div>
          <div>
            <Link href="/" passHref>
              <Image
                src={'/logo_shelovesplants.svg'}
                alt={'logo she loves plants'}
                width={'400'}
                height={'52'}
              />
            </Link>
          </div>
          <div>
            <ul>
              {screenwidth > BREAKPOINT_AT_768 ? (
                <NavMenu />
              ) : (
                <li>{hamburgerIcon()}</li>
              )}
              <li>{shoppingBagIcon()}</li>
            </ul>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}
