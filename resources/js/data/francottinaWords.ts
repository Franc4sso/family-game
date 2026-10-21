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

/** Film: la soluzione è un titolo, oppure una parola che compare in tre titoli famosi. */
const FILM: Entry[] = [
  { id: "film-notte", answer: "NOTTE", clues: ["LEONI", "MUSEO", "ESAMI"], links: ["Una notte da leoni", "Una notte al museo", "Notte prima degli esami"] },
  { id: "film-vita", answer: "VITA", clues: ["PI", "DOLCE", "BELLA"], links: ["Vita di Pi", "La dolce vita", "La vita è bella"] },
  { id: "film-re", answer: "RE", clues: ["DISCORSO", "RITORNO", "LEONE"], links: ["Il discorso del re", "Il ritorno del re", "Il re leone"] },
  { id: "film-paradiso", answer: "PARADISO", clues: ["ATTENDERE", "AMARO", "CINEMA"], links: ["Il paradiso può attendere", "Paradiso amaro", "Nuovo Cinema Paradiso"] },
  { id: "film-padrino", answer: "IL PADRINO", clues: ["OFFERTA", "CORLEONE", "BRANDO"], links: ["\"Gli farò un'offerta che non potrà rifiutare\"", "la famiglia Corleone", "Marlon Brando è don Vito"] },
  { id: "film-titanic", answer: "TITANIC", clues: ["FRANCESI", "VOLARE", "PORTA"], links: ["\"Disegnami come una delle tue ragazze francesi\"", "\"Jack, sto volando!\"", "sulla porta c'era posto per due"] },
  { id: "film-star-wars", answer: "STAR WARS", clues: ["SORELLA", "MANO", "PADRE"], links: ["Luke bacia Leia, che è sua sorella", "Luke perde la mano", "\"Io sono tuo padre\""] },
  { id: "film-harry-potter", answer: "HARRY POTTER", clues: ["METTERE FIFA", "CALZINO", "MORTE"], links: ["Malfoy: \"Hai fifa, Potter?\"", "Dobby liberato con un calzino", "I Doni della Morte"] },
  { id: "film-jurassic-park", answer: "JURASSIC PARK", clues: ["ZANZARA", "SPIELBERG", "DINOSAURI"], links: ["il DNA dalla zanzara nell'ambra", "diretto da Steven Spielberg", "il parco dei dinosauri"] },
  { id: "film-fantozzi", answer: "FANTOZZI", clues: ["NUVOLA", "MEGADIRETTORE", "CORAZZATA"], links: ["la nuvola dell'impiegato", "il Megadirettore Galattico", "\"La corazzata Kotiomkin è una...\""] },
  { id: "film-rocky", answer: "ROCKY", clues: ["TARTARUGHE", "UOVA", "CARNE"], links: ["le tartarughe Cuff e Link", "beve le uova crude", "prende a pugni le carcasse"] },
  { id: "film-nemo", answer: "NEMO", clues: ["MIO", "SMEMORATA", "DENTISTA"], links: ["i gabbiani \"Mio! Mio!\"", "Dory la smemorata", "l'acquario dal dentista"] },
  { id: "film-gladiatore", answer: "IL GLADIATORE", clues: ["SPIGHE", "POLLICE", "INFERNO"], links: ["la mano che accarezza il grano", "il pollice di Commodo", "\"Al mio segnale scatenate l'inferno\""] },
  { id: "film-forrest-gump", answer: "FORREST GUMP", clues: ["GAMBERI", "CIOCCOLATINI", "CORSA"], links: ["i gamberi di Bubba", "\"La vita è come una scatola di cioccolatini\"", "\"Corri Forrest, corri!\""] },
  { id: "film-ritorno-al-futuro", answer: "RITORNO AL FUTURO", clues: ["88", "FULMINE", "MAMMA"], links: ["le 88 miglia orarie", "il fulmine sulla torre dell'orologio", "la madre di Marty si innamora di lui"] },
  { id: "film-signore-anelli", answer: "IL SIGNORE DEGLI ANELLI", clues: ["SECONDA COLAZIONE", "AQUILE", "TESORO"], links: ["gli hobbit e la seconda colazione", "\"Perché non ci sono andati con le aquile?\"", "\"Il mio tesssoro\""] },
  { id: "film-mamma-aereo", answer: "MAMMA HO PERSO L'AEREO", clues: ["TARANTOLA", "DOPOBARBA", "NATALE"], links: ["la tarantola in faccia ai ladri", "l'urlo col dopobarba", "ogni Natale in TV"] },
  { id: "film-shining", answer: "SHINING", clues: ["LABIRINTO", "GEMELLE", "JOHNNY"], links: ["il labirinto nella neve", "le gemelle nel corridoio", "\"Here's Johnny!\""] },
];

const SERIE_TV: Entry[] = [
  { id: "tv-breaking-bad", answer: "BREAKING BAD", clues: ["PIZZA", "POLLO", "NOME"], links: ["Walt lancia la pizza sul tetto", "Los Pollos Hermanos", "\"Say my name\""] },
  { id: "tv-casa-di-carta", answer: "LA CASA DI CARTA", clues: ["STOCCOLMA", "DALÌ", "TUTA"], links: ["Mónica diventa Stoccolma, come la sindrome", "le maschere di Dalí", "le tute rosse"] },
  { id: "tv-trono-di-spade", answer: "IL TRONO DI SPADE", clues: ["VERGOGNA", "NOZZE", "HODOR"], links: ["Cersei e la campana: \"Vergogna!\"", "le Nozze Rosse", "Hodor tiene la porta"] },
  { id: "tv-friends", answer: "FRIENDS", clues: ["PIVOT", "PAUSA", "TACCHINO"], links: ["Ross e il divano sulle scale: \"Pivot!\"", "\"Eravamo in pausa!\"", "Monica col tacchino in testa"] },
  { id: "tv-stranger-things", answer: "STRANGER THINGS", clues: ["NASO", "LUCI", "WAFFLE"], links: ["Undici sanguina dal naso", "le lucine di Natale per parlare con Will", "i waffle"] },
  { id: "tv-gomorra", answer: "GOMORRA", clues: ["SENZA PENSIERI", "VELE", "GENNY"], links: ["\"Stai senza pensieri\"", "le Vele di Scampia", "Genny Savastano"] },
  { id: "tv-squid-game", answer: "SQUID GAME", clues: ["BISCOTTO", "TUTA VERDE", "UN DUE TRE STELLA"], links: ["il biscotto da intagliare", "le tute verdi dei giocatori", "il gioco della bambola"] },
  { id: "tv-montalbano", answer: "MONTALBANO", clues: ["ARANCINI", "VIGATA", "ZINGARETTI"], links: ["Gli arancini di Montalbano", "il commissariato di Vigàta", "interpretato da Luca Zingaretti"] },
  { id: "tv-simpson", answer: "I SIMPSON", clues: ["STRANGOLARE", "DUFF", "PREVEDERE"], links: ["Homer strangola Bart", "la birra Duff", "\"I Simpson l'avevano previsto\""] },
  { id: "tv-mercoledi", answer: "MERCOLEDÌ", clues: ["SORRIDERE", "MANO", "TIKTOK"], links: ["non sorride mai", "Mano, la mano che cammina", "il ballo virale su TikTok"] },
  { id: "tv-don-matteo", answer: "DON MATTEO", clues: ["SPOLETO", "BICICLETTA", "TERENCE HILL"], links: ["ambientata a Gubbio e poi Spoleto", "il prete in bicicletta", "interpretato da Terence Hill"] },
  { id: "tv-lost", answer: "LOST", clues: ["FINALE", "ORSO POLARE", "NUMERI"], links: ["il finale che nessuno ha capito", "l'orso polare nella giungla", "4 8 15 16 23 42"] },
  { id: "tv-rex", answer: "IL COMMISSARIO REX", clues: ["PANINO", "VIENNA", "PASTORE"], links: ["il panino col würstel che ruba", "il commissariato di Vienna", "è un pastore tedesco"] },
  { id: "tv-peaky-blinders", answer: "PEAKY BLINDERS", clues: ["LAMETTE", "BIRMINGHAM", "TOMMY"], links: ["le lamette cucite nel berretto", "la Birmingham degli anni '20", "Tommy Shelby"] },
  { id: "tv-signora-in-giallo", answer: "LA SIGNORA IN GIALLO", clues: ["VACANZA", "MACCHINA DA SCRIVERE", "PENSIONATA"], links: ["mai andare in vacanza con lei, qualcuno muore", "scrive gialli a macchina", "la pensionata che risolve più omicidi della polizia"] },
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
