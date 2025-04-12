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

  //ADD TRIP DATA
  addTrip(trip: Trip): void {
    this.trips.push(trip);
    this.tripsSubject.next([...this.trips]);
  }

  //GET ALL TRIP DATA
  getAllTrips(): Trip[] {
    return this.trips;
  }

  //CLEAR TRIP DATA
  clearTrips(): void {
    this.trips = [];
    this.tripsSubject.next([]);
  }

}
