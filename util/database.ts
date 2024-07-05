import { Decimal } from '@prisma/client/runtime/library.js';
import prisma from '../prisma';
import { Cookie, User } from './types';

export type PlantWithPriceDecimal = {
  id: number;
  title: string;
  price: Decimal;
  descr: string;
  slug: string;
  img_url: { url: string | null }[];
};

export const getUsersOrderHistory = async (userId: number) =>
  await prisma.orderItem.findMany({
    orderBy: [{ order_id: 'desc' }],
    where: {
      order: {
        user_id: userId,
      },
    },
    include: {
      product: {
        select: {
          title: true,
        },
      },

      order: {
        select: {
          id: true,
          created_at: true,
          total_price: true,
          order_status: {
            select: {
              name: true,
            },
          },
          payment: {
            select: {
              id: true,
              status: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    },
  });

export const updateCartItems = async (cartItems: Cookie[], user: User) => {
  if (cartItems?.length > 0) {
    // remove current cart items
    await prisma.cartItem.deleteMany({
      where: {
        user_id: user.id,
      },
    });
    // add new items
    cartItems.map(async (item: Cookie) => {
      await prisma.cartItem.create({
        data: {
          product_id: item.id,
          quantity: item.quantity,
          user_id: user.id,
        },
      });
    });
  }
};

export const getAllProducts = async () => {
  const plants = await prisma.product.findMany({
    include: {
      img_url: {
        select: {
          url: true,
        },
      },
    },
  });

  // serialize price
  const formattedPlants = plants.map((plant) => {
    return {
      ...plant,
      price: plant.price.toNumber(),
    };
  });

  return formattedPlants;
};

export const getPlantsById = async (plantId: number[]) => {
  const plants = await prisma.product.findMany({
    where: {
      id: {
        in: plantId,
      },
    },
    include: {
      img_url: {
        select: {
          url: true,
        },
      },
    },
  });

  // serialize price
  const formattedPlants = plants.map((plant) => {
    return {
      ...plant,
      price: plant.price.toNumber(),
    };
  });

  return formattedPlants;
};
