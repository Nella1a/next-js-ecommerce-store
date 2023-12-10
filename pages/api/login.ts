import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import * as admin from 'firebase-admin';
import { FirebaseError } from 'firebase/app';
import type { NextApiRequest, NextApiResponse } from 'next';
//import type { Database } from 'types_db';
import prisma from '../../prisma';
import { createSerializedRegisterSessionTokenCookie } from '../../util/cookies';

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   const supabaseServerClient = createPagesServerClient<Database>({
//     req,
//     res,
//   });
//   const {
//     data: { user },
//   } = await supabaseServerClient.auth.getUser();

//   res.status(200).json({ name: user?.userName ?? '' });
// };

type ResponseData = {
  id: number;
  username?: string;
  email?: string;
};

export type Error = { errors: { message: string }[] };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | Error>,
) {
  if (req.method === 'POST') {
    console.log('request.body login', req.body);
    const { email, password } = req.body;
    if (
      typeof password !== 'string' ||
      !password ||
      typeof email !== 'string' ||
      !email
    ) {
      res.status(400).json({
        errors: [{ message: 'email, password or CSRF token not provided' }],
      });
      return;
    }

    // query user in db
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        password_hash: true,
        username: true,
      },
    });

    console.log('\n--->found user: ', user);
    if (!user) {
      return res
        .status(401)
        .json({ errors: [{ message: 'Invalid credentials' }] });
    }

    // compare passwordHash
    const passwordMatches = await bcrypt.compare(password, user.password_hash);

    console.log('\n-->passwordHast: ', passwordMatches);
    if (!passwordMatches) {
      console.log('PW is not right');
      return res
        .status(401)
        .json({ errors: [{ message: 'Invalid credentials' }] });
    }

    const token = crypto.randomBytes(100).toString('base64');

    // add token to session_table
    const userSession = await prisma.userSession.create({
      data: {
        user_id: user.id,
        token,
      },
    });

    console.log('---> session: ', userSession);
    if (!userSession) {
      return res
        .status(500)
        .json({ errors: [{ message: 'Error creaging session' }] });
    }

    const serializedCookie = createSerializedRegisterSessionTokenCookie(
      userSession.token,
    );

    return res.setHeader('Set-Cookie', serializedCookie).status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } else {
    return res.status(405).json({
      errors: [{ message: 'Method not supported, try POST instead' }],
    });
  }
}
