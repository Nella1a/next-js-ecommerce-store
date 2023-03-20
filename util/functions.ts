import { CartCookieTwo } from '../pages/types';
import { setParsedCookie } from './cookies';

// calculates subtotal price
export function multiplePriceAndQuantity(price: number, quantity: number) {
  return price * quantity;
}

// calculates total price
export function cartTotalPrice(totalPrice: number[]) {
  if (typeof totalPrice !== 'object') {
    throw new Error('parameter is not an array');
  }
  const sum = totalPrice.reduce((a, b) => a + b, 0);

  if (typeof sum !== 'number') {
    throw new Error('elements of array must be numbers');
  } else {
    return totalPrice.reduce((a, b) => a + b, 0);
  }
}

// add and update quantity in cookie
export function addAndUpdateQuantityInCookie(
  PlantId: number,
  NewPlantQuantity: number,
  cartCookie: CartCookieTwo[] | undefined,
  singlePlant: boolean = true,
): { plantId: number; quantity: number }[] {
  /* new quantity and id of item to set in cart cookie  */

  let newCookie;

  // check if a cookie is set
  if (cartCookie?.length) {
    console.log('cartCookie 1', cartCookie);

    // check if plant is aready in cart
    const checkifPlantIsAlreadyInCart = cartCookie.some(
      (element) => element.plantId === PlantId,
    );

    // if plant is aready in cart update quantity of plant; else: add new plant to cookie
    if (checkifPlantIsAlreadyInCart) {
      console.log('SinglePlant: ', singlePlant);
      const newCartCookie = cartCookie.map((element) => {
        if (element.plantId === PlantId) {
          element.quantity = singlePlant
            ? element.quantity + NewPlantQuantity
            : NewPlantQuantity;
        }

        return element;
      });
      console.log('NewCookie: ', newCartCookie);
      return [...newCartCookie];
    } else {
      return [...cartCookie, { plantId: PlantId, quantity: NewPlantQuantity }];
    }
  } else {
    const value: CartCookieTwo[] = [];
    value.push({
      plantId: PlantId,
      quantity: NewPlantQuantity,
    });

    setParsedCookie('cart', value);
    return value;
  }
}
