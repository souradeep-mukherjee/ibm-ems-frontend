import { Component, inject, signal } from '@angular/core';
import { AttendanceService } from '../../services/attendance-service';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { CommonModule } from '@angular/common';
import { AuthApiService } from '../../../auth/services/auth-api.service';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './attendance-check-out.html',
  styleUrls: ['./attendance-check-out.css']
})
export class AttendanceCheckOut {
  private readonly attendanceService = inject(AttendanceService);
  private readonly authService = inject(AuthApiService);

  readonly loading = signal(false);
  readonly message = signal('');
  readonly error = signal('');


  checkOut(): void {
    this.loading.set(true);
    this.message.set('');
    this.error.set('');

    const employeeId = this.authService.getEmployeeId();
    if (!employeeId) return;

    this.attendanceService.checkOut({ employeeId }).subscribe({
      next: () => {
        this.message.set('Checked out successfully.');
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.error.message);
        this.loading.set(false);
      }
    });
  }
}