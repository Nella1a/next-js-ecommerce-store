import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useAuth } from '../../../AuthProvider';
import { OverlayContext } from '../../../util/context/overlayContext';

export default function NavMenu() {
  const { toggleLoginLayover } = useContext(OverlayContext);
  const { logOut, user } = useAuth();
  const router = useRouter();

  const onClickLoginHandler = () => {
    toggleLoginLayover();
  };

  const onClickLogoutHandler = async () => {
    //Sign out with the Firebase client
    logOut()
      .then(async () => {
        const res = await fetch('/api/logout', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: user.uid }),
        });

        await res.json();
        if (res.status === 200) {
          router.push('/');
        }
      })
      .catch((error: any) => {
        console.log('error during signed out');
      });
  };

  const loginButton = () => (
    <button data-test-id="login-link" onClick={onClickLoginHandler}>
      {' '}
      Login
    </button>
  );

  const logoutButton = () => (
    <button data-test-id="logout-link" onClick={onClickLogoutHandler}>
      {' '}
      Logout
    </button>
  );
  return (
    <>
      <li>
        <Link
          href={{
            pathname: '/plants',
          }}
          data-test-id="products-link"
        >
          Plants
        </Link>
      </li>
      <li>{user.uid ? logoutButton() : loginButton()}</li>
    </>
  );
}
