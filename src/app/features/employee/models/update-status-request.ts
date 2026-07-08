import { EmploymentStatus } from './employment-status.enum';

export interface UpdateStatusRequest {
  status: EmploymentStatus;
}
