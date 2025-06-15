import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CategorySidebar } from "@/components/products/category-sidebar"
import { ProductSearch } from "@/components/products/product-search"
import { ProductGridSSR } from "@/components/products/product-grid-ssr"
import { getProducts, getCategories } from "@/lib/data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Buy Products - HealthEek",
  description: "Browse our complete collection of health and wellness supplements across all categories.",
}

// Force dynamic rendering to ensure fresh data
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface SearchParams {
  category?: string
  sort?: string
  search?: string
  page?: string
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  // Server-side data fetching
  const [products, categories] = await Promise.all([getProducts(), getCategories()])

  // Server-side filtering and sorting
  const selectedCategory = searchParams.category || "all"
  const sortBy = searchParams.sort || "default"
  const searchQuery = searchParams.search || ""
  const currentPage = Number(searchParams.page) || 1

  let filteredProducts = products

  // Filter by category on server
  if (selectedCategory !== "all") {
    if (selectedCategory === "popular-products") {
      filteredProducts = filteredProducts.filter((p) => p.featured === true)
    } else {
      filteredProducts = filteredProducts.filter((p) => p.category === selectedCategory)
    }
  }

  // Filter by search query on server
  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase()
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.subtitle.toLowerCase().includes(query),
    )
  }

  // Sort products on server
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.primePrice - b.primePrice
      case "price-high":
        return b.primePrice - a.primePrice
      case "name-asc":
        return a.name.localeCompare(b.name)
      case "name-desc":
        return b.name.localeCompare(a.name)
      case "rating":
        return (b.rating || 0) - (a.rating || 0)
      case "newest":
        return b.isNew ? 1 : -1
      case "default":
      default:
        return b.featured ? 1 : -1
    }
  })

  // Pagination on server
  const itemsPerPage = 12
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage)

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
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-4 md:gap-8">
          {/* Category Sidebar - Mobile Collapsible */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <CategorySidebar categories={categories} selectedCategory={selectedCategory} />
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-4 md:space-y-6 order-1 lg:order-2">
            {/* Search and Sort */}
            <ProductSearch searchQuery={searchQuery} sortBy={sortBy} />

            {/* Product Grid */}
            <ProductGridSSR
              products={paginatedProducts}
              totalProducts={sortedProducts.length}
              currentPage={currentPage}
              totalPages={totalPages}
              searchParams={searchParams}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
