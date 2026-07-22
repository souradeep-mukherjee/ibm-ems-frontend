import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { AttendanceHistoryModel } from '../../models/attendance-history.model';
import { AttendanceService } from '../../services/attendance-service';
import { AuthApiService } from '../../../auth/services/auth-api.service';

@Component({
  selector: 'app-attendance-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attendance-history.html',
  styleUrl: './attendance-history.css'
})
export class AttendanceHistory implements OnInit {
  private readonly attendanceService = inject(AttendanceService);
  private readonly authService = inject(AuthApiService);

  readonly history = signal<AttendanceHistoryModel[]>([]);
  readonly error = signal('');

  // Replace with logged-in employee id

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    const employeeId = this.authService.getEmployeeId();
    if (!employeeId) return;

    this.attendanceService.getAttendanceHistory(employeeId).subscribe({
      next: response => this.history.set(response),
      error: () => this.error.set('Unable to load attendance history.')
    });
  }
}