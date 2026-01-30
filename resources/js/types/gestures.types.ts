export type SwipeDirection = "left" | "right" | "up" | "down";

export interface SwipeEvent {
  direction: SwipeDirection;
  distance: number;
  velocity: number;
}

export interface TouchPoint {
  x: number;
  y: number;
  timestamp: number;
}
