import type { GameState } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";
import { areAllAnswersRevealed, calculateRoundPoints } from "@/services/gameLogic";
import { matchAnswer, matchAnswerForFaceOff } from "@/services/matchingService";
import { RUBO_POINTS } from "@/services/ruboService";
import { cluePoints, MYSTERY_MAX_CLUES } from "@/services/mysteryService";
import { isGuessCorrect } from "@/services/higherLowerService";
import {
  TOP100_TEAM_COLORS,
  top100CurrentTeam,
  top100Points,
  top100TotalTurns,
} from "@/services/top100Service";
import {
  ASTA_MIN_BID,
  ASTA_START_CREDITS,
  ASTA_TEAM_COLORS,
  astaAuctionOver,
  astaCanPass,
  astaMaxBid,
} from "@/services/astaService";

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "SET_GAME_MODE":
      return {
        ...state,
        gameMode: action.payload.mode,
      };

    case "CLEAR_MODE":
      // Torna alla scelta modalità, azzerando partita e punteggi.
      return {
        ...state,
        gameMode: null,
        rubo: null,
        mystery: null,
        higherLower: null,
        top100: null,
        asta: null,
        teamA: { ...state.teamA, score: 0 },
        teamB: { ...state.teamB, score: 0 },
        currentRound: null,
        roundHistory: [],
      };

    case "START_RUBO":
      return {
        ...state,
        gameMode: "rubo",
        rubo: {
          deck: action.payload.deck,
          currentIndex: 0,
          answerRevealed: false,
          outcomeA: null,
          outcomeB: null,
        },
      };

    case "RUBO_REVEAL_ANSWER": {
      if (!state.rubo) return state;
      return { ...state, rubo: { ...state.rubo, answerRevealed: true } };
    }

    case "RUBO_ASSIGN_OUTCOME": {
      if (!state.rubo) return state;

      const { team, outcome } = action.payload;
      const previous = team === "A" ? state.rubo.outcomeA : state.rubo.outcomeB;

      // Se l'esito viene cambiato, prima annulliamo il punteggio precedente.
      const previousPoints = previous ? RUBO_POINTS[previous] : 0;
      const delta = RUBO_POINTS[outcome] - previousPoints;

      const teamKey = team === "A" ? "teamA" : "teamB";

      return {
        ...state,
        [teamKey]: {
          ...state[teamKey],
          score: state[teamKey].score + delta,
        },
        rubo: {
          ...state.rubo,
          outcomeA: team === "A" ? outcome : state.rubo.outcomeA,
          outcomeB: team === "B" ? outcome : state.rubo.outcomeB,
        },
      };
    }

    case "RUBO_NEXT_QUESTION": {
      if (!state.rubo) return state;
      return {
        ...state,
        rubo: {
          ...state.rubo,
          currentIndex: state.rubo.currentIndex + 1,
          answerRevealed: false,
          outcomeA: null,
          outcomeB: null,
        },
      };
    }

    // ─────────────────── MODALITÀ MYSTERY ───────────────────
    case "START_MYSTERY":
      return {
        ...state,
        gameMode: "mystery",
        mystery: {
          deck: action.payload.deck,
          currentIndex: 0,
          cluesRevealed: 1,
          solvedBy: null,
        },
      };

    case "MYSTERY_REVEAL_CLUE": {
      if (!state.mystery) return state;
      return {
        ...state,
        mystery: {
          ...state.mystery,
          cluesRevealed: Math.min(
            state.mystery.cluesRevealed + 1,
            MYSTERY_MAX_CLUES
          ),
        },
      };
    }

    case "MYSTERY_SOLVED": {
      if (!state.mystery) return state;

      const { team } = action.payload;
      const points = cluePoints(state.mystery.cluesRevealed);

      // Idempotente: se una squadra aveva già indovinato, prima togliamo i
      // suoi punti, poi assegniamo alla nuova squadra.
      const previous = state.mystery.solvedBy;
      if (previous === team) return state; // nessun cambiamento

      let teamA = state.teamA;
      let teamB = state.teamB;

      if (previous === "A") teamA = { ...teamA, score: teamA.score - points };
      if (previous === "B") teamB = { ...teamB, score: teamB.score - points };

      if (team === "A") teamA = { ...teamA, score: teamA.score + points };
      if (team === "B") teamB = { ...teamB, score: teamB.score + points };

      return {
        ...state,
        teamA,
        teamB,
        mystery: { ...state.mystery, solvedBy: team },
      };
    }

    case "MYSTERY_NEXT": {
      if (!state.mystery) return state;
      return {
        ...state,
        mystery: {
          ...state.mystery,
          currentIndex: state.mystery.currentIndex + 1,
          cluesRevealed: 1,
          solvedBy: null,
        },
      };
    }

    // ─────────────── MODALITÀ PIÙ ALTO O PIÙ BASSO ───────────────
    case "START_HL":
      return {
        ...state,
        gameMode: "higher-lower",
        higherLower: {
          chain: action.payload.chain,
          currentIndex: 0,
          activeTeam: "A",
          lastGuess: null,
          streak: 0,
          correctByTeam: { A: 0, B: 0 },
          loser: null,
          exhausted: false,
        },
      };

    case "HL_GUESS": {
      const hl = state.higherLower;
      // Una seconda risposta sullo stesso confronto viene ignorata: senza
      // questo controllo un doppio tap falserebbe il conteggio.
      if (!hl || hl.lastGuess !== null || hl.loser !== null) return state;
      if (hl.currentIndex + 1 >= hl.chain.length) return state;

      const reference = hl.chain[hl.currentIndex];
      const challenger = hl.chain[hl.currentIndex + 1];
      const correct = isGuessCorrect(reference, challenger, action.payload.guess);
      const team = hl.activeTeam;

      // Morte immediata: chi sbaglia perde la partita, l'altro vince.
      const winnerKey = team === "A" ? "teamB" : "teamA";

      return {
        ...state,
        ...(correct
          ? {}
          : { [winnerKey]: { ...state[winnerKey], score: state[winnerKey].score + 1 } }),
        higherLower: {
          ...hl,
          lastGuess: { team, correct },
          streak: correct ? hl.streak + 1 : hl.streak,
          correctByTeam: correct
            ? { ...hl.correctByTeam, [team]: hl.correctByTeam[team] + 1 }
            : hl.correctByTeam,
          loser: correct ? null : team,
        },
      };
    }

    case "HL_NEXT": {
      const hl = state.higherLower;
      if (!hl || !hl.lastGuess) return state;

      // Dopo un errore la partita è finita: non si scorre più.
      if (!hl.lastGuess.correct) return state;

      // L'elemento appena indovinato diventa il nuovo riferimento.
      const nextIndex = hl.currentIndex + 1;

      return {
        ...state,
        higherLower: {
          ...hl,
          currentIndex: nextIndex,
          activeTeam: hl.activeTeam === "A" ? "B" : "A",
          lastGuess: null,
          exhausted: nextIndex + 1 >= hl.chain.length,
        },
      };
    }

    // ─────────────────── MODALITÀ ASTA FOLLE ───────────────────
    case "ASTA_SETUP": {
      const { teamNames, bonuses, lots } = action.payload;
      return {
        ...state,
        gameMode: "asta",
        asta: {
          teams: teamNames.map((name, i) => ({
            name: name.trim(),
            color: ASTA_TEAM_COLORS[i % ASTA_TEAM_COLORS.length],
            credits: ASTA_START_CREDITS,
          })),
          bonuses,
          lots,
          current: 0,
          cluesShown: 0,
          sales: [],
          unsold: [],
          phase: "auction",
          revealIndex: 0,
        },
      };
    }

    case "ASTA_SHOW_CLUE": {
      const a = state.asta;
      if (!a || a.phase !== "auction") return state;
      const max = a.lots[a.current]?.clues.length ?? 0;
      return { ...state, asta: { ...a, cluesShown: Math.min(a.cluesShown + 1, max) } };
    }

    case "ASTA_SELL": {
      const a = state.asta;
      if (!a || a.phase !== "auction") return state;
      const { team, price } = action.payload;
      // Il prezzo deve rispettare base d'asta e tetto della squadra
      if (price < ASTA_MIN_BID || price > astaMaxBid(a, team)) return state;
      return {
        ...state,
        asta: {
          ...a,
          phase: "sold",
          teams: a.teams.map((t, i) => (i === team ? { ...t, credits: t.credits - price } : t)),
          sales: [...a.sales, { lot: a.current, team, price }],
        },
      };
    }

    case "ASTA_PASS": {
      const a = state.asta;
      if (!a || a.phase !== "auction" || !astaCanPass(a)) return state;
      const next = { ...a, unsold: [...a.unsold, a.current], current: a.current + 1, cluesShown: 0 };
      return { ...state, asta: astaAuctionOver(next) ? { ...next, phase: "reveal", revealIndex: 0 } : next };
    }

    case "ASTA_NEXT": {
      const a = state.asta;
      if (!a || a.phase !== "sold") return state;
      const next = { ...a, current: a.current + 1, cluesShown: 0, phase: "auction" as const };
      if (!astaAuctionOver(next)) return { ...state, asta: next };
      // I lotti mai battuti finiscono tra gli invenduti del catalogo finale
      const leftovers = a.lots.map((_, i) => i).filter((i) => i > a.current);
      return {
        ...state,
        asta: { ...next, unsold: [...a.unsold, ...leftovers], phase: "reveal", revealIndex: 0 },
      };
    }

    case "ASTA_REVEAL_NEXT": {
      const a = state.asta;
      if (!a || a.phase !== "reveal") return state;
      const last = a.revealIndex >= a.sales.length - 1;
      return { ...state, asta: last ? { ...a, phase: "final" } : { ...a, revealIndex: a.revealIndex + 1 } };
    }

    case "ASTA_RESET":
      // Nuova asta: si torna alla preparazione restando in questa modalità
      return { ...state, asta: null };

    // ─────────────────── MODALITÀ TOP 100 ───────────────────
    case "TOP100_SETUP": {
      const { teamNames, scoring, roundsPerCategory } = action.payload;
      return {
        ...state,
        gameMode: "top100",
        top100: {
          teams: teamNames.map((name, i) => ({
            name: name.trim(),
            color: TOP100_TEAM_COLORS[i % TOP100_TEAM_COLORS.length],
            score: 0,
          })),
          scoring,
          roundsPerCategory,
          phase: "choose",
          categoryId: null,
          startTeam: 0,
          answers: [],
          playedCategoryIds: [],
        },
      };
    }

    case "TOP100_START_CATEGORY": {
      const t = state.top100;
      if (!t || t.phase !== "choose") return state;
      return {
        ...state,
        top100: {
          ...t,
          phase: "playing",
          categoryId: action.payload.categoryId,
          // A ogni classifica apre una squadra diversa
          startTeam: t.playedCategoryIds.length % t.teams.length,
          answers: [],
        },
      };
    }

    case "TOP100_ANSWER": {
      const t = state.top100;
      if (!t || t.phase !== "playing") return state;

      const team = top100CurrentTeam(t);
      const { said, rank } = action.payload;
      // Una voce già detta in questa classifica non vale di nuovo
      if (rank !== null && t.answers.some((a) => a.rank === rank)) return state;

      const points = top100Points(rank, t.scoring);
      return {
        ...state,
        top100: {
          ...t,
          phase: "result",
          teams: t.teams.map((tm, i) => (i === team ? { ...tm, score: tm.score + points } : tm)),
          answers: [...t.answers, { team, said, rank, points }],
        },
      };
    }

    case "TOP100_SKIP": {
      const t = state.top100;
      if (!t || t.phase !== "playing") return state;
      const answers = [...t.answers, { team: top100CurrentTeam(t), said: "", rank: null, points: 0, skipped: true }];
      return {
        ...state,
        top100: { ...t, answers, phase: answers.length >= top100TotalTurns(t) ? "end" : "playing" },
      };
    }

    case "TOP100_NEXT": {
      const t = state.top100;
      if (!t || t.phase !== "result") return state;
      return {
        ...state,
        top100: { ...t, phase: t.answers.length >= top100TotalTurns(t) ? "end" : "playing" },
      };
    }

    case "TOP100_NEXT_CATEGORY": {
      const t = state.top100;
      if (!t || t.phase !== "end" || !t.categoryId) return state;
      return {
        ...state,
        top100: {
          ...t,
          phase: "choose",
          playedCategoryIds: [...t.playedCategoryIds, t.categoryId],
          categoryId: null,
          answers: [],
        },
      };
    }

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

    case "FACEOFF_NO_MASTER": {
      if (!state.currentRound) return state;

      const { teamA_answer, teamB_answer } = action.payload;

      // Trova le risposte corrispondenti per entrambi i team
      const matchA = matchAnswerForFaceOff(teamA_answer, state.currentRound.answers);
      const matchB = matchAnswerForFaceOff(teamB_answer, state.currentRound.answers);

      let newAnswers = [...state.currentRound.answers];

      // Rivela le risposte trovate
      if (matchA) {
        newAnswers[matchA.index] = { ...newAnswers[matchA.index], revealed: true };
      }
      if (matchB) {
        newAnswers[matchB.index] = { ...newAnswers[matchB.index], revealed: true };
      }

      // Determina il vincitore confrontando i rank
      let winner: "A" | "B" | undefined;
      if (matchA && matchB) {
        if (matchA.rank === matchB.rank) {
          winner = undefined; // Pareggio
        } else {
          winner = matchA.rank < matchB.rank ? "A" : "B";
        }
      } else if (matchA) {
        winner = "A"; // Solo A ha indovinato
      } else if (matchB) {
        winner = "B"; // Solo B ha indovinato
      } else {
        winner = undefined; // Nessuno ha indovinato
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
      // Anche dopo lo svelamento dello steal il master può indicare quale
      // risposta ha dato la squadra: smette di contare come mancata.
      newAnswers[action.payload.answerIndex] = {
        ...newAnswers[action.payload.answerIndex],
        revealed: true,
        revealedInSteal: false,
      };

      // Se siamo in steal phase, la squadra attiva (che sta rubando) vince
      if (state.currentRound.state === "steal") {
        return {
          ...state,
          currentRound: {
            ...state.currentRound,
            answers: newAnswers,
            state: "ended",
            stealOutcome: "success",
            stealAnswerIndex: action.payload.answerIndex,
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

    case "STEAL_START_REVEAL": {
      if (!state.currentRound || state.currentRound.state !== "steal") return state;

      // Da qui il master svela le risposte rimaste una alla volta dal
      // tabellone: il round resta in steal finché non decide l'esito.
      return {
        ...state,
        currentRound: { ...state.currentRound, stealRevealed: true },
      };
    }

    case "STEAL_REVEAL_ANSWER": {
      const round = state.currentRound;
      if (!round || round.state !== "steal" || !round.stealRevealed) return state;

      const target = round.answers[action.payload.answerIndex];
      if (!target || target.revealed) return state;

      const newAnswers = [...round.answers];
      newAnswers[action.payload.answerIndex] = { ...target, revealed: true, revealedInSteal: true };

      return {
        ...state,
        currentRound: { ...round, answers: newAnswers },
      };
    }

    case "STEAL_RESOLVE": {
      if (!state.currentRound || state.currentRound.state !== "steal") return state;

      const stealingTeam = state.currentRound.activeTeam;
      const winner = action.payload.success
        ? stealingTeam
        : stealingTeam === "A" ? "B" : "A";

      return {
        ...state,
        currentRound: {
          ...state.currentRound,
          state: "ended",
          activeTeam: winner,
          stealOutcome: action.payload.success ? "success" : "fail",
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
            stealOutcome: "fail",
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

    case "SUBMIT_ANSWER": {
      if (!state.currentRound) return state;

      const { input } = action.payload;
      const answerIndex = matchAnswer(input, state.currentRound.answers);

      // Risposta corretta trovata
      if (answerIndex !== null) {
        const newAnswers = [...state.currentRound.answers];
        newAnswers[answerIndex] = {
          ...newAnswers[answerIndex],
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

      // Risposta sbagliata
      // Se siamo in steal phase, la squadra avversaria vince
      if (state.currentRound.state === "steal") {
        const otherTeam = state.currentRound.activeTeam === "A" ? "B" : "A";

        return {
          ...state,
          currentRound: {
            ...state.currentRound,
            state: "ended",
            activeTeam: otherTeam, // Impostiamo il vincitore come activeTeam
          },
        };
      }

      // Decrementa vita in modalità playing
      const newLives = state.currentRound.livesRemaining - 1;
      const newState = newLives === 0 ? "steal" : "playing";

      // Determina chi fa lo steal
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
          state: newState,
          activeTeam: stealingTeam,
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
        gameMode: null,
        teamA: { name: "", score: 0 },
        teamB: { name: "", score: 0 },
        rubo: null,
        mystery: null,
        higherLower: null,
        top100: null,
        asta: null,
        currentRound: null,
        roundHistory: [],
      };

    default:
      return state;
  }
}
