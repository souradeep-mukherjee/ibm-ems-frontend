import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { AttendanceHistoryModel } from '../../models/attendance-history.model';
import { AttendanceService } from '../../services/attendance-service';

@Component({
  selector: 'app-attendance-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './attendance-history.html',
  styleUrl: './attendance-history.css'
})
export class AttendanceHistory implements OnInit {
  private readonly attendanceService = inject(AttendanceService);

  readonly history = signal<AttendanceHistoryModel[]>([]);
  readonly error = signal('');

  // Replace with logged-in employee id
  private readonly employeeId = 'EMP101';

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void {
    this.attendanceService.getAttendanceHistory(this.employeeId).subscribe({
      next: response => this.history.set(response),
      error: () => this.error.set('Unable to load attendance history.')
    });
  }
}