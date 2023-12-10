// config for the backend

import * as admin from 'firebase-admin';
import {
  applicationDefault,
  cert,
  getApps,
  initializeApp,
} from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
// const firebaseAdminConfig = {
//   credential: cert({
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//     privateKey: process.env.FIREBASE_PRIVATE_KEY,
//   }),
// };
// export function customInitApp() {
//   if (getApps().length <= 0) {
//     initializeApp(firebaseAdminConfig);
//   }
// }
// export const GOOGLE_APPLICATION_CREDENTIALS =
//   '../../../../corvismartha/Downloads/ecommerce-mockup-firebase-adminsdk-674g3-ff5d0e8876.json';
// initializeApp({
//   credential: applicationDefault(),
// });
// // Initialize the default app
// const defaultApp = initializeApp();
// console.log(defaultApp.name); // '[DEFAULT]'
import serviceAccountJson from '../ecommerce-mockup-firebase-adminsdk-674g3-ff5d0e8876.json';

const GOOGLE_APPLICATION_CREDENTIALS =
  serviceAccountJson as admin.ServiceAccount;

const firebaseAdminConfig = {
  credential: cert(GOOGLE_APPLICATION_CREDENTIALS),
};

export function customInitApp() {
  if (getApps().length <= 0) {
    return initializeApp(firebaseAdminConfig);
  } else {
    return getApps()[0];
  }
}
export const adminAuth = customInitApp();
