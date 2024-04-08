import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prisma';
import { firebaseAdmin } from '../../util/firebase-admin-config';

type ResponseData = {
  registration: string;
};
export type ErrorAPI = { error: { message: string } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | ErrorAPI>,
) {
  if (req.method === 'POST') {
    const { username } = req.body;
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith('Bearer ')) {
      res.status(401).json({ error: { message: 'unauthorized request!' } });
      return;
    }

    const idToken = authorization.split('Bearer ')[1];
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);

    if (!idToken) {
      res.status(401).json({ error: { message: 'unauthorized request!' } });
      return;
    }

    if (idToken) {
      // verify token
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken);

      if (decodedToken && decodedToken.email) {
        try {
          // add user to db
          await prisma.user.create({
            data: {
              user_id_external: decodedToken.uid,
              username: username,
              email: decodedToken.email,
              role_id: 1,
            },
          });

          res.status(201).json({ registration: 'success' });
          return;
        } catch (error) {
          // remove user from firebase
          await firebaseAdmin.auth().deleteUser(decodedToken.uid);
          res
            .status(401)
            .json({ error: { message: 'Error during registration!' } });
          return;
        }
      }
    }
  }
  res.json({ error: { message: 'Method not allowed' } });
}
