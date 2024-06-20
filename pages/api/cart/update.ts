import { getCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma';
import { firebaseAdmin } from '../../../util/firebase-admin-config';
import { Cookie } from '../../../util/types';
import { ErrorAPI } from '../register';

type ResponseData =
  | {
      product_id: number;
      quantity: number;
    }[]
  | { errors: { message: string } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ErrorAPI>,
) {
  if (req.method === 'PUT') {
    const accessToken = getCookie('accessToken', { req, res });

    if (accessToken) {
      const decodedToken = await firebaseAdmin
        .auth()
        .verifyIdToken(accessToken);

      // get user
      const user = await prisma.user.findUnique({
        where: {
          user_id_external: decodedToken.uid,
        },
        select: {
          id: true,
          email: true,
          username: true,
        },
      });

      if (!user) {
        res.status(401).json({ error: { message: 'Unauthorized' } });
        return;
      }

      // update cart items
      const cartItems = req.body.cart;
      if (cartItems?.length > 0) {
        // remove current cart items
        await prisma.cartItem.deleteMany({
          where: {
            user_id: user.id,
          },
        });
        // update cart items
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

      const newCart = await prisma.cartItem.findMany({
        where: {
          user_id: user.id,
        },
        select: {
          product_id: true,
          quantity: true,
        },
      });

      res.status(200).json(newCart);
      return;
    } else {
      res.status(401).json({
        errors: { message: 'Unauthorized' },
      });
    }
  } else {
    return res.status(405).json({
      error: { message: 'Method not supported' },
    });
  }
}
