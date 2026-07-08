import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { AddressFormComponent } from './address-form';

describe('AddressFormComponent', () => {
  let fixture: ComponentFixture<AddressFormComponent>;
  const fb = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AddressFormComponent] }).compileComponents();
    fixture = TestBed.createComponent(AddressFormComponent);
    const address = { id: [''], addressType: [''], addressLine1: [''], addressLine2: [''], city: [''], state: [''], country: [''], postalCode: [''] };
    fixture.componentRef.setInput('group', fb.group({ sameAsCurrent: [false], current: fb.group(address), permanent: fb.group(address) }));
    fixture.detectChanges();
  });

  it('creates', () => expect(fixture.componentInstance).toBeTruthy());
});
