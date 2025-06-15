// scripts/importCategories.ts
// Run this script with: npx ts-node scripts/importCategories.ts
import { initializeApp, getApps, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { categories } from "../lib/data";

// You must set these environment variables before running:
// FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY

const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

if (!getApps().length) {
  initializeApp({ credential: cert(serviceAccount) });
}

const db = getFirestore();

async function importCategories() {
  for (const category of categories) {
    const { id, ...rest } = category;
    await db.collection("categories").doc(id).set(rest);
    console.log(`Imported category: ${category.name}`);
  }
  console.log("All categories imported.");
}

importCategories().catch(console.error);
