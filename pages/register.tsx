import { css } from '@emotion/react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { GetServerSidePropsContext } from 'next';
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // 1. Check if there is a token and valid

  const token = context.req.cookies.sessionToken;

  if (token) {
    // 2. check if token is valid and redirect to welcome page ->
    // thus user can't login multiple times
    const session = await prisma.userSession.findFirst({
      where: {
        token: token,
        expire_at: { gte: Date.now().toString() },
      },
    });

    if (session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
  }
  // 3. Generate CSRF token and render the page
  return {
    props: {
      csrfToken: createCsrfToken(),
    },
  };
}
