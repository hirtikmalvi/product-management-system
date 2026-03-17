import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../../models/result/result.model';
import {
  CreateProductRequest,
  EditProductRequest,
  ProductFilter,
  ProductResponse,
} from '../../models/products/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private URL = 'https://localhost:7088/api';

  getProductsByFilter(
    filter: ProductFilter,
  ): Observable<Result<ProductResponse[]>> {
    return this.http.post<Result<ProductResponse[]>>(
      `${this.URL}/products/get-all-products`,
      filter,
    );
  }

  createProduct(request: CreateProductRequest): Observable<Result<number>> {
    return this.http.post<Result<number>>(`${this.URL}/products`, request);
  }

  editProduct(request: EditProductRequest): Observable<Result<number>> {
    return this.http.put<Result<number>>(
      `${this.URL}/products/${request.id}`,
      request,
    );
  }

  deleteProduct(productId: number): Observable<Result<number>> {
    return this.http.delete<Result<number>>(
      `${this.URL}/products/${productId}`,
    );
  }
}
