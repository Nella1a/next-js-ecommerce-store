import { css } from '@emotion/react';
import Link from 'next/link';

const buttonCallToAction = () => css`
  letter-spacing: 0.031rem;
  line-height: 1.125rem;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.75rem;
  display: block;
  min-height: 2.9rem;
  padding: 1rem 2rem;
  margin: 1rem 0;
  color: var(--text-color);
  border: none;
  background-color: var(--color-btn-primary-bg);
  text-decoration: none;
  transition: all 0.3s;
  font-family: var(--font-primary);

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
