
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  pagination?: PaginationMeta;
}

export interface ApiError {
  success: false;
  error: {
    message: string;
    code: string;
    status: number;
  };
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SearchParams {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "price-asc" | "price-desc" | "rating" | "newest";
  page?: number;
  limit?: number;
}
