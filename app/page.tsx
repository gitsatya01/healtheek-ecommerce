import { Header } from "@/components/layout/header"
import { HeroSection } from "@/components/sections/hero-section"
import { SmartFormulas } from "@/components/sections/smart-formulas"
import { PrimeFormulas } from "@/components/sections/prime-formulas"
import { PopularProducts } from "@/components/sections/popular-products"
import { BusinessTools } from "@/components/sections/business-tools"
import { Footer } from "@/components/layout/footer"
import { getProducts } from "@/lib/data"

export default async function HomePage() {
  const products = await getProducts()

  // Filter products by category
  const smartFormulas = products.filter((p) => p.category === "smart-formula-2025")
  const primeFormulas = products.filter((p) => p.category === "prime-formula")
  const popularProducts = products.filter((p) => p.featured === true)
  const businessTools = products.filter((p) => p.category === "business-tools")

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
