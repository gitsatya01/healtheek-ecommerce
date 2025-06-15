import { ProductCard } from "@/components/products/product-card"
import type { Product } from "@/lib/types"

interface PopularProductsProps {
  products: Product[]
}

export function PopularProducts({ products }: PopularProductsProps) {
  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">Popular Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Our most loved individual supplements for targeted health benefits
          </p>
        </div>

        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-6 max-w-4xl mx-auto">
              {products.slice(0, 3).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {products.length > 3 && (
              <div className="text-center mt-6 md:mt-8">
                <a
                  href="/products/category/popular-products"
                  className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors text-sm md:text-base"
                >
                  View All Popular Products
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
