import { GetServerSidePropsContext } from 'next';
import LayoutNoHeader from '../components/Layout/LayoutNoHeader';
import { underConstruction } from '../components/Placeholder';
import prisma from '../prisma';
import { firebaseAdmin } from '../util/firebase-admin-config';

type Props = {
  userId: number;
  email: string;
  userName: string;
};

export default function Account({ userId, email, userName }: Props) {
  return (
    <LayoutNoHeader>
      <section css={underConstruction}>
        <article>
          <h1>Page Under Construction!</h1>
          <p>Your email is: {email}</p>
          <p>You've logged into your account successfully.</p>
        </article>
      </section>
    </LayoutNoHeader>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.accessToken;

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // verify token
  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);

    // get user
    const user = await prisma.user.findUnique({
      where: {
        user_id_external: decodedToken.uid,
      },
      select: {
        id: true,
        email: true,
        username: true,
      },
    });

    return {
      props: {
        userId: user?.id,
        email: user?.email,
        username: user?.username,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}
