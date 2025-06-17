import { Header } from "@/components/layout/header"
import { HeroSection } from "@/components/sections/hero-section"
import { SmartFormulas } from "@/components/sections/smart-formulas"
import { PrimeFormulas } from "@/components/sections/prime-formulas"
import { PopularProducts } from "@/components/sections/popular-products"
import { BusinessTools } from "@/components/sections/business-tools"
import { DynamicCategory } from "@/components/sections/dynamic-category"
import { Footer } from "@/components/layout/footer"
import { getProducts, getCategoryByName } from "@/lib/data"

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HomePage() {
  // Get only admin-added products from Firebase
  const products = await getProducts()

  // Helper function to check if product belongs to a specific category group
  const isSmartFormula = (p: any) => 
    p.category === "smart-formula-2025" || 
    p.category === "Smart Formula's" ||
    p.category === "Smart Formulas"

  const isPrimeFormula = (p: any) => 
    p.category === "prime-formula" || 
    p.category === "Prime Formula's" ||
    p.category === "Prime Formulas"

  const isBusinessTool = (p: any) => 
    p.category === "business-tools" || 
    p.category === "Business Tools"

  // Filter products by category with no overlap - each product appears in only one section
  const smartFormulas = products.filter(isSmartFormula)
  const primeFormulas = products.filter(p => isPrimeFormula(p) && !isSmartFormula(p))
  const businessTools = products.filter(p => isBusinessTool(p) && !isSmartFormula(p) && !isPrimeFormula(p))

  // Get all unique categories excluding the special ones
  const specialCategories = [
    "smart-formula-2025", "Smart Formula's", "Smart Formulas",
    "prime-formula", "Prime Formula's", "Prime Formulas", 
    "business-tools", "Business Tools"
  ]

  // Get all other categories dynamically
  const otherCategories = [...new Set(
    products
      .filter(p => !specialCategories.includes(p.category) && p.category)
      .map(p => p.category)
  )]

  // Create dynamic category data with icon and color scheme info
  const dynamicCategories = await Promise.all(
    otherCategories.map(async (category) => {
      const categoryProducts = products.filter(p => 
        p.category === category && 
        !isSmartFormula(p) && 
        !isPrimeFormula(p) && 
        !isBusinessTool(p)
      )
      
      // Convert category name to slug format
      const categorySlug = category.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .trim()

      // Clean up category name for display
      const categoryName = category
        .split(/[-_\s]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')

      // Get category details from database for icon and color scheme
      const categoryData = await getCategoryByName(category)

      return {
        name: categoryName,
        slug: categorySlug,
        products: categoryProducts,
        icon: categoryData?.icon,
        colorScheme: categoryData?.colorScheme,
        description: categoryData?.description
      }
    })
  )
  
  // Filter out categories with no products
  const categoriesWithProducts = dynamicCategories.filter(cat => cat.products.length > 0)
  
  // Popular products are featured products NOT already in other specific categories
  const usedInDynamicCategories = categoriesWithProducts.flatMap(cat => cat.products.map(p => p.id))
  const popularProducts = products.filter((p) => 
    p.featured === true &&
    !isSmartFormula(p) &&
    !isPrimeFormula(p) &&
    !isBusinessTool(p) &&
    !usedInDynamicCategories.includes(p.id)
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HeroSection />
        {/* Only show sections that have products */}
        {smartFormulas.length > 0 && <SmartFormulas products={smartFormulas} />}
        {primeFormulas.length > 0 && <PrimeFormulas products={primeFormulas} />}
        
        {/* Dynamic categories - automatically display any new categories */}
        {categoriesWithProducts.map((category) => (
          <DynamicCategory
            key={category.slug}
            products={category.products}
            categoryName={category.name}
            categorySlug={category.slug}
            description={category.description}
            categoryIcon={category.icon}
            categoryColorScheme={category.colorScheme}
          />
        ))}
        
        {popularProducts.length > 0 && <PopularProducts products={popularProducts} />}
        {businessTools.length > 0 && <BusinessTools products={businessTools} />}
      </main>
      <Footer />
    </div>
  )
}
