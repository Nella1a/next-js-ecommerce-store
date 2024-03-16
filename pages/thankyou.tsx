import Head from 'next/head';
import { underConstruction } from '../components/elements';
import Layout from '../components/Layout';
import LayoutNoHeader from '../components/Layout/LayoutNoHeader';

export default function ThankYouPage() {
  // disableGrayLayer(props.showGrayLayer, props.setShowGrayLayer);
  return (
    <LayoutNoHeader>
      <Head>
        <title>Thank you!</title>
        <meta name="description" content="checkout thank you page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section css={underConstruction}>
        <article>
          <h1>Thank you for your order.</h1>
        </article>
      </section>
    </LayoutNoHeader>
  );
}
