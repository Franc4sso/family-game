import type { TouchPoint, SwipeDirection } from "@/types/gestures.types";
import { SWIPE_THRESHOLD_DISTANCE, SWIPE_THRESHOLD_VELOCITY } from "./constants";

export function calculateSwipeDirection(
  start: TouchPoint,
  end: TouchPoint
): SwipeDirection | null {
  const deltaX = end.x - start.x;
  const deltaY = end.y - start.y;
  const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
  const deltaTime = end.timestamp - start.timestamp;
  const velocity = distance / deltaTime;

  if (distance < SWIPE_THRESHOLD_DISTANCE || velocity < SWIPE_THRESHOLD_VELOCITY) {
    return null;
  }

  const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);

  if (isHorizontal) {
    return deltaX > 0 ? "right" : "left";
  } else {
    return deltaY > 0 ? "down" : "up";
  }
}
