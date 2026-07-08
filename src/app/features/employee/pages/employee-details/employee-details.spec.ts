import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { EmploymentStatus } from '../../models/employment-status.enum';
import { Gender } from '../../models/gender.enum';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeDetailsComponent } from './employee-details';

const employee: Employee = { id: '1', employeeCode: 'EMP1', firstName: 'Asha', lastName: 'Roy', gender: Gender.Female, email: 'asha@example.com', employmentStatus: EmploymentStatus.Active, addresses: [] };

class EmployeeServiceMock {
  getEmployeeById() {
    return of(employee);
  }
}

describe('EmployeeDetailsComponent', () => {
  let fixture: ComponentFixture<EmployeeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDetailsComponent],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => '1' } } } },
        { provide: EmployeeService, useClass: EmployeeServiceMock }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(EmployeeDetailsComponent);
    fixture.detectChanges();
  });

  it('loads employee details', () => expect(fixture.componentInstance.employee()?.id).toBe('1'));
});
