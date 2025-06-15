"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart } from "lucide-react"
import { useCart } from "@/components/cart/cart-context"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addItem(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const discountPercentage = Math.round(((product.mrpPrice - product.primePrice) / product.mrpPrice) * 100)

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square p-2 md:p-4">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-200"
          />
          {product.isNew && (
            <Badge className="absolute top-1 right-1 md:top-2 md:right-2 bg-orange-500 text-white text-xs">NEW</Badge>
          )}
        </div>
      </Link>

      <div className="p-2 md:p-4 space-y-1 md:space-y-3">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-semibold text-xs md:text-sm text-gray-900 hover:text-teal-600 transition-colors line-clamp-2 leading-tight min-h-[2.5rem] md:min-h-[2.8rem]">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs text-gray-600 line-clamp-1 hidden sm:block">{product.subtitle}</p>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="text-xs">MRP</span>
            <span className="line-through">₹{typeof product.mrpPrice === "number" && !isNaN(product.mrpPrice) ? product.mrpPrice.toFixed(0) : "--"}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Prime</span>
            <div className="flex items-center space-x-1">
              <span className="font-bold text-teal-600 text-sm">
  ₹{typeof product.primePrice === "number" && !isNaN(product.primePrice) ? product.primePrice.toFixed(0) : "--"}
</span>
              <Badge variant="secondary" className="text-xs px-1 py-0 hidden sm:inline-flex">
                {discountPercentage}% OFF
              </Badge>
            </div>
          </div>
        </div>

        <Button
          onClick={handleAddToCart}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white text-xs h-7 md:h-9 md:text-sm"
          size="sm"
        >
          <ShoppingCart className="w-3 h-3 md:w-4 md:h-4 mr-1" />
          <span className="hidden sm:inline">Add To Cart</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>
    </div>
  )
}
