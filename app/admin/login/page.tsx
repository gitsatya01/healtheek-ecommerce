// app/admin/login/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Shield, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const { user, userData, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("admin@healtheek.com");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const router = useRouter();

  const addDebugInfo = (info: string) => {
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${info}`]);
  };

  useEffect(() => {
    if (!authLoading) {
      if (user && userData) {
        addDebugInfo(`User authenticated: ${user.email}`);
        if (userData.role === 'admin') {
          addDebugInfo("User has admin role, redirecting to dashboard");
          router.push("/admin/dashboard");
        } else {
          addDebugInfo(`User has role: ${userData.role}, redirecting to appropriate page`);
          if (userData.role === 'user') {
            router.push("/dashboard");
          } else {
            router.push("/login");
          }
        }
      } else {
        addDebugInfo("No user authenticated");
      }
    }
  }, [user, userData, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    addDebugInfo(`Attempting login with email: ${email}`);

    try {
      addDebugInfo("Calling signInWithEmailAndPassword...");
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      addDebugInfo(`Login successful for user: ${userCredential.user.email}`);
      addDebugInfo(`User UID: ${userCredential.user.uid}`);
      
      const token = await userCredential.user.getIdToken();
      addDebugInfo("Got ID token, setting cookie");
      
      document.cookie = `token=${token}; path=/; max-age=86400`; // 24 hours
      
      addDebugInfo("Redirecting to dashboard...");
      router.push("/admin/dashboard");
      
    } catch (err: any) {
      addDebugInfo(`Login error: ${err.code} - ${err.message}`);
      console.error("Login error:", err);
      
      let errorMessage = "Login failed. Please try again.";
      
      switch (err.code) {
        case "auth/user-not-found":
          errorMessage = "No admin account found with this email. Please check the email address.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password. Please try again.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address format.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many failed attempts. Please try again later.";
          break;
        case "auth/network-request-failed":
          errorMessage = "Network error. Please check your internet connection.";
          break;
        case "auth/invalid-credential":
          errorMessage = "Invalid credentials. Please check your email and password.";
          break;
        default:
          errorMessage = `Authentication error: ${err.message}`;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const testFirebaseConnection = async () => {
    addDebugInfo("Testing Firebase connection...");
    try {
      // Test if Firebase is initialized
      if (auth) {
        addDebugInfo("✅ Firebase Auth is initialized");
        addDebugInfo(`Auth domain: ${auth.config.authDomain}`);
        addDebugInfo(`Project ID: ${auth.app.options.projectId}`);
      } else {
        addDebugInfo("❌ Firebase Auth is not initialized");
      }
    } catch (error: any) {
      addDebugInfo(`❌ Firebase connection error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Admin Login</CardTitle>
            <p className="text-gray-600 mt-2">Access your HealthEek admin dashboard</p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@healtheek.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex gap-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 h-11 bg-teal-600 hover:bg-teal-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={testFirebaseConnection}
                  disabled={loading}
                  className="h-11"
                >
                  Test
                </Button>
              </div>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Demo Credentials:</h4>
              <div className="text-xs text-gray-600 space-y-1">
                <p><strong>Email:</strong> admin@healtheek.com</p>
                <p><strong>Password:</strong> admin123</p>
                <p className="text-orange-600 mt-2">
                  ⚠️ User created automatically via script
                </p>
              </div>
            </div>

            {debugInfo.length > 0 && (
              <div className="mt-4 p-3 bg-gray-900 text-green-400 rounded text-xs font-mono max-h-32 overflow-y-auto">
                <div className="text-white mb-1">Debug Info:</div>
                {debugInfo.map((info, index) => (
                  <div key={index} className="mb-1">{info}</div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6 space-y-2">
          <p className="text-sm text-gray-600">
            Protected by Firebase Authentication
          </p>
          <Button
            variant="link"
            onClick={() => window.location.href = '/test-firebase'}
            className="text-teal-600 hover:text-teal-700"
          >
            🔧 Advanced Firebase Testing
          </Button>
        </div>
      </div>
    </div>
  );
}
