"use client"

import { useState, useMemo } from "react"
import { ProductCard } from "./product-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown } from "lucide-react"
import type { Product } from "@/lib/types"

interface ProductGridProps {
  products: Product[]
  searchParams: {
    category?: string
    sort?: string
    search?: string
  }
}

export function ProductGrid({ products, searchParams }: ProductGridProps) {
  const [sortBy, setSortBy] = useState(searchParams.sort || "featured")

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products

    // Filter by category
    if (searchParams.category && searchParams.category !== "all") {
      filtered = filtered.filter((p) => p.category === searchParams.category)
    }

    // Filter by search
    if (searchParams.search) {
      const searchTerm = searchParams.search.toLowerCase()
      filtered = filtered.filter(
        (p) => p.name.toLowerCase().includes(searchTerm) || p.description.toLowerCase().includes(searchTerm),
      )
    }

    // Sort products
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.primePrice - b.primePrice
        case "price-high":
          return b.primePrice - a.primePrice
        case "name":
          return a.name.localeCompare(b.name)
        case "rating":
          return (b.rating || 0) - (a.rating || 0)
        case "featured":
        default:
          return b.featured ? 1 : -1
      }
    })

    return sorted
  }, [products, searchParams, sortBy])

  return (
    <div className="space-y-6">
      {/* Sort Controls */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">Showing {filteredAndSortedProducts.length} products</p>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="name">Name A-Z</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAndSortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
