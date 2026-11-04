import React, { useState } from "react";
import { RickSetup } from "./RickSetup";
import { RickPick } from "./RickPick";
import { RickWrite } from "./RickWrite";
import { RickVote } from "./RickVote";
import { RickGuess } from "./RickGuess";
import { RickReveal } from "./RickReveal";
import { RickTruth } from "./RickTruth";
import { RickEnd } from "./RickEnd";
import { Handoff } from "./RickParts";
import type { GameState } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";

interface RickScreenProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
  onUndo: () => void;
  canUndo: boolean;
}

export function RickScreen({ gameState, dispatch, onUndo, canUndo }: RickScreenProps) {
  // Rick vede le risposte vere: il giro si apre coperto finché il telefono non è in mano sua
  const [openedRound, setOpenedRound] = useState<number | null>(null);
  const state = gameState.rick;

  if (!state) return <RickSetup dispatch={dispatch} />;

  switch (state.phase) {
    case "pick": {
      if (openedRound !== state.round) {
        const rick = state.players[state.rick];
        return (
          <Handoff
            kicker={`Giro ${state.round + 1} di ${state.rounds} · Rick è`}
            name={rick.name}
            hint="Solo Rick guarda: sceglie il fatto e vede la risposta vera."
            confirmLabel={`Sono ${rick.name}, mostra i fatti`}
            onConfirm={() => setOpenedRound(state.round)}
          />
        );
      }
      return <RickPick state={state} dispatch={dispatch} />;
    }
    case "write":
      return <RickWrite key={`${state.round}-${state.writeIndex}`} state={state} dispatch={dispatch} />;
    case "vote":
      return <RickVote state={state} dispatch={dispatch} onUndo={onUndo} canUndo={canUndo} />;
    case "guess":
      return <RickGuess state={state} dispatch={dispatch} onUndo={onUndo} canUndo={canUndo} />;
    case "reveal":
      return <RickReveal state={state} dispatch={dispatch} />;
    case "truth":
      return <RickTruth state={state} dispatch={dispatch} />;
    case "end":
      return <RickEnd state={state} dispatch={dispatch} />;
  }
}
