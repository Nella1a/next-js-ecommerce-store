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
    function handleScreenResize(){
      setScreenSize(window.innerWidth);
    }

    window.addEventListener("resize", handleScreenResize);

    handleScreenResize()

    return () => {
      window.removeEventListener("resize", handleScreenResize);
    };

  }, []);

 return screenSize
}



export default function Navigation(props: PropsTypeGrayLayer) {
  const [sumOfcartItems, setSumOfcartItems] = useState(0);
  const screenwidth = GetScreenSize();
  const [showHamburgerIcon, setShowHamburgerIcon] = useState(false);


  /* read cookies: return cookie or [] */
  const currentCookies = getParsedCookie("cart");

  useEffect(() => {
    /* check if cookie is set; sum up quantity of items and update stateVariable */

    if (currentCookies?.length !== undefined) {
      const abc = currentCookies.map((event) => event.quantity);
      const reducedAbc = abc.reduce((a, b) => a + b, 0);
      const reducer = (previousValue: number, currentValue: number) =>
        previousValue + currentValue;
      setSumOfcartItems(abc.reduce(reducer));
      setSumOfcartItems(reducedAbc);
    } else {
      setSumOfcartItems(0);
    }
  }, [currentCookies]);

  console.log("WIDTH HEADER: ",screenwidth)
  console.log("SHOWBURGER: ", showHamburgerIcon)
  console.log("Props.RespMenue Typeof: ", typeof(props.setShowGrayLayer))


    function handleShowMobileMenu(){
      // show responsive menue bar & display grey layer over body
      setShowHamburgerIcon(true)
      props.setShowGrayLayer(true)
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
            {screenwidth > 768 ? <NavMenu />
           :
            <button>
            <span
            onClick={handleShowMobileMenu}
            onKeyDown={handleShowMobileMenu}
            role="menu"
            tabIndex={0}
            >
              <Image
                src="/menu.png"
                width= "29"
                height= "29"
                alt="menu icon"
              />
            </span>

            </button>
          }
        <Link href="/Cart" passHref>
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
