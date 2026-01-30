import React from "react";
import { DrawerHeader } from "./DrawerHeader";
import { AnswerControlList } from "./AnswerControlList";
import { ManualControls } from "./ManualControls";
import { UndoButton } from "./UndoButton";
import { DrawerFooter } from "./DrawerFooter";
import type { GameState } from "@/types/game.types";
import type { GameAction } from "@/types";

interface ControlDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
  onUndo: () => void;
  canUndo: boolean;
}

export function ControlDrawer({
  isOpen,
  onClose,
  gameState,
  dispatch,
  onUndo,
  canUndo,
}: ControlDrawerProps) {
  const { currentRound } = gameState;

  if (!currentRound) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0 h-full bg-gradient-to-b from-gray-900 to-slate-900 border-l-4 border-amber-500/50 z-50
          transition-transform duration-300 ease-out overflow-y-auto shadow-2xl
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
        style={{ width: "min(90vw, 420px)" }}
      >
        <div className="p-4 space-y-4">
          <DrawerHeader onClose={onClose} />

          <AnswerControlList
            answers={currentRound.answers}
            dispatch={dispatch}
            onSwipeLeft={canUndo ? onUndo : undefined}
          />

          <ManualControls
            currentLives={currentRound.livesRemaining}
            dispatch={dispatch}
          />

          <UndoButton onUndo={onUndo} disabled={!canUndo} />

          <DrawerFooter
            dispatch={dispatch}
            onClose={onClose}
            activeTeam={currentRound.activeTeam}
          />
        </div>
      </div>
    </>
  );
}
