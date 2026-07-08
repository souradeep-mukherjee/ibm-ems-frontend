import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { PersonalInfoComponent } from './personal-info';

describe('PersonalInfoComponent', () => {
  let fixture: ComponentFixture<PersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [PersonalInfoComponent] }).compileComponents();
    fixture = TestBed.createComponent(PersonalInfoComponent);
    fixture.componentRef.setInput('group', new FormBuilder().group({ firstName: [''], middleName: [''], lastName: [''], gender: [''], dateOfBirth: [''], nationality: [''] }));
    fixture.detectChanges();
  });

  it('creates', () => expect(fixture.componentInstance).toBeTruthy());
});
