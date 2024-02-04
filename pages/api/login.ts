import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prisma';
import { createSerializedRegisterSessionTokenCookie } from '../../util/cookies';
import { firebaseAdmin } from '../../util/firebase-admin-config';
import { ErrorAPI } from './register';

type ResponseData = {
  user: {
    id: number;
    username: string;
    email: string;
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ErrorAPI>,
) {
  if (req.method === 'POST') {
    const authorization = req.headers.authorization;

    if (authorization?.startsWith('Bearer ')) {
      const tokenId = authorization.split('Bearer ')[1];
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(tokenId);

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
        res.status(401).json({ error: { message: 'Invalid credentials' } });
        return;
      }

      res
        .status(200)
        .setHeader(
          'Set-Cookie',
          createSerializedRegisterSessionTokenCookie(tokenId),
        )
        .json({
          user,
        });
      return;
    }
  } else {
    return res.status(405).json({
      error: { message: 'Method not supported' },
    });
  }
}
