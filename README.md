# 🥤 Vending Machine App

Aplikasi Vending Machine modern yang dibangun dengan Next.js App Router, Tailwind CSS, dan MySQL menggunakan Prisma ORM.

## ✨ Fitur

- **Halaman Utama Vending Machine** - Pilih produk dan masukkan uang untuk melakukan pembelian
- **Panel Admin** - CRUD produk dengan validasi form menggunakan react-hook-form + yup
- **Riwayat Transaksi** - Lihat semua transaksi dengan statistik dan export ke CSV
- **Database MySQL** - Menggunakan Prisma ORM untuk manajemen database
- **Responsif** - Design mobile-friendly dengan Tailwind CSS

## 🛠 Teknologi

- **Frontend**: Next.js 14 (App Router), React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MySQL dengan Prisma ORM
- **Validasi**: react-hook-form + yup
- **Styling**: Tailwind CSS dengan custom components

## 📋 Prerequisites

Pastikan Anda sudah menginstal:

- Node.js (v18 atau lebih baru)
- npm atau yarn
- MySQL Server (MAMP, XAMPP, atau standalone MySQL)

## 🚀 Instalasi & Setup

### 1. Clone Repository

\`\`\`bash
git clone <repository-url>
cd jsm-feDev-test
\`\`\`

### 2. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. Setup Database

#### Menggunakan MAMP:

1. Buka MAMP dan start Apache & MySQL
2. Pastikan MySQL berjalan di port 3306
3. Buat database baru bernama \`vending_machine\` melalui phpMyAdmin

#### Manual MySQL Setup:

\`\`\`sql
CREATE DATABASE vending_machine;
\`\`\`

### 4. Environment Variables

Buat file \`.env\` di root project:

\`\`\`env
DATABASE_URL="mysql://root:root@localhost:3306/vending_machine"
\`\`\`

**Sesuaikan kredensial database:**

- Ganti \`root:root\` dengan username:password MySQL
- Pastikan port 3306 sesuai dengan konfigurasi MySQL

### 5. Setup Database Schema

\`\`\`bash

# Generate Prisma Client

npm run db:generate

# Generate schema and push ke database

npm run db:migrate

# Push schema ke database (tanpa generate Schema)

npm run db:push

# Seed database dengan data awal

npm run db:seed

# Running prisma studio

npm run db:studio
\`\`\`

### 6. Jalankan Aplikasi

\`\`\`bash
npm run dev
\`\`\`

Aplikasi akan berjalan di [http://localhost:3000](http://localhost:3000)

## 📁 Struktur Project

\`\`\`
jsm-feDev-test/
├── app/ # Next.js App Router
│ ├── admin/ # Panel admin untuk CRUD produk
│ ├── api/ # API routes
│ │ ├── products/ # CRUD produk
│ │ └── transactions/ # CRUD transaksi
│ ├── history/ # Riwayat transaksi
│ ├── globals.css # Global styles
│ ├── layout.tsx # Root layout
│ └── page.tsx # Halaman utama vending machine
├── components/ # Komponen reusable
│ ├── AdminForm.tsx # Form admin dengan validasi
│ ├── HistoryTable.tsx # Tabel riwayat transaksi
│ ├── MoneyInput.tsx # Input uang
│ ├── ProductCard.tsx # Card produk
│ └── PurchaseModal.tsx # Modal konfirmasi pembelian
├── lib/ # Utilities
│ └── prisma.ts # Prisma client configuration
├── prisma/ # Database schema & seeds
│ ├── schema.prisma # Schema database
│ └── seed.ts # Data seeding
├── types/ # TypeScript definitions
└── README.md
\`\`\`

## 🎯 Cara Penggunaan

### Halaman Utama (/)

1. Masukkan uang dengan mengklik denominasi yang tersedia
2. Pilih produk yang ingin dibeli
3. Konfirmasi pembelian jika uang mencukupi
4. Ambil kembalian jika ada

### Panel Admin (/admin)

1. Klik "Tambah Produk Baru" untuk menambah produk
2. Klik "Edit" pada produk untuk mengubah data
3. Klik "Hapus" untuk menghapus produk
4. Form memiliki validasi lengkap menggunakan yup

### Riwayat Transaksi (/history)

1. Lihat semua transaksi yang telah dilakukan
2. Export data ke CSV
3. Hapus semua riwayat transaksi
4. Lihat statistik pendapatan

## 📊 Database Schema

### Products Table

- \`id\` - Primary key (CUID)
- \`name\` - Nama produk
- \`price\` - Harga dalam rupiah
- \`stock\` - Jumlah stok
- \`image\` - URL gambar produk
- \`createdAt\` - Timestamp dibuat
- \`updatedAt\` - Timestamp diupdate

### Transactions Table

- \`id\` - Primary key (CUID)
- \`productId\` - Foreign key ke products
- \`productName\` - Nama produk saat transaksi
- \`quantity\` - Jumlah barang dibeli
- \`totalPrice\` - Total harga
- \`moneyInserted\` - Uang yang dimasukkan
- \`change\` - Uang kembalian
- \`timestamp\` - Waktu transaksi

## 🔧 Scripts yang Tersedia

\`\`\`bash
npm run dev # Jalankan development server
npm run build # Build aplikasi untuk production
npm run start # Jalankan production server
npm run lint # Jalankan ESLint
npm run db:generate # Generate Prisma client
npm run db:push # Push schema ke database
npm run db:migrate # Jalankan migration
npm run db:seed # Seed database dengan data awal
npm run db:studio # Buka Prisma Studio
\`\`\`

## 🐛 Troubleshooting

### Error: P1001 (Can't reach database)

- Pastikan MySQL server berjalan
- Periksa konfigurasi \`DATABASE_URL\` di file \`.env\`
- Pastikan database \`vending_machine\` sudah dibuat

### Error: Module not found '@prisma/client'

\`\`\`bash
npm run db:generate
\`\`\`

### Error: Table doesn't exist

\`\`\`bash
npm run db:push
npm run db:seed
\`\`\`

### Port 3000 sudah digunakan

\`\`\`bash

# Jalankan di port lain

PORT=3001 npm run dev
\`\`\`

---

**Thankyou! 🎉**
