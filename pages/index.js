import { css, Global } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import ProductsComponent from '../components/ProductComponent';

const sectionOneIndex = css`
  background-color: grey;
`;

export default function Home() {
  return (
    <div>
      <Head>
        <title>Plant Love</title>
        <meta name="description" content="Plant Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <section>
        <h1>Plant Parent</h1>
      </section>
      <ProductsComponent />
    </div>
  );
}
