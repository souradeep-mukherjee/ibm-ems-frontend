import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {
  readonly links = [
    { label: 'Dashboard', route: '/dashboard' },
    { label: 'Employees', route: '/employees' },
    { label: 'Add Employee', route: '/employees/create' }
  ];
}
