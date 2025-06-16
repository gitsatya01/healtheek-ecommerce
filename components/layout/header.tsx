"use client"

import Link from "next/link"
import { ShoppingCart, User, Menu, LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/components/cart/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const { items } = useCart()
  const { user, userData, loading } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Smart Clinic", href: "/smart-clinic" },
    { name: "Academy", href: "/academy" },
    { name: "Health Services", href: "/health-services" },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-gray-700 hover:text-teal-600 font-medium py-2 px-4 rounded-lg hover:bg-teal-50 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <hr className="my-4" />
                  {!loading && (
                    <>
                      {user ? (
                        <div className="space-y-2">
                          <div className="px-4 py-2">
                            <p className="text-sm font-medium text-gray-900">
                              {userData?.email?.split('@')[0]}
                            </p>
                            <p className="text-xs text-gray-500 capitalize">
                              {userData?.role} Account
                            </p>
                          </div>
                          <Link href={userData?.role === 'admin' ? '/admin/dashboard' : '/cart'}>
                            <Button variant="outline" className="justify-start w-full" onClick={() => setIsMobileMenuOpen(false)}>
                              <Settings className="w-4 h-4 mr-2" />
                              {userData?.role === 'admin' ? 'Dashboard' : 'My Cart'}
                            </Button>
                          </Link>
                          <Button 
                            variant="outline" 
                            className="justify-start w-full text-red-600 hover:text-red-700" 
                            onClick={() => {
                              handleLogout()
                              setIsMobileMenuOpen(false)
                            }}
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <Link href="/login">
                            <Button variant="outline" className="justify-start w-full" onClick={() => setIsMobileMenuOpen(false)}>
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                          </Link>
                          <Link href="/signup">
                            <Button className="justify-start w-full bg-blue-600 hover:bg-blue-700" onClick={() => setIsMobileMenuOpen(false)}>
                              <User className="w-4 h-4 mr-2" />
                              Sign Up
                            </Button>
                          </Link>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-teal-500 rounded-full"></div>
            <span className="text-lg md:text-xl font-bold text-teal-600">HEALTHEEK</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-teal-600 font-medium transition-colors text-sm lg:text-base"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Desktop Auth */}
            {!loading && (
              <>
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="hidden md:flex">
                        <User className="w-4 h-4 mr-2" />
                        <span className="hidden lg:inline">{userData?.email?.split('@')[0]}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>
                        <div>
                          <p className="font-medium">{userData?.email?.split('@')[0]}</p>
                          <p className="text-xs text-gray-500 capitalize">{userData?.role} Account</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={userData?.role === 'admin' ? '/admin/dashboard' : '/cart'}>
                          <Settings className="w-4 h-4 mr-2" />
                          {userData?.role === 'admin' ? 'Dashboard' : 'My Cart'}
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <div className="hidden md:flex items-center space-x-2">
                    <Link href="/login">
                      <Button variant="ghost" size="sm">
              <User className="w-4 h-4 mr-2" />
              <span className="hidden lg:inline">Login</span>
            </Button>
                    </Link>
                    <Link href="/signup">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <span className="hidden lg:inline">Sign Up</span>
                        <span className="lg:hidden">Join</span>
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-teal-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
