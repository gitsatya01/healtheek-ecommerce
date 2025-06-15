"use client"

import Link from "next/link"
import { ChevronRight, ChevronDown, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"
import type { Category } from "@/lib/types"

interface CategorySidebarProps {
  categories: Category[]
  selectedCategory: string
}

export function CategorySidebar({ categories, selectedCategory }: CategorySidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Mobile Collapsible Header */}
      <div className="lg:hidden">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-4 h-auto">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-teal-600" />
                <span className="font-semibold text-teal-600">Shop by Category</span>
              </div>
              {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 pb-4">
            <CategoryList categories={categories} selectedCategory={selectedCategory} />
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Desktop Always Visible */}
      <div className="hidden lg:block p-6">
        <h2 className="text-xl font-semibold text-teal-600 mb-6 border-b-2 border-teal-600 pb-2">Shop by Category</h2>
        <CategoryList categories={categories} selectedCategory={selectedCategory} />
      </div>
    </div>
  )
}

function CategoryList({ categories, selectedCategory }: { categories: Category[]; selectedCategory: string }) {
  return (
    <div className="space-y-1 md:space-y-2">
      <Link href="/products">
        <Button
          variant={selectedCategory === "all" ? "default" : "ghost"}
          className={`w-full justify-between text-left h-auto py-2 md:py-3 px-3 md:px-4 text-sm md:text-base ${
            selectedCategory === "all"
              ? "bg-teal-600 text-white hover:bg-teal-700"
              : "text-gray-700 hover:text-teal-600 hover:bg-teal-50"
          }`}
        >
          <span>All Products</span>
          <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
        </Button>
      </Link>

      {categories.map((category) => (
        <Link key={category.id} href={`/products/category/${category.id}`}>
          <Button
            variant={selectedCategory === category.id ? "default" : "ghost"}
            className={`w-full justify-between text-left h-auto py-2 md:py-3 px-3 md:px-4 text-sm md:text-base ${
              selectedCategory === category.id
                ? "bg-teal-600 text-white hover:bg-teal-700"
                : "text-gray-700 hover:text-teal-600 hover:bg-teal-50"
            }`}
          >
            <span className="truncate pr-2">{category.name}</span>
            <ChevronRight className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
          </Button>
        </Link>
      ))}
    </div>
  )
}
