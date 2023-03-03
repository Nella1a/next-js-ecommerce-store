import Link from 'next/link';

type Props = {
  totalPrice: number
}

export default function OrderSummeryCart(props: Props){
  return(
    <article>
    <div>
      <h2>Total</h2>
      <div>
        <p>
          <span>Subtotal</span>
          <span>{props.totalPrice}</span>
        </p>
        <p>
          <span>Delivery</span>
          <span>€ 0.00</span>
        </p>
      </div>
      <div>
      <p>
        <span>Total (VAT included)</span>
        <span>€ {props.totalPrice}</span>
      </p>
      <Link href="/checkout" passHref>
        <button data-test-id="cart-checkout">Go to checkout</button>
      </Link>
      </div>
    </div>
  </article>
  )

  }