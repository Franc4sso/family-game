import React, { useState } from "react";
import { BackButton, MasterScreen, RankBadge } from "../master/parts";
import type { Team, Round } from "@/types/game.types";
import type { GameAction } from "@/types";

interface FaceOffProps {
  teamA: Team;
  teamB: Team;
  currentRound: Round;
  dispatch: React.Dispatch<GameAction>;
  onBack: () => void;
}

type Side = "A" | "B";

interface Pick {
  index: number | null;
  custom: string;
  none: boolean;
}

const EMPTY: Pick = { index: null, custom: "", none: false };

const SIDE_STYLE = {
  A: { pick: "bg-[#4C8DFF] text-[#06122E]", card: "bg-ff-team-a ring-[#2A3D78]", label: "text-[#A9C4FF]" },
  B: { pick: "bg-ff-orange text-ff-orange-ink", card: "bg-ff-team-b ring-[#4A2C22]", label: "text-[#FFB08C]" },
};

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
    <MasterScreen>
      <BackButton onClick={onBack} />
      <div className="flex flex-col gap-1.5 rounded-[22px] bg-ff-gold px-[18px] pb-[18px] pt-4 text-ff-gold-ink">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-ff-gold-ink-soft">Face-off</span>
        <h1 className="font-display text-[23px] uppercase leading-[1.12]">{currentRound.category}</h1>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {(["A", "B"] as Side[]).map((side) => (
          <div key={side} className={`flex flex-col gap-0.5 rounded-[16px] px-3.5 py-2.5 ring-1 ${SIDE_STYLE[side].card}`}>
            <span className={`truncate text-[11px] font-extrabold uppercase tracking-[0.1em] ${SIDE_STYLE[side].label}`}>
              {names[side]}
            </span>
            <span className={`truncate text-sm font-bold ${hasPick(picks[side]) ? "text-ff-text" : "text-ff-muted"}`}>
              {summary(side)}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-[11px] font-extrabold uppercase tracking-[0.12em] text-ff-muted">
        <span>Chi ha detto cosa?</span>
      </div>

      <ul className="flex flex-col gap-1.5">
        {currentRound.answers.map((answer, index) => {
          const owner: Side | null = picks.A.index === index ? "A" : picks.B.index === index ? "B" : null;
          return (
            <li
              key={index}
              className={`flex min-h-[54px] items-center gap-2.5 rounded-[14px] border py-1.5 pl-2 pr-1.5 ${
                owner ? "border-ff-gold bg-ff-surface-2" : "border-ff-line-soft bg-ff-surface"
              }`}
            >
              <RankBadge rank={answer.rank} className="bg-ff-surface-2 text-ff-gold" />
              <span className="min-w-0 flex-1 text-[15px] font-bold leading-tight">{answer.value}</span>
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
                    className={`h-10 w-[68px] shrink-0 truncate rounded-[10px] px-1.5 text-xs font-extrabold active:scale-95 disabled:opacity-25 ${
                      mine ? SIDE_STYLE[side].pick : "border border-ff-line text-ff-muted"
                    }`}
                  >
                    {names[side]}
                  </button>
                );
              })}
            </li>
          );
        })}
      </ul>

      <div className="flex flex-col gap-2">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-ff-muted">Risposta fuori dal tabellone</span>
        {(["A", "B"] as Side[]).map((side) => (
          <div key={side} className="flex gap-2">
            <label htmlFor={`custom-${side}`} className="sr-only">Altra risposta di {names[side]}</label>
            <input
              id={`custom-${side}`}
              value={picks[side].custom}
              onChange={(e) => setCustom(side, e.target.value)}
              placeholder={`Altra risposta di ${names[side]}`}
              autoComplete="off"
              className="h-12 min-w-0 flex-1 rounded-[14px] border border-ff-line bg-ff-surface px-4 text-[15px] font-semibold text-ff-text placeholder:text-ff-muted focus:border-ff-gold focus:outline-none"
            />
            <button
              type="button"
              aria-pressed={picks[side].none}
              onClick={() => toggleNone(side)}
              className={`h-12 shrink-0 rounded-[14px] px-3.5 text-sm font-extrabold active:scale-95 ${
                picks[side].none ? SIDE_STYLE[side].pick : "border border-ff-line text-ff-muted"
              }`}
            >
              Nessuna
            </button>
          </div>
        ))}
      </div>

      <div className="sticky bottom-0 mt-auto bg-ff-bg pb-1 pt-2">
        <button
          type="button"
          disabled={!hasPick(picks.A) || !hasPick(picks.B)}
          onClick={handleReveal}
          className="h-[60px] w-full rounded-[18px] bg-ff-gold text-[17px] font-extrabold text-ff-gold-ink active:scale-[0.98] disabled:bg-ff-surface disabled:text-ff-muted"
        >
          Rivela le risposte
        </button>
      </div>
    </MasterScreen>
  );
}
