import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
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
  csrfToken: string;
  session?: any;
  test: string;
};

export default function Login(props: Props) {
  const { data, status } = useSession();
  console.log('props.session: ', props.session);
  console.log('props.test: ', props);

  //const { user, status } = props.session;

  ///console.log('data: ', user);
  console.log('token: ', props.csrfToken);
  // if (status !== 'authenticated')
  if (status === 'authenticated') Router.push('/');
  if (status !== 'authenticated') {
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
            <LoginForm token={props.csrfToken} />
          </section>
        </LayoutNoHeader>
      </>
    );
  }
}
