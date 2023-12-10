import { onAuthStateChanged, signOut } from 'firebase/auth';
import Link from 'next/link';
import Router from 'next/router';
import { useContext } from 'react';
import { OverlayContext } from '../../../util/context/overlayContext';
import { auth } from '../../../util/firebase-config';

export default function NavMenu() {
  const { toggleLoginLayover } = useContext(OverlayContext);

  const onClickLoginHandler = () => {
    toggleLoginLayover();
  };

  const onClickLogoutHandler = () => {
    //Sign out with the Firebase client
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log('Signed out');
      })
      .catch((error) => {
        // An error happened.
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
        <Link href="/products" data-test-id="products-link">
          Plants
        </Link>
      </li>
      <li>{auth.currentUser ? logoutButton() : loginButton()}</li>
    </>
  );
}
