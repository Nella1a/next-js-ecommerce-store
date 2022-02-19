import Cookies from 'js-cookie';

// read cookie
export function getParsedCookie(key) {
  try {
    return JSON.parse(Cookies.get(key));
  } catch (err) {
    return undefined;
  }
}

// set cookie
export function setParsedCookie(key, value) {
  Cookies.set(key, JSON.stringify(value));
}

// delete cookie
export function deleteCookie(key) {
  Cookies.remove(key);
}

export function stringifyCookieValue(value) {
  return JSON.stringify(value);
}
