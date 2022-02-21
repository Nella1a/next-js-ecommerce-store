// Unit: Test cart sum function
import { cartTotalPrice } from '../functions';

test('calculates the sum of elements (integer) in a given array ', () => {
  expect(cartTotalPrice([1, 3, 5, 8, 10])).toBe(27);
});

test('calculates the sum of elements (floating point) in a given array ', () => {
  expect(cartTotalPrice([17.95, 12.95, 53.9])).toBe(84.8);
});

test('throws on parameter not an array', () => {
  expect(() => cartTotalPrice('string')).toThrow();
});

test('throws on sum is not a number', () => {
  expect(() => cartTotalPrice(['string1', 'string2', 'string3'])).toThrow();
});
