import bcrypt from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;
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

        return user;
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
  },

  pages: {
    signIn: '/pages/login',
    // signOut: '/auth/account',
    // error: '/auth/account',
  },

  callbacks: {
    async jwt({ token, user, account }) {
      //stores user response in token
      if (user) {
        token.accessToken = account.access_token;
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token, user }) {
      // add the token to cookies in user session
      // use the useSession hook provided by auth.js in the client-side to get information that is passed to session object.
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.accessToken = token.accessToken;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
