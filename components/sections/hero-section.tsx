import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-gray-50 to-teal-50 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                BECOME A GLOBAL
                <span className="block text-teal-600">HEALTH & WELLNESS COACH</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-md">
                Transform lives with our premium health supplements and comprehensive wellness programs.
              </p>
            </div>

            <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3">
              JOIN NOW
            </Button>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-teal-100 to-gray-100 rounded-3xl p-8 lg:p-12">
              <Image
                src="/placeholder.svg?height=500&width=400"
                alt="Professional Health Coach"
                width={400}
                height={500}
                className="w-full h-auto rounded-2xl"
                priority
              />
            </div>

            {/* Floating Product Cards */}
            <div className="absolute -right-4 top-8 bg-white rounded-lg shadow-lg p-4 max-w-xs">
              <div className="flex items-center space-x-3">
                <Image
                  src="/placeholder.svg?height=60&width=60"
                  alt="ENCYO Product"
                  width={60}
                  height={60}
                  className="rounded"
                />
                <div>
                  <h3 className="font-semibold text-sm">ENCYO</h3>
                  <p className="text-xs text-gray-600">A dual blend of herbs & Multivitamins with Omega 3</p>
                  <span className="inline-block bg-orange-500 text-white text-xs px-2 py-1 rounded mt-1">
                    JUST LAUNCHED
                  </span>
                </div>
              </div>
            </div>

            <div className="absolute -left-4 bottom-8 bg-white rounded-lg shadow-lg p-4 max-w-xs">
              <div className="flex items-center space-x-3">
                <Image
                  src="/placeholder.svg?height=60&width=60"
                  alt="HALE.O Product"
                  width={60}
                  height={60}
                  className="rounded"
                />
                <div>
                  <h3 className="font-semibold text-sm">HALE.O</h3>
                  <p className="text-xs text-gray-600">A Formula For Overall Health</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
