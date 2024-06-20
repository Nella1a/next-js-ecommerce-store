import { getCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prisma';
import { firebaseAdmin } from '../../util/firebase-admin-config';
import { Cookie } from '../../util/types';
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

      // update db:
      const openPayment = await prisma.orderPayments.create({
        data: {
          status_id: 1,
        },
      });

      // items
      const cartItems = await prisma.cartItem.findMany({
        where: { user_id: user.id },
        select: {
          product_id: true,
          quantity: true,
        },
      });

      let totalPrice = 0;
      cartItems.map(async (item) => {
        const price = await prisma.product.findUnique({
          where: {
            id: item.product_id,
          },
          select: {
            price: true,
          },
        });
        console.log('----,> Price: ', price);

        totalPrice = totalPrice * item.quantity + Number(price?.price);
        console.log('----,>total Price: ', totalPrice);
      });

      console.log('PRICE: ', totalPrice);
      const newOrder = await prisma.order.create({
        data: {
          total_price: totalPrice,
          status_id: 1,
          user_id: user.id,
          payment_id: openPayment.id,
        },
      });

      cartItems.map(async (item) => {
        const product = await prisma.product.findUnique({
          where: {
            id: item.product_id,
          },
          select: {
            id: true,
          },
        });

        if (product) {
          await prisma.orderItem.create({
            data: {
              quantity: item.quantity,
              product_id: product.id,
              order_id: newOrder.id,
            },
          });
        }
      });

      // delete cartItems:
      await prisma.cartItem.deleteMany({
        where: {
          user_id: user.id,
        },
      });

      const orderHistory = await prisma.orderItem.findMany({
        where: {
          order: {
            user_id: user.id,
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
              created_at: true,
              total_price: true,
              order_status: {
                select: {
                  name: true,
                },
              },
              payment: {
                include: {
                  status: true,
                },
              },
            },
          },
        },
      });

      console.log(
        '-xxxxx---> orderHistory: ',
        orderHistory[0].order.total_price,
      );
      res.status(200).json(orderHistory);
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
