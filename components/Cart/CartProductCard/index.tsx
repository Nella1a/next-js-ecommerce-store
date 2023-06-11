import { useContext } from 'react';
import { Cart } from '../../../pages/types';
import { CartContext } from '../../../util/context/cartContext';
import { CartCookieContext } from '../../../util/context/cookieContext';
import { multiplePriceAndQuantity } from '../../../util/functions';
import ChangeCartQuantity from '../../ChangeCartQuantity';
import { plantName } from '../../elements';
import CartItem from '../CartItem';

type Props = {
  plant: Cart;
};

export default function CartProductCard(props: Props) {
  const { id, name, price, quantity } = props.plant;
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
      <div className="Quantity">
        <p css={plantName}>{name}</p>
        <div className="Price">
          €
          {multiplePriceAndQuantity(Number(price), Number(quantity)).toFixed(2)}
        </div>
        <ChangeCartQuantity
          quantity={quantity}
          increment={incrementHandler}
          decrement={decrementHandler}
        />

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
