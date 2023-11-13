import Head from 'next/head';
import { PropsLayoutCart } from '../../../util/types';
import NavWithLogoOnly from '../../Navigation/NavWithLogoOnly';

export default function LayoutNoHeaderAndFooter(props: PropsLayoutCart) {
  return (
    <>
      <Head>
        {' '}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavWithLogoOnly />

      <main>{props.children}</main>
    </>
  );
}
