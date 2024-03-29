type Plants = {
  id: number;
  title: string;
  price: number;
};

export interface PlantsTwo {
  id: number;
  title: string;
  price: number;
  descr: string;
}

export type Plant = {
  id: number;
  title: string;
  price: number;
  descr: string;
  slug: string;
};

export interface Cookie {
  id: number;
  quantity: number;
}

export interface Cart {
  id: number;
  quantity: number;
  price: number;
  title: string;
}

export interface PlantsAndDescription extends Plants {
  descr: string;
}

// actually same as CART
export interface PlantsAndQuantity {
  quantity: number;
  id: number;
  title: string;
  price: number;
  descr?: string;
  slug?: string;
}

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
