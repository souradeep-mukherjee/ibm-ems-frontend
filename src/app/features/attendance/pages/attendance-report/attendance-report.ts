import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { AttendanceService } from '../../services/attendance-service';
import { MonthlyAttendanceReport } from '../../models/monthly-attendance.model';

@Component({
  selector: 'app-attendance-monthly-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attendance-report.html',
  styleUrl: './attendance-report.css'
})
export class AttendanceReport implements OnInit {
  private readonly attendanceService = inject(AttendanceService);

  readonly report = signal<MonthlyAttendanceReport | null>(null);
  readonly error = signal('');

  // TODO: Replace with logged-in employee id
  private readonly employeeId = 'EMP101';

  ngOnInit(): void {
    this.loadReport(7, 2026);
  }

  private loadReport(month: number, year: number): void {
    this.attendanceService
      .getMonthlyReport(this.employeeId, month, year)
      .subscribe({
        next: response => this.report.set(response),
        error: () => this.error.set('Unable to load monthly report.')
      });
  }
}