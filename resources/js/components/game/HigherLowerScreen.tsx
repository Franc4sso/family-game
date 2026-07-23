import React, { useState } from "react";
import { formatValue } from "@/services/higherLowerService";
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

  const outOfPairs = hl.currentIndex >= hl.chain.length;
  const finished = hl.roundsPlayed >= hl.totalRounds || outOfPairs;

  // ───────────────────────── Schermata finale ─────────────────────────
  if (finished) {
    const tie = teamA.score === teamB.score;
    const winner: Team | null = tie ? null : teamA.score > teamB.score ? teamA : teamB;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-8 bg-neutral-950 text-neutral-100">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-3">
            Fine partita
          </p>
          <h2 className="text-2xl font-semibold">
            {winner ? `Vince ${winner.name}` : "Pareggio"}
          </h2>
          <p className="text-xs text-neutral-500 mt-3">
            Catena più lunga: {hl.bestStreak}
          </p>
        </div>

        <div className="w-full max-w-sm grid grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {([["A", teamA], ["B", teamB]] as const).map(([side, t]) => {
            const win = !tie && winner === t;
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
                  {t.score}
                </div>
              </div>
            );
          })}
        </div>

        {outOfPairs && hl.roundsPlayed < hl.totalRounds && (
          <p className="text-xs text-neutral-600 text-center max-w-xs">
            I confronti disponibili sono finiti prima dell'ultimo round.
          </p>
        )}

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
  const pair = hl.chain[hl.currentIndex];
  const active = hl.activeTeam === "A" ? teamA : teamB;
  const activeDot = hl.activeTeam === "A" ? "bg-blue-500" : "bg-red-500";
  const activeText = hl.activeTeam === "A" ? "text-blue-400" : "text-red-400";
  const guess = hl.lastGuess;
  const revealed = guess !== null;
  const roundOver = revealed && !guess.correct;

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100">
      {/* Header */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
          <button
            onClick={() => setConfirmExit(true)}
            className="active:text-neutral-300 transition-colors"
          >
            Esci
          </button>
          <span className="tabular-nums tracking-wide">
            Round {Math.min(hl.roundsPlayed + 1, hl.totalRounds)} / {hl.totalRounds}
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
          <div
            className="h-full bg-white/50 transition-all duration-300"
            style={{ width: `${(hl.roundsPlayed / hl.totalRounds) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex-1 flex flex-col px-4 pb-4 gap-3 max-w-md w-full mx-auto">
        {/* Punteggi */}
        <div className="flex items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-xs text-neutral-400 max-w-[5.5rem] truncate">
              {teamA.name}
            </span>
            <span className="text-lg font-semibold tabular-nums">{teamA.score}</span>
          </div>
          <span className="text-xs text-neutral-600">·</span>
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-semibold tabular-nums">{teamB.score}</span>
            <span className="text-xs text-neutral-400 max-w-[5.5rem] truncate">
              {teamB.name}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          </div>
        </div>

        {/* Catena corrente */}
        <div className="flex items-center justify-center gap-2 text-xs">
          <span className="text-neutral-500">Catena</span>
          <span className="font-semibold tabular-nums text-neutral-200">{hl.streak}</span>
          {hl.bestStreak > 0 && (
            <span className="text-neutral-600">· record {hl.bestStreak}</span>
          )}
        </div>

        {/* Turno */}
        <div className="flex items-center justify-center gap-1.5 mt-1">
          <span className={`w-1.5 h-1.5 rounded-full ${activeDot}`} />
          <span className={`text-sm font-medium ${activeText}`}>{active.name}</span>
          <span className="text-xs text-neutral-500">
            {revealed ? "" : "risponde"}
          </span>
        </div>

        {/* Riferimento */}
        <div className="bg-neutral-900/60 border border-white/10 rounded-2xl px-5 py-4 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-2">
            Riferimento
          </p>
          <p className="text-base font-medium leading-snug text-neutral-50 text-balance">
            {pair.left.label}
          </p>
          <p className="text-2xl font-semibold tabular-nums text-white mt-2">
            {formatValue(pair.left.value)}
          </p>
          <p className="text-[11px] text-neutral-500 mt-0.5">{pair.left.unit}</p>
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
            {pair.right.label}
          </p>

          {revealed ? (
            <>
              <p className="text-2xl font-semibold tabular-nums text-white mt-2">
                {formatValue(pair.right.value)}
              </p>
              <p className="text-[11px] text-neutral-500 mt-0.5">{pair.right.unit}</p>
              <p className="text-xs text-neutral-400 mt-3 leading-relaxed">
                {pair.right.note}
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
                ? "Giusto, si continua"
                : `Sbagliato · punto a ${
                    guess.team === "A" ? teamB.name : teamA.name
                  }`}
            </p>
            <button
              onClick={() =>
                dispatch({ type: roundOver ? "HL_NEXT_ROUND" : "HL_NEXT" })
              }
              className="w-full rounded-xl py-3.5 font-medium bg-white text-neutral-900 active:bg-neutral-200 transition-colors"
            >
              {roundOver
                ? hl.roundsPlayed + 1 >= hl.totalRounds
                  ? "Risultati finali"
                  : "Round successivo"
                : "Continua"}
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
