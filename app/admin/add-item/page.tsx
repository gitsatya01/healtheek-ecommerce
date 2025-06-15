// app/admin/add-item/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function AddItem() {
  // Category form state
  const [catForm, setCatForm] = useState({ name: "", description: "" });
  const [catLoading, setCatLoading] = useState(false);
  // Product form state
  const [prodForm, setProdForm] = useState({ title: "", description: "", price: "", imageUrl: "", category: "" });
  const [prodLoading, setProdLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "categories"));
      setCategories(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchCategories();
  }, []);

  const handleCatChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCatForm({ ...catForm, [e.target.name]: e.target.value });
  };
  const handleProdChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setProdForm({ ...prodForm, [e.target.name]: e.target.value });
  };

  const handleCatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCatLoading(true);
    await addDoc(collection(db, "categories"), { ...catForm });
    setCatLoading(false);
    setCatForm({ name: "", description: "" });
    // Refresh categories
    const querySnapshot = await getDocs(collection(db, "categories"));
    setCategories(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleProdSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProdLoading(true);
    await addDoc(collection(db, "products"), { ...prodForm, price: Number(prodForm.price) });
    setProdLoading(false);
    setProdForm({ title: "", description: "", price: "", imageUrl: "", category: "" });
    router.push("/admin/dashboard");
  };

  return (
    <div className="p-8 max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h1 className="text-2xl font-bold mb-6">Add Category</h1>
        <form onSubmit={handleCatSubmit} className="bg-white p-6 rounded shadow">
          <input name="name" placeholder="Name" value={catForm.name} onChange={handleCatChange} className="w-full p-2 mb-2 border border-gray-300 rounded" required />
          <textarea name="description" placeholder="Description (optional)" value={catForm.description} onChange={handleCatChange} className="w-full p-2 mb-4 border border-gray-300 rounded" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full" disabled={catLoading}>{catLoading ? "Adding..." : "Add Category"}</button>
        </form>
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-6">Add Product</h1>
        <form onSubmit={handleProdSubmit} className="bg-white p-6 rounded shadow">
          <input name="title" placeholder="Title" value={prodForm.title} onChange={handleProdChange} className="w-full p-2 mb-2 border border-gray-300 rounded" required />
          <textarea name="description" placeholder="Description" value={prodForm.description} onChange={handleProdChange} className="w-full p-2 mb-2 border border-gray-300 rounded" required />
          <input name="price" type="number" placeholder="Price" value={prodForm.price} onChange={handleProdChange} className="w-full p-2 mb-2 border border-gray-300 rounded" required />
          <input name="imageUrl" placeholder="Image URL" value={prodForm.imageUrl} onChange={handleProdChange} className="w-full p-2 mb-2 border border-gray-300 rounded" required />
          <select name="category" value={prodForm.category} onChange={handleProdChange} className="w-full p-2 mb-4 border border-gray-300 rounded" required>
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full" disabled={prodLoading}>{prodLoading ? "Adding..." : "Add Product"}</button>
        </form>
      </div>
    </div>
  );
}
