import React, { useState } from "react";
import { BoardView } from "../master/BoardView";
import { ControlsView } from "../master/ControlsView";
import { RoundEndView } from "../master/RoundEndView";
import type { GameState } from "@/types/game.types";
import type { GameAction } from "@/types";

interface GameScreenProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
  onUndo: () => void;
  canUndo: boolean;
}

export function GameScreen({ gameState, dispatch, onUndo, canUndo }: GameScreenProps) {
  // Un solo telefono: il master alterna il tabellone (per tutti) e i controlli
  const [view, setView] = useState<"board" | "controls">("board");
  const { currentRound } = gameState;

  if (!currentRound) return null;

  if (currentRound.state === "ended") {
    return <RoundEndView gameState={gameState} dispatch={dispatch} onUndo={onUndo} canUndo={canUndo} />;
  }

  if (view === "controls") {
    return (
      <ControlsView
        gameState={gameState}
        dispatch={dispatch}
        onUndo={onUndo}
        canUndo={canUndo}
        onShowBoard={() => setView("board")}
      />
    );
  }

  return <BoardView gameState={gameState} dispatch={dispatch} onOpenControls={() => setView("controls")} />;
}
