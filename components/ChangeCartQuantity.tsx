type Props = {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

export default function ChangeCartQuantity(props: Props) {
  // update state variable: quantity
  const changeQuantity = (value: number) => {
    const newQuantity = value ? props.quantity + 1 : props.quantity - 1;
    newQuantity >= 1 && newQuantity <= 10 && props.setQuantity(newQuantity);
  };

  return (
    <div>
      <div>
        <button onClick={() => changeQuantity(1)} type="button">
          {' '}
          +{' '}
        </button>
        <div>{props.quantity}</div>
        <button onClick={() => changeQuantity(0)} type="button">
          {' '}
          -{' '}
        </button>
      </div>
    </div>
  );
}
