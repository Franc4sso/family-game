/**
 * Un lotto del catalogo di Asta Folle. Il valore resta segreto fino alla
 * rivelazione finale.
 */
export type AstaCategory = "lusso" | "moda" | "tecnologia" | "casa" | "trash" | "collezione" | "curiosita";

export interface AstaItem {
  id: string;            // kebab-case, unico
  name: string;          // es. "Nike Air Jordan 1 “Chicago” (1985)"
  category: AstaCategory;
  description: string;   // neutra, senza indizi sul prezzo
  clues: string[];       // 2-3 note del banditore, dalla più vaga alla più utile
  value: number;         // valore reale in euro
  image: string;         // percorso servito dal gioco, es. "/asta/air-jordan-1-1985.jpg"
  credit?: string;       // autore e licenza della foto
  source?: string;       // pagina da cui viene la foto
  valueNote?: string;    // da dove viene il valore (per il master)
}
