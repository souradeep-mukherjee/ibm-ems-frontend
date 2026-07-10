import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-attendance-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './attendance-nav.html',
  styleUrl: './attendance-nav.css',
})
export class AttendanceNav {
   readonly links = [
    { label: 'Check In', route: '/attendance/checkin' },
    { label: 'Check Out', route: '/attendance/checkout' },
    { label: 'History', route: '/attendance/history' },
    { label: 'Monthly Report', route: '/attendance/report' }
  ];
}
