type Props = {
  quantity: number;
  increment: () => void;
  decrement: () => void;
};

export default function ChangeCartQuantity(props: Props) {
  return (
    <div>
      <div style={{ display: 'flex', gap: '.8rem' }}>
        <button onClick={props.increment} type="button">
          {' '}
          +{' '}
        </button>
        <div>{props.quantity}</div>
        <button onClick={props.decrement} type="button">
          {' '}
          -{' '}
        </button>
      </div>
    </div>
  );
}
