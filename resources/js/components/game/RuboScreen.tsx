import React, { useState } from "react";
import { RUBO_POINTS } from "@/services/ruboService";
import type { GameState, RuboOutcome, Team } from "@/types/game.types";
import type { GameAction } from "@/types";

interface RuboScreenProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
  onUndo: () => void;
  canUndo: boolean;
}

interface OutcomeDef {
  key: RuboOutcome;
  label: string;
  /** colore (sobrio) del valore punti */
  point: string;
}

const OUTCOMES: OutcomeDef[] = [
  { key: "correct", label: "Corretta", point: "text-emerald-400" },
  { key: "steal_success", label: "Rubo riuscito", point: "text-amber-400" },
  { key: "wrong", label: "Errata", point: "text-neutral-500" },
  { key: "steal_fail", label: "Rubo fallito", point: "text-rose-400" },
];

function pointLabel(p: number): string {
  return p > 0 ? `+${p}` : `${p}`;
}

export function RuboScreen({ gameState, dispatch, onUndo, canUndo }: RuboScreenProps) {
  const { teamA, teamB, rubo } = gameState;
  const [confirmExit, setConfirmExit] = useState(false);

  if (!rubo) return null;

  const finished = rubo.currentIndex >= rubo.deck.length;

  // ───────────────────────── Schermata finale ─────────────────────────
  if (finished) {
    const tie = teamA.score === teamB.score;
    const winner: Team | null = tie ? null : teamA.score > teamB.score ? teamA : teamB;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-8 bg-neutral-950 text-neutral-100">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-3">Fine partita</p>
          <h2 className="text-2xl font-semibold">
            {winner ? `Vince ${winner.name}` : "Pareggio"}
          </h2>
        </div>

        <div className="w-full max-w-sm grid grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {([["A", teamA], ["B", teamB]] as const).map(([side, t]) => {
            const win = !tie && winner === t;
            return (
              <div key={side} className="bg-neutral-900 p-5 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${side === "A" ? "bg-blue-500" : "bg-red-500"}`} />
                  <span className="text-xs text-neutral-400 truncate">{t.name}</span>
                </div>
                <div className={`text-3xl font-semibold tabular-nums ${win ? "text-white" : "text-neutral-400"}`}>
                  {t.score}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={() => dispatch({ type: "CLEAR_MODE" })}
          className="w-full max-w-sm bg-white text-neutral-900 font-medium rounded-xl py-3.5 active:bg-neutral-200 transition-colors"
        >
          Nuova partita
        </button>
      </div>
    );
  }

  // ───────────────────────── Schermata di gioco ─────────────────────────
  const question = rubo.deck[rubo.currentIndex];
  const bothAssigned = rubo.outcomeA !== null && rubo.outcomeB !== null;
  const isLast = rubo.currentIndex + 1 >= rubo.deck.length;
  const progress = (rubo.currentIndex / rubo.deck.length) * 100;

  const teamPanel = (side: "A" | "B", team: Team, selected: RuboOutcome | null) => {
    const dot = side === "A" ? "bg-blue-500" : "bg-red-500";
    return (
      <div className="bg-neutral-900/70 border border-white/10 rounded-xl p-3">
        <div className="flex items-center gap-1.5 mb-2.5">
          <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
          <span className="text-xs font-medium text-neutral-300 truncate">{team.name}</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {OUTCOMES.map((o) => {
            const isSel = selected === o.key;
            return (
              <button
                key={o.key}
                onClick={() =>
                  dispatch({
                    type: "RUBO_ASSIGN_OUTCOME",
                    payload: { team: side, outcome: o.key },
                  })
                }
                className={`flex items-center justify-between rounded-lg border px-2.5 py-2 text-xs transition-all active:scale-[0.97]
                  ${isSel
                    ? "bg-white/10 border-white/25 text-white"
                    : "bg-transparent border-white/10 text-neutral-400"}`}
              >
                <span className="truncate">{o.label}</span>
                <span className={`ml-1 font-semibold tabular-nums ${isSel ? "text-white" : o.point}`}>
                  {pointLabel(RUBO_POINTS[o.key])}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100">
      {/* Header */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
          <button onClick={() => setConfirmExit(true)} className="active:text-neutral-300 transition-colors">
            Esci
          </button>
          <span className="tabular-nums tracking-wide">
            {rubo.currentIndex + 1} / {rubo.deck.length}
          </span>
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="active:text-neutral-300 disabled:opacity-30 transition-colors"
          >
            Annulla
          </button>
        </div>
        <div className="h-0.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full bg-white/50 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="flex-1 flex flex-col px-4 pb-4 gap-3 max-w-md w-full mx-auto">
        {/* Punteggi */}
        <div className="flex items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-xs text-neutral-400 max-w-[5.5rem] truncate">{teamA.name}</span>
            <span className="text-lg font-semibold tabular-nums">{teamA.score}</span>
          </div>
          <span className="text-xs text-neutral-600">·</span>
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-semibold tabular-nums">{teamB.score}</span>
            <span className="text-xs text-neutral-400 max-w-[5.5rem] truncate">{teamB.name}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          </div>
        </div>

        {/* Domanda */}
        <div className="bg-neutral-900/60 border border-white/10 rounded-2xl px-5 py-6 text-center mt-1">
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3">
            {question.category}
          </p>
          <p className="text-base md:text-lg font-medium leading-relaxed text-neutral-50 text-balance">
            {question.question}
          </p>
        </div>

        {/* Risposta (solo master) */}
        {rubo.answerRevealed ? (
          <div className="border border-white/10 rounded-xl px-4 py-3 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">Risposta</span>
            </div>
            <p className="text-lg font-semibold text-neutral-50">{question.answer}</p>
            <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">{question.explanation}</p>
          </div>
        ) : (
          <button
            onClick={() => dispatch({ type: "RUBO_REVEAL_ANSWER" })}
            className="border border-dashed border-white/15 rounded-xl py-3 text-sm text-neutral-400 active:text-neutral-200 hover:border-white/30 transition-all"
          >
            Mostra risposta <span className="text-neutral-600">· solo a te</span>
          </button>
        )}

        {/* Esiti per squadra */}
        <div className="space-y-2">
          {teamPanel("A", teamA, rubo.outcomeA)}
          {teamPanel("B", teamB, rubo.outcomeB)}
        </div>

        {/* Prossima */}
        <div className="mt-auto pt-1">
          <button
            onClick={() => dispatch({ type: "RUBO_NEXT_QUESTION" })}
            className={`w-full rounded-xl py-3.5 font-medium transition-colors ${
              bothAssigned
                ? "bg-white text-neutral-900 active:bg-neutral-200"
                : "bg-white/10 text-neutral-400 active:bg-white/15"
            }`}
          >
            {isLast ? "Risultati finali" : "Prossima domanda"}
          </button>
          {!bothAssigned && (
            <p className="text-center text-[11px] text-neutral-600 mt-1.5">
              Assegna l'esito a entrambe le squadre
            </p>
          )}
        </div>
      </div>

      {/* Conferma uscita */}
      {confirmExit && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 max-w-xs w-full text-center space-y-4">
            <p className="text-neutral-100 font-medium">Uscire dal Rubo?</p>
            <p className="text-xs text-neutral-500">I punteggi attuali andranno persi.</p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmExit(false)}
                className="flex-1 rounded-lg py-2.5 text-sm bg-white/5 border border-white/10 text-neutral-300 active:bg-white/10"
              >
                Annulla
              </button>
              <button
                onClick={() => dispatch({ type: "CLEAR_MODE" })}
                className="flex-1 rounded-lg py-2.5 text-sm bg-rose-500/90 text-white active:bg-rose-600"
              >
                Esci
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
