import React from "react";
import { IconUndo, QdcpShell, TeamStrip } from "./QdcpParts";
import { QDCP_CLUE_LABELS, qdcpPoints } from "@/services/qdcpService";
import type { QdcpState } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";

interface QdcpSolutionProps {
  state: QdcpState;
  dispatch: React.Dispatch<GameAction>;
  onUndo: () => void;
  canUndo: boolean;
}

const ORDINAL = ["primo", "secondo", "terzo", "quarto"];

/** L'Anybody largo occupa molto: la parola più lunga deve stare in una riga. */
function answerSize(answer: string): number {
  const longest = Math.max(4, ...answer.split(/\s+/).map((w) => w.length));
  return Math.max(26, Math.min(54, Math.floor(350 / (longest * 0.9))));
}

/** Fine carta, per tutti: tutto lo schermo diventa lime, con la risposta grande. */
export function QdcpSolution({ state, dispatch, onUndo, canUndo }: QdcpSolutionProps) {
  const card = state.deck[state.current];
  const winner = state.solvedBy !== null ? state.teams[state.solvedBy] : null;
  const gained = qdcpPoints(state.cluesShown);
  const deltas = state.solvedBy !== null ? new Map([[state.solvedBy, gained]]) : undefined;
  const isLast = state.current + 1 >= state.deck.length;

  return (
    <QdcpShell tone="lime">
      <header className="flex h-11 items-center justify-between text-[13px] font-extrabold text-qd-lime-ink">
        <span>
          Carta {state.current + 1} di {state.deck.length}
        </span>
        <span>{card.category}</span>
      </header>

      <section key={card.id} className="qd-open flex flex-col gap-1.5 pt-4">
        <span className="text-lg font-bold">La risposta era</span>
        <h1 className="qd-wide m-0 leading-[0.95] break-words" style={{ fontSize: answerSize(card.answer) }}>
          {card.answer}
        </h1>
      </section>

      {winner ? (
        <div className="flex h-16 items-center gap-3 rounded-full bg-qd-green pr-[18px] pl-3 text-white">
          <span className="h-10 w-10 shrink-0 rounded-full" style={{ background: winner.color }} aria-hidden />
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-lg font-extrabold">{winner.name}</span>
            <span className="text-[13px] font-semibold text-qd-muted">al {ORDINAL[state.cluesShown - 1]} indizio</span>
          </span>
          <span className="qd-wide text-[26px] text-qd-lime">+{gained}</span>
        </div>
      ) : (
        <div className="flex h-16 items-center rounded-full bg-qd-green/12 px-5 text-lg font-extrabold">Nessuno ci è arrivato</div>
      )}

      <ol className="m-0 mt-1 flex list-none flex-col gap-1.5 p-0" aria-label="Gli indizi">
        {card.clues.map((clue, i) => (
          <li key={QDCP_CLUE_LABELS[i]} className={`flex gap-3 ${i < state.cluesShown ? "" : "text-qd-faint"}`}>
            <span className="qd-wide w-[76px] shrink-0 pt-0.5 text-xs">{QDCP_CLUE_LABELS[i]}</span>
            <span className="text-sm leading-snug font-semibold">{clue}</span>
          </li>
        ))}
      </ol>

      <div className="mt-auto flex flex-col gap-2 pt-2">
        <TeamStrip teams={state.teams} deltas={deltas} onLime />
        <button
          type="button"
          onClick={() => dispatch({ type: "QDCP_NEXT" })}
          className="qd-press mt-1 h-[58px] rounded-[18px] bg-qd-green text-[17px] font-extrabold text-qd-lime"
        >
          {isLast ? "Classifica finale" : "Prossima carta"}
        </button>
        <button
          type="button"
          disabled={!canUndo}
          onClick={onUndo}
          className="qd-press flex h-11 items-center justify-center gap-1.5 text-sm font-bold text-qd-lime-ink disabled:opacity-35"
        >
          <IconUndo />
          Annulla, torna agli indizi
        </button>
      </div>
    </QdcpShell>
  );
}
