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

// Helper function to set cookie via API route
const setCookieViaAPI = async (userData: User) => {
  try {
    await fetch('/api/auth/set-cookie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
  } catch (error) {
    console.error('Failed to set cookie:', error)
  }
}

// Helper function to clear cookie via API route
const clearCookieViaAPI = async () => {
  try {
    await fetch('/api/auth/clear-cookie', {
      method: 'POST',
    })
  } catch (error) {
    console.error('Failed to clear cookie:', error)
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for stored user data
    const checkAuth = () => {
      try {
        if (typeof window !== 'undefined') {
          const storedUser = localStorage.getItem("user")
          if (storedUser) {
            const userData = JSON.parse(storedUser)
            setUser(userData)
            // Sync with cookie for middleware
            setCookieViaAPI(userData)
          }
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
      
      if (typeof window !== 'undefined') {
        localStorage.setItem("user", userJson)
      }
      
      // Set cookie via API route
      await setCookieViaAPI(user)
      
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
      
      if (typeof window !== 'undefined') {
        localStorage.setItem("user", userJson)
      }
      
      // Set cookie via API route
      await setCookieViaAPI(user)
      
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
      
      if (typeof window !== 'undefined') {
        localStorage.removeItem("user")
      }
      
      // Clear cookie via API route
      await clearCookieViaAPI()
      
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