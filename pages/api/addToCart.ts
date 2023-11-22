import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';

export type AddToCartResponseBody =
  | { errors: { message: string } }
  | { cart: { id: number; quantity: number }[] | undefined };

const secret = process.env.NEXTAUTH_SECRET;
const maxAge = '60 * 60 * 24 * 30';
const encryption = true;

export default async function addToCartHandler(
  req: NextApiRequest,
  resp: NextApiResponse<AddToCartResponseBody>,
) {
  if (req.method !== 'POST') {
    resp.status(405).json({
      errors: { message: 'Method not supported, try POST instead' },
    });
  }

  console.log('--------> in ADD TO CART <----------');
  // check if user is logged in
  const session = await getServerSession(req, resp, authOptions);
  if (session) {
    const cookieName = 'next-auth.session-token';
    const secureCookie = 'cart';
    const token = await getToken({ req, secret, cookieName });

    console.log('--------> token: ', token);
    console.log('--------> session: ', session);

    resp.status(200).json({ cart: [{ id: 4, quantity: 3 }] });
    return;
  } else {
    resp.status(401).json({
      errors: { message: 'Please log in' },
    });
  }
}
