import React from "react";
import type { Team } from "@/types/game.types";
import type { GameAction } from "@/types";

interface ModeSelectProps {
  teamA: Team;
  teamB: Team;
  dispatch: React.Dispatch<GameAction>;
}

export function ModeSelect({ teamA, teamB, dispatch }: ModeSelectProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-neutral-950 text-neutral-100">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-2">Modalità</p>
          <p className="text-sm text-neutral-400">
            <span className="text-blue-400">{teamA.name}</span>
            <span className="text-neutral-600"> · </span>
            <span className="text-red-400">{teamB.name}</span>
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => dispatch({ type: "SELECT_MODE", payload: { mode: "feud" } })}
            className="w-full text-left bg-neutral-900/70 border border-white/10 rounded-2xl p-4 transition-all active:scale-[0.98] hover:border-white/25"
          >
            <div className="text-base font-semibold mb-0.5">Family Feud</div>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Indovina le risposte più gettonate. Face-off, vite e furti tra le due squadre.
            </p>
          </button>

          <button
            onClick={() => dispatch({ type: "SELECT_MODE", payload: { mode: "rubo" } })}
            className="w-full text-left bg-neutral-900/70 border border-white/10 rounded-2xl p-4 transition-all active:scale-[0.98] hover:border-white/25"
          >
            <div className="text-base font-semibold mb-0.5">Rubo</div>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Quiz a bluff: rispondi o ruba la risposta all'avversario.
              Corretta +1, rubo riuscito +2, rubo fallito −1.
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
