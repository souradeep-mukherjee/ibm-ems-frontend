import { Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './address-form.html',
  styleUrl: './address-form.css'
})
export class AddressFormComponent {
  readonly group = input.required<FormGroup>();
}
