import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Trip {
  startPoint: string;
  endPoint: string;
}

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private trips: Trip[] = [];
  private tripsSubject = new BehaviorSubject<Trip[]>([]);
  trips$ = this.tripsSubject.asObservable();

  constructor() {}

  addTrip(trip: Trip): void {
    this.trips.push(trip);
    this.tripsSubject.next([...this.trips]);
  }

  getAllTrips(): Trip[] {
    return this.trips;
  }

  clearTrips(): void {
    this.trips = [];
    this.tripsSubject.next([]);
  }

}
