import React, { useState } from "react";
import { IconBack, IconClose, IconUndo, RoundsStepper, TopConfirm, TopLabel, TopScreen } from "./parts";
import type { Top100Category } from "@/data/top100";
import { TOP100_MAX_ROUNDS, searchTop100, top100CurrentRound, top100CurrentTeam, top100Points } from "@/services/top100Service";
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
  const [confirm, setConfirm] = useState<"skip" | "exit" | null>(null);
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
    <TopScreen>
      <header className="flex h-11 items-center justify-between gap-2">
        <button
          type="button"
          onClick={onShowBoard}
          className="top-press flex h-11 items-center gap-1.5 rounded-full border-[1.5px] border-top-line bg-top-panel pr-3.5 pl-2.5 text-sm font-extrabold"
        >
          <IconBack />
          Tabellone
        </button>
        <span className="text-xs font-extrabold tracking-[0.12em] text-top-gold uppercase">Solo per il master</span>
        <button
          type="button"
          aria-label="Esci dal gioco"
          onClick={() => setConfirm("exit")}
          className="top-press flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-top-line bg-top-panel"
        >
          <IconClose />
        </button>
      </header>

      <div className="flex h-14 items-center gap-3 rounded-2xl bg-top-panel px-3.5" style={{ boxShadow: `inset 0 0 0 2px ${team.color}` }}>
        <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: team.color }} />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="text-xs font-extrabold text-top-muted">
            Risponde · giro {top100CurrentRound(state)} di {state.rounds}
          </span>
          <span className="truncate text-[17px] font-extrabold">{team.name}</span>
        </span>
      </div>

      {!query.trim() && (
        <RoundsStepper
          title="Giri di questa classifica"
          note={`Siete al giro ${top100CurrentRound(state)}`}
          value={state.rounds}
          min={top100CurrentRound(state)}
          max={TOP100_MAX_ROUNDS}
          onChange={(rounds) => dispatch({ type: "TOP100_SET_ROUNDS", payload: { rounds } })}
        />
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="top100-answer" className="text-[13px] font-extrabold text-top-muted">
          Cosa hanno detto?
        </label>
        <input
          id="top100-answer"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Scrivi le prime lettere"
          autoComplete="off"
          autoFocus
          className="h-[54px] rounded-[14px] border-2 border-top-gold bg-top-panel px-4 text-lg font-bold text-top-text placeholder:font-semibold placeholder:text-top-muted focus:outline-none"
        />
      </div>

      {query.trim() && (
        <ul className="m-0 flex list-none flex-col gap-1.5 p-0" aria-label="Risultati in classifica">
          {matches.map((item) => {
            const takenBy = saidBy.get(item.rank);
            const top10 = item.rank <= 10;
            return (
              <li key={item.rank}>
                <button
                  type="button"
                  disabled={!!takenBy}
                  onClick={() => answer(item.value, item.rank)}
                  className="top-press flex min-h-[58px] w-full items-center gap-3 rounded-[14px] border-[1.5px] border-top-line bg-top-panel py-1.5 pr-3.5 pl-1.5 text-left disabled:opacity-45"
                >
                  <span
                    className={`flex h-11 min-w-[52px] items-center justify-center rounded-[10px] px-1.5 font-top text-[15px] font-extrabold ${
                      top10 ? "bg-top-gold text-top-gold-ink" : "bg-top-panel-2 text-top-gold"
                    }`}
                  >
                    #{item.rank}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="text-[15px] leading-tight font-extrabold">{item.value}</span>
                    <span className="text-xs font-semibold text-top-muted">{takenBy ? `Già detta da ${takenBy}` : item.detail}</span>
                  </span>
                  {!takenBy && (
                    <span className="shrink-0 font-top text-sm font-extrabold text-top-gold">+{top100Points(item.rank, state.scoring)}</span>
                  )}
                </button>
              </li>
            );
          })}
          {matches.length === 0 && (
            <li className="rounded-[14px] border-[1.5px] border-dashed border-top-line px-4 py-[18px] text-center text-sm font-bold text-top-muted">
              Niente in classifica per “{query.trim()}”
            </li>
          )}
        </ul>
      )}

      {state.answers.length > 0 && !query.trim() && (
        <section className="flex flex-col gap-1.5">
          <TopLabel left="Già dette" />
          <div className="flex flex-wrap gap-1.5">
            {state.answers.map((a, i) => (
              <span key={i} className="flex h-7 items-center gap-1.5 rounded-full bg-top-panel px-2.5 text-xs font-bold text-top-muted">
                <span className="h-2 w-2 rounded-full" style={{ background: state.teams[a.team].color }} />
                {a.skipped ? "Turno saltato" : a.rank === null ? `${a.said || "Risposta"} · fuori` : `${a.said} · #${a.rank}`}
              </span>
            ))}
          </div>
        </section>
      )}

      <div className="sticky bottom-0 mt-auto flex flex-col gap-2 bg-top-night pt-2 pb-1">
        <button
          type="button"
          onClick={() => answer(query.trim(), null)}
          className="top-press flex h-[58px] items-center justify-center gap-2 rounded-[18px] bg-top-red text-base font-extrabold text-white"
        >
          <IconClose size={20} />
          Non è in classifica · 0 punti
        </button>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            disabled={!canUndo}
            onClick={onUndo}
            className="top-press flex h-[46px] items-center justify-center gap-2 rounded-[14px] border-[1.5px] border-top-line bg-top-panel text-sm font-bold disabled:opacity-35"
          >
            <IconUndo />
            Annulla
          </button>
          <button
            type="button"
            onClick={() => setConfirm("skip")}
            className="top-press h-[46px] rounded-[14px] border-[1.5px] border-top-line bg-top-panel text-sm font-bold"
          >
            Salta turno
          </button>
        </div>
      </div>

      {confirm === "skip" && (
        <TopConfirm
          title={`Saltare ${team.name}?`}
          text="Il turno passa alla prossima squadra e questa non prende punti."
          confirmLabel="Salta"
          onCancel={() => setConfirm(null)}
          onConfirm={() => {
            setConfirm(null);
            setQuery("");
            dispatch({ type: "TOP100_SKIP" });
          }}
        />
      )}
      {confirm === "exit" && (
        <TopConfirm
          title="Uscire dal gioco?"
          text="I punteggi di questa partita andranno persi."
          confirmLabel="Esci"
          onCancel={() => setConfirm(null)}
          onConfirm={() => dispatch({ type: "CLEAR_MODE" })}
        />
      )}
    </TopScreen>
  );
}
