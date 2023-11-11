import Head from 'next/head';
import { PropsLayoutCart } from '../../../util/types';
import Delivery from '../../Delivery';
import Footer from '../../Footer';
import MobileDelivery from '../../Mobile/MobileDelivery';
import MobileFooter from '../../Mobile/MobileFooter';
import Navigation, { BREAKPOINTAT768, getScreenSize } from '../../Navigation';
import NavWithLogoOnly from '../../Navigation/NavWithLogoOnly';

export default function LayoutNoHeaderAndFooter(props: PropsLayoutCart) {
  return (
    <>
      <Head>
        {' '}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavWithLogoOnly />

      <main>{props.children}</main>
    </>
  );
}
