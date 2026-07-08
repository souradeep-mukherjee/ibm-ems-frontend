import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error-state',
  standalone: true,
  templateUrl: './error-state.html',
  styleUrl: './error-state.css'
})
export class ErrorStateComponent {
  readonly title = input('Something went wrong');
  readonly message = input('Please try again in a moment.');
}
