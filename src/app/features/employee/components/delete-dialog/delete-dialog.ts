import { Component, input, output } from '@angular/core';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [ConfirmDialogComponent],
  templateUrl: './delete-dialog.html',
  styleUrl: './delete-dialog.css'
})
export class DeleteDialogComponent {
  readonly employee = input<Employee | null>(null);
  readonly cancelled = output<void>();
  readonly confirmed = output<void>();
}
