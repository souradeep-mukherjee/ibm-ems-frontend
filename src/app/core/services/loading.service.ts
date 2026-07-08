import { Injectable, computed, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private readonly requests = signal(0);
  readonly isLoading = computed(() => this.requests() > 0);

  show(): void {
    this.requests.update((count) => count + 1);
  }

  hide(): void {
    this.requests.update((count) => Math.max(0, count - 1));
  }
}
