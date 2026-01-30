import { useEffect, useRef, type RefObject } from "react";
import type { TouchPoint } from "@/types/gestures.types";
import { SWIPE_THRESHOLD_DISTANCE, SWIPE_THRESHOLD_VELOCITY } from "@/utils/constants";

interface UseSwipeGesturesOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
}

export function useSwipeGestures(
  elementRef: RefObject<HTMLElement>,
  options: UseSwipeGesturesOptions
) {
  const startPoint = useRef<TouchPoint | null>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      startPoint.current = {
        x: touch.clientX,
        y: touch.clientY,
        timestamp: Date.now(),
      };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!startPoint.current) return;

      const touch = e.changedTouches[0];
      const endPoint: TouchPoint = {
        x: touch.clientX,
        y: touch.clientY,
        timestamp: Date.now(),
      };

      const deltaX = endPoint.x - startPoint.current.x;
      const deltaY = endPoint.y - startPoint.current.y;
      const deltaTime = endPoint.timestamp - startPoint.current.timestamp;

      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
      const velocity = distance / deltaTime;

      if (distance < SWIPE_THRESHOLD_DISTANCE || velocity < SWIPE_THRESHOLD_VELOCITY) {
        startPoint.current = null;
        return;
      }

      const isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);

      if (isHorizontal) {
        if (deltaX > 0 && options.onSwipeRight) {
          options.onSwipeRight();
        } else if (deltaX < 0 && options.onSwipeLeft) {
          options.onSwipeLeft();
        }
      } else {
        if (deltaY > 0 && options.onSwipeDown) {
          options.onSwipeDown();
        } else if (deltaY < 0 && options.onSwipeUp) {
          options.onSwipeUp();
        }
      }

      startPoint.current = null;
    };

    element.addEventListener("touchstart", handleTouchStart);
    element.addEventListener("touchend", handleTouchEnd);

    return () => {
      element.removeEventListener("touchstart", handleTouchStart);
      element.removeEventListener("touchend", handleTouchEnd);
    };
  }, [elementRef, options]);
}
