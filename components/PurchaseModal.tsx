"use client";

import { Product, formatCurrency } from "@/types";

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  insertedMoney: number;
  change: number;
  onConfirm: () => void;
  isSuccess?: boolean;
  errorMessage?: string;
}

export default function PurchaseModal({
  isOpen,
  onClose,
  product,
  insertedMoney,
  change,
  onConfirm,
  isSuccess = false,
  errorMessage,
}: PurchaseModalProps) {
  if (!isOpen || !product) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content p-8">
        {isSuccess ? (
          // Success state
          <div className="text-center">
            <div className="text-8xl mb-6 animate-bounce-in">🎉</div>
            <h2 className="text-3xl font-bold text-gradient mb-2">
              Purchase Successful!
            </h2>
            <p className="text-secondary-600 mb-8">
              Thank you for your purchase. Enjoy your product!
            </p>

            {/* Success Receipt */}
            <div className="bg-gradient-to-br from-success-50 to-success-100 rounded-2xl p-6 mb-8 text-left">
              <h3 className="text-lg font-bold text-success-800 mb-4 flex items-center">
                <span className="text-2xl mr-2">🧾</span>
                Purchase Receipt
              </h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-secondary-700">Product:</span>
                  <span className="font-bold text-secondary-900">
                    {product.name}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary-700">Price:</span>
                  <span className="font-bold text-secondary-900">
                    {formatCurrency(product.price)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary-700">Money Inserted:</span>
                  <span className="font-bold text-secondary-900">
                    {formatCurrency(insertedMoney)}
                  </span>
                </div>
                <div className="border-t border-success-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-secondary-700 text-lg">Change:</span>
                    <span className="font-bold text-success-700 text-xl">
                      {formatCurrency(change)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={onClose} className="w-full btn-success">
              <span className="flex items-center justify-center space-x-2">
                <span>👍</span>
                <span>Awesome!</span>
              </span>
            </button>
          </div>
        ) : errorMessage ? (
          // Error state
          <div className="text-center">
            <div className="text-8xl mb-6 animate-bounce-in">😞</div>
            <h2 className="text-3xl font-bold text-error-600 mb-4">
              Purchase Failed
            </h2>

            <div className="bg-error-50 border border-error-200 rounded-2xl p-6 mb-8">
              <p className="text-error-700 text-lg font-medium">
                {errorMessage}
              </p>
            </div>

            <button onClick={onClose} className="w-full btn-secondary">
              <span className="flex items-center justify-center space-x-2">
                <span>🔄</span>
                <span>Try Again</span>
              </span>
            </button>
          </div>
        ) : (
          // Confirmation state
          <div>
            <div className="text-center mb-8">
              <div className="text-6xl mb-4 animate-float">🛒</div>
              <h2 className="text-3xl font-bold text-gradient mb-2">
                Confirm Purchase
              </h2>
              <p className="text-secondary-600">
                Review your order before proceeding
              </p>
            </div>

            {/* Product Preview */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-2xl">
                  🥤
                </div>
                <div>
                  <h3 className="text-xl font-bold text-secondary-900">
                    {product.name}
                  </h3>
                  <p className="text-primary-700 font-semibold">
                    {formatCurrency(product.price)}
                  </p>
                </div>
              </div>

              {/* Transaction Details */}
              <div className="space-y-3 pt-4 border-t border-primary-200">
                <div className="flex justify-between items-center">
                  <span className="text-secondary-700">Money Inserted:</span>
                  <span className="font-bold text-secondary-900">
                    {formatCurrency(insertedMoney)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-secondary-700">Product Price:</span>
                  <span className="font-bold text-secondary-900">
                    {formatCurrency(product.price)}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-primary-200">
                  <span className="text-secondary-700 text-lg">
                    Your Change:
                  </span>
                  <span className="font-bold text-success-600 text-xl">
                    {formatCurrency(change)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button onClick={onClose} className="flex-1 btn-secondary">
                <span className="flex items-center justify-center space-x-2">
                  <span>❌</span>
                  <span>Cancel</span>
                </span>
              </button>
              <button onClick={onConfirm} className="flex-1 btn-success">
                <span className="flex items-center justify-center space-x-2">
                  <span>✅</span>
                  <span>Confirm Purchase</span>
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
