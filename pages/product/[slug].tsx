import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import ChangeCartQuantity from '../../components/ChangeCartQuantity';
import { singleProductPageStyle } from '../../components/elements';
import LayoutNoHeader from '../../components/LayoutNoHeader';
import ProductImage from '../../components/ProductImage';
import ProductImageSmall from '../../components/ProductImageSmall';
import { CartContext } from '../../util/context/cartContext';
import { CartCookieContext } from '../../util/context/cookieContext';
import { getPlantByName } from '../../util/database';
import { Cookie, Plant, PropsTypePlantsCartCookieLayerPlantId } from '../types';

export default function SingleProduct(
  props: PropsTypePlantsCartCookieLayerPlantId,
) {
  const [quantity, setQuantity] = useState<number>(1);

  const incrementHandler = () => setQuantity(() => quantity + 1);
  const decrementHandler = () => setQuantity(() => quantity - 1);

  const { setParsedCookie, updateCartQuantity } = useContext(CartCookieContext);
  const { updateCart } = useContext(CartContext);

  useEffect(() => {
    setParsedCookie(props.cartCookie);
  }, []);

  const { id, price, name } = props.plant;

  const updateCartAndCookieHandler = () => {
    updateCartQuantity(id, quantity);

    updateCart(id, price, quantity, name);
  };

  return (
    <LayoutNoHeader>
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
          <div>
            <ProductImage src={`/image0${props.plant.id}.jpeg`} />
          </div>
          <article>
            <h1>{props.plant.name}</h1>
            <p data-test-id="product-price"> €{props.plant.price}</p>
            <p>{props.plant.description}</p>
            <div>
              <ChangeCartQuantity
                quantity={quantity}
                increment={incrementHandler}
                decrement={decrementHandler}
              />
              <button
                data-test-id="product-add-to-cart"
                onClick={updateCartAndCookieHandler}
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
    plant: Plant;
    cartCookie: Cookie[];
  }>
> {
  // get current plant via slug in url
  const plantSlug = String(context.query.slug);

  const plantName = plantSlug.replace(/\-+/g, ' ');
  const plant = await getPlantByName(plantName);

  const cartCookie: Cookie[] = JSON.parse(context.req.cookies.cart || '[]');

  console.log('---> cartCookie: ', cartCookie);
  return {
    props: {
      plant: plant,
      cartCookie: cartCookie,
    },
  };
}
