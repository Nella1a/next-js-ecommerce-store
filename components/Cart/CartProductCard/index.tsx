import { useContext } from 'react';
import { Cart } from '../../../pages/types';
import { CartContext } from '../../../util/context/cartContext';
import { CartCookieContext } from '../../../util/context/cookieContext';
import ChangeCartQuantity from '../../ChangeCartQuantity';
import { plantName } from '../../elements';
import CartItem from '../CartItem';

type Props = {
  plant: Cart;
};

// calculates subtotal price
export function multiplePriceAndQuantity(price: number, quantity: number) {
  return price * quantity;
}

export default function CartProductCard(props: Props) {
  const { id, title, price, quantity } = props.plant;
  const { plant } = props;
  const { updateCartQuantity, deleteProductFromCookie } =
    useContext(CartCookieContext);
  const { updateCartProduct, deleteProductFromCart } = useContext(CartContext);
  const incrementHandler = () => {
    const newQuantity = 1;
    updateCartQuantity(id, newQuantity);
    updateCartProduct(id, 1, false);
  };

  const decrementHandler = () => {
    const newQuantity = 1;
    updateCartQuantity(id, newQuantity, true);
    updateCartProduct(id, 1, true);
  };

  const onClickHandler = (removeProductId: number) => {
    deleteProductFromCookie(removeProductId);
    deleteProductFromCart(removeProductId);
  };

  return (
    <>
      <div className="Image">
        <CartItem plant={plant} />
      </div>

      <div className="ProductInfoContainer">
        <div className="Quantity">
          <p css={plantName}>{title}</p>
          <p className="Price">
            €
            {multiplePriceAndQuantity(Number(price), Number(quantity)).toFixed(
              2,
            )}
          </p>

          <ChangeCartQuantity
            quantity={quantity}
            increment={incrementHandler}
            decrement={decrementHandler}
          />
        </div>
        <div className="removeButton">
          <button
            data-test-id="delete item from cart"
            onClick={() => onClickHandler(id)}
          >
            remove
          </button>
        </div>
      </div>
    </>
  );
}
