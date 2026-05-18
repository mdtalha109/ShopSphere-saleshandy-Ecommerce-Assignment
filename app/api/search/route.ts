import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/src/services";
import { ProductCategory } from "@/src/types";

/**
 * GET /api/search
 * Search products with filters
 * Query params: q, category, minPrice, maxPrice, sort
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const query = searchParams.get("q") || "";
  
    const products = query
      ? productService.searchProducts(query)
      : productService.getAllProducts();


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
          message: "Search failed",
          code: "SEARCH_ERROR",
        },
      },
      { status: 500 }
    );
  }
}
