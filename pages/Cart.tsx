import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import CartProducts from '../components/Cart/CartProducts';
import OrderSummary from '../components/Cart/OrderSummary';
import { shoppingCartStyle, underConstruction } from '../components/elements';
import LayoutNoHeader from '../components/Layout/LayoutNoHeader';
import prisma from '../prisma';
//import { disableGrayLayer } from '../hooks';
import { CartContext } from '../util/context/cartContext';
import { CartCookieContext } from '../util/context/cookieContext';
import { cleanedProducts, Plant } from '../util/database';
import { Cookie, PlantsAndQuantity } from '../util/types';

type Props = {
  plants: PlantsAndQuantity[];
};

export default function Cart(props: Props) {
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
          <article>
            <h1> Your cart is currently empty.</h1>
            <Link
              href={{
                pathname: '/plants',
              }}
              passHref
            >
              <button>Continue Shopping</button>
            </Link>
          </article>
        </section>
      </LayoutNoHeader>
    );
  }

  const cartHeader = (
    <h1>
      Your Cart ({cartCount} {cartCount === 1 ? 'Product' : 'Products'})
    </h1>
  );

  // case: cookie set
  return (
    <LayoutNoHeader>
      <Head>
        <title>Shopping Cart Items</title>
        <meta name="description" content="Your Shopping Cart" />
      </Head>

      <section css={shoppingCartStyle}>
        {cartHeader}
        <div>
          <CartProducts />
          <article>
            <h2>Total</h2>
            <OrderSummary />

            <Link
              href={{
                pathname: '/checkout',
              }}
              passHref
            >
              <button data-test-id="cart-checkout">Go to checkout</button>
            </Link>
          </article>
        </div>
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

  // get current productsIds from cookie
  const plantIds = cartCookie.map((event) => event.id);

  // query db
  const plants = await prisma.product.findMany({
    where: {
      id: {
        in: plantIds,
      },
    },
  });

  // serialize price
  const plantsSerializedPrice = cleanedProducts(plants);

  // combine db-product info with cookie info
  const plantsAndQuantity = plantsSerializedPrice.map((plant) => {
    return {
      ...plant,
      quantity:
        cartCookie.find((productObject) => plant.id === productObject.id)
          ?.quantity || 0,
    };
  });

  return {
    props: {
      plants: plantsAndQuantity,
    },
  };
}
