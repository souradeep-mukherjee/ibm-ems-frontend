import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { EmploymentInfoComponent } from './employment-info';

describe('EmploymentInfoComponent', () => {
  let fixture: ComponentFixture<EmploymentInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EmploymentInfoComponent] }).compileComponents();
    fixture = TestBed.createComponent(EmploymentInfoComponent);
    fixture.componentRef.setInput('group', new FormBuilder().group({ joiningDate: [''], employmentType: [''], departmentId: [''], departmentName: [''], designationId: [''], designationName: [''], managerId: [''], workLocation: [''] }));
    fixture.detectChanges();
  });

  it('creates', () => expect(fixture.componentInstance).toBeTruthy());
});
