import { css } from '@emotion/react';
import Head from 'next/head';
// import Link from 'next/link';
import BackGImage from '../components/BackGImage';
import Layout from '../components/Layout';
import { PropsTypeGrayLayer } from './types';

const bgImageSale = css`
  background: url('placeholder_sale.jpg') no-repeat right -100px bottom;
  background-size: 1600px;
`;

export default function Sale({
  showGrayLayer,
  setShowGrayLayer,
}: PropsTypeGrayLayer) {
  return (
    <Layout showGrayLayer={showGrayLayer} setShowGrayLayer={setShowGrayLayer}>
      <Head>
        <title>Sale</title>
        <meta name="description" content="site is under construction" />
      </Head>

      <BackGImage bgImage={bgImageSale} />
    </Layout>
  );
}
