"use client";

import React, { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Edit2, Trash2, Plus, Star, Clock, Users, BookOpen, AlertCircle, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import Image from "next/image";

interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  duration: string;
  modules: number;
  certificate: boolean;
  rating: number;
  studentCount: number;
  originalPrice: number;
  discountedPrice: number;
}

export default function CoursesAdminPage() {
  const { user, userData, loading: authLoading } = useAuth();
  const router = useRouter();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [permissionError, setPermissionError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/admin/login");
      } else if (userData?.role !== 'admin') {
        // Redirect non-admin users to their appropriate dashboard
        if (userData?.role === 'user') {
          router.push("/dashboard");
        } else {
          router.push("/login");
        }
      }
    }
  }, [user, userData, authLoading, router]);

  useEffect(() => {
    if (!user) return;

    const fetchCourses = async () => {
      try {
        setPermissionError(false);
        setErrorMessage("");
        
        // Try to fetch courses
        const querySnapshot = await getDocs(collection(db, "courses"));
        const coursesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Course[];
        
        setCourses(coursesData);
        setLoading(false);
        
        // Set up real-time listener if initial fetch succeeds
        const unsubscribe = onSnapshot(
          collection(db, "courses"), 
          (querySnapshot) => {
            const coursesData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })) as Course[];
            setCourses(coursesData);
          },
          (error) => {
            console.error("Firestore listener error:", error);
            if (error.code === 'permission-denied') {
              setPermissionError(true);
              setErrorMessage("Firestore permission denied. Please update security rules.");
            }
          }
        );

        return () => unsubscribe();
      } catch (error: any) {
        console.error("Error fetching courses:", error);
        setLoading(false);
        
        if (error.code === 'permission-denied') {
          setPermissionError(true);
          setErrorMessage("Firestore permission denied. Please update security rules.");
        } else {
          setErrorMessage(`Error: ${error.message}`);
        }
      }
    };

    fetchCourses();
  }, [user]);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      await deleteDoc(doc(db, "courses", id));
      toast({
        title: "Success",
        description: "Course deleted successfully",
      });
    } catch (error: any) {
      console.error("Error deleting course:", error);
      if (error.code === 'permission-denied') {
        toast({
          title: "Permission Error",
          description: "Cannot delete course. Please update Firestore security rules.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to delete course",
          variant: "destructive",
        });
      }
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || userData?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Course Management</h1>
            <p className="text-gray-600 mt-2">Manage your academy courses</p>
          </div>
          <Link href="/admin/add-course">
            <Button className="bg-teal-600 hover:bg-teal-700">
              <Plus className="w-4 h-4 mr-2" />
              Add New Course
            </Button>
          </Link>
        </div>

        {permissionError && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <p><strong>Firestore Permission Error:</strong> {errorMessage}</p>
                <p>To fix this issue:</p>
                <ol className="list-decimal list-inside space-y-1 text-sm">
                  <li>Go to <a href="https://console.firebase.google.com/project/ecom-admin-a4b0b/firestore/rules" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center">Firebase Console <ExternalLink className="w-3 h-3 ml-1" /></a></li>
                  <li>Navigate to Firestore Database → Rules</li>
                  <li>Update the security rules to allow authenticated access</li>
                  <li>Click "Publish" and wait for deployment</li>
                </ol>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => window.open('https://console.firebase.google.com/project/ecom-admin-a4b0b/firestore/rules', '_blank')}
                  className="mt-2"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open Firebase Console
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading courses...</p>
          </div>
        ) : errorMessage && !permissionError ? (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        ) : courses.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses yet</h3>
              <p className="text-gray-600 mb-6">Get started by creating your first course</p>
              <Link href="/admin/add-course">
                <Button className="bg-teal-600 hover:bg-teal-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Course
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={course.imageUrl || "/placeholder.svg"}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                  <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      {course.rating}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {course.studentCount}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary">{course.modules} modules</Badge>
                    {course.certificate && (
                      <Badge className="bg-teal-100 text-teal-800">Certificate</Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-lg font-bold text-teal-600">
                        ₹{course.discountedPrice.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ₹{course.originalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/admin/edit-course/${course.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(course.id, course.title)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      disabled={permissionError}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/admin/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    </div>
  );
} 