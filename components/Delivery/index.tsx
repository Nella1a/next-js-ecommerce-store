import { css } from '@emotion/react';
import { marginTop } from '../elements';
import ShieldChecked from '../Icons/ShieldChecked';
import StarIcon from '../Icons/StarIcon';
import Truck from '../Icons/Truck';

export const deliveryInfos = css`
  ${marginTop}

  background-color:  var(--color-primary-green);
  color: var(--color-white);
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

      > div {
        border: 1px solid var(--color-white);
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;

        > span {
          display: block;
          height: 50%;
          width: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
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
          <div>
            <span>
              <Truck />
            </span>
          </div>
          <p>Free Shipping</p>
        </article>
        <article>
          <div>
            <span>
              <ShieldChecked />
            </span>
          </div>
          <p>30 Day Guarantee</p>
        </article>
        <article>
          <div>
            <span>
              <StarIcon />
            </span>
          </div>
          <p>Best Quality</p>
        </article>
      </div>
    </section>
  );
}
