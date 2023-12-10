import cookie from 'cookie';
//import cookie from 'cookie';
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

export function createSerializedRegisterSessionTokenCookie(token: string) {
  // check if we are in production e.g. Heroku
  const isProduction = process.env.NODE_ENV === 'production';

  const maxAge = 60 * 10; // 10 minutes

  return cookie.serialize('sessionToken', token, {
    maxAge: maxAge,
    expires: new Date(Date.now() + maxAge * 1000),
    // only for use in development
    httpOnly: true,
    // set secure cookies on production (eg. Heroku)
    secure: isProduction,
    // cookie set in the root, thus set on all pages
    path: '/',
    // can be lax or strict, if strict cookie won't be send to third-party pages?
    sameSite: 'lax',
  });
}

// export const secureCookieOptions = {
//   httpOnly: true,
//   path: '/',
//   secure: process.env.NODE_ENV === 'production',
//   maxAge: 60 * 60 * 24,
//   sameSite: 'lax',
// } as const;
