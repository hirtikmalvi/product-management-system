import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterUserRequest } from '../../models/auth/register.model';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  private authService = inject(AuthService);
  private router = inject(Router);
  private titleService = inject(Title);

  constructor() {
    this.titleService.setTitle('Register');
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.router.navigate(['products']);
      }
    });

    this.initializeForm();
  }

  initializeForm(): void {
    this.registerForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(150),
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.maxLength(320),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.maxLength(255),
      ]),
      role: new FormControl('0', [
        Validators.required,
        Validators.maxLength(15),
      ]),
    });
  }

  hasControlError(controlName: string, errorName: string): boolean {
    let control = this.registerForm.get(controlName);

    if (control != null) {
      return (
        (control?.touched || control?.dirty) && control?.hasError(errorName)
      );
    } else {
      return false;
    }
  }

  submitRegisterForm(): void {
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const request: RegisterUserRequest = this.registerForm.value;

    this.authService.register(request).subscribe({
      next: (response) => {
        if (response.success && response.statusCode == 201) {
          alert('User registered successfully');
          this.initializeForm();
          this.router.navigate(['auth', 'login']);
        } else {
          alert(response.errors?.join(', '));
        }
      },
      error: (err) => {
        alert('Something went wrong');
      },
    });
  }
}
