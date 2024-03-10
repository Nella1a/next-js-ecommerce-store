import Head from 'next/head';
import { PropsTypeChildrenLayer } from '../../util/types';
import Delivery from '../Delivery';
import Footer from '../Footer';
import { Header } from '../Header';
import MobileDelivery from '../Mobile/MobileDelivery';
import MobileFooter from '../Mobile/MobileFooter';
import { BREAKPOINTAT768, getScreenSize } from '../Navigation';

export default function Layout(props: PropsTypeChildrenLayer) {
  const screenwidth = getScreenSize();
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        firstText="Delivering Plants,"
        secondText="Delivering Happiness!"
        bgImageHero={props.bgImageHero}
        buttonInHeroImage={props.buttonInHeroImage}
      />

      <main>
        {props.children}
        {screenwidth > BREAKPOINTAT768 ? <Delivery /> : <MobileDelivery />}
      </main>
      {screenwidth > BREAKPOINTAT768 ? <Footer /> : <MobileFooter />}
    </>
  );
}
