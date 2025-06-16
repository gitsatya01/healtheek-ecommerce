"use client";

import React, { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TestFirebase() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("admin@healtheek.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [testResults, setTestResults] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        addTestResult(`✅ User authenticated: ${user.email}`);
      } else {
        addTestResult("❌ No user authenticated");
      }
    });
    return () => unsubscribe();
  }, []);

  const addTestResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  const testFirebaseConnection = async () => {
    addTestResult("🔄 Testing Firebase connection...");
    
    try {
      // Test Firestore connection
      const testCollection = collection(db, "test");
      await addDoc(testCollection, { test: true, timestamp: new Date() });
      addTestResult("✅ Firestore connection successful");
    } catch (error: any) {
      addTestResult(`❌ Firestore error: ${error.message}`);
    }
  };

  const testLogin = async () => {
    setLoading(true);
    setError("");
    addTestResult("🔄 Testing login...");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      addTestResult(`✅ Login successful: ${userCredential.user.email}`);
      addTestResult(`✅ User ID: ${userCredential.user.uid}`);
    } catch (error: any) {
      const errorMsg = `❌ Login failed: ${error.code} - ${error.message}`;
      setError(errorMsg);
      addTestResult(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const testLogout = async () => {
    try {
      await signOut(auth);
      addTestResult("✅ Logout successful");
    } catch (error: any) {
      addTestResult(`❌ Logout error: ${error.message}`);
    }
  };

  const testCoursesFetch = async () => {
    addTestResult("🔄 Testing courses collection...");
    try {
      const querySnapshot = await getDocs(collection(db, "courses"));
      addTestResult(`✅ Courses collection accessible. Found ${querySnapshot.docs.length} courses`);
    } catch (error: any) {
      addTestResult(`❌ Courses fetch error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Firebase Authentication Test</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button onClick={testFirebaseConnection}>Test Firebase Connection</Button>
              <Button onClick={testLogin} disabled={loading}>
                {loading ? "Testing..." : "Test Login"}
              </Button>
              <Button onClick={testLogout} disabled={!user}>Test Logout</Button>
              <Button onClick={testCoursesFetch}>Test Courses Collection</Button>
            </div>

            {user && (
              <div className="p-4 bg-green-50 border border-green-200 rounded">
                <h3 className="font-medium text-green-800">Current User:</h3>
                <p className="text-green-700">Email: {user.email}</p>
                <p className="text-green-700">UID: {user.uid}</p>
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded">
                <p className="text-red-700">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm max-h-96 overflow-y-auto">
              {testResults.length === 0 ? (
                <p>No tests run yet. Click the buttons above to test Firebase functionality.</p>
              ) : (
                testResults.map((result, index) => (
                  <div key={index} className="mb-1">{result}</div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Firebase Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 p-4 rounded">
              <pre className="text-sm">
{`Project ID: ecom-admin-a4b0b
Auth Domain: ecom-admin-a4b0b.firebaseapp.com
API Key: AIzaSyAZ8FPTo1OZegHHde0L87Gp3AWQ9jTETIQ`}
              </pre>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button 
            onClick={() => window.location.href = '/admin/login'}
            className="bg-teal-600 hover:bg-teal-700"
          >
            Go to Admin Login
          </Button>
        </div>
      </div>
    </div>
  );
} 