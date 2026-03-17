export interface ProductFilter {
  name: string | null;
  categoryId: number | null;
  inStock: boolean | null;
  minPrice: number | null;
  maxPrice: number | null;
  createdToDate: Date | null;
  createdFromDate: Date | null;
}

export interface ProductResponse {
  id: number;
  name: string;
  description: string | null;
  price: number;
  categoryId: number | null;
  categoryName: string | null;
  inStock: boolean;
  manufactureDate: Date;
  createdAt: Date;
}

export interface CreateProductRequest {
  name: string;
  description: string | null;
  price: number;
  categoryId: number | null;
  inStock: boolean;
  manufactureDate: Date;
}

export interface EditProductRequest {
  id: number;
  name: string;
  description: string | null;
  price: number;
  categoryId: number | null;
  inStock: boolean;
  manufactureDate: Date;
}
