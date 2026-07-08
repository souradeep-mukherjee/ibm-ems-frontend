import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API_BASE_URL, API_ENDPOINTS } from '../../../core/constants/api.constants';
import { AuthApiService } from './auth-api.service';

describe('AuthApiService', () => {
  let service: AuthApiService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(AuthApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('posts token request', () => {
    service.token({ username: 'admin', roles: ['ROLE_ADMIN'] }).subscribe((response) => expect(response.token).toBe('jwt'));
    const req = http.expectOne(`${API_BASE_URL}${API_ENDPOINTS.authToken}`);
    expect(req.request.method).toBe('POST');
    req.flush({ token: 'jwt' });
  });
});
