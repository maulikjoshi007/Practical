export interface TripNode {
  startCode: string;
  endCode: string;
  startPoint: string;
  endPoint: string;
  level: number;
  continued: boolean;
  position: number;
  connections?: { to: number; level: number; direction: 'up' | 'down' }[];
}