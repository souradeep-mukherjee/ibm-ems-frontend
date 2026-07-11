import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { AuthApiService } from '../../features/auth/services/auth-api.service';
import { AuthService } from './auth.service';

class AuthApiMock {
  token() {
    return of({ token: 'abc' });
  }
}

@Component({ standalone: true, template: '' })
class LoginStubComponent {}

describe('AuthService', () => {
  beforeEach(() => {
    const values = new Map<string, string>();
    vi.stubGlobal('localStorage', {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
      removeItem: (key: string) => values.delete(key),
      clear: () => values.clear(),
    });
    TestBed.configureTestingModule({
      providers: [
        provideRouter([{ path: 'login', component: LoginStubComponent }]),
        { provide: AuthApiService, useClass: AuthApiMock },
      ],
    });
  });

  afterEach(() => vi.unstubAllGlobals());

  it('stores token on login', async () => {
    const service = TestBed.inject(AuthService);
    await new Promise<void>((resolve) =>
      service.login({ username: 'ritesh', password: 'ritesh123' }).subscribe(() => resolve()),
    );
    expect(service.isAuthenticated()).toBe(true);
    expect(service.token()).toBe('abc');
  });

  it('clears token on logout', () => {
    const service = TestBed.inject(AuthService);
    service.logout();
    expect(service.isAuthenticated()).toBe(false);
  });
});
