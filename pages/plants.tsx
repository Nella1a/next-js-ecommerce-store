import { GetStaticProps } from 'next';
import Head from 'next/head';
import { productsComponentStyle } from '../components/elements';
import Layout from '../components/Layout';
import Products from '../components/Products';
import prisma from '../prisma';
import ProductsHeroImage from '../public/productsHeroImage.jpg';
import { cleanedProducts } from '../util/database';
import { PropsTypePlantsLayer } from '../util/types';

export default function Plants(props: PropsTypePlantsLayer) {
  // disableGrayLayer(props.showGrayLayer, props.setShowGrayLayer);

  return (
    <Layout
      bgImageHero={ProductsHeroImage}
      // buttonInHeroImage={buttonInHeroImage}
    >
      <Head>
        <title>View all Plants</title>
        <meta name="description" content="View all Plants" />
      </Head>
      <section css={productsComponentStyle}>
        <h2>Products</h2>
        <div>
          <Products plants={props.plants} />
          <Products plants={props.plants} />
          <Products plants={props.plants} />
        </div>
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
