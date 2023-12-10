// config for the frontend

import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {
  addDoc,
  collection,
  CollectionReference,
  doc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { env } from 'process';

const firebaseConfig = {};

export const app =
  getApps() && getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
//export const db = getFirestore(app);
//export const provider = new GoogleAuthProvider();
