import type { Top100Category, Top100Group } from "./types";

// Ogni file della cartella (tranne questo e types.ts) esporta una classifica:
// basta aggiungere un file per avere una nuova categoria nel gioco.
const modules = import.meta.glob<{ default: Top100Category }>(["./*.ts", "!./index.ts", "!./types.ts"], {
  eager: true,
});

export const TOP100_CATEGORIES: Top100Category[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => a.name.localeCompare(b.name, "it"));

export const TOP100_GROUP_LABELS: Record<Top100Group, string> = {
  social: "Social e web",
  musica: "Musica",
  "cinema-giochi": "Cinema e giochi",
  soldi: "Soldi e marchi",
  mondo: "Mondo",
  italia: "Italia",
  sport: "Sport",
};

export type { Top100Category, Top100Group, Top100Item } from "./types";
