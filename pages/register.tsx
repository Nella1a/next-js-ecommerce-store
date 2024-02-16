import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import LayoutNoHeader from '../components/Layout/LayoutNoHeader';
import RegisterForm from '../components/RegisterForm';
import { OverlayContext } from '../util/context/overlayContext';
import { firebaseAdmin } from '../util/firebase-admin-config';
import { loginPageContainerStyle } from './login';

export interface RegistrationProps {
  csrfToken: string;
}

export default function register() {
  const { loginLayover, toggleLoginLayover } = useContext(OverlayContext);

  useEffect(() => {
    if (loginLayover) {
      toggleLoginLayover();
    }
  }, []);

  return (
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
            Already have an account? <Link href={'/login'}> Sign in here!</Link>
          </p>
        </article>
        <RegisterForm />
      </section>
    </LayoutNoHeader>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.accessToken;

  if (token) {
    try {
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);

      if (decodedToken) {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
    } catch (error) {
      return {
        props: {},
      };
    }
  }
  return {};
}
