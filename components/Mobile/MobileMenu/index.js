import { css } from '@emotion/react';
import { useContext, useRef } from 'react';
import { CartContext } from '../../../util/context/cartContext';
import NavMenu from '../../Navigation/NavMenu';

const mobileMenuStyle = (showBurger) => css`
  display: none;
  margin: 0;
  padding: 0;
  @media (max-width: 768px) {
    background-color: rgba(0, 0, 0, 0.25);
    position: fixed;
    bottom: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 40;
    margin: 0;
    display: ${showBurger ? 'block' : 'none'};

    nav {
      border: 2px solid red;
      background-color: #f9f8f7;
      position: absolute;
      bottom: 0;
      top: 0;
      opacity: ${showBurger ? 1 : 0};
      visibility: ${showBurger ? 'visible' : 'hidden'};
      left: ${showBurger ? '0px' : '-400px'};
      transition: all 0.6s; // TODO: not working yet
      height: 100vh;
      display: flex;
      flex-direction: column;
      width: 60%;

      ul {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        list-style: none;
        justify-content: space-between;

        list-style-type: none;
        list-style-position: inside;
        margin: 0;
        padding: 0rem;
        width: 100%;
        align-items: inherit;
        li {
          border-bottom: 1px solid lightgrey;
          padding-left: 1rem;
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

          div {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
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
          width: inherit;
          gap: 1rem;
          overflow: hidden;
          border-bottom: 1px solid lightgray;
          margin: 0 1rem;

          a {
            display: inline-block;
          }
        }
      }

      h2 {
        font-size: unset;
        margin-bottom: unset;
      }

      span {
        display: inline-block;
        font-size: 25px;
        font-weight: 100;
      }
    }
  }
`;

export default function MobileMenu() {
  const node = useRef();
  const { toggleMobileMenu, toggleMenu } = useContext(CartContext);

  const toggleMobileMenuHandler = () => {
    toggleMobileMenu();
  };
  return (
    <section css={mobileMenuStyle(toggleMenu)}>
      <nav ref={node}>
        <ul>
          <li>
            <div>
              <h2>Menu</h2>
              <span
                onClick={toggleMobileMenuHandler}
                onKeyDown={toggleMobileMenuHandler}
                role="menu"
                tabIndex={0}
              >
                x
              </span>
            </div>
          </li>

          <NavMenu />
        </ul>
      </nav>
    </section>
  );
}
