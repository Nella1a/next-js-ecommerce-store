import { getCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma';
import { firebaseAdmin } from '../../../util/firebase-admin-config';
import { Cookie } from '../../../util/types';
import { ErrorAPI } from '../register';

export type DeleteItemFromCartResponseBody =
  | { errors: { message: string } }
  | { success: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DeleteItemFromCartResponseBody | ErrorAPI>,
) {
  if (req.method === 'DELETE') {
    console.log('--------> IN DELETE <---------');

    const accessToken = getCookie('accessToken', { req, res });

    if (accessToken) {
      // const tokenId = authorization.split('Bearer ')[1];
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
      const productId: number = JSON.parse(req.body.product);

      if (productId) {
        // get id
        const productToDelete = await prisma.cartItem.findFirst({
          where: {
            user_id: user.id,
            product_id: productId,
          },
        });

        if (productToDelete?.id) {
          const result = await prisma.cartItem.delete({
            where: {
              id: productToDelete.id,
            },
          });

          if (result) {
            res.status(200).json({
              success: 'okay',
            });
          }
        }
      }
    } else {
      res.status(401).json({
        errors: { message: 'Unauthorized' },
      });
    }
  } else {
    res.status(405).json({
      errors: { message: 'Method not supported' },
    });
  }
}
