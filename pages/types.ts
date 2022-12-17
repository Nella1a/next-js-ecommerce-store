import { Dispatch, SetStateAction } from 'react';

type Plants = {
  id: number;
  name: string;
  price: number;
};

type CartCookie = {
  plantId: number;
  name: string;
  price?: number;
};

export interface PropsTypeGrayLayer {

  showGrayLayer: boolean;
  setShowGrayLayer: Dispatch<SetStateAction<boolean>>;
}

export interface PropsTypePlantsCartCookieLayer extends PropsTypeGrayLayer {
  plants: Plants[];
  cartCookies: CartCookie[];
};

export interface PropsTypePlantsLayer extends PropsTypeGrayLayer {
  plants: Plants[];
};
