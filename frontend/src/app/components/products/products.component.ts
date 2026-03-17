import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  dateRangeValidator,
  priceRangeValidator,
} from '../../validators/custom-validators.validator';
import { ProductService } from '../../services/product/product.service';
import {
  ProductFilter,
  ProductResponse,
} from '../../models/products/product.model';
import { CurrencyPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Category } from '../../models/category/category.model';
import { CategoryService } from '../../services/category/category.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  imports: [NgFor, NgIf, CurrencyPipe, DatePipe, ReactiveFormsModule, NgClass],
})
export class ProductsComponent implements OnInit {
  filterForm!: FormGroup;
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private titleService = inject(Title);

  products: ProductResponse[] = [];
  categories: Category[] = [];

  constructor() {
    this.titleService.setTitle('Prodcuts');
  }

  ngOnInit() {
    this.initializeFilterForm();
    this.getAllProducts();
    this.getCategories();
  }

  initializeFilterForm() {
    this.filterForm = new FormGroup(
      {
        name: new FormControl(null),
        categoryId: new FormControl(null),
        inStock: new FormControl(null),
        minPrice: new FormControl(null),
        maxPrice: new FormControl(null),
        createdFromDate: new FormControl(null),
        createdToDate: new FormControl(null),
      },
      {
        validators: [dateRangeValidator, priceRangeValidator],
      },
    );
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        if (response.success && response.statusCode == 200) {
          if (response.data && response.data.length > 0) {
            this.categories = response.data;
          } else {
            this.categories = [];
          }
        }
      },
      error: (err) => {
        alert('Some error has occurred while getting categories.');
      },
    });
  }

  resetFilter() {
    this.initializeFilterForm();
    this.getAllProducts();
  }

  editProduct(productId: number) {
    console.log('Edit product', productId);
  }

  deleteProduct(productId: number) {
    const confirmed = confirm('Delete this product?');

    if (!confirmed) return;

    console.log('Delete product', productId);
  }

  // kind of submit button
  getAllProducts() {
    if (!this.filterForm.valid) {
      this.filterForm.markAllAsTouched();
      return;
    }

    const filter: ProductFilter = this.filterForm.value;

    this.productService.getProductsByFilter(filter).subscribe({
      next: (response) => {
        if (response.success && response.statusCode == 200) {
          if (response.data && response.data.length > 0) {
            this.products = response.data;
          } else {
            this.products = [];
          }
        }
      },
      error: (err) => {
        alert('Some error has occurred while getting products.');
      },
    });
  }
}
