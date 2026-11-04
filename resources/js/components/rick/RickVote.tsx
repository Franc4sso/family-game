import React from "react";
import { IconUndo, PrimaryButton, RickShell } from "./RickParts";
import { rickWriters } from "@/services/rickService";
import type { RickState } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";

interface RickVoteProps {
  state: RickState;
  dispatch: React.Dispatch<GameAction>;
  onUndo: () => void;
  canUndo: boolean;
}

/** Rick legge le risposte numerate, al 3 tutti alzano le dita e lui segna chi ha votato cosa. */
export function RickVote({ state, dispatch, onUndo, canUndo }: RickVoteProps) {
  const voters = rickWriters(state);
  const missing = voters.filter((p) => state.votes[p] === null).length;
  const rick = state.players[state.rick];
  // Senza voti l'annulla riporterebbe al giro di scrittura: si annullano solo i voti
  // (chi sapeva già la verità ha il voto messo da solo, non conta)
  const anyVote = voters.some((p) => state.votes[p] !== null && !state.knew[p]);

  return (
    <RickShell>
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <h1 className="m-0 font-rick text-[30px] leading-tight font-normal text-rick-pink">Quale è vera?</h1>
          <span className="text-sm text-rick-muted">{rick.name} legge tutto, poi al 3 tutti alzano le dita.</span>
        </div>
        <button
          type="button"
          aria-label="Annulla l'ultimo voto"
          onClick={onUndo}
          disabled={!canUndo || !anyVote}
          className="rick-press flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[1.5px] border-rick-line text-rick-muted disabled:opacity-30"
        >
          <IconUndo />
        </button>
      </div>

      <ol className="m-0 flex list-none flex-col gap-1.5 p-0">
        {state.answers.map((a, i) => (
          <li key={i} className="flex min-h-[48px] items-center gap-3 rounded-xl bg-rick-cream px-3 py-2 text-rick-plum">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rick-plum text-[15px] font-extrabold text-rick-pink">
              {i + 1}
            </span>
            <span className="text-lg leading-tight font-bold break-words [overflow-wrap:anywhere]">{a.text}</span>
          </li>
        ))}
      </ol>

      <div className="mt-1 flex items-baseline justify-between gap-2">
        <span className="text-xs font-extrabold tracking-[0.1em] text-rick-pink-soft uppercase">Chi ha votato cosa</span>
        <span className="text-xs text-rick-muted">La propria risposta è bloccata</span>
      </div>

      <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
        {voters.map((p) => {
          const player = state.players[p];
          return (
            <li key={p} className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
              <span className="flex min-w-[88px] flex-1 items-center gap-2 text-base font-bold">
                <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: player.color }} aria-hidden />
                <span className="truncate">{player.name}</span>
              </span>
              {state.knew[p] ? (
                // Niente numeri: mostrare quale ha "votato" svelerebbe la verità a tutti
                <span className="flex h-11 items-center rounded-full bg-rick-lime px-4 text-sm font-extrabold text-rick-plum">
                  L'ha già indovinata, non vota
                </span>
              ) : (
              <span className="flex flex-wrap gap-1.5" role="radiogroup" aria-label={`Voto di ${player.name}`}>
                {state.answers.map((a, i) => {
                  const own = a.authors.includes(p);
                  const on = state.votes[p] === i;
                  return (
                    <button
                      key={i}
                      type="button"
                      role="radio"
                      aria-checked={on}
                      aria-label={own ? `${i + 1}, è la sua risposta` : `${player.name} vota la ${i + 1}`}
                      disabled={own}
                      onClick={() => dispatch({ type: "RICK_VOTE", payload: { player: p, answer: i } })}
                      className={`rick-press h-11 w-11 rounded-full text-base font-extrabold transition-colors ${
                        own
                          ? "border-2 border-dashed border-rick-line text-rick-line"
                          : on
                            ? "bg-rick-pink text-rick-plum"
                            : "border-2 border-rick-line bg-rick-panel text-rick-pale"
                      }`}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </span>
              )}
            </li>
          );
        })}
      </ul>

      <div className="sticky bottom-0 mt-auto bg-rick-plum pt-2 pb-[env(safe-area-inset-bottom,0px)]">
        <PrimaryButton disabled={missing > 0} onClick={() => dispatch({ type: "RICK_CONFIRM_VOTES" })}>
          {missing > 0 ? `Mancano ${missing} ${missing === 1 ? "voto" : "voti"}` : "Hanno votato tutti"}
        </PrimaryButton>
      </div>
    </RickShell>
  );
}
