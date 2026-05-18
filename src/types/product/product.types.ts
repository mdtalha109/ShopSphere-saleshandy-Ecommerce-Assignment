import { ProductCategory } from "./product-enums.types";
import {
  ProductBrand,
  ProductPrice,
  ProductRating,
  ProductStock,
  ProductImage,
  ProductSpecification,
} from "./product-attributes.types";

export interface Product {

  id: string;
  
  /** slug for url */
  slug: string;
  
  /** Product name */
  title: string;
  
  /** Detailed product description */
  description: string;
  
  /** Short description */
  shortDescription?: string;
  
  /** Product category */
  category: ProductCategory;
  
  /** Product brand information */
  brand: ProductBrand;
  
  /** Pricing information */
  price: ProductPrice;
  
  /** Rating and review data */
  rating: ProductRating;
  
  stock: ProductStock;
  
  /** Product images */
  images: ProductImage[];
  
  /** Product specifications */
  specifications: ProductSpecification[];
  
  /** Product tags for search/filtering */
  tags: string[];
  
  sku: string;
  
  createdAt: Date;
  
  /** Whether the product is featured */
  isFeatured?: boolean;
  
  /** Whether the product is published/active */
  isPublished: boolean;
  
  /** SEO metadata */
  seo?: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}
