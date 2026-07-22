import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ATTENDANCE_API_BASE_URL,
  API_ENDPOINTS,
  AUTH_BASE_URL
} from '../../../core/constants/api.constants';
import { MonthlyAttendanceReport } from '../models/monthly-attendance.model';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private readonly http = inject(HttpClient);

  getCurrentUser(): Observable<any> {
    return this.http.get<any>(`${AUTH_BASE_URL}${API_ENDPOINTS.authUser}`);
  }

  checkIn(data: { employeeId: string }): Observable<void> {
    return this.http.post<void>(
      `${ATTENDANCE_API_BASE_URL}${API_ENDPOINTS.attendanceCheckIn}`,
      data
    );
  }

  checkOut(data: { employeeId: string }): Observable<void> {
    return this.http.post<void>(
      `${ATTENDANCE_API_BASE_URL}${API_ENDPOINTS.attendanceCheckOut}`,
      data
    );
  }

  getAttendanceHistory(employeeId: string): Observable<any> {
    return this.http.get<any>(
      `${ATTENDANCE_API_BASE_URL}${API_ENDPOINTS.attendanceHistory(employeeId)}`
    );
  }

  getMonthlyReport(
    employeeId: string,
    month: number,
    year: number
  ): Observable<MonthlyAttendanceReport> {
    const params = new HttpParams()
      .set('month', month)
      .set('year', year);

    return this.http.get<MonthlyAttendanceReport>(
      `${ATTENDANCE_API_BASE_URL}${API_ENDPOINTS.attendanceMonthlyReport(employeeId)}`,
      { params }
    );
  }
}