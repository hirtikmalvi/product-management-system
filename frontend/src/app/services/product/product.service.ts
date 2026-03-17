import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from '../../models/result/result.model';
import {
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
}
