import Cookies from 'js-cookie';
import { Cookie } from './types';

// read cookie
export function getParsedCookie(
  key: string,
): { plantId: number; quantity: number }[] | [] {
  const currentCookie = Cookies.get(key);
  if (currentCookie?.length) {
    return JSON.parse(currentCookie);
  }
  return [];
}

// set cookie
export function setParsedCookie(key: string, value: Cookie[]) {
  Cookies.set(key, JSON.stringify(value));
}

// delete cookie
export function deleteCookie(key: string) {
  Cookies.remove(key);
}
