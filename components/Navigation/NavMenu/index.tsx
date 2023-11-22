import Link from 'next/link';
import Router from 'next/router';
import { useContext } from 'react';
import { OverlayContext } from '../../../util/context/overlayContext';

export default function NavMenu() {
  const { toggleLoginLayover } = useContext(OverlayContext);

  const onClickLoginHandler = () => {
    toggleLoginLayover();
  };

  const onClickLogoutHandler = () => {};

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
      <li>{loginButton()}</li>
    </>
  );
}
