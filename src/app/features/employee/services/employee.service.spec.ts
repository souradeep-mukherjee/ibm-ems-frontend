import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { API_BASE_URL, API_ENDPOINTS } from '../../../core/constants/api.constants';
import { Employee } from '../models/employee.model';
import { EmploymentStatus } from '../models/employment-status.enum';
import { Gender } from '../models/gender.enum';
import { EmployeeService } from './employee.service';

const employee: Employee = {
  id: '1',
  employeeCode: 'EMP1',
  firstName: 'Asha',
  lastName: 'Roy',
  gender: Gender.Female,
  email: 'asha@example.com',
  employmentStatus: EmploymentStatus.Active,
  addresses: []
};

describe('EmployeeService', () => {
  let service: EmployeeService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
    service = TestBed.inject(EmployeeService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('loads a paginated employee response', () => {
    service.getEmployees().subscribe((page) => expect(page.content[0]).toEqual(employee));
    const req = http.expectOne((request) => request.url === `${API_BASE_URL}${API_ENDPOINTS.employees}`);
    expect(req.request.method).toBe('GET');
    req.flush({
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
    });
  });

  it('creates an employee', () => {
    service.createEmployee({ firstName: 'Asha', lastName: 'Roy', gender: Gender.Female, email: 'asha@example.com', addresses: [] }).subscribe((created) => expect(created.id).toBe('1'));
    const req = http.expectOne(`${API_BASE_URL}${API_ENDPOINTS.employees}`);
    expect(req.request.method).toBe('POST');
    req.flush(employee);
  });
});
