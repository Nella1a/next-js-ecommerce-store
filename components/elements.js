import { css } from '@emotion/react';

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
    --font-primary: 'Yeseva One';
    --font-fallback: sans-serif;

    /* set base values */
    --text-base-size: 1em;
    --text-scale-ratio: 1.2; //120% of what they would normally be”.
    // --baseline: 24px;

    /* base color */
    --text-color: #343a40;
    --main-bg-color: #f8f9fa;
    --color-btn-primary-bg: #f76707;
    --color-btn-text: #343a40;
    --color-btn-hover: #ff922b;
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

    /* type scale */
    /* --text-xs: calc(1em / (var(--text-scale-ratio) * var(--text-scale-ratio)));
    --text-sm: calc(1em / var(--text-scale-ratio));
    --text-md: calc(1em * var(--text-scale-ratio));
    --text-lg: calc(1em * var(--text-scale-ratio) * var(--text-scale-ratio));
    --text-xl: calc(
      1em * var(--text-scale-ratio) * var(--text-scale-ratio) *
        var(--text-scale-ratio)
    );
    --text-xxl: calc(
      1em * var(--text-scale-ratio) * var(--text-scale-ratio) *
        var(--text-scale-ratio) * var(--text-scale-ratio)
    );
    --text-xxxl: calc(
      1em * var(--text-scale-ratio) * var(--text-scale-ratio) *
        var(--text-scale-ratio) * var(--text-scale-ratio) *
        var(--text-scale-ratio)
    ); */

    --text-xxs: 0.5em; // 8
    --text-xs: 0.625em; // 10
    --text-sm: 0.75em; // 12
    --text-md: 0.875em; // 14
    --text-base-size: 1em; // 16
    --text-lg: 1.125em; // 18
    --text-xl: 1.25em; // 20
    --text-xxl: 1.5em; // 24
    --text-xxxl: 1.875em; // 30
    --text-4xl: 2.25em; // 36
    --text-5xl: 2.75em; // 44
    --text-6xl: 3.25em; // 52
    --text-7xl: 3.875em; // 62
    --text-7xl: 4.625em; // 74
    --text-8xl: 5.375em; // 86
    --text-9xl: 6.125em; // 98

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

  /* text size */
  /* .text--xxxl {
    font-size: var(--text-xxxl);
  }

  h1,
  .text--xxl {
    font-size: var(--text-xxxl);
  }

  h2,
  .text--xl {
    font-size: var(--text-xxl);
    // margin-bottom: 1.5rem;
    margin-bottom: var(--space-xs);
  }

  h3,
  .text--lg {
    font-size: var(--text-md);
    margin-bottom: var(--space-xs);
  }

  .text--sm,
  small {
    font-size: var(--text-sm);
  }

  .text--xs {
    font-size: var(--text-xs);
  }

  p {
    line-height: var(--body-line-height);
  } */

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
  }

  /* make img easier to work with*/
  img {
    max-width: 100%; /* ensure that the img gets narrow when viewoprt shrinks*/
    display: block;
  }

  /* form elements should have same font as body */
  input,
  textarea,
  select {
    font-family: var(--font-primary), var(--font-fallback);
    color: var(--color-grey-6);
    // min-height: 2.9rem;
    // min-height: var(--text-lg);
  }

  a:link,
  a:visited {
    text-decoration: none;
    color: var(--text-color);
  }

  a:hover,
  a:active {
    text-decoration: none;
    color: var(--text-color);
  }
`;
export const btnLinkStyle = css`
  letter-spacing: 0.031rem;
  line-height: 1.125rem;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 0.75rem;
  display: block;
  min-height: 2.9rem;
  padding: 0.625rem 1rem;
  margin: 1rem 0;
  color: var(--text-color);
  border: none;
  background-color: var(--color-btn-primary-bg);
  transition: all 0.3s;

  :hover {
    background-color: var(--color-btn-hover);
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

export const styleLargeButton = (theme) => css`
  display: flex;
  justify-content: center;

  button {
    ${size('17.65rem', '1.47rem')}
  }
`;

export const bestSellerStyle = (theme) => css`
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

export const summerFavoritesStyle = (theme) => css`
  ${container};
  ${marginTop}

  h2 {
    ${h2Section}
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

export const productImageContainer = css`
  display: block;
  height: auto;
  width: 40%;

  > div {
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
    > div {
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

export const productTitleAndPriceContainer = css`
  h1 {
    font-size: var(--text-xl);
  }
  p {
    font-size: var(--text-md);
    font-weight: bold;
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
        color: var(--text-color);
        ${size('17.65rem', '1.47rem')}

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

// export const changeCartQuantityButtons = css`
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   gap: 0.8rem;

//   > button {
//     background-color: var(--color-grey-2);
//     border-radius: 100rem;
//     font-weight: 400;
//     cursor: pointer;
//     font-weight: bold;
//     min-height: 2.5rem;
//     padding: 0.625rem 1rem;
//     border: none;
//     color: var(--text-color);

//     :hover {
//       background-color: var(--color-grey-4);
//     }
//   }

//   // quantity
//   span {
//     font-size: var(--text-md);
//   }
// `;

/* *************************** */
/*      Shoppingcart.js          */
/* *************************** */

export const shoppingCartStyle = css`
  //margin-top: 4rem;

  h1 {
    margin-bottom: var(--space-xs);
  }

  @media (max-width: 480px) {
    h1 {
      font-size: var(--text-xl);
      margin-bottom: var(--space-md);
    }
  }

  > div {
    margin-top: var(--space-sm);
    display: grid;
    gap: var(--text-xxxl);
    grid-template-columns: 2fr 1fr;
    position: relative;
    border: 1px solid green;

    @media screen and (max-width: 900px) {
      display: flex;
      flex-direction: column;
    }

    // cartproducts
    article:first-of-type {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      background-color: #fff;

      > div {
        background-color: #fff;
        border-bottom: 0.5px solid lightgray;
        display: grid;
        grid-template-columns: 1fr 7fr;
        gap: 1rem;

        // Image
        > div:first-of-type {
          width: 100px;

          @media (max-width: 768px) {
            width: 120px;
          }
        }

        // productInfoContainer
        > div:nth-of-type(2) {
          // quantity
          border: 2px solid red;

          // container quantity and buttons
          > div:first-of-type {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border: 2px solid greenyellow;
            gap: var(--space-sm);
            font-weight: bold;

            h2 {
              font-size: var(--text-base-size);
              margin: 0px;
              width: 2rem;
            }

            @media (max-width: 768px) {
              h2 {
                width: 100%;
              }
              flex-direction: column;
              justify-content: flex-start;
              align-items: unset;
              gap: unset;

              > div > div {
                margin: var(--space-sm) 0;
              }
            }

            @media (max-width: 480px) {
              p {
                font-weight: 500;
              }
            }
          }

          // removeButton
          > div:last-of-type {
            button {
              all: unset;
              color: grey;
            }
          }
        }
      }
    }

    // todo: dry! see checkoutPageStyle  - orderSummary
    // orderSummary
    article:nth-of-type(2) {
      width: 100%;
      background-color: var(--color-grey-3);
      position: sticky;
      top: 69px;
      padding: 1rem 1.5rem;
      display: flex;
      flex-direction: column;
      gap: var(--space-md);

      h2 {
        margin: 0;
        width: inherit;
      }

      // container price, delivery, total
      > div:first-of-type {
        display: flex;
        flex-direction: column;
        gap: var(--space-sm);
        width: inherit;
        border: 1px solid red;

        @media screen and (max-width: 960px) {
          //padding: 0rem 2rem;
        }

        p {
          width: inherit;
          display: flex;
          justify-content: space-between;
          //margin-bottom: 1rem;

          span {
            display: block;
          }
        }

        p:last-of-type {
          padding-top: 1rem;
          font-weight: 600;
          border-top: 1px solid lightgray;
        }
      }

      // checkout button
      button {
        width: 100%;
        margin: 0;
      }
    }
  }
`;

export const plantName = css`
  margin-top: 0.5rem;
`;

/* *************************** */
/*         checkout.js         */
/* *************************** */

export const checkoutPageStyle = css`
  // contact infos and orderSummary
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-lg);
  margin-top: unset;

  @media screen and (max-width: 960px) {
    display: flex;
    flex-direction: column;
  }

  @media screen and (max-width: 768px) {
    gap: var(--space-md);
  }

  // contact infos
  article:first-of-type {
    padding: 0 1.5rem;
    border: 1px solid red;

    > form input ~ p {
      color: var(--color-red-7);
    }
  }

  // order summary
  article:nth-of-type(2) {
    // padding: 2rem;
    border: 2px solid black;
    padding-top: unset;
    display: flex;
    flex-direction: column;
    background-color: var(--color-grey-1);
    border-left: 1px solid var(--color-grey-3);
    width: inherit;
    // height: 50%;

    > form span {
      color: var(--color-red-7);
    }

    > div:first-of-type {
      width: 100%;
      padding-top: 1rem;
      border: 2px solid grey;

      > div {
        // checkoutProductCard
        width: inherit;
        padding: 0 1.5rem;
        //  margin-bottom: 0.5rem;
        border: 2px solid yellowgreen;
      }
    }

    // todo: dry! see shoppingCartStyle - orderSummary-container price, delivery, total
    // orderSummary
    > div:nth-of-type(2) {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs);
      width: inherit;
      padding: 1.5rem;
      border: 1px solid red;

      p {
        width: inherit;
        display: flex;
        justify-content: space-between;

        span {
          display: block;
        }
      }

      p:last-of-type {
        padding-top: var(--space-xs);
        font-weight: 600;
        border-top: 1px solid lightgray;
      }
    }
  }
`;

export const checkoutProductCardStyle = css`
  display: grid;
  grid-template-columns: 1fr 5fr;
  gap: 1rem;
  border: 1px solid pink;

  > div:first-of-type {
    // Image
    width: 80px;
  }

  > div:nth-of-type(2) {
    // productInfoContainer
    display: flex;
    justify-content: space-between;

    p:first-of-type {
      // title and quantity

      height: 50%;
      display: flex;
      flex-direction: column;
      span {
        display: block;
      }
    }
    p:nth-of-type(2) {
      // price
      height: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    @media (max-width: 480px) {
      flex-direction: column;
      justify-content: flex-end;

      p:nth-of-type(2) {
        justify-content: flex-start;
      }
    }
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
  div > input ~ span,
  div > p > input ~ span {
    color: var(--color-red-7);
  }

  div {
    margin-bottom: 1rem;
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
    ${size('17.65rem', '1.47rem')}
    @media screen and (max-width: 960px) {
      width: 100%;
    }
  }
`;

// export const flexStyleShippigAddress = css`
//   display: flex;
//   gap: 16px;

//   p {
//     width: 50%;
//   }

//   button {
//     ${size('17.65rem', '1.47rem')}
//   }
// `;

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
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: start;
  gap: var(--space-lg);
  //margin-top: 10rem;
  border: 1px solid blue;
  height: 50vh;

  article:first-of-type {
    width: 44%;
    // height: 100%;

    border: 2px solid green;
    h1 {
      font-weight: 500;
    }
    p:last-of-type {
      font-size: inherit;
    }

    a:link,
    a:visited,
    a:hover,
    a:active {
      font-weight: 600;
      color: var(--text-color);
      text-decoration: none;
    }
  }

  article:nth-of-type(2) {
    width: 44%;
    // height: 100%;
  }

  @media (max-width: 768px) {
    gap: var(--space-md);
    h1 {
      font-size: var(--text-xxl);
    }

    height: unset;
    //flex-direction: column;
    //justify-content: center;
    //align-items: center;

    article:first-of-type,
    article:nth-of-type(2) {
      width: 80%;
    }
  }

  @media (max-width: 480px) {
    gap: var(--space-sm);
    h1 {
      font-size: var(--text-xl);
    }

    article:first-of-type,
    article:nth-of-type(2) {
      width: 100%;
    }
  }
`;

export const loginRegisterFormStyle = css`
  width: 100%;
  h1 {
    padding-top: 2.25rem;
    //padding-bottom: 1rem;
    text-align: center;
  }

  p {
    margin-top: unset;
    margin-bottom: 1rem;
    text-align: center;

    a:link,
    a:visited {
      text-decoration: none;
      color: black;
      font-weight: bold;
    }

    a:hover {
      text-decoration: underline;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    // border: 1px solid green;
    margin-bottom: 1rem;

    input,
    > button {
      width: 100%;
      border-width: 0.5px;
      margin-bottom: 1rem;
      padding: 1.2rem;
      // line-height: 1.25rem;
      font-size: 100%;
      margin-top: 0;
      font-weight: unset;
    }

    button {
      background-color: var(--color-btn-primary-bg);
      border: none;
      text-transform: unset;
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
