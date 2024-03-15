type Props = {
  quantity: number;
  increment: () => void;
  decrement: () => void;
};

export default function ChangeCartQuantity(props: Props) {
  return (
    <div>
      <div>
        <button onClick={props.decrement} type="button">
          {' '}
          -{' '}
        </button>
        <span>{props.quantity}</span>
        <button onClick={props.increment} type="button">
          {' '}
          +{' '}
        </button>
      </div>
    </div>
  );
}
