import React from "react";
import {
  buildMysteryDeck,
  countMysteryCharacters,
} from "@/services/mysteryService";
import type { Team } from "@/types/game.types";
import type { GameAction } from "@/types";

interface MysterySetupProps {
  teamA: Team;
  teamB: Team;
  dispatch: React.Dispatch<GameAction>;
}

export function MysterySetup({ teamA, teamB, dispatch }: MysterySetupProps) {
  const available = countMysteryCharacters();

  const handleStart = () => {
    const deck = buildMysteryDeck();
    if (deck.length === 0) return;
    dispatch({ type: "START_MYSTERY", payload: { deck } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-neutral-950 text-neutral-100">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-2">
            Personaggio Misterioso
          </p>
          <p className="text-sm text-neutral-400">
            <span className="text-blue-400">{teamA.name}</span>
            <span className="text-neutral-600"> · </span>
            <span className="text-red-400">{teamB.name}</span>
          </p>
        </div>

        <div className="bg-neutral-900 border border-white/10 rounded-xl p-5 text-sm text-neutral-300 leading-relaxed">
          Riveli un indizio alla volta, dal più difficile al più facile. Chi
          indovina prima vince più punti:{" "}
          <span className="text-indigo-300">1 indizio = 10 pt</span>, poi a
          scendere fino a <span className="text-indigo-300">1 pt</span>.
        </div>

        <p className="text-center text-xs text-neutral-600 mt-4">
          {available} personaggi
        </p>

        <button
          onClick={handleStart}
          disabled={available === 0}
          className="w-full mt-5 rounded-xl py-3.5 font-medium bg-white text-neutral-900 active:bg-neutral-200 disabled:opacity-40 transition-colors"
        >
          Inizia
        </button>

        <button
          onClick={() => dispatch({ type: "CLEAR_MODE" })}
          className="w-full text-center text-sm text-neutral-500 active:text-neutral-300 transition-colors py-3 mt-1"
        >
          Cambia modalità
        </button>
      </div>
    </div>
  );
}
