import Head from 'next/head';
import Header from './Header';

type Props = {
  children?: React.ReactNode;
  showGrayLayer: boolean;
  setShowGrayLayer: Function;

};



export default function Layout(props: Props) {

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
