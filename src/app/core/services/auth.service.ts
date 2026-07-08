import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { JwtRequest } from '../../features/auth/models/jwt-request';
import { AuthApiService } from '../../features/auth/services/auth-api.service';
import { TOKEN_KEY } from '../constants/app.constants';
import { ROUTES } from '../constants/routes.constants';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = inject(AuthApiService);
  private readonly router = inject(Router);
  private readonly storage = inject(StorageService);
  private readonly tokenState = signal<string | null>(this.storage.get(TOKEN_KEY));

  readonly token = this.tokenState.asReadonly();
  readonly isAuthenticated = computed(() => Boolean(this.tokenState()));

  login(request: JwtRequest): Observable<void> {
    return this.api.token(request).pipe(
      tap((response) => {
        this.storage.set(TOKEN_KEY, response.token);
        this.tokenState.set(response.token);
      }),
      map(() => undefined)
    );
  }

  logout(): void {
    this.storage.remove(TOKEN_KEY);
    this.tokenState.set(null);
    void this.router.navigateByUrl(ROUTES.login);
  }
}
