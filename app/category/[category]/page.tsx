import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { ProductCategory } from '@/src/types';
import { productService } from '@/src/services';
import { ProductListingLayout } from '@/src/features/product-listing';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

const categoryLabels: Record<ProductCategory, string> = {
  [ProductCategory.ELECTRONICS]: 'Electronics',
  [ProductCategory.CLOTHING]: 'Clothing',
  [ProductCategory.SHOES]: 'Shoes',
  [ProductCategory.ACCESSORIES]: 'Accessories',
  [ProductCategory.HOME_GARDEN]: 'Home & Garden',
  [ProductCategory.SPORTS_OUTDOORS]: 'Sports & Outdoors',
  [ProductCategory.BEAUTY_HEALTH]: 'Beauty & Health',
  [ProductCategory.BOOKS]: 'Books',
  [ProductCategory.TOYS_GAMES]: 'Toys & Games',
  [ProductCategory.JEWELRY]: 'Jewelry',
  [ProductCategory.AUTOMOTIVE]: 'Automotive',
  [ProductCategory.FOOD_BEVERAGES]: 'Food & Beverages',
};

const categoryDescriptions: Record<ProductCategory, string> = {
  [ProductCategory.ELECTRONICS]: 'Discover the latest gadgets and electronic devices',
  [ProductCategory.CLOTHING]: 'Shop the latest fashion trends and styles',
  [ProductCategory.SHOES]: 'Find your perfect pair of shoes',
  [ProductCategory.ACCESSORIES]: 'Complete your look with stylish accessories',
  [ProductCategory.HOME_GARDEN]: 'Transform your home and garden',
  [ProductCategory.SPORTS_OUTDOORS]: 'Gear up for your outdoor adventures',
  [ProductCategory.BEAUTY_HEALTH]: 'Beauty and wellness products for you',
  [ProductCategory.BOOKS]: 'Explore our collection of books',
  [ProductCategory.TOYS_GAMES]: 'Fun and entertainment for all ages',
  [ProductCategory.JEWELRY]: 'Elegant jewelry pieces for every occasion',
  [ProductCategory.AUTOMOTIVE]: 'Everything for your vehicle',
  [ProductCategory.FOOD_BEVERAGES]: 'Delicious food and refreshing beverages',
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const categoryEnum = category as ProductCategory;
  const label = categoryLabels[categoryEnum] || category;

  return {
    title: `${label} - ShopSphere`,
    description: categoryDescriptions[categoryEnum] || `Shop ${label.toLowerCase()} at ShopSphere`,
  };
}

export async function generateStaticParams() {
  return Object.values(ProductCategory).map((category) => ({
    category: category,
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const categoryEnum = category as ProductCategory;

  if (!Object.values(ProductCategory).includes(categoryEnum)) {
    notFound();
  }

  const result = productService.getProductsByCategory(categoryEnum);

  if (!result.products || result.products.length === 0) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h1>No products found in this category</h1>
        <p>Check back later for new products.</p>
      </div>
    );
  }

  const label = categoryLabels[categoryEnum];
  const description = categoryDescriptions[categoryEnum];

  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>}>
      <ProductListingLayout
        products={result.products}
        title={label}
        description={description}
      />
    </Suspense>
  );
}
