import Head from 'next/head';
import Link from 'next/link';
import { underConstruction } from '../components/elements';
import Layout from '../components/Layout';
import { disableGrayLayer } from '../hooks';
import { PropsTypeGrayLayer } from './types';

export default function UnderConstruction(props: PropsTypeGrayLayer) {
  disableGrayLayer(props.showGrayLayer, props.setShowGrayLayer)
  return (
    <Layout
    showGrayLayer={props.showGrayLayer}
    setShowGrayLayer={props.setShowGrayLayer}
    >
      <Head>
        <title>under construction</title>
        <meta name="description" content="site is under construction" />
      </Head>

      <section css={underConstruction}>
        <h1>Under Construction</h1>
        <Link href="/Products" passHref>
          <button>Continue Shopping</button>
        </Link>
      </section>
    </Layout>
  );
}
