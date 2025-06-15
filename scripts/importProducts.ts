// scripts/importProducts.ts
// Run this script with: npx ts-node scripts/importProducts.ts
import { initializeApp, getApps, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { products } from "../lib/data";

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

async function importProducts() {
  for (const product of products) {
    const { id, ...rest } = product;
    await db.collection("products").doc(id).set(rest);
    console.log(`Imported product: ${product.name}`);
  }
  console.log("All products imported.");
}

importProducts().catch(console.error);
