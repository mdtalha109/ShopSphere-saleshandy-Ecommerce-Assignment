import type { Product } from '@/src/types';
import { FilterCounts, PriceRange } from '../types';

export function countProductsByBrand(products: Product[]): Record<string, number> {
  const brandCounts: Record<string, number> = {};
  
  products.forEach((product) => {
    const slug = product.brand.slug;
    brandCounts[slug] = (brandCounts[slug] || 0) + 1;
  });

  return brandCounts;
}

export function countInStockProducts(products: Product[]): number {
  return products.filter((product) => product.stock.inStock).length;
}

export function calculatePriceRange(products: Product[]): PriceRange {
  if (products.length === 0) {
    return { min: 0, max: 0 };
  }

  let minPrice = Infinity;
  let maxPrice = -Infinity;

  products.forEach((product) => {
    const price = product.price.current;
    if (price < minPrice) minPrice = price;
    if (price > maxPrice) maxPrice = price;
  });

  return {
    min: minPrice === Infinity ? 0 : minPrice,
    max: maxPrice === -Infinity ? 0 : maxPrice,
  };
}

export function calculateFilterCounts(products: Product[]): FilterCounts {
  return {
    brands: countProductsByBrand(products),
    totalProducts: products.length,
    inStockCount: countInStockProducts(products),
    priceRange: calculatePriceRange(products),
  };
}

export function getUniqueBrands(
  products: Product[]
): Array<{ slug: string; name: string; count: number }> {
  const brandCounts = countProductsByBrand(products);
  const brandMap = new Map<string, string>();

  // Build map of slug -> name
  products.forEach((product) => {
    if (!brandMap.has(product.brand.slug)) {
      brandMap.set(product.brand.slug, product.brand.name);
    }
  });

  return Array.from(brandMap.entries())
    .map(([slug, name]) => ({
      slug,
      name,
      count: brandCounts[slug] || 0,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function filterBrandsBySearch(
  brands: Array<{ slug: string; name: string; count: number }>,
  searchQuery: string
): Array<{ slug: string; name: string; count: number }> {
  if (!searchQuery.trim()) {
    return brands;
  }

  const query = searchQuery.toLowerCase();
  return brands.filter((brand) => brand.name.toLowerCase().includes(query));
}
