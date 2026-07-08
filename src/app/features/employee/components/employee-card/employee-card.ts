import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { StatusBadgeComponent } from '../status-badge/status-badge';

@Component({
  selector: 'app-employee-card',
  standalone: true,
  imports: [RouterLink, StatusBadgeComponent],
  templateUrl: './employee-card.html',
  styleUrl: './employee-card.css'
})
export class EmployeeCardComponent {
  readonly employee = input.required<Employee>();
}
