import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { AttendanceService } from '../../services/attendance-service';
import { MonthlyAttendanceReport } from '../../models/monthly-attendance.model';
import { AuthApiService } from '../../../auth/services/auth-api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-attendance-monthly-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance-report.html',
  styleUrl: './attendance-report.css'
})
export class AttendanceReport implements OnInit {
  private readonly attendanceService = inject(AttendanceService);
  private readonly authService = inject(AuthApiService);

  readonly report = signal<MonthlyAttendanceReport | null>(null);
  readonly error = signal('');

  month = new Date().getMonth() + 1;
  year = new Date().getFullYear();

  // TODO: Replace with logged-in employee id

  ngOnInit(): void {
    this.loadReport(this.month, this.year);
  }

  private loadReport(month: number, year: number): void {

    const employeeId = this.authService.getEmployeeId();
    if (!employeeId) return;

    this.attendanceService
      .getMonthlyReport(employeeId, month, year)
      .subscribe({
        next: response => this.report.set(response),
        error: () => this.error.set('Unable to load monthly report.')
      });
  }

  onSearch(): void {
    this.loadReport(this.month, this.year);
  }
}