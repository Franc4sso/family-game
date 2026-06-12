import React from "react";
import { TeamSetup } from "./setup/TeamSetup";
import { ModeSelect } from "./setup/ModeSelect";
import { RuboSetup } from "./setup/RuboSetup";
import { RoundSetup } from "./setup/RoundSetup";
import { FaceOff } from "./setup/FaceOff";
import { PlayOrPass } from "./setup/PlayOrPass";
import { GameScreen } from "./game/GameScreen";
import { RuboScreen } from "./game/RuboScreen";
import { useGameState } from "@/hooks/useGameState";

export function App() {
  const { state, dispatch, undo, canUndo } = useGameState();

  // Setup squadre se non configurate
  if (!state.teamA.name || !state.teamB.name) {
    return <TeamSetup dispatch={dispatch} />;
  }

  // Scelta della modalità di gioco
  if (!state.mode) {
    return <ModeSelect teamA={state.teamA} teamB={state.teamB} dispatch={dispatch} />;
  }

  // ─── Modalità Rubo ───
  if (state.mode === "rubo") {
    if (!state.rubo) {
      return <RuboSetup teamA={state.teamA} teamB={state.teamB} dispatch={dispatch} />;
    }
    return (
      <RuboScreen gameState={state} dispatch={dispatch} onUndo={undo} canUndo={canUndo} />
    );
  }

  // ─── Modalità Family Feud ───
  // Setup round se nessun round attivo
  if (!state.currentRound) {
    return <RoundSetup teamA={state.teamA} teamB={state.teamB} dispatch={dispatch} />;
  }

  // Face-off iniziale
  if (state.currentRound.state === "faceoff") {
    return (
      <FaceOff
        teamA={state.teamA}
        teamB={state.teamB}
        currentRound={state.currentRound}
        dispatch={dispatch}
      />
    );
  }

  // Scelta Play or Pass
  if (state.currentRound.state === "choose") {
    return (
      <>
        <GameScreen
          gameState={state}
          dispatch={dispatch}
          onUndo={undo}
          canUndo={canUndo}
        />
        <PlayOrPass
          teamA={state.teamA}
          teamB={state.teamB}
          currentRound={state.currentRound}
          dispatch={dispatch}
        />
      </>
    );
  }

  // Game screen durante gioco
  return (
    <GameScreen
      gameState={state}
      dispatch={dispatch}
      onUndo={undo}
      canUndo={canUndo}
    />
  );
}
