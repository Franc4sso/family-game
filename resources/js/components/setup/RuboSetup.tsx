import React, { useState } from "react";
import {
  RUBO_CATEGORIES,
  buildRuboDeck,
  countRuboQuestions,
} from "@/services/ruboService";
import type { RuboCategory } from "@/data/ruboQuestions";
import type { Team } from "@/types/game.types";
import type { GameAction } from "@/types";
import { MAX_TEAM_NAME_LENGTH } from "@/utils/constants";
import { IconBack, RuboCards, RuboRoundButton, RuboTable } from "../rubo/parts";

interface RuboSetupProps {
  teamA: Team;
  teamB: Team;
  dispatch: React.Dispatch<GameAction>;
}

const LEGEND = [
  { pts: "+1", label: "Giusta", dark: false, tone: "" },
  { pts: "0", label: "Errata", dark: false, tone: "text-rubo-ash" },
  { pts: "+2", label: "Rubata", dark: true, tone: "text-rubo-gold" },
  { pts: "−1", label: "Furto fallito", dark: true, tone: "text-rubo-coral" },
];

export function RuboSetup({ teamA, teamB, dispatch }: RuboSetupProps) {
  // Dopo una rivincita i nomi sono già lì
  const [nameA, setNameA] = useState(teamA.name);
  const [nameB, setNameB] = useState(teamB.name);
  const [category, setCategory] = useState<RuboCategory | null>(null);
  const [error, setError] = useState<string | null>(null);

  const available = countRuboQuestions(category, null);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    const a = nameA.trim() || "Squadra A";
    const b = nameB.trim() || "Squadra B";
    if (a.toLowerCase() === b.toLowerCase()) {
      setError("Le due squadre devono avere nomi diversi");
      return;
    }
    const deck = buildRuboDeck(category, null);
    if (deck.length === 0) return;
    dispatch({ type: "START_RUBO", payload: { deck, nameA: a, nameB: b } });
  };

  const chips: { label: string; value: RuboCategory | null }[] = [
    { label: "Tutte", value: null },
    ...RUBO_CATEGORIES.map((c) => ({ label: c, value: c })),
  ];

  return (
    <RuboTable>
      <div className="flex h-11 items-center">
        <RuboRoundButton label="Indietro" onClick={() => dispatch({ type: "CLEAR_MODE" })}>
          <IconBack />
        </RuboRoundButton>
      </div>

      <section className="flex items-center justify-between gap-3">
        <h1 className="m-0 font-rubo text-[68px] leading-[0.9] font-normal uppercase">Rubo</h1>
        <RuboCards />
      </section>

      <p className="m-0 text-[17px] leading-snug font-semibold text-rubo-wine">
        Una squadra risponde. L’altra può rubarle la risposta, ma se sbaglia paga.
      </p>

      <ul className="m-0 grid list-none grid-cols-4 gap-1.5 p-0">
        {LEGEND.map((l) => (
          <li
            key={l.label}
            className={`flex flex-col items-center gap-0.5 rounded-[14px] pt-2.5 pb-2 ${
              l.dark ? "bg-rubo-ink text-rubo-cream" : "bg-rubo-cream text-rubo-ink"
            }`}
          >
            <span className={`font-rubo text-[26px] leading-none ${l.tone}`}>{l.pts}</span>
            <span className="text-xs font-bold">{l.label}</span>
          </li>
        ))}
      </ul>

      <form onSubmit={handleStart} className="flex flex-1 flex-col gap-4">
        <section className="flex flex-col gap-2">
          <span className="text-[13px] font-extrabold text-rubo-wine">Gli sfidanti</span>
          {(
            [
              ["A", nameA, setNameA, "bg-rubo-cream text-rubo-ink", "focus-within:ring-rubo-ink"],
              ["B", nameB, setNameB, "bg-rubo-ink text-rubo-cream", "focus-within:ring-rubo-cream"],
            ] as const
          ).map(([side, value, set, look, ring]) => (
            <div key={side} className={`flex h-[54px] items-center gap-2.5 rounded-2xl px-3.5 focus-within:ring-[3px] ${look} ${ring}`}>
              <span className="w-[18px] font-rubo text-lg text-rubo-red" aria-hidden>
                {side}
              </span>
              <label htmlFor={`rubo-team-${side}`} className="sr-only">
                Nome della squadra {side}
              </label>
              <input
                id={`rubo-team-${side}`}
                value={value}
                maxLength={MAX_TEAM_NAME_LENGTH}
                onChange={(e) => {
                  setError(null);
                  set(e.target.value);
                }}
                placeholder={`Squadra ${side}`}
                autoComplete="off"
                className="min-w-0 flex-1 bg-transparent text-lg font-extrabold placeholder:text-current placeholder:opacity-45 focus:outline-none"
              />
            </div>
          ))}
        </section>

        <section className="flex flex-col gap-2">
          <span className="text-[13px] font-extrabold text-rubo-wine">Di cosa si parla</span>
          <div className="flex flex-wrap gap-1.5">
            {chips.map((c) => {
              const on = category === c.value;
              return (
                <button
                  key={c.label}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setCategory(c.value)}
                  className={`rubo-press h-10 rounded-full border-[2.5px] border-rubo-ink px-3.5 text-[15px] font-extrabold ${
                    on ? "bg-rubo-ink text-rubo-cream" : "text-rubo-ink"
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </section>

        {error && (
          <p role="alert" className="m-0 rounded-2xl bg-rubo-ink px-4 py-3 text-center text-sm font-bold text-rubo-coral">
            {error}
          </p>
        )}

        <div className="mt-auto pt-1">
          <button
            type="submit"
            disabled={available === 0}
            className="rubo-press h-[60px] w-full rounded-[18px] bg-rubo-ink text-lg font-extrabold text-rubo-cream disabled:opacity-40"
          >
            Si gioca · {available} domande
          </button>
        </div>
      </form>
    </RuboTable>
  );
}
