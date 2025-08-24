import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE() {
  try {
    await prisma.transaction.deleteMany();

    return NextResponse.json({
      message: "All transactions deleted successfully",
    });
  } catch (error) {
    console.error("Error clearing transactions:", error);
    return NextResponse.json(
      { error: "Failed to clear transactions" },
      { status: 500 }
    );
  }
}
