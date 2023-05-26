import Cookies from 'js-cookie';
import { createContext, useEffect, useState } from 'react';
import { Cookie } from '../../pages/types';

/***+++++++++++++++++++++ */

const checkIfCookieIsAlreadySet = (cookie: Cookie[]) => {
  return cookie.length ? true : false;
};

const checkIfProductIsAlreadyInCookie = (
  cookie: Cookie[],
  productId: number,
) => {
  return cookie.findIndex((product) => product.id === productId);
};

const updateProductQuantity = (
  cartItems: Cookie[],
  productId: number,
  quantity: number,
  decrementFlag: boolean,
) => {
  // find the cartItem to be updated
  const existingItemInCookie = cartItems.find(
    (cartItem) => cartItem.id === productId,
  );

  // if quantity is equal to 1, clear product from cookie
  if (
    existingItemInCookie &&
    decrementFlag &&
    existingItemInCookie.quantity === 1
  ) {
    return cartItems.filter((cartItem) => cartItem.id !== productId);
  } else {
    const newCookie = cartItems?.map((product) => {
      if (product.id === productId) {
        // find product and update quantity
        product.quantity = decrementFlag
          ? product.quantity - quantity
          : product.quantity + quantity;
      }
      return product;
    });
    return newCookie;
  }
};

const addNewProductToCookie = (
  cartItems: Cookie[],
  productId: number,
  quantity: number,
) => {
  return [...cartItems, { id: productId, quantity: quantity }];
};

const clearProduct = (currentCookie: Cookie[], removeProductId: number) => {
  return currentCookie.filter((product) => product.id !== removeProductId);
};

/***+++++++++++++++++++++ */
export const CartCookieContext = createContext({
  getParsedCookie: (key: string) => {},
  setParsedCookie: (element: any) => {},
  deleteCookie: (key: string) => {},
  currentCookie: [
    {
      id: 0,
      quantity: 0,
    },
  ],
  updateCartQuantity: (
    id: number,
    quantity: number,
    decrementFlag: boolean = false,
  ) => {},
  cartCount: 0,
  deleteProductFromCookie: (product: number) => {},
});

export const CartCookieProvider = ({ children }: any) => {
  const [currentCookie, setCurrentCookie] = useState<Cookie[]>([]);
  const [cartCount, setCartcount] = useState(0);

  // get Cookie
  const getParsedCookie = (key: string): Cookie[] | [] => {
    const currentC = Cookies.get(key);
    if (currentC?.length) {
      setCurrentCookie(JSON.parse(currentC));
    }
    return [];
  };

  useEffect(() => {
    getParsedCookie('cart');
  }, []);

  // set Cookie
  const setParsedCookie = (elements: Cookie[]) => {
    if (elements && elements.length) {
      Cookies.set('cart', JSON.stringify(elements));
    } else {
      Cookies.set('cart', JSON.stringify([]));
    }
  };

  // delete cookie
  const deleteCookie = (key: string) => {
    Cookies.remove(key);
  };

  // update quantity
  const updateCartQuantity = (
    productId: number,
    quantity: number,
    decrementFlag: boolean = false,
  ) => {
    let updatedCookie: Cookie[] = [];
    if (!checkIfCookieIsAlreadySet(currentCookie)) {
      updatedCookie.push({
        id: productId,
        quantity: quantity,
      });
    } else if (
      checkIfProductIsAlreadyInCookie(currentCookie, productId) != -1
    ) {
      updatedCookie = updateProductQuantity(
        currentCookie,
        productId,
        quantity,
        decrementFlag,
      );
    } else {
      updatedCookie = addNewProductToCookie(currentCookie, productId, quantity);
    }

    setCurrentCookie([...updatedCookie]);
    setParsedCookie([...updatedCookie]);
  };

  // product count
  useEffect(() => {
    const sumOfProducts = currentCookie.reduce(
      (total, product) => total + product.quantity,
      0,
    );
    setCartcount(sumOfProducts);
  }, [currentCookie]);

  // clear product from cookie
  const deleteProductFromCookie = (removeProductId: number) => {
    const newCookie = clearProduct(currentCookie, removeProductId);
    setCurrentCookie([...newCookie]);
    setParsedCookie([...newCookie]);
  };

  const value = {
    currentCookie,
    cartCount,
    getParsedCookie,
    setParsedCookie,
    deleteCookie,
    updateCartQuantity,
    deleteProductFromCookie,
  };

  return (
    <CartCookieContext.Provider value={value}>
      {children}
    </CartCookieContext.Provider>
  );
};
