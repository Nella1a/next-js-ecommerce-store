import { css } from '@emotion/react';
import { Cart } from '../../util/types';
import CartItem from '../Cart/CartItem';

export const checkoutProductCardStyle = css`
  display: grid;
  grid-template-columns: 1fr 5fr;
  gap: 1rem;
  // border: 1px solid pink;

  > div:first-of-type {
    // Image
    width: 80px;
  }

  > div:nth-of-type(2) {
    // productInfoContainer
    display: flex;
    justify-content: space-between;

    p:first-of-type {
      // title and quantity
      height: 50%;
      display: flex;
      flex-direction: column;
      span {
        display: block;
      }
    }

    p:nth-of-type(2) {
      // price
      height: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    @media (max-width: 480px) {
      flex-direction: column;
      justify-content: flex-end;

      p:nth-of-type(2) {
        justify-content: flex-start;
      }
    }
  }
`;

type Props = {
  plant: Cart;
};

// calculates subtotal price
export function multiplePriceAndQuantity(price: number, quantity: number) {
  return price * quantity;
}

export default function CheckoutProductCard(props: Props) {
  const { id, title, price, quantity } = props.plant;
  const { plant } = props;

  return (
    <div css={checkoutProductCardStyle}>
      <div>
        <CartItem plant={plant} />
      </div>

      <div>
        <p>
          <span>{title}</span>
          {quantity >= 1 && <span>Quantity: {quantity}</span>}
        </p>
        <p>
          &euro;
          {multiplePriceAndQuantity(Number(price), Number(quantity)).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
