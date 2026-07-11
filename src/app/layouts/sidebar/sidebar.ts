import { NgFor } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { Role } from '../../core/models/role.enum';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgFor, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent {
  private readonly auth = inject(AuthService);

  private readonly allLinks: { label: string; route: string; roles: Role[] }[] = [
    { label: 'Dashboard', route: '/dashboard', roles: [Role.ROLE_ADMIN, Role.ROLE_MANAGER] },
    { label: 'Employees', route: '/employees', roles: [Role.ROLE_ADMIN, Role.ROLE_MANAGER] },
    { label: 'Add Employee', route: '/employees/create', roles: [Role.ROLE_ADMIN] },
    {
      label: 'Attendance',
      route: '/attendance',
      roles: [Role.ROLE_ADMIN, Role.ROLE_MANAGER, Role.ROLE_EMPLOYEE],
    },
  ];

  readonly links = computed(() => this.allLinks.filter((l) => this.auth.hasAnyRole(l.roles)));
}
