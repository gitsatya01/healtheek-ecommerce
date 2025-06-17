import { ProductCard } from "@/components/products/product-card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import type { Product } from "@/lib/types"

interface PopularProductsProps {
  products: Product[]
}

export function PopularProducts({ products }: PopularProductsProps) {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-white via-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Popular Products
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            Our most loved individual supplements for targeted health benefits
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
                  <CarouselPrevious className="hidden md:flex -left-6 bg-white/90 backdrop-blur-sm shadow-lg border-purple-200 hover:bg-purple-50 hover:border-purple-300" />
                  <CarouselNext className="hidden md:flex -right-6 bg-white/90 backdrop-blur-sm shadow-lg border-purple-200 hover:bg-purple-50 hover:border-purple-300" />
                </Carousel>
              </div>
            )}

            {products.length > 3 && (
              <div className="text-center mt-8 md:mt-12">
                <a
                  href="/products/category/popular-products"
                  className="group inline-flex items-center px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm md:text-base"
                >
                  View All Popular Products
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No popular products available</p>
          </div>
        )}
      </div>
    </section>
  )
}
