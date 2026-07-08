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
      { path: 'employees/:id/edit', component: EmployeeEditComponent }
    ]
  },
  { path: '**', component: ErrorStateComponent }
];
