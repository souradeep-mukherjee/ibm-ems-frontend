import { HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { lastValueFrom, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { authInterceptor } from './auth.interceptor';

class AuthMock {
  token = () => 'abc';
}

describe('authInterceptor', () => {
  it('adds bearer token', async () => {
    TestBed.configureTestingModule({ providers: [{ provide: AuthService, useClass: AuthMock }] });
    const next: HttpHandlerFn = (request) => {
      expect(request.headers.get('Authorization')).toBe('Bearer abc');
      return of(new HttpResponse({ status: 200 }));
    };
    await TestBed.runInInjectionContext(() => lastValueFrom(authInterceptor(new HttpRequest('GET', '/api/v1/employees'), next)));
  });
});
