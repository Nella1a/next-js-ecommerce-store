import Head from 'next/head';
import Header from '../components/Header';
import Layout from '../components/Layout';
import ProductsComponent from '../components/ProductComponent';

export default function Products() {
  return (
    <Layout>
      <Head>
        <title>View all Plants</title>
        <meta name="description" content="View all Plants" />
      </Head>

      <section>
        {' '}
        <h1>Products</h1>
      </section>

      <ProductsComponent />
      <ProductsComponent />
    </Layout>
  );
}
