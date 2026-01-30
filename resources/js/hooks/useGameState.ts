import { useReducer, useCallback, useState } from "react";
import { gameReducer } from "@/reducers/gameReducer";
import { initialGameState } from "@/types/game.types";
import type { GameState } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";
import { MAX_UNDO_HISTORY } from "@/utils/constants";

export function useGameState() {
  const [history, setHistory] = useState<GameState[]>([initialGameState]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentState = history[currentIndex];

  const dispatch = useCallback(
    (action: GameAction) => {
      const newState = gameReducer(currentState, action);
      const newHistory = history.slice(0, currentIndex + 1);
      newHistory.push(newState);

      if (newHistory.length > MAX_UNDO_HISTORY) {
        newHistory.shift();
      } else {
        setCurrentIndex(currentIndex + 1);
      }

      setHistory(newHistory);
    },
    [currentState, history, currentIndex]
  );

  const undo = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }, [currentIndex]);

  return {
    state: currentState,
    dispatch,
    undo,
    canUndo: currentIndex > 0,
  };
}
