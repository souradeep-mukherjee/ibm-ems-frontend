import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { APP_NAME } from '../../core/constants/app.constants';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  readonly appName = APP_NAME;
  private readonly auth = inject(AuthService);

  logout(): void {
    this.auth.logout();
  }
}
