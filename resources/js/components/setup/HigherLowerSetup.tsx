import React, { useMemo, useState } from "react";
import {
  HL_CATEGORIES,
  buildHLChain,
  countHLComparisons,
} from "@/services/higherLowerService";
import type { HLCategory } from "@/data/higherLowerItems";
import type { Team } from "@/types/game.types";
import type { GameAction } from "@/types";

interface HigherLowerSetupProps {
  teamA: Team;
  teamB: Team;
  dispatch: React.Dispatch<GameAction>;
}

export function HigherLowerSetup({ teamA, teamB, dispatch }: HigherLowerSetupProps) {
  // Lista vuota = tutte le categorie.
  const [selected, setSelected] = useState<HLCategory[]>([]);

  const available = useMemo(() => countHLComparisons(selected), [selected]);

  const toggle = (c: HLCategory) => {
    setSelected((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  };

  const handleStart = () => {
    const chain = buildHLChain(selected);
    if (chain.length < 2) return;
    dispatch({ type: "START_HL", payload: { chain } });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5 bg-neutral-950 text-neutral-100">
      <div className="w-full max-w-sm">
        <div className="text-center mb-7">
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
            Turni alternati sulla stessa catena. Chi indovina fa scorrere la
            catena: l'elemento appena scoperto diventa il nuovo riferimento.
            <span className="text-neutral-200"> Il primo che sbaglia perde.</span>
          </p>
        </div>

        <div className="flex items-baseline justify-between mb-2">
          <label className="text-[11px] uppercase tracking-wider text-neutral-500">
            Categorie
          </label>
          {selected.length > 0 && (
            <button
              onClick={() => setSelected([])}
              className="text-[11px] text-neutral-500 active:text-neutral-300"
            >
              Tutte
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {HL_CATEGORIES.map((c) => {
            const on = selected.includes(c);
            return (
              <button
                key={c}
                onClick={() => toggle(c)}
                className={`px-3.5 py-2 rounded-full text-xs font-medium border transition-all active:scale-[0.96] ${
                  on
                    ? "bg-white text-neutral-900 border-white"
                    : "bg-transparent border-white/15 text-neutral-400"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        <p className="text-center text-xs text-neutral-600 mt-5">
          {selected.length === 0 ? "Tutte le categorie" : `${selected.length} selezionate`}
          <span className="text-neutral-700"> · </span>
          {available} confronti in catena
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
