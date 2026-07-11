import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AUTH_BASE_URL, API_ENDPOINTS } from '../../../core/constants/api.constants';
import { AuthApiService } from './auth-api.service';

describe('AuthApiService', () => {
  let service: AuthApiService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('posts token request', () => {
    service
      .token({ username: 'ritesh', password: 'ritesh123' })
      .subscribe((response) => expect(response.token).toBe('jwt'));
    const req = http.expectOne(`${AUTH_BASE_URL}${API_ENDPOINTS.authLogin}`);
    expect(req.request.method).toBe('POST');
    req.flush({ token: 'jwt' });
  });
});
