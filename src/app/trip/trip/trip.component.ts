import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TripService } from '../../Services/trip.service';
import { TripvisualizationComponent } from '../tripvisualization/tripvisualization.component';
import { TripFormComponent } from '../trip-form/trip-form.component';

@Component({
  selector: 'app-trip',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    TripvisualizationComponent,
    TripFormComponent
  ],
  templateUrl: './trip.component.html',
  styleUrl: './trip.component.scss'
})
export class TripComponent {


}
