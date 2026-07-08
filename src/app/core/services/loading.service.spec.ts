import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  it('tracks active requests with a signal', () => {
    const service = TestBed.inject(LoadingService);
    expect(service.isLoading()).toBe(false);
    service.show();
    expect(service.isLoading()).toBe(true);
    service.hide();
    expect(service.isLoading()).toBe(false);
  });
});
