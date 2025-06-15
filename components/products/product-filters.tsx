"use client"

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

export function ProductFilters() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])

  const categories = [
    { id: "smart-formula", name: "Smart Formulas", count: 6 },
    { id: "prime-formula", name: "Prime Formulas", count: 5 },
    { id: "popular", name: "Popular Products", count: 15 },
    { id: "business-tools", name: "Business Tools", count: 3 },
  ]

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId])
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    }
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 10000])
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters</h3>
        {selectedCategories.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <Separator />

      {/* Categories */}
      <div className="space-y-4">
        <h4 className="font-medium">Categories</h4>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
              />
              <Label htmlFor={category.id} className="text-sm font-normal cursor-pointer flex-1">
                {category.name}
              </Label>
              <span className="text-xs text-gray-500">({category.count})</span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-4">
        <h4 className="font-medium">Price Range</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm">
            <span>₹{priceRange[0]}</span>
            <span>-</span>
            <span>₹{priceRange[1]}</span>
          </div>
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
            className="w-full"
          />
        </div>
      </div>

      <Separator />

      {/* Availability */}
      <div className="space-y-4">
        <h4 className="font-medium">Availability</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="in-stock" defaultChecked />
            <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
              In Stock
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="out-of-stock" />
            <Label htmlFor="out-of-stock" className="text-sm font-normal cursor-pointer">
              Out of Stock
            </Label>
          </div>
        </div>
      </div>
    </div>
  )
}
