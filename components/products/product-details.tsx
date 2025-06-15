"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Star, ShoppingCart, Heart, Share2 } from "lucide-react"
import { useCart } from "@/components/cart/cart-context"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/types"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
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
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative bg-white rounded-lg shadow-sm overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-contain p-8"
              priority
            />
            {product.isNew && <Badge className="absolute top-4 right-4 bg-orange-500 text-white">NEW</Badge>}
          </div>
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
