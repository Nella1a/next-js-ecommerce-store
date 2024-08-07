import { css } from '@emotion/react';
import { calistoga, roboto } from '../util/fonts';

/* - font sizes (px)
10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98

.6 /.8 /.9 /1 / 1.1 /1.3 / 1.5/ 1.875 /2.25/2.75/3.25



*/

/* - spacing (px)
2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128
0.125/.25/.75/ 1 /1.5 / 2 /3 / 4 / 5 / 6 / 8
*/

/* *************************** */
/*    Global Styles            */
/* *************************** */

export const globalStyleBody = css`
  :root {
    // --font-primary: 'Yeseva One';

    /* set base values */
    --text-base-size: 1em;
    --text-scale-ratio: 1.2; //120% of what they would normally be”.

    /* base color */
    --text-color: #333;
    --main-bg-color: #eef7ea;

    --color-btn-primary-bg: #f2aa57;
    --color-btn-hover: #f7b481;

    --color-white: #ffff;
    --color-grey-6: #868e96;
    --color-grey-5: #adb5bd;
    --color-grey-4: #ced4da;
    --color-grey-3: #dee2e6;
    --color-grey-2: #e9ecef;
    --color-grey-1: #f5f5f5;
    --color-grey-0: #f8f9fa;

    --color-red-7: #f03e3e;
    --color-red-8: #e03131;
    --color-red-9: #c92a2a;

    --color-green: #709f7a;
    --color-primary-green: #50a458;

    --text-xxs: 0.5em; // 8
    --text-xs: 0.625em; // 10
    --text-sm: 0.75em; // 12
    --text-md: 0.875em; // 14
    --text-base-size: 1em; // 16
    --text-lg: 1.125em; // 18
    --text-xl: 1.25em; // 20
    --text-xxl: 1.5em; // 24
    --text-xxxl: 1.875em; // 30

    /* spacing values */
    --space-xxs: 0.125rem; // 4px
    --space-xs: 0.25rem; // 8px
    --space-sm: 0.75rem; // 12px
    --space-md: 1rem; // 16px

    --space-lg: 1.5rem; // 24px
    --space-xl: 2rem; // 32px
    --space-xxl: 3rem; // 48px
    --space-xxxl: 4rem; //64px
    --space-4xl: 5rem; //80px
    --space-5xl: 6rem; //96px
    --space-6xl: 8rem; //128px
  }

  /* Reset sizing   */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  /* set up the body */
  html {
    line-height: 1.5; /* default for browser: 1.4 tends to be very small*/
    font-size: 1rem;
    font-family: var(--font-primary), var(--font-fallback);
    background-color: var(--main-bg-color);
    color: var(--text-color);
    position: relative;
    font-family: ${roboto.style.fontFamily};
  }

  h1,
  h2 {
    font-family: ${calistoga.style.fontFamily};
    color: var(--color-primary-green);
  }
  /* make img easier to work with*/
  img {
    max-width: 100%; /* ensure that the img gets narrow when viewport shrinks*/
    display: block;
  }

  /* form elements should have same font as body */
  input,
  textarea,
  select {
    font-family: var(--font-primary), var(--font-fallback);
    color: var(--color-grey-6);
  }

  input::placeholder {
    color: var(--color-grey-4);
  }

  a:link,
  a:visited,
  a:hover,
  a:active {
    text-decoration: none;
  }
`;

/* *************************** */
/*   UTILITY   */
/* *************************** */

export const container = {
  maxWidth: '1350px',
  padding: '0 3rem',
  margin: '0 auto',
};

export const marginTop = {
  marginTop: '4rem',
};

export const h2Section = {
  marginBottom: '1rem',
  fontSize: '2rem',
};
export const h2SectionMediaQuery75 = {
  fontSize: '1.875rem',
};

export const flexRowXYCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export const btn = {
  letterSpacing: '0.031rem',
  lineHeight: '1.125rem',
  fontWeight: 'bold',
  fontSize: '0.9rem',
  minHeight: '2.9rem',
  padding: '1rem',
  border: 'none',
  cursor: 'pointer',
};

export const btnTextColorGreen = {
  color: '#50a458',
};
export const btnTextColorWhite = {
  color: '#fff',
};

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

export const styleLargeButton = css`
  display: flex;
  justify-content: center;

  button {
    ${size('17.65rem', '1.47rem')}
  }

  h1,
  h2 {
    color: var(--color-primary-green);
  }
`;

export const bestSellerStyle = css`
  ${container};
  ${marginTop};

  h2 {
    ${h2Section}
  }

  display: flex;
  flex-direction: column;
  padding: 0 3rem;
  // border: 2px solid pink;

  > div {
    display: grid;
    gap: var(--space-lg);
    grid-template-columns: repeat(4, minmax(1rem, 1fr));

    a:link,
    a:visited {
      text-decoration: none;
      color: var(--text-color);
    }

    // a:hover,
    a:active {
      color: var(--text-color);
    }
  }

  @media (max-width: 75rem) {
    padding: 0 1.5rem;
    h2 {
      ${h2SectionMediaQuery75}
    }
  }

  @media (max-width: 37.5rem) {
    // 600px
    > div {
      grid-template-columns: repeat(3, minmax(1rem, 1fr));
    }
  }

  @media (max-width: 30rem) {
    > div {
      grid-template-columns: repeat(2, minmax(1rem, 1fr));
    }
  }
`;

export const productCardStyle = css`
  //border: 2px solid green;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);

  // image container
  div:first-of-type {
    position: relative;
    height: 20rem;
    span {
      z-index: 1;
      position: absolute;
      display: block;
      //background-color: #37798D;
      background-color: #009a7b;
      color: var(--color-white);
      width: 70%;
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--text-base-size);
      top: 30px;
    }
  }

  div:last-of-type {
    span {
      display: block;
    }

    // title
    span:first-of-type {
      font-size: 1rem;
      font-weight: 600;
    }
    // price
    span:last-of-type {
    }
  }
  a:link,
  a:visited {
    text-decoration: none;
  }

  @media (max-width: 1024px) {
    div:first-of-type {
      height: 15rem;
      width: auto;

      span {
        height: 2rem;
      }
    }
  }

  @media screen and (max-width: 768px) {
    div:first-of-type {
      height: 10rem;

      span {
        font-size: var(--text-sm);
      }
    }
  }

  @media (max-width: 480px) {
    div:first-of-type {
      height: 8rem;
      span {
        font-size: var(--text-xs);
      }
    }
  }
`;

export const styleComp = css`
  display: flex;
  flex-direction: column;
`;

/* *************************** */
/*     index.js       */
/* *************************** */

export const summerFavoritesStyle = css`
  ${container};
  ${marginTop}

  h2 {
    ${h2Section}
    color: var(--color-primary-green);
  }

  display: flex;
  flex-direction: column;
  padding: 0 3rem;

  > div {
    display: grid;
    grid-template-columns: repeat(2, 2fr);
    gap: var(--space-lg);

    // container for img and product cards
    > div:first-of-type {
      position: relative;
      img {
        border-radius: 20px;
      }
    }

    > div:last-of-type {
      //product cards grid container
      display: grid;
      gap: var(--space-lg);
      grid-template-columns: repeat(2, minmax(1rem, 1fr));

      a:link,
      a:visited {
        color: var(--text-color);
      }

      a:hover,
      a:active {
        color: var(--text-color);
      }
    }
  }

  @media (max-width: 75rem) {
    padding: 0 1.5rem;
    h2 {
      ${h2SectionMediaQuery75}
    }

    > div {
      grid-template-columns: 1fr;
      gap: var(--space-md);

      // first image container
      > div:first-of-type {
        height: 40rem;
      }

      > div:last-of-type {
        // product cards grid container
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: var(--space-md);
      }
    }
  }

  @media (max-width: 48rem) {
    > div {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 600px) {
    > div {
      // product cards grid container
      > div:last-of-type {
        grid-template-columns: repeat(3, minmax(1rem, 1fr));
      }
    }
  }

  @media (max-width: 30rem) {
    > div {
      //product cards grid container
      > div:last-of-type {
        grid-template-columns: repeat(2, minmax(1rem, 1fr));
      }
    }
  }
`;

export const separator = css`
  background-color: #224229;
  height: 5px;
  margin-bottom: 0 !important;
  margin-top: 0 !important;
  opacity: 1;
  padding: 0 !important;

  margin: 0 64px;
  width: calc(100% - 280px);
`;

/* *************************** */
/*  Single Product Page        */
/* *************************** */

export const singleProductPageStyle = css`
  ${container};
  margin-top: 8rem;
  display: grid;
  grid-template-columns: 1fr 11fr;
  gap: 1.5rem;
  //border: 2px solid red;

  @media (max-width: 75rem) {
    padding: 0 1.5rem;
    grid-template-columns: 11fr;
    max-width: 100%;
  }

  @media (max-width: 48rem) {
    max-width: 100%;
    display: unset;
  }

  // product details container
  > article:nth-of-type(2) {
    display: flex;
    gap: var(--space-xl);
    //border: 1px solid blue;

    @media (max-width: 48rem) {
      flex-direction: column;
      padding: 0 3rem;
    }

    @media (max-width: 30rem) {
      padding: 0 1.5rem;
    }
  }
`;

export const imageGallery = css`
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  //border: 1px solid green;

  @media screen and (max-width: 75rem) {
    display: none;
  }
  > div {
    display: block;
  }
`;

export const productTitleAndPriceContainer = css`
  h1 {
    font-size: var(--text-xl);
  }
  p {
    font-size: var(--text-md);
    font-weight: bold;
  }
`;

export const productImageContainer = css`
  display: block;
  height: auto;
  width: 40%;

  > div:first-of-type {
    display: none;
  }

  @media (max-width: 75rem) {
    > div {
      width: 50%;
    }
  }

  @media (max-width: 48rem) {
    width: 100%;

    // container title and price
    > div:first-of-type {
      margin-top: 6rem;
      display: block;
      margin-bottom: var(--space-lg);
    }
  }

  @media screen and (max-width: 30rem) {
    > div {
      p {
        font-size: var(--base-text);
        font-weight: 400;
      }
    }
  }
`;

export const productDetailsContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  // border: 3px solid orange;

  // info innerContainer
  > div {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
    //  border: 2px solid pink;

    // container title and price
    > div:first-of-type {
      @media (max-width: 48rem) {
        display: none;
      }
    }

    // todo: dry! see shoppingCartStyle
    // container quantity and buttons
    > div:nth-of-type(2) {
      display: flex;
      align-items: center;
      gap: 1.2rem;
      // border: 2px solid lightskyblue;

      > button:first-of-type {
        ${btn};
        display: inline-block;
        background-color: var(--color-btn-primary-bg);
        ${btnTextColorWhite}
        ${size('17.65rem', '1.47rem')}
        border-radius: 5px;
        :hover {
          background-color: var(--color-btn-hover);
        }
      }

      @media (max-width: 30rem) {
        flex-direction: column-reverse;
        align-items: flex-start;
        gap: 1rem;

        button {
          width: 100%;
        }
      }
    }
  }

  @media (max-width: 48rem) {
    //padding: 0 3rem;
    width: 100%;
    > div {
      gap: var(--space-lg);
    }
  }
`;

/* *************************** */
/*      Shoppingcart.js          */
/* *************************** */

export const shoppingCartStyle = css`
  ${container}
  margin-top: 8rem;

  h1 {
    margin-bottom: var(--space-xs);
    margin-bottom: 1rem;
  }

  > div {
    // grid container for product cards and order total
    margin-top: var(--space-sm);
    display: grid;
    gap: var(--text-xxxl);
    grid-template-columns: 2fr 1fr;
    position: relative;
    // border: 2px solid green;

    article:nth-of-type(2) {
      // container order total
      width: 100%;
      background-color: var(--color-white);
      position: sticky;
      top: 69px;
      padding: 1rem 1.5rem;
      display: flex;
      flex-direction: column;
      gap: var(--space-md);
      // border: 1px solid red;

      // checkout button

      a:link,
      a:visited,
      a:focus,
      a:hover {
        ${btn};
        display: block;
        width: 100%;
        text-align: center;
        background-color: var(--color-btn-primary-bg);
        transition: all 0.3s;
        ${btnTextColorWhite}
        border-radius: 5px;

        :hover {
          background-color: var(--color-btn-hover);
        }
      }
    }
  }

  @media (max-width: 75rem) {
    padding: 0 1.5rem;
  }

  @media screen and (max-width: 56.25rem) {
    // 900px
    > div {
      display: flex;
      flex-direction: column;
    }
  }

  @media (max-width: 48rem) {
    > div {
      // border: 1px solid red;

      article > div > div:nth-of-type(2) > div:first-of-type {
        button {
          min-height: unset;
          padding: 0.4rem 0.7rem;
        }
      }
    }
  }

  @media (max-width: 30rem) {
    h1 {
      font-size: var(--text-xl);
      margin-bottom: var(--space-md);
    }

    article > div > div:nth-of-type(2) > div:first-of-type {
      p:nth-of-type(2) {
        font-weight: 500;
      }
    }
  }
`;

/* *************************** */
/*         checkout.js         */
/* *************************** */

export const checkoutPageStyle = css`
  ${container};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-lg);

  // container - contact and shipping details
  article:first-of-type {
    padding: 0 1.5rem;
  }

  // container - order summary
  article:nth-of-type(2) {
    //padding-top: unset;
    display: flex;
    flex-direction: column;
    background-color: var(--color-grey-1);
    border-left: 1px solid var(--color-grey-3);
    width: inherit;
    //border: 2px solid black;

    > div:first-of-type {
      // container product cards
      width: 100%;
      padding-top: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      // border: 2px solid blue;

      > div {
        // container product card
        width: inherit;
        padding: 0 1.5rem;
        // border: 2px solid yellowgreen;
      }
    }

    // container order total
    > div:nth-of-type(2) {
      gap: var(--space-xs);
      padding: 1.5rem;
      margin-top: 1rem;
    }
  }

  @media (max-width: 75rem) {
    padding: 0 1.5rem;
  }

  @media (max-width: 960px) {
    display: flex;
    flex-direction: column;
  }

  @media (max-width: 768px) {
    gap: var(--space-md);
  }
`;

export const checkoutFormStyle = css`
  h2 {
    font-size: var(--text-lg);
    margin-top: 3rem;
    margin-bottom: 1rem;
  }

  input,
  select {
    width: 100%;
    height: 48px;
    border-radius: 5px;
    padding-left: var(--text-base-size);
  }

  // error message
  > div:first-of-type > p > span,
  div > input ~ span,
  div > p > input ~ span {
    color: var(--color-red-7);
    font-size: var(--text-md);
  }

  div {
    margin-bottom: 1.5rem;
  }

  div:last-of-type {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 2rem;

    input {
      width: 30%;
      margin: unset;
      height: 51px;
    }
  }
  button {
    ${btn}
    ${size('17.65rem', '1.47rem')}
    margin-top: 1rem;
    ${btnTextColorWhite}
    border-radius: 5px;

    @media screen and (max-width: 960px) {
      width: 100%;
    }
    background-color: var(--color-btn-primary-bg);

    :hover {
      background-color: var(--color-btn-hover);
    }
  }
`;

export const flexStyle = css`
  display: flex;
  gap: 16px;

  p {
    width: 50%;
  }

  span {
    color: var(--color-red-7);
  }

  button {
    ${size('17.65rem', '1.47rem')}
  }

  @media (max-width: 480px) {
    flex-direction: column;
    p {
      width: 100%;
    }
  }
`;

/* *************************** */
/*  login.tsx / register.tsx   */
/* *************************** */

export const loginPageContainerStyle = css`
  margin-top: 8rem;
  margin-bottom: 4rem;
  padding: 4rem 4rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: var(--space-xxl);

  article:first-of-type {
    display: flex;
    flex-direction: column;
    justify-items: flex-start;
    gap: 0.25rem;

    h1 {
      font-size: 1.875rem;
      font-weight: 600;
    }

    a:link,
    a:visited {
      font-weight: 600;
      color: var(--text-color);
    }

    a:hover,
    a:active {
      color: var(--color-green);
    }
  }

  article:nth-of-type(2) {
    width: 50%;
  }

  ~ section {
    margin-top: 0;
  }

  @media (max-width: 1200px) {
    padding: 0 1.5rem;
  }

  @media (max-width: 768px) {
    margin-top: 7rem;

    flex-direction: column;
    gap: var(--space-xl);

    article:first-of-type {
      height: unset;

      h1 {
        font-size: 1.5rem;
      }
    }

    article:first-of-type,
    article:nth-of-type(2) {
      width: 100%;
    }
  }

  @media (max-width: 480px) {
    h1 {
      font-size: var(--text-xl);
    }

    article:first-of-type,
    article:nth-of-type(2) {
      width: 100%;
    }
  }
`;

export const loginAndRegisterForm = css`
  display: flex;
  flex-direction: column;

  input,
  > button {
    width: 100%;
    border-width: 0.05rem;
    margin-bottom: 1rem;
    padding: 1.2rem;
    font-size: 0.9rem;
    border-radius: 5px;
  }

  button {
    ${btn};
    background-color: var(--color-btn-primary-bg);
    transition: all 0.3s;
    margin-bottom: 0;
    ${btnTextColorWhite}
    :hover {
      background-color: var(--color-btn-hover);
    }
  }
`;

export const apiErrorStyle = css`
  padding: 10px 0;
  color: red;
`;

/* *********************** */
/*  nav with logo only     */
/* *********************** */

export const navWithLogoOnlyStyle = css`
  // position: sticky;
  // top: 0;
  background-color: transparent;
  width: 100vw;
  border-bottom: 1px solid var(--color-grey-3);
  // z-index: 1;
  // border: 2px solid red;

  // container
  > div {
    max-width: 1920px;
    width: 100%;
    // background-color: var(--backgroundColorWhite);
    background-color: var(--main-bg-color);

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
