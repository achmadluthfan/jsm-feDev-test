"use client";

import { useState, useEffect } from "react";
import { Transaction } from "@/types";
import HistoryTable from "@/components/HistoryTable";

export default function HistoryPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTransactions: 0,
    totalRevenue: 0,
    averageTransactionValue: 0,
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [transactions]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/transactions");
      if (!response.ok) throw new Error("Failed to fetch transactions");
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    if (transactions.length === 0) {
      setStats({
        totalTransactions: 0,
        totalRevenue: 0,
        averageTransactionValue: 0,
      });
      return;
    }

    const totalRevenue = transactions.reduce(
      (sum, transaction) => sum + transaction.totalPrice,
      0
    );

    setStats({
      totalTransactions: transactions.length,
      totalRevenue,
      averageTransactionValue: totalRevenue / transactions.length,
    });
  };

  const clearHistory = async () => {
    if (
      !confirm(
        "Apakah Anda yakin ingin menghapus semua riwayat transaksi? Tindakan ini tidak dapat dibatalkan."
      )
    ) {
      return;
    }

    try {
      const response = await fetch("/api/transactions/clear", {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to clear transactions");
      }

      setTransactions([]);
      alert("Riwayat transaksi berhasil dihapus");
    } catch (error) {
      console.error("Error clearing history:", error);
      alert("Gagal menghapus riwayat transaksi");
    }
  };

  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="animate-fade-in">
          <div className="loading-shimmer h-16 rounded-2xl w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="stats-card animate-pulse">
                <div className="loading-shimmer h-6 rounded-lg mb-4"></div>
                <div className="loading-shimmer h-12 rounded-lg"></div>
              </div>
            ))}
          </div>
          <div className="floating-card p-8">
            <div className="loading-shimmer h-8 rounded-lg mb-6"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="loading-shimmer h-6 rounded-lg"></div>
              ))}
            </div>
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
          <div className="text-6xl animate-float">📊</div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-2">
              Transaction History
            </h1>
            <div className="flex items-center justify-center space-x-2 text-lg text-secondary-600">
              <span className="animate-pulse">✨</span>
              <span>Sales Analytics & Reports</span>
              <span className="animate-pulse">✨</span>
            </div>
          </div>
        </div>
        <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
          Monitor your vending machine performance with comprehensive
          transaction data.
          <br />
          <span className="font-semibold text-primary-600">
            Track sales, revenue, and trends!
          </span>
        </p>
      </div>

      {/* Enhanced Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="stats-card group">
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
              📈
            </div>
            <div className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-bold">
              Total
            </div>
          </div>
          <div>
            <p className="text-secondary-600 font-semibold mb-2 uppercase tracking-wide text-sm">
              Total Transactions
            </p>
            <p className="text-4xl font-bold text-gradient mb-2">
              {stats.totalTransactions}
            </p>
            <div className="flex items-center space-x-2 text-primary-600">
              <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">All time sales</span>
            </div>
          </div>
        </div>

        <div className="stats-card group">
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
              💰
            </div>
            <div className="bg-success-100 text-success-700 px-3 py-1 rounded-full text-sm font-bold">
              Revenue
            </div>
          </div>
          <div>
            <p className="text-secondary-600 font-semibold mb-2 uppercase tracking-wide text-sm">
              Total Revenue
            </p>
            <p className="text-4xl font-bold text-gradient mb-2">
              Rp {stats.totalRevenue.toLocaleString("id-ID")}
            </p>
            <div className="flex items-center space-x-2 text-success-600">
              <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Gross earnings</span>
            </div>
          </div>
        </div>

        <div className="stats-card group">
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
              🧮
            </div>
            <div className="bg-warning-100 text-warning-700 px-3 py-1 rounded-full text-sm font-bold">
              Average
            </div>
          </div>
          <div>
            <p className="text-secondary-600 font-semibold mb-2 uppercase tracking-wide text-sm">
              Average Transaction
            </p>
            <p className="text-4xl font-bold text-gradient mb-2">
              Rp{" "}
              {Math.round(stats.averageTransactionValue).toLocaleString(
                "id-ID"
              )}
            </p>
            <div className="flex items-center space-x-2 text-warning-600">
              <div className="w-2 h-2 bg-warning-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Per transaction</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {transactions.length > 0 && (
        <div className="floating-card p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-secondary-800 mb-1">
                Quick Actions
              </h3>
              <p className="text-secondary-600 text-sm">
                Manage your transaction data
              </p>
            </div>
            <div className="flex justify-end flex-wrap gap-4">
              <button
                onClick={clearHistory}
                className="btn-error flex items-center space-x-2"
              >
                <span>🗑️</span>
                <span>Clear All</span>
              </button>

              <button
                onClick={fetchTransactions}
                className="btn-secondary flex items-center space-x-2"
              >
                <span>🔄</span>
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Transactions Table */}
      <HistoryTable transactions={transactions} loading={loading} />
    </div>
  );
}
