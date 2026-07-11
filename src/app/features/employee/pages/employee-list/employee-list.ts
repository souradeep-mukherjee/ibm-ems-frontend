import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DEFAULT_PAGE_SIZE } from '../../../../core/constants/app.constants';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton';
import { DeleteDialogComponent } from '../../components/delete-dialog/delete-dialog';
import { EmployeeTableComponent } from '../../components/employee-table/employee-table';
import { StatusDialogComponent } from '../../components/status-dialog/status-dialog';
import { Employee, EmployeeFilters } from '../../models/employee.model';
import { EMPLOYMENT_STATUS_OPTIONS, EmploymentStatus } from '../../models/employment-status.enum';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    FormsModule,
    RouterLink,
    ButtonComponent,
    PageHeaderComponent,
    SkeletonComponent,
    EmptyStateComponent,
    EmployeeTableComponent,
    PaginationComponent,
    DeleteDialogComponent,
    StatusDialogComponent,
  ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeListComponent implements OnInit {
  private readonly service = inject(EmployeeService);
  private readonly snack = inject(SnackbarService);
  readonly auth = inject(AuthService);
  readonly statuses = EMPLOYMENT_STATUS_OPTIONS;
  readonly loading = signal(true);
  readonly page = signal(0);
  readonly totalPages = signal(0);
  readonly totalElements = signal(0);
  readonly sortBy = signal('firstName');
  readonly direction = signal<'asc' | 'desc'>('asc');
  readonly employees = signal<Employee[]>([]);
  readonly selectedForDelete = signal<Employee | null>(null);
  readonly selectedForStatus = signal<Employee | null>(null);
  readonly filters = signal<EmployeeFilters>({
    search: '',
    departmentId: '',
    designationId: '',
    managerId: '',
    status: '',
  });
  readonly hasFilters = computed(() => Object.values(this.filters()).some(Boolean));

  ngOnInit(): void {
    this.load();
  }

  load(page = this.page()): void {
    this.loading.set(true);
    this.page.set(page);
    this.service.getEmployees(page, DEFAULT_PAGE_SIZE, this.sortBy(), this.direction()).subscribe({
      next: (result) => {
        this.employees.set(result.content);
        this.totalPages.set(result.totalPages);
        this.totalElements.set(result.totalElements);
      },
      error: () => {
        this.employees.set([]);
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }

  applyFilters(): void {
    this.loading.set(true);
    this.service.getAllEmployees().subscribe({
      next: (employees) => {
        const filter = this.filters();
        const search = filter.search.toLowerCase();
        const filtered = employees.filter(
          (employee) =>
            (!search ||
              [employee.firstName, employee.lastName, employee.email, employee.employeeCode]
                .join(' ')
                .toLowerCase()
                .includes(search)) &&
            (!filter.departmentId || employee.departmentId === filter.departmentId) &&
            (!filter.designationId || employee.designationId === filter.designationId) &&
            (!filter.managerId || employee.managerId === filter.managerId) &&
            (!filter.status || employee.employmentStatus === filter.status),
        );
        this.employees.set(filtered);
        this.totalElements.set(filtered.length);
        this.totalPages.set(filtered.length ? 1 : 0);
        this.page.set(0);
      },
      error: () => {
        this.employees.set([]);
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }

  clearFilters(): void {
    this.filters.set({
      search: '',
      departmentId: '',
      designationId: '',
      managerId: '',
      status: '',
    });
    this.load(0);
  }

  sort(field: string): void {
    if (this.sortBy() === field)
      this.direction.update((value) => (value === 'asc' ? 'desc' : 'asc'));
    else this.sortBy.set(field);
    this.load(0);
  }

  updateFilter<K extends keyof EmployeeFilters>(key: K, value: EmployeeFilters[K]): void {
    this.filters.update((filter) => ({ ...filter, [key]: value }));
  }

  deleteSelected(): void {
    const employee = this.selectedForDelete();
    if (!employee) return;

    this.service.deleteEmployee(employee.id).subscribe(() => {
      this.snack.success('Employee deleted');
      this.selectedForDelete.set(null);
      this.load(this.page());
    });
  }

  saveStatus(status: EmploymentStatus): void {
    const employee = this.selectedForStatus();
    if (!employee) return;

    this.service.updateStatus(employee.id, { status }).subscribe(() => {
      this.snack.success('Status updated');
      this.selectedForStatus.set(null);
      this.hasFilters() ? this.applyFilters() : this.load(this.page());
    });
  }
}
