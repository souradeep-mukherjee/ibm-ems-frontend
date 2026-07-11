import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { defaultRouteGuard } from './core/guards/default-route.guard';
import { roleGuard } from './core/guards/role.guard';
import { Role } from './core/models/role.enum';
import { LoginComponent } from './features/auth/pages/login/login';
import { DashboardComponent } from './features/employee/pages/dashboard/dashboard';
import { EmployeeCreateComponent } from './features/employee/pages/employee-create/employee-create';
import { EmployeeDetailsComponent } from './features/employee/pages/employee-details/employee-details';
import { EmployeeEditComponent } from './features/employee/pages/employee-edit/employee-edit';
import { EmployeeListComponent } from './features/employee/pages/employee-list/employee-list';
import { MainLayoutComponent } from './layouts/main-layout/main-layout';
import { ErrorStateComponent } from './shared/components/error-state/error-state';
import { Attendance } from './features/attendance/pages/attendance/attendance';
import { AttendanceCheckIn } from './features/attendance/pages/attendance-check-in/attendance-check-in';
import { AttendanceCheckOut } from './features/attendance/pages/attendance-check-out/attendance-check-out';
import { AttendanceHistory } from './features/attendance/pages/attendance-history/attendance-history';
import { AttendanceReport } from './features/attendance/pages/attendance-report/attendance-report';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    // canActivate: [authGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: DashboardComponent,
        canActivate: [defaultRouteGuard],
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [roleGuard([Role.ROLE_ADMIN, Role.ROLE_MANAGER])],
      },
      {
        path: 'employees',
        component: EmployeeListComponent,
        canActivate: [roleGuard([Role.ROLE_ADMIN, Role.ROLE_MANAGER])],
      },
      {
        path: 'employees/create',
        component: EmployeeCreateComponent,
        canActivate: [roleGuard([Role.ROLE_ADMIN])],
      },
      {
        path: 'employees/:id',
        component: EmployeeDetailsComponent,
        canActivate: [roleGuard([Role.ROLE_ADMIN, Role.ROLE_MANAGER])],
      },
      {
        path: 'employees/:id/edit',
        component: EmployeeEditComponent,
        canActivate: [roleGuard([Role.ROLE_ADMIN])],
      },

      {
        path: 'attendance',
        component: Attendance,
        canActivate: [roleGuard([Role.ROLE_ADMIN, Role.ROLE_MANAGER, Role.ROLE_EMPLOYEE])],
        children: [
          { path: '', redirectTo: 'checkin', pathMatch: 'full' },
          { path: 'checkin', component: AttendanceCheckIn },
          { path: 'checkout', component: AttendanceCheckOut },
          { path: 'history', component: AttendanceHistory },
          { path: 'report', component: AttendanceReport },
        ],
      },
    ],
  },
  { path: '**', component: ErrorStateComponent },
];
