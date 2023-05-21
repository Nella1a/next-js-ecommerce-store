import { css } from '@emotion/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import ButtonCallToAction from '../components/ButtonCallToAction';
import { bestSellerStyle, indexTextImageComp } from '../components/elements';
import IndexTextImage from '../components/IndexTextImage';
import Layout from '../components/Layout';
import ProductsComponent from '../components/ProductComponent';
import { readPlants } from '../util/database';
import { PropsTypePlantsCartCookieLayer } from './types';

const bgImageHero = css`
  background: no-repeat center url('indexHeroImg.jpeg');
  background-size: cover;
`;

export default function Home(props: PropsTypePlantsCartCookieLayer) {
  console.log('Index_props.database typeopf:', typeof props.plants);
  console.log('Props.RespMenue: ', props.showGrayLayer);

  const buttonInHeroImage = <ButtonCallToAction innerText="View All Plants" />;

  return (
    <Layout
      showGrayLayer={props.showGrayLayer}
      setShowGrayLayer={props.setShowGrayLayer}
      bgImageHero={bgImageHero}
      buttonInHeroImage={buttonInHeroImage}
    >
      <Head>
        <title>Plant Love</title>
        <meta name="description" content="Plant Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section css={bestSellerStyle}>
        <h2>Best Sellers</h2>
        <div>
          <ProductsComponent plants={props.plants} />
        </div>
      </section>

      <section css={bestSellerStyle}>
        <h2>Best Sellers</h2>
        <div>
          <ProductsComponent plants={props.plants} />
        </div>
      </section>

      <section>
        <h2>Summer Favorites</h2>
        <div css={indexTextImageComp}>
          <IndexTextImage plants={props.plants} />
        </div>
      </section>
      <section css={bestSellerStyle}>
        <h2>On Sale</h2>
        <div>
          <ProductsComponent plants={props.plants} />
        </div>
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  // read plants from database
  const plants = await readPlants();

  return {
    props: {
      plants: plants,
    },
  };
};
