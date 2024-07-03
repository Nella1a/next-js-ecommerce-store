import { getCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prisma';
import { firebaseAdmin } from '../../util/firebase-admin-config';

export type AddToCartResponseBody =
  | { error: { message: string } }
  | { id: number; quantity: number }
  | undefined;

export default async function addToCartHandler(
  req: NextApiRequest,
  res: NextApiResponse<AddToCartResponseBody>,
) {
  if (req.method === 'POST') {
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

      const itemInCart = req.body;

      // check if product already in cart
      const cartItems = await prisma.cartItem.findMany({
        where: { user_id: user.id, product_id: itemInCart.id },
      });

      if (cartItems.length > 0) {
        // update quantity
        // todo: add try{}catch()?
        const itemUpdatedQuantity = await prisma.cartItem.update({
          where: {
            id: cartItems[0].id,
          },
          data: {
            quantity: cartItems[0].quantity + itemInCart.quantity,
          },
        });

        if (itemUpdatedQuantity) {
          return res.status(200).json({
            id: itemUpdatedQuantity.id,
            quantity: itemUpdatedQuantity.quantity,
          });
        } else
          return res
            .status(500)
            .json({
              error: {
                message: 'Oops, something went wrong while updating the cart',
              },
            });
      } else {
        // add new item
        const newCartItem = await prisma.cartItem.create({
          data: {
            product_id: itemInCart.id,
            quantity: itemInCart.quantity,
            user_id: user.id,
          },
        });

        if (newCartItem) {
          return res
            .status(200)
            .json({ id: newCartItem.id, quantity: newCartItem.quantity });
        } else {
          return res
            .status(500)
            .json({
              error: {
                message: 'Oops, something went wrong while updating the cart',
              },
            });
        }
      }
    } else {
      res.status(401).json({
        error: { message: 'Unauthorized' },
      });
    }
  } else {
    res.status(405).json({
      error: { message: 'Method not supported, try POST instead' },
    });
  }
}
