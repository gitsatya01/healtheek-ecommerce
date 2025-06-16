import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Only import getAnalytics on the client
// Do NOT import 'firebase/analytics' at the top level!

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyAZ8FPTo1OZegHHde0L87Gp3AWQ9jTETIQ",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "ecom-admin-a4b0b.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "ecom-admin-a4b0b",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "ecom-admin-a4b0b.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "541575751767",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:541575751767:web:b25f99a2de9965fbd65b12",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-5BP9Q23R5X"
};

// Validate configuration
const requiredFields = ['apiKey', 'authDomain', 'projectId'];
for (const field of requiredFields) {
  if (!firebaseConfig[field as keyof typeof firebaseConfig]) {
    console.error(`Firebase configuration missing: ${field}`);
  }
}

// Initialize Firebase only once
let app;
try {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Firebase initialization error:", error);
  throw error;
}

export const db = getFirestore(app);
export const auth = getAuth(app);

// Add connection test
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("Firebase Auth: User is signed in", user.email);
  } else {
    console.log("Firebase Auth: User is signed out");
  }
});

// Helper to get analytics only on client
export const getAnalyticsClient = () => {
  if (typeof window !== "undefined") {
    try {
      // Import here to avoid SSR issues
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { getAnalytics } = require("firebase/analytics");
      return getAnalytics(app);
    } catch (error) {
      console.warn("Analytics not available:", error);
      return null;
    }
  }
  return null;
};

// Export configuration for debugging
export const firebaseConfigDebug = {
  ...firebaseConfig,
  apiKey: firebaseConfig.apiKey ? `${firebaseConfig.apiKey.substring(0, 10)}...` : 'missing'
};
