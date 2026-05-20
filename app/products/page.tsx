import { Metadata } from 'next';
import { productService } from '@/src/services';
import { ProductListingLayout } from '@/src/features/product-listing';

export const metadata: Metadata = {
  title: 'All Products - ShopSphere',
  description: 'Browse our complete collection of products. Find everything you need at ShopSphere.',
};

export default async function AllProductsPage() {
  const products = productService.getAllProducts();

  return (
    <ProductListingLayout
      products={products}
      title="All Products"
      description="Browse our complete collection"
    />
  );
}
