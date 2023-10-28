import crypto from 'node:crypto';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma';

type ResponseData = {
  id: number;
  username: string;
  email: string;
};

export type Error = { errors: { message: string }[] };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | Error>,
) {
  if (req.method === 'POST') {
    console.log('request.body', req.body);
    const { email, password } = req.body;

    // validation: fields are not empty
    if (!email || !password) {
      res.status(400).json({
        errors: [
          {
            message: 'Invalid inputs',
          },
        ],
      });
      return;
    }

    // query user in db
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
        select: {
          id: true,
          email: true,
          passwordHash: true,
          username: true,
        },
      });

      // check password
      if (user) {
        const passwordHash = await bcrypt.compare(user.passwordHash, password);
        if (passwordHash) {
          return res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email,
          });
        }
      } else {
        return res
          .status(401)
          .json({ errors: [{ message: 'Invalid credentials' }] });
      }
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          return res.status(400).json({ errors: [{ message: e.message }] });
        }
        return res.status(400).json({ errors: [{ message: e.message }] });
      }
    }
  } else {
    res.status(405).json({
      errors: [{ message: 'Method not supported, try POST instead' }],
    });
  }
}
