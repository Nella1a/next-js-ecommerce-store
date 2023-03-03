import { CartCookieTwo } from '../pages/types';

/* +++++++ calculates subtotal price +++++++ */
export function multiplePriceAndQuantity(price: number, quantity: number) {
  return price * quantity;
}

/* +++++++ calculates total price  +++++++ */
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

// type CartCookie = {
//   plantId: number | string;
//   quantity: number | string;
// }


/* +++++++ add and update quantity in cookie  ++++++ */
export function addAndUpdateQuantityInCookie(
  PlantId: number,
  NewPlantQuantity:number,
  cartCookie: CartCookieTwo[],
):{plantId: number, quantity: number}[] {


  /* new quantity and id of item to set in cart cookie  */
  const value: CartCookieTwo[] = [];
  value.push({
    plantId: PlantId,
    quantity: NewPlantQuantity,
  });



  let newCookie;

  // check if a cookie is set
  if (cartCookie.length !== 0) {
    console.log("typeof cartCookie: ", typeof cartCookie)
    console.log(cartCookie)

    // check if plant is aready in cart
    const checkifPlantIsAlreadyInCart = cartCookie.some(
      (element) => element.plantId === PlantId,
    );

    // if plant is aready in cart update quantity of plant; else: add new plant to cookie
    if (checkifPlantIsAlreadyInCart) {
      const newCartCookie = cartCookie.map((element) => {

        if (element.plantId === PlantId ) {
              element.quantity = NewPlantQuantity;
        }
      // if(element.plantId === PlantId) {
      //     element.quantity = element.quantity + NewPlantQuantity;
      //   }
        return element;
      });

      return (newCookie = [...newCartCookie]);
    } else {
      newCookie = [
        ...cartCookie,
        { plantId: PlantId, quantity: NewPlantQuantity },
      ];
      console.log("NEWCOOKIE:", newCookie)
      return newCookie;
    }
  } else {
   return value;

  }
}
