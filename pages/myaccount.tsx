import { ParsedToken } from 'firebase/auth';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useEffect, useState } from 'react';
import LayoutNoHeader from '../components/Layout/LayoutNoHeader';
import prisma from '../prisma';
import { createCsrfToken } from '../util/auth';

type Props = {
  csrfToken: string;
  //userSession?: Session | null;
  user: { id: number; userName: string };
};

export default function Account(props: Props) {
  return (
    <LayoutNoHeader>
      <section>
        <article>
          <p>
            Hello USER: {props?.user?.id} {props?.user?.userName}
          </p>
          <p>Orders placed: xxx</p>
        </article>
        <article>
          <h2>Order History</h2>
          <button>Shop</button>
        </article>
        <article>
          <h2>My Account</h2>
        </article>
      </section>
    </LayoutNoHeader>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // 1. Check if there is a token and valid
  const token = context.req.cookies.sessionToken;
  const currentDate = new Date();
  if (token) {
    // 2. check if token is valid and redirect to welcome page ->
    // thus user can't login multiple times
    const session = await prisma.userSession.findFirst({
      where: {
        token: token,
        expire_at: { gte: currentDate.toISOString() },
      },
    });

    if (session) {
      // get user
      const user = await prisma.user.findUnique({
        where: {
          id: session.user_id,
        },
        select: {
          id: true,
          username: true,
        },
      });

      // if (Number(id) !== user?.id) {
      //   return {
      //     redirect: {
      //       destination: '/',
      //       permanent: false,
      //     },
      //   };
      // }

      // 3. Generate CSRF token and render the page
      return {
        props: {
          csrfToken: createCsrfToken(),
          user,
        },
      };
    }
  }

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
}
