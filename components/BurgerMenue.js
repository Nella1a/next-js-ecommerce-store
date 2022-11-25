// import { burgerMenue } from './elements';
import { css } from '@emotion/react';
import Link from 'next/link';

const burgerMenue = (showBurger) => css`
position: absolute;
right: 0;
top: 0;
z-index: 2 ;
height: 100%;
width: 80%;
background-color: rgb(249,248,247);
display: none;

div {
  display: flex;
  justify-content: space-around;

  h2 {
    all: unset;
  }

  button {
    all: unset;
    font-size: 25px;
  }
}

@media (max-width: 768px) {
  display: ${showBurger && "block"};
}
`;




export default function BurgerMenue(props) {
console.log("SHOWBURGER: ", props.showBurger)


return(
<article css={burgerMenue(props.showBurger)}>
  <div>
  <h2>Menu</h2>
  <button
         onClick={() => props.setShowBurger(false)}
         onKeyDown={() => props.setShowBurger(false)}
         role="menu"
         tabIndex={0}
  >x
  </button>
  </div>
  <ul>
    <li>
      <Link href="/Products">
        <a data-test-id="products-link">Plants</a>
      </Link>
    </li>
    <li>
      <Link href="/Underconstruction">
        <a>Inspiration</a>
      </Link>
    </li>
    <li>
      <Link href="/Underconstruction">
        <a>Sale</a>
      </Link>
    </li>
    <li>
      <Link href="/Underconstruction">
        <a>Contact</a>
      </Link>
    </li>
  </ul>

</article>
)
}
