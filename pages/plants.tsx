import { css } from '@emotion/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import {
  container,
  h2Section,
  h2SectionMediaQuery75,
  marginTop,
} from '../components/elements';
import Layout from '../components/Layout';
import Products from '../components/Products';
import prisma from '../prisma';
import { cleanedProducts, getProducts } from '../util/database';
import { PropsTypePlantsLayer } from '../util/types';

export const productsComponentStyle = css`
  ${container}
  ${marginTop}

  h1 {
    ${h2Section}
  }

  > div:first-of-type {
    display: grid;
    gap: var(--space-lg);
    grid-template-columns: repeat(4, 1fr);

    a:link,
    a:visited {
      color: var(--text-color);
    }

    a:hover,
    a:active {
      color: var(--text-color);
    }

    @media screen and (max-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 75rem) {
    padding: 0 1.5rem;
    h1 {
      ${h2SectionMediaQuery75}
    }
  }
`;

export default function Plants(props: PropsTypePlantsLayer) {
  // disableGrayLayer(props.showGrayLayer, props.setShowGrayLayer);

  return (
    <Layout
      imgUrl={`https://res.cloudinary.com/mix571zo0/image/upload/v1719077115/dr635i8y7x450vvrwwfg.jpg`}
      // buttonInHeroImage={buttonInHeroImage}
    >
      <Head>
        <title>View all Plants</title>
        <meta name="description" content="View all Plants" />
      </Head>
      <section css={productsComponentStyle}>
        <h1>All Plants</h1>
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
  const products = await getProducts();

  const plantsSerializedPrice = cleanedProducts(products);

  return {
    props: {
      plants: plantsSerializedPrice,
    },
  };
};
