import { css } from '@emotion/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import BackGImage from '../components/BackGImage';
import ButtonCallToAction from '../components/ButtonCallToAction';
import Delivery from '../components/DeliveryInfos';
import { bestSellerStyle, indexTextImageComp } from '../components/elements';
import Footer from '../components/footer/footer';
import IndexTextImage from '../components/IndexTextImage';
import Layout from '../components/Layout';
import ProductsComponent from '../components/ProductComponent';
import { readPlants } from '../util/database';
import { PropsTypePlantsCartCookieLayer } from './types';

const bgImageHero = css`
  background: no-repeat center url("indexHeroImg.jpeg");
  background-size: cover;
`;



export default function Home(props: PropsTypePlantsCartCookieLayer) {


  console.log('Index_props.database typeopf:', typeof props.plants);
  console.log('Index_cartCookie: typeof', typeof props.cartCookies);
  console.log("Props.RespMenue: ", props.showGrayLayer)

  const buttonInHeroImage = <ButtonCallToAction innerText="View All Plants" />


  return (
    <Layout
    showGrayLayer={props.showGrayLayer}
    setShowGrayLayer={props.setShowGrayLayer}

    >
      <Head>
        <title>Plant Love</title>
        <meta name="description" content="Plant Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <BackGImage
        firstText="Delivering Plants,"
        secondText="Delivering Happiness!"
        bgImage={bgImageHero}
        buttonInHeroImage={buttonInHeroImage}
        />

      <section css={bestSellerStyle}>
        <h2>Best Sellers</h2>
        <div>
          <ProductsComponent plants={props.plants} />
          <ProductsComponent plants={props.plants} />
        </div>
      </section>
      <section>
        <h2>Summer Favorites</h2>
        <div css={indexTextImageComp}>
          <IndexTextImage plants={props.plants} />
        </div>
      </section>
      <Delivery />
    <Footer />
      {/* <Footer2 /> */}
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
      cartCookies: allCartCookies || null,
    },
  };
};
