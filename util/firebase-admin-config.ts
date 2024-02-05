/*
firebase Server-Side (Admin) SDK Configurations
*/

import * as firebaseAdmin from 'firebase-admin';
import { cert, getApps, initializeApp } from 'firebase-admin/app';

const firebaseAdminConfig = {
  credential: firebaseAdmin.credential.cert({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY
      ? JSON.parse(process.env.FIREBASE_ADMIN_PRIVATE_KEY)
      : undefined,
  }),
};

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp(firebaseAdminConfig);
}

export { firebaseAdmin };
