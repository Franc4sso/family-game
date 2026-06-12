import React, { useState } from "react";
import {
  RUBO_CATEGORIES,
  buildRuboDeck,
  countRuboQuestions,
} from "@/services/ruboService";
import type { RuboCategory } from "@/data/ruboQuestions";
import type { Team } from "@/types/game.types";
import type { GameAction } from "@/types";

interface RuboSetupProps {
  teamA: Team;
  teamB: Team;
  dispatch: React.Dispatch<GameAction>;
}

export function RuboSetup({ teamA, teamB, dispatch }: RuboSetupProps) {
  const [category, setCategory] = useState<RuboCategory | "">("");

  const cat = category === "" ? null : category;
  const available = countRuboQuestions(cat, null);

  const handleStart = () => {
    const deck = buildRuboDeck(cat, null);
    if (deck.length === 0) return;
    dispatch({ type: "START_RUBO", payload: { deck } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-neutral-950 text-neutral-100">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-2">Rubo</p>
          <p className="text-sm text-neutral-400">
            <span className="text-blue-400">{teamA.name}</span>
            <span className="text-neutral-600"> · </span>
            <span className="text-red-400">{teamB.name}</span>
          </p>
        </div>

        <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-2">
          Categoria
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as RuboCategory | "")}
          className="w-full px-4 py-3 bg-neutral-900 border border-white/10 rounded-xl text-neutral-100 text-sm focus:border-white/30 focus:outline-none transition-all appearance-none"
        >
          <option value="">Tutte le categorie</option>
          {RUBO_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <p className="text-center text-xs text-neutral-600 mt-3">{available} domande</p>

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
