import 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  export interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      //accessToken: string;
    } & Session['user'];
    // token: {
    //   id: string;
    //   username: string;
    //   email: string;
    //   accessToken: string;
    // };
  }

  export interface User {
    id: string;
    email: string;
    username: string;
    roleId?: number | null;
    createdAt?: Date;
    passwordHash?: string;
  }

  interface Account {
    accessToken: string;
  }
}

// declare module 'next-auth/jwt' {
//   /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
//   export interface JWT {
//     id: string;
//     username: string;
//     email: string;
//     idToken?: string;
//   }
// }
