import crypto from 'node:crypto';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import cookie from 'cookie';
import { auth } from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prisma';
import { verifyCsrfToken } from '../../util/auth';
import { createSerializedRegisterSessionTokenCookie } from '../../util/cookies';
import { customInitApp } from '../../util/firebase-admin-config';

type ResponseData = {
  id: number;
  username: string;
  email: string;
};

customInitApp();
export type Error = { errors: { message: string }[] };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | Error>,
) {
  if (req.method === 'POST') {
    //console.log('request.body REGISTER', req.headers);
    const { username, email, password } = req.body;

    const authorization = req.headers.authorization;
    console.log('-------> headers: ', req.headers);
    console.log('-------> JWT Token: ', authorization);

    if (authorization) {
      console.log('HEEEEELLLO ');
      getAuth()
        .verifyIdToken(authorization)
        .then((decodeToken) => {
          const uid = decodeToken.uid;
          console.log('------> uid: ', decodeToken);
        })
        .catch((error) => {
          console.log('------->error: ', error);
        });
    }

    // // create passwordHash
    // const passwordHash = await bcrypt.hash(password, 12);

    // // add new user to db
    // try {
    //   const user = await prisma.user.create({
    //     data: {
    //       username: username,
    //       email: email,
    //       password_hash: passwordHash,
    //       role_id: 1,
    //     },
    //   });

    //   const token = crypto.randomBytes(100).toString('base64');

    //   // add token to session_table
    //   const userSession = await prisma.userSession.create({
    //     data: {
    //       user_id: user.id,
    //       token,
    //     },
    //   });

    // // 1. Create a unique token (use node crypto)
    // const token = crypto.randomBytes(64).toString('base64');
    // const session = await prisma.userSession.create({
    //   data: {
    //     token: token,
    //     user_id: user.id,
    //   },
    // });

    // console.log('session.token: ', session.token);

    // res.status(201).setHeader('Set-Cookie', session.token).json({
    //   id: user.id,
    //   username: user.username,
    //   email: user.email,
    // });
  }
}
