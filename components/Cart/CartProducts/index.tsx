import { css } from '@emotion/react';
import { Dispatch, SetStateAction, useContext } from 'react';
import { CartContext } from '../../../util/context/cartContext';
import { PlantsAndQuantity } from '../../../util/types';
import CartProductCard from '../CartProductCard';

const cartProductCard = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--color-white);
  //border: 1px solid green;
  padding: 1rem;

  > div {
    border-bottom: 0.5px solid lightgray;
    display: grid;
    grid-template-columns: 1fr 7fr;
    gap: 1rem;

    // Image
    > div:first-of-type {
      width: 6.25rem; //100px

      @media (max-width: 48rem) {
        width: 7.5rem; // 120px
      }
    }

    // productInfoContainer
    > div:nth-of-type(2) {
      // border: 2px solid red;

      // container quantity and buttons
      > div:first-of-type {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--space-sm);
        font-weight: 600;
        // border: 2px solid greenyellow;

        // product title
        p:first-of-type {
          font-size: var(--text-base-size);
          width: 2rem;
        }

        @media (max-width: 48rem) {
          p:first-of-type {
            width: 100%;
          }

          flex-direction: column;
          justify-content: flex-start;
          align-items: unset;
          gap: unset;

          > div > div {
            margin: var(--space-sm) 0;
          }
        }
      }

      // removeButton
      > div:last-of-type {
        button {
          border: none;
          background-color: transparent;
          cursor: pointer;
          color: grey;
          font-size: 1rem;
        }
      }
    }
  }
`;

type Props = {
  setCartProducts: Dispatch<SetStateAction<PlantsAndQuantity[]>>;
};

export default function CartProducts() {
  const { currentCartItems } = useContext(CartContext);

  return (
    <article css={cartProductCard}>
      {currentCartItems.map((plant) => (
        <div key={`cartItems_${plant.id}`}>
          <CartProductCard plant={plant} />
        </div>
      ))}
    </article>
  );
}
