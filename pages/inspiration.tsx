import { css } from '@emotion/react';
import Head from 'next/head';
// import Link from 'next/link';
import BackGImage from '../components/BackGImage';
import Layout from '../components/Layout';
import { PropsTypeGrayLayer } from './types';

const bgImageIns = css`
  background: no-repeat bottom url('inspirationHeroImage.jpeg');
  background-size: cover;
`;

export default function Inspiration({
  showGrayLayer,
  setShowGrayLayer,
}: PropsTypeGrayLayer) {
  return (
    <Layout
      showGrayLayer={showGrayLayer}
      setShowGrayLayer={setShowGrayLayer}
      bgImageHero={bgImageIns}
    >
      <Head>
        <title>Sale</title>
        <meta name="description" content="site is under construction" />
      </Head>
    </Layout>
  );
}
