import React, { useState } from "react";
import { FeudBack, FeudScreen, RankOval, TEAM, type Side } from "../feud/parts";
import type { Team, Round } from "@/types/game.types";
import type { GameAction } from "@/types";

interface FaceOffProps {
  teamA: Team;
  teamB: Team;
  currentRound: Round;
  dispatch: React.Dispatch<GameAction>;
  onBack: () => void;
}

interface Pick {
  index: number | null;
  custom: string;
  none: boolean;
}

const EMPTY: Pick = { index: null, custom: "", none: false };

export function FaceOff({ teamA, teamB, currentRound, dispatch, onBack }: FaceOffProps) {
  const [picks, setPicks] = useState<Record<Side, Pick>>({ A: EMPTY, B: EMPTY });
  const names = { A: teamA.name, B: teamB.name };

  const update = (side: Side, next: Partial<Pick>) =>
    setPicks((p) => ({ ...p, [side]: { ...p[side], ...next } }));

  // Ogni scelta esclude le altre due opzioni della stessa squadra
  const pickAnswer = (side: Side, index: number) =>
    update(side, { index: picks[side].index === index ? null : index, custom: "", none: false });
  const setCustom = (side: Side, custom: string) =>
    update(side, custom ? { custom, index: null, none: false } : { custom });
  const toggleNone = (side: Side) =>
    update(side, picks[side].none ? { none: false } : { none: true, index: null, custom: "" });

  const hasPick = (p: Pick) => p.index !== null || !!p.custom.trim() || p.none;

  const handleReveal = () => {
    const toPayload = (p: Pick) => ({
      index: p.index,
      custom: p.custom.trim() ? p.custom.trim() : p.none ? "__NONE__" : null,
    });
    const a = toPayload(picks.A);
    const b = toPayload(picks.B);

    dispatch({
      type: "FACEOFF_REVEAL",
      payload: {
        teamA_answerIndex: a.index,
        teamB_answerIndex: b.index,
        teamA_custom: a.custom,
        teamB_custom: b.custom,
      },
    });
  };

  const summary = (side: Side) => {
    const p = picks[side];
    if (p.index !== null) return currentRound.answers[p.index].value;
    if (p.custom.trim()) return `“${p.custom.trim()}”`;
    if (p.none) return "Nessuna risposta";
    return "In attesa…";
  };

  return (
    <FeudScreen>
      <div className="flex h-11 items-center gap-3">
        <FeudBack onClick={onBack} />
        <span className="text-sm font-extrabold text-feud-muted">Solo il master vede le risposte</span>
      </div>

      <section className="flex flex-col gap-1.5">
        <h1 className="m-0 font-feud text-[64px] leading-[0.82] font-black text-feud-yellow uppercase">Face-off</h1>
        <p className="m-0 font-feud text-[28px] leading-[0.95] font-extrabold text-balance uppercase">{currentRound.category}</p>
      </section>

      <div className="grid grid-cols-2 gap-2">
        {(["A", "B"] as Side[]).map((side) => {
          const picked = hasPick(picks[side]);
          return (
            <div
              key={side}
              className={`flex min-h-[64px] flex-col justify-center gap-0.5 rounded-2xl px-3.5 py-2 ${
                picked ? TEAM[side].solid : "border-2 border-white/25"
              }`}
            >
              <span className={`truncate text-xs font-extrabold ${picked ? TEAM[side].soft : TEAM[side].outlineText}`}>{names[side]}</span>
              <span className={`truncate text-[15px] font-extrabold ${picked ? "" : "text-feud-muted"}`}>{summary(side)}</span>
            </div>
          );
        })}
      </div>

      <span className="text-[13px] font-bold text-feud-muted">Chi ha detto cosa?</span>

      <ol className="flex flex-col gap-1.5">
        {currentRound.answers.map((answer, index) => {
          const owner: Side | null = picks.A.index === index ? "A" : picks.B.index === index ? "B" : null;
          return (
            <li
              key={index}
              className={`flex min-h-[52px] items-center gap-2 rounded-xl py-1.5 pr-1.5 pl-1 ${owner ? "bg-white text-feud-ink" : "bg-feud-navy"}`}
            >
              <RankOval rank={answer.rank} className={owner ? "bg-feud-ink text-feud-yellow" : "bg-feud-yellow text-feud-ink"} />
              <span className="min-w-0 flex-1 text-[15px] leading-tight font-bold">{answer.value}</span>
              {(["A", "B"] as Side[]).map((side) => {
                const mine = owner === side;
                const taken = owner !== null && !mine;
                return (
                  <button
                    key={side}
                    type="button"
                    disabled={taken}
                    aria-pressed={mine}
                    aria-label={`${answer.value}: risposta di ${names[side]}`}
                    onClick={() => pickAnswer(side, index)}
                    className={`feud-press h-10 w-[68px] shrink-0 truncate rounded-[10px] px-1.5 text-xs font-extrabold disabled:opacity-25 ${
                      mine ? TEAM[side].solid : owner ? "border-2 border-feud-ink/20" : "border-2 border-white/25 text-feud-muted"
                    }`}
                  >
                    {names[side]}
                  </button>
                );
              })}
            </li>
          );
        })}
      </ol>

      <div className="flex flex-col gap-2">
        <span className="text-[13px] font-bold text-feud-muted">Risposta fuori dal tabellone</span>
        {(["A", "B"] as Side[]).map((side) => (
          <div key={side} className="flex gap-2">
            <label htmlFor={`custom-${side}`} className="sr-only">
              Altra risposta di {names[side]}
            </label>
            <input
              id={`custom-${side}`}
              value={picks[side].custom}
              onChange={(e) => setCustom(side, e.target.value)}
              placeholder={`Altra risposta di ${names[side]}`}
              autoComplete="off"
              className="h-12 min-w-0 flex-1 rounded-[14px] bg-feud-navy px-4 text-base font-semibold text-white placeholder:text-feud-muted-2 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button
              type="button"
              aria-pressed={picks[side].none}
              onClick={() => toggleNone(side)}
              className={`feud-press h-12 shrink-0 rounded-[14px] px-3.5 text-sm font-extrabold ${
                picks[side].none ? TEAM[side].solid : "border-2 border-white/25 text-feud-muted"
              }`}
            >
              Nessuna
            </button>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 mt-auto bg-feud-blue pt-2 pb-1">
        <button
          type="button"
          disabled={!hasPick(picks.A) || !hasPick(picks.B)}
          onClick={handleReveal}
          className="feud-press h-[60px] w-full rounded-[18px] bg-white text-lg font-extrabold text-feud-ink disabled:bg-feud-navy disabled:text-feud-muted-2"
        >
          Rivela le risposte
        </button>
      </div>
    </FeudScreen>
  );
}
