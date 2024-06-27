import { Decimal } from '@prisma/client/runtime/library';

export type Plant = {
  id: number;
  title: string;
  price: number;
  descr: string;
  slug: string;
  img_url: { url: string | null }[];
};

export interface Cookie {
  id: number;
  quantity: number;
}

export interface Cart extends Cookie {
  price: number;
  title: string;
}

export interface PlantsAndQuantity extends Plant {
  quantity: number;
}

export interface PropsTypeChildrenLayer {
  children?: React.ReactNode;
  imgUrl?: any;
  buttonInHeroImage?: any;
}

export interface PropsTypePlantsCartCookieLayer {
  plants: Plant[];
  cartCookies: Plant[];
}

export type User = {
  id: number;
  email: string;
  username: string;
};

export type ProductImageDetails = {
  title?: string;
  src: string | null;
};
