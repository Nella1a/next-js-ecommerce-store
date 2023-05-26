import { Dispatch, SetStateAction } from 'react';

type Plants = {
  id: number;
  name: string;
  price: number;
};

export interface PlantsTwo {
  id: number;
  name: string;
  price: number;
  description: string;
}

export type Plant = {
  id: number;
  name: string;
  price: number;
  description: string;
  slugName?: string;
};

export interface Cookie {
  id: number;
  quantity: number;
}

export interface Cart {
  id: number;
  quantity: number;
  price: number;
  name: string;
}

export interface PlantsAndDescription extends Plants {
  description: string;
}

// actually same as CART
export interface PlantsAndQuantity {
  quantity: number;
  id: number;
  name: string;
  price: number;
  description?: string;
  slugName?: string;
}

// export interface PropsTypeGrayLayer {
//   showGrayLayer: boolean;
//   setShowGrayLayer: Dispatch<SetStateAction<boolean>>;
// }

export interface PropsTypeChildrenLayer {
  children?: React.ReactNode;
  bgImageHero?: any;
  buttonInHeroImage?: any;
}

export interface PropsLayoutCart {
  children?: React.ReactNode;
}

export interface PropsTypePlantsCartCookieLayer {
  plants: Plant[];
  cartCookies: Plant[];
}

export interface PropsTypePlantsLayer {
  plants: Plant[];
}

export interface PropsTypePlantsCartCookieLayerPlantId {
  plant: Plant;
  cartCookie: Cookie[];
}
