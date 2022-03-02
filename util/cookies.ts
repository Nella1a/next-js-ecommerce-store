import Cookies from 'js-cookie';

type Value = {
  plantID: number;
  quantity: number;
};

// read cookie
export function getParsedCookie(key: string) {
  try {
    return JSON.parse(Cookies.get(key));
  } catch (err) {
    return undefined;
  }
}

// set cookie
export function setParsedCookie(key: string, value: Value) {
  Cookies.set(key, JSON.stringify(value));
}

// delete cookie
export function deleteCookie(key: string) {
  Cookies.remove(key);
}

export function stringifyCookieValue(value: Value) {
  return JSON.stringify(value);
}
