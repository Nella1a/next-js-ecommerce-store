import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import ButtonCallToAction from '../../components/Buttons/ButtonCallToAction';
import ChangeCartQuantity from '../../components/ChangeCartQuantity';
import {
  imageGallery,
  productDetailsContainer,
  productImageContainer,
  productTitleAndPriceContainer,
  singleProductPageStyle,
} from '../../components/elements';
import ProductImage from '../../components/Images/ProductImage';
import ProductImageSmall from '../../components/Images/ProductImageSmall';
import LayoutNoHeader from '../../components/Layout/LayoutNoHeader';
import prisma from '../../prisma';
import { CartContext } from '../../util/context/cartContext';
import { CartCookieContext } from '../../util/context/cookieContext';
import { cleanedProducts } from '../../util/database';
import {
  Cookie,
  Plant,
  PropsTypePlantsCartCookieLayerPlantId,
} from '../../util/types';

export default function SingleProduct(
  props: PropsTypePlantsCartCookieLayerPlantId,
) {
  const [quantity, setQuantity] = useState<number>(1);

  const incrementHandler = () => setQuantity(() => quantity + 1);
  //const decrementHandler = () => setQuantity(() => quantity - 1);

  const decrementHandler = () => {
    if (quantity > 1) {
      setQuantity(() => quantity - 1);
    }
  };

  const { setParsedCookie, updateCartQuantity } = useContext(CartCookieContext);
  const { updateCart } = useContext(CartContext);

  useEffect(() => {
    setParsedCookie(props.cartCookie);
  }, []);

  const { id, price, title } = props.plant;

  const updateCartAndCookieHandler = () => {
    updateCartQuantity(id, quantity);
    updateCart(id, price, quantity, title);

    const addToCartFunction = async () => {
      const res = await fetch('/api/addToCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, quantity }),
      });

      const response = await res.json();

      if ('error' in response) {
        return null;
      }
    };

    addToCartFunction();
  };

  const titleAndPrice = () => (
    <div css={productTitleAndPriceContainer}>
      <h1>{props.plant.title}</h1>
      <p data-test-id="product-price"> &euro; {props.plant.price}</p>
    </div>
  );

  return (
    <LayoutNoHeader>
      <Head>
        <title>Plant</title>
        <meta name="Plant with a smile" content="View all Plants" />
      </Head>
      <section css={singleProductPageStyle}>
        <article css={imageGallery}>
          <div>
            <ProductImageSmall src={`/image${props.plant.id}.jpeg`} />
          </div>
          <div>
            <ProductImageSmall src={`/image${props.plant.id}.jpeg`} />
          </div>
          <div>
            <ProductImageSmall src={`/image${props.plant.id}.jpeg`} />
          </div>
          <div>
            <ProductImageSmall src={`/image${props.plant.id}.jpeg`} />
          </div>
        </article>

        <article>
          <div css={productImageContainer}>
            {titleAndPrice()}
            <ProductImage src={`/image${props.plant.id}.jpeg`} title={title} />
          </div>

          <div css={productDetailsContainer}>
            <div>
              {titleAndPrice()}
              <p>{props.plant.descr}</p>
              <div>
                <button
                  data-test-id="product-add-to-cart"
                  onClick={updateCartAndCookieHandler}
                >
                  Add to cart
                </button>

                <ChangeCartQuantity
                  quantity={quantity}
                  increment={incrementHandler}
                  decrement={decrementHandler}
                />
              </div>
            </div>
          </div>
        </article>
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
  const plant = await prisma.product.findMany({
    where: { slug: plantSlug },
  });
  const [plantSerializedPrice] = cleanedProducts(plant);

  const cartCookie: Cookie[] = JSON.parse(context.req.cookies.cart || '[]');

  return {
    props: {
      plant: plantSerializedPrice,
      cartCookie: cartCookie,
    },
  };
}
