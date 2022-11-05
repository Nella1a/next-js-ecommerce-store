import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import shoppingBag from '../public/shopping-bag.png';
import { getParsedCookie } from '../util/cookies';
import { headerStyle, shoppingBagStyle } from './elements';

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









export default function Header() {
  const [sumOfcartItems, setSumOfcartItems] = useState(0);
  const screenwidth = GetScreenSize()
  /* read cookies: return cookie or [] */
  const currentCookies = getParsedCookie('cart');

  /* check if cookie is set; sum up quantity of items and update stateVariable */
  useEffect(() => {
    if (currentCookies !== undefined) {
      const abc = currentCookies.map((event) => event.quantity);
      const reducedAbc = abc.reduce((a, b) => a + b, 0);
      const reducer = (previousValue, currentValue) =>
        previousValue + currentValue;
      setSumOfcartItems(abc.reduce(reducer));
      setSumOfcartItems(reducedAbc);
    } else {
      setSumOfcartItems(0);
    }
  }, [currentCookies]);

  console.log("WIDTH HEADER: ",screenwidth)

  return (
    <header css={headerStyle}>
      <nav>

          <Link href="/" passHref>
            <a>
              <img src="/logo_shelovesplants.svg" alt="logo she loves plants" />
            </a>
          </Link>

          {/* conditional rendering */}
            {screenwidth > 768 ?
            <>
              <Link href="/Products">
                <a data-test-id="products-link">Plants</a>
              </Link>
              <Link href="/Underconstruction">
                <a>Inspiration</a>
              </Link>
              <Link href="/Underconstruction">
                <a>Sale</a>
              </Link>
              <Link href="/Underconstruction">
                <a>Contact</a>
              </Link>
            </> :
            <span>
              <Image
                src="/menu.png"
                width= "29"
                height= "29"
                alt="menu icon"
              />
            </span>
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

      </nav>
    </header>
  );
}
