import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  RegisterUserRequest,
  RegisterUserResponse,
} from '../../models/auth/register.model';
import { Observable } from 'rxjs';
import { Result } from '../../models/result/result.model';
import { LoginRequest, LoginResponse } from '../../models/auth/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private URL: string = `https://localhost:7088/api`;

  register(
    request: RegisterUserRequest,
  ): Observable<Result<RegisterUserResponse>> {
    return this.http.post<Result<RegisterUserResponse>>(
      `${this.URL}/auth/register`,
      request,
    );
  }

  login(request: LoginRequest): Observable<Result<LoginResponse>> {
    return this.http.post<Result<LoginResponse>>(
      `${this.URL}/auth/login`,
      request,
    );
  }

  logout(): void {
    if (localStorage.getItem('token') != null) {
      localStorage.removeItem('token');
    }
  }
}
