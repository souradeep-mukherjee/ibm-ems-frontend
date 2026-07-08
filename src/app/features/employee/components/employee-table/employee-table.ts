import { NgFor } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { StatusBadgeComponent } from '../status-badge/status-badge';

@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [NgFor, RouterLink, StatusBadgeComponent],
  templateUrl: './employee-table.html',
  styleUrl: './employee-table.css'
})
export class EmployeeTableComponent {
  readonly employees = input<Employee[]>([]);
  readonly direction = input<'asc' | 'desc'>('asc');
  readonly sortChange = output<string>();
  readonly deleteClick = output<Employee>();
  readonly statusClick = output<Employee>();
}
