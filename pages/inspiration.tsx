import { css } from '@emotion/react';
import Head from 'next/head';
// import Link from 'next/link';
import BackGImage from '../components/Images/BackGImage';
import Layout from '../components/Layout';

const bgImageIns = css`
  background: no-repeat bottom url('inspirationHeroImage.jpeg');
  background-size: cover;
`;

export default function Inspiration({}) {
  return (
    <Layout bgImageHero={bgImageIns}>
      <Head>
        <title>Sale</title>
        <meta name="description" content="site is under construction" />
      </Head>
    </Layout>
  );
}
