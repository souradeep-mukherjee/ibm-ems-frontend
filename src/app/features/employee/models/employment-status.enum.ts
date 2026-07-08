export enum EmploymentStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  OnProbation = 'ON_PROBATION',
  Resigned = 'RESIGNED',
  Terminated = 'TERMINATED'
}

export const EMPLOYMENT_STATUS_OPTIONS = Object.values(EmploymentStatus);
