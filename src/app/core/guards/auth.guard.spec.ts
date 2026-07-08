import { TestBed } from '@angular/core/testing';
import { CanActivateFn, provideRouter } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { authGuard } from './auth.guard';

class AuthMock {
  isAuthenticated = () => true;
}

describe('authGuard', () => {
  it('allows authenticated users', () => {
    TestBed.configureTestingModule({ providers: [provideRouter([]), { provide: AuthService, useClass: AuthMock }] });
    const result = TestBed.runInInjectionContext(() => (authGuard as CanActivateFn)({} as never, {} as never));
    expect(result).toBe(true);
  });
});
