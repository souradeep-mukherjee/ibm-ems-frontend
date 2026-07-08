import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  get(key: string): string | null {
    return this.available() ? localStorage.getItem(key) : null;
  }

  set(key: string, value: string): void {
    if (this.available()) {
      localStorage.setItem(key, value);
    }
  }

  remove(key: string): void {
    if (this.available()) {
      localStorage.removeItem(key);
    }
  }

  private available(): boolean {
    return typeof localStorage !== 'undefined';
  }
}
