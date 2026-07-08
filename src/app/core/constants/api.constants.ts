import { environment } from '../../../environments/environment';

export const API_BASE_URL = environment.apiBaseUrl;
export const API_ENDPOINTS = {
  authToken: '/api/v1/auth/token',
  employees: '/api/v1/employees',
  employeeById: (id: string) => `/api/v1/employees/${id}`,
  employeeByCode: (code: string) => `/api/v1/employees/code/${code}`,
  employeesByDepartment: (departmentId: string) => `/api/v1/employees/department/${departmentId}`,
  employeesByDesignation: (designationId: string) => `/api/v1/employees/designation/${designationId}`,
  employeesByManager: (managerId: string) => `/api/v1/employees/manager/${managerId}`,
  employeesByStatus: (status: string) => `/api/v1/employees/status/${status}`,
  employeeStatus: (id: string) => `/api/v1/employees/${id}/status`,
  employeesAll: '/api/v1/employees/all'
} as const;
