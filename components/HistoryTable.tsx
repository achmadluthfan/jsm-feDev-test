"use client";

import { Transaction, formatCurrency } from "@/types";

interface HistoryTableProps {
  transactions: Transaction[];
  loading?: boolean;
}

export default function HistoryTable({
  transactions,
  loading = false,
}: HistoryTableProps) {
  if (loading) {
    return (
      <div className="floating-card p-8">
        <div className="animate-pulse">
          <div className="loading-shimmer h-8 rounded-lg w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="loading-shimmer h-6 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="floating-card p-12 text-center">
        <div className="text-8xl mb-6 animate-bounce-in">📋</div>
        <h3 className="text-3xl font-bold text-secondary-700 mb-4">
          No Transactions Yet
        </h3>
        <p className="text-secondary-500 text-lg max-w-md mx-auto">
          Transaction history will appear here once customers start making
          purchases from your vending machine.
        </p>
        <div className="mt-8 flex justify-center space-x-4 text-secondary-400">
          <span className="animate-pulse">⏰</span>
          <span className="text-sm">Waiting for first sale...</span>
          <span className="animate-pulse">💳</span>
        </div>
      </div>
    );
  }

  return (
    <div className="floating-card overflow-hidden">
      {/* Table Header */}
      <div className="bg-gradient-to-r from-secondary-600 to-secondary-700 px-8 py-6">
        <h2 className="text-xl font-bold text-white flex items-center">
          <span className="text-2xl mr-3">📋</span>
          Transaction History ({transactions.length})
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
                Money Inserted
              </th>
              <th className="px-8 py-4 text-left text-sm font-bold text-secondary-700 uppercase tracking-wider">
                Change
              </th>
              <th className="px-8 py-4 text-left text-sm font-bold text-secondary-700 uppercase tracking-wider">
                Date & Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-secondary-100">
            {transactions.map((transaction, index) => (
              <tr
                key={transaction.id}
                className="table-row animate-slide-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <td className="px-8 py-6">
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="text-lg font-bold text-secondary-900">
                        {transaction.productName}
                      </div>
                      <div className="text-sm text-secondary-500 flex items-center space-x-1">
                        <span>📦</span>
                        <span>Qty: {transaction.quantity}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="text-lg font-bold text-gradient">
                    {formatCurrency(transaction.totalPrice)}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-secondary-900">
                      {formatCurrency(transaction.moneyInserted)}
                    </span>
                    <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                      💰 Paid
                    </span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-success-600">
                      {formatCurrency(transaction.change)}
                    </span>
                    {transaction.change > 0 && (
                      <span className="text-xs bg-success-100 text-success-700 px-2 py-1 rounded-full">
                        💸 Change
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="text-secondary-600">
                    <div className="font-semibold">
                      {new Date(transaction.timestamp).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </div>
                    <div className="text-sm">
                      {new Date(transaction.timestamp).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
