import { TestBed } from '@angular/core/testing';
import { SnackbarService } from './snackbar.service';

describe('SnackbarService', () => {
  it('opens and clears messages', () => {
    const service = TestBed.inject(SnackbarService);
    service.success('Saved');
    expect(service.message()?.type).toBe('success');
    service.clear();
    expect(service.message()).toBeNull();
  });
});
