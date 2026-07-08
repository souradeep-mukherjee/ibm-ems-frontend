import { NgFor, NgIf } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GENDER_OPTIONS } from '../../models/gender.enum';

@Component({
  selector: 'app-personal-info',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule],
  templateUrl: './personal-info.html',
  styleUrl: './personal-info.css'
})
export class PersonalInfoComponent {
  readonly group = input.required<FormGroup>();
  readonly genders = GENDER_OPTIONS;
}
