import { Component } from '@angular/core';
import { AttendanceNav } from '../../components/attendance-nav/attendance-nav';
import { AttendanceCheckIn } from '../attendance-check-in/attendance-check-in';
import { AttendanceHistory } from '../attendance-history/attendance-history';
import { AttendanceCheckOut } from '../attendance-check-out/attendance-check-out';
import { AttendanceReport } from '../attendance-report/attendance-report';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-attendance',
  imports: [AttendanceNav, RouterOutlet],
  templateUrl: './attendance.html',
  styleUrl: './attendance.css',
})
export class Attendance {}
