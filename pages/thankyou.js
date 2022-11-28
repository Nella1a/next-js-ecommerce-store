import Head from 'next/head';
import Layout from '../components/Layout';
import { disableGrayLayer } from '../hooks';

export default function ThankYouPage(props) {
  disableGrayLayer(props.showGrayLayer, props.setShowGrayLayer)
  return (
    <Layout
    showGrayLayer={props.showGrayLayer}
    setShowGrayLayer={props.setShowGrayLayer}
    >
      <Head>
        <title>Thank you for your order</title>
        <meta name="description" content="checkout thank you page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section css>
        <h1>Thank you for your order.</h1>
      </section>
    </Layout>
  );
}
