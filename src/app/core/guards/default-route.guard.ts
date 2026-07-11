import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ROUTES } from '../constants/routes.constants';

export const defaultRouteGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.isAuthenticated()) {
    return router.createUrlTree([ROUTES.login]);
  }

  if (auth.isAdmin() || auth.isManager()) {
    return true;
  }

  if (auth.isEmployee()) {
    return router.createUrlTree([ROUTES.attendance]);
  }

  return router.createUrlTree([ROUTES.login]);
};
