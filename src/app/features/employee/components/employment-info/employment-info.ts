import { NgFor } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EMPLOYMENT_TYPE_OPTIONS } from '../../models/employment-type.enum';

@Component({
  selector: 'app-employment-info',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule],
  templateUrl: './employment-info.html',
  styleUrl: './employment-info.css'
})
export class EmploymentInfoComponent {
  readonly group = input.required<FormGroup>();
  readonly disableJoiningDate = input(false);
  readonly types = EMPLOYMENT_TYPE_OPTIONS;
}
