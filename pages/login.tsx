import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import { Session } from 'next-auth';
import { getServerSession } from 'next-auth/next';
import { getSession, useSession } from 'next-auth/react';
import { redirect } from 'next/dist/server/api-utils';
import Head from 'next/head';
import { cookies } from 'next/headers';
import Link from 'next/link';
import Router from 'next/router';
import LayoutNoHeader from '../components/Layout/LayoutNoHeader';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import prisma from '../prisma';
import { createCsrfToken } from '../util/auth';
import { authOptions } from './api/auth/[...nextauth]';

export const loginPageContainerStyle = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: start;
  gap: 5rem;
  //background-color: rgba(211, 211, 211, 0.5);
  margin-top: 10rem;
  article:first-of-type {
    width: 44%;
    height: 100%;

    p {
      font-size: 35px;
      font-weight: 500;
      line-height: 3rem;
    }
    p:last-of-type {
      font-size: inherit;
    }

    a,
    a:hover,
    a:active,
    a:visited {
      font-weight: 600;
      color: #000;
      text-decoration: none;
    }
  }

  article:nth-of-type(2) {
    width: 44%;
    height: 100%;
  }
`;

type Props = {
  //csrfToken: string;
  session?: Session | null;
  //test: string;
};

export default function Login(props: Props) {
  //const { data: session, status } = useSession();
  //const { data: session, status } = props.session;
  console.log('props.session: ', props.session);
  //console.log('props.test: ', props);

  //console.log('next header cookies: ', cookies.name);

  //const { user, status } = props.session;

  ///console.log('data: ', user);
  // console.log('token: ', props.csrfToken);
  // if (status !== 'authenticated')
  if (props.session) Router.push('/');
  if (!props.session) {
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
              <p>Welcome back! Log in to your account.</p>
              <p>
                Don't have an account yet?{' '}
                <Link href={'/register'}> Create one here.</Link>
              </p>
            </article>
            <LoginForm token={'string'} />
          </section>
        </LayoutNoHeader>
      </>
    );
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // 1. Check if there is a token
  const token = context;
  //console.log('---> context.req.cookies: ', context.req.cookies);

  const session = await getServerSession(context.req, context.res, authOptions);
  console.log('SESSION: ', session);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      session: session,
    },
  };
}
