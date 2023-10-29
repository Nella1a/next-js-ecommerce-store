import { css } from '@emotion/react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import LayoutNoHeader from '../components/Layout/LayoutNoHeader';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import prisma from '../prisma';
import { createCsrfToken } from '../util/auth';

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
  console.log('token: ', props.csrfToken);
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
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // 1. Check if there is a token and valid
  const token = context.req.cookies.sessionToken;

  // 2. check if token is valid and redirect to welcome page ->
  // thus user can't login multiple times

  if (token) {
    const session = prisma.userSession.findFirst({
      where: {
        AND: [
          {
            token: token,
          },
          {
            expire_at: { gt: new Date() },
          },
        ],
      },
    });

    if (session !== null) {
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
