import { css } from '@emotion/react';

type Props = {
  quantity: number;
  increment: () => void;
  decrement: () => void;
};

const buttonStyling = css`
  display: flex;
  align-items: center;

  gap: 1rem;
  span {
    font-weight: bold;
  }
  button {
    margin: unset;
    font-size: 14px;
    background-color: rgba(224, 224, 224);
    border: unset;
    :hover {
      background-color: rgba(237, 148, 59, 0.6);
    }
  }
`;

export default function ChangeCartQuantity(props: Props) {
  return (
    <div>
      <div css={buttonStyling}>
        <button onClick={props.increment} type="button">
          {' '}
          +{' '}
        </button>
        <span>{props.quantity}</span>
        <button onClick={props.decrement} type="button">
          {' '}
          -{' '}
        </button>
      </div>
    </div>
  );
}
