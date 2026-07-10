import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
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
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'employees', component: EmployeeListComponent },
      { path: 'employees/create', component: EmployeeCreateComponent },
      { path: 'employees/:id', component: EmployeeDetailsComponent },
      { path: 'employees/:id/edit', component: EmployeeEditComponent },
      
      {
        path: 'attendance',
        component: Attendance,
        children: [
          { path: '', redirectTo: 'checkin', pathMatch: 'full' },
          { path: 'checkin', component: AttendanceCheckIn },
          { path: 'checkout', component: AttendanceCheckOut },
          { path: 'history', component: AttendanceHistory },
          { path: 'report', component: AttendanceReport },
        ]
      }

    ]
  },
  { path: '**', component: ErrorStateComponent }
];
