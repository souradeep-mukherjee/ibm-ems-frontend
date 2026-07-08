import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ContactInfoComponent } from './contact-info';

describe('ContactInfoComponent', () => {
  let fixture: ComponentFixture<ContactInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [ContactInfoComponent] }).compileComponents();
    fixture = TestBed.createComponent(ContactInfoComponent);
    fixture.componentRef.setInput('group', new FormBuilder().group({ email: [''], phoneNumber: [''], alternatePhoneNumber: [''] }));
    fixture.detectChanges();
  });

  it('creates', () => expect(fixture.componentInstance).toBeTruthy());
});
