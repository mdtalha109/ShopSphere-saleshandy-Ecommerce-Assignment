import { Metadata } from 'next';
import { Suspense } from 'react';
import { productService } from '@/src/services';
import { ProductListingLayout } from '@/src/features/product-listing';

export const metadata: Metadata = {
  title: 'All Products - ShopSphere',
  description: 'Browse our complete collection of products. Find everything you need at ShopSphere.',
};

export default async function AllProductsPage() {
  const products = productService.getAllProducts();

  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>}>
      <ProductListingLayout
        products={products}
        title="All Products"
        description="Browse our complete collection"
      />
    </Suspense>
  );
}
