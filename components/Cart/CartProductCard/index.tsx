import { useContext } from 'react';
import { useAuth } from '../../../AuthProvider';
import { CartContext } from '../../../util/context/cartContext';
import { CartCookieContext } from '../../../util/context/cookieContext';
import { Plant } from '../../../util/types';
import ChangeCartQuantity from '../../ChangeCartQuantity';
import CartItem from '../CartItem';

// calculates subtotal price
export function multiplePriceAndQuantity(price: number, quantity: number) {
  return price * quantity;
}

export default function CartProductCard({ plant }: { plant: Plant }) {
  const { user } = useAuth();
  const { id, title, price, quantity } = plant;

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

  const onClickHandler = async (removeProductId: number) => {
    deleteProductFromCookie(removeProductId);
    deleteProductFromCart(removeProductId);

    /// active user session
    if (user) {
      const response = await fetch('/api/cart/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product: removeProductId,
        }),
      });
      const result = await response.json();
      console.log('RESULT: ', result);
    }
  };

  return (
    <>
      <div>
        <CartItem plant={plant} />
      </div>

      <div>
        <div>
          <p>{title}</p>
          <p>
            &euro;{' '}
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
