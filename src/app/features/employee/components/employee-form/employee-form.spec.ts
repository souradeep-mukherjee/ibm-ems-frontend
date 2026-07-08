import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Gender } from '../../models/gender.enum';
import { EmployeeFormComponent } from './employee-form';

describe('EmployeeFormComponent', () => {
  let fixture: ComponentFixture<EmployeeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EmployeeFormComponent] }).compileComponents();
    fixture = TestBed.createComponent(EmployeeFormComponent);
    fixture.detectChanges();
  });

  it('validates required fields', () => {
    fixture.componentInstance.submit();
    expect(fixture.componentInstance.form.invalid).toBe(true);
  });

  it('emits create payload for valid form', () => {
    const component = fixture.componentInstance;
    const spy = vi.spyOn(component.saveCreate, 'emit');
    component.form.patchValue({ personal: { firstName: 'Asha', lastName: 'Roy', gender: Gender.Female }, contact: { email: 'asha@example.com' } });
    component.submit();
    expect(spy).toHaveBeenCalled();
  });
});
