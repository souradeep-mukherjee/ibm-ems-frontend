import { FormControl } from '@angular/forms';
import { dateNotFutureValidator, indianPhoneValidator, joiningDateValidator } from './validators';

describe('validators', () => {
  it('validates Indian phone numbers', () => {
    expect(indianPhoneValidator()(new FormControl('9876543210'))).toBeNull();
    expect(indianPhoneValidator()(new FormControl('123'))).toEqual({ indianPhone: true });
  });

  it('rejects future dates', () => {
    expect(dateNotFutureValidator()(new FormControl('2999-01-01'))).toEqual({ futureDate: true });
  });

  it('rejects joining dates before baseline', () => {
    expect(joiningDateValidator()(new FormControl('1949-01-01'))).toEqual({ joiningDate: true });
  });
});
