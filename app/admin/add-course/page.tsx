"use client";

import React, { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AddCoursePage() {
  const { user, userData, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    duration: "",
    modules: "",
    certificate: false,
    rating: "",
    studentCount: "",
    originalPrice: "",
    discountedPrice: "",
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      certificate: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate required fields
      if (!formData.title || !formData.description || !formData.imageUrl || !formData.duration) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      // Prepare data for Firestore
      const courseData = {
        title: formData.title,
        description: formData.description,
        imageUrl: formData.imageUrl,
        duration: formData.duration,
        modules: parseInt(formData.modules) || 0,
        certificate: formData.certificate,
        rating: parseFloat(formData.rating) || 0,
        studentCount: parseInt(formData.studentCount) || 0,
        originalPrice: parseFloat(formData.originalPrice) || 0,
        discountedPrice: parseFloat(formData.discountedPrice) || 0,
        createdAt: new Date(),
      };

      await addDoc(collection(db, "courses"), courseData);

      toast({
        title: "Success",
        description: "Course added successfully",
      });

      router.push("/admin/courses");
    } catch (error) {
      console.error("Error adding course:", error);
      toast({
        title: "Error",
        description: "Failed to add course",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/admin/courses">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Course</h1>
              <p className="text-gray-600 mt-2">Create a new course for your academy</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <Label htmlFor="title">Course Title *</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Certified Health & Wellness Coach"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Comprehensive description of the course..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="imageUrl">Image URL *</Label>
                    <Input
                      id="imageUrl"
                      name="imageUrl"
                      type="url"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      placeholder="https://example.com/course-image.jpg"
                      required
                    />
                    {formData.imageUrl && (
                      <div className="mt-2">
                        <img
                          src={formData.imageUrl}
                          alt="Course preview"
                          className="w-32 h-20 object-cover rounded border"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="duration">Duration *</Label>
                    <Input
                      id="duration"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      placeholder="e.g., 12 weeks"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="modules">Number of Modules</Label>
                    <Input
                      id="modules"
                      name="modules"
                      type="number"
                      value={formData.modules}
                      onChange={handleInputChange}
                      placeholder="e.g., 15"
                      min="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="rating">Rating (0-5)</Label>
                    <Input
                      id="rating"
                      name="rating"
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      value={formData.rating}
                      onChange={handleInputChange}
                      placeholder="e.g., 4.8"
                    />
                  </div>

                  <div>
                    <Label htmlFor="studentCount">Student Count</Label>
                    <Input
                      id="studentCount"
                      name="studentCount"
                      type="number"
                      value={formData.studentCount}
                      onChange={handleInputChange}
                      placeholder="e.g., 2500"
                      min="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="originalPrice">Original Price (₹)</Label>
                    <Input
                      id="originalPrice"
                      name="originalPrice"
                      type="number"
                      value={formData.originalPrice}
                      onChange={handleInputChange}
                      placeholder="e.g., 139999"
                      min="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="discountedPrice">Discounted Price (₹)</Label>
                    <Input
                      id="discountedPrice"
                      name="discountedPrice"
                      type="number"
                      value={formData.discountedPrice}
                      onChange={handleInputChange}
                      placeholder="e.g., 118000"
                      min="0"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="certificate"
                        checked={formData.certificate}
                        onCheckedChange={handleCheckboxChange}
                      />
                      <Label htmlFor="certificate">Provides Certificate</Label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={loading}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? "Adding..." : "Add Course"}
                  </Button>
                  <Link href="/admin/courses">
                    <Button type="button" variant="outline">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 