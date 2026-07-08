import { Injectable, signal } from '@angular/core';

export type SnackbarType = 'success' | 'error' | 'info';

export interface SnackbarMessage {
  text: string;
  type: SnackbarType;
}

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  readonly message = signal<SnackbarMessage | null>(null);
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  success(text: string): void { this.open(text, 'success'); }
  error(text: string): void { this.open(text, 'error'); }
  info(text: string): void { this.open(text, 'info'); }

  clear(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    this.message.set(null);
  }

  private open(text: string, type: SnackbarType): void {
    this.clear();
    this.message.set({ text, type });
    this.timeoutId = setTimeout(() => this.message.set(null), 3500);
  }
}
