import Head from 'next/head';
import Layout from '../components/Layout';

export default function ThankYouPage() {
  return (
    <Layout>
      <Head>
        <title>Thank you for your order</title>
        <meta name="description" content="checkout thank you page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section css>
        <h1>Thank you for your order.</h1>
        <article>
          <p>Your Order Number: XXX </p>
          <p>
            We are processing it now. You will receive an email confirmation
            shortly.{' '}
          </p>
        </article>
      </section>
    </Layout>
  );
}
