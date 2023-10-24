import Link from 'next/link';
import { useContext } from 'react';
import { OverlayContext } from '../../../util/context/overlayContext';

export default function NavMenu() {
  const { toggleLoginLayover } = useContext(OverlayContext);
  const onClickHandler = () => {
    toggleLoginLayover();
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
