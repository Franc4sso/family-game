import React from "react";
import { IconArrowRight, IconUndo, IconX, MasterScreen } from "../master/parts";
import { Standings } from "./Top100Board";
import type { Top100Category } from "@/data/top100";
import { top100CurrentTeam, top100TotalTurns } from "@/services/top100Service";
import type { Top100State } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";

interface Top100ResultProps {
  state: Top100State;
  category: Top100Category;
  dispatch: React.Dispatch<GameAction>;
  onUndo: () => void;
  canUndo: boolean;
}

/** Il momento della verità: posizione in classifica o fuori dalla top. */
export function Top100Result({ state, category, dispatch, onUndo, canUndo }: Top100ResultProps) {
  const last = state.answers[state.answers.length - 1];
  if (!last) return null;

  const team = state.teams[last.team];
  const item = last.rank !== null ? category.items.find((i) => i.rank === last.rank) : undefined;
  const finished = state.answers.length >= top100TotalTurns(state);
  const nextTeam = state.teams[top100CurrentTeam(state)];

  return (
    <MasterScreen>
      <div className="flex h-11 items-center justify-between gap-3">
        <span className="font-display text-[22px] text-ff-gold">TOP 100</span>
        <span className="truncate text-xs font-extrabold text-[#C9CFEA]">{category.name}</span>
      </div>

      <div className="flex flex-col items-center gap-3.5 pt-5 text-center">
        <span
          className="flex h-7 items-center gap-2 rounded-full bg-[#1B2045] px-3 text-xs font-extrabold uppercase tracking-[0.08em]"
          style={{ boxShadow: `0 0 0 1.5px ${team.color}` }}
        >
          <span className="h-2 w-2 rounded-full" style={{ background: team.color }} />
          {team.name} ha detto
        </span>
        <h2 className="font-display text-[34px] uppercase leading-none break-words">{item ? item.value : last.said || "…"}</h2>

        {item ? (
          <>
            <div className="flex h-[196px] w-[196px] flex-col items-center justify-center gap-0.5 rounded-full bg-ff-gold text-ff-gold-ink animate-fade-in">
              <span className="text-xs font-extrabold tracking-[0.16em] text-ff-gold-ink-soft">POSIZIONE</span>
              <span className="font-display text-[84px] leading-[0.95]">{item.rank}</span>
            </div>
            {item.detail && <span className="text-[15px] font-bold text-[#C9CFEA]">{item.detail}</span>}
            <span className="font-display text-[34px]" style={{ color: team.color }}>
              +{last.points} {last.points === 1 ? "punto" : "punti"}
            </span>
          </>
        ) : (
          <>
            <div className="flex h-[196px] w-[196px] flex-col items-center justify-center gap-1.5 rounded-full border-4 border-ff-red bg-ff-red-bg text-[#FFB0B2] animate-fade-in">
              <span className="text-ff-red"><IconX size={64} strokeWidth={2.6} /></span>
              <span className="text-[13px] font-extrabold tracking-[0.12em]">FUORI DALLA TOP {category.items.length}</span>
            </div>
            <span className="text-[15px] font-bold text-[#C9CFEA]">Nessun punto questa volta</span>
            <span className="font-display text-[34px] text-ff-muted">0 punti</span>
          </>
        )}
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <Standings teams={state.teams} deltas={last.points ? new Map([[team.name, last.points]]) : undefined} />
        <button
          type="button"
          onClick={() => dispatch({ type: "TOP100_NEXT" })}
          className="mt-1 flex h-14 items-center justify-center gap-2.5 rounded-[18px] bg-ff-gold px-4 text-base font-extrabold text-ff-gold-ink active:scale-[0.98]"
        >
          <span className="truncate">{finished ? "Vedi com'è finita" : `Avanti · tocca a ${nextTeam.name}`}</span>
          <IconArrowRight />
        </button>
        <button
          type="button"
          disabled={!canUndo}
          onClick={onUndo}
          className="flex h-[46px] items-center justify-center gap-2 rounded-[14px] border border-ff-line bg-ff-surface text-sm font-bold active:scale-95 disabled:opacity-40"
        >
          <IconUndo />
          Annulla: ho sbagliato risposta
        </button>
      </div>
    </MasterScreen>
  );
}
