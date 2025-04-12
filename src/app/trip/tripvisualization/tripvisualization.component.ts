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

  ngOnInit(): void {
    this.subscription = this.tripService.trips$.subscribe(trips => {
      this.processTrips(trips);
    });
  }

  addTrip() {
    if (this.startPoint && this.endPoint) {
      this.tripService.addTrip({ startPoint: this.startPoint, endPoint: this.endPoint });
      this.startPoint = '';
      this.endPoint = '';
    }
  }

  private processTrips(trips: Trip[]): void {
    this.tripNodes = [];

    for (let i = 0; i < trips.length; i++) {
      const curr = trips[i];
      const prev = i > 0 ? trips[i - 1] : null;
      const continued = prev?.endPoint.toLowerCase() === curr.startPoint.toLowerCase();

      this.tripNodes.push({
        startPoint: curr.startPoint,
        endPoint: curr.endPoint,
        startCode: curr.startPoint.slice(0, 3).toUpperCase(),
        endCode: curr.endPoint.slice(0, 3).toUpperCase(),
        level: 1,
        continued,
        position: i,
        connections: []
      });
    }

    // Level 2 and above (repeated trips)
    const map = new Map<string, number[]>();
    this.tripNodes.forEach((t, i) => {
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

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  getArrowPoints(index: number): string {
    const x = 290 + index * 220;
    return `${x},100 ${x - 5},95 ${x - 5},105`;
  }

  getColor(index: number): string {
    const colors = ['#4a6bdf', '#34aeef', '#f4b942', '#7c5295', '#d95649'];
    return colors[index % colors.length];
  }

  // This function creates the curved path for Level 2 connections
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
