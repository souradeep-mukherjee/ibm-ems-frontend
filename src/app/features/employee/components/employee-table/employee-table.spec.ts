import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmploymentStatus } from '../../models/employment-status.enum';
import { Gender } from '../../models/gender.enum';
import { EmployeeTableComponent } from './employee-table';

const employee: Employee = { id: '1', employeeCode: 'EMP1', firstName: 'Asha', lastName: 'Roy', gender: Gender.Female, email: 'asha@example.com', employmentStatus: EmploymentStatus.Active, addresses: [] };

describe('EmployeeTableComponent', () => {
  let fixture: ComponentFixture<EmployeeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EmployeeTableComponent], providers: [provideRouter([])] }).compileComponents();
    fixture = TestBed.createComponent(EmployeeTableComponent);
    fixture.componentRef.setInput('employees', [employee]);
    fixture.detectChanges();
  });

  it('renders rows', () => expect(fixture.nativeElement.textContent).toContain('Asha'));
});
