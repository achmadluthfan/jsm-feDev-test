"use client";

import { useState, useEffect } from "react";
import { Product, Transaction } from "@/types";
import ProductCard from "@/components/ProductCard";
import MoneyInput from "@/components/MoneyInput";
import PurchaseModal from "@/components/PurchaseModal";

export default function VendingMachinePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [insertedMoney, setInsertedMoney] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalState, setModalState] = useState<"confirm" | "success" | "error">(
    "confirm"
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [change, setChange] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch products on component mount
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
    } finally {
      setLoading(false);
    }
  };

  const handleInsertMoney = (amount: number) => {
    setInsertedMoney((prev) => prev + amount);
  };

  const handleReturnMoney = () => {
    if (insertedMoney > 0) {
      alert(`Uang dikembalikan: Rp ${insertedMoney.toLocaleString("id-ID")}`);
      setInsertedMoney(0);
    }
  };

  const handleBuyProduct = (product: Product) => {
    // Validate stock
    if (product.stock === 0) {
      setErrorMessage("Maaf, stok produk habis.");
      setModalState("error");
      setSelectedProduct(product);
      setShowModal(true);
      return;
    }

    // Validate money
    if (insertedMoney < product.price) {
      setErrorMessage(
        `Uang tidak cukup. Dibutuhkan Rp ${product.price.toLocaleString(
          "id-ID"
        )}, tetapi hanya tersedia Rp ${insertedMoney.toLocaleString("id-ID")}.`
      );
      setModalState("error");
      setSelectedProduct(product);
      setShowModal(true);
      return;
    }

    // Show confirmation modal
    setSelectedProduct(product);
    setChange(insertedMoney - product.price);
    setModalState("confirm");
    setShowModal(true);
  };

  const handleConfirmPurchase = async () => {
    if (!selectedProduct) return;

    try {
      // Update product stock
      const updatedProduct = {
        ...selectedProduct,
        stock: selectedProduct.stock - 1,
      };

      const updateResponse = await fetch(
        `/api/products/${selectedProduct.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (!updateResponse.ok) throw new Error("Failed to update product");

      // Create transaction
      const transaction: Omit<Transaction, "id"> = {
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        quantity: 1,
        totalPrice: selectedProduct.price,
        moneyInserted: insertedMoney,
        change: change,
        timestamp: new Date().toISOString(),
      };

      const transactionResponse = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transaction),
      });

      if (!transactionResponse.ok)
        throw new Error("Failed to create transaction");

      // Update local state
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === selectedProduct.id ? updatedProduct : p
        )
      );

      // Reset money and show success
      setInsertedMoney(0);
      setModalState("success");
    } catch (error) {
      console.error("Error processing purchase:", error);
      setErrorMessage(
        "Terjadi kesalahan saat memproses pembelian. Silakan coba lagi."
      );
      setModalState("error");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setErrorMessage("");
    setChange(0);
  };

  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in">
          <div className="loading-shimmer h-12 rounded-2xl w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="glass-card p-6 animate-pulse">
                    <div className="loading-shimmer h-48 rounded-xl mb-4"></div>
                    <div className="loading-shimmer h-6 rounded-lg mb-3"></div>
                    <div className="loading-shimmer h-4 rounded-lg w-2/3 mb-4"></div>
                    <div className="loading-shimmer h-12 rounded-xl"></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card p-8 animate-pulse">
              <div className="loading-shimmer h-8 rounded-lg mb-6"></div>
              <div className="loading-shimmer h-24 rounded-xl mb-6"></div>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="loading-shimmer h-16 rounded-xl"
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="text-center mb-8 sm:mb-12 mobile-container">
        <div className="flex flex-col sm:inline-flex sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <div className="text-5xl sm:text-6xl lg:text-7xl animate-float">
            🥤
          </div>
          <div>
            <h1 className="mobile-heading font-bold text-gradient mb-2">
              SmartVend
            </h1>
            <div className="flex items-center justify-center space-x-2 mobile-text text-secondary-600">
              <span className="animate-pulse">✨</span>
              <span className="hidden sm:inline">
                Modern Vending Experience
              </span>
              <span className="sm:hidden">Smart Vending</span>
              <span className="animate-pulse">✨</span>
            </div>
          </div>
        </div>
        <p className="mobile-text text-secondary-600 max-w-2xl mx-auto px-4">
          <span className="hidden sm:inline">
            Discover your favorite beverages and snacks with our intelligent
            vending system.
            <br />
          </span>
          <span className="sm:hidden">
            Choose your favorite drinks and snacks easily.
            <br />
          </span>
          <span className="font-semibold text-primary-600">
            Insert money to start shopping!
          </span>
        </p>
      </div>

      {/* Status Banner */}
      {insertedMoney === 0 && (
        <div className="mb-8 mx-auto max-w-2xl">
          <div className="bg-gradient-to-r from-warning-100 to-warning-50 border border-warning-300 rounded-2xl p-4 text-center animate-bounce-in">
            <div className="flex items-center justify-center space-x-2">
              <span className="text-2xl animate-pulse">💰</span>
              <span className="text-warning-800 font-semibold">
                Please insert money to enable product selection
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Products Grid */}
        <div className="lg:col-span-2">
          <div className="floating-card p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-secondary-800">
                🛍️ Available Products
              </h2>
              <div className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold">
                {products.length} items
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard
                    product={product}
                    onBuy={handleBuyProduct}
                    disabled={insertedMoney === 0}
                  />
                </div>
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-16">
                <div className="text-8xl mb-6 animate-bounce-in">🤷‍♂️</div>
                <h3 className="text-2xl font-bold text-secondary-700 mb-4">
                  No Products Available
                </h3>
                <p className="text-secondary-500 text-lg max-w-md mx-auto">
                  We're currently restocking our vending machine. Please check
                  back soon for fresh products!
                </p>
                <div className="mt-6 flex justify-center space-x-4 text-secondary-400">
                  <span className="animate-pulse">⏰</span>
                  <span>Restocking in progress...</span>
                  <span className="animate-pulse">📦</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Money Input Panel */}
        <div className="lg:col-span-1">
          <div className="sticky top-28">
            <MoneyInput
              insertedMoney={insertedMoney}
              onInsertMoney={handleInsertMoney}
              onReturnMoney={handleReturnMoney}
            />

            {/* Instructions */}
            <div className="mt-6 glass-card p-6">
              <h3 className="text-lg font-semibold text-secondary-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">💡</span>
                How to Use
              </h3>
              <div className="space-y-3 text-sm text-secondary-600">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <span>Insert money using the denomination buttons</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <span>Select your desired product</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <span>Confirm your purchase</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-bold">
                    4
                  </span>
                  <span>Collect your change if any</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      <PurchaseModal
        isOpen={showModal}
        onClose={handleCloseModal}
        product={selectedProduct}
        insertedMoney={insertedMoney}
        change={change}
        onConfirm={handleConfirmPurchase}
        isSuccess={modalState === "success"}
        errorMessage={modalState === "error" ? errorMessage : undefined}
      />
    </div>
  );
}
