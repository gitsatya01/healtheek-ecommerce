import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Only import getAnalytics on the client
// Do NOT import 'firebase/analytics' at the top level!

const firebaseConfig = {
  apiKey: "AIzaSyAZ8FPTo1OZegHHde0L87Gp3AWQ9jTETIQ",
  authDomain: "ecom-admin-a4b0b.firebaseapp.com",
  projectId: "ecom-admin-a4b0b",
  storageBucket: "ecom-admin-a4b0b.appspot.com",
  messagingSenderId: "541575751767",
  appId: "1:541575751767:web:b25f99a2de9965fbd65b12",
  measurementId: "G-5BP9Q23R5X"
};

// Initialize Firebase only once
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

// Helper to get analytics only on client
export const getAnalyticsClient = () => {
  if (typeof window !== "undefined") {
    // Import here to avoid SSR issues
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { getAnalytics } = require("firebase/analytics");
    return getAnalytics(app);
  }
  return null;
};
