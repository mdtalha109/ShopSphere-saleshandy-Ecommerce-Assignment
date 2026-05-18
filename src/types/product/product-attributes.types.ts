
import { StockStatus } from "./product-enums.types";

export interface ProductSpecification {
  key: string;
  value: string;
  unit?: string;
}

export interface ProductImage {
  id?: string;
  url: string;
  alt?: string;
  isPrimary: boolean;
  width?: number;
  height?: number;
}

export interface ProductRating {
  average: number;
  count: number;
}


export interface ProductStock {
  quantity: number;
  inStock: boolean;
  status: StockStatus;
}

export interface ProductPrice {
  current: number;
  original: number;
  discountPercentage: number;
  currency: string;
  onSale: boolean;
}

export interface ProductBrand {
  id: string;
  name: string;
  slug: string;
}
