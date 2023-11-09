import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import LayoutNoHeader from '../components/Layout/LayoutNoHeader';
import RegisterForm from '../components/RegisterForm';
import prisma from '../prisma';
import { createCsrfToken } from '../util/auth';
import { OverlayContext } from '../util/context/overlayContext';
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

export default function register(props: Props) {
  const { data, status } = useSession();
  const { loginLayover, toggleLoginLayover } = useContext(OverlayContext);

  useEffect(() => {
    if (loginLayover) {
      toggleLoginLayover();
    }
  }, []);

  console.log('props.session: ', props.session);
  console.log('props.test: ', props);

  //const { user, status } = props.session;
  const router = useRouter();
  ///console.log('data: ', user);
  console.log('token: ', props.csrfToken);
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
            <RegisterForm token={props.csrfToken} />
          </section>
          <section>
            <p>Already have an account?</p>
            <Link href={'/signIn'}>Login here!</Link>
          </section>
        </LayoutNoHeader>
      </>
    );
  }
}