// import { css, Global } from '@emotion/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { sectionStyle } from '../components/elements';
// import Header from '../components/Header';
import Layout from '../components/Layout';
// import ProductsComponent from '../components/ProductComponent';
import { readPlants } from '../util/database';
// import SingleAnimal from './Products/[plantID]';

// const styleSectionProducts = css`
//   display: flex;
//   gap: 48px;

//   h2 {
//     margin: 8px 0;
//     font-size: 16px;
//   }
// `;

type Plants = {
  id: number;
  name: string;
  price: number;
};

type Props = {
  plants: Plants[];
};

export default function Products(props: Props) {
  // console.log('Products_cartCookies:', props.cartCookie);
  console.log('props:', props);
  return (
    <Layout>
      <Head>
        <title>View all Plants</title>
        <meta name="description" content="View all Plants" />
      </Head>
      {/* <h1>Products</h1> */}
      <section css={sectionStyle}>
        {' '}
        {/* {console.log('Products_Plants_Database:', props.plants)} */}
        {/*   {console.log('ProductComponent Cookie:', props.cartCookie)}
        {console.log('ProductComponent1 props.plants:', props.plants)}
        {console.log(typeof props.plants)} */}
        {props.plants.map((event) => {
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
      </section>
      {/* {props.children} */}
      {/* <SingleAnimal cartCookie={props.cartCookie} /> */}
    </Layout>
  );
}

// export async function getServerSideProps(context) {
//   // read plants from database
//   const plants = await readPlants();
//   // if the cookie is undefined it is going to return an empty array
//   // If it is defined it will return everything inside of it
//   const cartCookies = context.req.cookies.cart || '[]';

//   const allCartCookies = JSON.parse(cartCookies);
//   // console.log('headCookdies:', allCartCookies);
//   /* return plants via props to frontend */
//   return {
//     props: {
//       plants: plants,
//       cartCookies: allCartCookies,
//     },
//   };
// }

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
