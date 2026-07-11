import { NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ROUTES } from '../../../../core/constants/routes.constants';
import { AuthService } from '../../../../core/services/auth.service';
import { SnackbarService } from '../../../../core/services/snackbar.service';
import { ButtonComponent } from '../../../../shared/components/button/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, ButtonComponent],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly snack = inject(SnackbarService);

  readonly loading = signal(false);
  readonly error = signal('');
  readonly form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    console.log('raw', raw);
    // const roles = (raw.password ?? '')
    //   .split(',')
    //   .map((role) => role.trim())
    //   .filter(Boolean);
    this.loading.set(true);
    this.error.set('');
    this.auth
      .login({ username: raw.username ?? '', password: raw.password ?? '' })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          this.snack.success('Signed in successfully');
          const destination =
            this.auth.isAdmin() || this.auth.isManager()
              ? ROUTES.dashboard
              : this.auth.isEmployee()
                ? ROUTES.attendance
                : ROUTES.login;
          void this.router.navigateByUrl(destination);
        },
        error: (error: HttpErrorResponse) => this.error.set(error.message),
      });
  }
}
