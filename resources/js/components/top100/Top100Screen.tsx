import React, { useState } from "react";
import { Top100Setup } from "./Top100Setup";
import { Top100CategoryPicker } from "./Top100CategoryPicker";
import { Top100Board } from "./Top100Board";
import { Top100Controls } from "./Top100Controls";
import { Top100Result } from "./Top100Result";
import { Top100End } from "./Top100End";
import { getTop100Category } from "@/services/top100Service";
import type { GameState } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";

interface Top100ScreenProps {
  gameState: GameState;
  dispatch: React.Dispatch<GameAction>;
  onUndo: () => void;
  canUndo: boolean;
}

export function Top100Screen({ gameState, dispatch, onUndo, canUndo }: Top100ScreenProps) {
  // Un solo telefono: il master alterna il tabellone e i suoi controlli
  const [view, setView] = useState<"board" | "controls">("board");
  const state = gameState.top100;

  if (!state) return <Top100Setup dispatch={dispatch} />;

  if (state.phase === "choose") {
    return <Top100CategoryPicker state={state} dispatch={dispatch} onBack={onUndo} canGoBack={canUndo} />;
  }

  const category = getTop100Category(state.categoryId);
  if (!category) return null;

  if (state.phase === "result") {
    return (
      <Top100Result
        state={state}
        category={category}
        dispatch={(action) => {
          // Dopo il risultato tutti tornano a vedere il tabellone
          setView("board");
          dispatch(action);
        }}
        onUndo={onUndo}
        canUndo={canUndo}
      />
    );
  }

  if (state.phase === "end") return <Top100End state={state} category={category} dispatch={dispatch} />;

  return view === "controls" ? (
    <Top100Controls
      state={state}
      category={category}
      dispatch={dispatch}
      onUndo={onUndo}
      canUndo={canUndo}
      onShowBoard={() => setView("board")}
    />
  ) : (
    <Top100Board state={state} category={category} onOpenControls={() => setView("controls")} />
  );
}
