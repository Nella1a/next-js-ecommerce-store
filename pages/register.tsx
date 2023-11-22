import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import LayoutNoHeader from '../components/Layout/LayoutNoHeader';
import RegisterForm from '../components/RegisterForm';
import prisma from '../prisma';
import { createCsrfToken } from '../util/auth';
import { OverlayContext } from '../util/context/overlayContext';
import { loginPageContainerStyle } from './login';

export default function register() {
  const { loginLayover, toggleLoginLayover } = useContext(OverlayContext);

  useEffect(() => {
    if (loginLayover) {
      toggleLoginLayover();
    }
  }, []);

  return (
    <>
      <LayoutNoHeader>
        <Head>
          <title>Account</title>
          <meta name="description" content="Plant Shop" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <section css={loginPageContainerStyle}>
          <article>
            <p> Welcome! Create Your Account.</p>
            <p>
              Already have an account?{' '}
              <Link href={'/login'}> Sign in here!</Link>
            </p>
          </article>
          <RegisterForm token={''} />
        </section>
      </LayoutNoHeader>
    </>
  );
}
