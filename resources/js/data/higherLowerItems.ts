export type HLCategory =
  | "Mondo"
  | "Social"
  | "Natura"
  | "Sport"
  | "Cinema"
  | "Curiosità";

export interface HLItem {
  id: string;
  /** Etichetta mostrata a schermo, senza il numero. */
  label: string;
  /** Valore numerico usato per il confronto. */
  value: number;
  /** Unità di misura, mostrata solo dopo la rivelazione. */
  unit: string;
  category: HLCategory;
  /** Contesto mostrato dopo la rivelazione. */
  note: string;
}

/**
 * Elementi confrontabili per la modalità "Più alto o più basso".
 * Ogni gruppo condivide la stessa unità di misura: il servizio accoppia
 * soltanto elementi della stessa unità, così il confronto ha senso.
 *
 * I valori sono approssimazioni stabili nel tempo: dove un dato cambia in
 * fretta (follower, incassi) è arrotondato per restare valido a lungo.
 */
export const HL_ITEMS: HLItem[] = [
  // ─────────────── POPOLAZIONE (abitanti) ───────────────
  { id: "pop-cina", label: "La Cina", value: 1410000000, unit: "abitanti", category: "Mondo", note: "Il paese più popoloso del mondo insieme all'India." },
  { id: "pop-india", label: "L'India", value: 1430000000, unit: "abitanti", category: "Mondo", note: "Ha superato la Cina come nazione più popolosa." },
  { id: "pop-usa", label: "Gli Stati Uniti", value: 335000000, unit: "abitanti", category: "Mondo", note: "Terzo paese al mondo per popolazione." },
  { id: "pop-brasile", label: "Il Brasile", value: 215000000, unit: "abitanti", category: "Mondo", note: "Il paese più popoloso del Sud America." },
  { id: "pop-russia", label: "La Russia", value: 144000000, unit: "abitanti", category: "Mondo", note: "Il paese più esteso del mondo, ma meno popoloso di quanto si pensi." },
  { id: "pop-giappone", label: "Il Giappone", value: 124000000, unit: "abitanti", category: "Mondo", note: "Popolazione in calo da oltre un decennio." },
  { id: "pop-germania", label: "La Germania", value: 84000000, unit: "abitanti", category: "Mondo", note: "Il paese più popoloso dell'Unione Europea." },
  { id: "pop-francia", label: "La Francia", value: 68000000, unit: "abitanti", category: "Mondo", note: "Poco più popolosa del Regno Unito." },
  { id: "pop-uk", label: "Il Regno Unito", value: 67000000, unit: "abitanti", category: "Mondo", note: "Circa nove milioni vivono nella sola Londra." },
  { id: "pop-italia", label: "L'Italia", value: 59000000, unit: "abitanti", category: "Mondo", note: "In calo demografico da diversi anni." },
  { id: "pop-spagna", label: "La Spagna", value: 48000000, unit: "abitanti", category: "Mondo", note: "Circa undici milioni in meno dell'Italia." },
  { id: "pop-canada", label: "Il Canada", value: 39000000, unit: "abitanti", category: "Mondo", note: "Secondo paese al mondo per superficie, ma poco abitato." },
  { id: "pop-australia", label: "L'Australia", value: 26000000, unit: "abitanti", category: "Mondo", note: "Un intero continente con meno abitanti della sola Lombardia moltiplicata per tre." },
  { id: "pop-portogallo", label: "Il Portogallo", value: 10300000, unit: "abitanti", category: "Mondo", note: "Poco più della Lombardia." },
  { id: "pop-svizzera", label: "La Svizzera", value: 8800000, unit: "abitanti", category: "Mondo", note: "Quattro lingue ufficiali in un paese piccolissimo." },
  { id: "pop-norvegia", label: "La Norvegia", value: 5500000, unit: "abitanti", category: "Mondo", note: "Meno abitanti della sola città di Roma e provincia." },
  { id: "pop-islanda", label: "L'Islanda", value: 390000, unit: "abitanti", category: "Mondo", note: "Meno abitanti di Firenze." },
  { id: "pop-roma", label: "La città di Roma", value: 2750000, unit: "abitanti", category: "Mondo", note: "Il comune più popoloso d'Italia." },
  { id: "pop-milano", label: "La città di Milano", value: 1370000, unit: "abitanti", category: "Mondo", note: "Secondo comune italiano per popolazione." },
  { id: "pop-napoli", label: "La città di Napoli", value: 910000, unit: "abitanti", category: "Mondo", note: "Terzo comune italiano per popolazione." },
  { id: "pop-tokyo", label: "La città di Tokyo", value: 14000000, unit: "abitanti", category: "Mondo", note: "L'area metropolitana supera i trentasette milioni." },
  { id: "pop-newyork", label: "La città di New York", value: 8300000, unit: "abitanti", category: "Mondo", note: "La città più popolosa degli Stati Uniti." },
  { id: "pop-vaticano", label: "La Città del Vaticano", value: 800, unit: "abitanti", category: "Mondo", note: "Lo stato più piccolo del mondo." },

  // ─────────────── SEGUACI SUI SOCIAL (follower Instagram) ───────────────
  { id: "ig-ronaldo", label: "Cristiano Ronaldo su Instagram", value: 640000000, unit: "follower", category: "Social", note: "L'account personale più seguito al mondo." },
  { id: "ig-messi", label: "Lionel Messi su Instagram", value: 505000000, unit: "follower", category: "Social", note: "Secondo solo a Ronaldo tra gli sportivi." },
  { id: "ig-selena", label: "Selena Gomez su Instagram", value: 425000000, unit: "follower", category: "Social", note: "Per anni la donna più seguita sulla piattaforma." },
  { id: "ig-kylie", label: "Kylie Jenner su Instagram", value: 400000000, unit: "follower", category: "Social", note: "Ha costruito un impero di cosmetici partendo dai social." },
  { id: "ig-rock", label: "Dwayne Johnson su Instagram", value: 395000000, unit: "follower", category: "Social", note: "L'attore più seguito della piattaforma." },
  { id: "ig-arianagrande", label: "Ariana Grande su Instagram", value: 375000000, unit: "follower", category: "Social", note: "Tra le cantanti più seguite di sempre." },
  { id: "ig-beyonce", label: "Beyoncé su Instagram", value: 315000000, unit: "follower", category: "Social", note: "Pubblica raramente, ma ogni post diventa un evento." },
  { id: "ig-neymar", label: "Neymar su Instagram", value: 230000000, unit: "follower", category: "Social", note: "Terzo calciatore più seguito al mondo." },
  { id: "ig-taylor", label: "Taylor Swift su Instagram", value: 280000000, unit: "follower", category: "Social", note: "Cresciuta enormemente durante il suo tour mondiale." },
  { id: "ig-nasa", label: "La NASA su Instagram", value: 97000000, unit: "follower", category: "Social", note: "L'ente spaziale più seguito sui social." },
  { id: "ig-chiaraferragni", label: "Chiara Ferragni su Instagram", value: 28000000, unit: "follower", category: "Social", note: "L'influencer italiana più seguita." },
  { id: "ig-totti", label: "Francesco Totti su Instagram", value: 8000000, unit: "follower", category: "Social", note: "Tra gli sportivi italiani più seguiti." },

  // ─────────────── ISCRITTI YOUTUBE ───────────────
  { id: "yt-mrbeast", label: "MrBeast su YouTube", value: 340000000, unit: "iscritti", category: "Social", note: "Il canale personale più seguito del mondo." },
  { id: "yt-tseries", label: "Il canale T-Series", value: 285000000, unit: "iscritti", category: "Social", note: "Etichetta musicale indiana, per anni prima assoluta." },
  { id: "yt-cocomelon", label: "Il canale Cocomelon", value: 190000000, unit: "iscritti", category: "Social", note: "Canzoncine per bambini: uno dei canali più visti in assoluto." },
  { id: "yt-pewdiepie", label: "PewDiePie su YouTube", value: 110000000, unit: "iscritti", category: "Social", note: "Per anni il creator numero uno della piattaforma." },
  { id: "yt-ronaldo", label: "Il canale YouTube di Cristiano Ronaldo", value: 75000000, unit: "iscritti", category: "Social", note: "Ha raggiunto il milione di iscritti in meno di due ore." },
  { id: "yt-favij", label: "Favij su YouTube", value: 6000000, unit: "iscritti", category: "Social", note: "Tra i primi grandi youtuber italiani." },

  // ─────────────── ALTEZZA (metri) ───────────────
  { id: "alt-everest", label: "Il Monte Everest", value: 8849, unit: "metri di altezza", category: "Natura", note: "La montagna più alta del mondo." },
  { id: "alt-k2", label: "Il K2", value: 8611, unit: "metri di altezza", category: "Natura", note: "Considerata più difficile da scalare dell'Everest." },
  { id: "alt-monteblanco", label: "Il Monte Bianco", value: 4808, unit: "metri di altezza", category: "Natura", note: "La vetta più alta delle Alpi." },
  { id: "alt-cervino", label: "Il Cervino", value: 4478, unit: "metri di altezza", category: "Natura", note: "La montagna dalla forma più riconoscibile d'Europa." },
  { id: "alt-etna", label: "L'Etna", value: 3357, unit: "metri di altezza", category: "Natura", note: "Il vulcano attivo più alto d'Europa, cambia altezza dopo ogni eruzione." },
  { id: "alt-vesuvio", label: "Il Vesuvio", value: 1281, unit: "metri di altezza", category: "Natura", note: "Il vulcano che distrusse Pompei nel 79 dopo Cristo." },
  { id: "alt-burjkhalifa", label: "Il Burj Khalifa di Dubai", value: 828, unit: "metri di altezza", category: "Mondo", note: "L'edificio più alto del mondo." },
  { id: "alt-torreeiffel", label: "La Torre Eiffel", value: 330, unit: "metri di altezza", category: "Mondo", note: "Doveva essere smontata dopo vent'anni." },
  { id: "alt-empirestate", label: "L'Empire State Building", value: 381, unit: "metri di altezza", category: "Mondo", note: "Costruito in soli quattrocentodieci giorni." },
  { id: "alt-statualiberta", label: "La Statua della Libertà", value: 93, unit: "metri di altezza", category: "Mondo", note: "Altezza compresa il basamento; un dono della Francia." },
  { id: "alt-torrepisa", label: "La Torre di Pisa", value: 57, unit: "metri di altezza", category: "Mondo", note: "Pende di quasi quattro gradi." },
  { id: "alt-colosseo", label: "Il Colosseo", value: 48, unit: "metri di altezza", category: "Mondo", note: "Poteva ospitare oltre cinquantamila spettatori." },
  { id: "alt-cristoredentore", label: "Il Cristo Redentore di Rio", value: 38, unit: "metri di altezza", category: "Mondo", note: "Senza contare il piedistallo di otto metri." },

  // ─────────────── LUNGHEZZA (chilometri) ───────────────
  { id: "len-nilo", label: "Il fiume Nilo", value: 6650, unit: "chilometri", category: "Natura", note: "Conteso con il Rio delle Amazzoni come fiume più lungo." },
  { id: "len-amazzoni", label: "Il Rio delle Amazzoni", value: 6400, unit: "chilometri", category: "Natura", note: "Il fiume con la maggiore portata d'acqua al mondo." },
  { id: "len-muraglia", label: "La Grande Muraglia cinese", value: 21000, unit: "chilometri", category: "Mondo", note: "Contando tutte le diramazioni costruite nei secoli." },
  { id: "len-po", label: "Il fiume Po", value: 652, unit: "chilometri", category: "Natura", note: "Il fiume più lungo d'Italia." },
  { id: "len-tevere", label: "Il fiume Tevere", value: 405, unit: "chilometri", category: "Natura", note: "Il terzo fiume italiano per lunghezza." },
  { id: "len-romamilano", label: "La distanza tra Roma e Milano", value: 570, unit: "chilometri", category: "Mondo", note: "Circa tre ore in treno ad alta velocità." },
  { id: "len-romanapoli", label: "La distanza tra Roma e Napoli", value: 225, unit: "chilometri", category: "Mondo", note: "Poco più di un'ora in treno veloce." },
  { id: "len-parigilondra", label: "La distanza tra Parigi e Londra", value: 344, unit: "chilometri", category: "Mondo", note: "Collegate dal tunnel sotto la Manica." },
  { id: "len-terra-luna", label: "La distanza tra la Terra e la Luna", value: 384400, unit: "chilometri", category: "Natura", note: "La luce impiega poco più di un secondo a percorrerla." },
  { id: "len-circonferenza", label: "La circonferenza della Terra", value: 40075, unit: "chilometri", category: "Natura", note: "Misurata all'equatore." },

  // ─────────────── PESO (chilogrammi) ───────────────
  { id: "peso-balena", label: "Una balenottera azzurra", value: 150000, unit: "chilogrammi", category: "Natura", note: "L'animale più grande mai esistito sulla Terra." },
  { id: "peso-elefante", label: "Un elefante africano", value: 6000, unit: "chilogrammi", category: "Natura", note: "Il più grande animale terrestre vivente." },
  { id: "peso-ippopotamo", label: "Un ippopotamo", value: 1500, unit: "chilogrammi", category: "Natura", note: "Nonostante la mole, corre più veloce di un uomo." },
  { id: "peso-orsopolare", label: "Un orso polare", value: 450, unit: "chilogrammi", category: "Natura", note: "Il più grande carnivoro terrestre." },
  { id: "peso-leone", label: "Un leone adulto", value: 190, unit: "chilogrammi", category: "Natura", note: "Le femmine pesano circa un terzo in meno." },
  { id: "peso-panda", label: "Un panda gigante", value: 110, unit: "chilogrammi", category: "Natura", note: "Mangia bambù fino a quattordici ore al giorno." },
  { id: "peso-lingua-balena", label: "La lingua di una balenottera azzurra", value: 2700, unit: "chilogrammi", category: "Natura", note: "Pesa quanto un'automobile di grossa cilindrata." },

  // ─────────────── DURATA DI VITA (anni) ───────────────
  { id: "vita-tartaruga", label: "Una tartaruga delle Galapagos", value: 150, unit: "anni di vita media", category: "Natura", note: "Alcuni esemplari hanno superato i duecento anni." },
  { id: "vita-balena", label: "Una balena della Groenlandia", value: 200, unit: "anni di vita media", category: "Natura", note: "Il mammifero più longevo conosciuto." },
  { id: "vita-elefante", label: "Un elefante", value: 65, unit: "anni di vita media", category: "Natura", note: "Vive quasi quanto un essere umano." },
  { id: "vita-cane", label: "Un cane di taglia media", value: 13, unit: "anni di vita media", category: "Natura", note: "I cani piccoli vivono più a lungo dei grandi." },
  { id: "vita-gatto", label: "Un gatto domestico", value: 15, unit: "anni di vita media", category: "Natura", note: "I gatti che vivono in casa superano spesso i vent'anni." },
  { id: "vita-topo", label: "Un topolino", value: 2, unit: "anni di vita media", category: "Natura", note: "Vita brevissima, ma riproduzione rapidissima." },
  { id: "vita-farfalla", label: "Una farfalla comune", value: 1, unit: "anni di vita media", category: "Natura", note: "Molte specie vivono solo poche settimane." },

  // ─────────────── VELOCITÀ (chilometri orari) ───────────────
  { id: "vel-ghepardo", label: "Un ghepardo in corsa", value: 110, unit: "chilometri orari", category: "Natura", note: "L'animale terrestre più veloce, ma solo per poche centinaia di metri." },
  { id: "vel-falco", label: "Un falco pellegrino in picchiata", value: 350, unit: "chilometri orari", category: "Natura", note: "L'animale più veloce del pianeta." },
  { id: "vel-bolt", label: "Usain Bolt al massimo della corsa", value: 44, unit: "chilometri orari", category: "Sport", note: "Velocità di punta registrata durante il record mondiale." },
  { id: "vel-f1", label: "Una monoposto di Formula 1", value: 350, unit: "chilometri orari", category: "Sport", note: "Velocità di punta sui circuiti più veloci." },
  { id: "vel-aereo", label: "Un aereo di linea in volo", value: 900, unit: "chilometri orari", category: "Mondo", note: "Velocità di crociera tipica a diecimila metri." },
  { id: "vel-treno", label: "Un treno ad alta velocità italiano", value: 300, unit: "chilometri orari", category: "Mondo", note: "Velocità massima in servizio commerciale." },
  { id: "vel-cavallo", label: "Un cavallo al galoppo", value: 70, unit: "chilometri orari", category: "Natura", note: "Solo per brevi distanze." },

  // ─────────────── INCASSI FILM (milioni di dollari) ───────────────
  { id: "inc-avatar", label: "Il film Avatar", value: 2920, unit: "milioni di dollari incassati", category: "Cinema", note: "Il film che ha incassato di più nella storia del cinema." },
  { id: "inc-avengers", label: "Il film Avengers: Endgame", value: 2799, unit: "milioni di dollari incassati", category: "Cinema", note: "Ha superato Avatar per un breve periodo." },
  { id: "inc-titanic", label: "Il film Titanic", value: 2260, unit: "milioni di dollari incassati", category: "Cinema", note: "Rimasto in vetta per dodici anni consecutivi." },
  { id: "inc-starwars7", label: "Il film Star Wars: Il risveglio della Forza", value: 2070, unit: "milioni di dollari incassati", category: "Cinema", note: "Il maggiore incasso di sempre negli Stati Uniti." },
  { id: "inc-jurassic", label: "Il film Jurassic World", value: 1670, unit: "milioni di dollari incassati", category: "Cinema", note: "Il ritorno dei dinosauri dopo ventidue anni." },
  { id: "inc-relune", label: "Il film Il Re Leone del 2019", value: 1660, unit: "milioni di dollari incassati", category: "Cinema", note: "Il remake in computer grafica del classico animato." },
  { id: "inc-frozen2", label: "Il film Frozen 2", value: 1450, unit: "milioni di dollari incassati", category: "Cinema", note: "Il film d'animazione con il maggiore incasso di sempre." },
  { id: "inc-harrypotter", label: "L'ultimo film di Harry Potter", value: 1340, unit: "milioni di dollari incassati", category: "Cinema", note: "Il capitolo finale della saga, uscito nel 2011." },

  // ─────────────── CURIOSITÀ (numeri assoluti) ───────────────
  { id: "cur-ossa", label: "Le ossa di un neonato", value: 300, unit: "in totale", category: "Curiosità", note: "Crescendo alcune si fondono e scendono a duecentosei." },
  { id: "cur-ossa-adulto", label: "Le ossa di un adulto", value: 206, unit: "in totale", category: "Curiosità", note: "Oltre la metà si trovano nelle mani e nei piedi." },
  { id: "cur-denti", label: "I denti di un adulto", value: 32, unit: "in totale", category: "Curiosità", note: "Compresi i quattro denti del giudizio." },
  { id: "cur-denti-squalo", label: "I denti che uno squalo perde in vita", value: 30000, unit: "in totale", category: "Curiosità", note: "Li sostituisce continuamente per tutta la vita." },
  { id: "cur-cuore", label: "I battiti del cuore in un giorno", value: 100000, unit: "in totale", category: "Curiosità", note: "Circa settanta al minuto a riposo." },
  { id: "cur-capelli", label: "I capelli sulla testa di una persona", value: 100000, unit: "in totale", category: "Curiosità", note: "Ne perdiamo fino a cento al giorno." },
  { id: "cur-muscoli", label: "I muscoli del corpo umano", value: 650, unit: "in totale", category: "Curiosità", note: "Ne servono oltre quaranta solo per aggrottare la fronte." },
  { id: "cur-zampe-millepiedi", label: "Le zampe di un millepiedi comune", value: 200, unit: "in totale", category: "Curiosità", note: "Il nome inganna: quasi nessuno ne ha mille." },
  { id: "cur-scacchi", label: "Le caselle di una scacchiera", value: 64, unit: "in totale", category: "Curiosità", note: "Otto file per otto colonne." },
  { id: "cur-carte", label: "Le carte di un mazzo da poker", value: 52, unit: "in totale", category: "Curiosità", note: "Senza contare i jolly." },
  { id: "cur-tasti", label: "I tasti di un pianoforte", value: 88, unit: "in totale", category: "Curiosità", note: "Cinquantadue bianchi e trentasei neri." },
  { id: "cur-paesi-onu", label: "Gli stati membri dell'ONU", value: 193, unit: "in totale", category: "Curiosità", note: "Più due stati osservatori, tra cui il Vaticano." },
  { id: "cur-elementi", label: "Gli elementi della tavola periodica", value: 118, unit: "in totale", category: "Curiosità", note: "Gli ultimi sono stati creati artificialmente." },

  // ─────────────── SPORT (numeri) ───────────────
  { id: "sp-mondiali-brasile", label: "I Mondiali di calcio vinti dal Brasile", value: 5, unit: "in totale", category: "Sport", note: "Il paese più vincente nella storia del torneo." },
  { id: "sp-mondiali-italia", label: "I Mondiali di calcio vinti dall'Italia", value: 4, unit: "in totale", category: "Sport", note: "L'ultimo nel 2006 in Germania." },
  { id: "sp-champions-real", label: "Le Champions League vinte dal Real Madrid", value: 15, unit: "in totale", category: "Sport", note: "Nessun club si avvicina a questo numero." },
  { id: "sp-champions-milan", label: "Le Champions League vinte dal Milan", value: 7, unit: "in totale", category: "Sport", note: "Il club italiano più vincente in Europa." },
  { id: "sp-palloni-messi", label: "I Palloni d'Oro vinti da Messi", value: 8, unit: "in totale", category: "Sport", note: "Record assoluto nella storia del premio." },
  { id: "sp-slam-djokovic", label: "I tornei del Grande Slam vinti da Djokovic", value: 24, unit: "in totale", category: "Sport", note: "Record maschile assoluto." },
  { id: "sp-ori-phelps", label: "Gli ori olimpici di Michael Phelps", value: 23, unit: "in totale", category: "Sport", note: "Nessun atleta si è mai avvicinato." },
  { id: "sp-titoli-schumacher", label: "I titoli mondiali di Formula 1 di Schumacher", value: 7, unit: "in totale", category: "Sport", note: "Record eguagliato da Lewis Hamilton." },
  { id: "sp-giocatori-calcio", label: "I giocatori in campo in una squadra di calcio", value: 11, unit: "in totale", category: "Sport", note: "Portiere compreso." },
  { id: "sp-giocatori-basket", label: "I giocatori in campo in una squadra di basket", value: 5, unit: "in totale", category: "Sport", note: "Con sette in panchina nelle competizioni ufficiali." },

  // ─────────────── TEMPERATURA (gradi) ───────────────
  { id: "temp-sole", label: "La superficie del Sole", value: 5500, unit: "gradi centigradi", category: "Natura", note: "Il nucleo arriva a quindici milioni di gradi." },
  { id: "temp-lava", label: "La lava di un vulcano", value: 1100, unit: "gradi centigradi", category: "Natura", note: "Abbastanza da fondere il rame." },
  { id: "temp-forno", label: "Un forno per la pizza napoletana", value: 450, unit: "gradi centigradi", category: "Curiosità", note: "Cuoce una pizza in meno di novanta secondi." },
  { id: "temp-corpo", label: "Il corpo umano in salute", value: 37, unit: "gradi centigradi", category: "Curiosità", note: "Varia di qualche decimo durante la giornata." },
  { id: "temp-antartide", label: "Il record di freddo in Antartide", value: -89, unit: "gradi centigradi", category: "Natura", note: "Misurato alla base russa di Vostok nel 1983." },
];
