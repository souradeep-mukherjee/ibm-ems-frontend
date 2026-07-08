import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ROUTES } from '../../../../core/constants/routes.constants';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header';
import { EmployeeFormComponent } from '../../components/employee-form/employee-form';
import { CreateEmployeeRequest } from '../../models/create-employee-request';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-create',
  standalone: true,
  imports: [PageHeaderComponent, EmployeeFormComponent],
  templateUrl: './employee-create.html',
  styleUrl: './employee-create.css'
})
export class EmployeeCreateComponent {
  @ViewChild(EmployeeFormComponent) formComponent?: EmployeeFormComponent;
  private readonly service = inject(EmployeeService);
  private readonly router = inject(Router);
  private readonly snack = inject(SnackbarService);
  readonly loading = signal(false);

  save(request: CreateEmployeeRequest): void {
    this.loading.set(true);
    this.service.createEmployee(request).pipe(finalize(() => this.loading.set(false))).subscribe({
      next: (employee) => {
        this.snack.success('Employee created');
        void this.router.navigateByUrl(ROUTES.employeeDetails(employee.id));
      },
      error: (error: HttpErrorResponse) => this.formComponent?.applyBackendError(error)
    });
  }

  cancel(): void {
    void this.router.navigateByUrl(ROUTES.employees);
  }
}
