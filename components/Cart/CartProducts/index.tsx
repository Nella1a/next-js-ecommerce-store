import { Dispatch, SetStateAction, useContext } from 'react';
import { CartContext } from '../../../util/context/cartContext';
import { PlantsAndQuantity } from '../../../util/types';
import CartProductCard from '../CartProductCard';

type Props = {
  setCartProducts: Dispatch<SetStateAction<PlantsAndQuantity[]>>;
};

export default function CartProducts() {
  const { currentCartItems } = useContext(CartContext);

  return (
    <article>
      {currentCartItems.map((plant) => (
        <div key={`cartItems_${plant.id}`}>
          <CartProductCard plant={plant} />
        </div>
      ))}
    </article>
  );
}
