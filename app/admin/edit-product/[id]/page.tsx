// app/admin/edit-product/[id]/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, collection, getDocs } from "firebase/firestore";
import { useRouter, useParams } from "next/navigation";

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [form, setForm] = useState({ title: "", description: "", price: "", imageUrl: "", category: "" });
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setForm({
          title: data.title || "",
          description: data.description || "",
          price: data.price?.toString() || "",
          imageUrl: data.imageUrl || "",
          category: data.category || ""
        });
      }
      setLoading(false);
    };
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "categories"));
      setCategories(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchProduct();
    fetchCategories();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    await updateDoc(doc(db, "products", id), {
      ...form,
      price: Number(form.price),
    });
    router.push("/admin/dashboard");
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} className="w-full p-2 mb-2 border border-gray-300 rounded" required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full p-2 mb-2 border border-gray-300 rounded" required />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} className="w-full p-2 mb-2 border border-gray-300 rounded" required />
        <input name="imageUrl" placeholder="Image URL" value={form.imageUrl} onChange={handleChange} className="w-full p-2 mb-2 border border-gray-300 rounded" required />
        <select name="category" value={form.category} onChange={handleChange} className="w-full p-2 mb-4 border border-gray-300 rounded" required>
  <option value="">Select Category</option>
  <option value="business-tools">Business Tools</option>
  <option value="popular-products">Popular Products</option>
  <option value="prime-formula">Prime Formulas</option>
  <option value="smart-formula-2025">Smart Formulas</option>
</select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Update Product</button>
      </form>
    </div>
  );
}
