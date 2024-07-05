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
const QUANTITY_OF_ONE = 1;

const CartProductCard = ({ plant }: { plant: Plant }) => {
  const { user } = useAuth();
  const { id, title, price, quantity } = plant;

  const { updateCartQuantity, deleteProductFromCookie } =
    useContext(CartCookieContext);
  const { updateCartProduct, deleteProductFromCart } = useContext(CartContext);

  const addToCartFunction = async (
    isIncrement: boolean,
    newQuantity: number,
  ) => {
    try {
      await fetch('/api/cart/updateQuantity', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          quantity: newQuantity,
          increment: isIncrement,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const incrementHandler = async () => {
    updateCartQuantity(id, QUANTITY_OF_ONE);
    updateCartProduct(id, QUANTITY_OF_ONE, false);
    if (user) {
      await addToCartFunction(true, QUANTITY_OF_ONE);
    }
  };

  const decrementHandler = async () => {
    updateCartQuantity(id, QUANTITY_OF_ONE, true);
    updateCartProduct(id, QUANTITY_OF_ONE, true);
    if (user) {
      if (quantity === QUANTITY_OF_ONE) {
        const response = await fetch('/api/cart/delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product: id,
          }),
        });
        const result = await response.json();
      } else {
        await addToCartFunction(false, QUANTITY_OF_ONE);
      }
    }
  };

  const deleteItemHandler = async (id: number) => {
    deleteProductFromCookie(id);
    deleteProductFromCart(id);

    /// active user session
    if (user) {
      const response = await fetch('/api/cart/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product: id,
        }),
      });
      const result = await response.json();
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
          |
          {quantity && (
            <ChangeCartQuantity
              quantity={quantity}
              increment={incrementHandler}
              decrement={decrementHandler}
            />
          )}
        </div>
        <div className="removeButton">
          <button
            data-test-id="delete item from cart"
            onClick={() => deleteItemHandler(id)}
          >
            remove
          </button>
        </div>
      </div>
    </>
  );
};

export default CartProductCard;
