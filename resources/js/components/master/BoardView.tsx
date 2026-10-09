import React from "react";
import { MAX_LIVES } from "@/utils/constants";
import type { GameState } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";
import { IconEye, IconSliders, IconX, MasterScreen, RankBadge, isGuessed } from "./parts";

interface BoardViewProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
  onOpenControls: () => void;
}

/** Tabellone visibile a tutti i giocatori. */
export function BoardView({ gameState, dispatch, onOpenControls }: BoardViewProps) {
  const { teamA, teamB, currentRound: round, roundHistory } = gameState;
  if (!round) return null;

  const isSteal = round.state === "steal";
  const revealing = isSteal && !!round.stealRevealed;
  // Durante il face-off/scelta la squadra attiva non è ancora decisa
  const activeTeam = round.state === "playing" || isSteal ? round.activeTeam : null;
  const stealingName = round.activeTeam === "A" ? teamA.name : teamB.name;

  const notGuessed = round.answers.filter((a) => !isGuessed(a)).length;
  const shownInSteal = round.answers.filter((a) => a.revealedInSteal).length;

  return (
    <MasterScreen>
      <div className="flex h-11 items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="font-display text-[19px]">FAMILY FEUD</span>
          <span className="flex h-6 items-center rounded-full bg-ff-surface-2 px-2.5 text-xs font-extrabold text-[#C9CFEA]">
            Round {roundHistory.length + 1}
          </span>
        </div>
        <button
          type="button"
          onClick={onOpenControls}
          aria-label="Apri pannello master"
          className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-ff-line bg-ff-surface text-ff-gold active:scale-95"
        >
          <IconSliders />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <TeamScore side="A" name={teamA.name} score={teamA.score} active={activeTeam === "A"} isSteal={isSteal} />
        <TeamScore side="B" name={teamB.name} score={teamB.score} active={activeTeam === "B"} isSteal={isSteal} />
      </div>

      {isSteal ? (
        <>
          <div className="flex flex-col gap-1 rounded-[22px] bg-ff-orange px-[18px] py-4 text-ff-orange-ink">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-ff-orange-ink-soft">
              Steal · {stealingName}
            </span>
            {revealing ? (
              <>
                <span className="font-display text-[22px] leading-tight">Vediamo le risposte rimaste…</span>
                <span className="text-sm font-bold">Avranno indovinato?</span>
              </>
            ) : (
              <>
                <span className="font-display text-[30px] leading-none">STEAL!</span>
                <span className="text-sm font-bold">Hanno una sola risposta per rubare il round.</span>
              </>
            )}
          </div>
          <span className="text-xs font-extrabold uppercase tracking-[0.1em] text-ff-gold">{round.category}</span>
        </>
      ) : (
        <div className="flex flex-col gap-1.5 rounded-[22px] bg-ff-gold px-[18px] pb-[18px] pt-4 text-ff-gold-ink">
          <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-ff-gold-ink-soft">
            Abbiamo chiesto a 100 persone
          </span>
          <h1 className="font-display text-[23px] uppercase leading-[1.12]">{round.category}</h1>
        </div>
      )}

      <ol className="flex flex-col gap-1.5">
        {round.answers.map((answer, index) => {
          if (isGuessed(answer)) {
            return (
              <li key={index} className="flex min-h-[50px] items-center gap-3 rounded-[14px] bg-ff-text py-1.5 pl-[7px] pr-3.5 text-ff-bg">
                <RankBadge rank={answer.rank} className="bg-ff-bg text-ff-gold" />
                <span className="text-base font-extrabold leading-tight animate-fade-in">{answer.value}</span>
              </li>
            );
          }
          if (answer.revealedInSteal) {
            return (
              <li key={index} className="flex min-h-[50px] items-center gap-3 rounded-[14px] border border-ff-gold bg-ff-shown py-1.5 pl-1.5 pr-3.5">
                <RankBadge rank={answer.rank} className="bg-[#252C4F] text-ff-gold" />
                <span className="flex-1 text-base font-extrabold leading-tight animate-fade-in">{answer.value}</span>
                <span className="text-[11px] font-extrabold tracking-[0.08em] text-ff-gold-soft">SVELATA</span>
              </li>
            );
          }
          if (revealing) {
            return (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => dispatch({ type: "STEAL_REVEAL_ANSWER", payload: { answerIndex: index } })}
                  aria-label={`Svela la risposta numero ${answer.rank}`}
                  className="flex min-h-[50px] w-full items-center gap-3 rounded-[14px] border-2 border-dashed border-ff-gold bg-ff-surface pl-[5px] pr-3.5 text-left active:scale-[0.98]"
                >
                  <RankBadge rank={answer.rank} className="bg-ff-gold text-ff-gold-ink" />
                  <span className="flex-1 text-sm font-bold text-ff-gold-soft">Tocca per svelare</span>
                  <span className="text-ff-gold"><IconEye /></span>
                </button>
              </li>
            );
          }
          return (
            <li key={index} className="flex h-[50px] items-center gap-3 rounded-[14px] border border-ff-line-soft bg-ff-surface pl-1.5 pr-3.5">
              <RankBadge rank={answer.rank} className="bg-ff-surface-2 text-ff-muted" />
              <span className="h-1.5 flex-1 rounded-full bg-[#1B2249]" />
            </li>
          );
        })}
      </ol>

      <div className="mt-auto">
        {revealing ? (
          <div className="flex h-[52px] items-center justify-between rounded-2xl border border-ff-line-soft bg-ff-surface pl-4 pr-2">
            <span className="text-[13px] font-bold text-[#C9CFEA]">
              Svelate {shownInSteal} di {notGuessed}
            </span>
            <button
              type="button"
              onClick={onOpenControls}
              className="h-[38px] rounded-[11px] bg-ff-gold px-3.5 text-[13px] font-extrabold text-ff-gold-ink active:scale-95"
            >
              Vai al verdetto
            </button>
          </div>
        ) : (
          <Strikes strikes={MAX_LIVES - round.livesRemaining} />
        )}
      </div>
    </MasterScreen>
  );
}

function TeamScore({
  side,
  name,
  score,
  active,
  isSteal,
}: {
  side: "A" | "B";
  name: string;
  score: number;
  active: boolean;
  isSteal: boolean;
}) {
  const base = side === "A" ? "bg-ff-team-a" : "bg-ff-team-b";
  const nameColor = side === "A" ? "text-ff-team-a-text" : "text-ff-team-b-text";
  const ring = active ? "ring-2 ring-ff-gold" : side === "A" ? "ring-1 ring-[#2A3D78]" : "ring-1 ring-[#4A2C22]";

  return (
    <div className={`flex h-[84px] flex-col justify-between rounded-[18px] px-3.5 py-3 ${base} ${ring}`}>
      <div className="flex items-center justify-between gap-2">
        <span className={`truncate text-[15px] font-extrabold ${nameColor}`}>{name}</span>
        {active && (
          <span className="flex h-5 shrink-0 items-center rounded-full bg-ff-gold px-2 text-[10px] font-extrabold tracking-[0.08em] text-ff-gold-ink">
            {isSteal ? "STEAL" : "IN GIOCO"}
          </span>
        )}
      </div>
      <span className="font-display text-[34px] leading-none">{score}</span>
    </div>
  );
}

function Strikes({ strikes }: { strikes: number }) {
  return (
    <div className="grid grid-cols-3 gap-2" aria-label={`Errori: ${strikes} su ${MAX_LIVES}`}>
      {Array.from({ length: MAX_LIVES }).map((_, i) =>
        i < strikes ? (
          <div key={i} className="flex h-[52px] items-center justify-center rounded-[14px] bg-ff-red text-white">
            <IconX size={26} strokeWidth={3.2} />
          </div>
        ) : (
          <div key={i} className="flex h-[52px] items-center justify-center rounded-[14px] border-2 border-ff-line text-ff-line">
            <IconX size={26} strokeWidth={3.2} />
          </div>
        )
      )}
    </div>
  );
}
