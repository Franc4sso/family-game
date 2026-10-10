import React, { useState } from "react";
import { MAX_LIVES } from "@/utils/constants";
import type { GameState } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";
import { IconCheck, IconEye, IconFlame, IconUndo, isGuessed } from "./parts";
import { FeudScreen, FeudX, RankOval } from "../feud/parts";
import { StealPanel } from "./StealPanel";

interface ControlsViewProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
  onUndo: () => void;
  canUndo: boolean;
  onShowBoard: () => void;
}

/** Vista riservata al master: rivela, brucia, gestisce vite e steal. */
export function ControlsView({ gameState, dispatch, onUndo, canUndo, onShowBoard }: ControlsViewProps) {
  const { teamA, teamB, currentRound: round } = gameState;
  if (!round) return null;

  const topBar = (
    <PanelTopBar
      onShowBoard={onShowBoard}
      onUndo={onUndo}
      canUndo={canUndo}
      onResetGame={() => dispatch({ type: "RESET_GAME" })}
    />
  );

  if (round.state === "steal") {
    return (
      <FeudScreen tone="deep">
        {topBar}
        <StealPanel
          round={round}
          teamA={teamA}
          teamB={teamB}
          dispatch={dispatch}
          onUndo={onUndo}
          canUndo={canUndo}
          onShowBoard={onShowBoard}
        />
      </FeudScreen>
    );
  }

  const activeName = round.activeTeam === "A" ? teamA.name : teamB.name;
  const activeColor = round.activeTeam === "A" ? "text-feud-yellow" : "text-feud-coral";
  const strikes = MAX_LIVES - round.livesRemaining;
  const guessedCount = round.answers.filter(isGuessed).length;

  return (
    <FeudScreen tone="deep">
      {topBar}

      <section className="flex flex-col gap-1 rounded-[18px] bg-feud-panel px-4 py-3.5">
        <span className="text-[13px] font-bold text-feud-muted-2">Solo tu vedi questa schermata · tocca a</span>
        <span className={`truncate font-feud text-4xl leading-[0.95] font-black uppercase ${activeColor}`}>{activeName}</span>
        <span className="text-sm font-semibold text-feud-muted">{round.category}</span>
      </section>

      <div className="flex items-center gap-3">
        <div className="flex flex-1 flex-col gap-1.5">
          <span className="text-[13px] font-bold text-feud-muted-2">
            Errori · {strikes} di {MAX_LIVES}
          </span>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: MAX_LIVES }).map((_, i) => (
              <span key={i} className={`h-2 w-[26px] rounded-full ${i < strikes ? "bg-feud-red" : "bg-feud-line"}`} />
            ))}
            <button
              type="button"
              aria-label="Togli un errore"
              disabled={round.livesRemaining >= MAX_LIVES}
              onClick={() => dispatch({ type: "INCREMENT_LIFE" })}
              className="feud-press ml-1 h-8 rounded-lg border-2 border-feud-line px-2 text-xs font-extrabold text-feud-muted disabled:opacity-30"
            >
              −1
            </button>
          </div>
        </div>
        <button
          type="button"
          disabled={round.state !== "playing" || round.livesRemaining === 0}
          onClick={() => dispatch({ type: "DECREMENT_LIFE" })}
          className="feud-press flex h-14 items-center gap-2 rounded-2xl bg-feud-red px-[22px] text-[17px] font-extrabold text-white disabled:opacity-40"
        >
          <FeudX size={20} strokeWidth={3.2} />
          Errore
        </button>
      </div>

      <div className="flex items-center justify-between text-[13px] font-bold text-feud-muted-2">
        <span>Tocca la risposta detta</span>
        <span>
          {guessedCount} / {round.answers.length} trovate
        </span>
      </div>

      <ol className="flex flex-col gap-1.5">
        {round.answers.map((answer, index) => {
          if (answer.revealed) {
            return (
              <li key={index} className="flex h-[50px] items-center gap-2.5 rounded-xl border-2 border-feud-line-soft pr-3 pl-1">
                <RankOval rank={answer.rank} className="bg-feud-line-soft text-feud-yellow" />
                <span className="min-w-0 flex-1 truncate text-base font-bold text-feud-muted-2">{answer.value}</span>
                <span className="flex items-center gap-1 text-xs font-extrabold text-feud-muted-2">
                  <IconCheck size={14} />
                  Sul tabellone
                </span>
              </li>
            );
          }
          if (answer.burned) {
            return (
              <li key={index} className="flex h-[50px] items-center gap-2.5 rounded-xl border-2 border-dashed border-feud-line-soft pr-3 pl-1">
                <RankOval rank={answer.rank} className="bg-feud-line-soft text-feud-burn" />
                <span className="min-w-0 flex-1 truncate text-base font-bold text-feud-muted-2 line-through">{answer.value}</span>
                <span className="text-xs font-extrabold text-feud-burn">Bruciata</span>
              </li>
            );
          }
          return (
            <li key={index} className="flex h-[50px] items-center gap-2 rounded-xl bg-feud-panel pr-[5px] pl-1">
              <RankOval rank={answer.rank} className="bg-feud-yellow text-feud-ink" />
              <span className="min-w-0 flex-1 truncate text-base font-bold">{answer.value}</span>
              <button
                type="button"
                onClick={() => dispatch({ type: "MARK_ANSWER_CORRECT", payload: { answerIndex: index } })}
                className="feud-press h-10 rounded-[10px] bg-feud-yellow px-3.5 text-sm font-extrabold text-feud-ink"
              >
                Rivela
              </button>
              <button
                type="button"
                aria-label={`Brucia la risposta ${answer.rank}: conta come errore`}
                onClick={() => dispatch({ type: "MARK_ANSWER_WRONG", payload: { answerIndex: index } })}
                className="feud-press flex h-10 w-10 items-center justify-center rounded-[10px] border-2 border-feud-line text-feud-burn"
              >
                <IconFlame />
              </button>
            </li>
          );
        })}
      </ol>

      <div className="sticky bottom-0 mt-auto bg-feud-deep pt-2 pb-1">
        <button
          type="button"
          onClick={() => {
            if (confirm(`Terminare il round? Il punto va a ${activeName}.`)) {
              dispatch({ type: "END_ROUND", payload: { winningTeam: round.activeTeam } });
            }
          }}
          className="feud-press h-[54px] w-full truncate rounded-2xl border-2 border-white px-4 text-base font-extrabold"
        >
          Assegna il round a {activeName}
        </button>
      </div>
    </FeudScreen>
  );
}

/** Barra del pannello: torna al tabellone, annulla, menu con il reset. */
function PanelTopBar({
  onShowBoard,
  onUndo,
  canUndo,
  onResetGame,
}: {
  onShowBoard: () => void;
  onUndo: () => void;
  canUndo: boolean;
  onResetGame: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative flex h-11 items-center gap-2">
      <button
        type="button"
        onClick={onShowBoard}
        className="feud-press flex h-11 items-center gap-2 rounded-full bg-white pr-4 pl-3 text-[15px] font-extrabold text-feud-ink"
      >
        <IconEye size={18} />
        Mostra il tabellone
      </button>
      <span className="flex-1" />
      <button
        type="button"
        aria-label="Annulla l’ultima azione"
        disabled={!canUndo}
        onClick={onUndo}
        className="feud-press flex h-11 w-11 items-center justify-center rounded-full border-2 border-feud-line disabled:opacity-30"
      >
        <IconUndo />
      </button>
      <button
        type="button"
        aria-label="Altre opzioni"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
        className="feud-press flex h-11 w-11 items-center justify-center rounded-full border-2 border-feud-line"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <circle cx="12" cy="5" r="1.8" />
          <circle cx="12" cy="12" r="1.8" />
          <circle cx="12" cy="19" r="1.8" />
        </svg>
      </button>
      {menuOpen && (
        <div className="absolute top-12 right-0 z-20 w-48 rounded-[14px] border-2 border-feud-line bg-feud-panel p-1.5 shadow-2xl">
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              if (confirm("Resettare completamente il gioco?")) onResetGame();
            }}
            className="h-11 w-full rounded-[10px] px-3 text-left text-sm font-bold text-feud-burn active:bg-feud-deep"
          >
            Reset gioco
          </button>
        </div>
      )}
    </div>
  );
}
