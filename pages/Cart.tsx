import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import CartItems from '../components/CartItems';
import {
  shoppingCartSectionHeader,
  shoppingCartStyle,
  underConstruction,
} from '../components/elements';
import LayoutCart from '../components/LayoutNoHeader';
import OrderSummaryCart from '../components/OrderSummaryCart';
import { disableGrayLayer } from '../hooks';
import { getPlantsById } from '../util/database';
import { PlantsAndQuantity } from './types';

type Props = {
  plants: PlantsAndQuantity[];
  showGrayLayer: boolean;
  setShowGrayLayer: Dispatch<SetStateAction<boolean>>;
};

export default function ShoppingCart(props: Props) {
  const [cartProducts, setCartProducts] = useState(props.plants);
  const [totalQuantity, setTotalQuantity] = useState(0);

  disableGrayLayer(props.showGrayLayer, props.setShowGrayLayer);

  useEffect(() => {
    // update amount of products in cart
    const sumOfProducts = cartProducts.reduce(
      (accumulator, product) => accumulator + (product.quantity ?? 0),
      0,
    );
    setTotalQuantity(sumOfProducts);
  }, [cartProducts]);

  // calculate total price
  let totalPrice = cartProducts.reduce(
    (accumulator, plant) => accumulator + plant.price * (plant.quantity || 0),
    0,
  );

  // case: no cookie set
  if (!cartProducts.length) {
    return (
      <LayoutCart
        showGrayLayer={props.showGrayLayer}
        setShowGrayLayer={props.setShowGrayLayer}
      >
        <Head>
          <title>Shopping Cart Items</title>
          <meta name="description" content="Your Shopping Cart" />
        </Head>
        <section css={underConstruction}>
          <h1> Your cart is currently empty.</h1>
          <Link href="/products" passHref>
            <button>Continue Shopping</button>
          </Link>
        </section>
      </LayoutCart>
    );
  }

  const cartHeader = (
    <section css={shoppingCartSectionHeader}>
      <h1>
        Your Cart ({totalQuantity}{' '}
        {totalQuantity === 1 ? 'Product' : 'Products'})
      </h1>
    </section>
  );

  // case: cookie set
  return (
    <LayoutCart
      showGrayLayer={props.showGrayLayer}
      setShowGrayLayer={props.setShowGrayLayer}
    >
      <Head>
        <title>Shopping Cart Items</title>
        <meta name="description" content="Your Shopping Cart" />
      </Head>
      {cartHeader}
      <section css={shoppingCartStyle}>
        <CartItems
          cartProducts={cartProducts}
          setCartProducts={setCartProducts}
        />
        <OrderSummaryCart totalPrice={Number(totalPrice.toFixed(2))} />
      </section>
    </LayoutCart>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<{ plants: PlantsAndQuantity[] }>> {
  const cartCookie: { plantId: number; quantity: number }[] = JSON.parse(
    context.req.cookies.cart || '[]',
  );

  // typescript narrowing
  if (typeof cartCookie === 'undefined') {
    return {
      props: {
        plants: [],
      },
    };
  }

  // get current products in cookie from db by ids
  const plantIds = cartCookie.map((event) => event.plantId);

  const plants = await getPlantsById(plantIds);
  // combine db-product info with cookie info:
  console.log('PLANTS: ', plants);

  const plantsAndQuantity = plants.map((plant) => {
    return {
      ...plant,
      quantity:
        cartCookie.find((productObject) => plant.id === productObject.plantId)
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
