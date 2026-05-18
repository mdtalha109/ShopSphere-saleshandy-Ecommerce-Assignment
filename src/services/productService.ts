import { mockProducts } from "@/src/mock";
import { Product, ProductCategory } from "@/src/types";

/**
 * Handles all product data operations
 */

export const productService = {
    /**
     * Get all products
     */
    getAllProducts(): Product[] {
        return mockProducts.filter((p) => p.isPublished);
    },

    /**
     * Get product by ID
     */
    getProductById(id: string): Product | null {
        return mockProducts.find((p) => p.id === id && p.isPublished) || null;
    },

    /**
     * Get product by slug
     */
    getProductBySlug(slug: string): Product | null {
        return mockProducts.find((p) => p.slug === slug && p.isPublished) || null;
    },

    /**
     * Get products by category
     * @param category - Product category
     * @param options - Pagination options (limit, page)
     */
    getProductsByCategory(
        category: ProductCategory,
        options?: { limit?: number; page?: number }
    ): { products: Product[]; total: number } {
        const allProducts = mockProducts.filter(
            (p) => p.category === category && p.isPublished
        );

        // If no pagination, return all products
        if (!options?.limit) {
            return {
                products: allProducts,
                total: allProducts.length,
            };
        }

        // Apply pagination
        const page = options.page || 1;
        const limit = options.limit;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        return {
            products: allProducts.slice(startIndex, endIndex),
            total: allProducts.length,
        };
    },


    /**
       * Search products by query
       * @param query - Search query
       */
    searchProducts(query: string): Product[] {
        const lowerQuery = query.toLowerCase();
        return mockProducts.filter(
            (p) =>
                p.isPublished &&
                (p.title.toLowerCase().includes(lowerQuery) ||
                    p.description.toLowerCase().includes(lowerQuery) ||
                    p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
                    p.brand.name.toLowerCase().includes(lowerQuery))
        );
    },
};
