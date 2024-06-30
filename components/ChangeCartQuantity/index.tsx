import { css } from '@emotion/react';

const changeCartQuantityButtons = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.8rem;

  > button {
    background-color: var(--color-grey-2);
    border-radius: 100rem;
    font-weight: 400;
    cursor: pointer;
    font-weight: bold;
    min-height: 2.5rem;
    padding: 0.625rem 1rem;
    border: none;
    color: var(--text-color);

    :hover {
      background-color: var(--color-grey-4);
    }
  }

  // quantity
  span {
    font-size: var(--text-md);
  }
`;

type UpdateQuantity = {
  quantity: number;
  increment: () => void;
  decrement: () => void;
};

export default function ChangeCartQuantity(props: UpdateQuantity) {
  return (
    <div>
      <div css={changeCartQuantityButtons}>
        <button onClick={props.decrement} type="button">
          {' '}
          -{' '}
        </button>
        <span data-test-id="add-quantity">{props.quantity}</span>
        <button onClick={props.increment} type="button">
          {' '}
          +{' '}
        </button>
      </div>
    </div>
  );
}
