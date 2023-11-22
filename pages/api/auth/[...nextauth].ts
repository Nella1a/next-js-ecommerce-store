import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../prisma';

interface JWTOptionsType {
  secret: string;
  maxAge: number;
  encryption?: boolean;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        // email: { label: 'text', type: 'email' },
        // password: { label: 'password', type: 'password' },
      },

      async authorize(credentials) {
        // returns null or user
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        console.log('user: ');

        // check if user exists in db
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) return null;

        // check pw
        const isPasswordValid = await bcrypt.compare(
          password,
          user.password_hash,
        );
        if (!isPasswordValid) return null;

        //User object with ID using string like 1 to "1" will fix the type issue,
        const userOne = {
          id: user.id.toString(),
          email: user.email,
          username: user.username,
          roleId: user.role_id,
          createdAt: user.created_at,
          passwordHash: user.password_hash,
        };

        return userOne;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 14 * 24 * 60 * 60, // 14 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30,
    encryption: true,
  } as JWTOptionsType,

  pages: {
    // use custom login page
    signIn: '/pages/login',
    signOut: '/',
    // error: '/auth/account',
  },

  callbacks: {
    async session({ session, token, user }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.email = token.email;
        //session.user.accessToken = token.jti;
      }

      return session;
    },
    async jwt({ token, account, user }) {
      //stores user response in token

      if (account) {
        token.accessToken = account.accessToken;
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
