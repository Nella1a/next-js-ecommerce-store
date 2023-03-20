import Head from 'next/head';
import { PropsLayoutCart } from '../pages/types';
import Delivery from './DeliveryInfos';
import Footer from './Footer';
import Navigation from './Navigation';

export default function LayoutCart(props: PropsLayoutCart) {
  return (
    <>
      <Head>
        {' '}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation
        showGrayLayer={props.showGrayLayer}
        setShowGrayLayer={props.setShowGrayLayer}
        sumOfcart={props.sumOfcart}
      />

      <main>
        {props.children}
        <Delivery />
      </main>
      <Footer />
    </>
  );
}
