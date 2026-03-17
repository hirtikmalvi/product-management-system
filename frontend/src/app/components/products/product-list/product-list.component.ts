import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
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
} from '../../../validators/custom-validators.validator';
import { ProductService } from '../../../services/product/product.service';
import {
  CreateProductRequest,
  EditProductRequest,
  ProductFilter,
  ProductResponse,
} from '../../../models/products/product.model';
import { CurrencyPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Category } from '../../../models/category/category.model';
import { CategoryService } from '../../../services/category/category.service';
import { Title } from '@angular/platform-browser';
import { ProductFormComponent } from '../product-form/product-form.component';
import { Result } from '../../../models/result/result.model';

declare var bootstrap: any;

@Component({
  selector: 'app-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  imports: [
    NgFor,
    NgIf,
    CurrencyPipe,
    DatePipe,
    ReactiveFormsModule,
    NgClass,
    ProductFormComponent,
  ],
})
export class ProductListComponent implements OnInit {
  filterForm!: FormGroup;
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private titleService = inject(Title);

  products: ProductResponse[] = [];
  categories: Category[] = [];

  selectedProduct: ProductResponse | null = null;
  isEditMode: boolean = false;
  showForm: boolean = false;

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

  deleteProduct(productId: number) {
    const confirmed = confirm('Delete this product?');

    if (!confirmed) return;

    this.productService.deleteProduct(productId).subscribe({
      next: (response) => {
        if (response.success && response.statusCode === 200) {
          alert('Product deleted successfully.');
          this.getAllProducts();
        } else {
          alert(response.errors?.join(', '));
        }
      },
      error: (error: Result<number>) => {
        alert(error.errors?.join(', '));
      },
    });
  }

  onAddProduct() {
    this.isEditMode = false;
    this.selectedProduct = null;

    this.showForm = false;
    setTimeout(() => {
      this.showForm = true;
    });

    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    modal.show();
  }

  editProduct(productId: number) {
    const product = this.products.find((p) => p.id === productId);

    if (!product) return;

    this.isEditMode = true;
    this.selectedProduct = product;

    this.showForm = false;
    setTimeout(() => (this.showForm = true));

    const modal = new bootstrap.Modal(document.getElementById('productModal'));

    modal.show();
  }

  onProductSaved(data: any) {
    if (!this.isEditMode) {
      // Add Product Mode
      const incomingData: CreateProductRequest = data;

      const productToAdd: CreateProductRequest = {
        name: incomingData.name,
        price: Number(incomingData?.price),
        description:
          incomingData?.description?.length === 0
            ? null
            : incomingData?.description,
        categoryId:
          Number(incomingData?.categoryId) === 0
            ? null
            : Number(incomingData?.categoryId),
        inStock: Boolean(incomingData?.inStock),
        manufactureDate: new Date(incomingData?.manufactureDate),
      };

      this.productService.createProduct(productToAdd).subscribe({
        next: (response) => {
          if (response.success && response.statusCode === 200) {
            alert('Product added successfully.');
            this.getAllProducts();
          } else {
            alert(response.errors?.join(', '));
          }
        },
        error: (error: Result<number>) => {
          alert(error.errors?.join(', '));
        },
      });
    } else {
      // Edit Mode
      const incomingData: EditProductRequest = data;

      const productToEdit: EditProductRequest = {
        id: incomingData.id,
        name: incomingData.name,
        price: Number(incomingData?.price),
        description:
          incomingData?.description?.length === 0
            ? null
            : incomingData?.description,
        categoryId:
          Number(incomingData?.categoryId) === 0
            ? null
            : Number(incomingData?.categoryId),
        inStock: Boolean(incomingData?.inStock),
        manufactureDate: new Date(incomingData?.manufactureDate),
      };

      this.productService.editProduct(productToEdit).subscribe({
        next: (response) => {
          if (response.success && response.statusCode === 200) {
            alert('Product edited successfully.');
            this.getAllProducts();
          } else {
            alert(response.errors?.join(', '));
          }
        },
        error: (error: Result<number>) => {
          alert(error.errors?.join(', '));
        },
      });
    }

    const modalE1 = document.getElementById('productModal');
    const modal = bootstrap.Modal.getInstance(modalE1);

    modal.hide();
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
