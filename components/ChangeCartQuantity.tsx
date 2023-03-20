import { useState } from 'react';

type Props = {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

export default function ChangeCartQuantity(props: Props) {
  // update state variable: quantity
  console.log('FE quantitiy: ', props.quantity);
  const addQuantity = () => {
    props.setQuantity(props.quantity + 1);
  };

  const subQuantity = () => {
    props.setQuantity(props.quantity - 1);
  };

  return (
    <div>
      <div>
        <button onClick={addQuantity} type="button">
          {' '}
          +{' '}
        </button>
        <div>{props.quantity}</div>
        <button onClick={subQuantity} type="button">
          {' '}
          -{' '}
        </button>
      </div>
    </div>
  );
}
