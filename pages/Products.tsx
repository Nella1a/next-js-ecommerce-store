import { css } from '@emotion/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { productsComponentStyle } from '../components/elements';
import Layout from '../components/Layout';
import Products from '../components/Products';
import prisma from '../prisma';
import { cleanedProducts } from '../util/database';
import { PropsTypePlantsLayer } from '../util/types';

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
  const plantsSerializedPrice = cleanedProducts(products);

  return {
    props: {
      plants: plantsSerializedPrice,
    },
  };
};
