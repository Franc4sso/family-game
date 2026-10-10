import React, { useEffect, useRef, useState } from "react";
import { RUBO_POINTS } from "@/services/ruboService";
import type { GameState, RuboOutcome, Team } from "@/types/game.types";
import type { GameAction } from "@/types";
import { IconClose, IconUndo, RuboRoundButton, RuboTable } from "../rubo/parts";

interface RuboScreenProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
  onUndo: () => void;
  canUndo: boolean;
}

/** Prima la risposta (Giusta, Errata), poi il furto (Rubata, Fallita). */
const OUTCOMES: { key: RuboOutcome; label: string }[] = [
  { key: "correct", label: "Giusta" },
  { key: "wrong", label: "Errata" },
  { key: "steal_success", label: "Rubata" },
  { key: "steal_fail", label: "Fallita" },
];

const DIFFICULTY: Record<string, string> = { facile: "Facile", media: "Media", difficile: "Difficile" };

function pointLabel(p: number): string {
  return p > 0 ? `+${p}` : p < 0 ? `−${-p}` : "0";
}

/** Il punteggio salta quando cambia (non al primo disegno). */
function Score({ value, className }: { value: number; className: string }) {
  const prev = useRef(value);
  const changed = prev.current !== value;
  useEffect(() => {
    prev.current = value;
  }, [value]);
  return (
    <span key={value} className={`font-rubo leading-none ${changed ? "rubo-bump" : ""} ${className}`}>
      {value}
    </span>
  );
}

export function RuboScreen({ gameState, dispatch, onUndo, canUndo }: RuboScreenProps) {
  const { teamA, teamB, rubo } = gameState;
  const [confirmExit, setConfirmExit] = useState(false);
  // La risposta girata vale solo per la domanda su cui la si è girata
  const [flippedAt, setFlippedAt] = useState<number | null>(null);

  if (!rubo) return null;

  if (rubo.currentIndex >= rubo.deck.length) {
    return (
      <RuboEnd
        teamA={teamA}
        teamB={teamB}
        played={rubo.deck.length}
        onRematch={() => dispatch({ type: "RUBO_REMATCH" })}
        onHome={() => dispatch({ type: "CLEAR_MODE" })}
      />
    );
  }

  const question = rubo.deck[rubo.currentIndex];
  const flipped = flippedAt === rubo.currentIndex;
  const bothAssigned = rubo.outcomeA !== null && rubo.outcomeB !== null;
  const isLast = rubo.currentIndex + 1 >= rubo.deck.length;

  const teams = [
    { side: "A" as const, team: teamA, selected: rubo.outcomeA, on: "bg-rubo-cream text-rubo-ink" },
    { side: "B" as const, team: teamB, selected: rubo.outcomeB, on: "bg-rubo-ink text-rubo-cream" },
  ];

  return (
    <RuboTable>
      <header className="flex h-11 items-center justify-between">
        <RuboRoundButton label="Esci dal Rubo" onClick={() => setConfirmExit(true)}>
          <IconClose />
        </RuboRoundButton>
        <span className="font-rubo text-[17px] uppercase">
          Domanda {rubo.currentIndex + 1} <span className="text-rubo-wine/70">/ {rubo.deck.length}</span>
        </span>
        <RuboRoundButton label="Annulla l’ultima mossa" onClick={onUndo} disabled={!canUndo}>
          <IconUndo />
        </RuboRoundButton>
      </header>

      <div className="grid grid-cols-2 gap-2.5">
        <div className="flex h-16 -rotate-[1.5deg] items-center justify-between gap-2 rounded-2xl bg-rubo-cream px-3.5">
          <span className="truncate text-sm font-extrabold">{teamA.name}</span>
          <Score value={teamA.score} className="text-[34px]" />
        </div>
        <div className="flex h-16 rotate-[1.5deg] items-center justify-between gap-2 rounded-2xl bg-rubo-ink px-3.5 text-rubo-cream">
          <span className="truncate text-sm font-extrabold">{teamB.name}</span>
          <Score value={teamB.score} className="text-[34px]" />
        </div>
      </div>

      <section
        key={question.id}
        className={`flex flex-col gap-3.5 rounded-[22px] border-[3px] border-rubo-ink bg-rubo-cream px-5 pt-[18px] pb-[22px] shadow-[0_6px_0_var(--color-rubo-ink)] ${
          rubo.currentIndex > 0 ? "rubo-deal" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="rounded-lg bg-rubo-red px-2.5 pt-[5px] pb-1 font-rubo text-[13px] text-rubo-cream uppercase">
            {question.category}
          </span>
          <span className="text-[13px] font-bold text-rubo-taupe">{DIFFICULTY[question.difficulty]}</span>
        </div>
        <p className="m-0 text-[25px] leading-[1.18] font-extrabold text-balance">{question.question}</p>
      </section>

      <button
        type="button"
        onClick={() => setFlippedAt(flipped ? null : rubo.currentIndex)}
        aria-label={flipped ? "Copri la risposta" : "Gira la risposta, solo per te"}
        aria-expanded={flipped}
        className="rubo-press rubo-flip h-[92px] text-left"
      >
        <div className="rubo-flip-inner" data-flipped={flipped}>
          <div className="rubo-face rubo-card-back flex items-center justify-center rounded-[20px]" aria-hidden={flipped}>
            <span className="rounded-xl bg-rubo-ink px-4 py-2 text-[15px] font-extrabold text-rubo-cream">
              Gira la risposta <span className="text-rubo-coral">· solo per te</span>
            </span>
          </div>
          <div
            className="rubo-face rubo-face-back flex flex-col justify-center gap-1 rounded-[20px] bg-rubo-ink px-[18px] py-3 text-rubo-cream"
            aria-hidden={!flipped}
          >
            <span className="font-rubo text-2xl leading-[1.05] text-rubo-gold uppercase">{question.answer}</span>
            <span className="line-clamp-2 text-[13px] leading-snug font-semibold text-rubo-sand">{question.explanation}</span>
          </div>
        </div>
      </button>

      <section className="flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-1.5 text-xs font-extrabold tracking-[0.06em] text-rubo-wine uppercase" aria-hidden>
          <span className="border-b-2 border-rubo-wine pb-[3px]">Risponde</span>
          <span className="border-b-2 border-rubo-wine pb-[3px]">Ruba</span>
        </div>
        {teams.map(({ side, team, selected, on }) => (
          <fieldset key={side} className="m-0 flex flex-col gap-[5px] border-0 p-0">
            <legend className="mb-[5px] p-0 text-sm font-extrabold">{team.name}</legend>
            <div className="grid grid-cols-4 gap-1.5">
              {OUTCOMES.map((o) => {
                const isSel = selected === o.key;
                return (
                  <button
                    key={o.key}
                    type="button"
                    aria-pressed={isSel}
                    onClick={() => dispatch({ type: "RUBO_ASSIGN_OUTCOME", payload: { team: side, outcome: o.key } })}
                    className={`rubo-press flex h-[58px] flex-col items-center justify-center gap-px rounded-[14px] border-[2.5px] border-rubo-ink transition-colors ${
                      isSel ? on : "text-rubo-ink"
                    }`}
                  >
                    <span className="font-rubo text-[22px] leading-none">{pointLabel(RUBO_POINTS[o.key])}</span>
                    <span className="text-xs font-extrabold">{o.label}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </section>

      <div className="mt-auto pt-1">
        <button
          type="button"
          onClick={() => dispatch({ type: "RUBO_NEXT_QUESTION" })}
          className={`rubo-press h-[58px] w-full rounded-[18px] text-[17px] font-extrabold transition-colors ${
            bothAssigned ? "bg-rubo-ink text-rubo-cream" : "bg-rubo-ink/[0.18] text-rubo-wine"
          }`}
        >
          {isLast ? "Risultati finali" : "Prossima domanda"}
        </button>
      </div>

      {confirmExit && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-rubo-ink/70 sm:items-center">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="rubo-exit"
            className="rubo-up flex w-full max-w-md flex-col gap-3 rounded-t-[26px] bg-rubo-ink px-5 pt-5 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] text-rubo-cream sm:rounded-[26px]"
          >
            <h2 id="rubo-exit" className="m-0 font-rubo text-[28px] leading-none font-normal uppercase">
              Lasci il tavolo?
            </h2>
            <p className="m-0 text-sm font-semibold text-rubo-sand">I punteggi di questa partita andranno persi.</p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => setConfirmExit(false)}
                className="rubo-press h-[52px] rounded-2xl border-[2.5px] border-rubo-line text-[15px] font-bold"
              >
                Resta
              </button>
              <button
                type="button"
                onClick={() => dispatch({ type: "CLEAR_MODE" })}
                className="rubo-press h-[52px] rounded-2xl bg-rubo-red text-[15px] font-extrabold text-rubo-ink"
              >
                Esci
              </button>
            </div>
          </div>
        </div>
      )}
    </RuboTable>
  );
}

function RuboEnd({
  teamA,
  teamB,
  played,
  onRematch,
  onHome,
}: {
  teamA: Team;
  teamB: Team;
  played: number;
  onRematch: () => void;
  onHome: () => void;
}) {
  const tie = teamA.score === teamB.score;
  const winner = tie ? null : teamA.score > teamB.score ? teamA : teamB;
  const loser = tie ? null : winner === teamA ? teamB : teamA;
  const gap = Math.abs(teamA.score - teamB.score);
  // Il Bowlby maiuscolo è largo: la parola più lunga deve stare in una riga
  const longestWord = Math.max(4, ...(winner?.name ?? "Pari!").split(/\s+/).map((w) => w.length));
  const titleSize = Math.min(64, Math.floor(340 / (longestWord * 0.9)));
  // La carta del vincitore sta davanti, rossa; senza vincitore le due carte restano pari
  const back = loser ?? teamA;
  const front = winner ?? teamB;

  return (
    <RuboTable tone="ink">
      <span className="flex h-11 items-center text-sm font-bold text-rubo-coral">Fine partita · {played} domande</span>

      <section className="flex flex-col gap-1">
        <span className="font-rubo text-[26px] text-rubo-red uppercase">{tie ? "Finisce" : "Vince"}</span>
        <h1 className="m-0 font-rubo leading-[0.95] font-normal uppercase" style={{ fontSize: titleSize }}>
          {winner ? winner.name : "Pari!"}
        </h1>
      </section>

      <div className="relative mt-4 h-[300px]" aria-hidden>
        <div className="absolute top-10 left-1.5 flex h-60 w-[44%] -rotate-[8deg] flex-col justify-between rounded-[20px] bg-rubo-cream p-[18px] text-rubo-ink">
          <span className="truncate text-base font-extrabold">{back.name}</span>
          <span className={`font-rubo text-[84px] leading-[0.85] ${tie ? "" : "text-rubo-ash"}`}>{back.score}</span>
        </div>
        <div className="absolute top-0 right-1.5 flex h-[252px] w-[47%] rotate-6 flex-col justify-between rounded-[20px] border-4 border-rubo-cream bg-rubo-red p-[18px] text-rubo-ink">
          <span className="truncate text-base font-extrabold">{front.name}</span>
          <span className="font-rubo text-[100px] leading-[0.85]">{front.score}</span>
        </div>
      </div>

      <p className="m-0 text-base font-semibold text-rubo-sand">
        {tie
          ? `${teamA.name} e ${teamB.name} a ${teamA.score} punti.`
          : `${winner!.name} ${winner!.score}, ${loser!.name} ${loser!.score}: ${gap} ${gap === 1 ? "punto" : "punti"} di distacco.`}
      </p>

      <div className="mt-auto flex flex-col gap-2">
        <button type="button" onClick={onRematch} className="rubo-press h-[58px] rounded-[18px] bg-rubo-red text-[17px] font-extrabold text-rubo-ink">
          Rivincita
        </button>
        <button
          type="button"
          onClick={onHome}
          className="rubo-press h-[50px] rounded-2xl border-[2.5px] border-rubo-line text-[15px] font-bold"
        >
          Torna ai giochi
        </button>
      </div>
    </RuboTable>
  );
}
