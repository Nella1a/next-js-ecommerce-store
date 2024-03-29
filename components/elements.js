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

  h2 {
    font-size: var(--text-4xl);
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

  /* main {
    height: auto;
    margin: auto auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // border: 1px solid red;
  } */

  /* make img easier to work with*/
  img {
    max-width: 100%; /* ensure that the img gets narrow when viewoprt shrinks*/
    display: block;
  }

  /* form elements should have same font as body */
  input,
  textarea,
  select {
    font-family: inherit;
    color: var(--color-grey-6);
    min-height: 2.9rem;
    min-height: var(--text-lg);
  }

  section {
    /*
  - max-width instead of width: ensure that the img gets narrow when viewoprt shrinks
  - "width: 100%":allows it to take up the entire available space
  - margin set to auto
  */
    //margin: auto;
    // margin-top: 3.5rem;
    // max-width: 1200px;
    //width: 100%;
    //padding: 0 3rem;
    //display: flex;
  }

  button {
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
    cursor: pointer;
    transition: all 0.3s;

    :hover {
      background-color: var(--color-btn-hover);
    }
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

  //todo
  @media (max-width: 768px) {
    h2 {
      font-size: var(--text-xl);
    }

    h3 {
      font-size: var(--text-base-size);
    }
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
  maxWidth: '1200px',
  padding: '0 3rem',
  margin: '0 auto',
};

export const flexRowXYCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
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

/* *************************** */
/*   Header: Navigation Bar    */
/* *************************** */

// export const headerStyle = (theme) => css`
//   background-color: transparent;
//   width: 100vw;
//   // height: 4.5rem;
//   border: 2px solid olive;
//   position: sticky;
//   top: 0;
//   z-index: 30;

//   // container
//   > div {
//     // position: sticky;
//     // z-index: 3;
//     max-width: 1920px;
//     width: 100%;
//     background-color: var(--main-bg-color);
//     margin: auto;
//     // display: flex;
//     //display: grid;
//     //grid-template-columns: 3fr 1fr;
//     padding: 1rem 3rem 0;
//     // padding-top: 0.5rem 0;
//     border-bottom: 0px solid var(--color-grey-6);
//     box-shadow: rgba(0, 0, 0, 0.45) 0px 15px 10px -20px;
//     border: 2px solid red;
//     //justify-items: end;

//     @media (max-width: 480px) {
//       grid-template-columns: 1fr 1fr;
//     }

//     // contanier shelovesPlants logo
//     > div:first-of-type {
//       /* align-self: center;
//       justify-self: start;
//       border: 1px solid blue; */
//     }

//     // container links
//     /* > div:nth-of-type(2) {
//       border: 2px solid pink;
//       display: flex;
//       align-items: center;
//       // z-index: 1;
//       // height: 4rem; */

//     ul {
//       list-style-type: none;
//       list-style-position: inside;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       gap: var(--space-md);
//       margin: 0;
//       padding-left: 0;

//       > li:first-of-type a {
//         display: inline-block;
//       }

//       a:link,
//       a:visited,
//       a:hover,
//       a:active {
//         font-weight: bold;
//       }

//       /* li {
//         display: flex;
//         align-items: flex-end;
//         justify-content: center;
//       } */

//       /* > li:first-of-type button {
//           all: unset;
//           cursor: pointer;
//         } */
//       > li:nth-of-type(2) button {
//         all: unset;
//         cursor: pointer;
//         display: flex;
//       }

//       > li:nth-of-type(2) {
//         margin-left: auto;
//         display: flex;
//         .hamburgerIcon {
//           height: 30px;
//           width: 30px;
//           display: inline-block;
//         }
//       }

//       > li:last-of-type {
//         height: 30px;
//       }

//       /* // hamburger menu
//       li button img {
//         display: inline-block;
//       } */
//       /*
//       li button {
//         display: inline-flex;
//         align-items: flex-end;
//       } */
//     }
//     // }
//   }
// `;

// export const shoppingBagStyle = css`
//   all: unset;
//   position: relative;
//   ${size('1.55rem', '1.55rem')}
//   border: 1px solid red;
//   background-color: lightpink;

//   // container circle and quantity
//   > span:nth-of-type(2) {
//     ${size('1.41rem', '1.41rem')}
//     display: flex;
//     border-radius: 50%;
//     background-color: var(--color-btn-primary-bg);
//     color: var(--color-white);
//     position: absolute;
//     text-align: center;
//     top: -18px;
//     right: -5px;

//     > span {
//       margin: auto auto;
//       font-size: var(--text-sm);
//     }
//   }
// `;

// export const shoppingBagStyle = css`
//   position: relative;
//   border: 1px solid red;
//   background-color: lightpink;
//   display: inline-flex;
//   text-decoration: none;

//   .shoppingBagStyle {
//     width: 24px;
//     height: 24px;
//     display: inline-flex;
//   }

//   // container circle and quantity
//   > span:first-of-type {
//     ${size('1.41rem', '1.41rem')}
//     display: flex;
//     border-radius: 50%;
//     background-color: var(--color-btn-primary-bg);
//     color: var(--color-white);
//     position: absolute;
//     text-align: center;
//     top: -18px;
//     right: -5px;

//     > span {
//       margin: auto auto;
//       font-size: var(--text-sm);
//     }
//   }
// `;

/* *************************** */
/*         footer       */
/* *************************** */

export const footerStyle = (theme) => css`
  background-color: ${theme.bgColor.greyMain};
  width: 100%;
  margin: 3rem 0rem auto;
  // border: 2px solid green;
  section {
    max-width: 1200px;
    padding: 3rem 3rem;
    margin: 0 auto;
    gap: 4.25rem;
    display: flex;
    justify-content: space-between;

    div {
      border: 1px dotted red;
      display: flex;
      flex-direction: column;
      gap: 0.063rem;
      line-height: 2rem;

      p {
        font-weight: bold;
      }

      ul {
        list-style: none;
        padding-left: 0;
      }
      @media (max-width: 768px) {
        display: none;
      }
    }

    form {
      display: flex;
      flex-direction: column;
      max-width: 100%;

      label {
        font-weight: 600;
      }

      p {
        font-size: large;
      }

      input {
        ${size('17.65rem', '1.47rem')}
        letter-spacing: 0.031rem;
        line-height: 1.125rem;
        // text-transform: uppercase;
        font-weight: bold;
        font-size: 0.75rem;
        display: block;
        width: 100%;
        padding: 0.625rem 1rem;
      }
    }
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const styleLargeButton = (theme) => css`
  display: flex;
  justify-content: center;

  button {
    ${size('17.65rem', '1.47rem')}
  }
`;

/* *************************** */
/*         Mobile-Footer       */
/* *************************** */

export const MobileFooterStyle = (theme) => css`
  gap: 4rem;
  background-color: ${theme.bgColor.greyMain};
  width: 100%;
  margin: 8rem 0rem auto;
  display: none;

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
    padding: 3rem;
    display: block;
    // border: 1px red solid;

    > div {
      max-width: 1920px;
      // border: 1px red solid;
      padding: 3rem 3rem;
      margin: 0 auto;
      gap: 4.25rem;
      display: flex;
      justify-content: space-between;

      > div {
        display: flex;
        flex-direction: column;
        gap: 0.063rem;
        border: 2px solid yellow;

        > {
          display: flex;
          justify-content: space-between;
          border-bottom: 0.1rem solid lightgray;

          span {
            display: inline-block;
            font-weight: bold;
          }
        }

        > ul {
          list-style-type: none;
          list-style-position: inside;
          display: flex;
          flex-direction: column;
          margin: 0;
          padding: 0;
          li {
            padding-left: 0.8rem;
          }
        }

        line-height: 2.5rem;
      }

      // subscribe to newsletter form
      form {
        display: flex;
        flex-direction: column;
        max-width: 100%;

        label {
          font-weight: 600;
        }

        input {
          letter-spacing: 0.031rem;
          line-height: 1.125rem;
          // text-transform: uppercase;
          font-weight: bold;
          font-size: 0.75rem;
          display: block;
          width: 100%;
          padding: 0.625rem 1rem;
          color: #000;
        }
      }

      @media screen and (max-width: 1051px) {
        gap: 1.5rem;
      }

      @media screen and (max-width: 768px) {
        flex-direction: column-reverse;
        padding: 0rem;
      }
    }
  }
`;

/* *************************** */
/*         Index.js            */
/* *************************** */

// export const bgImgContainer = css`
//   z-index: 1;
//   height: 20rem;
//   position: relative;
//   display: flex;
//   align-items: center;
//   justify-content: center;

//   @media (max-width: 769px) {
//     height: 18rem;
//   }

//   @media (max-width: 640px) {
//     height: 16rem;
//   }
// `;

// export const heroImageContentContainer = (theme) => css`
//   z-index: 1;
//   height: 12.5rem;
//   width: auto;
//   color: var(--main-bg-color);
//   letter-spacing: 0.2rem;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   //border: 2px solid blue;

//   p {
//     font-size: ${theme.typography.xLarge};
//     font-weight: 500;
//     text-shadow: 2px 8px 6px rgba(0, 0, 0, 0.2),
//       0px -5px 35px rgba(255, 255, 255, 0.3), 0px 1px 4px rgb(0, 0, 0);
//   }

//   button {
//     width: 12.65rem;
//     display: inline-block;
//   }

//   @media (max-width: 769px) {
//     height: 10.25rem;
//   }

//   @media (max-width: 640px) {
//     display: none;
//   }
// `;

export const bestSellerStyle = (theme) => css`
  display: flex;
  flex-direction: column;
  padding: 0 3rem;
  // border: 2px solid pink;

  > div {
    display: grid;
    gap: var(--space-sm);
    grid-template-columns: repeat(4, 1fr);
    //  border: 1px solid green;

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

  @media (max-width: 480px) {
    > div {
      grid-template-columns: repeat(2, 1fr);
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
/*     indexTextImage.js       */
/* *************************** */

export const summerFavoritesStyle = (theme) => css`
  display: flex;
  flex-direction: column;
  padding: 0 3rem;
  // border: 1px solid yellow;
  > div {
    // border: 2px solid green;
    display: grid;
    grid-template-columns: 2fr 2fr;
    gap: var(--space-sm);

    // first image container
    > div:first-of-type {
      // height: 38rem;
      position: relative;
      //border: 2px solid green;
    }

    // container for the productCards
    > div:last-of-type {
      display: grid;
      gap: var(--space-sm);
      grid-template-columns: 1fr 1fr;

      a:link,
      a:visited {
        text-decoration: none;
        color: var(--text-color);
      }

      // a:hover,
      a:active {
        color: var(--text-color);
      }

      article {
        // second image container
        > div:first-of-type {
          position: relative;
          height: 15rem;
        }
      }
    }
  }

  @media (max-width: 1024px) {
    //padding: 0 5rem;

    > div {
      // first image container
      > div:first-of-type {
        height: 40rem;
      }

      > div:last-of-type {
        grid-template-columns: repeat(2, 1fr);

        article {
          // second image container
          > div:first-of-type {
            height: 15rem;
            margin-bottom: 0.5rem;
          }
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 0 2rem;

    > div {
      grid-template-columns: 1fr;

      // first image container
      > div:first-of-type {
        height: 20rem;
      }

      > div:last-of-type {
        grid-template-columns: repeat(4, 1fr);

        article {
          // second image container
          > div:first-of-type {
            height: 10rem;
          }
        }
      }
    }
  }

  @media (max-width: 480px) {
    > div {
      > div:last-of-type {
        grid-template-columns: repeat(2, 1fr);
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
/*         Products.js         */
/* *************************** */

export const productsComponentStyle = css`
  > div:first-of-type {
    display: grid;
    gap: var(--space-sm);
    grid-template-columns: repeat(4, 1fr);
    grid-row-gap: var(--space-xl);

    a:link,
    a:visited {
      text-decoration: none;
      color: var(--text-color);
    }

    // a:hover,
    a:active {
      color: var(--text-color);
    }

    @media screen and (max-width: 1024px) {
      grid-row-gap: var(--space-lg);
    }

    @media screen and (max-width: 600px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

/* *************************** */
/*  Single Product Page        */
/* *************************** */

export const singleProductPageStyle = css`
  border: 2px solid red;
  display: grid;
  grid-template-columns: 1fr 11fr;
  gap: 1.5rem;

  @media screen and (max-width: 1025px) {
    grid-template-columns: 11fr;
    max-width: 100%;
  }

  @media screen and (max-width: 768px) {
    max-width: 100%;
    display: unset;
  }

  // first container - small images
  > article:first-of-type {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);

    border: 1px solid green;

    @media screen and (max-width: 1025px) {
      display: none;
    }
    > div {
      display: block;
    }
  }

  // second container - large image and text
  > article:nth-of-type(2) {
    display: flex;
    gap: var(--space-lg);
    border: 1px solid blue;

    // container large image
    > div {
      display: block;
      height: auto;
      width: 40%;

      // container for title, price, description and button
      > div:first-of-type {
        display: none;
      }
      @media screen and (max-width: 1025px) {
        width: 50%;
      }

      @media screen and (max-width: 768px) {
        width: 100%;

        // container title and price
        > div:first-of-type {
          display: block;
          margin-bottom: var(--space-lg);
          h1 {
            font-size: var(--text-xl);
          }
          p {
            font-size: var(--text-md);
            font-weight: bold;
          }
        }
      }

      @media screen and (max-width: 480px) {
        width: 100%;
        // container title and price
        > div:first-of-type {
          p {
            font-size: var(--base-text);
            font-weight: 400;
          }
        }
      }
    }

    // info outerContainer
    section {
      padding: unset;
      margin: unset;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60%;
      border: 2px solid orange;

      // info innerContainer
      > div {
        display: flex;
        flex-direction: column;
        gap: var(--space-md);
        border: 2px solid pink;

        // container title and price
        > div:first-of-type {
          h1 {
            font-size: var(--text-xxl);
          }

          p:first-of-type {
            font-size: var(--text-md);
            font-weight: bold;
          }
          @media screen and (max-width: 768px) {
            display: none;
          }
        }

        // todo: dry! see shoppingCartStyle
        // container quantity and buttons
        > div:nth-of-type(2) {
          display: flex;
          gap: 1.2rem;
          border: 2px solid lightskyblue;

          // container quantity buttons
          div {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            gap: 0.8rem;

            button {
              background-color: var(--color-grey-2);
              border-radius: 100rem;
              //width: 1.5rem;
              min-height: 0.5rem;
              border: unset;
              font-size: var(--text-sm);
              font-weight: 400;
              margin: 0;

              :hover {
                background-color: var(--color-grey-4);
              }
            }
            // quantity
            span {
              font-size: var(--text-md);
            }
          }

          > button {
            ${size('15.65rem', '1.47rem')}
            border: none;
          }

          @media screen and (max-width: 768px) {
            flex-direction: column-reverse;

            // container quantity buttons
            div {
              button {
                margin: 0;
              }
            }

            // add-to-cart button
            > button {
              width: 100%;
              margin: 0;
            }
          }
        }

        @media screen and (max-width: 480px) {
          width: 100%;
        }
      }

      @media screen and (max-width: 768px) {
        width: 100%;
      }

      @media screen and (max-width: 480px) {
        padding: 0;
      }
    }

    @media screen and (max-width: 768px) {
      flex-direction: column;
    }
  }
`;

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

            // todo: dry! see singleProductStyle
            // container quantity and buttons
            > div > div {
              border: 2px solid blue;
              background-color: lavender;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              gap: 0.8rem;

              button {
                background-color: var(--color-grey-2);
                border-radius: 100rem;
                //width: 1.5rem;
                min-height: 0.5rem;
                border: unset;
                font-size: var(--text-sm);
                font-weight: 400;
                margin: 0;

                :hover {
                  background-color: var(--color-grey-4);
                }
              }
              // quantity
              span {
                // font-size: var(--text-md);
              }
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
/*    Underconstruction        */
/* *************************** */
export const underConstruction = css`
  // margin-top: 5rem;

  border: 1px solid red;
  article {
    h1 {
      border: 1px solid red;
      text-align: center;
    }

    margin: 5rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    //  height: 50vh;
    padding: 0 0.5rem;

    border: 2px solid red;
    a {
      display: block;
    }

    button {
      width: 15rem;
    }

    @media (max-width: 768px) {
      h1 {
        font-size: var(--text-xxl);
      }
    }

    @media (max-width: 480px) {
      h1 {
        font-size: var(--text-xl);
      }
    }
  }
`;

/* *************************** */
/*    DeliveryInfos.js       */
/* *************************** */

export const deliveryInfos = css`
  //  border: 2px solid red;
  background-color: var(--color-green);
  //color: #000;
  height: 8rem;
  max-width: unset;
  width: 100vw;
  display: flex;
  justify-content: center;

  div {
    max-width: 1920px;
    width: 100%;
    height: inherit;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    align-content: center;

    > article {
      gap: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      //border: 1px solid black;
      > div {
        width: 3rem;
        height: 3rem;
        background-color: lightgrey;
        border-radius: 50%;
        margin: 0;
      }
    }

    @media screen and (max-width: 600px) {
      > article > div {
        display: none;
      }
    }

    @media screen and (max-width: 480px) {
      grid-template-columns: 1fr;
      gap: var(--space-xs);
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
