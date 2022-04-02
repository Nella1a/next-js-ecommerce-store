import { addAndUpdateQuantityInCookie } from '../functions';

// Unit: Test function for updating quantity in item of cookie (eg. adding an item to the cart that already exists)

test('change quantity of existing cookie item', () => {
  expect(
    addAndUpdateQuantityInCookie(3, 4, [
      { plantId: 8, quantity: 6 },
      { plantId: 7, quantity: 1 },
      { plantId: 3, quantity: 10 },
    ]),
  ).toStrictEqual([
    { plantId: 8, quantity: 6 },
    { plantId: 7, quantity: 1 },
    { plantId: 3, quantity: 14 },
  ]);
});

test('add quantity of new cookie(not existing) item', () => {
  expect(
    addAndUpdateQuantityInCookie(9, 4, [
      { plantId: 8, quantity: 6 },
      { plantId: 7, quantity: 1 },
      { plantId: 3, quantity: 14 },
    ]),
  ).toStrictEqual([
    { plantId: 8, quantity: 6 },
    { plantId: 7, quantity: 1 },
    { plantId: 3, quantity: 14 },
    { plantId: 9, quantity: 4 },
  ]);
});
