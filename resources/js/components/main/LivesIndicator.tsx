import React from "react";
import { MAX_LIVES } from "@/utils/constants";

interface LivesIndicatorProps {
  livesRemaining: number;
}

export function LivesIndicator({ livesRemaining }: LivesIndicatorProps) {
  return (
    <div className="flex gap-3 justify-center my-4">
      {Array.from({ length: MAX_LIVES }).map((_, i) => (
        <div
          key={i}
          className={`text-4xl transition-all ${i < livesRemaining ? "scale-110" : "scale-90 opacity-50"}`}
        >
          {i < livesRemaining ? "❤️" : "🖤"}
        </div>
      ))}
    </div>
  );
}
