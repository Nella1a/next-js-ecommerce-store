import cookie from 'cookie';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prisma';
import { firebaseAdmin } from '../../util/firebase-admin-config';
import { ErrorAPI } from './register';

type ResponseData = {
  logout: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ErrorAPI>,
) {
  if (req.method === 'DELETE') {
    console.log('REQUEST DELETE', req.cookies);
    const token = req.cookies.accessToken;

    if (!token) {
      return res
        .status(401)
        .json({ error: { message: 'Error during logout' } });
    }

    if (token) {
      const currentUser = await firebaseAdmin.auth().verifyIdToken(token);

      if (currentUser) {
        // get user
        const user = await prisma.user.findUnique({
          where: {
            user_id_external: currentUser.uid,
          },
          select: {
            id: true,
            email: true,
            username: true,
          },
        });

        console.log('\n user: ', user);
        if (!user) {
          return res
            .status(401)
            .json({ error: { message: 'Error during logout' } });
        }

        return res
          .status(200)
          .setHeader(
            'Set-Cookie',
            cookie.serialize('accessToken', '', {
              maxAge: -1,
              path: '/',
            }),
          )
          .json({
            logout: 'success',
          });
      }
    }
  } else {
    return res.status(405).json({
      error: { message: 'Method not supported' },
    });
  }
}
