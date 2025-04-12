import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TripService, Trip } from '../../Services/trip.service';
import { CommonModule } from '@angular/common';
import { TripNode } from '../../models/trip.model';


@Component({
  selector: 'app-tripvisualization',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tripvisualization.component.html',
  styleUrl: './tripvisualization.component.scss'
})
export class TripvisualizationComponent {

  tripNodes: TripNode[] = [];
  startPoint = '';
  endPoint = '';
  private subscription: Subscription | null = null;

  constructor(private tripService: TripService) {}

  // INITIALIZES THE COMPONENT AND SUBSCRIBES TO THE TRIP DATA STREAM

  ngOnInit(): void {
    this.subscription = this.tripService.trips$.subscribe(trips => {
      this.processTrips(trips);
    });
  }

  // ADDS A NEW TRIP TO THE LIST USING START AND END POINT VALUES
  addTrip() {
    if (this.startPoint && this.endPoint) {
      this.tripService.addTrip({ startPoint: this.startPoint, endPoint: this.endPoint });
      this.startPoint = '';
      this.endPoint = '';
    }
  }

  // PROCESSES TRIPS TO GENERATE TRIPNODES WITH LEVELS, CONTINUITY, AND CONNECTIONS

  private processTrips(trips: Trip[]): void {
    this.tripNodes = [];

    for (let i = 0; i < trips.length; i++) {
      const curr = trips[i];
      const prev = i > 0 ? trips[i - 1] : null;

      // CHECKS IF CURRENT TRIP IS A CONTINUATION OF PREVIOUS TRIP (CASE-INSENSITIVE)
      const continued = prev?.endPoint.toLowerCase() === curr.startPoint.toLowerCase();

      this.tripNodes.push({
        startPoint: curr.startPoint,
        endPoint: curr.endPoint,
        // CONVERTS START AND END POINTS TO 3-LETTER UPPERCASE CODES FOR DISPLAY
        startCode: curr.startPoint.slice(0, 3).toUpperCase(),
        endCode: curr.endPoint.slice(0, 3).toUpperCase(),
        level: 1,
        continued,
        position: i,
        connections: []
      });
    }

    // IDENTIFIES REPEATED TRIPS AND ASSIGNS LEVELS AND CURVED CONNECTIONS
    const map = new Map<string, number[]>();
    this.tripNodes.forEach((t, i) => {
      // KEY IS BASED ON LOWERCASE ROUTE STRING TO IDENTIFY DUPLICATES CASE-INSENSITIVELY
      const key = t.startPoint.toLowerCase() + '->' + t.endPoint.toLowerCase();
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(i);
    });

    map.forEach((indices) => {
      if (indices.length > 1) {
        for (let j = 1; j < indices.length; j++) {
          const fromIndex = indices[j - 1];
          const toIndex = indices[j];
          const level = 2 + (j - 1);
          const direction = j % 2 === 0 ? 'down' : 'up';
          this.tripNodes[fromIndex].connections!.push({ to: toIndex, level, direction });
        }
      }
    });
  }

  // CLEANS UP THE SUBSCRIPTION WHEN COMPONENT IS DESTROYED
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  // RETURNS ARROW POINTS IN SVG FORMAT FOR CONTINUED TRIPS
  getArrowPoints(index: number): string {
    const x = 290 + index * 220;
    return `${x},100 ${x - 5},95 ${x - 5},105`;
  }

  // RETURNS COLOR FOR EACH TRIP BASED ON INDEX FOR VISUAL DISTINCTION
  getColor(index: number): string {
    const colors = ['#4a6bdf', '#34aeef', '#f4b942', '#7c5295', '#d95649'];
    return colors[index % colors.length];
  }

// RETURNS SVG PATH STRING FOR CURVED LINES BETWEEN REPEATED TRIPS
getCurvedPath(fromIndex: number, toIndex: number, level: number = 2, direction: 'up' | 'down' = 'up'): string {
    const startX = 100 + (fromIndex * 220);
    const endX = 300 + (toIndex * 220);
    const baseY = 100;
    const curveHeight = level * 30;

    const cp1x = startX;
    const cp1y = direction === 'up' ? baseY - curveHeight : baseY + curveHeight;
    const cp2x = endX;
    const cp2y = cp1y;

    return `M ${startX} ${baseY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${baseY}`;
  }


}
