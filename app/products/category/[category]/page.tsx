import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CategorySidebar } from "@/components/products/category-sidebar"
import { ProductSearch } from "@/components/products/product-search"
import { ProductGridSSR } from "@/components/products/product-grid-ssr"
import { getProducts, getCategories, getCategory } from "@/lib/data"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface Props {
  params: Promise<{ category: string }>
  searchParams: Promise<{
    sort?: string
    search?: string
    page?: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categoryId } = await params
  const category = await getCategory(categoryId)

  if (!category) {
    return {
      title: "Category Not Found - HealthEek",
    }
  }

  return {
    title: `${category.name} - HealthEek`,
    description: `Browse our ${category.name.toLowerCase()} products for optimal health and wellness.`,
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  // Await both params and searchParams for Next.js 15 compatibility
  const { category: categoryId } = await params
  const searchParamsData = await searchParams
  
  const [products, categories, category] = await Promise.all([
    getProducts(),
    getCategories(),
    getCategory(categoryId),
  ])

  if (!category) {
    notFound()
  }

  // Server-side filtering and sorting
  const sortBy = searchParamsData.sort || "default"
  const searchQuery = searchParamsData.search || ""
  const currentPage = Number(searchParamsData.page) || 1

  let filteredProducts = products

  // Filter by category - handle popular products specially and Firebase data
  if (categoryId === "popular-products") {
    filteredProducts = products.filter((p) => p.featured === true)
  } else {
    // Find the category name for the selected category ID
    const selectedCategoryData = categories.find(cat => cat.id === categoryId)
    const categoryName = selectedCategoryData?.name
    
    // Filter by both category ID and category name to handle Firebase data
    filteredProducts = filteredProducts.filter((p) => 
      p.category === categoryId || 
      p.category === categoryName ||
      (categoryName === "Smart Formulas" && (p.category === "Smart Formula's" || p.category === "smart-formula-2025")) ||
      (categoryName === "Prime Formulas" && (p.category === "Prime Formula's" || p.category === "prime-formula")) ||
      (categoryName === "Popular Products" && p.featured === true) ||
      (categoryName === "business-tools" && p.category === "business-tools")
    )
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
      <div className="bg-teal-600 text-white py-6 md:py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold">{category.name}</h1>
          <p className="text-teal-100 mt-2 text-sm md:text-base">
            {category.description || `Browse our ${category.name.toLowerCase()} products`}
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6 md:gap-8">
          {/* Category Sidebar - Mobile First, Desktop Left */}
          <aside className="lg:col-span-1 order-1">
            <CategorySidebar categories={categories} selectedCategory={categoryId} />
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6 order-2">
            {/* Search and Sort */}
            <ProductSearch searchQuery={searchQuery} sortBy={sortBy} />

            {/* Product Grid */}
            <ProductGridSSR
              products={paginatedProducts}
              totalProducts={sortedProducts.length}
              currentPage={currentPage}
              totalPages={totalPages}
              searchParams={{
                category: categoryId,
                sort: searchParamsData.sort,
                search: searchParamsData.search,
                page: searchParamsData.page,
              }}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
