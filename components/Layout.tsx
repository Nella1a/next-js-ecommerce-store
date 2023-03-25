import Head from 'next/head';
import { PropsTypeChildrenLayer } from '../pages/types';
import Delivery from './DeliveryInfos';
import Footer from './Footer';
import MobileFooter from './Footer/MobileFooter';
import { Header } from './Header';
import Navigation from './Navigation';

export default function Layout(props: PropsTypeChildrenLayer) {
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
      <Header
        firstText="Delivering Plants,"
        secondText="Delivering Happiness!"
        bgImageHero={props.bgImageHero}
        buttonInHeroImage={props.buttonInHeroImage}
      />

      <main>
        {props.children}
        <Delivery />
      </main>
      <Footer />
      <MobileFooter />
    </>
  );
}
