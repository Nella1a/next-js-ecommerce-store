import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
// import { useState } from 'react';
import {
  bestSellerStyle,
  heroImage,
  indexJsStyle,
} from '../components/elements';
import Layout from '../components/Layout';
import ProductsComponent from '../components/ProductComponent';
import { readPlants } from '../util/database.js';

type Plants = {
  id: number;
  name: string;
  price: number;
};

type CartCookie = {
  plantId: number;
  name: string;
  price?: number;
};

type Props = {
  plants: Plants[];
  cartCookies: CartCookie[];
};
export default function Home(props: Props) {
  // const [cartCookie, setCartCookie] = useState(props.cartCookies);

  console.log('Index_props.database typeopf:', typeof props.plants);
  console.log('Index_cartCookie: typeof', typeof props.cartCookies);
  return (
    <Layout>
      <Head>
        <title>Plant Love</title>
        <meta name="description" content="Plant Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <img src="/header_blank.jpg" alt="Hero" css={heroImage} />
      <section css={indexJsStyle}>
        <div>
          <p>Lorem Ipsum Lorem</p>
          <p>Lorem Ipsum Lorem Lorem!</p>
          <p>
            <Link href="/Products" passHref>
              <button data-test-id="button-view-all-plants">
                {' '}
                View All Plants
              </button>
            </Link>
          </p>
        </div>
      </section>
      <section css={bestSellerStyle}>
        <ProductsComponent plants={props.plants} />
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // read plants from database
  const plants = await readPlants();

  // if the cookie is undefined it is going to return an empty array
  // If it is defined it will return everything inside of it
  const cartCookies = context.req.cookies.cart || '[]';

  const allCartCookies = JSON.parse(cartCookies);
  // console.log('Index_ServerSide_Cookies:', allCartCookies);

  /* return plants via props to frontend */
  return {
    props: {
      plants: plants,
      cartCookies: allCartCookies || null,
    },
  };
};
