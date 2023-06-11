import { Dispatch, SetStateAction, useContext } from 'react';
import { PlantsAndQuantity } from '../../../pages/types';
import { CartContext } from '../../../util/context/cartContext';
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
