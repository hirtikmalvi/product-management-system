import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { adminGuard } from './guards/auth/admin.guard';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied/access-denied.component';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [adminGuard],
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  { path: 'access-denied', component: AccessDeniedComponent },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
