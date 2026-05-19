import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";
import { FeaturedCategories, ProductsByCategory } from "@/src/components/home";
import { makeQueryClient } from "@/src/lib/query/getQueryClient";
import { productKeys } from "@/src/hooks/api";
import { productService } from "@/src/services";
import { ProductCategory } from "@/src/types";

const HOMEPAGE_CATEGORIES: ProductCategory[] = [
  ProductCategory.ELECTRONICS,
  ProductCategory.ACCESSORIES,
];

export const metadata: Metadata = {
  title: "ShopSphere - Your Ultimate Online Shopping Destination",
  description:
    "Discover amazing deals on electronics, accessories, and more. Shop the latest products with fast shipping and great customer service.",
  keywords: "online shopping, electronics, accessories, ecommerce",
  openGraph: {
    title: "ShopSphere - Your Ultimate Online Shopping Destination",
    description: "Discover amazing deals on electronics, accessories, and more.",
    type: "website",
  },
};

export default async function Home() {
  const queryClient = makeQueryClient();

  try {
    await Promise.all(
      HOMEPAGE_CATEGORIES.map((category) =>
        queryClient.prefetchQuery({
          queryKey: productKeys.category(category, 10),
          queryFn: async () => {
            const result = await productService.getProductsByCategory(category, { limit: 10, page: 1 });
            return result.products;
          },
        })
      )
    );
  } catch (error) {
    console.error('Failed to prefetch homepage products:', error);
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <main className="min-h-screen">
        <FeaturedCategories />
        <ProductsByCategory />
      </main>
    </HydrationBoundary>
  );
}
