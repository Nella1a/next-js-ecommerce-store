import { css } from '@emotion/react';
import Head from 'next/head';
import Layout from '../components/Layout';
import UnderConstruction from '../components/underConstruction';

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
      <UnderConstruction />
    </Layout>
  );
}
