import { HttpErrorResponse, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { lastValueFrom, throwError } from 'rxjs';
import { SnackbarService } from '../services/snackbar.service';
import { errorInterceptor } from './error.interceptor';

describe('errorInterceptor', () => {
  it('publishes snackbar on error', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const snackbar = TestBed.inject(SnackbarService);
    const next: HttpHandlerFn = () => throwError(() => new HttpErrorResponse({ status: 500 }));
    await TestBed.runInInjectionContext(() => lastValueFrom(errorInterceptor(new HttpRequest('GET', '/x'), next))).catch(() => undefined);
    expect(snackbar.message()?.type).toBe('error');
  });
});
