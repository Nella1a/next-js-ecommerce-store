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
    const { username, email, password } = req.body;

    // validation: fields are not empty
    if (!username || !email || !password) {
      res.status(400).json({
        errors: [
          {
            message: 'Username, password, email or CSRF token are not provided',
          },
        ],
      });
      return;
    }

    // validation: check if username already exists in database
    const alreadyExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        email: true,
        username: true,
        password_hash: true,
      },
    });

    if (alreadyExists) {
      res.status(409).json({
        errors: [{ message: 'Username is already taken' }],
      });
      return;
    }

    // create passwordHash
    const passwordHash = await bcrypt.hash(req.body.password, 12);

    // add new user to db
    try {
      const user = await prisma.user.create({
        data: {
          username: username,
          email: email,
          password_hash: passwordHash,
        },
      });
      return res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email,
      });
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
