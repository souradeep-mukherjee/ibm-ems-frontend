import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ROUTES } from '../constants/routes.constants';
import { Role } from '../models/role.enum';

// Returns a functional guard that permits access only if the user has any of the provided roles.
export const roleGuard = (allowed: Role[]): CanActivateFn => {
  return () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    if (auth.hasAnyRole(allowed)) return true;
    // redirect unauthorized users to dashboard
    return router.createUrlTree([ROUTES.login]);
  };
};
