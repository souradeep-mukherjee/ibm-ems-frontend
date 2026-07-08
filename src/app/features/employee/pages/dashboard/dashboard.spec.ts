import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { EmploymentStatus } from '../../models/employment-status.enum';
import { Gender } from '../../models/gender.enum';
import { EmployeeService } from '../../services/employee.service';
import { DashboardComponent } from './dashboard';

const employee: Employee = { id: '1', employeeCode: 'EMP1', firstName: 'Asha', lastName: 'Roy', gender: Gender.Female, email: 'asha@example.com', employmentStatus: EmploymentStatus.Active, addresses: [] };

class EmployeeServiceMock {
  getAllEmployees() {
    return of([employee]);
  }
}

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [DashboardComponent], providers: [provideRouter([]), { provide: EmployeeService, useClass: EmployeeServiceMock }] }).compileComponents();
    fixture = TestBed.createComponent(DashboardComponent);
    fixture.detectChanges();
  });

  it('computes dashboard cards', () => expect(fixture.componentInstance.cards()[0].value).toBe(1));
});
