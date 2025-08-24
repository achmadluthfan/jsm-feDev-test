import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Clear existing data
  await prisma.transaction.deleteMany();
  await prisma.product.deleteMany();

  // Create products
  const products = await prisma.product.createMany({
    data: [
      {
        name: "Coca Cola",
        price: 5000,
        stock: 10,
        image:
          "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&h=400&fit=crop&crop=center",
      },
      {
        name: "Sprite",
        price: 5000,
        stock: 8,
        image:
          "https://images.unsplash.com/photo-1690988109041-458628590a9e?w=400&h=400&fit=crop&crop=center",
      },
      {
        name: "Malkist Abon",
        price: 8000,
        stock: 15,
        image:
          "https://images.unsplash.com/photo-1641189614066-59860ff72f2f?w=400&h=400&fit=crop&crop=center",
      },
      {
        name: "Aqua 600ml",
        price: 3000,
        stock: 20,
        image:
          "https://images.unsplash.com/photo-1612134678926-7592c521aa52?w=400&h=400&fit=crop&crop=center",
      },
      {
        name: "Oreo Original",
        price: 6000,
        stock: 12,
        image:
          "https://images.unsplash.com/photo-1599629954294-14df9ec8bc05?w=400&h=400&fit=crop&crop=center",
      },
    ],
  });

  console.log(`✅ Created ${products.count} products`);

  // Get the first product to create a sample transaction
  const firstProduct = await prisma.product.findFirst();

  if (firstProduct) {
    await prisma.transaction.create({
      data: {
        productId: firstProduct.id,
        productName: firstProduct.name,
        quantity: 1,
        totalPrice: firstProduct.price,
        moneyInserted: 10000,
        change: 5000,
        timestamp: new Date("2024-01-15T10:30:00.000Z"),
      },
    });
    console.log("✅ Created sample transaction");
  }

  console.log("🎉 Database seeding completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
