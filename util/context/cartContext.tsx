import { createContext, useEffect, useState } from 'react';
import { Plant } from '../types';

const checkIfProductIsAlreadyInCart = (
  cartItems: Plant[],
  productId: number,
) => {
  return cartItems.findIndex((product) => product.id === productId);
};

const updateProductQuantity = (
  cartItems: Plant[],
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
      if (product.id === productId && product.quantity) {
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
  cartItems: Plant[],
  productId: number,
  quantity: number,
  price: number,
  title: string,
  img_url: { url: string | null }[],
  slug: string,
) => {
  cartItems.push({
    id: productId,
    title: title,
    price: price,
    slug: slug,
    img_url: img_url,
    quantity: quantity,
  });
  return cartItems;
};

const clearProduct = (currentCookie: Plant[], removeProductId: number) => {
  return currentCookie.filter((product) => product.id !== removeProductId);
};

/* ++++++++++++++++++++++ */
export const CartContext = createContext({
  currentCartItems: [
    {
      id: 0,
      title: '',
      price: 0,
      slug: '',
      img_url: [] as { url: string | null }[],
      // quantity: 0,
    },
  ],
  updateCart: (
    id: number,
    title: string,
    price: number,
    slug: string,
    img_url: { url: string | null }[],
    quantity: number,
    decrementFlag: boolean = false,
  ) => {},
  cartItems: (cartItems: Plant[]) => {},
  totalPrice: 0,
  updateCartProduct: (
    id: number,
    quantity: number,
    decrementFlag: boolean,
  ) => {},
  deleteProductFromCart: (removeProductId: number) => {},
  toggleMenu: false,
  toggleMobileMenu: () => {},
});

export const CartContextProvider = ({ children }: any) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [currentCartItems, setCurrentCartItems] = useState<Plant[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const cartItems = (cartItems: Plant[]) => {
    setCurrentCartItems(cartItems);
  };

  useEffect(() => {
    const sum = currentCartItems.reduce((total, product) => {
      if (product.quantity) {
        return total + product.quantity * product.price;
      }
      return total;
    }, 0);
    setTotalPrice(Number(sum.toFixed(2)));
  }, [currentCartItems]);

  const updateCart = (
    id: number,
    title: string,
    price: number,
    slug: string,
    img_url: { url: string | null }[],
    quantity: number,
    decrementFlag = false,
  ) => {
    let updatedCartItems: Plant[] = [];
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
        title,
        img_url,
        slug,
      );
    }
    setCurrentCartItems(updatedCartItems);
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
    setCurrentCartItems(updatedCartItems);
  };

  // clear product from cookie
  const deleteProductFromCart = (removeProductId: number) => {
    const newCart = clearProduct(currentCartItems, removeProductId);
    setCurrentCartItems(newCart);
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
