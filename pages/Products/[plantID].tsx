import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import ChangeCartQuantity from '../../components/ChangeCartQuantity';
import Delivery from '../../components/DeliveryInfos';
import {
  productImageContainer,
  singleProductPageStyle,
} from '../../components/elements';
import LayoutNoHeader from '../../components/LayoutNoHeader';
import ProductImage from '../../components/ProductImage';
import ProductImageSmall from '../../components/ProductImageSmall';
import Quantity from '../../components/Quantity';
import { setParsedCookie } from '../../util/cookies';
import { getPlantById } from '../../util/database';
import { addAndUpdateQuantityInCookie } from '../../util/functions';
import { CartCookieTwo, PropsTypePlantsCartCookieLayerPlantId } from '../types';

export default function SingleProduct(
  props: PropsTypePlantsCartCookieLayerPlantId,
) {
  const [quantity, setQuantity] = useState(1);
  const [cartCookie, setCartCookie] = useState(props.cartCookie);

  const updateCartQuantity = () => {
    const updateCookie = addAndUpdateQuantityInCookie(
      props.plant.id,
      quantity,
      cartCookie,
    );
    console.log('newCookie: ', updateCookie);
    setCartCookie(updateCookie);
    setParsedCookie('cart', updateCookie);
  };

  return (
    <LayoutNoHeader
      showGrayLayer={props.showGrayLayer}
      setShowGrayLayer={props.setShowGrayLayer}
    >
      <Head>
        <title>Plant</title>
        <meta name="Plant with a smile" content="View all Plants" />
      </Head>
      <section css={singleProductPageStyle}>
        <div>
          <div>
            <ProductImageSmall src={`/image0${props.plant.id}.jpeg`} />
          </div>
          <div>
            <ProductImageSmall src={`/image0${props.plant.id}.jpeg`} />
          </div>
          <div>
            <ProductImageSmall src={`/image0${props.plant.id}.jpeg`} />
          </div>
        </div>
        <div>
          <ProductImage src={`/image0${props.plant.id}.jpeg`} />
          <article>
            <h1>{props.plant.name}</h1>
            <p data-test-id="product-price"> €{props.plant.price}</p>
            <p>{props.plant.description}</p>
            <div>
              <ChangeCartQuantity
                quantity={quantity}
                setQuantity={setQuantity}
              />
              <button
                data-test-id="product-add-to-cart"
                onClick={updateCartQuantity}
              >
                Add to cart
              </button>
            </div>
          </article>
        </div>
      </section>
    </LayoutNoHeader>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext,
): Promise<
  GetServerSidePropsResult<{
    // plantID: string | string[] | undefined;
    plant: { id: number; name: string; price: number; description: string }[];
    // cart: {plantId: string, quantity: string}[];
    cartCookie: CartCookieTwo[];
  }>
> {
  /* get current plant id from ../product/id */
  const plantID = Number(context.query.plantID);
  console.log('plantID', plantID);
  console.log('typeof plantID', typeof plantID);

  /* get the plantID from database */
  const plant = await getPlantById(plantID);

  /* read current cookie; if no cookie return [] */
  const cartCookie: CartCookieTwo[] = JSON.parse(
    context.req.cookies.cart || '[]',
  );
  console.log('CCCCART: ', cartCookie);

  /*  return singlePlant and plantID via props to frontend */

  return {
    props: {
      plant: plant,
      cartCookie: cartCookie,
    },
  };
}
