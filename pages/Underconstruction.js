import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout';
import { underConstruction } from '../components/elements';

export default function UnderConstruction() {
  return (
    <Layout>
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
