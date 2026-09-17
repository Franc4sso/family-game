import React, { useState } from "react";
import { formatValue, isTightCall } from "@/services/higherLowerService";
import type { GameState, Team } from "@/types/game.types";
import type { GameAction } from "@/types";

interface HigherLowerScreenProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
  onUndo: () => void;
  canUndo: boolean;
}

export function HigherLowerScreen({
  gameState,
  dispatch,
  onUndo,
  canUndo,
}: HigherLowerScreenProps) {
  const { teamA, teamB, higherLower: hl } = gameState;
  const [confirmExit, setConfirmExit] = useState(false);

  if (!hl) return null;

  const finished = hl.loser !== null || hl.exhausted;

  // ───────────────────────── Schermata finale ─────────────────────────
  if (finished) {
    const winner: Team | null =
      hl.loser === null ? null : hl.loser === "A" ? teamB : teamA;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-7 bg-neutral-950 text-neutral-100">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-3">
            {hl.loser ? "Catena interrotta" : "Catena esaurita"}
          </p>
          <h2 className="text-2xl font-semibold">
            {winner ? `Vince ${winner.name}` : "Pareggio: nessuno ha sbagliato"}
          </h2>
          <p className="text-4xl font-semibold tabular-nums mt-5">{hl.streak}</p>
          <p className="text-xs text-neutral-500 mt-1">
            confronti indovinati di fila
          </p>
        </div>

        <div className="w-full max-w-sm grid grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {([["A", teamA], ["B", teamB]] as const).map(([side, t]) => {
            const win = winner === t;
            return (
              <div key={side} className="bg-neutral-900 p-5 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      side === "A" ? "bg-blue-500" : "bg-red-500"
                    }`}
                  />
                  <span className="text-xs text-neutral-400 truncate">{t.name}</span>
                </div>
                <div
                  className={`text-3xl font-semibold tabular-nums ${
                    win ? "text-white" : "text-neutral-400"
                  }`}
                >
                  {hl.correctByTeam[side]}
                </div>
                <p className="text-[10px] text-neutral-600 mt-1">risposte giuste</p>
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
  const reference = hl.chain[hl.currentIndex];
  const challenger = hl.chain[hl.currentIndex + 1];
  const active = hl.activeTeam === "A" ? teamA : teamB;
  const activeDot = hl.activeTeam === "A" ? "bg-blue-500" : "bg-red-500";
  const activeText = hl.activeTeam === "A" ? "text-blue-400" : "text-red-400";
  const guess = hl.lastGuess;
  const revealed = guess !== null;
  const tight = revealed && isTightCall(reference, challenger);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100">
      {/* Header */}
      <div className="px-4 pt-3 pb-2 flex items-center justify-between text-xs text-neutral-500">
        <button
          onClick={() => setConfirmExit(true)}
          className="active:text-neutral-300 transition-colors"
        >
          Esci
        </button>
        <span className="tabular-nums tracking-wide text-neutral-400">
          Catena <span className="text-neutral-100 font-semibold">{hl.streak}</span>
        </span>
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="active:text-neutral-300 disabled:opacity-30 transition-colors"
        >
          Annulla
        </button>
      </div>

      <div className="flex-1 flex flex-col px-4 pb-4 gap-3 max-w-md w-full mx-auto">
        {/* Risposte giuste per squadra */}
        <div className="flex items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-xs text-neutral-400 max-w-[5.5rem] truncate">
              {teamA.name}
            </span>
            <span className="text-lg font-semibold tabular-nums">
              {hl.correctByTeam.A}
            </span>
          </div>
          <span className="text-xs text-neutral-600">·</span>
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-semibold tabular-nums">
              {hl.correctByTeam.B}
            </span>
            <span className="text-xs text-neutral-400 max-w-[5.5rem] truncate">
              {teamB.name}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          </div>
        </div>

        {/* Turno */}
        <div className="flex items-center justify-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${activeDot}`} />
          <span className={`text-sm font-medium ${activeText}`}>{active.name}</span>
          {!revealed && <span className="text-xs text-neutral-500">risponde</span>}
        </div>

        {/* Riferimento */}
        <div className="bg-neutral-900/60 border border-white/10 rounded-2xl px-5 py-4 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-2">
            Riferimento
          </p>
          <p className="text-base font-medium leading-snug text-neutral-50 text-balance">
            {reference.label}
          </p>
          <p className="text-2xl font-semibold tabular-nums text-white mt-2">
            {formatValue(reference.value, reference.unit)}
          </p>
          <p className="text-[11px] text-neutral-500 mt-0.5">{reference.unit}</p>
        </div>

        {/* Sfidante */}
        <div
          className={`border rounded-2xl px-5 py-4 text-center transition-colors ${
            revealed
              ? guess.correct
                ? "border-emerald-500/40 bg-emerald-500/5"
                : "border-rose-500/40 bg-rose-500/5"
              : "border-white/10 bg-neutral-900/60"
          }`}
        >
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-2">
            Più alto o più basso?
          </p>
          <p className="text-base font-medium leading-snug text-neutral-50 text-balance">
            {challenger.label}
          </p>

          {revealed ? (
            <>
              <p className="text-2xl font-semibold tabular-nums text-white mt-2">
                {formatValue(challenger.value, challenger.unit)}
              </p>
              <p className="text-[11px] text-neutral-500 mt-0.5">{challenger.unit}</p>
              {tight && (
                <p className="text-[10px] uppercase tracking-[0.2em] text-amber-400/80 mt-2">
                  Testa a testa
                </p>
              )}
              <p className="text-xs text-neutral-400 mt-3 leading-relaxed">
                {challenger.note}
              </p>
            </>
          ) : (
            <p className="text-2xl font-semibold text-neutral-700 mt-2">?</p>
          )}
        </div>

        {/* Azioni */}
        {!revealed ? (
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => dispatch({ type: "HL_GUESS", payload: { guess: "lower" } })}
              className="rounded-xl py-4 font-medium bg-neutral-900 border border-white/10 text-neutral-100 active:bg-neutral-800 transition-colors"
            >
              Più basso
            </button>
            <button
              onClick={() => dispatch({ type: "HL_GUESS", payload: { guess: "higher" } })}
              className="rounded-xl py-4 font-medium bg-neutral-900 border border-white/10 text-neutral-100 active:bg-neutral-800 transition-colors"
            >
              Più alto
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <p
              className={`text-center text-sm font-medium ${
                guess.correct ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {guess.correct
                ? "Giusto, la catena continua"
                : `Sbagliato · vince ${guess.team === "A" ? teamB.name : teamA.name}`}
            </p>
            <button
              onClick={() => dispatch({ type: "HL_NEXT" })}
              disabled={!guess.correct}
              className="w-full rounded-xl py-3.5 font-medium bg-white text-neutral-900 active:bg-neutral-200 disabled:opacity-40 transition-colors"
            >
              Continua
            </button>
          </div>
        )}

        <div className="mt-auto" />
      </div>

      {/* Conferma uscita */}
      {confirmExit && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 max-w-xs w-full text-center space-y-4">
            <p className="text-neutral-100 font-medium">Uscire dalla partita?</p>
            <p className="text-xs text-neutral-500">La catena attuale andrà persa.</p>
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
