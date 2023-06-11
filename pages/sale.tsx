import { css } from '@emotion/react';
import Head from 'next/head';
// import Link from 'next/link';
import BackGImage from '../components/Images/BackGImage';
import Layout from '../components/Layout';

/* const bgImageSale = css`
  background: url('BgImageSale.jpeg') no-repeat right -100px bottom;
  background-size: 1600px;
`;
 */
const bgImageSale = css`
  background: no-repeat center url('bgImageSale.jpeg');
  background-size: cover;
`;

export default function Sale({}) {
  return (
    <Layout bgImageHero={bgImageSale}>
      <Head>
        <title>Sale</title>
        <meta name="description" content="site is under construction" />
      </Head>
      {/*       <BackGImage bgImage={bgImageSale} />
       */}{' '}
    </Layout>
  );
}
