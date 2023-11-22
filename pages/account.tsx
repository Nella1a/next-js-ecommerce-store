import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { getServerSession, Session } from 'next-auth';
import LayoutNoHeader from '../components/Layout/LayoutNoHeader';

type Props = {
  //csrfToken: string;
  userSession?: Session | null;
  //test: string;
};

export default function Account(props: Props) {
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
