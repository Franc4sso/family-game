import React, { useState } from "react";
import { IconUndo, Kicker, PrimaryButton, RickShell } from "./RickParts";
import { RICK_POINTS, rickFakeIndexes, rickWriters } from "@/services/rickService";
import type { RickState } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";

interface RickGuessProps {
  state: RickState;
  dispatch: React.Dispatch<GameAction>;
  onUndo: () => void;
  canUndo: boolean;
}

/** Prima della rivelazione Rick sceglie una risposta falsa e dice chi l'ha scritta. */
export function RickGuess({ state, dispatch, onUndo, canUndo }: RickGuessProps) {
  const [answer, setAnswer] = useState<number | null>(null);
  const [player, setPlayer] = useState<number | null>(null);
  const rick = state.players[state.rick];
  const fakes = rickFakeIndexes(state);
  const writers = rickWriters(state);

  const chip = (on: boolean) =>
    `rick-press min-h-[52px] rounded-[14px] px-3 py-2 text-[17px] leading-tight font-bold break-words transition-colors [overflow-wrap:anywhere] ${
      on ? "bg-rick-pink text-rick-plum" : "border-2 border-rick-line bg-rick-panel text-rick-cream"
    }`;

  return (
    <RickShell>
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1">
          <Kicker className="text-rick-muted">Tocca a Rick · {rick.name}</Kicker>
          <h1 className="m-0 font-rick text-[30px] leading-tight font-normal text-rick-pink">Chi l'ha scritta?</h1>
          <span className="text-sm text-rick-muted">Scegli una risposta falsa e dì chi l'ha inventata. Ad alta voce.</span>
        </div>
        <button
          type="button"
          aria-label="Torna al voto"
          onClick={onUndo}
          disabled={!canUndo}
          className="rick-press flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[1.5px] border-rick-line text-rick-muted disabled:opacity-30"
        >
          <IconUndo />
        </button>
      </div>

      <Kicker className="text-rick-pink-soft">1 · La risposta</Kicker>
      <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Risposta falsa">
        {fakes.map((i) => (
          <button key={i} type="button" role="radio" aria-checked={answer === i} onClick={() => setAnswer(i)} className={chip(answer === i)}>
            {state.answers[i].text}
          </button>
        ))}
      </div>

      <Kicker className="text-rick-pink-soft">2 · Secondo te è di…</Kicker>
      <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Autore">
        {writers.map((p) => (
          <button key={p} type="button" role="radio" aria-checked={player === p} onClick={() => setPlayer(p)} className={chip(player === p)}>
            {state.players[p].name}
          </button>
        ))}
      </div>

      <div className="flex flex-1 items-center justify-center py-2">
        {answer !== null && player !== null && (
          <div className="rick-card -rotate-2 rounded-[20px] bg-rick-cream px-5 py-3.5 text-center text-lg font-bold text-rick-plum">
            "<span className="font-rick font-normal">{state.answers[answer].text}</span>" è di{" "}
            <span className="font-rick font-normal text-rick-pink-deep">{state.players[player].name}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        <span className="text-center text-sm text-rick-muted">
          +{RICK_POINTS.rickAuthor} a Rick se ci azzecca. Lo scopriamo nella rivelazione.
        </span>
        <PrimaryButton
          disabled={answer === null || player === null}
          onClick={() => answer !== null && player !== null && dispatch({ type: "RICK_GUESS", payload: { answer, player } })}
        >
          Conferma e scopri
        </PrimaryButton>
      </div>
    </RickShell>
  );
}
