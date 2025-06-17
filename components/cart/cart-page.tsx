"use client"

import { useCart } from "./cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Trash2, Plus, Minus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function CartPage() {
  const { items, total, updateQuantity, removeItem } = useCart()

  if (items.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-lg shadow-sm">
        <div className="max-w-md mx-auto px-4">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10v6a1 1 0 001 1h12a1 1 0 001-1v-6M9 21h6" />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8 text-sm md:text-base">
            Looks like you haven't added any products to your cart yet. 
            Start shopping to fill it up!
          </p>
          <Link href="/products">
            <Button className="bg-teal-600 hover:bg-teal-700 px-6 py-3 text-sm md:text-base">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-600 text-sm md:text-base">{items.length} {items.length === 1 ? 'item' : 'items'} in your cart</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              {/* Mobile Layout */}
              <div className="md:hidden p-4">
                <div className="flex space-x-4 mb-4">
                  <div className="relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.subtitle}</p>
                    <p className="font-bold text-teal-600 text-lg">₹{item.primePrice.toFixed(2)}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Quantity:</span>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="w-3 h-3" />
                    </Button>

                    <span className="font-medium text-gray-900 min-w-[2rem] text-center">{item.quantity}</span>

                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:block p-6">
                <div className="flex items-center space-x-6">
                  <div className="relative w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.subtitle}</p>
                    <p className="font-bold text-teal-600 text-xl">₹{item.primePrice.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="h-9 w-9 p-0"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>

                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                      className="w-20 text-center"
                      min="1"
                    />

                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-9 w-9 p-0"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 h-fit sticky top-4">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

          <div className="space-y-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Tax (18% GST)</span>
              <span>₹{(total * 0.18).toFixed(2)}</span>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between font-bold text-lg text-gray-900">
              <span>Total</span>
              <span className="text-teal-600">₹{(total * 1.18).toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Link href="/checkout" className="block">
              <Button className="w-full bg-teal-600 hover:bg-teal-700 h-12 text-base">
                Proceed to Checkout
              </Button>
            </Link>

            <Link href="/products" className="block">
              <Button variant="outline" className="w-full h-12 text-base">
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Secure Checkout
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                Free Returns
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
