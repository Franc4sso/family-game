import React from "react";
import { HomeScreen } from "./HomeScreen";
import { TeamSetup } from "./setup/TeamSetup";
import { FeudTeamSetup } from "./setup/FeudTeamSetup";
import { RoundSetup } from "./setup/RoundSetup";
import { FaceOff } from "./setup/FaceOff";
import { FaceOffNoMaster } from "./setup/FaceOffNoMaster";
import { PlayOrPass } from "./setup/PlayOrPass";
import { GameScreen } from "./game/GameScreen";
import { NoMasterGameScreen } from "./game/NoMasterGameScreen";
import { RuboSetup } from "./setup/RuboSetup";
import { RuboScreen } from "./game/RuboScreen";
import { MysterySetup } from "./setup/MysterySetup";
import { MysteryScreen } from "./game/MysteryScreen";
import { HigherLowerSetup } from "./setup/HigherLowerSetup";
import { HigherLowerScreen } from "./game/HigherLowerScreen";
import { GuessNumberScreen } from "./game/GuessNumberScreen";
import { Top100Screen } from "./top100/Top100Screen";
import { AstaGame } from "./asta/AstaGame";
import { QdcpScreen } from "./qdcp/QdcpScreen";
import { FrancottinaScreen } from "./game/FrancottinaScreen";
import { useGameState } from "@/hooks/useGameState";

export function App() {
  const { state, dispatch, undo, canUndo } = useGameState();

  // Selezione modalità di gioco
  if (!state.gameMode) {
    return <HomeScreen dispatch={dispatch} />;
  }

  // ========== MODALITÀ INDOVINA IL NUMERO ==========
  // Nessuna squadra/punteggio: lista domande diretta.
  if (state.gameMode === "guess-number") {
    return <GuessNumberScreen dispatch={dispatch} />;
  }

  // TOP 100, Asta Folle e QDCP hanno squadre proprie (da 2 a 6), quindi saltano il setup a due squadre
  if (state.gameMode === "top100") {
    return <Top100Screen gameState={state} dispatch={dispatch} onUndo={undo} canUndo={canUndo} />;
  }
  if (state.gameMode === "asta") {
    return <AstaGame gameState={state} dispatch={dispatch} onUndo={undo} canUndo={canUndo} />;
  }
  if (state.gameMode === "qdcp") {
    return <QdcpScreen gameState={state} dispatch={dispatch} onUndo={undo} canUndo={canUndo} />;
  }
  // Francottina: da 2 a 6 squadre, gestisce squadre e punteggi per conto suo
  if (state.gameMode === "francottina") {
    return <FrancottinaScreen dispatch={dispatch} />;
  }

  // Personaggio Misterioso ha da 2 a 6 squadre: le nomina nella sua schermata iniziale
  if (state.gameMode === "mystery") {
    if (!state.mystery) {
      return <MysterySetup dispatch={dispatch} />;
    }
    return <MysteryScreen gameState={state} dispatch={dispatch} onUndo={undo} canUndo={canUndo} />;
  }

  // Rubo nomina i suoi due sfidanti nella sua schermata iniziale, insieme alla categoria
  if (state.gameMode === "rubo") {
    if (!state.rubo) {
      return <RuboSetup teamA={state.teamA} teamB={state.teamB} dispatch={dispatch} />;
    }
    return <RuboScreen gameState={state} dispatch={dispatch} onUndo={undo} canUndo={canUndo} />;
  }

  // Setup squadre se non configurate
  if (!state.teamA.name || !state.teamB.name) {
    const onBack = () => dispatch({ type: "CLEAR_MODE" });
    // Family Feud ha la sua schermata squadre; le altre sfide a due squadre usano quella comune
    if (state.gameMode === "master" || state.gameMode === "no-master") {
      return <FeudTeamSetup dispatch={dispatch} onBack={onBack} />;
    }
    return <TeamSetup dispatch={dispatch} onBack={onBack} />;
  }

  // ========== MODALITÀ PIÙ ALTO O PIÙ BASSO ==========
  if (state.gameMode === "higher-lower") {
    if (!state.higherLower) {
      return (
        <HigherLowerSetup teamA={state.teamA} teamB={state.teamB} dispatch={dispatch} />
      );
    }
    return (
      <HigherLowerScreen
        gameState={state}
        dispatch={dispatch}
        onUndo={undo}
        canUndo={canUndo}
      />
    );
  }

  // Setup round se nessun round attivo (Family Feud)
  if (!state.currentRound) {
    return (
      <RoundSetup
        teamA={state.teamA}
        teamB={state.teamB}
        dispatch={dispatch}
        playedCategories={state.roundHistory.map((r) => r.category)}
        onBack={undo}
        canGoBack={canUndo}
      />
    );
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
          onBack={undo}
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
