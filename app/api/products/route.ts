import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/src/services";

/**
 * GET /api/products
 * Returns all products
 */
export async function GET(request: NextRequest) {
  try {
    const products = productService.getAllProducts();

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        page: 1,
        limit: products.length,
        total: products.length,
        totalPages: 1,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Failed to fetch products",
          code: "FETCH_ERROR",
        },
      },
      { status: 500 }
    );
  }
}
