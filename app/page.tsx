import { Header } from "@/components/layout/header"
import { HeroSection } from "@/components/sections/hero-section"
import { SmartFormulas } from "@/components/sections/smart-formulas"
import { PrimeFormulas } from "@/components/sections/prime-formulas"
import { PopularProducts } from "@/components/sections/popular-products"
import { BusinessTools } from "@/components/sections/business-tools"
import { Footer } from "@/components/layout/footer"
import { getProducts } from "@/lib/data"

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HomePage() {
  const products = await getProducts()

  // Filter products by category - handle both category names and IDs
  const smartFormulas = products.filter((p) => 
    p.category === "smart-formula-2025" || 
    p.category === "Smart Formula's" ||
    p.category === "Smart Formulas"
  )
  const primeFormulas = products.filter((p) => 
    p.category === "prime-formula" || 
    p.category === "Prime Formula's" ||
    p.category === "Prime Formulas"
  )
  const popularProducts = products.filter((p) => 
    p.featured === true || 
    p.category === "popular-products" ||
    p.category === "Popular Products"
  )
  const businessTools = products.filter((p) => 
    p.category === "business-tools" || 
    p.category === "Business Tools"
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <HeroSection />
        <SmartFormulas products={smartFormulas} />
        <PrimeFormulas products={primeFormulas} />
        <PopularProducts products={popularProducts} />
        <BusinessTools products={businessTools} />
      </main>
      <Footer />
    </div>
  )
}
