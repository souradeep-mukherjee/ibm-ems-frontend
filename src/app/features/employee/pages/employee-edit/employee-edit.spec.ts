import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { EmploymentStatus } from '../../models/employment-status.enum';
import { Gender } from '../../models/gender.enum';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeEditComponent } from './employee-edit';

const employee: Employee = { id: '1', employeeCode: 'EMP1', firstName: 'Asha', lastName: 'Roy', gender: Gender.Female, email: 'asha@example.com', employmentStatus: EmploymentStatus.Active, addresses: [] };

class EmployeeServiceMock {
  getEmployeeById() {
    return of(employee);
  }

  updateEmployee() {
    return of(employee);
  }
}

describe('EmployeeEditComponent', () => {
  let fixture: ComponentFixture<EmployeeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeEditComponent],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        { provide: EmployeeService, useClass: EmployeeServiceMock }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(EmployeeEditComponent);
    fixture.detectChanges();
  });

  it('loads employee for editing', () => expect(fixture.componentInstance.employee()?.id).toBe('1'));
});
