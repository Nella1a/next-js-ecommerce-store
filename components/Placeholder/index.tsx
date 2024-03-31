import { css } from '@emotion/react';
import Head from 'next/head';
import ButtonCallToAction from '../Buttons/ButtonCallToAction';
import { container } from '../elements';
import LayoutNoHeader from '../Layout/LayoutNoHeader';

export const underConstruction = css`
  ${container};
  margin-top: 8rem;
  //border: 1px solid red;

  article {
    height: 30vh;
    h1 {
      // border: 1px solid red;
      text-align: center;
    }

    margin: 5rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 0.5rem;

    //border: 2px solid red;

    a {
      display: block;
      width: 17.65rem;
      height: 1.47rem;
      text-align: center;
      font-size: 1rem;
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

export default function Placeholder() {
  return (
    <LayoutNoHeader>
      <Head>
        <title>Shopping Cart Items</title>
        <meta name="description" content="Your Shopping Cart" />
      </Head>
      <section css={underConstruction}>
        <article>
          <h1> Your cart is currently empty.</h1>
          <ButtonCallToAction innerText="Continue Shopping" />
        </article>
      </section>
    </LayoutNoHeader>
  );
}
