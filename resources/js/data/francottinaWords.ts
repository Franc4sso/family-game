export interface FrancottinaWord {
  id: string;
  /** La parola da indovinare, in maiuscolo. */
  answer: string;
  /**
   * Esattamente 3 parole indizio, dalla più difficile (0) alla più facile (2).
   * Ognuna deve legarsi alla soluzione; la soluzione non compare mai dentro un indizio.
   */
  clues: [string, string, string];
  /** Come ogni indizio si collega alla soluzione, mostrato a fine round. */
  links: [string, string, string];
}

/**
 * Pool della Francottina. La prima squadra vede solo clues[0], la seconda
 * anche clues[1], la terza tutte e tre: l'ordine conta.
 */
export const FRANCOTTINA_WORDS: FrancottinaWord[] = [
  { id: "palla", answer: "PALLA", clues: ["VOLO", "MANO", "SFERA"], links: ["pallavolo", "pallamano", "la sfera è una palla"] },
  { id: "capo", answer: "CAPO", clues: ["TAVOLA", "LAVORO", "ANNO"], links: ["capotavola", "capolavoro", "Capodanno"] },
  { id: "luna", answer: "LUNA", clues: ["MEZZA", "MIELE", "PARK"], links: ["mezzaluna", "luna di miele", "luna park"] },
  { id: "gatto", answer: "GATTO", clues: ["PARDO", "NEVI", "STIVALI"], links: ["Il Gattopardo", "gatto delle nevi", "Il gatto con gli stivali"] },
  { id: "ferro", answer: "FERRO", clues: ["BRACCIO", "CAVALLO", "STIRO"], links: ["braccio di ferro", "ferro di cavallo", "ferro da stiro"] },
  { id: "stella", answer: "STELLA", clues: ["ALPINA", "MARINA", "CADENTE"], links: ["stella alpina", "stella marina", "stella cadente"] },
  { id: "testa", answer: "TESTA", clues: ["COLPO", "CODA", "CROCE"], links: ["colpo di testa", "testacoda", "testa o croce"] },
  { id: "porta", answer: "PORTA", clues: ["CALCIO", "FOGLIO", "CHIAVI"], links: ["la porta da calcio", "portafoglio", "portachiavi"] },
  { id: "campo", answer: "CAMPO", clues: ["GRANO", "BASE", "SANTO"], links: ["campo di grano", "campo base", "camposanto"] },
  { id: "carta", answer: "CARTA", clues: ["FORBICE", "IDENTITÀ", "IGIENICA"], links: ["carta, forbice, sasso", "carta d'identità", "carta igienica"] },
  { id: "pane", answer: "PANE", clues: ["GRATTATO", "SPAGNA", "BURRO"], links: ["pangrattato", "pan di Spagna", "pane e burro"] },
  { id: "acqua", answer: "ACQUA", clues: ["VITE", "SANTA", "MINERALE"], links: ["acquavite", "acquasanta", "acqua minerale"] },
  { id: "sole", answer: "SOLE", clues: ["GIRA", "MIO", "OCCHIALI"], links: ["girasole", "'O sole mio", "occhiali da sole"] },
  { id: "pesce", answer: "PESCE", clues: ["APRILE", "SPADA", "ROSSO"], links: ["pesce d'aprile", "pesce spada", "pesce rosso"] },
  { id: "cuore", answer: "CUORE", clues: ["LEONE", "BATTI", "TRAPIANTO"], links: ["Riccardo Cuor di Leone", "batticuore", "trapianto di cuore"] },
  { id: "letto", answer: "LETTO", clues: ["VAGONE", "DIVANO", "CASTELLO"], links: ["vagone letto", "divano letto", "letto a castello"] },
  { id: "filo", answer: "FILO", clues: ["SPINATO", "INTERDENTALE", "AGO"], links: ["filo spinato", "filo interdentale", "ago e filo"] },
  { id: "mare", answer: "MARE", clues: ["NOSTRUM", "FRUTTI", "SPIAGGIA"], links: ["Mare nostrum", "frutti di mare", "la spiaggia è al mare"] },
  { id: "cassa", answer: "CASSA", clues: ["TORACICA", "FORTE", "SUPERMERCATO"], links: ["cassa toracica", "cassaforte", "la cassa del supermercato"] },
  { id: "banco", answer: "BANCO", clues: ["NEBBIA", "MAT", "SCUOLA"], links: ["banco di nebbia", "bancomat", "banco di scuola"] },
  { id: "fuoco", answer: "FUOCO", clues: ["AMICO", "CESSATE", "VIGILI"], links: ["fuoco amico", "cessate il fuoco", "vigili del fuoco"] },
  { id: "oro", answer: "ORO", clues: ["ZECCHINO", "PEPITA", "MEDAGLIA"], links: ["Zecchino d'Oro", "pepita d'oro", "medaglia d'oro"] },
  { id: "notte", answer: "NOTTE", clues: ["BIANCA", "CAMICIA", "BUONA"], links: ["notte bianca", "camicia da notte", "buonanotte"] },
  { id: "cielo", answer: "CIELO", clues: ["GRATTA", "SETTIMO", "STELLATO"], links: ["grattacielo", "settimo cielo", "cielo stellato"] },
  { id: "chiave", answer: "CHIAVE", clues: ["VIOLINO", "INGLESE", "SERRATURA"], links: ["chiave di violino", "chiave inglese", "la chiave apre la serratura"] },
];
