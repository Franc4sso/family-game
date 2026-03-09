import React from "react";
import { HomeScreen } from "./HomeScreen";
import { TeamSetup } from "./setup/TeamSetup";
import { RoundSetup } from "./setup/RoundSetup";
import { FaceOff } from "./setup/FaceOff";
import { FaceOffNoMaster } from "./setup/FaceOffNoMaster";
import { PlayOrPass } from "./setup/PlayOrPass";
import { GameScreen } from "./game/GameScreen";
import { NoMasterGameScreen } from "./game/NoMasterGameScreen";
import { useGameState } from "@/hooks/useGameState";

export function App() {
  const { state, dispatch, undo, canUndo } = useGameState();

  // Selezione modalità di gioco
  if (!state.gameMode) {
    return <HomeScreen dispatch={dispatch} />;
  }

  // Setup squadre se non configurate
  if (!state.teamA.name || !state.teamB.name) {
    return <TeamSetup dispatch={dispatch} />;
  }

  // Setup round se nessun round attivo
  if (!state.currentRound) {
    return <RoundSetup teamA={state.teamA} teamB={state.teamB} dispatch={dispatch} />;
  }

  // ========== MODALITÀ CON MASTER ==========
  if (state.gameMode === "master") {
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

    // Game screen durante gioco (con drawer master)
    return (
      <GameScreen
        gameState={state}
        dispatch={dispatch}
        onUndo={undo}
        canUndo={canUndo}
      />
    );
  }

  // ========== MODALITÀ SENZA MASTER ==========
  if (state.gameMode === "no-master") {
    // Face-off iniziale (con input testo)
    if (state.currentRound.state === "faceoff") {
      return (
        <FaceOffNoMaster
          teamA={state.teamA}
          teamB={state.teamB}
          currentRound={state.currentRound}
          dispatch={dispatch}
        />
      );
    }

    // Scelta Play or Pass (riutilizzato)
    if (state.currentRound.state === "choose") {
      return (
        <>
          <NoMasterGameScreen
            gameState={state}
            dispatch={dispatch}
            onRoundEnd={() => {}}
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

    // Game screen durante gioco (con input testo, senza drawer)
    return (
      <NoMasterGameScreen
        gameState={state}
        dispatch={dispatch}
        onRoundEnd={() => {}}
      />
    );
  }

  return null;
}
