// app/admin/categories/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Link from "next/link";

export default function Categories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "categories"));
      setCategories(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    };
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "categories", id));
    setCategories(categories.filter(c => c.id !== id));
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Link href="/admin/add-category" className="bg-blue-600 text-white px-4 py-2 rounded">Add Category</Link>
      </div>
      {loading ? <p>Loading...</p> : (
        <ul>
          {categories.map(cat => (
            <li key={cat.id} className="bg-gray-100 p-4 rounded mb-2 flex justify-between items-center">
              <div>
                <div className="font-bold">{cat.name}</div>
                {cat.description && <div className="text-gray-700">{cat.description}</div>}
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/edit-category/${cat.id}`} className="bg-yellow-400 px-3 py-1 rounded">Edit</Link>
                <button onClick={() => handleDelete(cat.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
