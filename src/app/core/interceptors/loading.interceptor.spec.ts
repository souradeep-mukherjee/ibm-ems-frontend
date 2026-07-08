import { HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { lastValueFrom, of } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { loadingInterceptor } from './loading.interceptor';

describe('loadingInterceptor', () => {
  it('balances loading state', async () => {
    TestBed.configureTestingModule({});
    const loading = TestBed.inject(LoadingService);
    const next: HttpHandlerFn = () => of(new HttpResponse({ status: 200 }));
    await TestBed.runInInjectionContext(() => lastValueFrom(loadingInterceptor(new HttpRequest('GET', '/x'), next)));
    expect(loading.isLoading()).toBe(false);
  });
});
