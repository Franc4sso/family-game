import React from "react";
import { MAX_LIVES } from "@/utils/constants";
import type { Answer, GameState } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";
import { IconEye, IconSliders, isGuessed } from "./parts";
import { FeudScreen, FeudX, RankOval, TEAM, useFirstShow, useGrowthFlash, type Side } from "../feud/parts";

interface BoardViewProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
  onOpenControls: () => void;
}

/** Tabellone visibile a tutti i giocatori. */
export function BoardView({ gameState, dispatch, onOpenControls }: BoardViewProps) {
  const { teamA, teamB, currentRound: round, roundHistory } = gameState;
  if (!round) return null;

  const roundKey = `${roundHistory.length}:${round.category}`;
  const isSteal = round.state === "steal";
  const revealing = isSteal && !!round.stealRevealed;
  // Durante il face-off/scelta la squadra attiva non è ancora decisa
  const activeTeam = round.state === "playing" || isSteal ? round.activeTeam : null;
  const strikes = MAX_LIVES - round.livesRemaining;

  if (isSteal) {
    return (
      <StealBoard
        gameState={gameState}
        roundKey={roundKey}
        revealing={revealing}
        dispatch={dispatch}
        onOpenControls={onOpenControls}
      />
    );
  }

  return (
    <FeudScreen>
      <div className="flex h-11 items-center justify-between">
        <div className="flex items-baseline gap-2.5">
          <span className="font-feud text-[26px] leading-none font-black text-feud-yellow uppercase">Family Feud</span>
          <span className="text-[13px] font-extrabold text-feud-muted">Round {roundHistory.length + 1}</span>
        </div>
        <button
          type="button"
          onClick={onOpenControls}
          aria-label="Apri il pannello del master"
          className="feud-press flex h-11 w-11 items-center justify-center rounded-full bg-feud-navy/60"
        >
          <IconSliders size={20} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <TeamScore side="A" name={teamA.name} score={teamA.score} active={activeTeam === "A"} />
        <TeamScore side="B" name={teamB.name} score={teamB.score} active={activeTeam === "B"} />
      </div>

      <section className="flex flex-col gap-1.5 pt-1">
        <h1 className="m-0 font-feud text-[38px] leading-[0.92] font-black text-balance uppercase">{round.category}</h1>
        <p className="m-0 text-[13px] font-semibold text-feud-muted">Le risposte più date da 100 persone</p>
      </section>

      <ol className="flex flex-col gap-1.5">
        {round.answers.map((answer, index) => (
          <Slat
            key={`${index}-${isGuessed(answer) ? "on" : "off"}`}
            answer={answer}
            seenKey={`${roundKey}:a${index}`}
          />
        ))}
      </ol>

      <Strikes strikes={strikes} seenKey={`${roundKey}:strikes`} />
    </FeudScreen>
  );
}

function TeamScore({ side, name, score, active }: { side: Side; name: string; score: number; active: boolean }) {
  const t = TEAM[side];
  if (active) {
    return (
      <div className={`flex h-[72px] items-end justify-between gap-2 rounded-2xl px-3.5 py-2.5 ${t.solid}`}>
        <span className="flex min-w-0 flex-col gap-0.5">
          <span className="text-[11px] font-extrabold tracking-[0.05em] uppercase">Tocca a voi</span>
          <span className="truncate text-[15px] font-extrabold">{name}</span>
        </span>
        <span className="font-feud text-[46px] leading-[0.9] font-black">{score}</span>
      </div>
    );
  }
  return (
    <div className="flex h-[72px] items-end justify-between gap-2 rounded-2xl border-2 border-white/25 px-3.5 py-2.5">
      <span className={`truncate text-[15px] font-extrabold ${t.outlineText}`}>{name}</span>
      <span className={`font-feud text-[46px] leading-[0.9] font-black ${t.outlineScore}`}>{score}</span>
    </div>
  );
}

/** Una riga del tabellone: coperta (blu notte) o indovinata (gialla, si gira la prima volta). */
function Slat({ answer, seenKey }: { answer: Answer; seenKey: string }) {
  const guessed = isGuessed(answer);
  const fresh = useFirstShow(seenKey, guessed ? 1 : 0);

  if (guessed) {
    return (
      <li className={`flex min-h-[42px] items-center gap-3 rounded-[10px] bg-feud-yellow py-1.5 pr-3.5 pl-1.5 text-feud-ink ${fresh ? "feud-flip" : ""}`}>
        <RankOval rank={answer.rank} className="bg-feud-ink text-feud-yellow" />
        <span className="font-feud text-[25px] leading-none font-extrabold uppercase">{answer.value}</span>
      </li>
    );
  }
  return (
    <li className="flex h-[42px] items-center rounded-[10px] bg-feud-navy pl-1.5" aria-label={`Risposta ${answer.rank}, coperta`}>
      <RankOval rank={answer.rank} className="bg-feud-yellow text-feud-ink" />
    </li>
  );
}

function Strikes({ strikes, seenKey }: { strikes: number; seenKey: string }) {
  const flash = useGrowthFlash(seenKey, strikes);
  return (
    <>
      <div className="mt-auto grid grid-cols-3 gap-2" aria-label={`Errori: ${strikes} su ${MAX_LIVES}`}>
        {Array.from({ length: MAX_LIVES }).map((_, i) => {
          const on = i < strikes;
          const isNew = flash && i === strikes - 1;
          return (
            <div
              key={i}
              className={`flex h-14 items-center justify-center rounded-[14px] border-2 ${
                on ? "border-feud-red bg-feud-red text-white" : "border-white/20 text-white/30"
              } ${isNew ? "feud-slam" : ""}`}
            >
              <FeudX />
            </div>
          );
        })}
      </div>
      {flash && (
        <div className="feud-stamp-scrim pointer-events-none fixed inset-0 z-40 flex items-center justify-center bg-feud-navy/55" aria-hidden>
          <span className="feud-stamp text-feud-red">
            <FeudX size={260} strokeWidth={3.6} />
          </span>
        </div>
      )}
    </>
  );
}

/** Il furto: tutto lo schermo diventa corallo. */
function StealBoard({
  gameState,
  roundKey,
  revealing,
  dispatch,
  onOpenControls,
}: {
  gameState: GameState;
  roundKey: string;
  revealing: boolean;
  dispatch: React.Dispatch<GameAction>;
  onOpenControls: () => void;
}) {
  const { teamA, teamB, currentRound: round, roundHistory } = gameState;
  if (!round) return null;

  const stealingName = round.activeTeam === "A" ? teamA.name : teamB.name;
  const defendingName = round.activeTeam === "A" ? teamB.name : teamA.name;
  const notGuessed = round.answers.filter((a) => !isGuessed(a)).length;
  const shownInSteal = round.answers.filter((a) => a.revealedInSteal).length;

  return (
    <FeudScreen tone="coral">
      <div className="flex h-11 items-center justify-between text-sm font-extrabold">
        <span>Round {roundHistory.length + 1}</span>
        <span className="truncate pl-3">
          {teamA.name} {teamA.score} · {teamB.name} {teamB.score}
        </span>
      </div>

      <section className="flex flex-col gap-3">
        {revealing ? (
          <>
            <h1 className="m-0 font-feud text-[64px] leading-[0.85] font-black uppercase">Vediamo le altre…</h1>
            <p className="m-0 text-[22px] leading-tight font-extrabold text-balance">L’avranno detta, {stealingName}?</p>
          </>
        ) : (
          <>
            <h1 className="m-0 font-feud text-[168px] leading-[0.78] font-black tracking-[-0.01em] uppercase">Ruba!</h1>
            <p className="m-0 text-[22px] leading-tight font-extrabold text-balance">
              {stealingName} ha una sola risposta per rubare il round.
            </p>
            <div className="flex items-center gap-2 text-sm font-bold">
              <span className="flex gap-1" aria-hidden>
                {Array.from({ length: MAX_LIVES }).map((_, i) => (
                  <span key={i} className="flex h-[22px] w-[22px] items-center justify-center rounded-md bg-feud-coral-ink text-feud-coral">
                    <FeudX size={12} strokeWidth={4} />
                  </span>
                ))}
              </span>
              {MAX_LIVES} errori per {defendingName}
            </div>
          </>
        )}
      </section>

      <section className="mt-auto flex flex-col gap-2">
        <span className="text-sm font-extrabold">{round.category}</span>
        <ol className="grid grid-flow-col grid-cols-2 grid-rows-4 gap-1.5">
          {round.answers.map((answer, index) => {
            if (isGuessed(answer) || answer.revealedInSteal) {
              return (
                <StealSlat key={`${index}-on`} answer={answer} seenKey={`${roundKey}:${answer.revealedInSteal ? "s" : "a"}${index}`} shown={!!answer.revealedInSteal} />
              );
            }
            if (revealing) {
              return (
                <li key={`${index}-off`}>
                  <button
                    type="button"
                    onClick={() => dispatch({ type: "STEAL_REVEAL_ANSWER", payload: { answerIndex: index } })}
                    aria-label={`Svela la risposta numero ${answer.rank}`}
                    className="feud-press flex h-9 w-full items-center gap-2.5 rounded-[9px] border-2 border-dashed border-feud-coral-ink pr-2 pl-1 text-left"
                  >
                    <RankOval rank={answer.rank} className="h-6 w-[30px] bg-feud-coral-ink text-base text-feud-coral" />
                    <span className="flex-1 text-xs font-extrabold">Svela</span>
                    <IconEye size={16} />
                  </button>
                </li>
              );
            }
            return (
              <li key={`${index}-off`} className="flex h-9 items-center rounded-[9px] bg-feud-coral-ink/15 pl-1">
                <RankOval rank={answer.rank} className="h-6 w-[30px] bg-feud-coral-ink/20 text-base" />
              </li>
            );
          })}
        </ol>
        {revealing && (
          <div className="mt-1 flex h-[52px] items-center justify-between rounded-2xl bg-feud-coral-ink pr-2 pl-4 text-white">
            <span className="text-[13px] font-bold">
              Svelate {shownInSteal} di {notGuessed}
            </span>
            <button
              type="button"
              onClick={onOpenControls}
              className="feud-press h-[38px] rounded-[11px] bg-feud-coral px-3.5 text-[13px] font-extrabold text-feud-coral-ink"
            >
              Vai al verdetto
            </button>
          </div>
        )}
        {!revealing && (
          <button
            type="button"
            onClick={onOpenControls}
            aria-label="Apri il pannello del master"
            className="feud-press mt-1 flex h-11 items-center justify-center gap-2 self-end rounded-full border-2 border-feud-coral-ink px-4 text-sm font-extrabold"
          >
            <IconSliders size={18} />
            Pannello
          </button>
        )}
      </section>
    </FeudScreen>
  );
}

function StealSlat({ answer, seenKey, shown }: { answer: Answer; seenKey: string; shown: boolean }) {
  const fresh = useFirstShow(seenKey, 1);
  return (
    <li
      className={`flex h-9 items-center gap-2.5 rounded-[9px] pr-2.5 pl-1 ${
        shown ? "border-2 border-feud-coral-ink bg-feud-coral-pale text-feud-coral-ink" : "bg-feud-coral-ink text-white"
      } ${fresh ? "feud-flip" : ""}`}
    >
      <RankOval
        rank={answer.rank}
        className={`h-6 w-[30px] text-base ${shown ? "bg-feud-coral-ink text-feud-coral-pale" : "bg-feud-coral text-feud-coral-ink"}`}
      />
      <span className="truncate font-feud text-xl leading-none font-extrabold uppercase">{answer.value}</span>
    </li>
  );
}
