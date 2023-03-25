import { css } from '@emotion/react';

/* *************************** */
/*    Global Styles            */
/* *************************** */

export const globalStyleBody = (theme) => css`
  :root {
    --backgroundColor: #e4e8e7;
    --backgroundColorWhite: #fff;
    --footerBackGroundColor: #f5f5f5;
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

  h2 {
    font-size: 2rem;
    //margin-top: 5.5rem;
    margin-bottom: 2rem;
  }

  /* set up the body */
  body {
    line-height: 1.5; /* default for browser: 1.4 tends to be very small*/
    font-size: ${theme.typography.medium};
    //min-height: 100vh;
    //max-width: 1400px;
    //font-family: ${theme.font};
    font-family: 'Yeseva One';

    background-color: var(--backgroundColorWhite);
    position: relative;
  }

  main {
    // margin-top: 4rem;
    height: auto;
    margin: auto auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    /*
  - max-width instead of width: ensure that the img gets narrow when viewoprt shrinks
  - "width: 100%":allows it to take up the entire available space
  - margin set to auto
  */
    margin: auto;
    margin-top: 4.5rem;
    max-width: 1920px;
    width: 100%;
    padding: 0 3rem;
    display: flex;
    flex-direction: column;
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
  //width: 100vw;
  max-width: 1920px;
  width: 100%;
  position: fixed;
  background-color: var(--backgroundColorWhite);

  //left: 0;
  //right: 0;
  top: 0;
  z-index: 1;
  // background-color: green;

  > div {
    //max-width: 1400px;
    width: 100%;
    ${marginCenter}
    // background-color: yellow;
    margin: auto;

    position: relative;
    //left: 0;
    //right: 0;
    top: 4px;
    gap: 2rem;
    align-items: center;
    display: flex;
    justify-content: space-between;
    z-index: 1;
    height: 4rem;
    color: #43964f;
    //border-bottom: 2px solid lightgray;

    button {
      all: unset;
    }

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

    @media (max-width: 1200px) {
      gap: 1rem;
      padding-left: 3rem;
      padding-right: 3rem;
    }

    @media (max-width: 768px) {
      button {
        display: block;
        margin-left: auto;
        position: relative;
        top: 3px;
      }
      gap: 0.5rem;
    }
  }

  a:nth-of-type(2) {
    margin-left: auto;
  }

  a:nth-of-type(n + 2) {
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
  gap: 4rem;
  background-color: var(--footerBackGroundColor);
  width: 100%;
  margin: 8rem 0rem auto;

  div {
    max-width: 1920px;
    // border: 1px red solid;
    padding: 3rem 3rem;
    margin: 0 auto;
    gap: 4.25rem;
    display: flex;
    justify-content: space-between;

    article {
      //border: 1px dotted red;

      display: flex;
      flex-direction: column;
      gap: 0.063rem;
      p:first-of-type {
        font-weight: bold;
      }
      line-height: 2.5rem;

      form {
        display: flex;
        flex-direction: column;
        max-width: 100%;

        input {
          ${size('17.65rem', '1.47rem')}
          letter-spacing: 0.031rem;
          line-height: 1.125rem;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 0.75rem;
          display: block;
          height: 3.5rem;
          width: 100%;
          padding: 0.625rem 1rem;
          color: #000;
        }

        button {
          height: 3.5rem;
          width: 100%;
          background-color: #ed943b;
          border: none;

          &:hover {
            background-color: #ff6900;
          }
        }
      }
    }

    article:nth-of-type(5) {
      // border: 2px solid green;
      flex-basis: 30%;

      p {
        font-size: large;
      }
    }

    @media screen and (max-width: 1051px) {
      gap: 1.5rem;
    }

    @media screen and (max-width: 768px) {
      display: none;
      flex-direction: column-reverse;
      padding: 3rem 0rem;
    }
  }

  a {
    text-decoration: none;
    display: block;
  }

  @media screen and (max-width: 1024px) {
    padding: 2.5rem 2.5rem;
  }
`;

export const styleLargeButton = css`
  display: flex;
  justify-content: center;

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
/*         Mobile-Footer       */
/* *************************** */

export const MobileFooterStyle = css`
  gap: 4rem;
  background-color: var(--footerBackGroundColor);
  width: 100%;
  margin: 8rem 0rem auto;
  display: none;

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
    padding: 3rem 0rem;
    display: block;
  }

  div {
    max-width: 1920px;
    // border: 1px red solid;
    padding: 3rem 3rem;
    margin: 0 auto;
    gap: 4.25rem;
    display: flex;
    justify-content: space-between;

    article {
      display: flex;
      flex-direction: column;
      gap: 0.063rem;

      ul {
        list-style-type: none;
        list-style-position: inside;
        margin: 0;
        padding: 0;

        p:first-of-type {
          font-weight: bold;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid lightgrey;
          padding: 0.5rem 0;

          span {
            //display: block;
            font-size: 20px;
            font-weight: 400;
            color: gray;
          }
        }
      }

      line-height: 2.5rem;

      form {
        display: flex;
        flex-direction: column;
        max-width: 100%;

        input {
          ${size('17.65rem', '1.47rem')}
          letter-spacing: 0.031rem;
          line-height: 1.125rem;
          text-transform: uppercase;
          font-weight: bold;
          font-size: 0.75rem;
          display: block;
          height: 3.5rem;
          width: 100%;
          padding: 0.625rem 1rem;
          color: #000;
        }

        button {
          height: 3.5rem;
          width: 100%;
          background-color: #ed943b;
          border: none;

          &:hover {
            background-color: #ff6900;
          }
        }
      }
    }

    article:nth-of-type(5) {
      // border: 2px solid green;
      flex-basis: 30%;

      p {
        font-size: large;
      }
    }

    @media screen and (max-width: 1051px) {
      gap: 1.5rem;
    }

    @media screen and (max-width: 768px) {
      flex-direction: column-reverse;
      padding: 3rem 0rem;
    }
  }

  a {
    text-decoration: none;
    display: block;
  }

  @media screen and (max-width: 1024px) {
    padding: 2.5rem 2.5rem;
  }
`;

/* *************************** */
/*         Index.js            */
/* *************************** */

export const bgImgContainer = css`
  height: 600px;
  position: relative;
  border: 1px solid red;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 1024px) {
    height: 500px;
  }

  @media (max-width: 769px) {
    height: 400px;
  }

  @media screen and (max-width: 480px) {
    height: 300px;
  }
`;

export const bgImgInnerContainer = (theme) => css`
  height: 12.5rem;
  width: auto;
  color: #fff;
  letter-spacing: 0.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //border: 2px solid blue;

  p {
    font-size: ${theme.typography.xLarge};

    //margin: 0 0;
    font-weight: 500;

    //text-shadow: 3px 4px 7px rgba(81,67,21,0.8);
    //text-shadow: 6px 6px 0px rgba(0,0,0,0.2);
    text-shadow: 2px 8px 6px rgba(0, 0, 0, 0.2),
      0px -5px 35px rgba(255, 255, 255, 0.3), 0px 1px 4px rgb(0, 0, 0);
  }

  button {
    ${size('10.65rem', '1.47rem')}
    background-color: #ed943b;
    border: none;

    &:hover {
      background-color: #ff6900;
    }
  }

  @media (max-width: 769px) {
    height: 11.25rem;

    //width: 60%;
  }

  @media (max-width: 425px) {
    height: 10.25;

    //width: 80%;

    font-size: ${theme.typography.large};
    p {
      font-size: 1.8rem;
    }
  }
`;

export const bestSellerStyle = (theme) => css`
  //gap: 48px;
  //margin-top: 4rem;

  h2 {
    //text-align: center;
    font-size: ${theme.typography.large};
    //margin-top: 5.5rem;
    // margin-bottom: 3.5rem;
  }

  h3 {
    margin-bottom: unset;
  }
  > div {
    display: grid;
    gap: 30px;
    grid-template-columns: repeat(4, 1fr);

    @media screen and (max-width: 1024px) {
      gap: 24px;
    }

    @media screen and (max-width: 800px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }

    @media screen and (max-width: 480px) {
      gap: 4px;
      grid-template-columns: 1fr;
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

export const indexTextImageComp = css`
  // border: 2px solid green;
  display: grid;
  grid-template-columns: 3fr 2fr;
  //margin-top: 64px;
  //margin-bottom: 56px;
  gap: 2rem;

  h3 {
    margin-bottom: unset;
  }

  > div:first-of-type {
    height: 100%;
  }

  > div:nth-of-type(2) {
    display: grid;
    gap: 2rem;
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
    > div:first-of-type {
      height: 40rem;
    }

    > div:nth-of-type(2) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;

    > div:nth-of-type(2) {
      grid-template-columns: repeat(2, 1fr);
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

export const productsComponentStyle = (theme) => css`
  h2 {
    font-size: ${theme.typography.large};
  }

  h3 {
    margin-bottom: unset;
  }

  > article:first-of-type {
    display: grid;
    gap: 30px;
    grid-template-columns: repeat(4, 1fr);

    @media screen and (max-width: 1024px) {
      gap: 24px;
    }

    @media screen and (max-width: 800px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }

    @media screen and (max-width: 480px) {
      gap: 4px;
      grid-template-columns: 1fr;
    }
  }
`;

export const styleSectionProducts = css`
  display: flex;
  flex-direction: column;
  gap: 1px;
  //  border: 1px solid green;

  div {
    width: 100%;
  }

  div:first-of-type {
    height: auto;
    position: relative;

    span {
      position: absolute;
      display: block;
      //background-color: #37798D;
      background-color: #009a7b;
      color: #fff;
      width: 70%;
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      top: 30px;

      @media (max-width: 800px) {
        font-size: 18px;
      }
    }
  }

  a {
    text-decoration: none;
  }

  h3 {
    font-size: 18px;
    margin: 0.5rem 0;
  }

  @media (max-width: 1024px) {
  }
`;
/* *************************** */
/*  Single Product Page        */
/* *************************** */

export const singleProductPageStyle = css`
  margin-top: 8em;
  border: 1px solid red;
  display: grid;
  //grid-template-columns: minmax(0, 9.37rem) 1fr;
  grid-template-columns: 1fr 11fr;
  gap: 1.5rem;

  @media screen and (max-width: 1025px) {
    grid-template-columns: 1fr;
    max-width: 100%;
  }

  @media screen and (max-width: 768px) {
    max-width: 100%;
    display: unset;
    padding: 0 1.5rem;
  }

  > div:first-of-type {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    //justify-content: space-between;
    // display: block;

    @media screen and (max-width: 1025px) {
      display: none;
    }
    > div {
      display: block;
    }
  }

  div:nth-of-type(2) {
    display: flex;
    gap: 1.5rem;

    @media screen and (max-width: 768px) {
      flex-direction: column;
    }

    > div {
      display: block;
      height: auto;
      width: 40%;

      @media screen and (max-width: 1025px) {
        width: 50%;
      }

      @media screen and (max-width: 768px) {
        width: 100%;
      }
    }
    article {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      height: 500px;
      width: 50%;
      @media screen and (max-width: 768px) {
        width: 100%;
        padding: 0 1rem;
      }

      gap: 1rem;
      h1 {
        font-size: 24px;
      }

      > div {
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-end;
        gap: 1.2rem;

        div {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 0.8rem;
          //width: 17.65rem;
          //font-size: 16px;

          button {
            background-color: rgba(243, 244, 243);
            border: unset;
            :hover {
              background-color: rgba(237, 148, 59, 0.6);
            }
          }
          > div {
            // font-size: 25px;
          }
        }

        > button {
          ${size('15.65rem', '1.47rem')}
          background-color: #ed943b;
          border: none;

          &:hover {
            background-color: #ff6900;
          }
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

export const shoppingCartSectionHeader = css`
  margin-top: 8rem;
  //margin-bottom: 5rem;
  text-align: left;
`;

export const shoppingCartStyle = css`
  margin-top: 4rem;
  display: grid;
  gap: 60px;
  grid-template-columns: 2fr 1fr;
  background-color: #f8f8f8;
  border: 1px solid red;

  article:first-of-type {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    margin-top: 1rem;
    border: 1px solid green;
    > div {
      display: grid;
      grid-template-columns: 1fr 3fr;

      a {
        display: block;
        text-align: right;
      }

      div {
        display: grid;

        grid-template-areas:
          'area1 .'
          'area2  area4'
          'area3  .';

        div:first-of-type {
          grid-area: area1;
          margin-left: unset;
        }

        div:nth-of-type(2) {
          grid-area: area2;
          select {
            height: 2.47rem;
            padding: 0.75rem 0.5rem 0.75rem 0.75rem;
            text-align: center;
            width: 8.825rem;
            height: 3rem;
          }
        }

        div:nth-of-type(3) {
          grid-area: area4;
        }

        button {
          all: unset;
          grid-area: area3;
          color: gray;
        }
      }
    }
  }

  article:nth-of-type(2) {
    display: flex;
    // align-items: center;
    width: 100%;

    h2 {
      margin-top: 1rem;
      margin-bottom: 2rem;
      width: inherit;
    }

    > div {
      width: 100%;
      flex-direction: column;
      display: flex;
      align-items: flex-start;
      justify-content: space-around;
      background-color: #e0e0e0;
      padding: 1rem;

      div {
        width: inherit;
      }

      div:nth-of-type(2) {
        p {
          margin-top: 0.5rem;
          margin-bottom: 2rem;
          font-weight: 600;
        }

        border-top: 1px solid grey;
      }
    }

    p {
      width: inherit;
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;

      span {
        display: block;
      }
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

export const plantName = css`
  margin-left: 1rem;
`;

/* *************************** */
/*         checkout.js         */
/* *************************** */

export const cartStyle = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 2px solid blue;
  gap: 2rem;

  @media screen and (max-width: 1000px) {
    display: flex;
    flex-direction: column;
  }

  article:nth-of-type(2) {
    display: flex;
    > div {
      width: 100%;
      flex-direction: column;
      display: flex;
      align-items: flex-start;
      justify-content: space-around;
      background-color: #e0e0e0;
      padding: 1rem;

      div {
        width: inherit;
      }

      div:nth-of-type(2) {
        p {
          margin-top: 0.5rem;
          margin-bottom: 2rem;
          font-weight: 600;
        }

        border-top: 1px solid grey;
      }
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

export const formStyle = css`
  p,
  label,
  input {
    margin-bottom: 6px;
  }
  h2 {
    font-size: 18px;
  }

  input,
  select {
    width: 100%;
    height: 48px;
    // border: 1px solid lightgray;
    border-radius: 5px;
  }
  div > input ~ p {
    color: red;
  }

  div > p > input ~ span {
    color: red;
  }
  div {
    margin-bottom: 2rem;
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
  margin-top: 5rem;
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

/* *************************** */
/*    DeliveryInfos.js       */
/* *************************** */

export const deliveryInfos = () => css`
  border: 1px solid red;
  background-color: #709f7a;
  color: #000;
  height: 8rem;
  //max-width: 1920px;
  width: 100%;
  display: flex;
  justify-content: center;

  div {
    height: inherit;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    align-items: center;

    > div {
      gap: 1rem;
      article {
        width: 3rem;
        height: 3rem;
        background-color: lightgrey;
        border-radius: 50%;
      }
    }

    @media screen and (max-width: 1024px) {
      h4 {
        font-size: 1.5rem;
      }
    }

    @media screen and (max-width: 768px) {
      h4 {
        font-size: 1.3rem;
      }
    }
  }
`;
