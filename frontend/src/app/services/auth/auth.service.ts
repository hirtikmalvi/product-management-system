import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  RegisterUserRequest,
  RegisterUserResponse,
} from '../../models/auth/register.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Result } from '../../models/result/result.model';
import { LoginRequest, LoginResponse } from '../../models/auth/login.model';
import { User } from '../user/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private URL: string = `https://localhost:7088/api`;
  userSubject = new BehaviorSubject<User | null>(this.getLoggedInUserDetails());
  user$ = this.userSubject.asObservable();

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
      this.userSubject.next(null);
    }
  }

  getRoleFromToken() {
    const token = localStorage.getItem('token');
    if (token == null) {
      return '';
    } else {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];
    }
  }

  getLoggedInUserDetails() {
    const token = localStorage.getItem('token');
    if (token == null) {
      return null;
    } else {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const user: User = {
        id: payload[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
        ],
        email:
          payload[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
          ],
        role: payload[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ],
      };
      return user;
    }
  }
}
