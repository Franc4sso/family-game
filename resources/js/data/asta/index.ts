import type { AstaCategory, AstaItem } from "./types";

// Ogni file della cartella (tranne questo e types.ts) esporta una lista di
// lotti: basta aggiungerne uno per ampliare il catalogo.
const modules = import.meta.glob<{ default: AstaItem[] }>(["./*.ts", "!./index.ts", "!./types.ts"], {
  eager: true,
});

export const ASTA_CATALOG: AstaItem[] = Object.values(modules).flatMap((m) => m.default);

export const ASTA_CATEGORY_LABELS: Record<AstaCategory, string> = {
  lusso: "Lusso",
  moda: "Moda",
  tecnologia: "Tecnologia",
  casa: "Casa",
  trash: "Trash",
  collezione: "Collezione",
  curiosita: "Curiosità",
};

export type { AstaCategory, AstaItem } from "./types";
