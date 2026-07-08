import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { EmploymentStatus } from '../../models/employment-status.enum';
import { Gender } from '../../models/gender.enum';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeCreateComponent } from './employee-create';

const employee: Employee = { id: '1', employeeCode: 'EMP1', firstName: 'Asha', lastName: 'Roy', gender: Gender.Female, email: 'asha@example.com', employmentStatus: EmploymentStatus.Active, addresses: [] };

class EmployeeServiceMock {
  createEmployee() {
    return of(employee);
  }
}

describe('EmployeeCreateComponent', () => {
  let fixture: ComponentFixture<EmployeeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EmployeeCreateComponent], providers: [provideRouter([]), { provide: EmployeeService, useClass: EmployeeServiceMock }] }).compileComponents();
    fixture = TestBed.createComponent(EmployeeCreateComponent);
    fixture.detectChanges();
  });

  it('creates', () => expect(fixture.componentInstance).toBeTruthy());
});
