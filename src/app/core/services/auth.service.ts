import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { JwtRequest } from '../../features/auth/models/jwt-request';
import { AuthApiService } from '../../features/auth/services/auth-api.service';
import { TOKEN_KEY, ROLES_KEY } from '../constants/app.constants';
import { Role } from '../models/role.enum';
import { ROUTES } from '../constants/routes.constants';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly api = inject(AuthApiService);
  private readonly router = inject(Router);
  private readonly storage = inject(StorageService);
  private readonly tokenState = signal<string | null>(this.storage.get(TOKEN_KEY));
  private readonly rolesState = signal<string[] | null>(
    (() => {
      const raw = this.storage.get(ROLES_KEY);
      try {
        return raw ? (JSON.parse(raw) as string[]) : null;
      } catch {
        return null;
      }
    })(),
  );

  readonly token = this.tokenState.asReadonly();
  readonly roles = this.rolesState.asReadonly();
  readonly isAuthenticated = computed(() => Boolean(this.tokenState()));

  hasRole(role: Role | string): boolean {
    return Boolean(this.rolesState()?.includes(role as string));
  }

  hasAnyRole(roles: ReadonlyArray<Role | string>): boolean {
    const current = this.rolesState();
    if (!current) return false;
    return roles.some((r) => current.includes(r as string));
  }

  isAdmin(): boolean {
    return this.hasRole(Role.ROLE_ADMIN);
  }

  isManager(): boolean {
    return this.hasRole(Role.ROLE_MANAGER);
  }

  isEmployee(): boolean {
    return this.hasRole(Role.ROLE_EMPLOYEE);
  }

  login(request: JwtRequest): Observable<void> {
    return this.api.loginServiceCall(request).pipe(
      tap((response) => {
        this.storage.set(TOKEN_KEY, response.data.token);
        this.tokenState.set(response.data.token);
        // persist roles as JSON
        try {
          this.storage.set(ROLES_KEY, JSON.stringify(response.data.roles || []));
          this.rolesState.set(response.data.roles || []);
        } catch {
          this.rolesState.set(null);
        }
      }),
      map(() => undefined),
    );
  }

  logout(): void {
    this.storage.remove(TOKEN_KEY);
    this.storage.remove(ROLES_KEY);
    this.tokenState.set(null);
    this.rolesState.set(null);
    void this.router.navigateByUrl(ROUTES.login);
  }
}
