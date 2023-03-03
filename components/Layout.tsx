import Head from 'next/head';
import { PropsTypeChildrenLayer } from '../pages/types';
import Header from './Header';

export default function Layout(props: PropsTypeChildrenLayer) {

  return (
    <>
      <Head>
        {' '}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
         showGrayLayer={props.showGrayLayer}
         setShowGrayLayer={props.setShowGrayLayer}
      />
      <main>
          {props.children}
      </main>
    </>
  );
}
