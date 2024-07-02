import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
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
import { Cookie, Plant } from '../../util/types';

type SingleProductProps = {
  plant: Plant;
  cartCookie: Cookie[];
};

export default function SingleProduct(props: SingleProductProps) {
  const [quantity, setQuantity] = useState<number>(1);
  const { setParsedCookie, updateCartQuantity } = useContext(CartCookieContext);
  const { updateCart } = useContext(CartContext);
  const { id, price, title, slug, img_url } = props.plant;

  const incrementHandler = () =>
    setQuantity((previousCount) => previousCount + 1);

  const decrementHandler = () => {
    if (quantity > 1) {
      setQuantity((previousCount) => previousCount - 1);
    }
  };

  useEffect(() => {
    setParsedCookie(props.cartCookie);
  }, []);

  const updateCartAndCookieHandler = () => {
    updateCartQuantity(id, quantity);
    updateCart(id, title, price, slug, img_url, quantity);

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
            <ProductImageSmall src={props.plant.img_url[0].url} />
          </div>
          <div>
            <ProductImageSmall src={props.plant.img_url[0].url} />
          </div>
          <div>
            <ProductImageSmall src={props.plant.img_url[0].url} />
          </div>
          <div>
            <ProductImageSmall src={props.plant.img_url[0].url} />
          </div>
        </article>

        <article>
          <div css={productImageContainer}>
            {titleAndPrice()}
            <ProductImage src={props.plant.img_url[0].url} title={title} />
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
    include: {
      img_url: {
        select: {
          url: true,
        },
      },
    },
  });

  // Map over the results to format them with the Plant type
  const formattedPlants = plant.map((p) => {
    return {
      ...p,
      price: p.price.toNumber(),
    };
  });

  const cartCookie: Cookie[] = JSON.parse(context.req.cookies.cart || '[]');

  return {
    props: {
      plant: formattedPlants[0],
      cartCookie: cartCookie,
    },
  };
}
