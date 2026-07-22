import { Component, inject, OnInit } from '@angular/core';
import { AttendanceNav } from '../../components/attendance-nav/attendance-nav';
import { RouterOutlet } from '@angular/router';
import { AuthApiService } from '../../../auth/services/auth-api.service';
import { AttendanceService } from '../../services/attendance-service';
import { UserDetails } from '../../models/user-details';

@Component({
  selector: 'app-attendance',
  imports: [AttendanceNav, RouterOutlet],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css',
})
export class Attendance implements OnInit {
 
  private readonly attendanceService = inject(AttendanceService);
  private readonly authService = inject(AuthApiService);
 
  ngOnInit(): void {
    this.attendanceService.getCurrentUser().subscribe({
      next: (res: UserDetails) => {
        this.authService.setEmployeeId(res.data.id);
      }
    });
  }
}
