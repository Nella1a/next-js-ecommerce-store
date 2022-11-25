// import { burgerMenue } from './elements';
import { css } from '@emotion/react';
import Link from 'next/link';

const burgerMenue = (showBurger) => css`
  display: none;

  @media (max-width: 768px) {
    height: 100vh;
    display: block;

    //display: ${showBurger &&  "block"};


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


  position: absolute;
  left: ${!showBurger ? "-400px": "0px"};
  top: 0;
  z-index: 999 ;
  //height: 100%;
  width: 60%;
  background-color: rgb(249,248,247);
  opacity: ${!showBurger ? 0: 1};
  //visibility: ${!showBurger ? "visible" : "hidden"};
  transition: all .6s;
}

`;


export default function BurgerMenue(props) {

// hide responsive menue bar & display grey layer over body
function hideRespMenu(){
  props.setShowBurger(false)
  props.setShowRespMenue(false)
}





return(
<article css={burgerMenue(props.showBurger)}>
  <div>
  <h2>Menu</h2>
  <button
         onClick={hideRespMenu}
         onKeyDown={hideRespMenu}
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
