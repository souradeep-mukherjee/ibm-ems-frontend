import { NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ROUTES } from '../../../../core/constants/routes.constants';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { ErrorStateComponent } from '../../../../shared/components/error-state/error-state';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton';
import { EmployeeFormComponent } from '../../components/employee-form/employee-form';
import { Employee } from '../../models/employee.model';
import { UpdateEmployeeRequest } from '../../models/update-employee-request';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [NgIf, PageHeaderComponent, SkeletonComponent, ErrorStateComponent, EmployeeFormComponent],
  templateUrl: './employee-edit.html',
  styleUrl: './employee-edit.css'
})
export class EmployeeEditComponent implements OnInit {
  @ViewChild(EmployeeFormComponent) formComponent?: EmployeeFormComponent;
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(EmployeeService);
  private readonly snack = inject(SnackbarService);
  readonly employee = signal<Employee | undefined>(undefined);
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly failed = signal(false);
  private id = '';

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    this.service.getEmployeeById(this.id).pipe(finalize(() => this.loading.set(false))).subscribe({
      next: (employee) => this.employee.set(employee),
      error: () => this.failed.set(true)
    });
  }

  save(request: UpdateEmployeeRequest): void {
    this.saving.set(true);
    this.service.updateEmployee(this.id, request).pipe(finalize(() => this.saving.set(false))).subscribe({
      next: (employee) => {
        this.snack.success('Employee updated');
        void this.router.navigateByUrl(ROUTES.employeeDetails(employee.id));
      },
      error: (error: HttpErrorResponse) => this.formComponent?.applyBackendError(error)
    });
  }

  cancel(): void {
    void this.router.navigateByUrl(ROUTES.employeeDetails(this.id));
  }
}
