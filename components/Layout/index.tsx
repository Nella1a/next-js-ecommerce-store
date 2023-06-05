import Head from 'next/head';
import { PropsTypeChildrenLayer } from '../../pages/types';
import Delivery from '../Delivery';
import Footer from '../Footer';
import { Header } from '../Header';
import MobileFooter from '../Mobile/MobileFooter';
import Navigation from '../Navigation';

export default function Layout(props: PropsTypeChildrenLayer) {
  return (
    <>
      <Head>
        {' '}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />
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
