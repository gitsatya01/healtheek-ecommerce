// scripts/create-admin.js
// Run this script to create an admin user in Firebase
// Usage: node scripts/create-admin.js

const { initializeApp } = require('firebase/app');
const { getAuth, createUserWithEmailAndPassword } = require('firebase/auth');

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

async function createAdminUser() {
  try {
    console.log('Creating admin user...');
    
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      'admin@healtheek.com', 
      'admin123'
    );
    
    console.log('✅ Admin user created successfully!');
    console.log('Email: admin@healtheek.com');
    console.log('Password: admin123');
    console.log('User ID:', userCredential.user.uid);
    
    process.exit(0);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('✅ Admin user already exists!');
      console.log('Email: admin@healtheek.com');
      console.log('Password: admin123');
    } else {
      console.error('❌ Error creating admin user:', error.message);
    }
    process.exit(1);
  }
}

createAdminUser(); 