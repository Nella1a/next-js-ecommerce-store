import Head from 'next/head';
import { PropsLayoutCart } from '../../../util/types';
import Delivery from '../../Delivery';
import Footer from '../../Footer';
import MobileFooter from '../../Mobile/MobileFooter';
import Navigation, { BREAKPOINTAT768, getScreenSize } from '../../Navigation';

export default function LayoutNoHeader(props: PropsLayoutCart) {
  const screenwidth = getScreenSize();
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
      {screenwidth > BREAKPOINTAT768 ? <Footer /> : <MobileFooter />}
    </>
  );
}
