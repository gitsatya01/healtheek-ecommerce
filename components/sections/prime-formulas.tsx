import { ProductCard } from "@/components/products/product-card"
import type { Product } from "@/lib/types"

interface PrimeFormulasProps {
  products: Product[]
}

export function PrimeFormulas({ products }: PrimeFormulasProps) {
  return (
    <section className="py-8 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">Prime Formula's</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Premium health kits and specialized formulas for targeted wellness solutions
          </p>
        </div>

        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 max-w-4xl mx-auto">
              {products.slice(0, 2).map((product) => (
                <div key={product.id} className="col-span-1 md:col-span-1">
                  <ProductCard product={product} />
                </div>
              ))}
              {products.length > 2 && (
                <div className="hidden md:block col-span-1">
                  <ProductCard product={products[2]} />
                </div>
              )}
            </div>

            {products.length > 3 && (
              <div className="text-center mt-6 md:mt-8">
                <a
                  href="/products/category/prime-formula"
                  className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-colors text-sm md:text-base"
                >
                  View All Prime Formulas
                </a>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No Prime Formula products available</p>
          </div>
        )}
      </div>
    </section>
  )
}
