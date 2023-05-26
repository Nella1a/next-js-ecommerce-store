import { css } from '@emotion/react';
import { useContext, useRef } from 'react';
import { useOnClickOutside } from '../hooks';
import { GrayLayerContext } from '../util/context/grayLayerContext';
import NavMenu from './NavMenu';

const mobileMenuStyle = (showBurger) => css`
  display: none;

  ul {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    list-style: none;
    justify-content: space-between;
    // border: 1px solid blue;

    list-style-type: none;
    list-style-position: inside;
    margin: 0;
    padding: 0rem;
    width: 100%;
    align-items: inherit;
    // padding: 1rem;
    li {
      border-bottom: 1px solid lightgrey;
      //  background-color: yellow;
      margin-left: 1rem;
      //padding-top: 13px;
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

    > li:first-of-type {
      margin-left: unset;
      padding-left: unset;
      background-color: #e4e8e7;
      // color: #fff;

      div {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        // background-color: green;
        margin: 0 1rem;
        width: inherit;

        a {
          display: inline-block;
        }
      }
    }

    > div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: baseline;
      // background-color: green;
      //margin-left: 1rem;
      width: inherit;
      gap: 1rem;
      overflow: hidden;
      border-bottom: 1px solid lightgray;

      a {
        display: inline-block;
      }
    }
  }
  @media (max-width: 768px) {
    opacity: ${showBurger ? 1 : 0};
    visibility: ${showBurger ? 'visible' : 'hidden'};
    left: ${showBurger ? '0px' : '-400px'};
    z-index: 999;
    position: fixed;
    top: 0;
    transition: all 0.6s;

    height: 100vh;
    display: flex;
    flex-direction: column;

    width: 60%;
    background-color: rgb(249, 248, 247);

    h2 {
      //text-align: left;
      //font-size: medium;
      //border: 1px solid red;
      font-size: unset;
      margin-bottom: unset;
    }

    span {
      display: inline-block;
      font-size: 25px;
      font-weight: 100;
    }
  }
`;

export default function MobileMenu(props) {
  const node = useRef();
  const { toggleGrayLayer } = useContext(GrayLayerContext);

  useOnClickOutside(node, () => {
    props.setShowBurger(false);
    //toggleGrayLayer();
  });

  const hideMobileMenue = () => {
    // hide responsive menu bar & grey layer over body
    props.setShowBurger(false);
    //toggleGrayLayer();
  };

  return (
    <nav css={mobileMenuStyle(props.showBurger)} ref={node}>
      <ul>
        <li>
          <div>
            <h2>Menu</h2>
            <span
              onClick={hideMobileMenue}
              onKeyDown={hideMobileMenue}
              role="menu"
              tabIndex={0}
            >
              x
            </span>
          </div>
        </li>
        <div>
          <NavMenu />
        </div>
      </ul>
    </nav>
  );
}
