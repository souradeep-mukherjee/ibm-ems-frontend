import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { API_ENDPOINTS } from '../constants/api.constants';
import { StorageService } from '../services/storage.service';
import { TOKEN_KEY } from '../constants/app.constants';

// Read the token directly from storage to avoid injecting services that
// depend on HttpClient (which can create a circular dependency when
// used inside an HTTP interceptor).
export const authInterceptor: HttpInterceptorFn = (request, next) => {
  if (request.url.includes(API_ENDPOINTS.authLogin)) {
    return next(request);
  }

  const storage = inject(StorageService);
  const token = storage.get(TOKEN_KEY);

  console.log('auth interceptor token', token);

  return next(
    token ? request.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : request,
  );
};
