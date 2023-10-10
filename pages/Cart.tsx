import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import CartProducts from '../components/Cart/CartProducts';
import OrderSummary from '../components/Cart/OrderSummary';
import {
  shoppingCartSectionHeader,
  shoppingCartStyle,
  underConstruction,
} from '../components/elements';
import LayoutNoHeader from '../components/Layout/LayoutNoHeader';
//import { disableGrayLayer } from '../hooks';
import { CartContext } from '../util/context/cartContext';
import { CartCookieContext } from '../util/context/cookieContext';
import { getPlantsById } from '../util/database';
import { Cookie, PlantsAndQuantity } from './types';

type Props = {
  plants: PlantsAndQuantity[];
};

export default function ShoppingCart(props: Props) {
  const [cartProducts] = useState(props.plants);
  const { cartCount } = useContext(CartCookieContext);

  const { cartItems } = useContext(CartContext);

  useEffect(() => {
    cartItems(props.plants);
  }, []);

  // case: no cookie set
  if (!cartProducts.length || !cartCount) {
    return (
      <LayoutNoHeader>
        <Head>
          <title>Shopping Cart Items</title>
          <meta name="description" content="Your Shopping Cart" />
        </Head>
        <section css={underConstruction}>
          <h1> Your cart is currently empty.</h1>
          <Link href="/products" passHref legacyBehavior>
            <button>Continue Shopping</button>
          </Link>
        </section>
      </LayoutNoHeader>
    );
  }

  const cartHeader = (
    <section css={shoppingCartSectionHeader}>
      <h1>
        Your Cart ({cartCount} {cartCount === 1 ? 'Product' : 'Products'})
      </h1>
    </section>
  );

  // case: cookie set
  return (
    <LayoutNoHeader>
      <Head>
        <title>Shopping Cart Items</title>
        <meta name="description" content="Your Shopping Cart" />
      </Head>
      {cartHeader}
      <section css={shoppingCartStyle}>
        <CartProducts />
        <article>
          <h2>Total</h2>
          <OrderSummary />
          <div>
            <Link href="/checkout" passHref legacyBehavior>
              <button data-test-id="cart-checkout">Go to checkout</button>
            </Link>
          </div>
        </article>
      </section>
    </LayoutNoHeader>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<{ plants: PlantsAndQuantity[] }>> {
  const cartCookie: Cookie[] = JSON.parse(context.req.cookies.cart || '[]');

  // typescript narrowing
  if (typeof cartCookie === 'undefined') {
    return {
      props: {
        plants: [],
      },
    };
  }

  // get current products in cookie from db by ids
  const plantIds = cartCookie.map((event) => event.id);

  const plants = await getPlantsById(plantIds);
  // combine db-product info with cookie info:
  console.log('PLANTS: ', plants);

  const plantsAndQuantity = plants.map((plant) => {
    return {
      ...plant,
      quantity:
        cartCookie.find((productObject) => plant.id === productObject.id)
          ?.quantity || 0,
    };
  });

  console.log('plantsAndQuantity', plantsAndQuantity);

  // todo: plants return is: [[{}],[{}]]

  return {
    props: {
      plants: plantsAndQuantity,
    },
  };
}
