import { Decimal } from '@prisma/client/runtime/library.js';

export type Plant = {
  id: number;
  title: string;
  price: Decimal;
  descr: string;
  slug: string;
};

export const cleanedProducts = (products: Plant[]) =>
  products.map((product) => ({
    ...product,
    // solves error: object Decimal cannot be serialized as JSON
    price: product.price.toNumber(),
  }));
