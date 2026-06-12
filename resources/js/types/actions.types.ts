import type { Answer, GameMode, RuboOutcome } from "./game.types";
import type { RuboQuestion } from "@/data/ruboQuestions";

export type GameAction =
  | { type: "SET_GAME_MODE"; payload: { mode: GameMode } }
  | { type: "SET_TEAMS"; payload: { nameA: string; nameB: string } }
  | { type: "CLEAR_MODE" }
  | { type: "START_RUBO"; payload: { deck: RuboQuestion[] } }
  | { type: "RUBO_REVEAL_ANSWER" }
  | { type: "RUBO_ASSIGN_OUTCOME"; payload: { team: "A" | "B"; outcome: RuboOutcome } }
  | { type: "RUBO_NEXT_QUESTION" }
  | { type: "START_ROUND"; payload: { category: string; answers: Answer[] } }
  | { type: "FACEOFF_REVEAL"; payload: { teamA_answerIndex?: number | null; teamB_answerIndex?: number | null; teamA_custom?: string | null; teamB_custom?: string | null } }
  | { type: "FACEOFF_NO_MASTER"; payload: { teamA_answer: string; teamB_answer: string } }
  | { type: "CHOOSE_PLAY" }
  | { type: "CHOOSE_PASS" }
  | { type: "MARK_ANSWER_CORRECT"; payload: { answerIndex: number } }
  | { type: "MARK_ANSWER_WRONG"; payload: { answerIndex: number } }
  | { type: "REVEAL_ANSWER_MANUAL"; payload: { answerIndex: number } }
  | { type: "SUBMIT_ANSWER"; payload: { input: string } }
  | { type: "DECREMENT_LIFE" }
  | { type: "INCREMENT_LIFE" }
  | { type: "END_ROUND"; payload: { winningTeam: "A" | "B" } }
  | { type: "RESET_GAME" }
  | { type: "SWITCH_ACTIVE_TEAM" };
