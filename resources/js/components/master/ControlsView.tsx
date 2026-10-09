import React from "react";
import { MAX_LIVES } from "@/utils/constants";
import type { GameState } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";
import { ControlsTopBar, IconCheck, IconFlame, IconUndo, IconX, MasterScreen, RankBadge, SectionLabel, isGuessed } from "./parts";
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

  const topBar = <ControlsTopBar onShowBoard={onShowBoard} onResetGame={() => dispatch({ type: "RESET_GAME" })} />;

  if (round.state === "steal") {
    return (
      <MasterScreen>
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
      </MasterScreen>
    );
  }

  const activeName = round.activeTeam === "A" ? teamA.name : teamB.name;
  const guessedCount = round.answers.filter(isGuessed).length;

  return (
    <MasterScreen>
      {topBar}

      <div className="flex items-center gap-3 rounded-[18px] bg-ff-team-a p-3.5 ring-2 ring-ff-gold">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#A9C4FF]">Turno di</span>
          <span className="truncate text-lg font-extrabold">{activeName}</span>
          <span className="truncate text-xs font-semibold text-ff-muted">{round.category}</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-ff-muted">Vite</span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Togli una vita"
              disabled={round.livesRemaining === 0}
              onClick={() => dispatch({ type: "DECREMENT_LIFE" })}
              className="h-[30px] w-[30px] rounded-[9px] border border-ff-line bg-ff-bg text-base font-extrabold disabled:opacity-40"
            >
              −
            </button>
            {Array.from({ length: MAX_LIVES }).map((_, i) => (
              <span
                key={i}
                className={`h-3 w-3 rounded-full ${i < round.livesRemaining ? "bg-ff-gold" : "border-2 border-[#3A4A80]"}`}
              />
            ))}
            <button
              type="button"
              aria-label="Aggiungi una vita"
              disabled={round.livesRemaining >= MAX_LIVES}
              onClick={() => dispatch({ type: "INCREMENT_LIFE" })}
              className="h-[30px] w-[30px] rounded-[9px] border border-ff-line bg-ff-bg text-base font-extrabold disabled:opacity-40"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <SectionLabel left="Tocca la risposta detta" right={`${guessedCount} / ${round.answers.length} trovate`} />

      <ul className="flex flex-col gap-1.5">
        {round.answers.map((answer, index) => {
          if (answer.revealed) {
            return (
              <li key={index} className="flex min-h-[52px] items-center gap-2.5 rounded-[14px] border border-ff-green-line bg-ff-green-bg py-1.5 pl-2 pr-3.5">
                <RankBadge rank={answer.rank} className="bg-ff-green text-ff-green-ink" />
                <span className="flex-1 text-[15px] font-bold text-ff-green-text">{answer.value}</span>
                <span className="text-[#6FD9A3]"><IconCheck /></span>
              </li>
            );
          }
          if (answer.burned) {
            return (
              <li key={index} className="flex min-h-[52px] items-center gap-2.5 rounded-[14px] border border-[#6B3A22] bg-[#24160F] py-1.5 pl-2 pr-3.5">
                <RankBadge rank={answer.rank} className="bg-[#6B3A22] text-[#FFD9C9]" />
                <span className="flex-1 text-[15px] font-bold text-[#FFD9C9]">{answer.value}</span>
                <span className="text-xs font-extrabold text-[#FF9A6B]">Bruciata</span>
              </li>
            );
          }
          return (
            <li key={index} className="flex min-h-[52px] gap-1.5">
              <button
                type="button"
                onClick={() => dispatch({ type: "MARK_ANSWER_CORRECT", payload: { answerIndex: index } })}
                className="flex min-w-0 flex-1 items-center gap-2.5 rounded-[14px] border border-ff-line bg-ff-surface py-1.5 pl-2 pr-3 text-left active:scale-[0.98]"
              >
                <RankBadge rank={answer.rank} className="bg-ff-gold text-ff-gold-ink" />
                <span className="flex-1 text-[15px] font-bold">{answer.value}</span>
                <span className="text-xs font-extrabold text-ff-gold">Rivela</span>
              </button>
              <button
                type="button"
                aria-label={`Brucia la risposta ${answer.rank}: conta come errore`}
                onClick={() => dispatch({ type: "MARK_ANSWER_WRONG", payload: { answerIndex: index } })}
                className="flex w-[52px] shrink-0 items-center justify-center rounded-[14px] border border-ff-line bg-ff-surface text-[#FF9A6B] active:scale-95"
              >
                <IconFlame />
              </button>
            </li>
          );
        })}
      </ul>

      <div className="sticky bottom-0 mt-auto flex flex-col gap-2 bg-ff-bg pb-1 pt-2">
        <button
          type="button"
          disabled={round.state !== "playing" || round.livesRemaining === 0}
          onClick={() => dispatch({ type: "DECREMENT_LIFE" })}
          className="flex h-[58px] items-center justify-center gap-2.5 rounded-[18px] bg-ff-red text-[17px] font-extrabold text-white active:scale-[0.98] disabled:opacity-40"
        >
          <IconX />
          Risposta sbagliata
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
              if (confirm(`Terminare il round? Il punto va a ${activeName}.`)) {
                dispatch({ type: "END_ROUND", payload: { winningTeam: round.activeTeam } });
              }
            }}
            className="h-[46px] rounded-[14px] border border-ff-line bg-ff-surface text-sm font-bold active:scale-95"
          >
            Termina round
          </button>
        </div>
      </div>
    </MasterScreen>
  );
}
