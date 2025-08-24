"use client";

import { useState, useEffect } from "react";
import { Product, formatCurrency } from "@/types";
import AdminForm from "@/components/AdminForm";
import Image from "next/image";

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/products");
      if (!response.ok) throw new Error("Failed to fetch products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Gagal memuat data produk");
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus produk ini?")) return;

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete product");

      setProducts(products.filter((p) => p.id !== productId));
      alert("Produk berhasil dihapus");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Gagal menghapus produk");
    }
  };

  const handleSubmitForm = async (data: {
    name: string;
    price: number;
    stock: number;
    image: string;
  }) => {
    try {
      setSubmitting(true);

      if (editingProduct) {
        // Update existing product
        const response = await fetch(`/api/products/${editingProduct.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error("Failed to update product");

        const updatedProduct = await response.json();
        setProducts(
          products.map((p) => (p.id === editingProduct.id ? updatedProduct : p))
        );
        alert("Produk berhasil diperbarui");
      } else {
        // Create new product
        const response = await fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) throw new Error("Failed to create product");

        const newProduct = await response.json();
        setProducts([...products, newProduct]);
        alert("Produk berhasil ditambahkan");
      }

      setShowForm(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Gagal menyimpan produk");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in">
          <div className="loading-shimmer h-16 rounded-2xl w-1/2 mb-8"></div>
          <div className="loading-shimmer h-14 rounded-xl w-64 mb-8"></div>
          <div className="space-y-6">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="loading-shimmer h-20 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-4 mb-6">
          <div className="text-6xl animate-float">⚙️</div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-2">
              Admin Dashboard
            </h1>
            <div className="flex items-center justify-center space-x-2 text-lg text-secondary-600">
              <span className="animate-pulse">✨</span>
              <span>Product Management System</span>
              <span className="animate-pulse">✨</span>
            </div>
          </div>
        </div>
        <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
          Manage your vending machine inventory with our intuitive admin panel.
          <br />
          <span className="font-semibold text-primary-600">
            Add, edit, and monitor your products!
          </span>
        </p>
      </div>

      {showForm ? (
        <div className="max-w-2xl mx-auto">
          <AdminForm
            product={editingProduct}
            onSubmit={handleSubmitForm}
            onCancel={handleCancelForm}
            loading={submitting}
            submitLabel={editingProduct ? "Update Product" : "Add Product"}
          />
        </div>
      ) : (
        <div className="space-y-8">
          {/* Action Header */}
          <div className="floating-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-secondary-800 mb-2">
                  Product Inventory
                </h2>
                <p className="text-secondary-600">
                  {products.length}{" "}
                  {products.length === 1 ? "product" : "products"} in your
                  vending machine
                </p>
              </div>
              <button
                onClick={handleAddProduct}
                className="btn-primary flex items-center space-x-2"
              >
                <span className="text-xl">➕</span>
                <span>Add New Product</span>
              </button>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="floating-card p-12 text-center">
              <div className="text-8xl mb-6 animate-bounce-in">📦</div>
              <h3 className="text-3xl font-bold text-secondary-700 mb-4">
                No Products Yet
              </h3>
              <p className="text-secondary-500 text-lg mb-8 max-w-md mx-auto">
                Start building your vending machine inventory by adding your
                first product!
              </p>
              <button
                onClick={handleAddProduct}
                className="btn-primary text-lg px-8 py-4"
              >
                <span className="flex items-center space-x-2">
                  <span>🚀</span>
                  <span>Add First Product</span>
                </span>
              </button>
            </div>
          ) : (
            <div className="floating-card overflow-hidden">
              {/* Table Header */}
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <span className="text-2xl mr-3">📋</span>
                  Product List ({products.length})
                </h2>
              </div>

              {/* Table Content */}
              <div className="overflow-x-auto scrollbar-thin">
                <table className="min-w-full">
                  <thead className="bg-secondary-50">
                    <tr>
                      <th className="px-8 py-4 text-left text-sm font-bold text-secondary-700 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-secondary-700 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-secondary-700 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-secondary-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-8 py-4 text-left text-sm font-bold text-secondary-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-secondary-100">
                    {products.map((product, index) => (
                      <tr
                        key={product.id}
                        className="table-row animate-slide-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <td className="px-8 py-6">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-16 w-16">
                              <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-secondary-100 shadow-lg">
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                  sizes="64px"
                                />
                              </div>
                            </div>
                            <div className="ml-6">
                              <div className="text-lg font-bold text-secondary-900">
                                {product.name}
                              </div>
                              <div className="text-sm text-secondary-500 font-mono">
                                ID: {product.id.slice(0, 8)}...
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-lg font-bold text-gradient">
                            {formatCurrency(product.price)}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-semibold text-secondary-900">
                              {product.stock}
                            </span>
                            <span className="text-secondary-500">units</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span
                            className={`inline-flex px-4 py-2 text-sm font-bold rounded-full shadow-lg ${
                              product.stock > 5
                                ? "bg-success-100 text-success-800 border border-success-200"
                                : product.stock > 0
                                ? "bg-warning-100 text-warning-800 border border-warning-200 animate-pulse"
                                : "bg-error-100 text-error-800 border border-error-200"
                            }`}
                          >
                            {product.stock > 5
                              ? "✅ In Stock"
                              : product.stock > 0
                              ? "⚠️ Low Stock"
                              : "❌ Out of Stock"}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex space-x-3">
                            <button
                              onClick={() => handleEditProduct(product)}
                              className="bg-primary-100 hover:bg-primary-200 text-primary-700 hover:text-primary-800 px-4 py-2 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
                            >
                              <span>✏️</span>
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="bg-error-100 hover:bg-error-200 text-error-700 hover:text-error-800 px-4 py-2 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
                            >
                              <span>🗑️</span>
                              <span>Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
