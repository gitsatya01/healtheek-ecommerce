"use client"

import type React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useTransition } from "react"

interface ProductSearchProps {
  searchQuery: string
  sortBy: string
}

export function ProductSearch({ searchQuery, sortBy }: ProductSearchProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [localSearch, setLocalSearch] = useState(searchQuery)

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    // Reset to page 1 when filtering/searching
    if (key !== "page") {
      params.delete("page")
    }

    startTransition(() => {
      router.push(`/products?${params.toString()}`)
    })
  }

  const handleSearch = () => {
    updateSearchParams("search", localSearch)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="space-y-4 bg-white p-4 rounded-lg shadow-sm">
      {/* Mobile Layout */}
      <div className="flex flex-col space-y-4 md:hidden">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search your medicine"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-12 pr-20 h-12 text-base border-gray-200 focus:border-teal-500 focus:ring-teal-500"
            disabled={isPending}
          />
          <Button
            size="sm"
            className="absolute right-2 top-2 bottom-2 bg-teal-600 hover:bg-teal-700 px-4 font-medium"
            onClick={handleSearch}
            disabled={isPending}
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>

        {/* Sort Dropdown */}
        <Select value={sortBy} onValueChange={(value) => updateSearchParams("sort", value)} disabled={isPending}>
          <SelectTrigger className="h-12 border-gray-200 focus:border-teal-500 focus:ring-teal-500">
            <div className="flex items-center">
              <SlidersHorizontal className="w-5 h-5 mr-3 text-teal-600" />
              <SelectValue placeholder="Default Sorting" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default Sorting</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="name-asc">Name: A to Z</SelectItem>
            <SelectItem value="name-desc">Name: Z to A</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex flex-col sm:flex-row gap-4 items-center">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search your medicine"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 pr-12 h-12 text-base"
            disabled={isPending}
          />
          <Button
            size="sm"
            className="absolute right-1 top-1 bottom-1 bg-teal-600 hover:bg-teal-700 px-4"
            onClick={handleSearch}
            disabled={isPending}
          >
            <Search className="w-4 h-4" />
          </Button>
        </div>

        {/* Sort Dropdown */}
        <div className="w-full sm:w-64">
          <Select value={sortBy} onValueChange={(value) => updateSearchParams("sort", value)} disabled={isPending}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Default Sorting" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default Sorting</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="name-asc">Name: A to Z</SelectItem>
              <SelectItem value="name-desc">Name: Z to A</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
