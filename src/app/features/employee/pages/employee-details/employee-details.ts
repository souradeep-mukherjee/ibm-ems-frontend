import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { ErrorStateComponent } from '../../../../shared/components/error-state/error-state';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton';
import { StatusBadgeComponent } from '../../components/status-badge/status-badge';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    RouterLink,
    PageHeaderComponent,
    SkeletonComponent,
    ErrorStateComponent,
    StatusBadgeComponent,
  ],
  templateUrl: './employee-details.html',
  styleUrl: './employee-details.css',
})
export class EmployeeDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(EmployeeService);
  readonly auth = inject(AuthService);
  readonly employee = signal<Employee | null>(null);
  readonly loading = signal(true);
  readonly failed = signal(false);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.service
      .getEmployeeById(id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (employee) => this.employee.set(employee),
        error: () => this.failed.set(true),
      });
  }
}
