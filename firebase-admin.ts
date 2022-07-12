import * as admin from "firebase-admin";

const serviceAccount = JSON.parse(
  String(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
);
const firebaseConfig = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

// Initialize Firebase
const app = !admin.apps.length
  ? admin.initializeApp(firebaseConfig)
  : admin.app();
const db = admin.database(app);

// Setup emulators
if (process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATORS === "true") {
  const host = String(process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST);
  db.useEmulator(
    host,
    Number(process.env.NEXT_PUBLIC_FIREBASE_DATABASE_EMULATOR_PORT)
  );
}

export { db };
