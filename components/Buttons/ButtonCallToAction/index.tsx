import { css } from '@emotion/react';
import Link from 'next/link';
import { btn } from '../../elements';

const buttonCallToAction = () => css`
  font-size: 0.75rem;
  display: block;
  margin: 1rem 0;
  color: var(--text-color);
  background-color: var(--color-btn-primary-bg);
  text-decoration: none;
  transition: all 0.3s;
  ${btn};

  &:hover {
    background-color: var(--color-btn-hover);
  }
`;

type ButtonText = {
  innerText: string;
};

export default function ButtonCallToAction({ innerText }: ButtonText) {
  return (
    <Link
      href={{
        pathname: '/plants',
      }}
      passHref
      data-test-id="button-view-all-plants"
      css={buttonCallToAction}
    >
      {innerText}
    </Link>
  );
}
