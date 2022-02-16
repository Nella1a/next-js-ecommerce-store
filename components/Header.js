import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import shoppingBag from '../public/shopping-bag.png';
import { getParsedCookie } from '../util/cookies';
import { headerStyle, shoppingBagStyle } from './elements';

export default function Header() {
  const [sumOfcartItems, setSumOfCartItems] = useState(0);

  /* read cookies: return cookie or [] */
  const currentCookies = getParsedCookie('cart');

  /* check if cookie is set; sum up quantity of items and update stateVariable */
  useEffect(() => {
    if (currentCookies !== undefined) {
      const abc = currentCookies.map((event) => event.quantity);
      const reducedAbc = abc.reduce((a, b) => a + b, 0);
      // const reducer = (previousValue, currentValue) =>
      //   previousValue + currentValue;

      // setSumOfCartItems(abc.reduce(reducer));
      setSumOfCartItems(reducedAbc);
    } else {
      setSumOfCartItems(0);
    }
  }, [currentCookies]);

  return (
    <header css={headerStyle}>
      <nav>
        <Link href="http://localhost:3000/">
          <a>
            <img src="/logo_shelovesplants.svg" alt="logo she loves plants" />
          </a>
        </Link>
        <Link href="/Products">
          <a data-test-id="products-link">Products</a>
        </Link>
        <Link href="/Shoppingcart" data-test-id="cart-link">
          <a>
            <div css={shoppingBagStyle}>
              <div>
                <Image src={shoppingBag} alt="shopping cart icon" />
                <div>
                  <span data-test-id="cart-count">{sumOfcartItems}</span>
                </div>
              </div>
            </div>
          </a>
        </Link>
      </nav>
    </header>
  );
}
