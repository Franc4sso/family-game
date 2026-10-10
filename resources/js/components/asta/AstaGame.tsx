import React, { useState } from "react";
import { AstaSetup } from "./AstaSetup";
import { AstaBoard, lotLabel } from "./AstaBoard";
import { AstaBanco } from "./AstaBanco";
import { AstaFullPhoto } from "./AstaFullPhoto";
import { AstaFinal, AstaReveal, AstaSold } from "./AstaResults";
import type { GameState } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";

interface AstaGameProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
  onUndo: () => void;
  canUndo: boolean;
}

export function AstaGame({ gameState, dispatch, onUndo, canUndo }: AstaGameProps) {
  // Un solo telefono: il banditore alterna tabellone (per tutti) e banco
  const [view, setView] = useState<"board" | "banco">("board");
  const [fullPhoto, setFullPhoto] = useState(false);
  const state = gameState.asta;

  if (!state) return <AstaSetup dispatch={dispatch} />;

  if (state.phase === "sold") {
    return (
      <AstaSold
        state={state}
        dispatch={(action) => {
          // Dopo l'aggiudicazione tutti tornano a guardare il nuovo lotto
          setView("board");
          dispatch(action);
        }}
        onUndo={onUndo}
      />
    );
  }
  if (state.phase === "reveal") return <AstaReveal state={state} dispatch={dispatch} />;
  if (state.phase === "final") return <AstaFinal state={state} dispatch={dispatch} />;

  const lot = state.lots[state.current];

  return (
    <>
      {view === "banco" ? (
        <AstaBanco key={state.current} state={state} dispatch={dispatch} onUndo={onUndo} canUndo={canUndo} onShowBoard={() => setView("board")} />
      ) : (
        <AstaBoard state={state} onOpenBanco={() => setView("banco")} onExpandPhoto={() => setFullPhoto(true)} />
      )}
      {fullPhoto && lot && (
        <AstaFullPhoto src={lot.image} title={lot.name} lotLabel={lotLabel(state, state.current)} onClose={() => setFullPhoto(false)} />
      )}
    </>
  );
}
