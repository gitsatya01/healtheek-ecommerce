import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-gray-50 to-teal-50 py-12 md:py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                BECOME A GLOBAL
                <span className="block text-teal-600">HEALTH & WELLNESS COACH</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 max-w-md mx-auto lg:mx-0">
                Transform lives with our premium health supplements and comprehensive wellness programs.
              </p>
            </div>

            <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white px-6 sm:px-8 py-3">
              JOIN NOW
            </Button>
          </div>

          <div className="relative mt-8 lg:mt-0">
            <div className="bg-gradient-to-br from-teal-100 to-gray-100 rounded-3xl p-6 sm:p-8 lg:p-12">
              <Image
                src="/placeholder.svg?height=500&width=400"
                alt="Professional Health Coach"
                width={400}
                height={500}
                className="w-full h-auto rounded-2xl"
                priority
              />
            </div>

            {/* Floating Product Cards - Hidden on mobile, visible on tablet+ */}
            <div className="hidden md:block">
              {/* Top Right Card */}
              <div className="absolute -right-2 lg:-right-4 top-4 lg:top-8 bg-white rounded-lg shadow-lg p-3 lg:p-4 max-w-[200px] lg:max-w-xs">
                <div className="flex items-center space-x-2 lg:space-x-3">
                  <Image
                    src="/placeholder.svg?height=60&width=60"
                    alt="ENCYO Product"
                    width={60}
                    height={60}
                    className="rounded w-12 h-12 lg:w-15 lg:h-15"
                  />
                  <div>
                    <h3 className="font-semibold text-xs lg:text-sm">ENCYO</h3>
                    <p className="text-xs text-gray-600 line-clamp-2">A dual blend of herbs & Multivitamins with Omega 3</p>
                    <span className="inline-block bg-orange-500 text-white text-xs px-2 py-1 rounded mt-1">
                      JUST LAUNCHED
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Left Card */}
              <div className="absolute -left-2 lg:-left-4 bottom-4 lg:bottom-8 bg-white rounded-lg shadow-lg p-3 lg:p-4 max-w-[200px] lg:max-w-xs">
                <div className="flex items-center space-x-2 lg:space-x-3">
                  <Image
                    src="/placeholder.svg?height=60&width=60"
                    alt="HALE.O Product"
                    width={60}
                    height={60}
                    className="rounded w-12 h-12 lg:w-15 lg:h-15"
                  />
                  <div>
                    <h3 className="font-semibold text-xs lg:text-sm">HALE.O</h3>
                    <p className="text-xs text-gray-600">A Formula For Overall Health</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Product Cards - Shown below image on mobile */}
            <div className="md:hidden mt-6 space-y-4">
              <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex items-center space-x-3">
                <Image
                  src="/placeholder.svg?height=60&width=60"
                  alt="ENCYO Product"
                  width={60}
                  height={60}
                    className="rounded w-12 h-12"
                />
                  <div className="flex-1">
                  <h3 className="font-semibold text-sm">ENCYO</h3>
                  <p className="text-xs text-gray-600">A dual blend of herbs & Multivitamins with Omega 3</p>
                  <span className="inline-block bg-orange-500 text-white text-xs px-2 py-1 rounded mt-1">
                    JUST LAUNCHED
                  </span>
                </div>
              </div>
            </div>

              <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex items-center space-x-3">
                <Image
                  src="/placeholder.svg?height=60&width=60"
                  alt="HALE.O Product"
                  width={60}
                  height={60}
                    className="rounded w-12 h-12"
                />
                  <div className="flex-1">
                  <h3 className="font-semibold text-sm">HALE.O</h3>
                  <p className="text-xs text-gray-600">A Formula For Overall Health</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
