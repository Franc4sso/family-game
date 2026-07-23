import React, { useState } from "react";
import {
  HL_CATEGORIES,
  buildHLChain,
  countHLPairs,
} from "@/services/higherLowerService";
import type { HLCategory } from "@/data/higherLowerItems";
import type { Team } from "@/types/game.types";
import type { GameAction } from "@/types";

interface HigherLowerSetupProps {
  teamA: Team;
  teamB: Team;
  dispatch: React.Dispatch<GameAction>;
}

const ROUND_OPTIONS = [3, 5, 7];

export function HigherLowerSetup({ teamA, teamB, dispatch }: HigherLowerSetupProps) {
  const [category, setCategory] = useState<HLCategory | "">("");
  const [rounds, setRounds] = useState(5);

  const cat = category === "" ? null : category;
  const available = countHLPairs(cat);

  const handleStart = () => {
    const chain = buildHLChain(cat, available);
    if (chain.length === 0) return;
    dispatch({ type: "START_HL", payload: { chain, totalRounds: rounds } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-neutral-950 text-neutral-100">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-2">
            Più alto o più basso
          </p>
          <p className="text-sm text-neutral-400">
            <span className="text-blue-400">{teamA.name}</span>
            <span className="text-neutral-600"> · </span>
            <span className="text-red-400">{teamB.name}</span>
          </p>
        </div>

        <div className="bg-neutral-900/60 border border-white/10 rounded-xl px-4 py-3 mb-6">
          <p className="text-xs text-neutral-400 leading-relaxed">
            Le squadre si alternano sulla stessa catena. Chi sbaglia interrompe
            la catena e regala il punto agli avversari.
          </p>
        </div>

        <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-2">
          Categoria
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as HLCategory | "")}
          className="w-full px-4 py-3 bg-neutral-900 border border-white/10 rounded-xl text-neutral-100 text-sm focus:border-white/30 focus:outline-none transition-all appearance-none"
        >
          <option value="">Tutte le categorie</option>
          {HL_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-2 mt-5">
          Round da giocare
        </label>
        <div className="grid grid-cols-3 gap-2">
          {ROUND_OPTIONS.map((n) => (
            <button
              key={n}
              onClick={() => setRounds(n)}
              className={`rounded-xl py-3 text-sm font-medium border transition-all active:scale-[0.97] ${
                rounds === n
                  ? "bg-white/10 border-white/25 text-white"
                  : "bg-transparent border-white/10 text-neutral-400"
              }`}
            >
              {n}
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-neutral-600 mt-4">
          {available} confronti disponibili
        </p>

        <button
          onClick={handleStart}
          disabled={available === 0}
          className="w-full mt-4 rounded-xl py-3.5 font-medium bg-white text-neutral-900 active:bg-neutral-200 disabled:opacity-40 transition-colors"
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
