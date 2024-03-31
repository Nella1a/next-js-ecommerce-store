import { css } from '@emotion/react';
import Link from 'next/link';
import { useContext } from 'react';
import { CartContext } from '../../../util/context/cartContext';

const orderSummary = css`
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  width: inherit;
  // border: 1px solid red;

  p {
    width: inherit;
    display: flex;
    justify-content: space-between;
    //margin-bottom: 1rem;

    span {
      display: block;
    }
  }

  p:last-of-type {
    padding-top: 1rem;
    font-weight: 600;
    border-top: 1px solid lightgray;
  }
`;

export default function OrderSummary() {
  const { totalPrice } = useContext(CartContext);
  return (
    <div css={orderSummary}>
      <p>
        <span>Subtotal</span>
        <span>&euro; {totalPrice}</span>
      </p>
      <p>
        <span>Delivery</span>
        <span>&euro; 0.00</span>
      </p>
      <p>
        <span>Total (VAT included)</span>
        <span>&euro; {totalPrice}</span>
      </p>
    </div>
  );
}
