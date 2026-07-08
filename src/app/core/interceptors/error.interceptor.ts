import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ROUTES } from '../constants/routes.constants';
import { SnackbarService } from '../services/snackbar.service';

const messageFor = (error: HttpErrorResponse): string => {
  if (error.status === 0) return 'Unable to reach employee service.';
  if (typeof error.error === 'string' && error.error.trim()) return error.error;
  if (error.status === 400) return 'Please review the highlighted fields.';
  if (error.status === 401 || error.status === 403) return 'Your session has expired. Please sign in again.';
  if (error.status === 404) return 'The requested resource was not found.';
  if (error.status === 409) return 'A conflicting employee record already exists.';
  return 'Something went wrong. Please try again.';
};

export const errorInterceptor: HttpInterceptorFn = (request, next) => {
  const snackbar = inject(SnackbarService);
  const router = inject(Router);
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      snackbar.error(messageFor(error));
      if (error.status === 401 || error.status === 403) {
        void router.navigateByUrl(ROUTES.login);
      }
      return throwError(() => error);
    })
  );
};
