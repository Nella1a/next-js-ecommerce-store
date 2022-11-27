import { useOnClickOutside } from '/hooks';
// import { burgerMenue } from './elements';
import { css } from '@emotion/react';
import Link from 'next/link';
import React, { useRef, useState } from 'react';

const mobileMenuStyle = (showBurger) => css`
display: none;
@media (max-width: 768px) {
  opacity: ${showBurger ? 1: 0};
  visibility: ${showBurger ? "visible" : "hidden"};
  left: ${showBurger ? "0px": "-400px"};
  z-index: 999 ;
  position: fixed;
  top: 0;
  transition: all .6s;

  height: 100vh;
  display: flex;
  flex-direction: column;
  width: 60%;
  background-color: rgb(249,248,247);



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
}
`;


export default function MobileMenu(props) {

  const node = useRef();
  useOnClickOutside(node, () => {
    props.setShowBurger(false)
    props.setShowRespMenue(false)
  });


// hide responsive menue bar & grey layer over body
function hideMobileMenue(){
  props.setShowBurger(false)
  props.setShowRespMenue(false)
}

return(
<article css={mobileMenuStyle(props.showBurger)} ref={node}>
  <div>
  <h2>Menu</h2>
  <button
         onClick={hideMobileMenue}
         onKeyDown={hideMobileMenue}
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
