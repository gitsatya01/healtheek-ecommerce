// app/admin/dashboard/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { db, auth } from "@/lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc, onSnapshot, QuerySnapshot, DocumentData } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Tag, 
  LogOut, 
  Plus, 
  Edit2, 
  Trash2,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Loader2,
  Menu,
  X
} from "lucide-react";
import type { Product } from "@/lib/types";
import Link from "next/link";
import { IconPicker, ColorSchemePicker } from "@/components/admin/icon-picker";

export default function AdminDashboard() {
  const { user, userData, loading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [activeSection, setActiveSection] = useState<'products' | 'categories'>('products');
  const [showAddForm, setShowAddForm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Product form
  const [prodForm, setProdForm] = useState({ 
    name: "", 
    subtitle: "", 
    slug: "", 
    description: "", 
    mrpPrice: "", 
    primePrice: "", 
    image: "", 
    images: [""], // Additional images array
    category: "", 
    isNew: false 
  });
  const [editProdId, setEditProdId] = useState<string | null>(null);
  
  // Category form
  const [catForm, setCatForm] = useState({ name: "", description: "", icon: "", colorScheme: "healtheek-teal" });
  const [editCatId, setEditCatId] = useState<string | null>(null);

  useEffect(() => {
    if (!loading) {
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
  }, [user, userData, loading, router]);

  useEffect(() => {
    setLoadingProducts(true);
    const unsub = onSnapshot(collection(db, "products"), (querySnapshot: QuerySnapshot<DocumentData>) => {
      setProducts(querySnapshot.docs.map((doc: DocumentData) => ({ id: doc.id, ...doc.data() } as Product)));
      setLoadingProducts(false);
    });
    return () => unsub();
  }, []);
  useEffect(() => {
    setLoadingCategories(true);
    const unsub = onSnapshot(collection(db, "categories"), (querySnapshot: QuerySnapshot<DocumentData>) => {
      setCategories(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoadingCategories(false);
    });
    return () => unsub();
  }, []);

  // Product handlers
  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  };

  const handleProdChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setProdForm({ ...prodForm, [name]: (e.target as HTMLInputElement).checked });
    } else {
      if (name === 'name') {
        // Auto-generate slug when name changes
        const newSlug = generateSlug(value);
        setProdForm({ ...prodForm, [name]: value, slug: newSlug });
      } else {
        setProdForm({ ...prodForm, [name]: value });
      }
    }
  };

  // Handle additional images
  const handleImageChange = (index: number, value: string) => {
    const newImages = [...prodForm.images];
    newImages[index] = value;
    setProdForm({ ...prodForm, images: newImages });
  };

  const addImageField = () => {
    setProdForm({ ...prodForm, images: [...prodForm.images, ""] });
  };

  const removeImageField = (index: number) => {
    if (prodForm.images.length > 1) {
      const newImages = prodForm.images.filter((_, i) => i !== index);
      setProdForm({ ...prodForm, images: newImages });
    }
  };
  const handleProdSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productData = {
        ...prodForm,
        mrpPrice: Number(prodForm.mrpPrice),
        primePrice: Number(prodForm.primePrice),
        isNew: Boolean(prodForm.isNew),
        images: prodForm.images.filter(img => img.trim() !== ""), // Remove empty image URLs
      };

      if (editProdId) {
        const docRef = doc(db, "products", editProdId);
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) {
          alert("Error: Product no longer exists. It may have been deleted by another user.");
          setEditProdId(null);
          setShowAddForm(false);
          return;
        }
        
        await updateDoc(docRef, productData);
        alert("Product updated successfully!");
      } else {
        await addDoc(collection(db, "products"), productData);
        alert("Product added successfully!");
      }
      setProdForm({ name: "", subtitle: "", slug: "", description: "", mrpPrice: "", primePrice: "", image: "", images: [""], category: "", isNew: false });
      setEditProdId(null);
      setShowAddForm(false);
    } catch (error: any) {
      console.error("Error saving product:", error);
      if (error.code === 'not-found') {
        alert("Error: Product not found. It may have been deleted by another user.");
        setEditProdId(null);
        setShowAddForm(false);
      } else {
        alert(`Error saving product: ${error.message}`);
      }
    }
  };
    const handleProdEdit = (product: Product) => {
    // Generate slug if it doesn't exist
    const productSlug = product.slug || generateSlug(product.name || "");
    
    setProdForm({
      name: product.name || "",
      subtitle: product.subtitle || "",
      slug: productSlug,
      description: product.description || "",
      mrpPrice: product.mrpPrice?.toString() || "",
      primePrice: product.primePrice?.toString() || "",
      image: product.image || "",
      images: product.images || [""],
      category: product.category || "",
      isNew: product.isNew || false,
    });
    setEditProdId(product.id!);
    setShowAddForm(true);
  };
  const handleProdDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      return;
    }
    
    try {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        alert("Error: Product no longer exists. It may have already been deleted.");
        return;
      }
      
      await deleteDoc(docRef);
      alert("Product deleted successfully!");
    } catch (error: any) {
      console.error("Error deleting product:", error);
      if (error.code === 'not-found') {
        alert("Error: Product not found. It may have already been deleted.");
      } else {
        alert(`Error deleting product: ${error.message}`);
      }
    }
  };
  // Category handlers
  const handleCatChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCatForm({ ...catForm, [e.target.name]: e.target.value });
  };

  const handleIconSelect = (iconPath: string, iconName: string) => {
    setCatForm({ ...catForm, icon: iconPath });
  };

  const handleColorSchemeSelect = (colorScheme: string) => {
    setCatForm({ ...catForm, colorScheme });
  };
  const handleCatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editCatId) {
        // Check if document exists before updating
        const docRef = doc(db, "categories", editCatId);
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists()) {
          alert("Error: Category no longer exists. It may have been deleted by another user.");
          setEditCatId(null);
          setShowAddForm(false);
          return;
        }
        
        await updateDoc(docRef, {
          name: catForm.name,
          description: catForm.description,
          icon: catForm.icon,
          colorScheme: catForm.colorScheme,
        });
        alert("Category updated successfully!");
      } else {
        await addDoc(collection(db, "categories"), {
          name: catForm.name,
          description: catForm.description,
          icon: catForm.icon,
          colorScheme: catForm.colorScheme,
        });
        alert("Category added successfully!");
      }
      setCatForm({ name: "", description: "", icon: "", colorScheme: "healtheek-teal" });
      setEditCatId(null);
      setShowAddForm(false);
    } catch (error: any) {
      console.error("Error saving category:", error);
      if (error.code === 'not-found') {
        alert("Error: Category not found. It may have been deleted by another user.");
        setEditCatId(null);
        setShowAddForm(false);
      } else {
        alert(`Error saving category: ${error.message}`);
      }
    }
  };
  const handleCatEdit = (cat: any) => {
    setCatForm({
      name: cat.name || "",
      description: cat.description || "",
      icon: cat.icon || "",
      colorScheme: cat.colorScheme || "healtheek-teal"
    });
    setEditCatId(cat.id);
    setShowAddForm(true);
  };
  const handleCatDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category? This action cannot be undone.")) {
      return;
    }
    
    try {
      const docRef = doc(db, "categories", id);
      const docSnap = await getDoc(docRef);
      
      if (!docSnap.exists()) {
        alert("Error: Category no longer exists. It may have already been deleted.");
        return;
      }
      
      await deleteDoc(docRef);
      alert("Category deleted successfully!");
    } catch (error: any) {
      console.error("Error deleting category:", error);
      if (error.code === 'not-found') {
        alert("Error: Category not found. It may have already been deleted.");
      } else {
        alert(`Error deleting category: ${error.message}`);
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/admin/login";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
      </div>
    );
  }

  if (!user || userData?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-xl font-bold text-gray-800">Healtheek Admin</h1>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="bg-white w-64 h-full shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-800">Healtheek</h1>
              <p className="text-sm text-gray-600">Admin Panel</p>
            </div>
            <nav className="mt-6">
              <button
                onClick={() => {
                  setActiveSection('products');
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center w-full px-6 py-3 text-left ${
                  activeSection === 'products' ? 'bg-teal-50 text-teal-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Package className="w-5 h-5 mr-3" />
                Products
              </button>
              <button
                onClick={() => {
                  setActiveSection('categories');
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center w-full px-6 py-3 text-left ${
                  activeSection === 'categories' ? 'bg-teal-50 text-teal-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Tag className="w-5 h-5 mr-3" />
                Categories
              </button>
              <Link href="/admin/courses">
                <button 
                  className="flex items-center w-full px-6 py-3 text-left text-gray-600 hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <BookOpen className="w-5 h-5 mr-3" />
                  Courses
                </button>
              </Link>
            </nav>
          </div>
                  </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Healtheek</h1>
          <p className="text-sm text-gray-600">Admin Panel</p>
                  </div>
        <nav className="mt-6">
          <button
            onClick={() => setActiveSection('products')}
            className={`flex items-center w-full px-6 py-3 text-left ${
              activeSection === 'products' ? 'bg-teal-50 text-teal-600' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Package className="w-5 h-5 mr-3" />
            Products
          </button>
          <button
            onClick={() => setActiveSection('categories')}
            className={`flex items-center w-full px-6 py-3 text-left ${
              activeSection === 'categories' ? 'bg-teal-50 text-teal-600' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Tag className="w-5 h-5 mr-3" />
            Categories
          </button>
          <Link href="/admin/courses">
            <button className="flex items-center w-full px-6 py-3 text-left text-gray-600 hover:bg-gray-50">
              <BookOpen className="w-5 h-5 mr-3" />
              Courses
            </button>
          </Link>
        </nav>
        <div className="absolute bottom-0 w-full p-6">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 lg:mb-8 gap-4">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
              {activeSection === 'products' ? 'Products Management' : 'Categories Management'}
            </h2>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center justify-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 w-full sm:w-auto"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add {activeSection === 'products' ? 'Product' : 'Category'}
            </button>
          </div>

          {/* Add/Edit Form */}
          {showAddForm && (
            <div className="bg-white rounded-lg shadow-lg p-4 lg:p-6 mb-6 lg:mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg lg:text-xl font-semibold">
                  {editProdId || editCatId ? 'Edit' : 'Add'} {activeSection === 'products' ? 'Product' : 'Category'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditProdId(null);
                    setEditCatId(null);
                    setProdForm({ name: "", subtitle: "", slug: "", description: "", mrpPrice: "", primePrice: "", image: "", images: [""], category: "", isNew: false });
                    setCatForm({ name: "", description: "", icon: "", colorScheme: "healtheek-teal" });
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {activeSection === 'products' ? (
                <form onSubmit={handleProdSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                      <input
                        name="name"
                        value={prodForm.name}
                        onChange={handleProdChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                      <input
                        name="subtitle"
                        value={prodForm.subtitle}
                        onChange={handleProdChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Slug 
                        <span className="text-xs text-gray-500 font-normal">(Auto-generated from product name)</span>
                      </label>
                      <input
                        name="slug"
                        value={prodForm.slug}
                        readOnly
                        className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                        placeholder="Will be auto-generated from product name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                name="category"
                value={prodForm.category}
                onChange={handleProdChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={prodForm.description}
                      onChange={handleProdChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      rows={4}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">MRP Price</label>
                      <input
                        name="mrpPrice"
                        type="number"
                        value={prodForm.mrpPrice}
                        onChange={handleProdChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Prime Price</label>
                      <input
                        name="primePrice"
                        type="number"
                        value={prodForm.primePrice}
                        onChange={handleProdChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  {/* Primary Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Primary Image URL</label>
                    <input
                      name="image"
                      value={prodForm.image}
                      onChange={handleProdChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                      placeholder="Main product image URL"
                    />
                  </div>

                  {/* Additional Images */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Additional Images 
                        <span className="text-xs text-gray-500 font-normal">(Optional)</span>
                      </label>
                      <button
                        type="button"
                        onClick={addImageField}
                        className="text-sm text-teal-600 hover:text-teal-700 font-medium"
                      >
                        + Add Image
                      </button>
                    </div>
                    <div className="space-y-2">
                      {prodForm.images.map((imageUrl, index) => (
                        <div key={index} className="flex gap-2">
                          <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => handleImageChange(index, e.target.value)}
                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            placeholder={`Additional image ${index + 1} URL`}
                          />
                          {prodForm.images.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeImageField(index)}
                              className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg border border-red-200"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isNew"
                  name="isNew"
                  checked={prodForm.isNew}
                  onChange={handleProdChange}
                  className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <label htmlFor="isNew" className="text-sm text-gray-700">Mark as New Product</label>
              </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700"
                    >
                      {editProdId ? 'Update Product' : 'Add Product'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditProdId(null);
                        setProdForm({ name: "", subtitle: "", slug: "", description: "", mrpPrice: "", primePrice: "", image: "", images: [""], category: "", isNew: false });
                      }}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                    >
                      Cancel
              </button>
                  </div>
            </form>
              ) : (
                <form onSubmit={handleCatSubmit} className="space-y-4">
                    <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                    <input
                      name="name"
                      value={catForm.name}
                      onChange={handleCatChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                    </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={catForm.description}
                      onChange={handleCatChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      rows={4}
                    />
                  </div>

                  {/* Icon Picker */}
                  <IconPicker
                    selectedIcon={catForm.icon}
                    onIconSelect={handleIconSelect}
                  />

                  {/* Color Scheme Picker */}
                  <ColorSchemePicker
                    selectedColorScheme={catForm.colorScheme}
                    onColorSchemeSelect={handleColorSchemeSelect}
                  />
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700"
                    >
                      {editCatId ? 'Update Category' : 'Add Category'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditCatId(null);
                        setCatForm({ name: "", description: "", icon: "", colorScheme: "healtheek-teal" });
                      }}
                      className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* List Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {activeSection === 'products' ? (
              loadingProducts ? (
                <div className="p-8 text-center text-gray-500">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                  Loading products...
                </div>
              ) : products.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No products found. Add your first product!
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {products.map(product => (
                    <div key={product.id} className="p-4 lg:p-6 hover:bg-gray-50">
                      {/* Mobile Layout */}
                      <div className="lg:hidden space-y-3">
                        <div className="flex items-start gap-3">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 truncate">{product.name}</h4>
                            <p className="text-sm text-gray-500 truncate">{product.subtitle}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-teal-600 font-semibold text-sm">₹{product.primePrice}</span>
                              <span className="text-gray-400 line-through text-sm">₹{product.mrpPrice}</span>
                              {product.isNew && (
                                <span className="px-2 py-1 text-xs bg-teal-100 text-teal-800 rounded-full">New</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleProdEdit(product)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleProdDelete(product.id!)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden lg:flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <h4 className="font-semibold text-gray-900">{product.name}</h4>
                            <p className="text-sm text-gray-500">{product.subtitle}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-teal-600 font-semibold">₹{product.primePrice}</span>
                              <span className="text-gray-400 line-through">₹{product.mrpPrice}</span>
                              {product.isNew && (
                                <span className="px-2 py-1 text-xs bg-teal-100 text-teal-800 rounded-full">New</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleProdEdit(product)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleProdDelete(product.id!)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              loadingCategories ? (
                <div className="p-8 text-center text-gray-500">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                  Loading categories...
                </div>
              ) : categories.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  No categories found. Add your first category!
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {categories.map(cat => (
                    <div key={cat.id} className="p-4 lg:p-6 hover:bg-gray-50">
                      {/* Mobile Layout */}
                      <div className="lg:hidden space-y-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{cat.name}</h4>
                          <p className="text-sm text-gray-500 mt-1">{cat.description}</p>
                        </div>
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleCatEdit(cat)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleCatDelete(cat.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Desktop Layout */}
                      <div className="hidden lg:flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">{cat.name}</h4>
                          <p className="text-sm text-gray-500">{cat.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCatEdit(cat)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                          >
                            <Edit2 className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleCatDelete(cat.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
