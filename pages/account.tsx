import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getServerSession, Session } from 'next-auth';
import { useSession } from 'next-auth/react';
import LayoutNoHeader from '../components/Layout/LayoutNoHeader';
import { authOptions } from './api/auth/[...nextauth]';

type Props = {
  //csrfToken: string;
  userSession?: Session | null;
  //test: string;
};

export default function Account(props: Props) {
  const { data: session } = useSession();
  console.log('props: ', props.userSession);
  return (
    <LayoutNoHeader>
      <section>
        <article>
          <h1>Welcome Back, {props.userSession?.user.username} </h1>
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

export async function getServerSideProps({
  req,
  res,
}: any): Promise<GetServerSidePropsResult<{}>> {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const s = JSON.parse(JSON.stringify(session));
  // delete session.user.name;
  // delete session.user.image;
  // rename session otherwise it is undefined on client side
  // https://stackoverflow.com/questions/71676115/next-auth-props-to-page-undefined-although-passed-from-getserversideprops

  return {
    props: {
      userSession: s,
    },
  };
}
