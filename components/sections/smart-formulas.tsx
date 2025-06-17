import { ProductCard } from "@/components/products/product-card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import type { Product } from "@/lib/types"

interface SmartFormulasProps {
  products: Product[]
}

export function SmartFormulas({ products }: SmartFormulasProps) {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-white via-gray-50 to-teal-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full mb-6">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 9.172V5L8 4z" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Smart Formula's
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            Discover our scientifically formulated combo packs designed for optimal health benefits
          </p>
        </div>

        {products.length > 0 ? (
          <>
            {/* Static Grid for 1-3 products */}
            {products.length <= 3 ? (
              <div className={`grid gap-6 md:gap-8 max-w-6xl mx-auto ${
                products.length === 1 ? 'grid-cols-1 max-w-md' : 
                products.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-3xl' :
                'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}>
                {products.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="col-span-1 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              /* Carousel for 4+ products */
              <div className="max-w-7xl mx-auto">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-3 md:-ml-4">
                    {products.map((product) => (
                      <CarouselItem key={product.id} className="pl-3 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                        <ProductCard product={product} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden md:flex -left-12 lg:-left-16" />
                  <CarouselNext className="hidden md:flex -right-12 lg:-right-16" />
                </Carousel>
              </div>
            )}

            {products.length > 3 && (
              <div className="text-center mt-10 md:mt-12">
                <a
                  href="/products/category/smart-formula-2025"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-semibold rounded-xl hover:from-teal-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <span>View All Smart Formulas</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No Smart Formula products available</p>
          </div>
        )}
      </div>
    </section>
  )
}
