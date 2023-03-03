import Cookies from 'js-cookie';
import { CartCookieTwo } from '../pages/types';

// read cookie
export function getParsedCookie(key: string):{plantId:number,quantity:number}[] | undefined {
   const currentCookie = Cookies.get(key);
   if(currentCookie !== undefined){
    return JSON.parse(currentCookie)
   }
    return undefined;

}

// set cookie
export function setParsedCookie(key:string, value: CartCookieTwo[]) {
  Cookies.set(key, JSON.stringify(value));
}

// delete cookie
export function deleteCookie(key: string) {
  Cookies.remove(key);
}

export function stringifyCookieValue(value:{plantId:number, quantity: number}) {
  return JSON.stringify(value);
}
