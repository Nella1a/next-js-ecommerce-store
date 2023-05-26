import Head from 'next/head';
import { PropsLayoutCart } from '../pages/types';
import Delivery from './DeliveryInfos';
import Footer from './Footer/Footer';
import MobileFooter from './Footer/MobileFooter';
import Navigation from './Navigation';

export default function LayoutCart(props: PropsLayoutCart) {
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
