import { CommonModule, NgFor } from '@angular/common';
import { Component, input, output, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { StatusBadgeComponent } from '../status-badge/status-badge';
import { AuthService } from '../../../../core/services/auth.service';
import { Role } from '../../../../core/models/role.enum';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [NgFor, RouterLink, StatusBadgeComponent, CommonModule],
  templateUrl: './employee-table.html',
  styleUrl: './employee-table.css',
})
export class EmployeeTableComponent {
  readonly employees = input<Employee[]>([]);
  readonly direction = input<'asc' | 'desc'>('asc');
  readonly sortChange = output<string>();
  readonly deleteClick = output<Employee>();
  readonly statusClick = output<Employee>();
  readonly auth = inject(AuthService);
  readonly Role = Role;
}
