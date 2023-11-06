import { css } from '@emotion/react';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { OverlayContext } from '../../util/context/overlayContext';
import LoginForm from '../LoginForm';

export const registerStyle = (loginLayover: boolean) => css`
  background-color: rgba(0, 0, 0, 0.25);
  position: absolute;
  top: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  display: ${loginLayover ? 'block' : 'none'};

  article {
    background-color: #fff;
    position: fixed;
    right: 0;
    top: 0;
    width: 50%;
    height: inherit;
    padding: 0 1.5rem;
  }
`;

type Props = {
  token: string;
};

export default function LoginInFormLayover(props: Props) {
  const { toggle, toggleLayover, loginLayover, toggleLoginLayover } =
    useContext(OverlayContext);

  useEffect(() => {
    if (loginLayover) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
  }, [loginLayover]);

  const onClickHandler = () => {
    toggleLoginLayover();
  };

  return (
    <section css={registerStyle(loginLayover)}>
      <article>
        <button type="button" onClick={onClickHandler}>
          x
        </button>
        <LoginForm token="" />

        <p>Dont' have an account yet?</p>
        <Link href={'/register'} onClick={onClickHandler}>
          Create one here!
        </Link>
      </article>
    </section>
  );
}
