import { HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { lastValueFrom, of } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { authInterceptor } from './auth.interceptor';

class StorageMock {
  get = (key: string) => 'abc';
}

describe('authInterceptor', () => {
  it('adds bearer token', async () => {
    TestBed.configureTestingModule({
      providers: [{ provide: StorageService, useClass: StorageMock }],
    });
    const next: HttpHandlerFn = (request) => {
      expect(request.headers.get('Authorization')).toBe('Bearer abc');
      return of(new HttpResponse({ status: 200 }));
    };
    await TestBed.runInInjectionContext(() =>
      lastValueFrom(authInterceptor(new HttpRequest('GET', '/api/v1/employees'), next)),
    );
  });
});
