/* Info: for this to work we created a file "jest.config.mjs and changed
the testEnvironment to "jsdom"; See also jest documentation:
Jest ships with jsdom which simulates a DOM environment as if you were in the browser.
 */

// import { deleteCookie, getParsedCookie, setParsedCookie } from '../cookies';

// test('sets, gets and delete a cookie', () => {
//   const cookie = {
//     key: 'cart',
//     value: { plantId: 3, quantity: 4 },
//   };

//   expect(getParsedCookie(cookie.key)).toBe(undefined);
//   expect(setParsedCookie(cookie.key, cookie.value)).toBeUndefined();

//   // toStrictEqual is used because in JS {} !== {} || {} === {} --> false
//   expect(getParsedCookie(cookie.key)).toStrictEqual(cookie.value);
//   expect(deleteCookie(cookie.key)).toBe(undefined);
//   expect(getParsedCookie(cookie.key)).toBe(undefined);
// });
