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

const accountStyle = css`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  border: 1px solid red;
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
          <section css={accountStyle}>
            <LoginForm token={props.csrfToken} />
          </section>
          <section>
            <p>Dont' have an account yet?</p>
            <Link href={'/register'}>Create one here!</Link>
          </section>
        </LayoutNoHeader>
      </>
    );
  }
}
