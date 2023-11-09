import { css } from '@emotion/react';
import { Cart } from '../../util/types';
import CartItem from '../Cart/CartItem';
import { plantName } from '../elements';

const checkoutProductCardStyle = css`
  display: grid;
  grid-template-columns: 1fr 5fr;
  gap: 1rem;

  > div:first-of-type {
    // Image
    width: 100px;
  }

  > div:nth-of-type(2) {
    // productInfoContainer

    div:first-of-type {
      // quantity
      display: flex;
      justify-content: space-between;
      align-items: center;
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

      <div className="ProductInfoContainer">
        <div className="Quantity">
          <p css={plantName}>{title}</p>
          {quantity > 1 && <>Quantity: {quantity}</>}
          <p className="Price">
            €
            {multiplePriceAndQuantity(Number(price), Number(quantity)).toFixed(
              2,
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
