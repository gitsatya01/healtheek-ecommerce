// scripts/deploy-firestore-rules.js
// This script helps you deploy Firestore security rules

console.log(`
🔥 FIRESTORE SECURITY RULES DEPLOYMENT GUIDE
============================================

The Firestore permission error occurs because the security rules are too restrictive.

📋 MANUAL STEPS TO FIX:

1. Go to Firebase Console: https://console.firebase.google.com/
2. Select your project: ecom-admin-a4b0b
3. Navigate to: Firestore Database → Rules
4. Replace the existing rules with the following:

---COPY THE RULES BELOW---

rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read and write all documents
    // This is for development/admin purposes
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Specific rules for collections
    match /products/{productId} {
      allow read: if true; // Public read for products
      allow write: if request.auth != null; // Only authenticated users can write
    }
    
    match /categories/{categoryId} {
      allow read: if true; // Public read for categories
      allow write: if request.auth != null; // Only authenticated users can write
    }
    
    match /courses/{courseId} {
      allow read: if true; // Public read for courses
      allow write: if request.auth != null; // Only authenticated users can write
    }
    
    // Test collection for debugging
    match /test/{testId} {
      allow read, write: if request.auth != null;
    }
  }
}

---END OF RULES---

5. Click "Publish" to deploy the rules
6. Wait for deployment to complete (usually 1-2 minutes)

🚨 ALTERNATIVE: TEMPORARY OPEN RULES (FOR TESTING ONLY)

If you want to test immediately, you can use these TEMPORARY rules:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}

⚠️  WARNING: The temporary rules allow anyone to read/write your database.
   Only use for testing and remember to change back to secure rules!

🔗 Direct Link: https://console.firebase.google.com/project/ecom-admin-a4b0b/firestore/rules

After updating the rules, refresh your admin panel and try again.
`);

process.exit(0); 