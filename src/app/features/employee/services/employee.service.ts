import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL, API_ENDPOINTS } from '../../../core/constants/api.constants';
import { Page } from '../../../core/models/page.model';
import { CreateEmployeeRequest } from '../models/create-employee-request';
import { Employee } from '../models/employee.model';
import { EmploymentStatus } from '../models/employment-status.enum';
import { UpdateEmployeeRequest } from '../models/update-employee-request';
import { UpdateStatusRequest } from '../models/update-status-request';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly http = inject(HttpClient);
  private readonly base = `${API_BASE_URL}${API_ENDPOINTS.employees}`;

  createEmployee(request: CreateEmployeeRequest): Observable<Employee> {
    return this.http.post<Employee>(this.base, request);
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${API_BASE_URL}${API_ENDPOINTS.employeeById(id)}`);
  }

  updateEmployee(id: string, request: UpdateEmployeeRequest): Observable<Employee> {
    return this.http.put<Employee>(`${API_BASE_URL}${API_ENDPOINTS.employeeById(id)}`, request);
  }

  deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}${API_ENDPOINTS.employeeById(id)}`);
  }

  getEmployeeByCode(code: string): Observable<Employee> {
    return this.http.get<Employee>(`${API_BASE_URL}${API_ENDPOINTS.employeeByCode(code)}`);
  }

  getByDepartment(departmentId: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${API_BASE_URL}${API_ENDPOINTS.employeesByDepartment(departmentId)}`);
  }

  getByDesignation(designationId: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${API_BASE_URL}${API_ENDPOINTS.employeesByDesignation(designationId)}`);
  }

  getByManager(managerId: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${API_BASE_URL}${API_ENDPOINTS.employeesByManager(managerId)}`);
  }

  getByStatus(status: EmploymentStatus): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${API_BASE_URL}${API_ENDPOINTS.employeesByStatus(status)}`);
  }

  updateStatus(id: string, request: UpdateStatusRequest): Observable<Employee> {
    return this.http.patch<Employee>(`${API_BASE_URL}${API_ENDPOINTS.employeeStatus(id)}`, request);
  }

  getEmployees(page = 0, size = 10, sortBy = 'firstName', direction: 'asc' | 'desc' = 'asc'): Observable<Page<Employee>> {
    const params = new HttpParams()
      .set('page', page)
      .set('size', size)
      .set('sortBy', sortBy)
      .set('direction', direction);
    return this.http.get<Page<Employee>>(this.base, { params });
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${API_BASE_URL}${API_ENDPOINTS.employeesAll}`);
  }
}
