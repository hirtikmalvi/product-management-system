import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service.ts.service';
import { LoginRequest } from '../../models/auth/login.model';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, NgIf],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  private authService = inject(AuthService);

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
          alert('User logged in successfully');
          this.initializeForm();
        } else {
          alert(response.errors?.join(', '));
        }
      },
      error: (err) => {
        console.log(err);
        alert('Something went wrong');
      },
    });
  }
}
