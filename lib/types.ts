export interface Product {
  id: string
  name: string
  slug: string
  subtitle: string
  description: string
  image: string
  mrpPrice: number
  primePrice: number
  category: string
  featured: boolean
  isNew?: boolean
  inStock: boolean
  rating?: number
  reviewCount?: number
  ingredients?: string[]
  benefits?: string[]
}

export interface Category {
  id: string
  name: string
  description?: string
  productCount: number
}

export interface CartItem extends Product {
  quantity: number
}
