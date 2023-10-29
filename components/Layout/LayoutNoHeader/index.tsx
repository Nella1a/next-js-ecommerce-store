import Head from 'next/head';
import { PropsLayoutCart } from '../../../util/types';
import Delivery from '../../Delivery';
import Footer from '../../Footer';
import MobileFooter from '../../Mobile/MobileFooter';
import Navigation from '../../Navigation';

export default function LayoutNoHeader(props: PropsLayoutCart) {
  return (
    <>
      <Head>
        {' '}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />

      <main>
        {props.children}
        <Delivery />
      </main>
      <Footer />
      <MobileFooter />
    </>
  );
}
