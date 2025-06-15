import Link from "next/link"
import { ProductCard } from "./product-card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import type { Product } from "@/lib/types"

interface ProductGridSSRProps {
  products: Product[]
  totalProducts: number
  currentPage: number
  totalPages: number
  searchParams: {
    category?: string
    sort?: string
    search?: string
    page?: string
  }
}

export function ProductGridSSR({
  products,
  totalProducts,
  currentPage,
  totalPages,
  searchParams,
}: ProductGridSSRProps) {
  const startItem = (currentPage - 1) * 12 + 1
  const endItem = Math.min(currentPage * 12, totalProducts)

  // Helper function to create pagination URLs
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams()

    if (searchParams.category) params.set("category", searchParams.category)
    if (searchParams.sort) params.set("sort", searchParams.sort)
    if (searchParams.search) params.set("search", searchParams.search)
    if (page > 1) params.set("page", page.toString())

    // Check if we're on a category page or main products page
    const basePath = searchParams.category ? `/products/category/${searchParams.category}` : "/products"
    return `${basePath}${params.toString() ? `?${params.toString()}` : ""}`
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Results Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-gray-600 gap-2">
        <p>
          Showing {startItem}-{endItem} of {totalProducts} products
        </p>
        <p className="text-xs sm:text-sm">
          Page {currentPage} of {totalPages}
        </p>
      </div>

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 md:py-16">
          <div className="text-gray-400 mb-4">
            <Search className="w-12 h-12 md:w-16 md:h-16 mx-auto" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 text-sm md:text-base">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Mobile-Optimized Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col space-y-4">
          {/* Mobile Pagination - Simplified */}
          <div className="flex items-center justify-between md:hidden">
            {currentPage > 1 ? (
              <Link href={createPageUrl(currentPage - 1)}>
                <Button variant="outline" size="sm" className="flex items-center">
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
              </Link>
            ) : (
              <div></div>
            )}

            <span className="text-sm text-gray-600 px-4">
              {currentPage} of {totalPages}
            </span>

            {currentPage < totalPages ? (
              <Link href={createPageUrl(currentPage + 1)}>
                <Button variant="outline" size="sm" className="flex items-center">
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            ) : (
              <div></div>
            )}
          </div>

          {/* Desktop Pagination - Full */}
          <div className="hidden md:flex items-center justify-center space-x-2">
            {currentPage > 1 && (
              <Link href={createPageUrl(currentPage - 1)}>
                <Button variant="outline" size="sm">
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </Button>
              </Link>
            )}

            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }

                return (
                  <Link key={pageNum} href={createPageUrl(pageNum)}>
                    <Button
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      className={currentPage === pageNum ? "bg-teal-600 hover:bg-teal-700" : ""}
                    >
                      {pageNum}
                    </Button>
                  </Link>
                )
              })}
            </div>

            {currentPage < totalPages && (
              <Link href={createPageUrl(currentPage + 1)}>
                <Button variant="outline" size="sm">
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
