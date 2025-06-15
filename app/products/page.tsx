import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CategorySidebar } from "@/components/products/category-sidebar"
import { ProductSearch } from "@/components/products/product-search"
import { ProductGridSSR } from "@/components/products/product-grid-ssr"
import { getProducts, getCategories } from "@/lib/data"
import { Metadata } from "next"
import { ProductGrid } from "@/components/products/product-grid"
import { ProductFilters } from "@/components/products/product-filters"

type Props = {
  searchParams: Promise<{
    category?: string
    sort?: string
    search?: string
    page?: string
  }>
}

export const metadata: Metadata = {
  title: "Products | HealthEek",
  description: "Browse our collection of health and wellness products",
}

export default async function ProductsPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ])

  // Server-side filtering and sorting
  const selectedCategory = resolvedSearchParams.category || "all"
  const sortBy = resolvedSearchParams.sort || "default"
  const searchQuery = resolvedSearchParams.search || ""
  const currentPage = Number(resolvedSearchParams.page) || 1

  let filteredProducts = products

  // Filter by category
  if (selectedCategory !== "all") {
    const category = categories.find((c) => c.id === selectedCategory)
    if (category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === category.id
      )
    }
  }

  // Filter by search query
  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    )
  }

  // Sort products
  switch (sortBy) {
    case "price-asc":
      filteredProducts.sort((a, b) => a.primePrice - b.primePrice)
      break
    case "price-desc":
      filteredProducts.sort((a, b) => b.primePrice - a.primePrice)
      break
    case "name-asc":
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name))
      break
    case "name-desc":
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name))
      break
    default:
      // Default sorting (e.g., by popularity or newest)
      break
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Page Header */}
      <div className="bg-teal-600 text-white py-3 md:py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-xl md:text-2xl font-bold">Buy Products</h1>
        </div>
      </div>

      <main className="container mx-auto px-4 py-4 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <ProductFilters />
          </div>
          <div className="md:col-span-3">
            <ProductGrid
              products={filteredProducts}
              searchParams={resolvedSearchParams}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
