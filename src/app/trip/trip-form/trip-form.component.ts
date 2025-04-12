import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TripService } from '../../Services/trip.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-form',
  standalone: true,
  imports: [
      FormsModule,
      CommonModule,
      ReactiveFormsModule
    ],
  templateUrl: './trip-form.component.html',
  styleUrl: './trip-form.component.scss'
})
export class TripFormComponent {
  //REACTIVE FORM GROUP
  tripForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tripService: TripService
  ) {
    //FORM INTIALIZATION
    this.tripForm = this.fb.group({
      startPoint: ['', [Validators.required, Validators.minLength(3)]],
      endPoint: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  //ON SUBMIT BTN CLICK
  onSubmit(): void {
    if (this.tripForm.valid) {
      this.tripService.addTrip(this.tripForm.value);
      this.tripForm.reset();
    }
  }

  //ON CLEAR DATA
  clearTrips(): void {
    this.tripService.clearTrips();
  }

}
