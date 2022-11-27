import Head from 'next/head';
import Header from './Header';

type Props = {
  children?: React.ReactNode;

};



export default function Layout(props: Props) {
  return (
    <>
      <Head>
        {' '}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
         showRespMenue={props.showRespMenue}
         setShowRespMenue={props.setShowRespMenue}


      />
      <main>
          {props.children}
      </main>
    </>
  );
}
