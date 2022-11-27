/* +++++++ calculates subtotal price +++++++ */
export function multiplePriceAndQuantity(price, quantity) {
  return Number(price * quantity);
}

/* +++++++ calculates total price  +++++++ */
export function cartTotalPrice(totalPrice) {
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

/* +++++++ add and update quantity in cookie  ++++++ */
export function addAndUpdateQuantityInCookie(
  NewPlantId,
  NewPlantQuantity,
  cartCookie,
  add,

) {
  console.log('id & quantitit:', NewPlantId, NewPlantQuantity);
  console.log("CartCookieBE: ", cartCookie)
  /* new quantity and id of item to set in cart cookie  */
  const value = {
    plantID: NewPlantId,
    quantity: NewPlantQuantity,
  };

  let newCookie;

  // check if a cookie is set
  if (cartCookie !== '[]') {

    // check if plant is aready in cart
    const checkifPlantIsAlreadyInCart = cartCookie.some(
      (element) => element.plantId === NewPlantId,
    );

    // if plant is aready in cart update quantity of plant; else: add new plant to cookie
    if (checkifPlantIsAlreadyInCart) {
      const newCartCookie = cartCookie.map((element) => {

        if (element.plantId === NewPlantId ) {
              element.quantity = NewPlantQuantity;
        }
      if(element.plantId === NewPlantId & add) {
          element.quantity = element.quantity + NewPlantQuantity;
        }
        return element;
      });

      return (newCookie = [...newCartCookie]);
    } else {
      newCookie = [
        ...cartCookie,
        { plantId: NewPlantId, quantity: NewPlantQuantity },
      ];
      return newCookie;
    }
  } else {
    return (newCookie = value);
  }
}
