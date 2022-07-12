import { getApp, getApps, initializeApp } from "firebase/app";
import { connectDatabaseEmulator, getDatabase } from "firebase/database";
import { connectAuthEmulator, getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseUrl: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getDatabase(app, process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL);

// Setup emulators
if (process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATORS === "true") {
  const host = String(process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST);
  const authUrl = `http://${host}:${process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_PORT}`;
  connectAuthEmulator(auth, authUrl);
  connectDatabaseEmulator(
    db,
    host,
    Number(process.env.NEXT_PUBLIC_FIREBASE_DATABASE_EMULATOR_PORT)
  );
}

export default app;
export { auth, db };
