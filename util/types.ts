export type Plant = {
  id: number;
  title: string;
  price: number;
  descr?: string;
  slug: string;
  img_url: { url: string | null }[];
  quantity: number;
};

export interface Cookie {
  id: number;
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
