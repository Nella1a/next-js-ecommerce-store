import { css } from '@emotion/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import BackGImage from '../components/BackGImage';
import Delivery from '../components/DeliveryInfos';
// import { useState } from 'react';
import { bestSellerStyle, styleLargeButton } from '../components/elements';
import Footer from '../components/Footer';
import LargeButton from '../components/LargeButton';
import Layout from '../components/Layout';
import ProductsComponent from '../components/ProductComponent';
import { readPlants } from '../util/database.js';

const bgImageHero = css`
  background: url("header_blank.jpg") no-repeat right -100px bottom;
`;

const bgImageSale = css`
  background: url("placeholder_sale.jpg") no-repeat right -100px bottom;
  background-size: 1600px;
`;

const buttonCallToAction = css`
  border-radius: 10rem;
`


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

      <BackGImage
        firstText="Lorem Ipsum Lorem"
        secondText="Lorem Ipsum Lorem Ipsum!"
        bgImage={bgImageHero}
        />
      <section css={bestSellerStyle}>
        <h2>Best Seller</h2>
        <ProductsComponent plants={props.plants} />
        <ProductsComponent plants={props.plants} />
        <LargeButton styleButton={styleLargeButton} innerText="Shop Bestsellers" styleb={buttonCallToAction}/>
      </section>
      <BackGImage bgImage={bgImageSale} />
      <section css={bestSellerStyle}>
        <h2>Sale</h2>
        <div>
          <ProductsComponent plants={props.plants} />
        </div>
        <LargeButton styleButton={styleLargeButton} innerText="Shop Sales Items" styleb={buttonCallToAction}/>
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
  // console.log('Index_ServerSide_Cookies:', allCartCookies);

  /* return plants via props to frontend */
  return {
    props: {
      plants: plants,
      cartCookies: allCartCookies || null,
    },
  };
};
