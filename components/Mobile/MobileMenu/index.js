import { css } from '@emotion/react';
import { useContext, useEffect, useRef } from 'react';
import { CartContext } from '../../../util/context/cartContext';
import XMark from '../../Icons/XMark';
import NavMenu from '../../Navigation/NavMenu';

const mobileMenuStyle = (showBurger) => css`
  @media (max-width: 48rem) {
    background-color: ${showBurger && 'rgba(0, 0, 0, 0.5)'};
    position: fixed;
    bottom: 0;
    top: 0rem;
    width: 100%;
    height: 100%;
    z-index: ${showBurger ? '20' : '-1'};
    transition: all 0.3s;

    .menuCloseIcon {
      width: 24px;
      height: 24px;
      display: inline-block;
    }

    nav {
      background-color: var(--main-bg-color);
      position: absolute;
      bottom: 0;
      top: 0;
      height: 100vh;
      display: flex;
      flex-direction: column;
      width: 60%;
      z-index: 25;

      // animations dont't work with 'display: none'
      // used this workaround:
      // 1) Hide visually
      opacity: ${showBurger ? 1 : 0};
      // 2) unaccessible  to mouse and keyboard
      pointer-events: ${showBurger ? 'auto' : 'none'};
      // 3) unaccessible  for screen readers
      visibility: ${showBurger ? 'visible' : 'hidden'};
      // use transform
      transform: ${showBurger ? 'translateX(0px)' : 'translateX(-100%)'};
      transition: all 0.5s;

      ul {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        list-style: none;
        justify-content: space-between;
        width: 100%;
        font-family: var(--font-primary);

        li {
          border-bottom: 1px solid var(--color-grey-4);
          padding-left: 1rem;
          padding-bottom: 0.9rem;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;

          a,
          a:link,
          a:visited {
            display: block;
            font-weight: bold;
            display: inline-block;
            width: 100%;
            color: var(--text-color);
          }
        }

        > li:first-of-type {
          margin-left: unset;
          padding-left: unset;
          background-color: var(--color-primary-green);
          color: var(--color-white);
          display: flex;
          justify-content: space-between;
          width: 100%;
          font-weight: bold;

          padding: 0.96rem;
          button {
            all: unset;
            color: black;
            font-weight: bold;
            cursor: pointer;
          }
        }
      }
    }
  }
`;

export default function MobileMenu() {
  const node = useRef();
  const { toggleMobileMenu, toggleMenu } = useContext(CartContext);

  useEffect(() => {
    if (toggleMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
  }, [toggleMenu]);

  const toggleMobileMenuHandler = () => {
    toggleMobileMenu();
  };
  return (
    <aside css={mobileMenuStyle(toggleMenu)}>
      <nav ref={node}>
        <ul>
          <li>
            <span>Menu</span>
            <button
              onClick={toggleMobileMenuHandler}
              onKeyDown={toggleMobileMenuHandler}
              role="menu"
              tabIndex={0}
            >
              <XMark />
            </button>
          </li>
          <NavMenu />
        </ul>
      </nav>
    </aside>
  );
}
