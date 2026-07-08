import { NgIf } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ButtonComponent } from '../button/button';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [NgIf, ButtonComponent],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css'
})
export class ConfirmDialogComponent {
  readonly open = input(false);
  readonly title = input('Confirm action');
  readonly message = input('Are you sure?');
  readonly confirmLabel = input('Confirm');
  readonly tone = input<'danger' | 'primary'>('primary');
  readonly confirmed = output<void>();
  readonly cancelled = output<void>();
}
