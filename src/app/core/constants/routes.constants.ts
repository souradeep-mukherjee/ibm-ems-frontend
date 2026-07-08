export const ROUTES = {
  login: '/login',
  dashboard: '/dashboard',
  employees: '/employees',
  employeeCreate: '/employees/create',
  employeeDetails: (id: string) => `/employees/${id}`,
  employeeEdit: (id: string) => `/employees/${id}/edit`
} as const;
