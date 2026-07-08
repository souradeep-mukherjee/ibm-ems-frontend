import { NgIf } from '@angular/common';
import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-info',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './contact-info.html',
  styleUrl: './contact-info.css'
})
export class ContactInfoComponent {
  readonly group = input.required<FormGroup>();
  readonly emailReadonly = input(false);
}
