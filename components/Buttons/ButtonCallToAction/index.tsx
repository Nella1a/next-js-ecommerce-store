import { css } from '@emotion/react';
import Link from 'next/link';
import { btn } from '../../elements';

const buttonCallToAction = () => css`
  ${btn};
  font-size: 0.75rem;
  display: block;
  margin: 1rem 0;
  background-color: var(--color-btn-primary-bg);
  text-decoration: none;
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-btn-hover);
  }
`;

export default function ButtonCallToAction({
  innerText,
}: {
  innerText: string;
}) {
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
