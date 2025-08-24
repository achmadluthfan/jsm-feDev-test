"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Product } from "@/types";
import { useEffect } from "react";

const productSchema = yup.object({
  name: yup
    .string()
    .required("Nama produk harus diisi")
    .min(2, "Nama produk minimal 2 karakter"),
  price: yup
    .number()
    .required("Harga harus diisi")
    .positive("Harga harus lebih dari 0")
    .integer("Harga harus berupa angka bulat"),
  stock: yup
    .number()
    .required("Stok harus diisi")
    .min(0, "Stok tidak boleh negatif")
    .integer("Stok harus berupa angka bulat"),
  image: yup
    .string()
    .required("URL gambar harus diisi")
    .url("URL gambar tidak valid"),
});

interface ProductFormData {
  name: string;
  price: number;
  stock: number;
  image: string;
}

interface AdminFormProps {
  product?: Product | null;
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
  loading?: boolean;
  submitLabel?: string;
}

export default function AdminForm({
  product,
  onSubmit,
  onCancel,
  loading = false,
  submitLabel = "Simpan",
}: AdminFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProductFormData>({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
      image: "",
    },
  });

  // Set form values when editing a product
  useEffect(() => {
    if (product) {
      setValue("name", product.name);
      setValue("price", product.price);
      setValue("stock", product.stock);
      setValue("image", product.image);
    } else {
      reset();
    }
  }, [product, setValue, reset]);

  const onFormSubmit = (data: ProductFormData) => {
    onSubmit(data);
  };

  return (
    <div className="floating-card p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-4 animate-float">
          {product ? "✏️" : "➕"}
        </div>
        <h2 className="text-3xl font-bold text-gradient mb-2">
          {product ? "Edit Product" : "Add New Product"}
        </h2>
        <p className="text-secondary-600">
          {product
            ? "Update product information"
            : "Fill in the details for your new product"}
        </p>
      </div>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        {/* Product Name */}
        <div className="space-y-2">
          <label className="label flex items-center">
            <span className="text-lg mr-2">🏷️</span>
            Product Name
          </label>
          <input
            type="text"
            {...register("name")}
            className="input-field text-lg"
            placeholder="Enter product name (e.g., Coca Cola 330ml)"
          />
          {errors.name && <p className="error-text">{errors.name.message}</p>}
        </div>

        {/* Price */}
        <div className="space-y-2">
          <label className="label flex items-center">
            <span className="text-lg mr-2">💰</span>
            Price (Rp)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-secondary-500 font-semibold">
              Rp
            </span>
            <input
              type="number"
              {...register("price", { valueAsNumber: true })}
              className="input-field text-lg pl-12"
              placeholder="25000"
              min="0"
              step="1000"
            />
          </div>
          {errors.price && <p className="error-text">{errors.price.message}</p>}
        </div>

        {/* Stock */}
        <div className="space-y-2">
          <label className="label flex items-center">
            <span className="text-lg mr-2">📦</span>
            Stock Quantity
          </label>
          <div className="relative">
            <input
              type="number"
              {...register("stock", { valueAsNumber: true })}
              className="input-field text-lg"
              placeholder="Enter stock quantity"
              min="0"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-secondary-500 font-semibold">
              units
            </span>
          </div>
          {errors.stock && <p className="error-text">{errors.stock.message}</p>}
        </div>

        {/* Image URL */}
        <div className="space-y-2">
          <label className="label flex items-center">
            <span className="text-lg mr-2">🖼️</span>
            Product Image URL
          </label>
          <input
            type="url"
            {...register("image")}
            className="input-field text-lg"
            placeholder="https://example.com/product-image.jpg"
          />
          {errors.image && <p className="error-text">{errors.image.message}</p>}
          <p className="text-xs text-secondary-500 bg-secondary-50 rounded-lg py-2 px-3">
            💡 Tip: Use a direct image URL for best results. Recommended size:
            400x400px
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 btn-secondary"
            disabled={loading}
          >
            <span className="flex items-center justify-center space-x-2">
              <span>❌</span>
              <span>Cancel</span>
            </span>
          </button>
          <button
            type="submit"
            className="flex-1 btn-primary"
            disabled={loading}
          >
            <span className="flex items-center justify-center space-x-2">
              <span>{product ? "💾" : "✨"}</span>
              <span>
                {loading
                  ? "Saving..."
                  : product
                  ? "Update Product"
                  : "Create Product"}
              </span>
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
