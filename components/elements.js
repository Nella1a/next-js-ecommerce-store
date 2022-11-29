import { css } from '@emotion/react';

/* *************************** */
/*    Global Styles            */
/* *************************** */

export const globalStyleBody = (theme) => css`
  :root {
    --backgroundColor: #e4e8e7;
    --backgroundColorWhite: #fff;
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
    margin-top: 5.5rem;
    margin-bottom: 3.5rem;
}


  /* set up the body */
  body {
    line-height: 1.5; /* default for browser: 1.4 tends to be very small*/
    font-size: ${theme.typography.medium};
    min-height: 100vh;
    width: 100vw;
    font-family: ${theme.font};
    background-color: var(--backgroundColorWhite);
    position: relative;

  }

  main {
    margin-top: 4rem;
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
    margin: 0 auto;
    max-width: 1400px;
    display: flex;
    flex-direction: column;
    //align-items: center;
    //gap: 4rem;
    //width: 87rem;
    //border: 3px solid pink;
  /*   max-width: 1400px;
    margin: 0 auto;
    padding-left: 3rem;
    padding-right: 3rem; */

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
  position: fixed;
  background-color: #fff;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1;

  nav {
    max-width: 1400px;
    ${marginCenter}

    position: relative;
    left: 0;
    right: 0;
    top: 4px;
    gap: 2rem;
    align-items: center;
    display: flex;
    justify-content: space-between;
    z-index: 1;
    height: 4rem;
    color: #43964f;
    //border: 3px solid green;

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

   @media (max-width:768px) {
    button {
      display: block;
      margin-left: auto;
      position: relative;
      top: 3px;

    }
      gap: .5rem;
    }
  }


  a:nth-of-type(2) {
    margin-left: auto;
  }

  a:nth-of-type(n+2) {
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
  height: auto;
  //background-color: rgb(249,248,247);
  //background-color: #009a7b;
  background-color: rgba(0, 154, 123, .1);

  width: 100%;
  margin: auto auto;
  //border: 1px solid red;
  padding-top: 40px 40px 80px 40px;


   > div {
      max-width: 1400px;
      //display: flex;
      //justify-content: space-around;

      padding: 3rem 0;
      padding-left: 48px;
      margin: 0 auto;


      display: grid;
      grid-template-columns: 3fr 1fr;
      //border: 1px solid blue;
      border-top: .5px solid lightgray;

      @media screen and (max-width: 480px) {
        flex-direction: column;
      }

        div { display: flex;
          //border: 1px solid red;
          gap: 100px;
          margin-left: 400px;

        }


    }

    article {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      p:first-of-type {
      font-weight: bold;
    }

    form {
      display: flex;
      flex-direction: column;

      input {
        ${size('17.65rem', '1.47rem')}
        letter-spacing: 0.031rem;
        line-height: 1.125rem;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 0.75rem;
        display: block;
        min-height: 2.5rem;
        padding: 0.625rem 1rem;
        color: #000;
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


    @media screen and (max-width: 480px) {
      align-items: center;
      gap: 0.5rem;
    }

   }


  article:nth-of-type(2) {
    display: flex;
    //align-items: center;
    gap: 1rem;
  }


  a {
    text-decoration: none;
    display: block;
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
  letter-spacing: .2rem;
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
      text-shadow: 2px 8px 6px rgba(0,0,0,0.2),
                 0px -5px 35px rgba(255,255,255,0.3),
                 0px 1px 4px rgb(0,0,0)
                 ;
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

export const bestSellerStyle  = (theme) => css`
  gap: 48px;
  //margin-top: 4rem;


  h2 {
    //text-align: center;
    font-size: ${theme.typography.large};
    margin-top: 5.5rem;
    margin-bottom: 3.5rem;
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

/*
export const indexTextImageComp = css`


  display: grid;
  grid-template-columns: 1fr 2fr;
  margin-top: 64px;
  margin-bottom: 56px;
  gap: 2rem;

  div {
    margin: 3rem 0;
  }

  div:first-of-type{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 40px;
    //flex-basis: 33.33%;
    border: 1px solid red;

    h2 {
      font-size: 2rem;
      margin-top: 0;
    }

    button {
      width: 10.65rem;
      height: 1.47rem;
      background-color: #ed943b;
      border: none;
      border-radius: 20px;
    }

    }

  div:nth-of-type(2){

    width: 100%;
  }

 @media (max-width: 768px){
  display: flex;
  flex-direction: column;
  gap: 1rem;

  div {
    margin: .5rem 0;
  }

 }
`;
*/


export const indexTextImageComp = css`

  border: 2px solid green;
  display: grid;
  grid-template-columns: 3fr 2fr;
  margin-top: 64px;
  margin-bottom: 56px;
  gap: 2rem;

  > div:first-of-type{
    height: 100%;
  }

  > div:nth-of-type(2){
    display: grid;
    gap: 2rem;
    grid-template-columns: 1fr 1fr;

    }

  @media screen and (max-width: 1024px){
    grid-template-columns: 1fr;
  > div:first-of-type{
    height: 40rem;
  }

  > div:nth-of-type(2){
    grid-template-columns: repeat(3, 1fr)
    }
  }

  @media screen and (max-width: 768px){
    grid-template-columns: 1fr;

  > div:nth-of-type(2){
    grid-template-columns: repeat(2, 1fr)
    }
  }

`;


export const separator = css`
 background-color: #224229;
  height: 5px;
  margin-bottom: 0!important;
  margin-top: 0!important;
  opacity: 1;
  padding: 0!important;

  margin: 0 64px;
  width: calc(100% - 280px);

`;





/* *************************** */
/*         Products.js         */
/* *************************** */


export const productsComponentStyle  = (theme) => css`
  gap: 48px;
  padding: 0 48px;
 margin-top: 10rem;
  margin-bottom: 10rem;



  h2 {
    //text-align: center;
    font-size: ${theme.typography.large};
    margin-top: 5.5rem;
    margin-bottom: 3.5rem;
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
  border: 1px solid green;

 div{
  width: 100%;
 }

  div:first-of-type {
    height: auto;
    position: relative;


      span {
        position: absolute;
        display: block;
        //background-color: #37798D;
        background-color: #009A7B;
        color: #fff;
        width: 70%;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        top: 30px;

        @media (max-width: 800px){
        font-size: 18px;
        }
      }
    }


  a {
    text-decoration: none;
  }


    h3 {
    font-size: 18px;
    margin: .5rem 0;

   }


  @media (max-width: 1024px) {

  }

 /*  @media screen and (max-width: 768px) {

    //gap: 3px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    //grid-template-columns: repeat(auto-fill, 1fr);
    //grid-template-rows:1fr 1fr;
    grid-gap:32px ;

    section {
      width: 100vw;
    }

  } */



  `;
/* *************************** */
/*  Single Product Page        */
/* *************************** */

export const singleProductPageStyle = css`
 display: grid;
 grid-template-columns: minmax(0, 150px) 2fr;
  max-width: 1000px;
  margin-top: 10rem;
  margin-bottom: 10rem;


  > div:first-of-type {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: space-between;
  }

  div:nth-of-type(2) {
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

export const shoppingCartSectionHeader = css`
margin-top: 5rem;
margin-bottom: 5rem;
text-align: left;

`;


export const shoppingCartStyle = css`
  display: grid;
  gap: 60px;
  grid-template-columns: 2fr 1fr;
  background-color: #f8f8f8;



  article:first-of-type {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    margin-top: 1rem;
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
        "area1 ."
        "area2  area4"
        "area3  ." ;

        div:first-of-type {
          grid-area: area1;
          margin-left: unset;
        }

        div:nth-of-type(2){
          grid-area: area2;
          select {
            height: 2.47rem;
            padding: 0.75rem 0.5rem 0.75rem 0.75rem;
            text-align: center;
            width: 8.825rem;
            height: 3rem;

          }
        }

        div:nth-of-type(3){
          grid-area: area4;
        }

        button {
          all: unset;
          grid-area: area3;
          color: gray
        }


      }

    }
  }

  article:nth-of-type(2) {
    display: flex;
    align-items: center;
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
       p{
        margin-top: .5rem;
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

export const deliveryInfos = (theme) => css`
  //height: 400px;
  //background-color: #DFDFDB;
  //background-color: #009a7b;
  background-color: rgba(0, 154, 123, .1);

  color: #000;

 // justify-content: center;

  font-size: ${theme.typography.large};
  //margin: 2rem 0;
  max-width: unset;
  width: 100%;
  //background-color: rgb(249,248,247);
  padding: 50px;

  > div {
    width: 1400px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    justify-content: start;
    gap: 3rem;
    margin: 0 auto;
    //border: 1px solid green;
    padding-left: 10px;

    article {
    width: 180px;
    height: 180px;
    background-color: lightgrey;
    border-radius: 50%;
  }


  }




`;

/* *************************** */
/*    BurgerMenue.js       */
/* *************************** */
/* export const burgerMenue = css`
position: absolute;
right: 0;
top: 100px;
z-index: 1 ;
height: 100vh;
width: 80%;
background-color: rgb(249,248,247);
display: none;

@media (max-width: 768px) {
  display: block;

}

`; */