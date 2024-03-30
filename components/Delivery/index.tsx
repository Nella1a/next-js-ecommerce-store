import { css } from '@emotion/react';
import { marginTop } from '../elements';

export const deliveryInfos = css`
  ${marginTop}
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

export default function Delivery() {
  return (
    <section css={deliveryInfos}>
      <div>
        <article>
          <div></div>
          <p>Free Shipping</p>
        </article>
        <article>
          <div></div>
          <p>30 Day Guarantee</p>
        </article>
        <article>
          <div></div>
          <p>Best Quality</p>
        </article>
      </div>
    </section>
  );
}
