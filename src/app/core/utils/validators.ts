import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { PHONE_REGEX } from '../constants/app.constants';

const asDate = (value: unknown): Date | null => {
  if (typeof value !== 'string' || value.trim().length === 0) {
    return null;
  }
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

export const indianPhoneValidator = (): ValidatorFn => (control: AbstractControl<string | null>): ValidationErrors | null => {
  const value = control.value;
  if (!value) {
    return null;
  }
  return PHONE_REGEX.test(value) ? null : { indianPhone: true };
};

export const dateNotFutureValidator = (): ValidatorFn => (control: AbstractControl<string | null>): ValidationErrors | null => {
  const value = asDate(control.value);
  if (!value) {
    return null;
  }
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return value <= today ? null : { futureDate: true };
};

export const joiningDateValidator = (): ValidatorFn => (control: AbstractControl<string | null>): ValidationErrors | null => {
  const value = asDate(control.value);
  if (!value) {
    return null;
  }
  const min = new Date('1950-01-01T00:00:00');
  return value >= min ? null : { joiningDate: true };
};
