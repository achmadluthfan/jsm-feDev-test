export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
}

export interface Transaction {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  moneyInserted: number;
  change: number;
  timestamp: string;
}

export interface VendingMachineState {
  insertedMoney: number;
  selectedProduct: Product | null;
}

export interface MoneyDenomination {
  value: number;
  label: string;
  color: string;
}

export const MONEY_DENOMINATIONS: MoneyDenomination[] = [
  { value: 2000, label: "Rp 2.000", color: "bg-blue-500" },
  { value: 5000, label: "Rp 5.000", color: "bg-green-500" },
  { value: 10000, label: "Rp 10.000", color: "bg-yellow-500" },
  { value: 20000, label: "Rp 20.000", color: "bg-orange-500" },
  { value: 50000, label: "Rp 50.000", color: "bg-red-500" },
];

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};
