import { css } from '@emotion/react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import ButtonCallToAction from '../components/Buttons/ButtonCallToAction';
import { bestSellerStyle, summerFavoritesStyle } from '../components/elements';
import IndexTextImage from '../components/Images/IndexTextImage';
import Layout from '../components/Layout';
import Products from '../components/Products';
import prisma from '../prisma';
import { cleanedProducts } from '../util/database';
import { PropsTypePlantsCartCookieLayer } from '../util/types';

const bgImageHero = css`
  /*   background: no-repeat center url('indexHeroImg.jpeg');
  background-size: cover; */
`;

export default function Home(props: PropsTypePlantsCartCookieLayer) {
  const buttonInHeroImage = <ButtonCallToAction innerText="View All Plants" />;

  return (
    <Layout bgImageHero={bgImageHero} buttonInHeroImage={buttonInHeroImage}>
      <Head>
        <title>Plant Love</title>
        <meta name="description" content="Plant Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section css={bestSellerStyle}>
        <h2>Best Sellers</h2>
        <div>
          <Products plants={props.plants} />
        </div>
      </section>

      <section css={bestSellerStyle}>
        <h2>New releases</h2>
        <div>
          <Products plants={props.plants} />
        </div>
      </section>

      <section css={summerFavoritesStyle}>
        <h2>Summer Favorites</h2>
        <div>
          <IndexTextImage plants={props.plants} />
        </div>
      </section>
      <section css={bestSellerStyle}>
        <h2>On Sale</h2>
        <div>
          <Products plants={props.plants} />
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const products = await prisma.product.findMany({});
  const plantsSerializedPrice = cleanedProducts(products);

  return {
    props: {
      plants: plantsSerializedPrice,
    },
  };
};
