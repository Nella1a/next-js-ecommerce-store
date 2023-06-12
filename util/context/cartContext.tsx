import { createContext, useEffect, useReducer, useState } from 'react';
import { Cart } from '../../pages/types';

type UpdateCart = {
  id: number;
  price: number;
  quantity: number;
  name: string;
  decrementFlag?: boolean;
};

const checkIfProductIsAlreadyInCart = (
  cartItems: Cart[],
  productId: number,
) => {
  return cartItems.findIndex((product) => product.id === productId);
};

const updateProductQuantity = (
  cartItems: Cart[],
  productId: number,
  quantity: number,
  decrementFlag: boolean,
) => {
  // find the cartItem to be updated
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productId,
  );

  // if quantity is equal to 1, clear product from cart
  if (existingCartItem && decrementFlag && existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productId);
  } else {
    const newCookie = cartItems?.map((product) => {
      // find product and update quantity
      if (product.id === productId) {
        product.quantity = decrementFlag
          ? product.quantity - quantity
          : product.quantity + quantity;
      }
      return product;
    });
    return newCookie;
  }
};

const addNewProductToCart = (
  cartItems: Cart[],
  productId: number,
  quantity: number,
  price: number,
  name: string,
) => {
  return [
    ...cartItems,
    { id: productId, quantity: quantity, price: price, name: name },
  ];
};

const clearProduct = (currentCookie: Cart[], removeProductId: number) => {
  return currentCookie.filter((product) => product.id !== removeProductId);
};

/* ++++++++++++++++++++++ */
export const CartContext = createContext({
  currentCartItems: [
    {
      id: 0,
      quantity: 0,
      price: 0,
      name: '',
    },
  ],
  updateCart: (
    id: number,
    price: number,
    quantity: number,
    name: string,
    decrementFlag: boolean = false,
  ) => {},
  cartItems: (cartItems: Cart[]) => {},
  totalPrice: 0,
  updateCartProduct: (
    id: number,
    quantity: number,
    decrementFlag: boolean,
  ) => {},
  deleteProductFromCart: (emoveProductId: number) => {},
  toggleMenu: false,
  toggleMobileMenu: () => {},
});

export const CartContextProvider = ({ children }: any) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [currentCartItems, setCurrentCartItems] = useState<Cart[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const cartItems = (cartItems: Cart[]) => {
    setCurrentCartItems([...cartItems]);
  };

  useEffect(() => {
    const sum = currentCartItems.reduce(
      (total, product) => total + product.quantity * product.price,
      0,
    );
    setTotalPrice(Number(sum.toFixed(2)));
  }, [currentCartItems]);

  const updateCart = (
    id: number,
    price: number,
    quantity: number,
    name: string,
    decrementFlag = false,
  ) => {
    let updatedCartItems: Cart[] = [];
    if (checkIfProductIsAlreadyInCart(currentCartItems, id) != -1) {
      updatedCartItems = updateProductQuantity(
        currentCartItems,
        id,
        quantity,
        decrementFlag,
      );
    } else {
      updatedCartItems = addNewProductToCart(
        currentCartItems,
        id,
        quantity,
        price,
        name,
      );
    }
    setCurrentCartItems([...updatedCartItems]);
  };

  const updateCartProduct = (
    id: number,
    quantity: number,
    decrementFlag: boolean = false,
  ) => {
    const updatedCartItems = updateProductQuantity(
      currentCartItems,
      id,
      quantity,
      decrementFlag,
    );
    setCurrentCartItems([...updatedCartItems]);
  };

  // clear product from cookie
  const deleteProductFromCart = (removeProductId: number) => {
    const newCart = clearProduct(currentCartItems, removeProductId);
    setCurrentCartItems([...newCart]);
  };

  const toggleMobileMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  const value = {
    currentCartItems,
    updateCart,
    cartItems,
    updateCartProduct,
    totalPrice,
    deleteProductFromCart,
    toggleMenu,
    toggleMobileMenu,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
