export type FrancottinaCategory = "Classiche" | "Film" | "Serie TV" | "Cartoni" | "Musica";

export interface FrancottinaWord {
  id: string;
  category: FrancottinaCategory;
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

type Entry = Omit<FrancottinaWord, "category">;

const inCategory = (category: FrancottinaCategory, entries: Entry[]): FrancottinaWord[] =>
  entries.map((e) => ({ ...e, category }));

const CLASSICHE: Entry[] = [
  { id: "cavallo", answer: "CAVALLO", clues: ["VAPORE", "TROIA", "DONDOLO"], links: ["il cavallo vapore", "il cavallo di Troia", "il cavallo a dondolo"] },
  { id: "occhio", answer: "OCCHIO", clues: ["TRIGLIA", "BUE", "NERO"], links: ["fare gli occhi di triglia", "l'uovo all'occhio di bue", "l'occhio nero dopo un pugno"] },
  { id: "latte", answer: "LATTE", clues: ["GALLINA", "DENTI", "CAFFÈ"], links: ["il latte di gallina", "i denti da latte", "il caffellatte"] },
  { id: "torre", answer: "TORRE", clues: ["CONTROLLO", "BABELE", "PISA"], links: ["la torre di controllo", "la torre di Babele", "la torre di Pisa"] },
  { id: "casa", answer: "CASA", clues: ["CURA", "BAMBOLE", "DOLCE"], links: ["la casa di cura", "la casa delle bambole", "casa dolce casa"] },
  { id: "vino", answer: "VINO", clues: ["SANTO", "BRULÈ", "ROSSO"], links: ["il vin santo", "il vin brulè", "il vino rosso"] },
  { id: "bianco", answer: "BIANCO", clues: ["CARTA", "MANGIARE", "NEVE"], links: ["dare carta bianca", "mangiare in bianco", "bianco come la neve"] },
  { id: "nero", answer: "NERO", clues: ["CRONACA", "LAVORO", "PECORA"], links: ["la cronaca nera", "il lavoro in nero", "la pecora nera"] },
  { id: "giro", answer: "GIRO", clues: ["VITE", "BOA", "ITALIA"], links: ["un giro di vite", "il giro di boa", "il Giro d'Italia"] },
  { id: "punto", answer: "PUNTO", clues: ["MORTO", "FERMO", "VISTA"], links: ["il punto morto", "mettere un punto fermo", "il punto di vista"] },
  { id: "libro", answer: "LIBRO", clues: ["PAGA", "GUINNESS", "GIUNGLA"], links: ["il libro paga", "il libro dei Guinness dei primati", "Il libro della giungla"] },
  { id: "monte", answer: "MONTE", clues: ["PIETÀ", "PREMI", "CARLO"], links: ["il Monte di Pietà", "il montepremi", "Montecarlo"] },
  { id: "borsa", answer: "BORSA", clues: ["NERA", "VALORI", "ACQUA"], links: ["la borsa nera", "la Borsa valori", "la borsa dell'acqua calda"] },
  { id: "uovo", answer: "UOVO", clues: ["COLOMBO", "SODO", "PASQUA"], links: ["l'uovo di Colombo", "l'uovo sodo", "l'uovo di Pasqua"] },
  { id: "gallina", answer: "GALLINA", clues: ["FARAONA", "VECCHIA", "UOVA"], links: ["la gallina faraona", "gallina vecchia fa buon brodo", "la gallina dalle uova d'oro"] },
  { id: "mosca", answer: "MOSCA", clues: ["BIANCA", "CIECA", "RUSSIA"], links: ["una mosca bianca", "il gioco di mosca cieca", "Mosca, capitale della Russia"] },
  { id: "scala", answer: "SCALA", clues: ["RICHTER", "MOBILE", "MILANO"], links: ["la scala Richter", "la scala mobile", "la Scala di Milano"] },
  { id: "ponte", answer: "PONTE", clues: ["SOSPIRI", "LEVATOIO", "STRETTO"], links: ["il Ponte dei Sospiri", "il ponte levatoio", "il ponte sullo Stretto"] },
  { id: "croce", answer: "CROCE", clues: ["UNCINATA", "SANTA", "ROSSA"], links: ["la croce uncinata", "Santa Croce, a Firenze", "la Croce Rossa"] },
  { id: "buco", answer: "BUCO", clues: ["SERRATURA", "OZONO", "NERO"], links: ["il buco della serratura", "il buco dell'ozono", "il buco nero"] },
  { id: "gioco", answer: "GIOCO", clues: ["SPORCO", "PAROLE", "OCA"], links: ["il gioco sporco", "il gioco di parole", "il gioco dell'oca"] },
  { id: "sale", answer: "SALE", clues: ["INGLESE", "ZUCCA", "GROSSO"], links: ["il sale inglese", "avere sale in zucca", "il sale grosso"] },
  { id: "tetto", answer: "TETTO", clues: ["SCOTTA", "SPIOVENTE", "MONDO"], links: ["La gatta sul tetto che scotta", "il tetto spiovente", "il tetto del mondo"] },
  { id: "collo", answer: "COLLO", clues: ["BOTTIGLIA", "TORCI", "GIRAFFA"], links: ["il collo di bottiglia", "il torcicollo", "il collo della giraffa"] },
  { id: "dente", answer: "DENTE", clues: ["LEONE", "GIUDIZIO", "PASTA"], links: ["il dente di leone", "il dente del giudizio", "la pasta al dente"] },
  { id: "piatto", answer: "PIATTO", clues: ["PIANGE", "DOCCIA", "FORTE"], links: ["il piatto piange, a poker", "il piatto doccia", "il piatto forte"] },
  { id: "camera", answer: "CAMERA", clues: ["OSCURA", "DEPUTATI", "LETTO"], links: ["la camera oscura", "la Camera dei deputati", "la camera da letto"] },
  { id: "fiore", answer: "FIORE", clues: ["OCCHIELLO", "LOTO", "ARANCIO"], links: ["il fiore all'occhiello", "il fior di loto", "i fiori d'arancio"] },
  { id: "rosa", answer: "ROSA", clues: ["VENTI", "MAGLIA", "SPINE"], links: ["la rosa dei venti", "la maglia rosa", "non c'è rosa senza spine"] },
  { id: "chiodo", answer: "CHIODO", clues: ["GAROFANO", "SCACCIA", "FISSO"], links: ["i chiodi di garofano", "chiodo scaccia chiodo", "il chiodo fisso"] },
  { id: "guerra", answer: "GUERRA", clues: ["FREDDA", "PACE", "MONDIALE"], links: ["la guerra fredda", "Guerra e pace", "la guerra mondiale"] },
  { id: "parola", answer: "PAROLA", clues: ["ORDINE", "ONORE", "CROCIATE"], links: ["la parola d'ordine", "parola d'onore", "le parole crociate"] },
  { id: "luce", answer: "LUCE", clues: ["ANNO", "ROSSE", "BOLLETTA"], links: ["l'anno luce", "le luci rosse", "la bolletta della luce"] },
  { id: "treno", answer: "TRENO", clues: ["MERCI", "FANTASMA", "BINARIO"], links: ["il treno merci", "il treno fantasma del luna park", "il treno parte dal binario"] },
  { id: "sedia", answer: "SEDIA", clues: ["ELETTRICA", "SDRAIO", "ROTELLE"], links: ["la sedia elettrica", "la sedia a sdraio", "la sedia a rotelle"] },
  { id: "mondo", answer: "MONDO", clues: ["TERZO", "GIRO", "COPPA"], links: ["il Terzo mondo", "il giro del mondo", "la Coppa del Mondo"] },
  { id: "verde", answer: "VERDE", clues: ["NUMERO", "POLLICE", "SEMAFORO"], links: ["il numero verde", "avere il pollice verde", "il semaforo verde"] },
  { id: "giallo", answer: "GIALLO", clues: ["PAGINE", "CARTELLINO", "ROMANZO"], links: ["le Pagine Gialle", "il cartellino giallo", "il romanzo giallo"] },
  { id: "orecchio", answer: "ORECCHIO", clues: ["ASSOLUTO", "MERCANTE", "PULCE"], links: ["l'orecchio assoluto", "fare orecchie da mercante", "la pulce nell'orecchio"] },
  { id: "aria", answer: "ARIA", clues: ["FRITTA", "CASTELLI", "CONDIZIONATA"], links: ["l'aria fritta", "i castelli in aria", "l'aria condizionata"] },
  { id: "calcio", answer: "CALCIO", clues: ["BALILLA", "ANGOLO", "RIGORE"], links: ["il calciobalilla", "il calcio d'angolo", "il calcio di rigore"] },
];

/** Film: la soluzione è un titolo, oppure una parola che compare in tre titoli famosi. */
const FILM: Entry[] = [
  { id: "film-amici", answer: "AMICI", clues: ["BAR MARGHERITA", "MIEI", "QUASI"], links: ["Gli amici del bar Margherita", "Amici miei", "Quasi amici"] },
  { id: "film-donna", answer: "DONNA", clues: ["DUE VOLTE", "CARRIERA", "PROFUMO"], links: ["La donna che visse due volte", "Una donna in carriera", "Profumo di donna"] },
  { id: "film-matrix", answer: "MATRIX", clues: ["CUCCHIAIO", "PILLOLA", "NEO"], links: ["\"Il cucchiaio non esiste\"", "pillola rossa o pillola blu", "Neo, l'Eletto"] },
  { id: "film-pulp-fiction", answer: "PULP FICTION", clues: ["VALIGETTA", "ROYALE", "TWIST"], links: ["la valigetta che brilla", "il \"Royale con formaggio\"", "il twist di Mia e Vincent"] },
  { id: "film-squalo", answer: "LO SQUALO", clues: ["AMITY", "BARCA", "PINNA"], links: ["l'isola di Amity", "\"Ci serve una barca più grande\"", "la pinna che spunta dall'acqua"] },
  { id: "film-et", answer: "E.T.", clues: ["CARAMELLE", "BICICLETTA", "TELEFONO CASA"], links: ["Elliott lo attira con le caramelle", "la bici che vola davanti alla luna", "\"E.T. telefono casa\""] },
  { id: "film-pretty-woman", answer: "PRETTY WOMAN", clues: ["RODEO DRIVE", "STIVALI", "JULIA ROBERTS"], links: ["lo shopping a Rodeo Drive", "gli stivali alti al ginocchio", "Julia Roberts e Richard Gere"] },
  { id: "film-mamma-mia", answer: "MAMMA MIA!", clues: ["GRECIA", "TRE PADRI", "ABBA"], links: ["girato su un'isola greca", "Sophie invita i suoi tre possibili padri", "le canzoni degli ABBA"] },
  { id: "film-ghost", answer: "GHOST", clues: ["MONETA", "TORNIO", "SWAYZE"], links: ["Sam sposta la monetina lungo la porta", "la scena al tornio con l'argilla", "Patrick Swayze e Demi Moore"] },
  { id: "film-indiana-jones", answer: "INDIANA JONES", clues: ["SERPENTI", "MASSO", "FRUSTA"], links: ["\"Serpenti... perché proprio i serpenti?\"", "il masso che rotola", "la frusta e il cappello"] },
  { id: "film-joker", answer: "JOKER", clues: ["SCALINATA", "GOTHAM", "RISATA"], links: ["il ballo sulla scalinata", "la città di Gotham", "la risata che non riesce a fermare"] },
  { id: "film-avatar", answer: "AVATAR", clues: ["NA'VI", "PANDORA", "BLU"], links: ["il popolo dei Na'vi", "la luna Pandora", "gli alieni blu"] },
  { id: "film-grease", answer: "GREASE", clues: ["PINK LADIES", "TRAVOLTA", "BRILLANTINA"], links: ["le Pink Ladies", "John Travolta è Danny", "il titolo italiano: Grease - Brillantina"] },
  { id: "film-perfetti-sconosciuti", answer: "PERFETTI SCONOSCIUTI", clues: ["ECLISSI", "CENA", "CELLULARI"], links: ["la sera dell'eclissi di luna", "una cena tra amici", "i cellulari a faccia in su sul tavolo"] },
  { id: "film-quo-vado", answer: "QUO VADO?", clues: ["NORVEGIA", "POSTO FISSO", "ZALONE"], links: ["trasferito fino in Norvegia", "non vuole lasciare il posto fisso", "Checco Zalone"] },
  { id: "film-vacanze-natale", answer: "VACANZE DI NATALE", clues: ["1983", "CORTINA", "CINEPANETTONE"], links: ["uscito nel 1983", "ambientato a Cortina", "il primo cinepanettone"] },
  { id: "film-miglio-verde", answer: "IL MIGLIO VERDE", clues: ["COFFEY", "TOPOLINO", "SEDIA ELETTRICA"], links: ["il gigante John Coffey", "il topolino Mr. Jingles", "il braccio della morte e la sedia elettrica"] },
  { id: "film-silenzio-innocenti", answer: "IL SILENZIO DEGLI INNOCENTI", clues: ["CHIANTI", "FAVE", "LECTER"], links: ["\"...con un buon Chianti\"", "\"...con contorno di fave\"", "Hannibal Lecter"] },
  { id: "film-spider-man", answer: "SPIDER-MAN", clues: ["ZIO BEN", "MORSO", "RAGNATELA"], links: ["\"Da un grande potere derivano grandi responsabilità\"", "il morso del ragno", "spara le ragnatele"] },
  { id: "film-pirati-caraibi", answer: "PIRATI DEI CARAIBI", clues: ["RUM", "PERLA NERA", "SPARROW"], links: ["\"Perché il rum è finito?\"", "la nave Perla Nera", "il capitano Jack Sparrow"] },
  { id: "film-avengers", answer: "AVENGERS", clues: ["SHAWARMA", "SCHIOCCO", "THANOS"], links: ["lo shawarma dopo la battaglia", "lo schiocco di dita che dimezza l'universo", "il cattivo Thanos"] },
  { id: "film-truman-show", answer: "THE TRUMAN SHOW", clues: ["SEAHAVEN", "BUONANOTTE", "REALITY"], links: ["la città finta di Seahaven", "\"Buon pomeriggio, buonasera e buonanotte\"", "la sua vita è un reality"] },
];

const SERIE_TV: Entry[] = [
  { id: "tv-the-office", answer: "THE OFFICE", clues: ["SCRANTON", "DUNDER MIFFLIN", "MICHAEL SCOTT"], links: ["la sede di Scranton", "l'azienda di carta Dunder Mifflin", "il capo Michael Scott"] },
  { id: "tv-himym", answer: "HOW I MET YOUR MOTHER", clues: ["CORNO BLU", "LEGGENDARIO", "BARNEY"], links: ["il corno francese blu rubato da Ted", "\"Leggen... aspetta... dario!\"", "Barney Stinson"] },
  { id: "tv-dr-house", answer: "DR. HOUSE", clues: ["LUPUS", "VICODIN", "BASTONE"], links: ["\"Non è mai lupus\"", "le pastiglie di Vicodin", "zoppica col bastone"] },
  { id: "tv-greys-anatomy", answer: "GREY'S ANATOMY", clues: ["TRAGHETTO", "SEATTLE", "MEREDITH"], links: ["l'incidente del traghetto", "l'ospedale di Seattle", "Meredith Grey"] },
  { id: "tv-un-posto-al-sole", answer: "UN POSTO AL SOLE", clues: ["PALLADINI", "POSILLIPO", "RAI 3"], links: ["Palazzo Palladini", "a Posillipo, Napoli", "la soap di Rai 3 dal 1996"] },
  { id: "tv-cesaroni", answer: "I CESARONI", clues: ["BOTTIGLIERIA", "AMENDOLA", "GARBATELLA"], links: ["la bottiglieria di famiglia", "Claudio Amendola è Giulio", "il quartiere della Garbatella"] },
  { id: "tv-medico-famiglia", answer: "UN MEDICO IN FAMIGLIA", clues: ["CETTINA", "LELE", "NONNO LIBERO"], links: ["Cettina, la governante", "il dottor Lele Martini", "Lino Banfi è nonno Libero"] },
  { id: "tv-sex-and-the-city", answer: "SEX AND THE CITY", clues: ["MANOLO", "MR. BIG", "CARRIE"], links: ["le scarpe Manolo Blahnik", "Mr. Big", "Carrie Bradshaw"] },
  { id: "tv-walking-dead", answer: "THE WALKING DEAD", clues: ["LUCILLE", "SCERIFFO", "ZOMBIE"], links: ["Lucille, la mazza di Negan", "Rick è uno sceriffo", "l'apocalisse zombie"] },
  { id: "tv-mare-fuori", answer: "MARE FUORI", clues: ["IPM", "ROSA RICCI", "CARCERE MINORILE"], links: ["l'IPM, istituto penale per minorenni", "Rosa Ricci", "il carcere minorile di Napoli"] },
  { id: "tv-bridgerton", answer: "BRIDGERTON", clues: ["WHISTLEDOWN", "DUCA", "DEBUTTANTI"], links: ["i pettegolezzi di Lady Whistledown", "Daphne e il duca di Hastings", "la stagione delle debuttanti"] },
  { id: "tv-the-crown", answer: "THE CROWN", clues: ["CORGI", "WINDSOR", "ELISABETTA"], links: ["i corgi della regina", "la famiglia Windsor", "la regina Elisabetta II"] },
  { id: "tv-narcos", answer: "NARCOS", clues: ["PLATA O PLOMO", "MEDELLÍN", "ESCOBAR"], links: ["\"Plata o plomo\"", "il cartello di Medellín", "Pablo Escobar"] },
  { id: "tv-scrubs", answer: "SCRUBS", clues: ["JANITOR", "SACRO CUORE", "J.D."], links: ["l'inserviente che tormenta J.D.", "l'ospedale Sacro Cuore", "J.D. e i suoi sogni a occhi aperti"] },
  { id: "tv-happy-days", answer: "HAPPY DAYS", clues: ["MILWAUKEE", "JUKEBOX", "FONZIE"], links: ["ambientata a Milwaukee", "Fonzie accende il jukebox con un colpo", "\"Heyyy!\""] },
  { id: "tv-beautiful", answer: "BEAUTIFUL", clues: ["SPECTRA", "FORRESTER", "RIDGE"], links: ["Sally Spectra, la rivale", "la casa di moda Forrester", "Ridge Forrester"] },
  { id: "tv-big-bang-theory", answer: "THE BIG BANG THEORY", clues: ["POSTO", "BAZINGA", "SHELDON"], links: ["\"Quello è il mio posto\"", "\"Bazinga!\"", "Sheldon Cooper"] },
  { id: "tv-soprano", answer: "I SOPRANO", clues: ["PAPERE", "PSICOLOGA", "NEW JERSEY"], links: ["le papere nella piscina di Tony", "le sedute dalla dottoressa Melfi", "il boss del New Jersey"] },
  { id: "tv-amica-geniale", answer: "L'AMICA GENIALE", clues: ["RIONE", "LENÙ", "FERRANTE"], links: ["il rione di Napoli", "Lenù e Lila", "dai romanzi di Elena Ferrante"] },
  { id: "tv-romanzo-criminale", answer: "ROMANZO CRIMINALE", clues: ["DANDI", "LIBANESE", "MAGLIANA"], links: ["il Dandi", "il Libanese", "la banda della Magliana"] },
];

const CARTONI: Entry[] = [
  { id: "cartoni-cenerentola", answer: "CENERENTOLA", clues: ["MEZZANOTTE", "ZUCCA", "SCARPETTA"], links: ["l'incantesimo finisce a mezzanotte", "la zucca diventa carrozza", "la scarpetta di cristallo"] },
  { id: "cartoni-pinocchio", answer: "PINOCCHIO", clues: ["ZECCHINI", "ASINO", "BENIGNI"], links: ["i cinque zecchini del Campo dei miracoli", "diventa un asino", "il film di Benigni"] },
  { id: "cartoni-biancaneve", answer: "BIANCANEVE", clues: ["CACCIATORE", "BRAME", "LAVORARE"], links: ["il cacciatore che la risparmia", "\"Specchio delle mie brame\"", "\"Andiamo a lavorar\""] },
  { id: "cartoni-topolino", answer: "TOPOLINO", clues: ["FIAT", "EDICOLA", "ORECCHIE"], links: ["la Fiat Topolino", "il giornalino in edicola", "il cerchietto con le orecchie di Disneyland"] },
  { id: "cartoni-shrek", answer: "SHREK", clues: ["ARRIVATI", "CIPOLLA", "PALUDE"], links: ["Ciuchino: \"Siamo arrivati?\"", "\"Gli orchi sono come le cipolle\"", "vive nella palude"] },
  { id: "cartoni-frozen", answer: "FROZEN", clues: ["GUANTI", "CAROTA", "SORGERÒ"], links: ["Elsa porta i guanti", "il naso di Olaf", "\"All'alba sorgerò\""] },
  { id: "cartoni-aladdin", answer: "ALADDIN", clues: ["PANE", "WILL SMITH", "TAPPETO"], links: ["ruba il pane al mercato", "il Genio del film del 2019", "il tappeto volante"] },
  { id: "cartoni-heidi", answer: "HEIDI", clues: ["FRANCOFORTE", "FORMAGGIO", "104"], links: ["va a vivere a Francoforte", "il formaggio fuso del nonno", "Clara e la legge 104"] },
  { id: "cartoni-sirenetta", answer: "LA SIRENETTA", clues: ["FORCHETTA", "VOCE", "GRANCHIO"], links: ["la forchetta usata come pettine", "vende la voce alla strega", "Sebastian il granchio"] },
  { id: "cartoni-bella-bestia", answer: "LA BELLA E LA BESTIA", clues: ["TEIERA", "BIBLIOTECA", "ROSA"], links: ["Mrs. Bric, la teiera", "la biblioteca del castello", "la rosa sotto la campana"] },
  { id: "cartoni-dragon-ball", answer: "DRAGON BALL", clues: ["NUVOLA", "SETTE", "CODA"], links: ["Goku vola sulla nuvola", "le sette sfere", "da piccolo Goku ha la coda"] },
  { id: "cartoni-pokemon", answer: "POKÉMON", clues: ["BERRETTO", "PALESTRE", "SCOSSA"], links: ["il berretto di Ash", "le palestre per le medaglie", "la scossa di Pikachu"] },
  { id: "cartoni-puffi", answer: "I PUFFI", clues: ["FUNGO", "BIRBA", "BLU"], links: ["vivono nei funghi", "Birba, il gatto di Gargamella", "sono blu"] },
  { id: "cartoni-winnie", answer: "WINNIE THE POOH", clues: ["PANTALONI", "ACRI", "DEPRESSO"], links: ["non porta i pantaloni", "il Bosco dei Cento Acri", "Ih-Oh, l'asino depresso"] },
  { id: "cartoni-toy-story", answer: "TOY STORY", clues: ["SERPENTE", "ARTIGLIO", "INFINITO"], links: ["\"C'è un serpente nel mio stivale\"", "gli alieni di Pizza Planet e la gru con l'artiglio", "\"Verso l'infinito e oltre\""] },
  { id: "cartoni-lupin", answer: "LUPIN III", clues: ["500", "INTERPOL", "GIACCA"], links: ["la Fiat 500 gialla", "l'ispettore Zenigata, dell'Interpol, che lo insegue da sempre", "la giacca verde, poi rossa"] },
];

const MUSICA: Entry[] = [
  { id: "musica-estate", answer: "ESTATE", clues: ["FINENDO", "ITALIANA", "ADDOSSO"], links: ["L'estate sta finendo (Righeira)", "Un'estate italiana (Bennato e Nannini)", "L'estate addosso (Jovanotti)"] },
  { id: "musica-amore", answer: "AMORE", clues: ["CAPOEIRA", "DISPERATO", "GRANDE"], links: ["Amore e capoeira (Takagi & Ketra)", "Amore disperato (Nada)", "Grande amore (Il Volo)"] },
  { id: "musica-vasco", answer: "VASCO ROSSI", clues: ["ZOCCA", "MODENA", "COCAINA"], links: ["il paese dove è cresciuto", "il concerto di Modena Park", "l'arresto del 1984"] },
  { id: "musica-celentano", answer: "CELENTANO", clues: ["SILENZI", "YUPPI DU", "GLUCK"], links: ["i suoi lunghi silenzi in TV", "il film Yuppi Du", "Il ragazzo della via Gluck"] },
  { id: "musica-sanremo", answer: "SANREMO", clues: ["BUGO", "VALLETTE", "ARISTON"], links: ["\"Dov'è Bugo?\"", "le vallette del Festival", "il teatro Ariston"] },
  { id: "musica-italiano", answer: "L'ITALIANO", clues: ["CANARINO", "AUTORADIO", "SPAGHETTI"], links: ["\"un canarino sopra la finestra\"", "\"l'autoradio sempre nella mano destra\"", "\"gli spaghetti al dente\""] },
];

/**
 * Pool della Francottina. La prima squadra vede solo clues[0], la seconda
 * anche clues[1], la terza tutte e tre: l'ordine conta.
 */
export const FRANCOTTINA_WORDS: FrancottinaWord[] = [
  ...inCategory("Classiche", CLASSICHE),
  ...inCategory("Film", FILM),
  ...inCategory("Serie TV", SERIE_TV),
  ...inCategory("Cartoni", CARTONI),
  ...inCategory("Musica", MUSICA),
];
