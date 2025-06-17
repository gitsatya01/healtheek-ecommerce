export interface Product {
  id: string
  name: string
  slug: string
  subtitle: string
  description: string
  image: string // Primary image (for backward compatibility)
  images?: string[] // Additional images (optional)
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
  icon?: string
  colorScheme?: string
}

export interface CartItem extends Product {
  quantity: number
}
