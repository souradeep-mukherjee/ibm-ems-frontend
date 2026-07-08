import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input';

describe('InputComponent', () => {
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [InputComponent] }).compileComponents();
    fixture = TestBed.createComponent(InputComponent);
    fixture.detectChanges();
  });

  it('writes values through ControlValueAccessor', () => {
    fixture.componentInstance.writeValue('hello');
    expect(fixture.componentInstance.value).toBe('hello');
  });
});
