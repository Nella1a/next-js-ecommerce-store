import Head from 'next/head';
import Header from './Header';

export default function Layout(props) {
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
    </>
  );
}
