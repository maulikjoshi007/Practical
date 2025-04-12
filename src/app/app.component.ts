import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TripvisualizationComponent } from "./trip/tripvisualization/tripvisualization.component";
import { TripComponent } from "./trip/trip/trip.component";
interface Trip {
  startPoint: string;
  endPoint: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  trips: Trip[] = [];
  startPoint: string = '';
  endPoint: string = '';

  title = 'practicaltask';
  ngOnInit() {
    // Initialize with example trips that match the reference image
    this.initializeExampleTrips();
  }

  initializeExampleTrips() {
    // Example trips to match the reference image
    this.trips = [
      { startPoint: 'Bangalore', endPoint: 'Mamallapuram' },
      { startPoint: 'Mamallapuram', endPoint: 'Hyderabad' },
      { startPoint: 'Bangalore', endPoint: 'Hyderabad' },
      { startPoint: 'Hyderabad', endPoint: 'Delhi' },
      { startPoint: 'Hyderabad', endPoint: 'Delhi' }, // Same as previous to create level 2
      { startPoint: 'Delhi', endPoint: 'Bangalore' }
    ];
  }
}
