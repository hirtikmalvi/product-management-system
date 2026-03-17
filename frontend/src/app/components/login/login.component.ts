import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { LoginRequest } from '../../models/auth/login.model';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, NgIf],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.maxLength(320),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.maxLength(255),
      ]),
    });
  }

  hasControlError(controlName: string, errorName: string): boolean {
    let control = this.loginForm.get(controlName);

    if (control != null) {
      return (
        (control?.touched || control?.dirty) && control?.hasError(errorName)
      );
    } else {
      return false;
    }
  }

  submitLoginForm() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const request: LoginRequest = this.loginForm.value;

    this.authService.login(request).subscribe({
      next: (response) => {
        if (response.success && response.statusCode == 200) {
          localStorage.setItem('token', response.data?.token!);

          // For getting user details on header or any other part
          const user = this.authService.getLoggedInUserDetails();
          this.authService.userSubject.next(user);

          alert('User logged in successfully');
          this.router.navigate(['products']);
          this.initializeForm();
        } else {
          alert('Invalid credentials');
        }
      },
      error: (err) => {
        console.log(err);
        alert('Something went wrong');
      },
    });
  }
}
