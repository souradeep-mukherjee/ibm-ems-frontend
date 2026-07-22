import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH_BASE_URL, API_ENDPOINTS } from '../../../core/constants/api.constants';
import { JwtRequest } from '../models/jwt-request';
import { JwtResponse } from '../models/jwt-response';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private readonly http = inject(HttpClient);

  loginServiceCall(request: JwtRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${AUTH_BASE_URL}${API_ENDPOINTS.authLogin}`, request);
  }

  readonly employeeId = signal<string | null>(null);

  setEmployeeId(id: string) {
    this.employeeId.set(id);
  }

  getEmployeeId(): string | null {
    return this.employeeId();
  }
}
