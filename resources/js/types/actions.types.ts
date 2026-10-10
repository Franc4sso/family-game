import type { Answer, AstaLot, GameMode, RuboOutcome, Top100Scoring } from "./game.types";
import type { RuboQuestion } from "@/data/ruboQuestions";
import type { MysteryCharacter } from "@/data/charactersQuestions";
import type { HLItem } from "@/data/higherLowerItems";
import type { QdcpCard } from "@/data/qdcpCards";

export type GameAction =
  | { type: "SET_GAME_MODE"; payload: { mode: GameMode } }
  | { type: "SET_TEAMS"; payload: { nameA: string; nameB: string } }
  | { type: "CLEAR_MODE" }
  | { type: "START_RUBO"; payload: { deck: RuboQuestion[]; nameA: string; nameB: string } }
  | { type: "RUBO_REMATCH" }
  | { type: "RUBO_REVEAL_ANSWER" }
  | { type: "RUBO_ASSIGN_OUTCOME"; payload: { team: "A" | "B"; outcome: RuboOutcome } }
  | { type: "RUBO_NEXT_QUESTION" }
  | { type: "START_MYSTERY"; payload: { deck: MysteryCharacter[]; teamNames: string[] } }
  | { type: "MYSTERY_REVEAL_CLUE" }
  | { type: "MYSTERY_SOLVED"; payload: { team: number } }
  | { type: "MYSTERY_NEXT" }
  | { type: "START_HL"; payload: { chain: HLItem[] } }
  | { type: "HL_GUESS"; payload: { guess: "higher" | "lower" } }
  | { type: "HL_NEXT" }
  | { type: "TOP100_SETUP"; payload: { teamNames: string[]; scoring: Top100Scoring; roundsPerCategory: number } }
  | { type: "TOP100_START_CATEGORY"; payload: { categoryId: string; rounds: number } }
  | { type: "TOP100_SET_ROUNDS"; payload: { rounds: number } }
  | { type: "TOP100_ANSWER"; payload: { said: string; rank: number | null } }
  | { type: "TOP100_SKIP" }
  | { type: "TOP100_NEXT" }
  | { type: "TOP100_NEXT_CATEGORY" }
  | { type: "ASTA_SETUP"; payload: { teamNames: string[]; bonuses: { affare: boolean; bidone: boolean }; lots: AstaLot[] } }
  | { type: "ASTA_SELL"; payload: { team: number; price: number } }
  | { type: "ASTA_PASS" }
  | { type: "ASTA_NEXT" }
  | { type: "ASTA_REVEAL_NEXT" }
  | { type: "ASTA_RESET" }
  | { type: "QDCP_SETUP"; payload: { teamNames: string[]; deck: QdcpCard[] } }
  | { type: "QDCP_REVEAL_CLUE" }
  | { type: "QDCP_CORRECT"; payload: { team: number } }
  | { type: "QDCP_WRONG"; payload: { team: number } }
  | { type: "QDCP_GIVE_UP" }
  | { type: "QDCP_NEXT" }
  | { type: "QDCP_RESTART" }
  | { type: "START_ROUND"; payload: { category: string; answers: Answer[] } }
  | { type: "FACEOFF_REVEAL"; payload: { teamA_answerIndex?: number | null; teamB_answerIndex?: number | null; teamA_custom?: string | null; teamB_custom?: string | null } }
  | { type: "FACEOFF_NO_MASTER"; payload: { teamA_answer: string; teamB_answer: string } }
  | { type: "CHOOSE_PLAY" }
  | { type: "CHOOSE_PASS" }
  | { type: "MARK_ANSWER_CORRECT"; payload: { answerIndex: number } }
  | { type: "MARK_ANSWER_WRONG"; payload: { answerIndex: number } }
  | { type: "REVEAL_ANSWER_MANUAL"; payload: { answerIndex: number } }
  | { type: "SUBMIT_ANSWER"; payload: { input: string } }
  | { type: "STEAL_START_REVEAL" }
  | { type: "STEAL_REVEAL_ANSWER"; payload: { answerIndex: number } }
  | { type: "STEAL_RESOLVE"; payload: { success: boolean } }
  | { type: "DECREMENT_LIFE" }
  | { type: "INCREMENT_LIFE" }
  | { type: "END_ROUND"; payload: { winningTeam: "A" | "B" } }
  | { type: "RESET_GAME" }
  | { type: "SWITCH_ACTIVE_TEAM" };
