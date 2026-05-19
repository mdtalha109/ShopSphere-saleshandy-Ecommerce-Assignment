import { notFound } from "next/navigation";
import { Metadata } from "next";
import { productService } from "@/src/services";
import { ProductDetailClient } from "./ProductDetailClient";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = productService.getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.seo?.metaTitle || `${product.title} | ShopSphere`,
    description: product.seo?.metaDescription || product.description,
    keywords: product.seo?.keywords,
    openGraph: {
      title: product.title,
      description: product.shortDescription || product.description,
      images: [
        {
          url: product.images[0].url,
          width: 1200,
          height: 1200,
          alt: product.title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const products = productService.getAllProducts();
  
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  
  const product = productService.getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
