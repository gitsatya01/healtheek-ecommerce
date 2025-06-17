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
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-teal-200">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-square p-4 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-contain group-hover:scale-110 transition-transform duration-300"
          />
          {product.isNew && (
            <Badge className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-medium px-2 py-1 shadow-lg">
              NEW
            </Badge>
          )}
          {discountPercentage > 0 && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
              {discountPercentage}% OFF
            </div>
          )}
        </div>
      </Link>

      <div className="p-4 md:p-5 space-y-3">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-bold text-sm md:text-lg text-gray-900 hover:text-teal-600 transition-colors line-clamp-2 leading-snug min-h-[2.5rem] md:min-h-[3.5rem]">
            {product.name}
          </h3>
        </Link>

        <p className="text-xs md:text-sm text-gray-600 line-clamp-2 leading-relaxed">{product.subtitle}</p>

        <div className="space-y-3">
          {/* Price Section */}
          <div className="bg-gray-50 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">MRP</span>
              <span className="text-sm text-gray-500 line-through font-medium">
                ₹{typeof product.mrpPrice === "number" && !isNaN(product.mrpPrice) ? product.mrpPrice.toFixed(0) : "--"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 font-semibold">Prime Price</span>
              <div className="text-right">
                <div className="font-bold text-teal-600 text-xl">
                  ₹{typeof product.primePrice === "number" && !isNaN(product.primePrice) ? product.primePrice.toFixed(0) : "--"}
                </div>
              </div>
            </div>
          </div>

          {/* Rating if available */}
          {product.rating && (
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-3 h-3 ${star <= Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">({product.rating})</span>
              </div>
              {product.reviewCount && (
                <span className="text-gray-500">{product.reviewCount} reviews</span>
              )}
            </div>
          )}
        </div>

        <Button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white text-sm h-11 md:h-12 font-semibold mt-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          size="sm"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          <span>Add To Cart</span>
        </Button>
      </div>
    </div>
  )
}
