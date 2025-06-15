"use client"

import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram, Globe, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-teal-600 text-white">
      {/* Explore Section */}
      <div className="bg-teal-500 py-12 relative">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-2">EXPLORE</h2>
          <h3 className="text-2xl font-bold">YOUR HEALTH</h3>
        </div>
        <Button
          onClick={scrollToTop}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white text-teal-600 hover:bg-gray-100 rounded-full w-12 h-12"
          size="sm"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      </div>

      {/* Main Footer Content */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Social */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-white rounded-full"></div>
                <span className="text-xl font-bold">HEALTHEEK</span>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Find us in social media</h4>
                <div className="flex space-x-4">
                  <Link href="#" className="hover:text-teal-200 transition-colors">
                    <Facebook className="w-5 h-5" />
                  </Link>
                  <Link href="#" className="hover:text-teal-200 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </Link>
                  <Link href="#" className="hover:text-teal-200 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </Link>
                  <Link href="#" className="hover:text-teal-200 transition-colors">
                    <Instagram className="w-5 h-5" />
                  </Link>
                  <Link href="#" className="hover:text-teal-200 transition-colors">
                    <Globe className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Information */}
            <div>
              <h4 className="font-semibold mb-6 text-lg">Information</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-200 hover:text-white transition-colors">
                    Overview
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-200 hover:text-white transition-colors">
                    Term of Use
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-200 hover:text-white transition-colors">
                    Shipping Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-200 hover:text-white transition-colors">
                    Safe And Secure
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-200 hover:text-white transition-colors">
                    Cancellations & Modifications
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-200 hover:text-white transition-colors">
                    Returns & Refunds
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-200 hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-200 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Access Links */}
            <div>
              <h4 className="font-semibold mb-6 text-lg">Access Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-200 hover:text-white transition-colors">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-200 hover:text-white transition-colors">
                    Store Login
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-200 hover:text-white transition-colors">
                    Hospital Login
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-200 hover:text-white transition-colors">
                    Enquiry
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-6 text-lg">Contact</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-gray-200 hover:text-white transition-colors">
                    CORPORATE OFFICE
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-200 hover:text-white transition-colors">
                    REGISTERED OFFICE
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-200 hover:text-white transition-colors">
                    BRANCH OFFICE
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-200 hover:text-white transition-colors">
                    HEALTHEEK LLC
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-200 hover:text-white transition-colors">
                    HEALTHEEK UK LIMITED
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-teal-700 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p className="text-gray-200">© Copyrights 2024 HealthEek (P) Limited. All rights reserved</p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <Link href="#" className="text-gray-200 hover:text-white transition-colors">
                Terms Of Use
              </Link>
              <span className="text-gray-400">|</span>
              <Link href="#" className="text-gray-200 hover:text-white transition-colors">
                Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
