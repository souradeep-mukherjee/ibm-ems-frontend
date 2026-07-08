import { Component, computed, input } from '@angular/core';
import { EmploymentStatus } from '../../models/employment-status.enum';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  templateUrl: './status-badge.html',
  styleUrl: './status-badge.css'
})
export class StatusBadgeComponent {
  readonly status = input<EmploymentStatus>(EmploymentStatus.Active);
  readonly label = computed(() => this.status().replace('_', ' '));
}
