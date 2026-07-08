import { Address } from './address.model';
import { EmploymentStatus } from './employment-status.enum';
import { EmploymentType } from './employment-type.enum';
import { Gender } from './gender.enum';

export interface Employee {
  id: string;
  employeeCode: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: Gender;
  dateOfBirth?: string;
  email: string;
  phoneNumber?: string;
  joiningDate?: string;
  employmentStatus: EmploymentStatus;
  employmentType?: EmploymentType;
  departmentId?: string;
  departmentName?: string;
  designationId?: string;
  designationName?: string;
  managerId?: string;
  nationality?: string;
  workLocation?: string;
  addresses: Address[];
  createdAt?: string;
}

export interface EmployeeFilters {
  search: string;
  departmentId: string;
  designationId: string;
  managerId: string;
  status: EmploymentStatus | '';
}
