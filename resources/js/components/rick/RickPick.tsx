import React, { useState } from "react";
import { FactText, IconClose, IconShuffle, PlayerDot, PrimaryButton, RickConfirm, RickLogo, RickShell } from "./RickParts";
import { RICK_POINTS } from "@/services/rickService";
import type { RickState } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";

interface RickPickProps {
  state: RickState;
  dispatch: React.Dispatch<GameAction>;
}

/** Rick, da solo, sceglie il fatto del giro tra tre: vede anche le risposte vere. */
export function RickPick({ state, dispatch }: RickPickProps) {
  const [picked, setPicked] = useState(0);
  const [confirmExit, setConfirmExit] = useState(false);
  const rick = state.players[state.rick];
  const canReroll = state.deck.length > 0;

  return (
    <RickShell>
      <div className="flex h-11 items-center justify-between">
        <RickLogo />
        <span className="flex items-center gap-1">
          <span className="text-[13px] font-bold text-rick-muted">
            Giro {state.round + 1} di {state.rounds}
          </span>
          <button
            type="button"
            aria-label="Esci dalla partita"
            onClick={() => setConfirmExit(true)}
            className="rick-press flex h-11 w-11 items-center justify-center rounded-full text-rick-muted"
          >
            <IconClose />
          </button>
        </span>
      </div>

      <div className="flex items-center gap-2.5 rounded-[14px] bg-rick-panel px-3.5 py-3">
        <PlayerDot name={rick.name} color={rick.color} size={36} />
        <span className="flex min-w-0 flex-col">
          <span className="text-xs font-bold tracking-[0.08em] text-rick-muted uppercase">Rick di questo giro</span>
          <span className="text-[17px] leading-snug font-bold break-words">{rick.name}, scegli il pezzo da far valutare</span>
        </span>
      </div>

      <div className="flex flex-col gap-2.5" role="radiogroup" aria-label="Fatti tra cui scegliere">
        {state.options.map((fact, i) => {
          const on = i === picked;
          return (
            <button
              key={fact.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setPicked(i)}
              className={`rick-press flex w-full flex-col gap-2 rounded-[18px] border-4 bg-rick-cream px-4 py-3.5 text-left text-rick-plum transition-[opacity,transform] ${
                on ? "-rotate-1 border-rick-pink" : "border-transparent opacity-70"
              }`}
            >
              <FactText text={fact.text} className="text-base leading-snug" />
              <span className="flex flex-wrap items-baseline gap-x-1.5">
                <span className="text-[11px] font-extrabold tracking-[0.1em] text-rick-pink-deep uppercase">Vera:</span>
                <span className="font-rick text-lg leading-tight">{fact.answer}</span>
                {fact.spicy && <span className="ml-auto rounded bg-rick-plum px-1.5 text-[11px] font-extrabold text-rick-pink">+18</span>}
              </span>
            </button>
          );
        })}
      </div>

      {canReroll && (
        <button
          type="button"
          onClick={() => {
            setPicked(0);
            dispatch({ type: "RICK_REROLL" });
          }}
          className="rick-press flex h-11 items-center justify-center gap-2 self-center rounded-full px-4 text-[15px] font-extrabold text-rick-pink"
        >
          <IconShuffle />
          Altri tre fatti
        </button>
      )}

      <div className="flex gap-3 rounded-2xl bg-rick-panel p-3.5">
        <span className="shrink-0 self-start rounded-md bg-rick-lime px-1.5 py-1 text-[11px] font-extrabold text-rick-plum">
          +{RICK_POINTS.rickBalance}
        </span>
        <span className="text-sm leading-snug text-rick-pale">
          Se la verità la indovina <b className="text-rick-cream">qualcuno, ma non tutti</b>. Né troppo facile, né impossibile.
        </span>
      </div>

      <div className="mt-auto">
        <PrimaryButton onClick={() => dispatch({ type: "RICK_PICK", payload: { index: picked } })}>Scelgo questo</PrimaryButton>
      </div>

      {confirmExit && (
        <RickConfirm
          title="Esci dalla partita?"
          text="Punteggi e giri giocati si perdono."
          confirmLabel="Esci"
          onCancel={() => setConfirmExit(false)}
          onConfirm={() => dispatch({ type: "CLEAR_MODE" })}
        />
      )}
    </RickShell>
  );
}
