import React from "react";
import { MainView } from "../main/MainView";
import { ControlDrawer } from "../drawer/ControlDrawer";
import { HamburgerButton } from "../shared/HamburgerButton";
import { useDrawer } from "@/hooks/useDrawer";
import type { GameState } from "@/types/game.types";
import type { GameAction } from "@/types";

interface GameScreenProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
  onUndo: () => void;
  canUndo: boolean;
}

export function GameScreen({ gameState, dispatch, onUndo, canUndo }: GameScreenProps) {
  const { isOpen, open, close } = useDrawer();

  const handleRoundEnd = () => {
    // Dopo modale vittoria, il currentRound diventa null → torna a RoundSetup
    close();
  };

  return (
    <div className="relative">
      <MainView gameState={gameState} dispatch={dispatch} onRoundEnd={handleRoundEnd} />

      <HamburgerButton onClick={open} />

      <ControlDrawer
        isOpen={isOpen}
        onClose={close}
        gameState={gameState}
        dispatch={dispatch}
        onUndo={onUndo}
        canUndo={canUndo}
      />
    </div>
  );
}
