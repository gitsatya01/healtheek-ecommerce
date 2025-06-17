import type { Product, Category } from "./types"

// Mock categories - DISABLED: Using only Firebase admin-added categories  
// To re-enable mock categories, uncomment the export line below
const categories: Category[] = [
  { id: "smart-formula-2025", name: "Smart Formula's", productCount: 8 },
  { id: "prime-formula", name: "Prime Formula's", productCount: 5 },
  { id: "popular-products", name: "Popular Products", productCount: 15 },
  { id: "business-tools", name: "Business Tools", productCount: 3 },
  { id: "cancer", name: "Cancer Support", productCount: 2 },
  { id: "daily-nutrition", name: "Daily Nutrition", productCount: 2 },
  { id: "diabetes", name: "Diabetes Care", productCount: 2 },
  { id: "fertility", name: "Fertility Support", productCount: 2 },
  { id: "fitness", name: "Fitness & Sports", productCount: 2 },
  { id: "kids-health", name: "Kids Health", productCount: 2 },
  { id: "women-health", name: "Women's Health", productCount: 2 },
  { id: "wellness-coach", name: "Wellness Coach", productCount: 2 },
]

// Mock data - DISABLED: Using only Firebase admin-added products
// To re-enable mock data, uncomment the export line below
const products: Product[] = [
  // Business Tools
  {
    id: "27",
    name: "EXECUTIVE BAG",
    slug: "executive-bag",
    subtitle: "1 Bag",
    description: "Professional executive bag for health consultants and business professionals.",
    image: "/placeholder.svg?height=300&width=300",
    mrpPrice: 1699.0,
    primePrice: 1299.0,
    category: "business-tools",
    featured: false,
    inStock: true,
    rating: 4.3,
    reviewCount: 45,
  },
  {
    id: "28",
    name: "EXECUTIVE PEN",
    slug: "executive-pen",
    subtitle: "1 Pen",
    description: "Premium executive pen for professional presentations and consultations.",
    image: "/placeholder.svg?height=300&width=300",
    mrpPrice: 150.0,
    primePrice: 100.0,
    category: "business-tools",
    featured: false,
    inStock: true,
    rating: 4.1,
    reviewCount: 23,
  },
  {
    id: "29",
    name: "PRODUCT CATALOGUE",
    slug: "product-catalogue",
    subtitle: "1 Book",
    description: "Comprehensive product catalogue for health consultants and distributors.",
    image: "/placeholder.svg?height=300&width=300",
    mrpPrice: 150.0,
    primePrice: 120.0,
    category: "business-tools",
    featured: false,
    inStock: true,
    rating: 4.2,
    reviewCount: 34,
  },

  // Cancer Support
  {
    id: "30",
    name: "CANCER SUPPORT FORMULA",
    slug: "cancer-support-formula",
    subtitle: "1 Box",
    description: "Specialized nutritional support for cancer patients and survivors.",
    image: "/placeholder.svg?height=300&width=300",
    mrpPrice: 3999.0,
    primePrice: 3299.0,
    category: "cancer",
    featured: true,
    inStock: true,
    rating: 4.8,
    reviewCount: 67,
  },
  {
    id: "31",
    name: "IMMUNITY BOOSTER PLUS",
    slug: "immunity-booster-plus",
    subtitle: "1 Box",
    description: "Advanced immunity support with powerful antioxidants and herbs.",
    image: "/placeholder.svg?height=300&width=300",
    mrpPrice: 2499.0,
    primePrice: 1999.0,
    category: "cancer",
    featured: true,
    inStock: true,
    rating: 4.6,
    reviewCount: 89,
  },

  // Daily Nutrition
  {
    id: "32",
    name: "DAILY MULTIVITAMIN",
    slug: "daily-multivitamin",
    subtitle: "1 Box",
    description: "Complete daily nutrition with essential vitamins and minerals.",
    image: "/placeholder.svg?height=300&width=300",
    mrpPrice: 899.0,
    primePrice: 699.0,
    category: "daily-nutrition",
    featured: true,
    inStock: true,
    rating: 4.4,
    reviewCount: 234,
  },
  {
    id: "33",
    name: "OMEGA-3 SUPREME",
    slug: "omega-3-supreme",
    subtitle: "1 Box",
    description: "High-potency Omega-3 fatty acids for heart and brain health.",
    image: "/placeholder.svg?height=300&width=300",
    mrpPrice: 1299.0,
    primePrice: 999.0,
    category: "daily-nutrition",
    featured: true,
    inStock: true,
    rating: 4.7,
    reviewCount: 156,
  },

  // Diabetes
  {
    id: "34",
    name: "DIABETIC CARE FORMULA",
    slug: "diabetic-care-formula",
    subtitle: "1 Box",
    description: "Natural blood sugar management with herbal extracts and minerals.",
    image: "/placeholder.svg?height=300&width=300",
    mrpPrice: 1899.0,
    primePrice: 1499.0,
    category: "diabetes",
    featured: true,
    inStock: true,
    rating: 4.5,
    reviewCount: 178,
  },
  {
    id: "35",
    name: "GLUCOSE BALANCE",
    slug: "glucose-balance",
    subtitle: "1 Box",
    description: "Advanced glucose metabolism support for diabetic management.",
    image: "/placeholder.svg?height=300&width=300",
    mrpPrice: 2199.0,
    primePrice: 1799.0,
    category: "diabetes",
    featured: true,
    inStock: true,
    rating: 4.6,
    reviewCount: 134,
  },

  // Fertility
  {
    id: "36",
    name: "FERTILITY BOOST FOR MEN",
    slug: "fertility-boost-men",
    subtitle: "1 Box",
    description: "Male fertility enhancement with zinc, selenium, and herbal extracts.",
    image: "/placeholder.svg?height=300&width=300",
    mrpPrice: 2499.0,
    primePrice: 1999.0,
    category: "fertility",
    featured: true,
    inStock: true,
    rating: 4.4,
    reviewCount: 89,
  },
  {
    id: "37",
    name: "FERTILITY BOOST FOR WOMEN",
    slug: "fertility-boost-women",
    subtitle: "1 Box",
    description: "Female fertility support with folic acid, iron, and reproductive herbs.",
    image: "/placeholder.svg?height=300&width=300",
    mrpPrice: 2299.0,
    primePrice: 1899.0,
    category: "fertility",
    featured: true,
    inStock: true,
    rating: 4.7,
    reviewCount: 112,
  },

  // Fitness
  {
    id: "38",
    name: "PRE-WORKOUT ENERGY",
    slug: "pre-workout-energy",
    subtitle: "1 Box",
    description: "High-energy pre-workout formula with caffeine and amino acids.",
    image: "/placeholder.svg?height=300&width=300",
    mrpPrice: 1599.0,
    primePrice: 1299.0,
    category: "fitness",
    featured: true,
    inStock: true,
    rating: 4.6,
    reviewCount: 267,
  },
  {
    id: "39",
    name: "WHEY PROTEIN ISOLATE",
    slug: "whey-protein-isolate",
    subtitle: "1 Box",
    description: "Pure whey protein isolate for muscle building and recovery.",
    image: "/placeholder.svg?height=300&width=300",
    mrpPrice: 3499.0,
    primePrice: 2999.0,
    category: "fitness",
    featured: true,
    inStock: true,
    rating: 4.8,
    reviewCount: 345,
  },

  // Kids Health
  {
    id: "40",
    name: "KIDS MULTIVITAMIN GUMMIES",
    slug: "kids-multivitamin-gummies",
    subtitle: "1 Box",
    description: "Delicious gummy vitamins for children's daily nutrition needs.",
    image: "/placeholder.svg?height=300&width=300",
    mrpPrice: 799.0,
    primePrice: 649.0,
    category: "kids-health",
    featured: true,
    inStock: true,
    rating: 4.5,
    reviewCount: 189,
  },
  {
    id: "41",
    name: "KIDS IMMUNITY SYRUP",
    slug: "kids-immunity-syrup",
    subtitle: "1 Bottle",
    description: "Natural immunity booster syrup for children with herbs and vitamins.",
    image: "/placeholder.svg?height=300&width=300",
    mrpPrice: 599.0,
    primePrice: 499.0,
    category: "kids-health",
    featured: true,
    inStock: true,
    rating: 4.4,
    reviewCount: 156,
  },

  // Women Health
  {
    id: "42",
    name: "WOMEN'S HORMONE BALANCE",
    slug: "womens-hormone-balance",
    subtitle: "1 Box",
    description: "Natural hormone balance support for women's health and wellness.",
    image: "/placeholder.svg?height=300&width=300",
    mrpPrice: 1999.0,
    primePrice: 1599.0,
    category: "women-health",
    featured: true,
    inStock: true,
    rating: 4.6,
    reviewCount: 234,
  },
  {
    id: "43",
    name: "PRENATAL COMPLETE",
    slug: "prenatal-complete",
    subtitle: "1 Box",
    description: "Complete prenatal nutrition with folic acid, iron, and DHA.",
    image: "/placeholder.svg?height=300&width=300",
    mrpPrice: 1799.0,
    primePrice: 1449.0,
    category: "women-health",
    featured: true,
    inStock: true,
    rating: 4.8,
    reviewCount: 178,
  },



  // Wellness Coach
  {
    id: "46",
    name: "DIPLOMA COURSE",
    slug: "diploma-course",
    subtitle: "Course",
    description: "Comprehensive health and wellness coaching certification program.",
    image: "/placeholder.svg?height=300&width=300",
    mrpPrice: 139999.0,
    primePrice: 118000.0,
    category: "wellness-coach",
    featured: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 234,
  },
  {
    id: "47",
    name: "HEALTH & WELLNESS COACH PACK",
    slug: "health-wellness-coach-pack",
    subtitle: "Pack",
    description: "Complete coaching toolkit with materials and certification support.",
    image: "/placeholder.svg?height=300&width=300",
    mrpPrice: 69999.0,
    primePrice: 59999.0,
    category: "wellness-coach",
    featured: true,
    inStock: true,
    rating: 4.8,
    reviewCount: 156,
  },

  // Adding original products with updated categories
  {
    id: "1",
    name: "SMART LEAN PRO FORMULA",
    slug: "smart-lean-pro-formula",
    subtitle: "Combo Pack",
    description:
      "Advanced weight management formula with natural ingredients for optimal fat burning and metabolism boost.",
    image: "/placeholder.svg?height=300&width=300",
    mrpPrice: 8997.0,
    primePrice: 6999.0,
    category: "smart-formula-2025",
    featured: false,
    inStock: true,
    rating: 4.5,
    reviewCount: 128,
  },
  {
    id: "5",
    name: "SMART MALE X FORMULA",
    slug: "smart-male-x-formula",
    subtitle: "Combo Pack",
    description: "Specialized men's health formula for enhanced performance and vitality.",
    image: "/placeholder.svg?height=300&width=300",
    mrpPrice: 9000.0,
    primePrice: 6999.0,
    category: "smart-formula-2025",
    featured: false,
    inStock: true,
    rating: 4.8,
    reviewCount: 156,
  },
  // More Smart Formula 2025 products
  {
    id: "2",
    name: "SMART REYONIQUE FORMULA",
    slug: "smart-reyonique-formula",
    subtitle: "Combo Pack",
    description: "Revolutionary anti-aging formula with powerful antioxidants and cellular regeneration support.",
    image: "/placeholder.svg?height=300&width=300",
    mrpPrice: 8700.0,
    primePrice: 6999.0,
    category: "smart-formula-2025",
    featured: false,
    inStock: true,
    rating: 4.7,
    reviewCount: 95,
  },
  {
    id: "3",
    name: "SMART WEIZAP FORMULA",
    slug: "smart-weizap-formula",
    subtitle: "Combo Pack",
    description: "Comprehensive digestive health combo with enhanced absorption and gut wellness support.",
    image: "/placeholder.svg?height=300&width=300",
    mrpPrice: 8397.0,
    primePrice: 6999.0,
    category: "smart-formula-2025",
    featured: false,
    inStock: true,
    rating: 4.4,
    reviewCount: 87,
  },
  {
    id: "4",
    name: "SMART HALE.O FORMULA",
    slug: "smart-hale-o-formula",
    subtitle: "Combo Pack",
    description: "Complete health optimization formula for overall wellness and vitality enhancement.",
    image: "/placeholder.svg?height=300&width=300",
    mrpPrice: 7998.0,
    primePrice: 6999.0,
    category: "smart-formula-2025",
    featured: false,
    inStock: true,
    rating: 4.6,
    reviewCount: 112,
  },

  // Add Prime Formula products
  {
    id: "7",
    name: "MALE X FORMULA KIT",
    slug: "male-x-formula-kit",
    subtitle: "Pack of 4",
    description: "Complete men's health kit with 4 essential supplements for comprehensive male wellness.",
    image: "/placeholder.svg?height=300&width=300",
    mrpPrice: 7650.0,
    primePrice: 5250.0,
    category: "prime-formula",
    featured: false,
    inStock: true,
    rating: 4.7,
    reviewCount: 89,
  },
  {
    id: "8",
    name: "HALE.O KIT",
    slug: "hale-o-kit",
    subtitle: "Pack of 4",
    description: "Premium health optimization kit with 4 synergistic formulas for total wellness.",
    image: "/placeholder.svg?height=300&width=300",
    mrpPrice: 7149.0,
    primePrice: 5250.0,
    category: "prime-formula",
    featured: false,
    inStock: true,
    rating: 4.6,
    reviewCount: 76,
  },
]

import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"

export async function getProducts(): Promise<Product[]> {
  try {
    // Fetch ONLY admin-added products from Firestore
    const querySnapshot = await getDocs(collection(db, "products"));
    const firebaseProducts = querySnapshot.docs.map((doc) => ({ 
      id: doc.id, 
      ...doc.data() 
    } as Product));
    
    // Return only Firebase products (admin-added), ignore local mock data
    return firebaseProducts;
  } catch (error) {
    console.error("Error fetching products from Firebase:", error);
    // Return empty array if Firebase fails, don't fall back to mock data
    return [];
  }
}

export async function getCategories(): Promise<Category[]> {
  try {
    // Fetch ONLY admin-added categories from Firestore
    const querySnapshot = await getDocs(collection(db, "categories"));
    const firebaseCategories = querySnapshot.docs.map((doc) => ({ 
      id: doc.id, 
      ...doc.data() 
    } as Category));
    
    // Return only Firebase categories, ignore local mock data
    return firebaseCategories;
  } catch (error) {
    console.error("Error fetching categories from Firebase:", error);
    // Return empty array if Firebase fails
    return [];
  }
}

export async function getProduct(slug: string): Promise<Product | null> {
  try {
    // Get product from Firebase only
    const firebaseProducts = await getProducts();
    return firebaseProducts.find((p) => p.slug === slug) || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    // Get featured products from Firebase only
    const firebaseProducts = await getProducts();
    return firebaseProducts.filter((p) => p.featured);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}

export async function getCategory(id: string): Promise<Category | null> {
  try {
    // Handle popular products as a special case
    if (id === "popular-products") {
      const firebaseProducts = await getProducts();
      const popularCount = firebaseProducts.filter(p => p.featured).length;
      return { id: "popular-products", name: "Popular Products", productCount: popularCount }
    }

    // Get category from Firebase only
    const firebaseCategories = await getCategories();
    return firebaseCategories.find((c) => c.id === id) || null;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

export async function getCategoryByName(categoryName: string): Promise<Category | null> {
  try {
    const firebaseCategories = await getCategories();
    return firebaseCategories.find((c) => c.name === categoryName) || null;
  } catch (error) {
    console.error("Error fetching category by name:", error);
    return null;
  }
}
