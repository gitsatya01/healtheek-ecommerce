import { ProductCard } from "@/components/products/product-card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import type { Product } from "@/lib/types"

interface BusinessToolsProps {
  products: Product[]
}

export function BusinessTools({ products }: BusinessToolsProps) {
  return (
    <section className="py-8 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">Business Tools</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Professional tools and resources for health consultants and business partners
          </p>
        </div>

        {products.length > 0 ? (
          <>
            {/* Static Grid for 1-3 products */}
            {products.length <= 3 ? (
              <div className={`grid gap-4 md:gap-6 max-w-4xl mx-auto ${
                products.length === 1 ? 'grid-cols-1 max-w-sm' : 
                products.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-2xl' :
                'grid-cols-1 md:grid-cols-3'
              }`}>
                {products.map((product) => (
                  <div key={product.id} className="col-span-1">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              /* Carousel for 4+ products */
              <div className="max-w-5xl mx-auto">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-2 md:-ml-4">
                    {products.map((product) => (
                      <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                        <ProductCard product={product} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden md:flex" />
                  <CarouselNext className="hidden md:flex" />
                </Carousel>
              </div>
            )}

            {products.length > 3 && (
              <div className="text-center mt-6 md:mt-8">
                <a
                  href="/products/category/business-tools"
                  className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors text-sm md:text-base"
                >
                  View All Business Tools
                </a>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No business tools available</p>
          </div>
        )}
      </div>
    </section>
  )
}
