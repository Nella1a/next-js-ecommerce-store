import { css } from '@emotion/react';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { OverlayContext } from '../../util/context/overlayContext';
import LoginForm from '../LoginForm';

export const loginLayoverStyle = (loginLayover: boolean) => css`
  background-color: rgba(0, 0, 0, 0.25);
  position: absolute;
  top: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  display: ${loginLayover ? 'block' : 'none'};

  > div {
    background-color: #fff;
    position: fixed;
    right: 0;
    top: 0;
    width: 30rem;
    height: inherit;
    padding: 0 3rem;
    border: 2px solid green;

    > button {
      display: inline-block;
      background-color: transparent;
      border: none;
      cursor: pointer;
      font-size: 20px;
      position: absolute;
      top: 0;
      right: 0;
    }
    article {
      margin-top: 2rem;
    }
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
    <section css={loginLayoverStyle(loginLayover)}>
      <div>
        {' '}
        <button type="button" onClick={onClickHandler}>
          x
        </button>
        <LoginForm token="" />
      </div>
    </section>
  );
}
