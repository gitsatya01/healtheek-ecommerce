import type React from "react"
import { ProductCard } from "@/components/products/product-card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import type { Product } from "@/lib/types"

interface DynamicCategoryProps {
  products: Product[]
  categoryName: string
  categorySlug: string
  description?: string
  categoryIcon?: string
  categoryColorScheme?: string
}

// Get colors by color scheme name
const getCategoryColorsByScheme = (colorScheme: string) => {
  const colorMap: Record<string, {
    background: string
    icon: string
    button: string
    carousel: string
  }> = {
    'healtheek-teal': {
      background: 'from-white via-teal-50 to-emerald-50',
      icon: 'from-teal-600 to-emerald-600',
      button: 'from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700',
      carousel: 'border-teal-200 hover:bg-teal-50 hover:border-teal-300'
    },
    'health-green': {
      background: 'from-white via-emerald-50 to-green-50',
      icon: 'from-emerald-500 to-green-500',
      button: 'from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700',
      carousel: 'border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300'
    },
    'medical-blue': {
      background: 'from-white via-blue-50 to-indigo-50',
      icon: 'from-blue-500 to-indigo-500',
      button: 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700',
      carousel: 'border-blue-200 hover:bg-blue-50 hover:border-blue-300'
    },
    'wellness-purple': {
      background: 'from-white via-purple-50 to-violet-50',
      icon: 'from-purple-500 to-violet-500',
      button: 'from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700',
      carousel: 'border-purple-200 hover:bg-purple-50 hover:border-purple-300'
    },
    'vitality-orange': {
      background: 'from-white via-orange-50 to-amber-50',
      icon: 'from-orange-500 to-amber-500',
      button: 'from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700',
      carousel: 'border-orange-200 hover:bg-orange-50 hover:border-orange-300'
    },
    'energy-yellow': {
      background: 'from-white via-yellow-50 to-amber-50',
      icon: 'from-yellow-500 to-amber-500',
      button: 'from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700',
      carousel: 'border-yellow-200 hover:bg-yellow-50 hover:border-yellow-300'
    },
    'heart-red': {
      background: 'from-white via-red-50 to-rose-50',
      icon: 'from-red-500 to-rose-500',
      button: 'from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700',
      carousel: 'border-red-200 hover:bg-red-50 hover:border-red-300'
    },
    'feminine-pink': {
      background: 'from-white via-pink-50 to-rose-50',
      icon: 'from-pink-500 to-rose-500',
      button: 'from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700',
      carousel: 'border-pink-200 hover:bg-pink-50 hover:border-pink-300'
    },
    'fresh-cyan': {
      background: 'from-white via-cyan-50 to-teal-50',
      icon: 'from-cyan-500 to-teal-500',
      button: 'from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700',
      carousel: 'border-cyan-200 hover:bg-cyan-50 hover:border-cyan-300'
    },
    'neutral-gray': {
      background: 'from-white via-gray-50 to-slate-50',
      icon: 'from-gray-500 to-slate-500',
      button: 'from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700',
      carousel: 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'
    }
  }

  return colorMap[colorScheme] || colorMap['healtheek-teal']
}

// Color schemes for different categories
const getCategoryColors = (categorySlug: string) => {
  const colorMap: Record<string, {
    background: string
    icon: string
    button: string
    carousel: string
  }> = {
    'daily-nutrition': {
      background: 'from-white via-green-50 to-emerald-50',
      icon: 'from-green-500 to-emerald-500',
      button: 'from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700',
      carousel: 'border-green-200 hover:bg-green-50 hover:border-green-300'
    },
    'diabetes-care': {
      background: 'from-white via-red-50 to-rose-50',
      icon: 'from-red-500 to-rose-500',
      button: 'from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700',
      carousel: 'border-red-200 hover:bg-red-50 hover:border-red-300'
    },
    'women-health': {
      background: 'from-white via-pink-50 to-rose-50',
      icon: 'from-pink-500 to-rose-500',
      button: 'from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700',
      carousel: 'border-pink-200 hover:bg-pink-50 hover:border-pink-300'
    },
    'men-health': {
      background: 'from-white via-blue-50 to-cyan-50',
      icon: 'from-blue-500 to-cyan-500',
      button: 'from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700',
      carousel: 'border-blue-200 hover:bg-blue-50 hover:border-blue-300'
    },
    'kids-health': {
      background: 'from-white via-yellow-50 to-orange-50',
      icon: 'from-yellow-500 to-orange-500',
      button: 'from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700',
      carousel: 'border-yellow-200 hover:bg-yellow-50 hover:border-yellow-300'
    },
    'cancer-support': {
      background: 'from-white via-orange-50 to-amber-50',
      icon: 'from-orange-500 to-amber-500',
      button: 'from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700',
      carousel: 'border-orange-200 hover:bg-orange-50 hover:border-orange-300'
    },
    'fitness-sports': {
      background: 'from-white via-cyan-50 to-blue-50',
      icon: 'from-cyan-500 to-blue-500',
      button: 'from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700',
      carousel: 'border-cyan-200 hover:bg-cyan-50 hover:border-cyan-300'
    },
    'heart-health': {
      background: 'from-white via-red-50 to-pink-50',
      icon: 'from-red-500 to-pink-500',
      button: 'from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700',
      carousel: 'border-red-200 hover:bg-red-50 hover:border-red-300'
    },
    'brain-health': {
      background: 'from-white via-purple-50 to-indigo-50',
      icon: 'from-purple-500 to-indigo-500',
      button: 'from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700',
      carousel: 'border-purple-200 hover:bg-purple-50 hover:border-purple-300'
    }
  }

  // Default colors for unknown categories
  return colorMap[categorySlug] || {
    background: 'from-white via-gray-50 to-slate-50',
    icon: 'from-gray-500 to-slate-500',
    button: 'from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700',
    carousel: 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'
  }
}

// Icons for different categories - return path strings
const getCategoryIconPath = (categorySlug: string) => {
  const iconMap: Record<string, string> = {
    'daily-nutrition': "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z",
    'diabetes-care': "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    'women-health': "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z",
    'men-health': "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    'kids-health': "M14.828 14.828a4 4 0 01-5.656 0M9 10h1.01M15 10h1.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    'cancer-support': "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    'fitness-sports': "M13 10V3L4 14h7v7l9-11h-7z",
    'heart-health': "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
    'brain-health': "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
  }

  // Default icon for unknown categories
  return iconMap[categorySlug] || "M19 11H5m14-4H3m16 8H5m14-4H3"
}

export function DynamicCategory({ 
  products, 
  categoryName, 
  categorySlug, 
  description, 
  categoryIcon, 
  categoryColorScheme 
}: DynamicCategoryProps) {
  // Use database colors or fallback to hardcoded ones
  const colors = categoryColorScheme ? getCategoryColorsByScheme(categoryColorScheme) : getCategoryColors(categorySlug)
  
  // Use database icon or fallback to hardcoded ones
  const iconPath = categoryIcon || getCategoryIconPath(categorySlug)

  // Generate description if not provided
  const defaultDescription = description || `High-quality ${categoryName.toLowerCase()} products for your health and wellness needs`

  return (
    <section className={`py-12 md:py-20 bg-gradient-to-br ${colors.background}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${colors.icon} rounded-full mb-6`}>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            {categoryName}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            {defaultDescription}
          </p>
        </div>

        {products.length > 0 ? (
          <>
            {/* Static Grid for 1-3 products */}
            {products.length <= 3 ? (
              <div className={`grid gap-6 md:gap-8 max-w-6xl mx-auto ${
                products.length === 1 ? 'grid-cols-1 max-w-md' : 
                products.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-3xl' :
                'grid-cols-1 md:grid-cols-3'
              }`}>
                {products.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="animate-fade-in-up"
                    style={{ 
                      animationDelay: `${index * 150}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              /* Carousel for 4+ products */
              <div className="max-w-7xl mx-auto relative">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {products.map((product, index) => (
                      <CarouselItem 
                        key={product.id} 
                        className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                      >
                        <div 
                          className="animate-fade-in-up"
                          style={{ 
                            animationDelay: `${index * 100}ms`,
                            animationFillMode: 'both'
                          }}
                        >
                          <ProductCard product={product} />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className={`hidden md:flex -left-6 bg-white/90 backdrop-blur-sm shadow-lg ${colors.carousel}`} />
                  <CarouselNext className={`hidden md:flex -right-6 bg-white/90 backdrop-blur-sm shadow-lg ${colors.carousel}`} />
                </Carousel>
              </div>
            )}

            {products.length > 3 && (
              <div className="text-center mt-8 md:mt-12">
                <a
                  href={`/products/category/${categorySlug}`}
                  className={`group inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r ${colors.button} text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base`}
                >
                  View All {categoryName}
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No {categoryName.toLowerCase()} products available</p>
          </div>
        )}
      </div>
    </section>
  )
} 