import { NextApiRequest, NextApiResponse } from 'next';

export type AddToCartResponseBody =
  | { errors: { message: string } }
  | { cart: { id: number; quantity: number }[] | undefined };

export default async function addToCartHandler(
  req: NextApiRequest,
  resp: NextApiResponse<AddToCartResponseBody>,
) {
  if (req.method !== 'POST') {
    resp.status(405).json({
      errors: { message: 'Method not supported, try POST instead' },
    });
  }
}
