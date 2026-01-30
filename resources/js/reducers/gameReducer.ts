import type { GameState } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";
import { areAllAnswersRevealed, calculateRoundPoints } from "@/services/gameLogic";

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "SET_TEAMS":
      return {
        ...state,
        teamA: { name: action.payload.nameA, score: 0 },
        teamB: { name: action.payload.nameB, score: 0 },
      };

    case "START_ROUND":
      return {
        ...state,
        currentRound: {
          category: action.payload.category,
          answers: action.payload.answers,
          activeTeam: "A", // temporaneo, verrà deciso dal face-off
          livesRemaining: 3,
          state: "faceoff",
        },
      };

    case "FACEOFF_REVEAL": {
      if (!state.currentRound) return state;

      const {
        teamA_answerIndex = null,
        teamB_answerIndex = null,
        teamA_custom = null,
        teamB_custom = null,
      } = action.payload as {
        teamA_answerIndex?: number | null;
        teamB_answerIndex?: number | null;
        teamA_custom?: string | null;
        teamB_custom?: string | null;
      };

      let newAnswers = [...state.currentRound.answers];

      const pushCustom = (custom: string | null) => {
        if (custom == null) return null;
        const value = custom === "__NONE__" ? "Nessuna delle opzioni" : custom;
        newAnswers = [
          ...newAnswers,
          { value, rank: 9999, revealed: false, burned: false },
        ];
        return newAnswers.length - 1;
      };

      let idxA: number | null = typeof teamA_answerIndex === "number" ? teamA_answerIndex : null;
      let idxB: number | null = typeof teamB_answerIndex === "number" ? teamB_answerIndex : null;

      if (idxA === null && teamA_custom) {
        idxA = pushCustom(teamA_custom);
      }
      if (idxB === null && teamB_custom) {
        idxB = pushCustom(teamB_custom);
      }

      // Rivela eventuali risposte selezionate
      if (idxA !== null) {
        newAnswers[idxA] = { ...newAnswers[idxA], revealed: true };
      }
      if (idxB !== null) {
        newAnswers[idxB] = { ...newAnswers[idxB], revealed: true };
      }

      // Determina il vincitore (se possibile)
      let winner: "A" | "B" | undefined;
      if (idxA !== null && idxB !== null) {
        const answerA = newAnswers[idxA];
        const answerB = newAnswers[idxB];
        if (answerA.rank === answerB.rank) winner = undefined;
        else winner = answerA.rank < answerB.rank ? "A" : "B";
      } else if (idxA !== null) {
        winner = "A";
      } else if (idxB !== null) {
        winner = "B";
      } else {
        winner = undefined;
      }

      return {
        ...state,
        currentRound: {
          ...state.currentRound,
          answers: newAnswers,
          faceOffWinner: winner,
          state: "choose",
        },
      };
    }

    case "CHOOSE_PLAY": {
      if (!state.currentRound || !state.currentRound.faceOffWinner) return state;

      return {
        ...state,
        currentRound: {
          ...state.currentRound,
          activeTeam: state.currentRound.faceOffWinner,
          state: "playing",
        },
      };
    }

    case "CHOOSE_PASS": {
      if (!state.currentRound || !state.currentRound.faceOffWinner) return state;

      // Passa all'altra squadra
      const otherTeam = state.currentRound.faceOffWinner === "A" ? "B" : "A";

      return {
        ...state,
        currentRound: {
          ...state.currentRound,
          activeTeam: otherTeam,
          state: "playing",
          passedToOpponent: true, // Segna che il vincitore ha scelto di passare
        },
      };
    }

    case "MARK_ANSWER_CORRECT": {
      if (!state.currentRound) return state;

      const newAnswers = [...state.currentRound.answers];
      newAnswers[action.payload.answerIndex] = {
        ...newAnswers[action.payload.answerIndex],
        revealed: true,
      };

      // Se siamo in steal phase, la squadra attiva (che sta rubando) vince
      if (state.currentRound.state === "steal") {
        return {
          ...state,
          currentRound: {
            ...state.currentRound,
            answers: newAnswers,
            state: "ended",
          },
        };
      }

      // Auto-end se tutte rivelate
      if (areAllAnswersRevealed(newAnswers)) {
        return {
          ...state,
          currentRound: {
            ...state.currentRound,
            answers: newAnswers,
            state: "ended",
          },
        };
      }

      return {
        ...state,
        currentRound: {
          ...state.currentRound,
          answers: newAnswers,
        },
      };
    }

    case "MARK_ANSWER_WRONG": {
      if (!state.currentRound) return state;

      const newAnswers = [...state.currentRound.answers];
      newAnswers[action.payload.answerIndex] = {
        ...newAnswers[action.payload.answerIndex],
        burned: true,
      };

      // Se siamo in steal phase, la squadra avversaria (quella originale) vince
      if (state.currentRound.state === "steal") {
        const otherTeam = state.currentRound.activeTeam === "A" ? "B" : "A";

        return {
          ...state,
          currentRound: {
            ...state.currentRound,
            answers: newAnswers,
            state: "ended",
            activeTeam: otherTeam, // Impostiamo il vincitore come activeTeam
          },
        };
      }

      const newLives = state.currentRound.livesRemaining - 1;
      const newState = newLives === 0 ? "steal" : "playing";

      // Determina chi fa lo steal:
      // - Se passedToOpponent === true, il team che fa lo steal è il faceOffWinner
      // - Altrimenti, è l'avversario del team attivo
      let stealingTeam: "A" | "B";
      if (newLives === 0) {
        if (state.currentRound.passedToOpponent && state.currentRound.faceOffWinner) {
          // Il vincitore del face-off ha passato, quindi è lui che fa lo steal
          stealingTeam = state.currentRound.faceOffWinner;
        } else {
          // Caso normale: l'avversario fa lo steal
          stealingTeam = state.currentRound.activeTeam === "A" ? "B" : "A";
        }
      } else {
        stealingTeam = state.currentRound.activeTeam;
      }

      return {
        ...state,
        currentRound: {
          ...state.currentRound,
          answers: newAnswers,
          livesRemaining: newLives,
          state: newState,
          activeTeam: stealingTeam,
        },
      };
    }

    case "REVEAL_ANSWER_MANUAL": {
      if (!state.currentRound) return state;

      const newAnswers = [...state.currentRound.answers];
      newAnswers[action.payload.answerIndex] = {
        ...newAnswers[action.payload.answerIndex],
        revealed: true,
      };

      return {
        ...state,
        currentRound: {
          ...state.currentRound,
          answers: newAnswers,
        },
      };
    }

    case "DECREMENT_LIFE": {
      if (!state.currentRound || state.currentRound.livesRemaining === 0) return state;

      const newLives = state.currentRound.livesRemaining - 1;

      // Determina chi fa lo steal (stessa logica di MARK_ANSWER_WRONG)
      let stealingTeam: "A" | "B";
      if (newLives === 0) {
        if (state.currentRound.passedToOpponent && state.currentRound.faceOffWinner) {
          stealingTeam = state.currentRound.faceOffWinner;
        } else {
          stealingTeam = state.currentRound.activeTeam === "A" ? "B" : "A";
        }
      } else {
        stealingTeam = state.currentRound.activeTeam;
      }

      return {
        ...state,
        currentRound: {
          ...state.currentRound,
          livesRemaining: newLives,
          state: newLives === 0 ? "steal" : state.currentRound.state,
          activeTeam: stealingTeam,
        },
      };
    }

    case "INCREMENT_LIFE": {
      if (!state.currentRound || state.currentRound.livesRemaining >= 3) return state;

      return {
        ...state,
        currentRound: {
          ...state.currentRound,
          livesRemaining: state.currentRound.livesRemaining + 1,
        },
      };
    }

    case "SWITCH_ACTIVE_TEAM": {
      if (!state.currentRound) return state;

      return {
        ...state,
        currentRound: {
          ...state.currentRound,
          activeTeam: state.currentRound.activeTeam === "A" ? "B" : "A",
        },
      };
    }

    case "END_ROUND": {
      if (!state.currentRound) return state;

      const winningTeam = action.payload.winningTeam;

      return {
        ...state,
        [winningTeam === "A" ? "teamA" : "teamB"]: {
          ...state[winningTeam === "A" ? "teamA" : "teamB"],
          score: state[winningTeam === "A" ? "teamA" : "teamB"].score + 1,
        },
        currentRound: null,
        roundHistory: [...state.roundHistory, state.currentRound],
      };
    }

    case "RESET_GAME":
      return {
        teamA: { name: "", score: 0 },
        teamB: { name: "", score: 0 },
        currentRound: null,
        roundHistory: [],
      };

    default:
      return state;
  }
}
