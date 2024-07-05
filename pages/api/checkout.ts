import { Prisma, PrismaClient } from '@prisma/client';
import { getCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prisma';
import { getUsersOrderHistory } from '../../util/database';
import { firebaseAdmin } from '../../util/firebase-admin-config';
import { ErrorAPI } from './register';

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

      // form data:
      const contactDetails = req.body.form;

      const contactInfos = contactDetails.shipping;
      //toDo form shipping validation
      const paymentInfos = contactDetails.payment;
      //toDo form payment validation

      // create payment id:
      const openPayment = await prisma.orderPayments.create({
        data: {
          status_id: 1,
        },
      });

      // get cart items
      const cartItems = await prisma.cartItem.findMany({
        where: { user_id: user.id },
        select: {
          product_id: true,
          quantity: true,
          product: {
            select: {
              price: true,
            },
          },
        },
      });

      // calculate total price
      const cartQuantityAndPrice = cartItems.map((items) => {
        return { ...items, p: items.quantity * Number(items.product.price) };
      });

      const totalPrice = cartQuantityAndPrice.reduce(
        (accumulator, currentValue) => accumulator + currentValue.p,
        0,
      );

      // create new order
      const newOrder = await prisma.order.create({
        data: {
          total_price: new Prisma.Decimal(totalPrice),
          status_id: 1,
          user_id: user.id,
          payment_id: openPayment.id,
        },
      });

      // add items to user order
      cartItems.map(async (item) => {
        await prisma.orderItem.create({
          data: {
            quantity: item.quantity,
            product_id: item.product_id,
            order_id: newOrder.id,
          },
        });
      });

      // delete items from user cart
      await prisma.cartItem.deleteMany({
        where: {
          user_id: user.id,
        },
      });

      getUsersOrderHistory(user.id)
        .then((orders) => {
          res.status(200).json(orders);
          return;
        })
        .catch((error) => {
          res.status(500).json({ error: { message: 'Internal Server Error' } });
        });
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
