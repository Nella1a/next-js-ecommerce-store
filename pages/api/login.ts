import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prisma';

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

    console.log('found user: ', user);
    if (!user) {
      return res
        .status(401)
        .json({ errors: [{ message: 'Invalid credentials' }] });
    }

    // compare passwordHash
    const passwordMatches = await bcrypt.compare(password, user.password_hash);

    console.log('passwordHast: ', passwordMatches);
    if (!passwordMatches) {
      console.log('PW is not right');
      return res
        .status(401)
        .json({ errors: [{ message: 'Invalid credentials' }] });
    }

    return res.status(201).json({
      id: user.id,
    });
  } else {
    return res.status(405).json({
      errors: [{ message: 'Method not supported, try POST instead' }],
    });
  }
}

//  // query user in db
//  try {
//   const user = await prisma.user.findUnique({
//     where: {
//       email: email,
//     },
//     select: {
//       id: true,
//       email: true,
//       password_hash: true,
//       username: true,
//     },
//   });
// } catch (e) {
//   if (e instanceof Prisma.PrismaClientKnownRequestError) {
//     if (e.code === 'P2002') {
//       return res.status(400).json({ errors: [{ message: e.message }] });
//     }
//     return res.status(400).json({ errors: [{ message: e.message }] });
//   }
// }
