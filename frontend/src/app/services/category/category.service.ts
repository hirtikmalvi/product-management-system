import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../../models/category/category.model';
import { Result } from '../../models/result/result.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private URL = 'https://localhost:7088/api';

  getCategories(): Observable<Result<Category[]>> {
    return this.http.get<Result<Category[]>>(`${this.URL}/categories`);
  }
}
