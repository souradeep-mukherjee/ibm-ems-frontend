import { KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnChanges, SimpleChanges, effect, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { createRequestFromForm, EmployeeFormValue, formSeedFromEmployee, updateRequestFromForm } from '../../../../core/utils/mapper.utils';
import { dateNotFutureValidator, indianPhoneValidator, joiningDateValidator } from '../../../../core/utils/validators';
import { ButtonComponent } from '../../../../shared/components/button/button';
import { CreateEmployeeRequest } from '../../models/create-employee-request';
import { Employee } from '../../models/employee.model';
import { UpdateEmployeeRequest } from '../../models/update-employee-request';
import { AddressFormComponent } from '../address-form/address-form';
import { ContactInfoComponent } from '../contact-info/contact-info';
import { EmploymentInfoComponent } from '../employment-info/employment-info';
import { PersonalInfoComponent } from '../personal-info/personal-info';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    KeyValuePipe,
    ReactiveFormsModule,
    ButtonComponent,
    PersonalInfoComponent,
    ContactInfoComponent,
    EmploymentInfoComponent,
    AddressFormComponent
  ],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeFormComponent implements OnChanges {
  readonly employee = input<Employee | undefined>();
  readonly mode = input<'create' | 'edit'>('create');
  readonly loading = input(false);
  readonly saveCreate = output<CreateEmployeeRequest>();
  readonly saveUpdate = output<UpdateEmployeeRequest>();
  readonly cancel = output<void>();

  private readonly fb = new FormBuilder();
  backendErrors: Record<string, string> = {};

  readonly form = this.fb.group({
    personal: this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      dateOfBirth: ['', dateNotFutureValidator()],
      nationality: ['Indian']
    }),
    contact: this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', indianPhoneValidator()],
      alternatePhoneNumber: ['', indianPhoneValidator()]
    }),
    employment: this.fb.group({
      joiningDate: ['', joiningDateValidator()],
      employmentType: [''],
      departmentId: [''],
      departmentName: [''],
      designationId: [''],
      designationName: [''],
      managerId: [''],
      workLocation: ['']
    }),
    addresses: this.fb.group({
      sameAsCurrent: [false],
      current: this.fb.group({
        id: [''],
        addressType: ['CURRENT'],
        addressLine1: [''],
        addressLine2: [''],
        city: [''],
        state: [''],
        country: ['India'],
        postalCode: ['']
      }),
      permanent: this.fb.group({
        id: [''],
        addressType: ['PERMANENT'],
        addressLine1: [''],
        addressLine2: [''],
        city: [''],
        state: [''],
        country: ['India'],
        postalCode: ['']
      })
    })
  });

  constructor() {
    effect(() => {
      if (this.loading()) this.form.disable({ emitEvent: false });
      else this.form.enable({ emitEvent: false });

      if (this.mode() === 'edit') {
        this.form.controls.contact.controls.email.disable({ emitEvent: false });
        this.form.controls.employment.controls.joiningDate.disable({ emitEvent: false });
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employee']) {
      this.form.patchValue(formSeedFromEmployee(this.employee()), { emitEvent: false });
    }
  }

  submit(): void {
    this.backendErrors = {};
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue() as EmployeeFormValue;
    if (this.mode() === 'create') this.saveCreate.emit(createRequestFromForm(raw));
    else this.saveUpdate.emit(updateRequestFromForm(raw));
  }

  applyBackendError(error: HttpErrorResponse): void {
    if (error.status === 400 && error.error && typeof error.error === 'object') {
      this.backendErrors = error.error as Record<string, string>;
    }
  }
}
