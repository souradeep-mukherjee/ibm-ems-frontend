import { Address } from './address.model';
import { EmploymentType } from './employment-type.enum';
import { Gender } from './gender.enum';

export interface CreateEmployeeRequest {
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: Gender;
  dateOfBirth?: string;
  email: string;
  phoneNumber?: string;
  alternatePhoneNumber?: string;
  joiningDate?: string;
  employmentType?: EmploymentType;
  departmentId?: string;
  departmentName?: string;
  designationId?: string;
  designationName?: string;
  managerId?: string;
  nationality?: string;
  workLocation?: string;
  addresses: Address[];
}
