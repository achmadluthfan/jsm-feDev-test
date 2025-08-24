"use client";

import {
  MONEY_DENOMINATIONS,
  MoneyDenomination,
  formatCurrency,
} from "@/types";

interface MoneyInputProps {
  insertedMoney: number;
  onInsertMoney: (amount: number) => void;
  onReturnMoney: () => void;
}

export default function MoneyInput({
  insertedMoney,
  onInsertMoney,
  onReturnMoney,
}: MoneyInputProps) {
  return (
    <div className="floating-card p-8">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-2 animate-float">💰</div>
        <h2 className="text-2xl font-bold text-gradient mb-1">Money Input</h2>
        <p className="text-secondary-600 text-sm">
          Insert cash to start shopping
        </p>
      </div>

      {/* Money Display */}
      <div className="relative mb-8">
        <div className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-3xl p-6 shadow-xl">
          <div className="text-center">
            <p className="text-primary-100 text-sm font-semibold mb-2 uppercase tracking-wide">
              Total Inserted
            </p>
            <div className="text-4xl font-bold text-white mb-2 animate-bounce-in">
              {formatCurrency(insertedMoney)}
            </div>
            {insertedMoney > 0 && (
              <div className="flex items-center justify-center space-x-2 text-primary-200">
                <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium">Ready to purchase</span>
              </div>
            )}
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-2 right-2 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
          <div
            className="absolute bottom-2 left-2 w-6 h-6 bg-white/10 rounded-full animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>
      </div>

      {/* Money Denomination Buttons */}
      <div className="space-y-3 mb-8">
        <h3 className="text-lg font-semibold text-secondary-700 mb-4 flex items-center">
          <span className="mr-2">💵</span>
          Choose Denomination
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {MONEY_DENOMINATIONS.map((denomination: MoneyDenomination, index) => (
            <button
              key={denomination.value}
              onClick={() => onInsertMoney(denomination.value)}
              className={`money-btn ${denomination.color} group transform hover:scale-105 animate-slide-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative z-10 flex items-center justify-between w-full">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💵</span>
                  <span className="font-bold text-lg text-black">
                    {denomination.label}
                  </span>
                </div>
                {/* <div className="text-right">
                  <div className="text-xs opacity-80">Add</div>
                  <div className="font-bold text-lga text-black">
                    {formatCurrency(denomination.value)}
                  </div>
                </div> */}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Return Money Button */}
      <div className="space-y-4">
        <button
          onClick={onReturnMoney}
          disabled={insertedMoney === 0}
          className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${
            insertedMoney === 0
              ? "bg-secondary-200 text-secondary-400 cursor-not-allowed"
              : "bg-gradient-to-r from-error-500 to-error-600 hover:from-error-600 hover:to-error-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
          }`}
        >
          <span className="flex items-center justify-center space-x-2">
            <span>🔄</span>
            <span>Return All Money</span>
          </span>
        </button>

        {insertedMoney > 0 && (
          <div className="text-center animate-fade-in">
            <p className="text-xs text-secondary-500 bg-secondary-50 rounded-lg py-2 px-4">
              💡 Click "Return All Money" to get your cash back anytime
            </p>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      {insertedMoney > 0 && (
        <div className="mt-6 pt-6 border-t border-secondary-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-secondary-600">Status:</span>
            <span className="text-success-600 font-semibold flex items-center">
              <span className="w-2 h-2 bg-success-500 rounded-full mr-2 animate-pulse"></span>
              Ready to Shop
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
