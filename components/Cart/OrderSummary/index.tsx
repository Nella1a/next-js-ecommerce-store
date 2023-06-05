import Link from 'next/link';
import { useContext } from 'react';
import { CartContext } from '../../../util/context/cartContext';

export default function OrderSummary() {
  const { totalPrice } = useContext(CartContext);
  return (
    <article>
      <div>
        <h2>Total</h2>
        <div>
          <p>
            <span>Subtotal</span>
            <span>{totalPrice}</span>
          </p>
          <p>
            <span>Delivery</span>
            <span>€ 0.00</span>
          </p>
        </div>
        <div>
          <p>
            <span>Total (VAT included)</span>
            <span>€ {totalPrice}</span>
          </p>
          <Link href="/checkout" passHref>
            <button data-test-id="cart-checkout">Go to checkout</button>
          </Link>
        </div>
      </div>
    </article>
  );
}
