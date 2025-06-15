import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CartPage } from "@/components/cart/cart-page"

export const metadata = {
  title: "Shopping Cart - HealthEek",
  description: "Review your selected health supplements before checkout.",
}

export default function Cart() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <CartPage />
      </main>
      <Footer />
    </div>
  )
}
