import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { loginPageContainerStyle } from '../components/elements';
import LayoutNoHeader from '../components/Layout/LayoutNoHeader';
import LoginForm from '../components/LoginForm';
import { firebaseAdmin } from '../util/firebase-admin-config';
import { RegistrationProps } from './register';

export default function Login({}: RegistrationProps) {
  return (
    <LayoutNoHeader>
      <Head>
        <title>Account</title>
        <meta name="description" content="Plant Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section css={loginPageContainerStyle}>
        <article>
          <h1>Login to your account</h1>

          <p>
            No account yet?
            <Link
              href={{
                pathname: '/register',
              }}
              passHref
            >
              {' '}
              Create one here.
            </Link>
          </p>
        </article>
        <LoginForm />
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
  return {
    props: {},
  };
}
