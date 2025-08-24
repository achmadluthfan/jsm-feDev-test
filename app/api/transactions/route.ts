import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: {
        timestamp: "desc",
      },
      include: {
        product: true,
      },
    });

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const transaction = await prisma.transaction.create({
      data: {
        productId: body.productId,
        productName: body.productName,
        quantity: body.quantity || 1,
        totalPrice: body.totalPrice,
        moneyInserted: body.moneyInserted,
        change: body.change,
        timestamp: body.timestamp ? new Date(body.timestamp) : new Date(),
      },
      include: {
        product: true,
      },
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error("Error creating transaction:", error);
    return NextResponse.json(
      { error: "Failed to create transaction" },
      { status: 500 }
    );
  }
}
