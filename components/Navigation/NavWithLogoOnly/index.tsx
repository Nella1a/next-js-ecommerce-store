import { css } from '@emotion/react';
import Link from 'next/link';
import { Fragment } from 'react';

export const checkOutHeaderStyle = css`
  position: sticky;
  top: 0;
  background-color: transparent;
  width: 100vw;
  border-bottom: 1px solid lightgrey;
  z-index: 1;
  // border: 2px solid red;

  // container
  > div {
    max-width: 1920px;
    width: 100%;
    background-color: var(--backgroundColorWhite);

    margin: auto;
    display: flex;
    padding: 0 3rem;
    padding-top: 0.5rem;
    height: 6rem;

    // shelovesPlants logo
    > div:first-of-type {
      width: 100%;
      margin: auto;
      gap: 2rem;
      align-items: center;
      display: flex;
      justify-content: space-between;
      height: 4rem;

      img {
        width: 80%;
        height: auto;
      }
    }
    // links
    > div:nth-of-type(2) {
    }
  }
`;

export default function NavWithLogoOnly() {
  return (
    <Fragment>
      <nav css={checkOutHeaderStyle}>
        <div>
          <div>
            <Link href="/" passHref>
              <img src="/logo_shelovesplants.svg" alt="logo she loves plants" />
            </Link>
          </div>
          <div></div>
        </div>
      </nav>
    </Fragment>
  );
}
