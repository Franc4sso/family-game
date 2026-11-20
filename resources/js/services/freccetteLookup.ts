/**
 * "Cerca": per una risposta fuori lista trova la pagina della fonte della categoria
 * e la apre già centrata sul dato, con un frammento di testo (#:~:text=…) che il
 * browser evidenzia e porta in vista. Tutte le API usate rispondono con CORS aperto.
 */

type Lookup =
  /** Una pagina per risposta su un sito MediaWiki; `fragment` è il testo vicino al numero. */
  | { kind: "page"; site: string; fragment?: string; english?: RegExp }
  /** Una pagina fissa (tabella o elenco): si evidenzia la risposta stessa. */
  | { kind: "list"; url: string; english?: RegExp }
  /** Pagina IMDb del titolo (il voto è in alto). */
  | { kind: "imdb"; type: RegExp }
  /** Pagina Apple Music del brano (la durata è accanto al titolo). */
  | { kind: "itunes" }
  /** Ricerca con il risultato già in cima: `{q}` è la risposta. */
  | { kind: "search"; url: string };

const EN = "https://en.wikipedia.org";
const IT = "https://it.wikipedia.org";
const LOD = "https://listofdeaths.fandom.com";
/** Tipo della voce Wikidata, letto dalla descrizione ("film del 2016…", "serie televisiva…"). */
const FILM = /\bfilm\b|\bmovie\b/i;
const SERIE = /serie|series|sitcom|soap|telenovela|anime|miniserie/i;
const CHAR = /personaggio|character/i;
const COUNTRY = /stato|country|paese|nazione|nation|sovereign|territorio|territory|principato|isola|island/i;
const google = (extra: string): Lookup => ({ kind: "search", url: `https://www.google.com/search?hl=it&q={q}+${encodeURIComponent(extra)}` });

const LOOKUPS: Record<string, Lookup> = {
  "film-morti": { kind: "page", site: LOD, fragment: "Total -", english: FILM },
  "personaggi-uccisioni": { kind: "page", site: LOD, fragment: "Kill Count" },
  "film-durata": { kind: "page", site: EN, fragment: "Running time", english: FILM },
  "saghe-durata": google("durata totale di tutti i film in minuti"),
  "serie-tv-episodi": { kind: "page", site: EN, fragment: "of episodes", english: SERIE },
  "film-voto-imdb": { kind: "imdb", type: FILM },
  "serie-tv-voto-imdb": { kind: "imdb", type: SERIE },
  "programmi-tv-edizioni": { kind: "page", site: IT, fragment: "Edizioni" },
  "eventi-storici-anno": { kind: "page", site: IT },
  "invenzioni-anno": { kind: "page", site: IT },
  "harrypotter-eta-morte": { kind: "page", site: "https://harrypotter.fandom.com", fragment: "Died", english: CHAR },
  "cartoni-eta": google("età anni"),
  "classici-disney-numero": { kind: "list", url: `${IT}/wiki/Classici_Disney` },
  "sanremo-conduzioni": { kind: "list", url: `${IT}/wiki/Festival_di_Sanremo` },
  "stati-abitanti": { kind: "list", url: `${EN}/wiki/List_of_countries_and_dependencies_by_population_(United_Nations)`, english: COUNTRY },
  "concerti-spettatori": { kind: "list", url: `${EN}/wiki/List_of_most-attended_concert_tours` },
  "dragonball-livello-combattimento": { kind: "list", url: "https://dragonball.fandom.com/wiki/List_of_Power_Levels" },
  "harrypotter-personaggi-numero-film": { kind: "list", url: `${EN}/wiki/List_of_Harry_Potter_(film_series)_cast_members` },
  "harrypotter-minuti": { kind: "list", url: "https://web.archive.org/web/20171116205142/http://www.imdb.com/list/ls031310246/" },
  "marvel-minuti": { kind: "list", url: "https://www.imdb.com/list/ls507232408/" },
  "marvel-film-personaggi": { kind: "list", url: `${EN}/wiki/List_of_Marvel_Cinematic_Universe_film_actors` },
  "marvel-attori-eta": { kind: "list", url: `${EN}/wiki/List_of_Marvel_Cinematic_Universe_film_actors` },
  "spotify-stream": { kind: "list", url: "https://kworb.net/spotify/songs.html" },
  "youtube-visualizzazioni": { kind: "search", url: "https://www.youtube.com/results?search_query={q}+official+video" },
  "canzoni-durata": { kind: "itunes" },
  "capitali-distanza-roma": google("distanza in linea d'aria da Roma km"),
  "cibi-calorie": google("calorie per 100 g CREA"),
  "calorie-bruciate": google("calorie bruciate in un'ora"),
  "cibi-prezzo-chilo": google("prezzo al kg"),
  "stipendi-lavori": google("stipendio medio lordo annuo Italia"),
};

/** Frammento di testo: i caratteri - , & vanno codificati a parte. */
const textFragment = (s: string) => "#:~:text=" + encodeURIComponent(s).replace(/-/g, "%2D").replace(/,/g, "%2C");
const wikiUrl = (site: string, title: string) => `${site}/wiki/${encodeURIComponent(title.replace(/ /g, "_")).replace(/%2F/g, "/").replace(/%3A/g, ":")}`;
const norm = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, " ").trim();

async function api(site: string, params: Record<string, string>): Promise<any> {
  const path = site.includes("wikipedia.org") || site.includes("wikidata.org") ? "/w/api.php" : "/api.php";
  const qs = new URLSearchParams({ format: "json", formatversion: "2", origin: "*", ...params });
  const res = await fetch(`${site}${path}?${qs}`);
  if (!res.ok) throw new Error(String(res.status));
  return res.json();
}

interface Entity { title: string | null; year: string | null; imdb: string | null }

/** Voce Wikidata per quello che si è detto in italiano, solo se del tipo giusto (un film, una serie…):
 *  titolo inglese di Wikipedia, anno di uscita e codice IMDb. Null se non c'è o se Wikidata non risponde. */
async function findEntity(q: string, type: RegExp): Promise<Entity | null> {
  try {
    const found = await api("https://www.wikidata.org", { action: "wbsearchentities", search: q, language: "it", uselang: "it", limit: "10" });
    const typed = (found.search ?? []).filter((r: { description?: string }) => r.description && type.test(r.description));
    // "Il diavolo veste Prada" è il film del 2006, non il seguito: vince il titolo identico
    const hit = typed.find((r: { label?: string }) => r.label && norm(r.label) === norm(q)) ?? typed[0];
    if (!hit) return null;
    const ent = await api("https://www.wikidata.org", { action: "wbgetentities", ids: hit.id, props: "sitelinks|claims", sitefilter: "enwiki" });
    const e = ent.entities?.[hit.id];
    const date: string | undefined = e?.claims?.P577?.[0]?.mainsnak?.datavalue?.value?.time;
    const imdb: unknown = e?.claims?.P345?.[0]?.mainsnak?.datavalue?.value;
    return {
      title: e?.sitelinks?.enwiki?.title ?? null,
      year: date ? date.slice(1, 5) : null,
      imdb: typeof imdb === "string" && imdb.startsWith("tt") ? imdb : null,
    };
  } catch {
    return null; // Wikidata non risponde: si prova col nome detto
  }
}

/** Pagina esistente sul sito: titolo esatto (con redirect), altrimenti il primo risultato che somiglia. */
async function findPage(site: string, q: string): Promise<string | null> {
  const exact = await api(site, { action: "query", titles: q, redirects: "1" });
  const page = exact.query?.pages?.[0];
  if (page && !page.missing && !page.invalid) return page.title;
  const found = await api(site, { action: "query", list: "search", srsearch: q, srlimit: "5" });
  const nq = norm(q);
  const hit = (found.query?.search ?? []).find((r: { title: string }) => {
    const nt = norm(r.title);
    // "Gladiator (2000)" può diventare "Gladiator (2000 film)", mai "Swords and Sandals: Gladiator"
    return nt === nq || nt.startsWith(nq + " ");
  });
  return hit?.title ?? null;
}

/** Link immediato, senza rete: la ricerca interna della fonte. Poi `resolveLookup` lo migliora. */
export function quickLookup(categoryId: string, q: string): string {
  const l = LOOKUPS[categoryId] ?? google("");
  const e = encodeURIComponent(q);
  switch (l.kind) {
    case "page": return `${l.site}/wiki/Special:Search?search=${e}`;
    case "list": return l.url + textFragment(q);
    case "imdb": return `https://www.imdb.com/find/?q=${e}`;
    case "itunes": return `https://music.apple.com/it/search?term=${e}`;
    case "search": return l.url.replace("{q}", e);
  }
}

/** Link alla pagina giusta, già centrata sul dato. In caso di errore resta il link immediato. */
export async function resolveLookup(categoryId: string, q: string): Promise<string> {
  const l = LOOKUPS[categoryId];
  const fallback = quickLookup(categoryId, q);
  if (!l) return fallback;
  try {
    if (l.kind === "page") {
      const tries = [q];
      if (l.english) {
        const en = await findEntity(q, l.english);
        if (en?.title) {
          const base = en.title.replace(/ \([^)]*\)$/, "");
          // "Shrek (2001)" prima di "Shrek", che sulle wiki dei fan spesso porta alla saga intera
          // Su Wikipedia il titolo di Wikidata è già quello giusto; sulle wiki dei fan si prova prima con l'anno
          if (l.site === EN) tries.unshift(en.title);
          else tries.unshift(...(en.year ? [`${base} (${en.year})`] : []), en.title, base);
        }
      }
      for (const t of tries) {
        const title = await findPage(l.site, t);
        if (title) return wikiUrl(l.site, title) + (l.fragment ? textFragment(l.fragment) : "");
      }
      return fallback;
    }
    if (l.kind === "list" && l.english) {
      const en = await findEntity(q, l.english);
      return en?.title ? l.url + textFragment(en.title.replace(/ \([^)]*\)$/, "")) : fallback;
    }
    if (l.kind === "imdb") {
      const en = await findEntity(q, l.type);
      return en?.imdb ? `https://www.imdb.com/title/${en.imdb}/` : fallback;
    }
    if (l.kind === "itunes") {
      const res = await fetch(`https://itunes.apple.com/search?${new URLSearchParams({ term: q, entity: "song", country: "it", limit: "1" })}`);
      const data = await res.json();
      return data.results?.[0]?.trackViewUrl ?? fallback;
    }
  } catch {
    /* rete assente o API giù: si usa il link immediato */
  }
  return fallback;
}
