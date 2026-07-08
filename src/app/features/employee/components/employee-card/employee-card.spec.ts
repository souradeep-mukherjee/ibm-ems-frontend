import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmploymentStatus } from '../../models/employment-status.enum';
import { Gender } from '../../models/gender.enum';
import { EmployeeCardComponent } from './employee-card';

const employee: Employee = { id: '1', employeeCode: 'EMP1', firstName: 'Asha', lastName: 'Roy', gender: Gender.Female, email: 'asha@example.com', employmentStatus: EmploymentStatus.Active, addresses: [] };

describe('EmployeeCardComponent', () => {
  let fixture: ComponentFixture<EmployeeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EmployeeCardComponent], providers: [provideRouter([])] }).compileComponents();
    fixture = TestBed.createComponent(EmployeeCardComponent);
    fixture.componentRef.setInput('employee', employee);
    fixture.detectChanges();
  });

  it('creates', () => expect(fixture.componentInstance).toBeTruthy());
});
