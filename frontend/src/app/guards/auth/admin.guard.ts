import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const role = authService.getRoleFromToken();

  if (role === '') {
    router.navigate(['auth', 'login']);
    return false;
  }
  if (role == 'Admin') {
    return true;
  }
  router.navigate(['access-denied']);
  return false;
};
