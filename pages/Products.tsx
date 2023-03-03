import { css } from '@emotion/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import BackGImage from '../components/BackGImage';
import Delivery from '../components/DeliveryInfos';
import { productsComponentStyle } from '../components/elements';
import Footer from '../components/footer/footer';
import Layout from '../components/Layout';
import ProductsComponent from '../components/ProductComponent';
import { disableGrayLayer } from '../hooks';
import { readPlants } from '../util/database';
import { PropsTypePlantsLayer } from './types';

export default function Products(props: PropsTypePlantsLayer) {

disableGrayLayer(props.showGrayLayer, props.setShowGrayLayer)

const bgImageHero = css`
  background: no-repeat center url("indexHeroImg.jpeg");
  background-size: cover;
`;


  return (
    <Layout
    showGrayLayer={props.showGrayLayer}
    setShowGrayLayer={props.setShowGrayLayer}
    >
      <Head>
        <title>View all Plants</title>
        <meta name="description" content="View all Plants" />
      </Head>
      <BackGImage

// firstText="Delivering Plants,"
// secondText="Delivering Happiness!"
bgImage={bgImageHero}
/>
      <section css={productsComponentStyle}>
        <h2>Products</h2>
         <article>
            <ProductsComponent plants={props.plants} />
            <ProductsComponent plants={props.plants} />
            <ProductsComponent plants={props.plants} />
         </article>
      </section>
      <Delivery />
      <Footer />
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

  return {
    props: {
      plants: plants,
      cartCookies: allCartCookies,
    },
  };
};
