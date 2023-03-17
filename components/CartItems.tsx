import { Dispatch, SetStateAction, useState } from 'react';
import { PlantsAndQuantity } from '../pages/types';
import { getParsedCookie, setParsedCookie } from '../util/cookies';
import {
  addAndUpdateQuantityInCookie,
  multiplePriceAndQuantity,
} from '../util/functions';
import CartItem from './CartItem';
import { plantName } from './elements';

type Props = {
  cartProducts: PlantsAndQuantity[];
  setCartProducts: Dispatch<SetStateAction<PlantsAndQuantity[]>>;
};

export default function CartItems({ cartProducts, setCartProducts }: Props) {
  const [options] = useState(
    Array.from({ length: 10 }, (_, i) => i + 1).map((i) => ({
      value: i.toString(),
      text: i,
    })),
  );

  const updateCart = (plantId: number, newPlantQuantity: number = 0) => {
    const newCartQuantity = cartProducts.map((plant) => {
      if (plant.id === plantId) {
        plant.quantity = newPlantQuantity;
      }
      return plant;
    });
    setCartProducts(newCartQuantity);
  };

  const removePlantFromCart = (plantId: number) => {
    const updateCart = cartProducts.filter(
      (plant) => Number(plant.id) !== plantId,
    );
    setCartProducts(updateCart);
  };

  const updateCartAndCookie = (
    plantId: number,
    newPlantQuantity: number = 0,
  ) => {
    if (newPlantQuantity) {
      updateCart(plantId, newPlantQuantity);
    } else {
      removePlantFromCart(plantId);
    }

    const currentCookie = getParsedCookie('cart');

    if (currentCookie && plantId) {
      const newCookie = addAndUpdateQuantityInCookie(
        plantId,
        newPlantQuantity,
        currentCookie,
      );
      setParsedCookie('cart', newCookie);
    }

    // remove plant from cookie
    if (plantId && !newPlantQuantity) {
      const updateCookie =
        currentCookie?.filter((plant) => Number(plant.plantId) !== plantId) ??
        [];
      setParsedCookie('cart', updateCookie);
    }
  };

  return (
    <article>
      {cartProducts.map((plant) => {
        return (
          <div key={`cartItems_${plant.id}`}>
            <CartItem plant={plant} />
            <div>
              <div css={plantName}>{plant.name}</div>
              <div>
                <select
                  value={plant.quantity}
                  onChange={(e) =>
                    updateCartAndCookie(
                      Number(plant.id),
                      Number(e.target.value),
                    )
                  }
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                €
                {multiplePriceAndQuantity(
                  Number(plant.price),
                  Number(plant.quantity),
                ).toFixed(2)}
              </div>
              <button
                data-test-id="delete item from cart"
                onClick={() => updateCartAndCookie(plant.id)}
              >
                remove
              </button>
            </div>
          </div>
        );
      })}
    </article>
  );
}
