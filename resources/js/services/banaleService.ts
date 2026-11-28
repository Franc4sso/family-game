import { BANALE_DECK_SRC } from "@/data/banale/deck";

/* ─── Banale o Geniale ───
   Una partita = N round. Ogni round ha una regola sola (Banale, Geniale o Bersaglio)
   e lo vince la prima squadra che prende BOG_WIN_AT domande. Tutte le squadre
   rispondono alla stessa domanda, a turno; i punti si scoprono solo alla fine. */

export type BogMode = "banale" | "geniale" | "bersaglio";
export const BOG_MODES: BogMode[] = ["banale", "geniale", "bersaglio"];
export const BOG_WIN_AT = 4;
export const BOG_HELP_AFTER = 3;
export const BOG_MIN_TEAMS = 2;
export const BOG_MAX_TEAMS = 4;

export interface BogAnswer {
  name: string;
  /** Quante persone su 100 la direbbero. */
  pop: number;
  /** Nome e sinonimi già normalizzati, per il confronto. */
  keys: string[];
  /** Le stesse voci senza togliere le desinenze, allineate a `keys`: servono per i refusi. */
  raws: string[];
}
export interface BogQuestion {
  q: string;
  a: BogAnswer[];
}
export interface BogGiven {
  name: string;
  pop: number;
  help?: boolean;
  /** Cosa ha detto davvero la squadra, quando non coincide con la voce in lista. */
  said?: string;
}
export interface BogResult extends BogGiven {
  team: number;
  pts: number;
}
export interface BogHistory {
  q: string;
  mode: BogMode;
  target: number;
  res: BogResult[];
  winner: number | null;
  round: number;
}
export interface BogTry {
  t: string;
  why: string;
}

export interface BogState {
  screen: "draw" | "answers" | "reveal" | "score" | "roundEnd" | "win";
  teams: string[];
  rounds: number;
  roundNo: number;
  roundWins: number[];
  roundWinner: number | null;
  usedModes: BogMode[];
  deck: BogQuestion[];
  qn: number;
  q: BogQuestion;
  qInRound: number;
  mode: BogMode;
  target: number;
  starter: number;
  order: number[];
  turn: number;
  given: (BogGiven | null)[];
  tries: BogTry[];
  err: string;
  /** Risposte della lista simili a quella appena rifiutata: il conduttore decide se vale. */
  suggest: { said: string; options: BogAnswer[] } | null;
  helpSaved: BogAnswer[] | null;
  helpOpen: boolean;
  /** Frase rifiutata che si sta facendo controllare all'LLM, per capire se il concetto è in lista. */
  aiPending: string | null;
  history: BogHistory[];
  sets: number[];
  /** Il rullo della regola si è fermato (gira solo a inizio round). */
  spun: boolean;
}

/* ─── Testo ─── */

/** Minuscole, senza accenti né punteggiatura. */
export const norm = (t: string) =>
  t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Singolare e plurale insieme: si confrontano le parole senza la vocale finale. */
export const stem = (t: string) =>
  t
    .split(" ")
    .map((w) => (w.length > 3 ? w.replace(/(he|hi|[aeio])$/, "") : w))
    .join(" ");

const prep = (t: string) => stem(norm(t));

export const BANALE_DECK: BogQuestion[] = BANALE_DECK_SRC.map(([q, s]) => ({
  q,
  a: s.split("|").map((e) => {
    const [names, pop] = e.split(":");
    const all = names.split("/");
    const keys: string[] = [];
    const raws: string[] = [];
    for (const n of all) {
      const k = prep(n);
      if (k && !keys.includes(k)) {
        keys.push(k);
        raws.push(norm(n));
      }
    }
    return { name: all[0], pop: Number(pop), keys, raws };
  }),
}));

/** Distanza tra due parole contando anche le lettere scambiate ("dimagirto" → "dimagrito" = 1).
 *  Si ferma appena supera `max`. */
export function editDistance(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const n = b.length;
  let prev2: number[] = [];
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let rowMin = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      let v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) v = Math.min(v, prev2[j - 2] + 1);
      cur.push(v);
      if (v < rowMin) rowMin = v;
    }
    if (rowMin > max) return max + 1;
    prev2 = prev;
    prev = cur;
  }
  return prev[n];
}

/** Due lettere vicine scambiate: "tesat" per "testa". */
function swapped(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let i = 0;
  while (i < a.length && a[i] === b[i]) i++;
  return i < a.length - 1 && a[i] === b[i + 1] && a[i + 1] === b[i] && a.slice(i + 2) === b.slice(i + 2);
}

/** Refusi tollerati sulla parola intera della lista. */
const typoBudget = (len: number) => (len >= 10 ? 2 : len >= 5 ? 1 : 0);

/** Un refuso, non un'altra parola.
 *  - Sotto le 7 lettere vale solo lo scambio di due lettere: "chiavi" non è "chiami", "puzza" non è "pizza".
 *  - La prima lettera resta: "quadri" non è "squadra".
 *  - La desinenza resta: "mangiano" non è "mangiato". Singolare e plurale li ha già risolti `stem`. */
function typoDistance(said: string, key: string): number {
  const budget = typoBudget(key.length);
  if (said === key) return 0;
  if (!budget || said[0] !== key[0]) return budget + 1;
  if (swapped(said, key)) return 1;
  if (key.length < 7) return budget + 1;
  let p = 0;
  while (p < said.length && p < key.length && said[p] === key[p]) p++;
  if (p >= Math.max(said.length, key.length) - 3) return budget + 1;
  return editDistance(said, key, budget);
}

export type BogMatch = { answer: BogAnswer; how: "exact" | "inside" | "typo" };

/** Cerca la risposta nella lista. In ordine: uguale, contenuta in una frase più lunga
 *  (vince la voce più lunga, così "faccio yoga" batte "faccia"), con qualche refuso. */
export function findAnswer(q: BogQuestion, text: string): BogMatch | null {
  const t = prep(text);
  if (!t) return null;
  const pad = ` ${t} `;
  const tw = t.split(" ");
  const twRaw = norm(text).split(" ");
  let inside: BogAnswer | null = null;
  let insideLen = 0;
  let typo: BogAnswer | null = null;
  let typoCost = Infinity;
  let typoLen = 0;
  for (const a of q.a) {
    for (let ki = 0; ki < a.keys.length; ki++) {
      const k = a.keys[ki];
      if (k === t) return { answer: a, how: "exact" };
      if (k.length >= 2 && k.length > insideLen && pad.includes(` ${k} `)) {
        inside = a;
        insideLen = k.length;
      }
      const kw = k.split(" ");
      const kwRaw = a.raws[ki].split(" ");
      for (let s = 0; s + kw.length <= tw.length; s++) {
        let cost = 0;
        let ok = true;
        for (let j = 0; j < kw.length && ok; j++) {
          if (tw[s + j] === kw[j]) continue;
          const d = typoDistance(twRaw[s + j], kwRaw[j]);
          if (d > typoBudget(kwRaw[j].length)) ok = false;
          else cost += d;
        }
        if (ok && cost > 0 && (cost < typoCost || (cost === typoCost && k.length > typoLen))) {
          typo = a;
          typoCost = cost;
          typoLen = k.length;
        }
      }
    }
  }
  /* Una voce lunga con un refuso dice più di una parola sola trovata giusta. */
  if (typo && typoLen > insideLen * 1.5) return { answer: typo, how: "typo" };
  if (inside) return { answer: inside, how: "inside" };
  if (typo) return { answer: typo, how: "typo" };
  return null;
}

/* Parole che non dicono niente del concetto: non contano per la somiglianza. */
const FILLER = new Set(
  "il lo la i gli le l un uno una un di del dello della dei degli delle d a al allo alla ai agli alle da dal dalla dai in nel nella nei con col su sul sulla per tra fra e ed o od che chi cui non piu mi ti si ci vi ne se ma ho hai ha abbiamo avete hanno sono sei e siamo siete fa fai faccio fare tutto tutti tutta molto tanto poco sempre mai cosa come quando dove anche gia ancora suo sua tuo tua mio mia loro questo questa quello quella vedo vede vedi dico dice dici sembri sembra stai sta sto vai va vado devo deve devi posso puoi voglio vuoi essere avere fare dire andare stare oggi poi bene ora qui"
    .split(" "),
);
const content = (t: string) =>
  norm(t)
    .split(" ")
    .filter((w) => w.length >= 3 && !FILLER.has(w))
    .map((w) => stem(w));

function wordSim(a: string, b: string): number {
  if (a === b) return a.length >= 4 ? 3 : 1;
  const min = Math.min(a.length, b.length);
  const budget = a[0] !== b[0] ? 0 : min >= 9 ? 2 : min >= 6 ? 1 : 0;
  if (budget && editDistance(a, b, budget) <= budget) return 2;
  let p = 0;
  while (p < a.length && p < b.length && a[p] === b[p]) p++;
  /* stessa radice: "mutand" e "mutandon", "dorm" e "dormit" */
  if (p >= 5 && p >= Math.ceil(Math.min(a.length, b.length) * 0.8)) return 2;
  return 0;
}

/** Fino a `max` voci della lista che somigliano a una risposta non trovata.
 *  Vuoto se nessuna somiglia davvero, così la lista non si svela a ogni errore. */
export function suggestAnswers(q: BogQuestion, text: string, exclude: Set<string>, max = 3): BogAnswer[] {
  const words = content(text);
  if (!words.length) return [];
  const scored: { a: BogAnswer; s: number }[] = [];
  for (const a of q.a) {
    if (exclude.has(a.name)) continue;
    let best = 0;
    for (const k of a.keys) {
      const kw = k.split(" ").filter((w) => w.length >= 3 && !FILLER.has(w));
      if (!kw.length) continue;
      let s = 0;
      let hits = 0;
      for (const x of kw) {
        const v = Math.max(0, ...words.map((w) => wordSim(w, x)));
        s += v;
        if (v >= 2) hits++;
      }
      /* Deve tornare almeno metà della voce, e almeno una parola vera. */
      if (hits && hits * 2 >= kw.length) best = Math.max(best, s);
    }
    if (best > 0) scored.push({ a, s: best });
  }
  return scored
    .sort((x, y) => y.s - x.s || y.a.pop - x.a.pop)
    .slice(0, max)
    .map((x) => x.a);
}

/* ─── Regole ─── */

export const shuffle = <T,>(a: T[]): T[] => {
  const b = a.slice();
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
};

/** Punti di una risposta. L'aiutino costa metà: metà punti, o distanza doppia in Bersaglio. */
export function bogScore(mode: BogMode, target: number, pop: number, help?: boolean): number {
  if (mode === "bersaglio") return Math.abs(pop - target) * (help ? 2 : 1);
  const p = mode === "banale" ? pop : 100 - pop;
  return help ? Math.round(p / 2) : p;
}

export const isTiebreak = (s: BogState) => s.roundNo > s.rounds;

/** La partita è decisa: nessuno può più rimontare, o dopo l'ultimo round non c'è pari. */
export function matchOver(s: BogState): boolean {
  const w = s.roundWins.slice().sort((a, b) => b - a);
  const left = s.rounds - s.roundNo;
  if (left > 0) return w[0] > (w[1] ?? 0) + left;
  return w[0] !== w[1];
}
export const matchWinner = (s: BogState) => s.roundWins.indexOf(Math.max(...s.roundWins));

/** Articolo per il nome della squadra: "i Rossi", "gli Orsi". */
export const art = (name: string) => (/^[aeiou]/i.test(name) ? "gli" : "i");
export const cap = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s);
export const teamRef = (name: string) => `${art(name)} ${name}`;

function nextQuestion(s: BogState, newRound: boolean): BogState {
  return {
    ...s,
    screen: "draw",
    q: s.deck[s.qn % s.deck.length],
    qn: s.qn + 1,
    qInRound: s.history.filter((h) => h.round === s.roundNo).length + 1,
    target: 15 + Math.floor(Math.random() * 71),
    order: s.teams.map((_, i) => (s.starter + i) % s.teams.length),
    turn: 0,
    given: s.teams.map(() => null),
    tries: [],
    err: "",
    suggest: null,
    helpSaved: null,
    helpOpen: false,
    aiPending: null,
    spun: !newRound,
  };
}

function startRound(s: BogState): BogState {
  let pool = BOG_MODES.filter((m) => !s.usedModes.includes(m));
  let used = s.usedModes;
  if (!pool.length) {
    pool = BOG_MODES;
    used = [];
  }
  const mode = pool[Math.floor(Math.random() * pool.length)];
  return nextQuestion({ ...s, roundNo: s.roundNo + 1, sets: s.teams.map(() => 0), mode, usedModes: [...used, mode], roundWinner: null }, true);
}

export function newBogGame(teams: string[], rounds: number): BogState {
  const base: BogState = {
    screen: "draw",
    teams,
    rounds,
    roundNo: 0,
    roundWins: teams.map(() => 0),
    roundWinner: null,
    usedModes: [],
    deck: shuffle(BANALE_DECK),
    qn: 0,
    q: BANALE_DECK[0],
    qInRound: 1,
    mode: "banale",
    target: 50,
    starter: 0,
    order: [],
    turn: 0,
    given: [],
    tries: [],
    err: "",
    suggest: null,
    helpSaved: null,
    helpOpen: false,
    aiPending: null,
    history: [],
    sets: teams.map(() => 0),
    spun: false,
  };
  return startRound(base);
}

/** Registra la risposta della squadra di turno e passa alla prossima. */
function accept(s: BogState, g: BogGiven): BogState {
  const team = s.order[s.turn];
  const given = s.given.slice();
  given[team] = g;
  return { ...s, given, turn: s.turn + 1, tries: [], err: "", suggest: null, helpSaved: null, helpOpen: false, aiPending: null };
}

const ownerOf = (s: BogState, name: string) => s.given.findIndex((g) => g?.name === name);

export type BogAction =
  | { type: "start"; teams: string[]; rounds: number }
  | { type: "landed" }
  | { type: "collect" }
  | { type: "submit"; text: string }
  | { type: "pickSuggest"; index: number }
  | { type: "rejectSuggest" }
  | { type: "openHelp" }
  | { type: "closeHelp" }
  | { type: "pickHelp"; index: number }
  | { type: "reveal" }
  | { type: "next" }
  | { type: "nextQuestion" }
  | { type: "continue" }
  | { type: "rematch" }
  | { type: "undo" }
  | { type: "aiResult"; said: string; name: string | null }
  | { type: "reset" };

export function bogReducer(s: BogState | null, a: BogAction): BogState | null {
  if (a.type === "start") return newBogGame(a.teams, a.rounds);
  if (a.type === "reset") return null;
  if (!s) return s;
  switch (a.type) {
    case "landed":
      return s.spun ? s : { ...s, spun: true };
    case "collect":
      return { ...s, screen: "answers" };
    case "submit": {
      const raw = a.text.trim();
      if (!raw || s.turn >= s.order.length) return s;
      const hit = findAnswer(s.q, raw);
      if (!hit) {
        const used = new Set(s.given.filter((g): g is BogGiven => !!g).map((g) => g.name));
        const options = suggestAnswers(s.q, raw, used);
        return {
          ...s,
          tries: [...s.tries, { t: raw, why: "non è in lista" }],
          err: `«${raw}» non è nella lista così. Controllo se il senso è quello di una voce…`,
          suggest: options.length ? { said: raw, options } : null,
          aiPending: raw,
        };
      }
      const owner = ownerOf(s, hit.answer.name);
      if (owner >= 0) {
        return {
          ...s,
          tries: [...s.tries, { t: raw, why: "già detta" }],
          err: `«${hit.answer.name}» l'hanno già detta ${teamRef(s.teams[owner])}. Serve un'altra risposta.`,
          suggest: null,
          aiPending: null,
        };
      }
      return accept(s, { name: hit.answer.name, pop: hit.answer.pop, said: hit.how === "exact" ? undefined : raw });
    }
    case "aiResult": {
      if (s.aiPending !== a.said) return s;
      const tname = s.teams[s.order[s.turn]];
      const local = s.suggest?.said === a.said ? s.suggest.options : [];
      const found = a.name && ownerOf(s, a.name) < 0 ? s.q.a.find((x) => x.name === a.name) : undefined;
      const options = found ? [found, ...local.filter((x) => x.name !== found.name)].slice(0, 3) : local;
      return {
        ...s,
        aiPending: null,
        suggest: options.length ? { said: a.said, options } : null,
        err: options.length
          ? `«${a.said}» non è nella lista così. Se intendevano una di queste, toccatela.`
          : `«${a.said}» non è nella lista. ${cap(teamRef(tname))} devono dire un'altra risposta.`,
      };
    }
    case "undo": {
      /* Il conduttore riapre il turno della squadra appena registrata, se il gioco ha capito male. */
      if (s.screen !== "answers" || s.turn === 0) return s;
      const team = s.order[s.turn - 1];
      const given = s.given.slice();
      given[team] = null;
      return { ...s, given, turn: s.turn - 1, tries: [], err: "", suggest: null, helpSaved: null, helpOpen: false, aiPending: null };
    }
    case "pickSuggest": {
      const opt = s.suggest?.options[a.index];
      if (!opt || ownerOf(s, opt.name) >= 0) return s;
      return accept(s, { name: opt.name, pop: opt.pop, said: s.suggest!.said });
    }
    case "rejectSuggest": {
      const tname = s.teams[s.order[s.turn]];
      return { ...s, suggest: null, aiPending: null, err: `${cap(teamRef(tname))} devono dire un'altra risposta.` };
    }
    case "openHelp": {
      const used = new Set(s.given.filter((g): g is BogGiven => !!g).map((g) => g.name));
      /* Sempre le stesse quattro se lo chiudono e riaprono: l'aiutino non si rimescola. */
      const helpSaved = s.helpSaved ?? shuffle(s.q.a.filter((x) => !used.has(x.name))).slice(0, 4);
      return { ...s, helpSaved, helpOpen: true, suggest: null, aiPending: null };
    }
    case "closeHelp":
      return { ...s, helpOpen: false };
    case "pickHelp": {
      const opt = s.helpSaved?.[a.index];
      if (!opt) return s;
      return accept(s, { name: opt.name, pop: opt.pop, help: true });
    }
    case "reveal": {
      if (s.turn < s.order.length) return s;
      const res: BogResult[] = s.order.map((t) => {
        const g = s.given[t]!;
        return { team: t, ...g, pts: bogScore(s.mode, s.target, g.pop, g.help) };
      });
      const pts = res.map((r) => r.pts);
      const best = s.mode === "bersaglio" ? Math.min(...pts) : Math.max(...pts);
      const top = res.filter((r) => r.pts === best);
      const winner = top.length === 1 ? top[0].team : null;
      const sets = s.sets.slice();
      if (winner !== null) sets[winner]++;
      return {
        ...s,
        screen: "reveal",
        sets,
        history: [...s.history, { q: s.q.q, mode: s.mode, target: s.target, res, winner, round: s.roundNo }],
      };
    }
    case "next": {
      const h = s.history[s.history.length - 1];
      const starter = (s.starter + 1) % s.teams.length;
      if (h.winner !== null && s.sets[h.winner] >= BOG_WIN_AT) {
        const roundWins = s.roundWins.slice();
        roundWins[h.winner]++;
        return { ...s, starter, roundWins, roundWinner: h.winner, screen: "roundEnd" };
      }
      return { ...s, starter, screen: "score" };
    }
    case "nextQuestion":
      return nextQuestion(s, false);
    case "continue":
      return matchOver(s) ? { ...s, screen: "win" } : startRound(s);
    case "rematch":
      return newBogGame(s.teams, s.rounds);
  }
  return s;
}

/* ─── Aiuto dell'LLM ─── */

const AI_URL = "/.netlify/functions/banale-match";
/* Una sola chiamata per la stessa frase sulla stessa domanda, anche se in corso. */
const aiCache = new Map<string, Promise<string | null>>();

/** Chiede alla funzione Netlify se `said` vuol dire una delle voci ancora libere.
 *  Qualsiasi problema (offline, chiave assente, limiti finiti, lentezza) restituisce null: si gioca col controllo locale. */
export function askConcept(q: BogQuestion, free: string[], said: string): Promise<string | null> {
  if (typeof navigator !== "undefined" && navigator.onLine === false) return Promise.resolve(null);
  const key = [q.q, norm(said), free.join("|")].join("\n");
  let p = aiCache.get(key);
  if (!p) {
    /* Un errore non resta in memoria: alla prossima prova si richiede. */
    p = fetchConcept(q, free, said).then((r) => {
      if (r === undefined) aiCache.delete(key);
      return r ?? null;
    });
    aiCache.set(key, p);
  }
  return p;
}

async function fetchConcept(q: BogQuestion, free: string[], said: string): Promise<string | null | undefined> {
  try {
    const res = await fetch(AI_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ question: q.q, answers: free, said }),
      signal: AbortSignal.timeout(4500),
    });
    if (!res.ok) return undefined;
    const data = (await res.json()) as { match?: unknown };
    return typeof data.match === "string" && free.includes(data.match) ? data.match : null;
  } catch {
    return undefined;
  }
}
