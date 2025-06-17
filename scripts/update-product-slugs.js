const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, updateDoc, doc } = require('firebase/firestore');

// Firebase configuration (same as in your project)
const firebaseConfig = {
  apiKey: "AIzaSyBhvqvdOyBqoaYZlq8rP5sCT5o8W4Hm5Vo",
  authDomain: "ecom-admin-a4b0b.firebaseapp.com",
  projectId: "ecom-admin-a4b0b",
  storageBucket: "ecom-admin-a4b0b.firebasestorage.app",
  messagingSenderId: "1025950998",
  appId: "1:1025950998:web:b5e72b7d3f8e9a4c5d6e7f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Generate slug function (same as in admin dashboard)
function generateSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

async function updateProductSlugs() {
  try {
    console.log('🚀 Starting product slug update...');
    
    // Get all products
    const querySnapshot = await getDocs(collection(db, "products"));
    const products = querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));

    console.log(`📦 Found ${products.length} products`);

    let updatedCount = 0;
    
    for (const product of products) {
      // Check if product has a slug
      if (!product.slug || product.slug.trim() === '') {
        const newSlug = generateSlug(product.name || '');
        
        if (newSlug) {
          // Update the product with the new slug
          await updateDoc(doc(db, "products", product.id), {
            slug: newSlug
          });
          
          console.log(`✅ Updated "${product.name}" with slug: "${newSlug}"`);
          updatedCount++;
        } else {
          console.log(`⚠️ Could not generate slug for product: "${product.name}"`);
        }
      } else {
        console.log(`✓ Product "${product.name}" already has slug: "${product.slug}"`);
      }
    }

    console.log(`🎉 Update complete! Updated ${updatedCount} products with new slugs.`);
    
  } catch (error) {
    console.error('❌ Error updating product slugs:', error);
  }
}

// Run the update
updateProductSlugs(); 