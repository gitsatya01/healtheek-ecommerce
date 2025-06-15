import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/components/cart/cart-context"
import { AuthProvider } from "@/lib/auth-context"
import { Toaster } from "@/components/ui/toaster"
import { initAnalytics } from '@/lib/analytics'

const inter = Inter({ subsets: ["latin"] })

// Initialize analytics
if (typeof window !== 'undefined') {
  initAnalytics();
}

export const metadata: Metadata = {
  title: "HealthEek - Premium Health & Wellness Supplements",
  description:
    "Discover premium health and wellness supplements. From smart formulas to individual products, find everything you need for optimal health.",
  keywords: "health supplements, wellness products, smart formulas, nutrition, vitamins",
  authors: [{ name: "HealthEek" }],
  openGraph: {
    title: "HealthEek - Premium Health & Wellness Supplements",
    description: "Discover premium health and wellness supplements for optimal health.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
