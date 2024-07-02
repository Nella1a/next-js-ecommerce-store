export type Plant = {
  id: number;
  title: string;
  price: number;
  descr?: string;
  slug: string;
  img_url: { url: string | null }[];
  quantity?: number;
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

export type SerializedOrders = {
  quantity: number;
  product_id: number;
  order_id: number;
  product: { [key: string]: string | number };
  order: Orders;
};

export type Orders = {
  order_id: number;
  created_at: string;
  total_price: string;
  order_status: { name: string };
  payment: { status: { name: string } };
  products: { [key: string]: string | number }[];
};

export type UserAccount = {
  email?: string;
  username?: string;
  orderCount?: number;
  orders?: Orders[];
  isLoggedIn: boolean;
};

export interface PropsLayoutCart {
  children?: React.ReactNode;
}

export type Error = {
  message: string | undefined;
};
