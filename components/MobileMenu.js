import { css } from '@emotion/react';
import Link from 'next/link';
import { useRef } from 'react';
import { useOnClickOutside } from '../hooks';

const mobileMenuStyle = (showBurger) => css`
display: none;
ul {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  list-style: none;
  justify-content: center;
  border: 1px solid blue;
  margin: 0px;
 // padding: 1rem;


  li {
    border-bottom: 1px solid lightgrey;
    background-color: yellow;
    margin-left: 1rem;
    padding-top: 13px;
    padding-bottom: 13px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    a {
    text-decoration: none;
    display: inline-block;

   }
  }

li:first-of-type {
  margin-left: unset;
  padding-left: unset;
}

div {
  display: flex;
  background-color: green;
  margin-left: 1rem;

  a {
    display: inline-block;
  }

}

}
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


    h2 {
      text-align: left;
      font-size: medium;
      border: 1px solid red;
      width: 100%;
    }

    button {
      all: unset;
      font-size: 25px;
    }

}
`;


export default function MobileMenu(props) {

  const node = useRef();
  useOnClickOutside(node, () => {
    props.setShowBurger(false)
    props.setShowGrayLayer(false)
  });



const hideMobileMenue = () => {
  // hide responsive menu bar & grey layer over body
  props.setShowBurger(false)
  props.setShowGrayLayer(false)
}



return(
<nav css={mobileMenuStyle(props.showBurger)} ref={node}>

  <ul>
    <li>
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
    </li>
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

</nav>
)
}
