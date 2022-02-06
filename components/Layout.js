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
        <section>{props.children.h1}</section>
        <section>{props.children.h2}</section>
      </main>
      <footer>{props.children}</footer>
    </>
  );
}
