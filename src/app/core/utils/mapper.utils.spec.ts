import { AddressType } from '../../features/employee/models/address-type.enum';
import { Gender } from '../../features/employee/models/gender.enum';
import { addressesFromForm, createRequestFromForm, formSeedFromEmployee } from './mapper.utils';

describe('mapper utils', () => {
  const value = formSeedFromEmployee();

  it('maps addresses array for backend', () => {
    value.addresses.current.addressLine1 = 'A';
    value.addresses.current.city = 'Kolkata';
    value.addresses.current.state = 'WB';
    value.addresses.current.country = 'India';
    value.addresses.current.postalCode = '700001';
    expect(addressesFromForm(value.addresses)[0].addressType).toBe(AddressType.Current);
  });

  it('maps create payload', () => {
    value.personal.firstName = 'Jane';
    value.personal.lastName = 'Doe';
    value.personal.gender = Gender.Female;
    value.contact.email = 'jane@example.com';
    expect(createRequestFromForm(value).firstName).toBe('Jane');
  });
});
