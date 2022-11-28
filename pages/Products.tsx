import { css } from '@emotion/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import BackGImage from '../components/BackGImage';
import Delivery from '../components/DeliveryInfos';
import {
  bestSellerStyle,
  productsComponentStyle,
} from '../components/elements';
import Footer from '../components/Footer';
import Layout from '../components/Layout';
import ProductsComponent from '../components/ProductComponent';
import { disableGrayLayer } from '../hooks';
import { readPlants } from '../util/database';

type Plants = {
  id: number;
  name: string;
  price: number;
};

type Props = {
  plants: Plants[];
  showGrayLayer: boolean;
  setShowGrayLayer: Function;
};

export default function Products(props: Props) {

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

//firstText="Delivering Plants,"
//secondText="Delivering Happiness!"
bgImage={bgImageHero}
/>
      <section css={productsComponentStyle}>
        <h2>Products</h2>

         <article>
            <ProductsComponent plants={props.plants} />
            <ProductsComponent plants={props.plants} />
            <ProductsComponent plants={props.plants} />
         </article>




{/*         {props.plants.map((event) => {
          return (
            <div key={`guest-${event.id}`}>
              <Link href={`/Products/${event.id}`}>
                <a data-test-id={`data-test-id-${event.id}`}>
                  {console.log('id:', event.id)}
                  <Image
                    src={`/image0${event.id}.jpeg`}
                    width="393"
                    height="491,5"
                    alt="succulenten1"
                  />
                </a>
              </Link>
              <h2>{event.name}</h2>
              <p>€{event.price}</p>
            </div>
          );
        })}
 */}


      </section>
      <Delivery />
      <Footer />
    </Layout>
  );
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  // read plants from database
  const plants = await readPlants();
  console.log('plants gSSP:', plants);
  // if the cookie is undefined it is going to return an empty array
  // If it is defined it will return everything inside of it
  const cartCookies = context.req.cookies.cart || '[]';

  const allCartCookies = JSON.parse(cartCookies);
  // console.log('headCookdies:', allCartCookies);
  /* return plants via props to frontend */
  return {
    props: {
      plants: plants,
      cartCookies: allCartCookies,
    },
  };
};
