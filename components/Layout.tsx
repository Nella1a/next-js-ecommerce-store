import Head from 'next/head';
import Footer from './Footer';
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
      <Header />
      <main>
        {props.children}
        {/* <section>{props.children}</section> */}
      </main>
      {/* <footer>{props.children}</footer> */}
      <Footer />
    </>
  );
}
