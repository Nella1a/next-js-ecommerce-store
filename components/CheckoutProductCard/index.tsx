import { Cart } from '../../util/types';
import CartItem from '../Cart/CartItem';
import { checkoutProductCardStyle, plantName } from '../elements';

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
        <p className="Quantity">
          <span>{title}</span>
          {quantity > 1 && <span>Quantity: {quantity}</span>}
        </p>
        <p className="Price">
          &euro;
          {multiplePriceAndQuantity(Number(price), Number(quantity)).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
