import { AddressType } from './address-type.enum';

export interface Address {
  id?: string;
  addressType: AddressType;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}
