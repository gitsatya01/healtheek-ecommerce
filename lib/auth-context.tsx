"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface User {
  id: string
  email: string
  name: string
  role: "customer" | "admin"
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Helper function to set cookie
const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
}

// Helper function to delete cookie
const deleteCookie = (name: string) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for stored user data
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem("user")
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          setUser(userData)
          // Sync with cookie for middleware
          setCookie("user", storedUser)
        }
      } catch (error) {
        console.error("Error reading auth state:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      
      // Check for admin credentials
      let user: User
      if (email === "admin@healtheek.com" && password === "admin123") {
        user = {
          id: "admin",
          email,
          name: "Admin User",
          role: "admin",
        }
      } else {
        // Regular user login
        user = {
          id: "1",
          email,
          name: "Test User",
          role: "customer",
        }
      }
      
      const userJson = JSON.stringify(user)
      setUser(user)
      localStorage.setItem("user", userJson)
      setCookie("user", userJson)
      
      toast.success("Successfully signed in!")
      
      // Redirect based on role
      if (user.role === "admin") {
        router.push("/admin")
      } else {
        router.push("/")
      }
    } catch (error) {
      toast.error("Failed to sign in. Please check your credentials.")
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (name: string, email: string, password: string) => {
    try {
      setLoading(true)
      // Here you would typically make an API call to your backend
      // For now, we'll simulate a successful registration
      const user: User = {
        id: "1",
        email,
        name,
        role: "customer",
      }
      const userJson = JSON.stringify(user)
      setUser(user)
      localStorage.setItem("user", userJson)
      setCookie("user", userJson)
      toast.success("Successfully signed up!")
      router.push("/")
    } catch (error) {
      toast.error("Failed to sign up. Please try again.")
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      // Here you would typically make an API call to your backend
      setUser(null)
      localStorage.removeItem("user")
      deleteCookie("user")
      toast.success("Successfully signed out!")
      router.push("/")
    } catch (error) {
      toast.error("Failed to sign out. Please try again.")
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
} 