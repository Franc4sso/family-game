import type { GameMode } from "@/types/game.types";

export type GameId =
  | "ff"
  | "rubo"
  | "mystery"
  | "higher-lower"
  | "guess-number"
  | "top100"
  | "asta"
  | "qdcp"
  | "francottina";

export interface GameInfo {
  id: GameId;
  name: string;
  description: string;
  chips: string[];
  /** Modalità da avviare; Family Feud ne ha due e le sceglie nella scheda. */
  modes: { label: string; mode: GameMode }[];
  /** Palette e voce della copertina, riprese nella scheda del gioco. */
  sheet: {
    bg: string;
    ink: string;
    accent: string;
    accentInk: string;
  };
}

export const GAMES: GameInfo[] = [
  {
    id: "ff",
    name: "Family Feud",
    description:
      "Le risposte più popolari, una squadra contro l'altra. Con un conduttore che gestisce il tabellone, oppure in due sullo stesso telefono con il confronto automatico.",
    chips: ["2 squadre", "Tabellone a risposte"],
    modes: [
      { label: "Con Master", mode: "master" },
      { label: "Senza Master", mode: "no-master" },
    ],
    sheet: {
      bg: "#1D3BD1",
      ink: "#FFD23F",
      accent: "#FFD23F",
      accentInk: "#14112E",
    },
  },
  {
    id: "rubo",
    name: "Rubo",
    description:
      "Quiz a bluff condotto da te: rispondi o ruba la risposta all'avversario. Corretta +1, rubo riuscito +2, rubo fallito −1.",
    chips: ["Conduttore", "2 sfidanti"],
    modes: [{ label: "Rubo", mode: "rubo" }],
    sheet: {
      bg: "#E5322D",
      ink: "#120A08",
      accent: "#E5322D",
      accentInk: "#FFFFFF",
    },
  },
  {
    id: "mystery",
    name: "Personaggio Misterioso",
    description:
      "Dai gli indizi dal più difficile al più facile. Chi indovina prima vince di più: 10 punti con un indizio, 1 con dieci.",
    chips: ["Conduttore", "10 indizi"],
    modes: [{ label: "Personaggio Misterioso", mode: "mystery" }],
    sheet: {
      bg: "#3D1E8C",
      ink: "#F3E9FF",
      accent: "#B79CFF",
      accentInk: "#1A0B45",
    },
  },
  {
    id: "higher-lower",
    name: "Più alto o più basso",
    description:
      "Due squadre, una sola catena. A turno indovinate quale numero è più grande: chi sbaglia la spezza e regala il punto.",
    chips: ["2 squadre"],
    modes: [{ label: "Più alto o più basso", mode: "higher-lower" }],
    sheet: {
      bg: "#FF7A1A",
      ink: "#2A1200",
      accent: "#FF7A1A",
      accentInk: "#2A1200",
    },
  },
  {
    id: "guess-number",
    name: "Indovina il Numero",
    description:
      "Domande a cifre: rispondete a voce, poi svelate la risposta esatta un clic alla volta.",
    chips: ["Risposte a voce"],
    modes: [{ label: "Indovina il Numero", mode: "guess-number" }],
    sheet: {
      bg: "#0E7C74",
      ink: "#E8FFFB",
      accent: "#4FE0D0",
      accentInk: "#04312D",
    },
  },
  {
    id: "top100",
    name: "TOP 100",
    description:
      "Dai una classifica, le squadre nominano chi c'è dentro: più è in alto, più punti. Fuori dalla top, zero.",
    chips: ["2–6 squadre", "Classifiche"],
    modes: [{ label: "TOP 100", mode: "top100" }],
    sheet: {
      bg: "#0A0F24",
      ink: "#F5B83D",
      accent: "#F5B83D",
      accentInk: "#1A1305",
    },
  },
  {
    id: "asta",
    name: "Asta Folle",
    description:
      "30 crediti e 3 lotti a testa. Rilanciate a voce: i valori veri si scoprono solo alla fine.",
    chips: ["2–6 squadre", "30 crediti"],
    modes: [{ label: "Asta Folle", mode: "asta" }],
    sheet: {
      bg: "#15100D",
      ink: "#E8411F",
      accent: "#E8411F",
      accentInk: "#FFF4EC",
    },
  },
  {
    id: "qdcp",
    name: "Quando, Dove, Come, Perché",
    description:
      "Film, canzoni, personaggi e altro in quattro indizi: chi indovina prima prende più punti, chi sbaglia è fuori.",
    chips: ["2–6 squadre", "4 indizi"],
    modes: [{ label: "Quando, Dove, Come, Perché", mode: "qdcp" }],
    sheet: {
      bg: "#0B3D26",
      ink: "#B8F28B",
      accent: "#B8F28B",
      accentInk: "#0B3D26",
    },
  },
  {
    id: "francottina",
    name: "Francottina",
    description:
      "Tre parole, una soluzione che le lega. La prima squadra vede una parola e vale 3 punti, la seconda due e vale 2, la terza tre e vale 1. Se sbaglia anche lei, risponde chi vuole.",
    chips: ["2–6 squadre", "3 parole"],
    modes: [{ label: "Francottina", mode: "francottina" }],
    sheet: {
      bg: "#1A2450",
      ink: "#F4EFE2",
      accent: "#E4B553",
      accentInk: "#141936",
    },
  },
];
