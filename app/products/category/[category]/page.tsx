import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CategorySidebar } from "@/components/products/category-sidebar"
import { ProductSearch } from "@/components/products/product-search"
import { ProductGridSSR } from "@/components/products/product-grid-ssr"
import { getProducts, getCategories, getCategory } from "@/lib/data"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

interface Props {
  params: { category: string }
  searchParams: {
    sort?: string
    search?: string
    page?: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategory(params.category)

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

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    category: category.id,
  }))
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const [products, categories, category] = await Promise.all([
    getProducts(),
    getCategories(),
    getCategory(params.category),
  ])

  if (!category) {
    notFound()
  }

  // Server-side filtering and sorting
  const sortBy = searchParams.sort || "default"
  const searchQuery = searchParams.search || ""
  const currentPage = Number(searchParams.page) || 1

  let filteredProducts = products

  // Filter by category - handle popular products specially
  if (params.category === "popular-products") {
    filteredProducts = products.filter((p) => p.featured === true)
  } else {
    filteredProducts = products.filter((p) => p.category === params.category)
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
      <div className="bg-teal-600 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">{category.name}</h1>
          <p className="text-teal-100 mt-1">
            {category.description || `Browse our ${category.name.toLowerCase()} products`}
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Sidebar */}
          <aside className="lg:col-span-1">
            <CategorySidebar categories={categories} selectedCategory={params.category} />
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Sort */}
            <ProductSearch searchQuery={searchQuery} sortBy={sortBy} />

            {/* Product Grid */}
            <ProductGridSSR
              products={paginatedProducts}
              totalProducts={sortedProducts.length}
              currentPage={currentPage}
              totalPages={totalPages}
              searchParams={{
                category: params.category,
                sort: searchParams.sort,
                search: searchParams.search,
                page: searchParams.page,
              }}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
