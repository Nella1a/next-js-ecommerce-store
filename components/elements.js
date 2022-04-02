import { css } from '@emotion/react';

/* *************************** */
/*    Global Styles            */
/* *************************** */

export const globalStyleBody = (theme) => css`
  :root {
    --backgroundColor: #e4e8e7;
  }

  /* Reset sizing   */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* Reset margin */
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  p {
    margin: 0;
  }

  /* set up the body */
  body {
    line-height: 1.5; /* default for browser: 1.4 tends to be very small*/
    font-size: ${theme.typography.medium};
    min-height: 100vh;
    width: 100vw;
    font-family: ${theme.font};
    background-color: var(--backgroundColor);
  }

  main {
    margin-top: 4rem;
  }

  /* make img easier to work with*/
  img {
    max-width: 100%; /* ensure that the img gets narrow when viewoprt shrinks*/
    display: block;
  }

  /* form elements should have same font as body */
  input,
  button,
  textarea,
  select {
    font: inherit;
    color: grey;
  }

  section {
    max-width: 1200px;
    margin: 8rem auto;
  }

  button {
    letter-spacing: 0.031rem;
    line-height: 1.125rem;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.75rem;
    display: block;
    min-height: 2.5rem;
    padding: 0.625rem 1rem;
    margin: 1rem 0;
    color: #000;
  }
`;

/* *************************** */
/*    Utility Styles?          */
/* *************************** */

const flexCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const marginCenter = {
  margin: '0 auto',
};

const size = (width = '100%', height = '100%') => {
  return { width, height };
};

/* *************************** */
/*   Header: Navigation Bar    */
/* *************************** */

export const headerStyle = css`
  max-width: 100%;
  /* ${marginCenter} */
  position: fixed;
  background-color: #fff;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;

  nav {
    width: 1200px;
    ${marginCenter}
    /* margin: 0 auto; */
    position: relative;
    left: 0;
    right: 0;
    top: 4px;
    gap: 48px;
    align-items: center;
    display: flex;
    z-index: 1;
    height: 4rem;
    color: #43964f;

    img {
      width: 80%;
      height: auto;
    }

    a {
      text-decoration: none;
      display: block;
      font-weight: bold;
      color: black;
    }
  }

  a:nth-of-type(2) {
    margin-left: auto;

    &:hover {
      border-bottom: 3px solid #ed943b;
    }
  }
`;

export const shoppingBagStyle = (theme) => css`
  ${size('3.76rem', '3.76rem')}
  position: relative;
  ${flexCenter}

  div:first-of-type {
    ${size('1.88rem', '1.88rem')}

    div {
      ${size('1.41rem', '1.41rem')}
      border-radius: 50%;
      background-color: #ff6900;
      color: #fff;
      position: absolute;
      text-align: center;
      top: 0px;
      right: 3px;

      span {
        position: relative;
        top: 0px;
        right: 0px;
        font-size: ${theme.typography.xSmall};
      }
    }
  }
`;

/* *************************** */
/*         footer       */
/* *************************** */

export const footerStyle = css`
  ${flexCenter}
  gap: 4rem;
  ${size('', '4rem')}
  margin: 2rem;

  a {
    text-decoration: none;
  }
`;

/* *************************** */
/*         Index.js            */
/* *************************** */

export const heroImage = css`
  ${marginCenter}
  width: 100%;
  height: auto;
  position: absolute;
`;

export const indexJsStyle = (theme) => css`
  max-width: 1200px;
  height: 5rem;
  position: relative;
  ${marginCenter}

  div {
    position: absolute;
    left: 1%;
    top: 6rem;
    color: #43964f;

    p {
      font-size: ${theme.typography.xLarge};
      margin: 1rem 0;
      font-weight: 500;
      text-align: center;
    }

    p:last-of-type {
      display: flex;
      justify-content: center;
    }

    button {
      ${size('17.65rem', '1.47rem')}

      background-color: #ed943b;
      border: none;

      &:hover {
        background-color: #ff6900;
      }
    }
  }
`;

export const bestSellerStyle = css`
  margin-top: 30rem;
  gap: 48px;

  h2 {
    margin: 8px 0;
    font-size: 16px;
  }
`;

export const styleComp = css`
  display: flex;
  flex-direction: column;
`;

/* *************************** */
/*         Products.js         */
/* *************************** */

export const sectionStyle = css`
  margin-top: 15rem;

  display: flex;
  gap: 48px;

  h2 {
    margin: 8px 0;
    font-size: 16px;
  }
`;

/* *************************** */
/*  Single Product Page        */
/* *************************** */

export const singleProductPageStyle = css`
  display: flex;
  flex-direction: column;
  gap: 0rem;
  width: 100%;
  justify-content: center;
  align-items: center;

  div:first-of-type {
    display: flex;
    gap: 3rem;

    article {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 500px;
      width: 50%;

      h1 {
        margin: 16px 0;
      }

      p {
        margin-bottom: 48px;
      }

      label {
        display: flex;
        align-items: center;
      }
      input {
        padding: 0.75rem 0.5rem 0.75rem 0.75rem;
        margin-left: 1rem;
        text-align: center;
        ${size('9.825rem', '2.47rem')}
      }

      button {
        ${size('17.65rem', '1.47rem')}
        background-color: #ed943b;
        border: none;

        &:hover {
          background-color: #ff6900;
        }
      }
    }
  }
`;

export const singleProductPageStyleSecondArticle = css`
  margin-top: 3rem;
  height: 0px;

  a {
    text-decoration: none;
  }

  button {
    ${size('17.65rem', '1.47rem')}

    border: 1px solid #ed943b;
    background-color: transparent;

    &:hover {
      background-color: #ff6900;
    }
  }
`;

/* *************************** */
/*      Shoppingcart.js          */
/* *************************** */

export const shoppingCartStyle = css`
  display: flex;
  gap: 96px;

  article:first-of-type {
    width: 70%;

    div {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 256px;
      border-top: 1px solid grey;
      border-bottom: 1px solid grey;
    }
  }

  article:nth-of-type(2) {
    width: 30%;

    display: flex;
    align-items: center;

    div:first-child {
      /* WARNING: Change this to first of type */
      width: 100%;
      flex-direction: column;
      display: flex;
      align-items: flex-start;
      justify-content: space-around;
      background-color: lightgray;
      gap: 32px;
      padding: 1rem;

      div {
        display: flex;
        gap: 1rem;
        border-bottom: 0.5px solid grey;
        padding-bottom: 1rem;
        width: 95%;
      }
    }
    /* div:nth-of-type(2) {
      display: flex;
      justify-content: space-around;
    } */
    button {
      ${size('17.65rem', '1.47rem')}
      background-color: #ed943b;
      border: none;

      &:hover {
        background-color: #ff6900;
      }
    }
  }
`;

export const plantName = css`
  margin-left: 1rem;
`;

/* *************************** */
/*         checkout.js         */
/* *************************** */

export const formStyle = css`
  section {
    width: 50%;
  }

  p,
  label,
  input {
    margin-bottom: 16px;
  }

  input,
  select {
    width: 100%;
    height: 48px;
  }
`;

export const flexStyle = css`
  display: flex;
  gap: 16px;

  p {
    width: 50%;
  }
  button {
    ${size('17.65rem', '1.47rem')}
    background-color: #ed943b;
    border: none;

    &:hover {
      background-color: #ff6900;
    }
  }
`;
/* *************************** */
/*    Underconstruction        */
/* *************************** */
export const underConstruction = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    margin-top: 3rem;
  }

  button {
    ${size('15rem', '1.47rem')}
    background-color: #ed943b;
    border: none;

    &:hover {
      background-color: #ff6900;
    }
  }
`;
