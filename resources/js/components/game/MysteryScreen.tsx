import React, { useState } from "react";
import { cluePoints, MYSTERY_MAX_CLUES } from "@/services/mysteryService";
import type { GameState, Team } from "@/types/game.types";
import type { GameAction } from "@/types";

interface MysteryScreenProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
  onUndo: () => void;
  canUndo: boolean;
}

export function MysteryScreen({ gameState, dispatch, onUndo, canUndo }: MysteryScreenProps) {
  const { teamA, teamB, mystery } = gameState;
  const [confirmExit, setConfirmExit] = useState(false);
  const [nameShown, setNameShown] = useState(false);

  if (!mystery) return null;

  const finished = mystery.currentIndex >= mystery.deck.length;

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
  const character = mystery.deck[mystery.currentIndex];
  const points = cluePoints(mystery.cluesRevealed);
  const allCluesRevealed = mystery.cluesRevealed >= MYSTERY_MAX_CLUES;
  const isLast = mystery.currentIndex + 1 >= mystery.deck.length;
  const progress = (mystery.currentIndex / mystery.deck.length) * 100;
  const visibleClues = character.clues.slice(0, mystery.cluesRevealed);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100">
      {/* Header */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-between text-xs text-neutral-500 mb-2">
          <button onClick={() => setConfirmExit(true)} className="active:text-neutral-300 transition-colors">
            Esci
          </button>
          <span className="tabular-nums tracking-wide">
            {mystery.currentIndex + 1} / {mystery.deck.length}
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
          <div className="h-full bg-indigo-400/60 transition-all duration-300" style={{ width: `${progress}%` }} />
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

        {/* Personaggio nascosto (solo master) + categoria */}
        <div className="bg-neutral-900/60 border border-white/10 rounded-2xl px-4 py-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
              {character.category}
            </p>
            <p className={`text-base font-semibold truncate ${nameShown ? "text-neutral-50" : "text-neutral-700"}`}>
              {nameShown ? character.name : "• • • • • •"}
            </p>
          </div>
          <button
            onClick={() => setNameShown((v) => !v)}
            className="shrink-0 text-xs text-neutral-400 border border-white/15 rounded-lg px-3 py-2 active:text-neutral-200 hover:border-white/30 transition-all"
          >
            {nameShown ? "Nascondi" : "Mostra a me"}
          </button>
        </div>

        {/* Valore corrente */}
        <div className="flex items-center justify-center gap-2 text-center">
          <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Vale</span>
          <span className="text-2xl font-semibold tabular-nums text-indigo-300">{points}</span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
            {points === 1 ? "punto" : "punti"}
          </span>
        </div>

        {/* Indizi a cascata */}
        <div className="space-y-2">
          {visibleClues.map((clue, i) => (
            <div
              key={i}
              className="bg-neutral-900/70 border border-white/10 rounded-xl px-3.5 py-2.5 flex gap-2.5"
            >
              <span className="shrink-0 text-xs font-semibold text-indigo-300/80 tabular-nums w-4 text-center pt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-neutral-200 leading-relaxed">{clue}</p>
            </div>
          ))}
        </div>

        {/* Rivela prossimo indizio */}
        <button
          onClick={() => dispatch({ type: "MYSTERY_REVEAL_CLUE" })}
          disabled={allCluesRevealed}
          className="border border-dashed border-white/15 rounded-xl py-3 text-sm text-neutral-300 active:text-neutral-100 hover:border-white/30 disabled:opacity-30 disabled:border-white/10 transition-all"
        >
          {allCluesRevealed ? "Tutti gli indizi rivelati" : "Rivela prossimo indizio"}
        </button>

        {/* Assegnazione + prossimo */}
        <div className="mt-auto pt-1 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {([["A", teamA, "bg-blue-500"], ["B", teamB, "bg-red-500"]] as const).map(
              ([side, t, dot]) => {
                const isSel = mystery.solvedBy === side;
                return (
                  <button
                    key={side}
                    onClick={() => dispatch({ type: "MYSTERY_SOLVED", payload: { team: side } })}
                    className={`rounded-xl py-3 px-2 border text-sm font-medium transition-all active:scale-[0.97] ${
                      isSel
                        ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-200"
                        : "border-white/10 bg-neutral-900/70 text-neutral-300"
                    }`}
                  >
                    <span className="flex items-center justify-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                      <span className="truncate">{t.name}</span>
                    </span>
                    <span className="block text-[11px] text-neutral-500 mt-0.5">
                      {isSel ? `+${points} assegnati` : "Indovinato"}
                    </span>
                  </button>
                );
              }
            )}
          </div>

          <button
            onClick={() => dispatch({ type: "MYSTERY_NEXT" })}
            className={`w-full rounded-xl py-3.5 font-medium transition-colors ${
              mystery.solvedBy
                ? "bg-white text-neutral-900 active:bg-neutral-200"
                : "bg-white/10 text-neutral-300 active:bg-white/15"
            }`}
          >
            {mystery.solvedBy
              ? isLast
                ? "Risultati finali"
                : "Prossimo personaggio"
              : isLast
                ? "Nessuno → risultati finali"
                : "Nessuno → prossimo"}
          </button>
        </div>
      </div>

      {/* Conferma uscita */}
      {confirmExit && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 max-w-xs w-full text-center space-y-4">
            <p className="text-neutral-100 font-medium">Uscire dal gioco?</p>
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
