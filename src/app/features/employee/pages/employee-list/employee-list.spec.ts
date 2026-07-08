import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { EmploymentStatus } from '../../models/employment-status.enum';
import { Gender } from '../../models/gender.enum';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeListComponent } from './employee-list';

const employee: Employee = { id: '1', employeeCode: 'EMP1', firstName: 'Asha', lastName: 'Roy', gender: Gender.Female, email: 'asha@example.com', employmentStatus: EmploymentStatus.Active, addresses: [] };
const page = {
  content: [employee],
  pageable: { pageNumber: 0, pageSize: 10, offset: 0, paged: true, unpaged: false, sort: { sorted: false, unsorted: true, empty: true } },
  totalPages: 1,
  totalElements: 1,
  last: true,
  size: 10,
  number: 0,
  sort: { sorted: false, unsorted: true, empty: true },
  first: true,
  numberOfElements: 1,
  empty: false
};

class EmployeeServiceMock {
  getEmployees() {
    return of(page);
  }

  getAllEmployees() {
    return of([employee]);
  }

  deleteEmployee() {
    return of(undefined);
  }

  updateStatus() {
    return of(employee);
  }
}

describe('EmployeeListComponent', () => {
  let fixture: ComponentFixture<EmployeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [EmployeeListComponent], providers: [provideRouter([]), { provide: EmployeeService, useClass: EmployeeServiceMock }] }).compileComponents();
    fixture = TestBed.createComponent(EmployeeListComponent);
    fixture.detectChanges();
  });

  it('loads paginated employees', () => expect(fixture.componentInstance.totalElements()).toBe(1));
});
