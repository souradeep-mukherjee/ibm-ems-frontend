import { Address } from './address.model';
import { EmploymentType } from './employment-type.enum';
import { Gender } from './gender.enum';

export interface UpdateEmployeeRequest {
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: Gender;
  dateOfBirth?: string;
  phoneNumber?: string;
  alternatePhoneNumber?: string;
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
