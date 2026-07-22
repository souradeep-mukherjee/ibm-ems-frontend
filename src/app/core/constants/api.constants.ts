import { environment } from '../../../environments/environment';

export const AUTH_BASE_URL = environment.authBaseUrl;
export const EMP_BASE_URL = environment.empBaseUrl;

export const ATTENDANCE_API_BASE_URL = environment.attendanceBaseUrl;

export const API_ENDPOINTS = {
  authLogin: '/api/v1/auth/login',
  authUser: '/api/v1/users/me',
  employees: '/api/v1/employees',
  employeeById: (id: string) => `/api/v1/employees/${id}`,
  employeeByCode: (code: string) => `/api/v1/employees/code/${code}`,
  employeesByDepartment: (departmentId: string) => `/api/v1/employees/department/${departmentId}`,
  employeesByDesignation: (designationId: string) =>
    `/api/v1/employees/designation/${designationId}`,
  employeesByManager: (managerId: string) => `/api/v1/employees/manager/${managerId}`,
  employeesByStatus: (status: string) => `/api/v1/employees/status/${status}`,
  employeeStatus: (id: string) => `/api/v1/employees/${id}/status`,
  employeesAll: '/api/v1/employees/all',

  attendanceCheckIn: '/attendance/checkin',
  attendanceCheckOut: '/attendance/checkout',
  attendanceHistory: (employeeId: string) => `/attendance/history/${employeeId}`,
  attendanceMonthlyReport: (employeeId: string) => `/attendance/monthly/${employeeId}`,
} as const;
