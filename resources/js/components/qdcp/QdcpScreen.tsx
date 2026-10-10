import React, { useState } from "react";
import { QdcpSetup } from "./QdcpSetup";
import { QdcpBoard } from "./QdcpBoard";
import { QdcpControls } from "./QdcpControls";
import { QdcpSolution } from "./QdcpSolution";
import { QdcpEnd } from "./QdcpEnd";
import type { GameState } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";

interface QdcpScreenProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
  onUndo: () => void;
  canUndo: boolean;
}

export function QdcpScreen({ gameState, dispatch, onUndo, canUndo }: QdcpScreenProps) {
  // Un solo telefono: il master alterna il tabellone e i suoi controlli
  const [view, setView] = useState<"board" | "controls">("board");
  const state = gameState.qdcp;

  if (!state) return <QdcpSetup dispatch={dispatch} />;

  if (state.phase === "end") return <QdcpEnd state={state} dispatch={dispatch} />;

  if (state.phase === "solution") {
    return (
      <QdcpSolution
        state={state}
        dispatch={(action) => {
          // Ogni nuova carta si apre sul tabellone
          setView("board");
          dispatch(action);
        }}
        onUndo={onUndo}
        canUndo={canUndo}
      />
    );
  }

  return view === "controls" ? (
    <QdcpControls
      state={state}
      dispatch={dispatch}
      onUndo={onUndo}
      canUndo={canUndo}
      onShowBoard={() => setView("board")}
    />
  ) : (
    <QdcpBoard state={state} dispatch={dispatch} onOpenControls={() => setView("controls")} />
  );
}
