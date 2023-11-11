import { css } from '@emotion/react';
import Link from 'next/link';
import { Fragment } from 'react';

export const checkOutHeaderStyle = css`
  max-width: 1920px;
  width: 100%;
  position: fixed;
  background-color: var(--backgroundColorWhite);
  // background-color: yellow;
  top: 0;
  z-index: 1;
  margin: auto;
  display: flex;
  padding: 0 3rem;
  padding-top: 0.5rem;
  border-bottom: 0px solid lightgrey;
  height: 6rem;

  // shelovesPlants logo
  > div:first-of-type {
    width: 100%;
    margin: 0 auto;
    position: relative;
    top: 0px;
    gap: 2rem;
    align-items: center;
    display: flex;
    justify-content: space-between;
    z-index: 1;
    height: 4rem;
    border-bottom: 1px solid lightgray;

    img {
      width: 80%;
      height: auto;
    }
  }
  // links
  > div:nth-of-type(2) {
  }
`;

export default function NavWithLogoOnly() {
  return (
    <Fragment>
      <nav css={checkOutHeaderStyle}>
        <div>
          <Link href="/" passHref>
            <img src="/logo_shelovesplants.svg" alt="logo she loves plants" />
          </Link>
        </div>
        <div></div>
      </nav>
    </Fragment>
  );
}
