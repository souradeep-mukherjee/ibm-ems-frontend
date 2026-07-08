import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL, API_ENDPOINTS } from '../../../core/constants/api.constants';
import { JwtRequest } from '../models/jwt-request';
import { JwtResponse } from '../models/jwt-response';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private readonly http = inject(HttpClient);

  token(request: JwtRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${API_BASE_URL}${API_ENDPOINTS.authToken}`, request);
  }
}
