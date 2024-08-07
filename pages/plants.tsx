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
import { getAllProducts } from '../util/database';
import { Plant } from '../util/types';

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

export default function Plants(props: { plants: Plant[] }) {
  // disableGrayLayer(props.showGrayLayer, props.setShowGrayLayer);

  return (
    <Layout
      imgUrl={`plantStore/jofqtldcixcumcbdm3hw`}
      firstText="Delivering plants,"
      secondText="delivering happiness!"
      thirdText="Shop your favorite plants"
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
  const products = await getAllProducts();

  return {
    props: {
      plants: products,
    },
  };
};
