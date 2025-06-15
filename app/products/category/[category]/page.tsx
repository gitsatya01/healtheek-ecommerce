import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CategorySidebar } from "@/components/products/category-sidebar"
import { ProductSearch } from "@/components/products/product-search"
import { ProductGridSSR } from "@/components/products/product-grid-ssr"
import { getProducts, getCategories, getCategory } from "@/lib/data"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ProductGrid } from "@/components/products/product-grid"
import { ProductFilters } from "@/components/products/product-filters"

interface Props {
  params: {
    category: string
  }
  searchParams: {
    sort?: string
    search?: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = await getCategory(params.category)

  if (!category) {
    return {
      title: "Category Not Found",
    }
  }

  return {
    title: category.name,
    description: `Browse our collection of ${category.name}`,
  }
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({
    category: category.id,
  }))
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const [products, categories, category] = await Promise.all([
    getProducts(),
    getCategories(),
    getCategory(params.category),
  ])

  if (!category) {
    notFound()
  }

  const filteredProducts = products.filter((product) => product.category === category.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{category.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <ProductFilters />
        <div className="md:col-span-3">
          <ProductGrid 
            products={filteredProducts} 
            searchParams={{
              category: params.category,
              sort: searchParams.sort,
              search: searchParams.search,
            }}
          />
        </div>
      </div>
    </div>
  )
}
