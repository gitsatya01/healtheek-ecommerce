"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Tag, 
  LogOut, 
  Plus, 
  Users,
  ShoppingCart,
  TrendingUp
} from "lucide-react";

export default function AdminDashboard() {
  const { user, signOut, loading } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalProducts: 12,
    totalOrders: 45,
    totalUsers: 128,
    revenue: 15420
  });

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await signOut();
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">HealthEek</h1>
          <p className="text-sm text-gray-600">Admin Panel</p>
        </div>
        <nav className="mt-6">
          <div className="flex items-center px-6 py-3 bg-teal-50 text-teal-600">
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </div>
          <button
            onClick={() => router.push("/admin/products")}
            className="flex items-center w-full px-6 py-3 text-left text-gray-600 hover:bg-gray-50"
          >
            <Package className="w-5 h-5 mr-3" />
            Products
          </button>
          <button
            onClick={() => router.push("/admin/categories")}
            className="flex items-center w-full px-6 py-3 text-left text-gray-600 hover:bg-gray-50"
          >
            <Tag className="w-5 h-5 mr-3" />
            Categories
          </button>
          <button
            onClick={() => router.push("/admin/orders")}
            className="flex items-center w-full px-6 py-3 text-left text-gray-600 hover:bg-gray-50"
          >
            <ShoppingCart className="w-5 h-5 mr-3" />
            Orders
          </button>
          <button
            onClick={() => router.push("/admin/users")}
            className="flex items-center w-full px-6 py-3 text-left text-gray-600 hover:bg-gray-50"
          >
            <Users className="w-5 h-5 mr-3" />
            Users
          </button>
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
      <div className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
            <p className="text-gray-600">Welcome back, {user.name}!</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Products</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <ShoppingCart className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">₹{stats.revenue.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => router.push("/admin/add-item")}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Plus className="w-5 h-5 text-teal-600 mr-3" />
                <span className="font-medium">Add New Product</span>
              </button>
              
              <button
                onClick={() => router.push("/admin/categories")}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Tag className="w-5 h-5 text-teal-600 mr-3" />
                <span className="font-medium">Manage Categories</span>
              </button>
              
              <button
                onClick={() => router.push("/admin/orders")}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-teal-600 mr-3" />
                <span className="font-medium">View Orders</span>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">New order #1234 received</span>
                <span className="ml-auto text-xs text-gray-400">2 hours ago</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">Product "Vitamin D3" updated</span>
                <span className="ml-auto text-xs text-gray-400">4 hours ago</span>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                <span className="text-sm text-gray-600">New user registered</span>
                <span className="ml-auto text-xs text-gray-400">6 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
