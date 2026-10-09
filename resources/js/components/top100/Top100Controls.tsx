import React, { useState } from "react";
import { ControlsTopBar, IconUndo, IconX, MasterScreen, SectionLabel } from "../master/parts";
import { TurnBanner } from "./Top100Board";
import type { Top100Category } from "@/data/top100";
import { searchTop100, top100CurrentRound, top100CurrentTeam, top100Points } from "@/services/top100Service";
import type { Top100State } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";

interface Top100ControlsProps {
  state: Top100State;
  category: Top100Category;
  dispatch: React.Dispatch<GameAction>;
  onUndo: () => void;
  canUndo: boolean;
  onShowBoard: () => void;
}

/** Vista del master: cerca la risposta detta e la assegna. */
export function Top100Controls({ state, category, dispatch, onUndo, canUndo, onShowBoard }: Top100ControlsProps) {
  const [query, setQuery] = useState("");
  const team = state.teams[top100CurrentTeam(state)];
  const matches = searchTop100(category, query);

  // Chi ha già detto cosa, per bloccare le ripetizioni
  const saidBy = new Map<number, string>();
  state.answers.forEach((a) => {
    if (a.rank !== null) saidBy.set(a.rank, state.teams[a.team].name);
  });

  const answer = (said: string, rank: number | null) => {
    dispatch({ type: "TOP100_ANSWER", payload: { said, rank } });
    setQuery("");
    onShowBoard();
  };

  return (
    <MasterScreen>
      <ControlsTopBar onShowBoard={onShowBoard} onResetGame={() => dispatch({ type: "RESET_GAME" })} />

      <TurnBanner team={team} label={`Risponde · giro ${top100CurrentRound(state)} di ${state.roundsPerCategory}`} />

      <div className="flex flex-col gap-1.5">
        <label htmlFor="top100-answer" className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-ff-muted">
          Cosa hanno detto?
        </label>
        <input
          id="top100-answer"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Scrivi le prime lettere"
          autoComplete="off"
          autoFocus
          className="h-[52px] rounded-[14px] border-2 border-ff-gold bg-ff-surface px-4 text-[17px] font-bold text-ff-text placeholder:font-semibold placeholder:text-ff-muted focus:outline-none"
        />
      </div>

      {query.trim() && (
        <ul className="flex flex-col gap-1.5" aria-label="Risultati in classifica">
          {matches.map((item) => {
            const takenBy = saidBy.get(item.rank);
            return (
              <li key={item.rank}>
                <button
                  type="button"
                  disabled={!!takenBy}
                  onClick={() => answer(item.value, item.rank)}
                  className="flex min-h-14 w-full items-center gap-2.5 rounded-[14px] border border-ff-line bg-ff-surface py-1.5 pl-2 pr-3 text-left active:scale-[0.98] disabled:opacity-45"
                >
                  <span className="flex h-9 min-w-[42px] items-center justify-center rounded-[10px] bg-ff-gold px-1.5 font-display text-sm text-ff-gold-ink">
                    #{item.rank}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="text-[15px] font-extrabold leading-tight">{item.value}</span>
                    <span className="text-xs font-semibold text-ff-muted">
                      {takenBy ? `Già detta da ${takenBy}` : item.detail}
                    </span>
                  </span>
                  {!takenBy && (
                    <span className="shrink-0 text-[13px] font-extrabold text-ff-gold">+{top100Points(item.rank, state.scoring)}</span>
                  )}
                </button>
              </li>
            );
          })}
          {matches.length === 0 && (
            <li className="rounded-[14px] border border-dashed border-ff-line px-4 py-4 text-center text-sm font-semibold text-ff-muted">
              Niente in classifica per “{query.trim()}”
            </li>
          )}
        </ul>
      )}

      {state.answers.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <SectionLabel left="Già dette" />
          <div className="flex flex-wrap gap-1.5">
            {state.answers.map((a, i) => (
              <span key={i} className="flex h-7 items-center gap-1.5 rounded-full border border-ff-line-soft bg-ff-surface px-2.5 text-xs font-bold text-[#C9CFEA]">
                <span className="h-2 w-2 rounded-full" style={{ background: state.teams[a.team].color }} />
                {a.skipped ? "Turno saltato" : a.rank === null ? `${a.said || "Risposta"} · fuori` : `${a.said} · #${a.rank}`}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="sticky bottom-0 mt-auto flex flex-col gap-2 bg-ff-bg pb-1 pt-2">
        <button
          type="button"
          onClick={() => answer(query.trim(), null)}
          className="flex h-[58px] items-center justify-center gap-2.5 rounded-[18px] bg-ff-red text-base font-extrabold text-white active:scale-[0.98]"
        >
          <IconX size={20} />
          Non è in classifica · 0 punti
        </button>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            disabled={!canUndo}
            onClick={onUndo}
            className="flex h-[46px] items-center justify-center gap-2 rounded-[14px] border border-ff-line bg-ff-surface text-sm font-bold active:scale-95 disabled:opacity-40"
          >
            <IconUndo />
            Annulla
          </button>
          <button
            type="button"
            onClick={() => {
              if (confirm(`Saltare il turno di ${team.name}? Non prende punti.`)) {
                dispatch({ type: "TOP100_SKIP" });
                setQuery("");
              }
            }}
            className="h-[46px] rounded-[14px] border border-ff-line bg-ff-surface text-sm font-bold active:scale-95"
          >
            Salta turno
          </button>
        </div>
      </div>
    </MasterScreen>
  );
}
