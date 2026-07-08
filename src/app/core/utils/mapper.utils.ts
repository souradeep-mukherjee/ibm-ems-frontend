import { Address } from '../../features/employee/models/address.model';
import { AddressType } from '../../features/employee/models/address-type.enum';
import { CreateEmployeeRequest } from '../../features/employee/models/create-employee-request';
import { Employee } from '../../features/employee/models/employee.model';
import { UpdateEmployeeRequest } from '../../features/employee/models/update-employee-request';

export interface EmployeeFormValue {
  personal: {
    firstName: string;
    middleName: string;
    lastName: string;
    gender: string;
    dateOfBirth: string;
    nationality: string;
  };
  contact: {
    email: string;
    phoneNumber: string;
    alternatePhoneNumber: string;
  };
  employment: {
    joiningDate: string;
    employmentType: string;
    departmentId: string;
    departmentName: string;
    designationId: string;
    designationName: string;
    managerId: string;
    workLocation: string;
  };
  addresses: {
    current: Address;
    permanent: Address;
    sameAsCurrent: boolean;
  };
}

const clean = (value: string): string | undefined => value.trim() || undefined;

export const addressesFromForm = (value: EmployeeFormValue['addresses']): Address[] => {
  const current: Address = { ...value.current, addressType: AddressType.Current };
  const permanent: Address = value.sameAsCurrent
    ? { ...current, id: value.permanent.id, addressType: AddressType.Permanent }
    : { ...value.permanent, addressType: AddressType.Permanent };
  return [current, permanent].filter((address) => address.addressLine1 || address.city || address.state || address.country || address.postalCode);
};

export const createRequestFromForm = (value: EmployeeFormValue): CreateEmployeeRequest => ({
  firstName: value.personal.firstName.trim(),
  middleName: clean(value.personal.middleName),
  lastName: value.personal.lastName.trim(),
  gender: value.personal.gender as CreateEmployeeRequest['gender'],
  dateOfBirth: clean(value.personal.dateOfBirth),
  email: value.contact.email.trim(),
  phoneNumber: clean(value.contact.phoneNumber),
  alternatePhoneNumber: clean(value.contact.alternatePhoneNumber),
  joiningDate: clean(value.employment.joiningDate),
  employmentType: clean(value.employment.employmentType) as CreateEmployeeRequest['employmentType'],
  departmentId: clean(value.employment.departmentId),
  departmentName: clean(value.employment.departmentName),
  designationId: clean(value.employment.designationId),
  designationName: clean(value.employment.designationName),
  managerId: clean(value.employment.managerId),
  nationality: clean(value.personal.nationality),
  workLocation: clean(value.employment.workLocation),
  addresses: addressesFromForm(value.addresses)
});

export const updateRequestFromForm = (value: EmployeeFormValue): UpdateEmployeeRequest => {
  const create = createRequestFromForm(value);
  const { email: _email, joiningDate: _joiningDate, ...update } = create;
  return update;
};

export const formSeedFromEmployee = (employee?: Employee): EmployeeFormValue => {
  const current = employee?.addresses.find((address) => address.addressType === AddressType.Current);
  const permanent = employee?.addresses.find((address) => address.addressType === AddressType.Permanent);
  const emptyAddress = (addressType: AddressType): Address => ({ addressType, addressLine1: '', addressLine2: '', city: '', state: '', country: 'India', postalCode: '' });
  return {
    personal: {
      firstName: employee?.firstName ?? '',
      middleName: employee?.middleName ?? '',
      lastName: employee?.lastName ?? '',
      gender: employee?.gender ?? '',
      dateOfBirth: employee?.dateOfBirth ?? '',
      nationality: employee?.nationality ?? 'Indian'
    },
    contact: {
      email: employee?.email ?? '',
      phoneNumber: employee?.phoneNumber ?? '',
      alternatePhoneNumber: ''
    },
    employment: {
      joiningDate: employee?.joiningDate ?? '',
      employmentType: employee?.employmentType ?? '',
      departmentId: employee?.departmentId ?? '',
      departmentName: employee?.departmentName ?? '',
      designationId: employee?.designationId ?? '',
      designationName: employee?.designationName ?? '',
      managerId: employee?.managerId ?? '',
      workLocation: employee?.workLocation ?? ''
    },
    addresses: {
      current: current ?? emptyAddress(AddressType.Current),
      permanent: permanent ?? emptyAddress(AddressType.Permanent),
      sameAsCurrent: false
    }
  };
};
