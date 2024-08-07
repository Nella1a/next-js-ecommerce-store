import Head from 'next/head';
import { PropsTypeChildrenLayer } from '../../util/types';
import Delivery from '../Delivery';
import Footer from '../Footer';
import { Header } from '../Header';
import MobileFooter from '../Mobile/MobileFooter';
import { BREAKPOINT_AT_768, getScreenSize } from '../Navigation';

export default function Layout(props: PropsTypeChildrenLayer) {
  const screenwidth = getScreenSize();
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header
        firstText={props.firstText}
        secondText={props.secondText}
        thirdText={props.thirdText}
        imgUrl={props.imgUrl}
        buttonInHeroImage={props.buttonInHeroImage}
      />

      <main>
        {props.children}
        <Delivery />
      </main>
      {screenwidth > BREAKPOINT_AT_768 ? <Footer /> : <MobileFooter />}
    </>
  );
}
