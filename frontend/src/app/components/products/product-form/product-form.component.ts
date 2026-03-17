import { NgFor, NgIf } from '@angular/common';
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
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Category } from '../../../models/category/category.model';
import { CategoryService } from '../../../services/category/category.service';
import { CreateProductRequest } from '../../../models/products/product.model';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  imports: [ReactiveFormsModule, FormsModule, NgIf, NgFor],
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  categories: Category[] = [];

  private categoryService = inject(CategoryService);
  private productService = inject(ProductService);

  @Input() product: any = null;
  @Input() isEditMode: boolean = false;

  @Output() saved = new EventEmitter<any>();

  ngOnInit() {
    this.getCategories();
    this.initializeProductForm();

    if (this.product) {
      this.productForm.patchValue({
        ...this.product,
        manufactureDate: this.product?.manufactureDate
          ? this.product.manufactureDate.split('T')[0]
          : null,
      });
    }
  }

  initializeProductForm() {
    this.productForm = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(200),
      ]),
      description: new FormControl(null),
      price: new FormControl(null, [Validators.required, Validators.min(0)]),
      categoryId: new FormControl(null, [Validators.min(1)]),
      inStock: new FormControl(true),
      manufactureDate: new FormControl(null, [Validators.required]),
    });
  }

  hasControlError(controlName: string, errorName: string): boolean {
    const control = this.productForm.get(controlName);
    if (control != null) {
      return (
        (control?.dirty || control?.touched) && control.hasError(errorName)
      );
    } else {
      return false;
    }
  }

  getCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        if (
          response?.success &&
          response?.statusCode == 200 &&
          response?.data?.length! > 0
        ) {
          this.categories = response.data!;
        } else {
          this.categories = [];
        }
      },
      error: (error) => {
        alert('An error occurred while getting categories.');
      },
    });
  }

  submitForm() {
    if (!this.productForm.valid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const formData = this.productForm.value;

    this.saved.emit(formData);
  }
}
