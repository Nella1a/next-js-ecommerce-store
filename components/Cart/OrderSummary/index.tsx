import Link from 'next/link';
import { useContext } from 'react';
import { CartContext } from '../../../util/context/cartContext';

export default function OrderSummary() {
  const { totalPrice } = useContext(CartContext);
  return (
    <div>
      <div>
        <p>
          <span>Subtotal</span>
          <span>{totalPrice}</span>
        </p>
        <p>
          <span>Delivery</span>
          <span>€ 0.00</span>
        </p>
        <p>
          <span>Total (VAT included)</span>
          <span>€ {totalPrice}</span>
        </p>
      </div>
    </div>
  );
}
