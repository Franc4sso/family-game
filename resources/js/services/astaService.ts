import type { AstaItem } from "@/data/asta";
import type { AstaLot, AstaSale, AstaState } from "@/types/game.types";

// I crediti servono solo a comprare: non hanno un valore in euro.
export const ASTA_START_CREDITS = 30;
export const ASTA_LOTS_PER_TEAM = 3;
export const ASTA_MIN_BID = 1;
/** Lotti in più rispetto al necessario, per quelli che nessuno vuole. */
export const ASTA_SPARE_LOTS = 2;
export const ASTA_MIN_TEAMS = 2;
export const ASTA_MAX_TEAMS = 6;
export const ASTA_BONUS_AFFARE = 3000;
export const ASTA_MALUS_BIDONE = -2000;

/** Colori delle palette, lontani dal rosso e dal senape della grafica. */
export const ASTA_TEAM_COLORS = ["#5B8CFF", "#3DDC97", "#FF6FB5", "#A98BFF", "#3CC8F0", "#C6F24E"];

// Separatore delle migliaia sempre presente: il formato italiano del browser
// lo omette sotto i 10.000 ("2000 €"), che accanto a "12.000 €" stona.
export const formatEuro = (euro: number) =>
  `${String(Math.round(euro)).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €`;

export const paddleNumber = (team: number) => String(team + 1).padStart(2, "0");

export function astaTeamSales(state: AstaState, team: number): AstaSale[] {
  return state.sales.filter((s) => s.team === team);
}

export function astaMissing(state: AstaState, team: number): number {
  return ASTA_LOTS_PER_TEAM - astaTeamSales(state, team).length;
}

/**
 * Offerta massima: deve restare almeno la base d'asta per ogni lotto che
 * manca ancora alla squadra. 0 se la squadra ha già tutti i lotti.
 */
export function astaMaxBid(state: AstaState, team: number): number {
  const missing = astaMissing(state, team);
  if (missing <= 0) return 0;
  return state.teams[team].credits - (missing - 1) * ASTA_MIN_BID;
}

export function astaTotalMissing(state: AstaState): number {
  return state.teams.reduce((sum, _, i) => sum + astaMissing(state, i), 0);
}

/** Lotti ancora da battere dopo quello corrente. */
export function astaLotsAfterCurrent(state: AstaState): number {
  return state.lots.length - state.current - 1;
}

/** Si può scartare il lotto solo se ne restano abbastanza per completare tutti. */
export function astaCanPass(state: AstaState): boolean {
  return astaLotsAfterCurrent(state) >= astaTotalMissing(state);
}

export function astaAuctionOver(state: AstaState): boolean {
  return astaTotalMissing(state) === 0 || state.current >= state.lots.length;
}

export interface AstaBonus {
  team: number;
  sale: AstaSale;
  amount: number;
}

/** Euro di valore ottenuti per ogni credito speso su un lotto. */
export const astaEuroPerCredit = (state: AstaState, sale: AstaSale) => state.lots[sale.lot].value / sale.price;

export const formatCredits = (credits: number) => `${credits} ${credits === 1 ? "credito" : "crediti"}`;

/** Miglior rapporto valore / crediti spesi su un singolo lotto. */
export function astaAffare(state: AstaState): AstaBonus | null {
  if (!state.bonuses.affare || state.sales.length === 0) return null;
  const ratio = (s: AstaSale) => astaEuroPerCredit(state, s);
  const best = state.sales.reduce((a, b) => (ratio(b) > ratio(a) ? b : a));
  return { team: best.team, sale: best, amount: ASTA_BONUS_AFFARE };
}

/** Chi ha comprato il lotto che vale meno di tutti. */
export function astaBidone(state: AstaState): AstaBonus | null {
  if (!state.bonuses.bidone || state.sales.length === 0) return null;
  const worst = state.sales.reduce((a, b) => (state.lots[b.lot].value < state.lots[a.lot].value ? b : a));
  return { team: worst.team, sale: worst, amount: ASTA_MALUS_BIDONE };
}

export interface AstaTeamResult {
  team: number;
  lotsValue: number;
  bonus: number;
  total: number;
  spent: number;
}

/** Patrimonio: valore dei lotti più eventuali bonus (i crediti avanzati non contano). */
export function astaResults(state: AstaState): AstaTeamResult[] {
  const affare = astaAffare(state);
  const bidone = astaBidone(state);
  return state.teams
    .map((_, team) => {
      const sales = astaTeamSales(state, team);
      const lotsValue = sales.reduce((sum, s) => sum + state.lots[s.lot].value, 0);
      const bonus = (affare?.team === team ? affare.amount : 0) + (bidone?.team === team ? bidone.amount : 0);
      return {
        team,
        lotsValue,
        bonus,
        total: lotsValue + bonus,
        spent: sales.reduce((sum, s) => sum + s.price, 0),
      };
    })
    .sort((a, b) => b.total - a.total);
}

const shuffle = <T,>(xs: T[]): T[] => {
  const a = [...xs];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export const itemToLot = (item: AstaItem, custom = false): AstaLot => ({
  id: item.id,
  name: item.name,
  category: item.category,
  description: item.description,
  clues: item.clues,
  value: item.value,
  image: item.image,
  custom,
});

// ─── Bilanciamento dei prezzi ───
//
// I valori veri vanno da pochi euro a decine di migliaia: pescando a caso può
// capitare una serata con tre gioielli e nient'altro (vince chi li prende) o
// tutta roba da mercatino (piatta). Peschiamo invece per fasce, così in ogni
// serata ci sono bidoni, lotti medi e qualche colpo grosso.

type Band = "bidone" | "basso" | "medio" | "alto" | "colpo";

export const astaBand = (value: number): Band =>
  value <= 100 ? "bidone" : value <= 1500 ? "basso" : value <= 8000 ? "medio" : value <= 25000 ? "alto" : "colpo";

/** Peso di ogni fascia nella serata (il "colpo" > 25.000 € è al massimo uno, e non sempre). */
const BAND_WEIGHTS: [Band, number][] = [
  ["bidone", 0.2],
  ["basso", 0.25],
  ["medio", 0.35],
  ["alto", 0.2],
];

/** Pesca `count` lotti dal catalogo rispettando le fasce; se una fascia è scarsa, completa con il resto. */
function pickBalanced(catalog: AstaItem[], count: number): AstaItem[] {
  if (count <= 0) return [];
  const pools = new Map<Band, AstaItem[]>();
  for (const item of shuffle(catalog)) {
    const b = astaBand(item.value);
    pools.set(b, [...(pools.get(b) ?? []), item]);
  }
  const take = (b: Band, n: number) => (pools.get(b) ?? []).splice(0, n);

  const picked: AstaItem[] = [];
  // Il colpo grosso c'è una serata su tre: emozione, senza decidere sempre la partita
  if (count >= 6 && Math.random() < 0.33) picked.push(...take("colpo", 1));
  for (const [band, w] of BAND_WEIGHTS) picked.push(...take(band, Math.max(1, Math.round(count * w))));

  // Troppi: togli a caso; pochi: completa con quel che resta (i colpi per ultimi)
  const out = shuffle(picked).slice(0, count);
  const rest = [...shuffle(BAND_WEIGHTS.flatMap(([b]) => pools.get(b) ?? [])), ...(pools.get("colpo") ?? [])];
  return [...out, ...rest].slice(0, count);
}

/** Nome completo del lotto, compreso l'oggetto nascosto nel pacco (da usare dopo il martello). */
export const fullLotName = (lot: AstaLot) => (lot.extra ? `${lot.name} + ${lot.extra.name}` : lot.name);

/**
 * Sceglie i lotti della serata: tutti quelli del master (se usati), poi il
 * catalogo per fasce di prezzo fino al numero richiesto. Con le sorprese
 * accese, un lotto va all'asta "al buio" (senza foto né nome) e uno diventa
 * un "pacco misterioso" con un secondo oggetto nascosto, che vale insieme.
 */
export function pickAstaLots(catalog: AstaItem[], mine: AstaItem[], count: number, surprises = false): AstaLot[] {
  const own = shuffle(mine).slice(0, count).map((i) => itemToLot(i, true));
  const fromCatalog = pickBalanced(catalog, count - own.length);
  const lots = shuffle([...own, ...fromCatalog.map((i) => itemToLot(i))]);
  if (!surprises || lots.length < 6) return lots;

  // Il pacco nasconde un oggetto piccolo o medio, per non sbilanciare la serata
  const used = new Set(lots.map((l) => l.id));
  const hidden = shuffle(catalog).find((i) => !used.has(i.id) && i.value <= 8000);
  const [buio, pacco] = shuffle(lots.map((_, i) => i).filter((i) => !lots[i].custom));
  if (buio !== undefined) lots[buio] = { ...lots[buio], surprise: "buio" };
  if (pacco !== undefined && hidden) {
    const l = lots[pacco];
    lots[pacco] = {
      ...l,
      surprise: "pacco",
      value: l.value + hidden.value,
      extra: { name: hidden.name, image: hidden.image, value: hidden.value },
    };
  }
  return lots;
}
