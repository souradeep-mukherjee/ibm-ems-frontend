import { NgFor } from '@angular/common';
import { Component, input, output, signal } from '@angular/core';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog';
import { EMPLOYMENT_STATUS_OPTIONS, EmploymentStatus } from '../../models/employment-status.enum';

@Component({
  selector: 'app-status-dialog',
  standalone: true,
  imports: [NgFor, ConfirmDialogComponent],
  templateUrl: './status-dialog.html',
  styleUrl: './status-dialog.css'
})
export class StatusDialogComponent {
  readonly open = input(false);
  readonly cancelled = output<void>();
  readonly saved = output<EmploymentStatus>();
  readonly statuses = EMPLOYMENT_STATUS_OPTIONS;
  readonly status = signal<EmploymentStatus>(EmploymentStatus.Active);
}
