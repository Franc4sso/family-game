import React from "react";
import { DeckProgress, IconArrow, IconSliders, QdcpShell, TeamStrip, pointsLabel } from "./QdcpParts";
import { QDCP_CLUE_LABELS, qdcpPoints } from "@/services/qdcpService";
import type { QdcpState } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";

interface QdcpBoardProps {
  state: QdcpState;
  dispatch: React.Dispatch<GameAction>;
  onOpenControls: () => void;
}

/** Ogni gradino rientra un po' di più, come le parole sulla copertina. */
const INDENT = ["ml-0", "ml-3.5", "ml-7", "ml-[42px]"];

/**
 * Tabellone per tutti: la scala dei quattro indizi. Quelli già letti in
 * piccolo, il corrente grande in lime, il prossimo con il pulsante per
 * svelarlo, gli altri ancora chiusi. La categoria non si vede.
 */
export function QdcpBoard({ state, dispatch, onOpenControls }: QdcpBoardProps) {
  const card = state.deck[state.current];
  const shown = state.cluesShown;

  return (
    <QdcpShell>
      <header className="flex h-11 items-center gap-3">
        <DeckProgress current={state.current + 1} total={state.deck.length} />
        <button
          type="button"
          onClick={onOpenControls}
          aria-label="Apri il pannello del master"
          className="qd-press flex h-11 shrink-0 items-center gap-2 rounded-full border-[1.5px] border-qd-line bg-qd-panel px-3.5 text-sm font-extrabold text-qd-lime"
        >
          <IconSliders />
          Master
        </button>
      </header>

      <TeamStrip teams={state.teams} />

      <ol className="m-0 mt-1 flex list-none flex-col gap-2 p-0" aria-label="Gli indizi">
        {QDCP_CLUE_LABELS.map((label, i) => {
          const points = qdcpPoints(i + 1);
          const word = label.charAt(0) + label.slice(1).toLowerCase();
          return (
            <li key={label} className={INDENT[i]}>
              {i < shown - 1 && (
                <div className="flex flex-col gap-[3px] rounded-2xl bg-qd-panel px-3.5 pt-2.5 pb-3">
                  <span className="qd-wide text-sm text-qd-lime">{word}</span>
                  <span className="text-[15px] leading-snug font-semibold text-qd-pale">{card.clues[i]}</span>
                </div>
              )}
              {i === shown - 1 && (
                <div key={`${card.id}-${i}`} aria-live="polite" className="qd-open flex flex-col gap-2.5 rounded-[20px] bg-qd-lime px-[18px] pt-4 pb-5 text-qd-green">
                  <span className="flex items-center justify-between gap-2.5">
                    <span className="qd-wide text-[30px] leading-none">{word}</span>
                    <span className="rounded-xl bg-qd-green px-2.5 py-[5px] text-[13px] font-extrabold whitespace-nowrap text-qd-lime">
                      vale {pointsLabel(points)}
                    </span>
                  </span>
                  <p className="m-0 text-[25px] leading-[1.2] font-extrabold text-balance">{card.clues[i]}</p>
                </div>
              )}
              {i === shown && (
                <div className="flex h-14 items-center justify-between gap-2.5 rounded-[18px] border-[1.5px] border-dashed border-qd-lime pr-1.5 pl-4 text-qd-lime">
                  <span className="flex flex-col leading-[1.1]">
                    <span className="qd-wide text-lg">{word}</span>
                    <span className="text-xs font-bold text-qd-muted">poi vale {pointsLabel(points)}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "QDCP_REVEAL_CLUE" })}
                    aria-label={`Svela ${word}`}
                    className="qd-press flex h-11 items-center gap-1.5 rounded-[14px] bg-qd-lime px-[18px] text-[15px] font-extrabold text-qd-green"
                  >
                    Svela
                    <IconArrow />
                  </button>
                </div>
              )}
              {i > shown && (
                <div className="flex h-12 items-center justify-between rounded-2xl border-[1.5px] border-dashed border-qd-dash px-4 text-qd-dim">
                  <span className="qd-wide text-lg">{word}</span>
                  <span className="text-[13px] font-bold">{pointsLabel(points)}</span>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </QdcpShell>
  );
}
