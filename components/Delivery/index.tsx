import { css } from '@emotion/react';
import { marginTop } from '../elements';
import ShieldChecked from '../Icons/ShieldChecked';
import StarIcon from '../Icons/StarIcon';
import Truck from '../Icons/Truck';

export const deliveryInfos = css`
  margin-top: 6.25rem;
  background-color: var(--color-primary-green);
  color: var(--color-white);
  height: 12rem;
  max-width: unset;
  width: 100vw;
  display: flex;
  justify-content: center;

  > div {
    max-width: 1920px;
    width: 100%;
    height: inherit;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    align-content: center;

    > article {
      gap: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-size: var(--text-lg);

      > div {
        /* width: 2rem;
        height: 2rem; */
        width: 3.875rem;
        height: 3.875rem;
        border-radius: 50%;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.3);

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
  }

  @media screen and (max-width: 768px) {
    height: 28rem;
    > div {
      grid-template-columns: 1fr;
      gap: 2.5rem;
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
