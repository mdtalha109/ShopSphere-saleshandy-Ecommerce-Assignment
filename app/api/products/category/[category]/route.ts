import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/src/services";
import { ProductCategory } from "@/src/types";

interface RouteContext {
  params: Promise<{ category: string }>;
}

/**
 * GET /api/products/category/[category]
 * Returns products by category
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { category } = await context.params;
    const { searchParams } = new URL(request.url);

    // Get pagination params
    const limit = searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!)
      : undefined;
    const page = searchParams.get("page")
      ? parseInt(searchParams.get("page")!)
      : 1;

    // Validate category
    if (!Object.values(ProductCategory).includes(category as ProductCategory)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Invalid category",
            code: "INVALID_CATEGORY",
          },
        },
        { status: 400 }
      );
    }

    // Get products with pagination
    const { products, total } = productService.getProductsByCategory(
      category as ProductCategory,
      limit ? { limit, page } : undefined
    );

    const totalPages = limit ? Math.ceil(total / limit) : 1;

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit: limit || total,
        total,
        totalPages,
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
