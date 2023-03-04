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

type CartCookie = {
  plantId: number;
  name: string;
  price?: number;
};

export interface CartCookieTwo {
  plantId: number;
  quantity: number;
}



export interface PlantsAndDescription extends Plants {
  description: string;
}

export interface PlantsAndQuantity {
  quantity?: number;
  id: number;
  name: string;
  price: number;
  description: string;

}

export interface PropsTypeGrayLayer {
  showGrayLayer: boolean;
  setShowGrayLayer: Dispatch<SetStateAction<boolean>>;
}


export interface PropsTypeChildrenLayer extends PropsTypeGrayLayer  {
  children?: React.ReactNode;
  bgImageHero?: any;
  buttonInHeroImage?: any;


};


export interface PropsLayoutCart extends PropsTypeGrayLayer  {
  children?: React.ReactNode;


};


export interface PropsTypePlantsCartCookieLayer extends PropsTypeGrayLayer {
  plants: Plants[];
  cartCookies: CartCookie[];
};

export interface PropsTypePlantsLayer extends PropsTypeGrayLayer {
  plants: Plants[];
};

export interface PropsTypePlantsCartCookieLayerPlantId extends PropsTypeGrayLayer {
  // plantID: number;
  plant: PlantsAndDescription;
  cartCookie: {plantId: number, quantity: number}[];
};
