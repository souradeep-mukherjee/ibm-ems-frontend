// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-attendance-check-in',
//   imports: [],
//   templateUrl: './attendance-check-in.html',
//   styleUrl: './attendance-check-in.css',
// })
// export class AttendanceCheckIn {}
import { Component, inject, signal } from '@angular/core';
import { AttendanceService } from '../../services/attendance-service';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-check-in',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './attendance-check-in.html',
  styleUrls: ['./attendance-check-in.css']
})
export class AttendanceCheckIn {
  private readonly attendanceService = inject(AttendanceService);

  readonly loading = signal(false);
  readonly message = signal('');
  readonly error = signal('');

  private readonly data = {
    employeeId: 'EMP101'
  };

  checkIn(): void {
    this.loading.set(true);
    this.message.set('');
    this.error.set('');

    this.attendanceService.checkIn(this.data).subscribe({
      next: () => {
        this.message.set('Checked in successfully.');
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.error.message);
        this.loading.set(false);
      }
    });
  }
}