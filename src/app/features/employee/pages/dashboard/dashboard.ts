import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header';
import { SkeletonComponent } from '../../../../shared/components/skeleton/skeleton';
import { EmployeeCardComponent } from '../../components/employee-card/employee-card';
import { Employee } from '../../models/employee.model';
import { EmploymentStatus } from '../../models/employment-status.enum';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, PageHeaderComponent, SkeletonComponent, EmployeeCardComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  private readonly service = inject(EmployeeService);
  readonly auth = inject(AuthService);
  readonly employees = signal<Employee[]>([]);
  readonly loading = signal(true);
  readonly cards = computed(() => {
    const all = this.employees();
    return [
      { label: 'Total Employees', value: all.length },
      {
        label: 'Active Employees',
        value: all.filter((employee) => employee.employmentStatus === EmploymentStatus.Active)
          .length,
      },
      {
        label: 'Inactive Employees',
        value: all.filter((employee) => employee.employmentStatus === EmploymentStatus.Inactive)
          .length,
      },
      {
        label: 'Probation Employees',
        value: all.filter((employee) => employee.employmentStatus === EmploymentStatus.OnProbation)
          .length,
      },
      {
        label: 'Resigned Employees',
        value: all.filter((employee) => employee.employmentStatus === EmploymentStatus.Resigned)
          .length,
      },
      {
        label: 'Terminated Employees',
        value: all.filter((employee) => employee.employmentStatus === EmploymentStatus.Terminated)
          .length,
      },
    ];
  });
  readonly employmentTypes = computed(() =>
    Object.entries(
      this.employees().reduce<Record<string, number>>((acc, employee) => {
        const key = employee.employmentType ?? 'UNASSIGNED';
        acc[key] = (acc[key] ?? 0) + 1;
        return acc;
      }, {}),
    ),
  );
  readonly recent = computed(() => this.employees().slice(0, 5));

  ngOnInit(): void {
    this.service.getAllEmployees().subscribe({
      next: (employees) => this.employees.set(employees),
      error: () => {
        this.employees.set([]);
        this.loading.set(false);
      },
      complete: () => this.loading.set(false),
    });
  }
}
