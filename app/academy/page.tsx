import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { PlayCircle, Clock, Users, Star, BookOpen, Award } from "lucide-react"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Academy - HealthEek",
  description: "Learn from health experts and become a certified wellness coach with HealthEek Academy.",
}

export default function AcademyPage() {
  const courses = [
    {
      id: 1,
      title: "Certified Health & Wellness Coach",
      description: "Comprehensive certification program to become a professional health and wellness coach",
      duration: "12 weeks",
      students: "2,500+",
      rating: 4.9,
      price: "₹118,000",
      originalPrice: "₹139,999",
      image: "/placeholder.svg?height=200&width=300",
      featured: true,
      modules: 15,
      certificate: true,
    },
    {
      id: 2,
      title: "Nutrition Specialist Course",
      description: "Master the science of nutrition and help others achieve optimal health through diet",
      duration: "8 weeks",
      students: "1,800+",
      rating: 4.8,
      price: "₹45,000",
      originalPrice: "₹55,000",
      image: "/placeholder.svg?height=200&width=300",
      featured: false,
      modules: 12,
      certificate: true,
    },
    {
      id: 3,
      title: "Fitness & Exercise Science",
      description: "Learn evidence-based fitness training and exercise prescription methodologies",
      duration: "10 weeks",
      students: "1,200+",
      rating: 4.7,
      price: "₹38,000",
      originalPrice: "₹48,000",
      image: "/placeholder.svg?height=200&width=300",
      featured: false,
      modules: 10,
      certificate: true,
    },
    {
      id: 4,
      title: "Mental Health & Wellness",
      description: "Understanding mental health fundamentals and wellness coaching techniques",
      duration: "6 weeks",
      students: "950+",
      rating: 4.6,
      price: "₹28,000",
      originalPrice: "₹35,000",
      image: "/placeholder.svg?height=200&width=300",
      featured: false,
      modules: 8,
      certificate: true,
    },
  ]

  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-teal-600" />,
      title: "Expert-Led Courses",
      description: "Learn from industry-leading health professionals and certified experts",
    },
    {
      icon: <Award className="w-8 h-8 text-teal-600" />,
      title: "Certified Programs",
      description: "Earn internationally recognized certifications upon course completion",
    },
    {
      icon: <Users className="w-8 h-8 text-teal-600" />,
      title: "Community Support",
      description: "Join a thriving community of health professionals and wellness enthusiasts",
    },
    {
      icon: <PlayCircle className="w-8 h-8 text-teal-600" />,
      title: "Interactive Learning",
      description: "Engage with video lessons, practical exercises, and real-world case studies",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-orange-500 text-white w-fit">🎓 Professional Certification</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Transform Lives Through
                <span className="block text-orange-300">Health Education</span>
              </h1>
              <p className="text-xl text-teal-100 max-w-lg">
                Join thousands of students who have become certified health and wellness professionals through our
                comprehensive academy programs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                  Explore Courses
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-teal-600"
                >
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Health Education"
                  width={500}
                  height={400}
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose HealthEek Academy?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our comprehensive learning platform provides everything you need to succeed in the health and wellness
              industry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8">
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Courses</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our comprehensive range of health and wellness certification programs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                {course.featured && (
                  <Badge className="absolute top-4 right-4 bg-orange-500 text-white z-10">Most Popular</Badge>
                )}

                <div className="relative">
                  <Image
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <PlayCircle className="w-16 h-16 text-white" />
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{course.rating}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{course.students} students</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>

                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {course.modules} modules
                    </div>
                    {course.certificate && (
                      <div className="flex items-center">
                        <Award className="w-4 h-4 mr-1" />
                        Certificate
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-teal-600">{course.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">{course.originalPrice}</span>
                    </div>
                    <Button className="bg-teal-600 hover:bg-teal-700">Enroll Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from our graduates who are making a difference in the health and wellness industry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="text-center">
                <CardContent className="pt-8">
                  <div className="w-16 h-16 bg-teal-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=64&width=64"
                      alt="Student"
                      width={64}
                      height={64}
                      className="rounded-full"
                    />
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "The HealthEek Academy program transformed my career. I'm now helping hundreds of clients achieve
                    their wellness goals."
                  </p>
                  <h4 className="font-semibold text-gray-900">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">Certified Wellness Coach</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have transformed their careers and are making a positive impact on people's
            lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
              Browse All Courses
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-teal-600">
              Schedule a Call
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
