import { NextRequest, NextResponse } from "next/server";
import { productService } from "@/src/services";

interface RouteContext {
  params: Promise<{ slug: string }>;
}

/**
 * GET /api/products/slug/[slug]
 * Returns product by slug
 */
export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;

    const product = productService.getProductBySlug(slug);

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Product not found",
            code: "NOT_FOUND",
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          message: "Failed to fetch product",
          code: "FETCH_ERROR",
        },
      },
      { status: 500 }
    );
  }
}
