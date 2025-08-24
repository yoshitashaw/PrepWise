// firebase/admin.ts
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

// Initialize Firebase Admin SDK
if (getApps().length === 0) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

// Create singleton instances
const db = getFirestore();
const auth = getAuth();

export { db, auth };



// // firebase/admin.ts
// import { cert, getApps, initializeApp } from 'firebase-admin/app';
// import { getAuth } from 'firebase-admin/auth';
// import { getFirestore } from 'firebase-admin/firestore';

// const firebaseAdminConfig = {
//   credential: cert({
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//     privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
//   }),
// };

// if (!getApps().length) {
//   console.log('Firebase admin init with project:', process.env.FIREBASE_PROJECT_ID);
//   initializeApp(firebaseAdminConfig);
// }

// export const auth = getAuth();
// export const db = getFirestore();