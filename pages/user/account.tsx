import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import { getServerSession } from 'next-auth/next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import LayoutNoHeader from '../../components/Layout/LayoutNoHeader';
import LoginForm from '../../components/LoginForm';
import RegisterForm from '../../components/RegisterForm';
import prisma from '../../prisma';
import { createCsrfToken } from '../../util/auth';
import { authOptions } from '../api/auth/[...nextauth]';

const accountStyle = css`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  border: 1px solid red;
`;

type Props = {
  csrfToken: string;
};

export default function Account(props: Props) {
  const { data, status, update } = useSession();
  const router = useRouter();
  console.log('token: ', props.csrfToken);
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
            <LoginForm token={props.csrfToken} />
          </section>
        </LayoutNoHeader>
      </>
    );
  } else {
    router.push('/');
  }
}
