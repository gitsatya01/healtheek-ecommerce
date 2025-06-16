// scripts/setup-firebase.js
// Run this script to set up Firebase properly
// Usage: node scripts/setup-firebase.js

const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } = require('firebase/auth');
const { getFirestore, doc, setDoc, getDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyAZ8FPTo1OZegHHde0L87Gp3AWQ9jTETIQ",
  authDomain: "ecom-admin-a4b0b.firebaseapp.com",
  projectId: "ecom-admin-a4b0b",
  storageBucket: "ecom-admin-a4b0b.appspot.com",
  messagingSenderId: "541575751767",
  appId: "1:541575751767:web:b25f99a2de9965fbd65b12",
  measurementId: "G-5BP9Q23R5X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function setupFirebase() {
  console.log('🔥 Setting up Firebase...\n');

  try {
    // Step 1: Create or verify admin user
    console.log('1. Setting up admin user...');
    let adminUser;
    
    try {
      // Try to create admin user
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        'admin@healtheek.com', 
        'admin123'
      );
      adminUser = userCredential.user;
      console.log('✅ Admin user created successfully!');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        // User exists, try to sign in
        const userCredential = await signInWithEmailAndPassword(
          auth, 
          'admin@healtheek.com', 
          'admin123'
        );
        adminUser = userCredential.user;
        console.log('✅ Admin user already exists and verified!');
      } else {
        throw error;
      }
    }

    // Step 2: Create admin user document in Firestore
    console.log('2. Creating admin user document...');
    const userDocRef = doc(db, 'users', adminUser.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
      await setDoc(userDocRef, {
        email: 'admin@healtheek.com',
        role: 'admin',
        createdAt: new Date(),
        name: 'Admin User'
      });
      console.log('✅ Admin user document created in Firestore!');
    } else {
      console.log('✅ Admin user document already exists!');
    }

    // Step 3: Test Firestore permissions
    console.log('3. Testing Firestore permissions...');
    
    try {
      // Test writing to products collection
      const testProductRef = doc(db, 'products', 'test-product');
      await setDoc(testProductRef, {
        name: 'Test Product',
        price: 100,
        createdAt: new Date()
      });
      console.log('✅ Products collection write test passed!');
      
      // Clean up test document
      await setDoc(testProductRef, {}, { merge: false });
      
    } catch (error) {
      console.log('❌ Firestore write test failed:', error.message);
      console.log('   Please update Firestore security rules manually.');
    }

    console.log('\n🎉 Firebase setup completed successfully!');
    console.log('\n📋 Admin Credentials:');
    console.log('   Email: admin@healtheek.com');
    console.log('   Password: admin123');
    console.log('   User ID:', adminUser.uid);
    
    console.log('\n🔗 Next Steps:');
    console.log('1. Go to Firebase Console: https://console.firebase.google.com/project/ecom-admin-a4b0b/firestore/rules');
    console.log('2. Make sure the security rules are updated (check firestore.rules file)');
    console.log('3. Click "Publish" to deploy the rules');
    console.log('4. Try logging into the admin panel: http://localhost:3000/admin/login');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    
    if (error.code === 'permission-denied') {
      console.log('\n🔧 PERMISSION DENIED - Manual Fix Required:');
      console.log('1. Go to: https://console.firebase.google.com/project/ecom-admin-a4b0b/firestore/rules');
      console.log('2. Replace the rules with the content from firestore.rules file');
      console.log('3. Click "Publish" and wait for deployment');
      console.log('4. Run this script again');
    }
  }

  process.exit(0);
}

setupFirebase(); 