import { Component, inject, signal } from '@angular/core';
import { AttendanceService } from '../../services/attendance-service';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-check-out',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './attendance-check-out.html',
  styleUrls: ['./attendance-check-out.css']
})
export class AttendanceCheckOut {
  private readonly attendanceService = inject(AttendanceService);

  readonly loading = signal(false);
  readonly message = signal('');
  readonly error = signal('');

  private readonly data = {
    employeeId: 'EMP101'
  };

  checkOut(): void {
    this.loading.set(true);
    this.message.set('');
    this.error.set('');

    this.attendanceService.checkOut(this.data).subscribe({
      next: () => {
        this.message.set('Checked out successfully.');
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Unable to check out.');
        console.log(err)
        this.loading.set(false);
      }
    });
  }
}