import Link from 'next/link';
import { Dispatch, SetStateAction, useContext } from 'react';
import { OverlayContext } from '../../../util/context/overlayContext';
import RegisterForm from '../../RegisterForm';

export default function NavMenu() {
  const { toggleLayover, toggle } = useContext(OverlayContext);
  const onClickHandler = () => {
    console.log('HELLO');
    toggleLayover();
  };

  return (
    <>
      <li>
        <Link href="/products" data-test-id="products-link">
          Plants
        </Link>
      </li>
      <li>
        <button data-test-id="login-button" onClick={onClickHandler}>
          {' '}
          Login
        </button>
      </li>
    </>
  );
}
