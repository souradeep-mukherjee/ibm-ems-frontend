import { NgIf } from '@angular/common';
import { Component, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [NgIf],
  templateUrl: './input.html',
  styleUrl: './input.css',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: InputComponent, multi: true }]
})
export class InputComponent implements ControlValueAccessor {
  readonly label = input('');
  readonly type = input('text');
  readonly placeholder = input('');
  readonly error = input('');

  value = '';
  disabled = false;

  private onChange: (value: string) => void = () => undefined;
  private onTouched: () => void = () => undefined;

  writeValue(value: string | null): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  update(value: string): void {
    this.value = value;
    this.onChange(value);
  }

  blur(): void {
    this.onTouched();
  }
}
