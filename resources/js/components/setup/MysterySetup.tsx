import React, { useState } from "react";
import {
  buildMysteryDeck,
  countMysteryCharacters,
  MYSTERY_MAX_TEAMS,
  MYSTERY_MIN_TEAMS,
  MYSTERY_TEAM_COLORS,
} from "@/services/mysteryService";
import { MAX_TEAM_NAME_LENGTH } from "@/utils/constants";
import type { GameAction } from "@/types";
import { MystScreen, MystSilhouette } from "../mystery/parts";

interface MysterySetupProps {
  dispatch: React.Dispatch<GameAction>;
}

export function MysterySetup({ dispatch }: MysterySetupProps) {
  const available = countMysteryCharacters();
  const [names, setNames] = useState<string[]>(["", ""]);
  const [error, setError] = useState<string | null>(null);

  // Un nome lasciato vuoto diventa "Squadra N"
  const finalNames = names.map((n, i) => n.trim() || `Squadra ${i + 1}`);

  const rename = (i: number, value: string) => {
    setError(null);
    setNames((ns) => ns.map((n, j) => (j === i ? value : n)));
  };
  const remove = (i: number) => setNames((ns) => ns.filter((_, j) => j !== i));
  const add = () => setNames((ns) => (ns.length < MYSTERY_MAX_TEAMS ? [...ns, ""] : ns));

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    const lower = finalNames.map((n) => n.toLowerCase());
    if (new Set(lower).size !== lower.length) {
      setError("Le squadre devono avere nomi diversi");
      return;
    }
    const deck = buildMysteryDeck();
    if (deck.length === 0) return;
    dispatch({ type: "START_MYSTERY", payload: { deck, teamNames: finalNames } });
  };

  return (
    <MystScreen tone="violet">
      <div className="flex h-11 items-center">
        <button
          type="button"
          aria-label="Indietro"
          onClick={() => dispatch({ type: "CLEAR_MODE" })}
          className="myst-press flex h-11 w-11 items-center justify-center rounded-full border-2 border-myst-line-2"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>

      <div className="flex justify-center">
        <MystSilhouette size={96} body="#25106A" mark="?" markColor="#D9C6FF" />
      </div>

      <section className="flex flex-col gap-2">
        <h1 className="m-0 font-myst text-[46px] leading-[0.95] font-normal">Personaggio Misterioso</h1>
        <p className="m-0 text-base leading-snug text-myst-muted">
          Solo tu sai chi è. Leggi un indizio alla volta: chi indovina prima prende più punti, da 10 a 1.
        </p>
      </section>

      <form onSubmit={handleStart} className="flex flex-1 flex-col gap-3.5">
        <section className="flex flex-col gap-2">
          <div className="flex justify-between text-[13px] font-bold text-myst-muted">
            <span>Squadre</span>
            <span>
              {names.length} di {MYSTERY_MAX_TEAMS}
            </span>
          </div>
          <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
            {names.map((name, i) => (
              <li key={i} className="flex h-[52px] items-center gap-2.5 rounded-[14px] bg-myst-panel pr-1.5 pl-2 focus-within:ring-2 focus-within:ring-myst-text">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-myst text-[17px] text-myst-ink"
                  style={{ background: MYSTERY_TEAM_COLORS[i] }}
                  aria-hidden
                >
                  {i + 1}
                </span>
                <label htmlFor={`myst-team-${i}`} className="sr-only">
                  Nome della squadra {i + 1}
                </label>
                <input
                  id={`myst-team-${i}`}
                  value={name}
                  maxLength={MAX_TEAM_NAME_LENGTH}
                  onChange={(e) => rename(i, e.target.value)}
                  placeholder={`Squadra ${i + 1}`}
                  autoComplete="off"
                  className="min-w-0 flex-1 bg-transparent text-[17px] font-bold text-myst-text placeholder:font-semibold placeholder:text-myst-muted/60 focus:outline-none"
                />
                {names.length > MYSTERY_MIN_TEAMS && (
                  <button
                    type="button"
                    aria-label={`Togli la squadra ${i + 1}`}
                    onClick={() => remove(i)}
                    className="myst-press flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-myst-muted"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
                      <path d="M6 6l12 12M18 6L6 18" />
                    </svg>
                  </button>
                )}
              </li>
            ))}
          </ul>
          {names.length < MYSTERY_MAX_TEAMS && (
            <button
              type="button"
              onClick={add}
              className="myst-press h-[46px] rounded-[14px] border-2 border-dashed border-myst-line-2 text-[15px] font-bold text-myst-muted"
            >
              + Aggiungi una squadra
            </button>
          )}
        </section>

        {error && (
          <p role="alert" className="m-0 rounded-[14px] bg-myst-deep px-4 py-3 text-center text-sm font-bold text-[#FFB0C8]">
            {error}
          </p>
        )}

        <div className="mt-auto flex flex-col gap-2.5 pt-2">
          <span className="text-sm font-semibold text-myst-muted">
            {available} personaggi tra attori, cantanti, serie TV, Marvel, Disney, sport e storia
          </span>
          <button
            type="submit"
            disabled={available === 0}
            className="myst-press h-[58px] rounded-[18px] bg-myst-text text-[17px] font-extrabold text-myst-ink disabled:opacity-40"
          >
            Inizia
          </button>
        </div>
      </form>
    </MystScreen>
  );
}
