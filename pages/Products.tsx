import { css } from '@emotion/react';
import { GetServerSideProps, GetStaticProps } from 'next';
import Head from 'next/head';
//import { product } from 'puppeteer';
import { useContext } from 'react';
import { json } from 'stream/consumers';
import { productsComponentStyle } from '../components/elements';
import Layout from '../components/Layout';
import Products from '../components/Products';
import { disableGrayLayer } from '../hooks';
import prisma from '../prisma';
import { readPlants } from '../util/database';
import { PropsTypePlantsLayer } from './types';

export default function Directory(props: PropsTypePlantsLayer) {
  // disableGrayLayer(props.showGrayLayer, props.setShowGrayLayer);

  const bgImageHero = css`
    background: no-repeat center url('productsHeroImage.jpeg');
    background-size: cover;
  `;

  return (
    <Layout
      bgImageHero={bgImageHero}
      // buttonInHeroImage={buttonInHeroImage}
    >
      <Head>
        <title>View all Plants</title>
        <meta name="description" content="View all Plants" />
      </Head>
      <section css={productsComponentStyle}>
        <h2>Products</h2>
        <article>
          <Products plants={props.plants} />
          <Products plants={props.plants} />
          <Products plants={props.plants} />
        </article>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await prisma.product.findMany();

  const cleanedProducts = products.map((product) => ({
    ...product,
    // solves error: object Decimal cannot be serialized as JSON
    price: product.price.toNumber(),
  }));

  return {
    props: {
      plants: cleanedProducts,
    },
  };
};
