import React from "react";
import { Button } from "../shared/Button";
import { MAX_LIVES } from "@/utils/constants";
import type { GameAction } from "@/types";

interface ManualControlsProps {
  currentLives: number;
  dispatch: React.Dispatch<GameAction>;
}

export function ManualControls({ currentLives, dispatch }: ManualControlsProps) {
  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-gray-600/50 rounded-xl p-4 space-y-3 shadow-lg">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-black text-amber-400 uppercase tracking-wider">Vite</h4>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: MAX_LIVES }).map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all ${
                i < currentLives ? 'bg-red-500 shadow-lg shadow-red-500/50' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="danger"
          size="sm"
          disabled={currentLives === 0}
          onClick={() => dispatch({ type: "DECREMENT_LIFE" })}
        >
          ➖ Rimuovi
        </Button>
        <Button
          variant="success"
          size="sm"
          disabled={currentLives >= MAX_LIVES}
          onClick={() => dispatch({ type: "INCREMENT_LIFE" })}
        >
          ➕ Aggiungi
        </Button>
      </div>
    </div>
  );
}
