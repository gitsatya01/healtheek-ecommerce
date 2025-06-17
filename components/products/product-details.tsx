"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react"
import { useCart } from "@/components/cart/cart-context"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import type { Product } from "@/lib/types"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const { addItem } = useCart()
  const { toast } = useToast()
  
  // Combine primary image with additional images
  const allImages = [product.image, ...(product.images || [])].filter(img => img && img.trim() !== "")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const handleAddToCart = () => {
    addItem(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }

  const discountPercentage = Math.round(((product.mrpPrice - product.primePrice) / product.mrpPrice) * 100)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image Display */}
          <div className="aspect-square relative bg-white rounded-lg shadow-sm overflow-hidden group">
            <Image
              src={allImages[currentImageIndex] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain p-8"
              priority
            />
            {product.isNew && <Badge className="absolute top-4 right-4 bg-orange-500 text-white">NEW</Badge>}
            
            {/* Navigation arrows for multiple images */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {allImages.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {allImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square relative bg-white rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageIndex === index 
                      ? 'border-teal-500 ring-2 ring-teal-200' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-contain p-2"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Image Counter */}
          {allImages.length > 1 && (
            <div className="text-center text-sm text-gray-500">
              {currentImageIndex + 1} of {allImages.length}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-lg text-gray-600">{product.subtitle}</p>
          </div>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating!) ? "text-yellow-400 fill-current" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          )}

          {/* Pricing */}
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-teal-600">₹{product.primePrice.toFixed(2)}</span>
              <span className="text-xl text-gray-500 line-through">₹{product.mrpPrice.toFixed(2)}</span>
              <Badge variant="secondary" className="text-sm">
                {discountPercentage}% OFF
              </Badge>
            </div>
            <p className="text-sm text-gray-600">Prime Price (Inclusive of all taxes)</p>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h3 className="font-semibold text-lg mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Benefits */}
          {product.benefits && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Key Benefits</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {product.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Ingredients */}
          {product.ingredients && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Key Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient, index) => (
                  <Badge key={index} variant="outline">
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-4">
            <div className="flex space-x-4">
              <Button onClick={handleAddToCart} className="flex-1 bg-teal-600 hover:bg-teal-700 text-white" size="lg">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>

              <Button variant="outline" size="lg">
                <Heart className="w-5 h-5" />
              </Button>

              <Button variant="outline" size="lg">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p>✓ Free shipping on orders above ₹999</p>
              <p>✓ Easy returns within 30 days</p>
              <p>✓ Secure payment options</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
