import Head from 'next/head';
import Layout from '../components/Layout';
import UnderConstruction from '../components/underConstruction';
import { disableGrayLayer } from '../hooks';

export default function Contact() {
  // disableGrayLayer(props.showGrayLayer, props.setShowGrayLayer);
  return (
    <Layout>
      <Head>
        <title>under construction</title>
        <meta name="description" content="site is under construction" />
      </Head>
      <UnderConstruction />
    </Layout>
  );
}
