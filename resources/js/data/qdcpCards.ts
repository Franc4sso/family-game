export type QdcpCategory =
  | "Film"
  | "Canzone"
  | "Personaggio"
  | "Luogo"
  | "Evento"
  | "Oggetto"
  | "Sport"
  | "TV"
  | "Cibo"
  | "Concetto"
  | "Cartone"
  | "Videogioco"
  | "Animale"
  | "Libro"
  | "Marchio"
  | "Modo di dire"
  | "Mestiere";

export interface QdcpCard {
  id: string;
  /** Soluzione, mostrata al master e svelata a fine carta. */
  answer: string;
  /** Dettaglio per il master, per riconoscere risposte giuste ma imprecise. */
  detail?: string;
  category: QdcpCategory;
  /**
   * Sempre nell'ordine QUANDO, DOVE, COME, PERCHÉ, dal più criptico al più
   * facile. La soluzione non compare mai dentro un indizio.
   */
  clues: [string, string, string, string];
}

export const QDCP_CARDS: QdcpCard[] = [
  // ─── Film ───
  {
    id: "qd-001",
    answer: "Titanic",
    detail: "James Cameron, 1997 · DiCaprio e Kate Winslet",
    category: "Film",
    clues: [
      "In una notte d'aprile, con il mare calmo come una tavola.",
      "Tra violini che continuano a suonare e un'acqua gelida.",
      "Le braccia aperte a prua, e su quella porta c'era posto per uno solo.",
      "Perché l'iceberg non avvisa.",
    ],
  },
  {
    id: "qd-002",
    answer: "La vita è bella",
    detail: "Roberto Benigni, 1997",
    category: "Film",
    clues: [
      "Quando la storia si fa più buia, e una famiglia decide di riderci sopra.",
      "Prima ad Arezzo, poi in un posto da cui non si torna.",
      "Contando i punti di un gioco che esiste solo nella testa di un padre.",
      "Per vincere un carro armato vero. «Buongiorno, principessa!»",
    ],
  },
  {
    id: "qd-003",
    answer: "Il Re Leone",
    detail: "Disney, 1994",
    category: "Film",
    clues: [
      "All'alba, quando tutti gli animali si radunano per una nascita.",
      "Su una rupe che domina la savana.",
      "Sollevato in alto davanti a tutti, mentre parte un canto africano.",
      "Perché lo zio voleva il trono. Hakuna matata.",
    ],
  },
  {
    id: "qd-004",
    answer: "Ritorno al futuro",
    detail: "Robert Zemeckis, 1985",
    category: "Film",
    clues: [
      "Alle 22:04 di un sabato sera, quando un fulmine colpisce un orologio.",
      "Hill Valley, California, ma in due epoche diverse.",
      "A 88 miglia orarie, su un'auto con le porte ad ali di gabbiano.",
      "Perché i suoi genitori devono innamorarsi, o lui sparisce dalla foto.",
    ],
  },
  {
    id: "qd-005",
    answer: "Jurassic Park",
    detail: "Steven Spielberg, 1993",
    category: "Film",
    clues: [
      "Sessantacinque milioni di anni dopo, ma prima dell'inaugurazione.",
      "Su un'isola al largo del Costa Rica.",
      "Partendo da una goccia di sangue chiusa nell'ambra.",
      "Perché la vita trova sempre un modo.",
    ],
  },
  {
    id: "qd-006",
    answer: "Fantozzi",
    detail: "Il ragionier Ugo, Paolo Villaggio",
    category: "Film",
    clues: [
      "Ogni mattina alle 8 in punto, quando si timbra il cartellino.",
      "Nell'ufficio sinistri di una Megaditta.",
      "Con una nuvola personale che lo segue anche in vacanza.",
      "Perché per lui la Corazzata Potëmkin è una cagata pazzesca.",
    ],
  },
  {
    id: "qd-007",
    answer: "Il Padrino",
    detail: "Francis Ford Coppola, 1972",
    category: "Film",
    clues: [
      "Il giorno del matrimonio della figlia, quando nessuno può rifiutare un favore.",
      "Tra New York e un paesino della Sicilia.",
      "Con una testa di cavallo nel letto.",
      "Per fargli un'offerta che non potrà rifiutare.",
    ],
  },
  {
    id: "qd-008",
    answer: "Mamma, ho perso l'aereo",
    detail: "1990 · Macaulay Culkin",
    category: "Film",
    clues: [
      "A Natale, quando la famiglia parte e qualcuno resta.",
      "In una grande casa vicino a Chicago, piena di trappole.",
      "Con il dopobarba schiaffeggiato sulle guance e un urlo davanti allo specchio.",
      "Perché a contarli, i figli, ci si sbaglia.",
    ],
  },
  {
    id: "qd-009",
    answer: "Shrek",
    detail: "DreamWorks, 2001",
    category: "Film",
    clues: [
      "C'era una volta, ma senza principe azzurro.",
      "In una palude, finché non arrivano tutti i personaggi delle fiabe.",
      "Verde, scorbutico e con un asino che non sta mai zitto.",
      "Perché gli orchi sono come le cipolle: hanno gli strati.",
    ],
  },
  {
    id: "qd-010",
    answer: "Matrix",
    detail: "1999 · Keanu Reeves",
    category: "Film",
    clues: [
      "Quando ti svegli e scopri che il mondo è solo un programma.",
      "In una città finta, mentre il corpo vero dorme in una vasca.",
      "Schivando i proiettili piegato all'indietro, al rallentatore.",
      "Perché ha scelto la pillola rossa.",
    ],
  },

  // ─── Canzoni ───
  {
    id: "qd-011",
    answer: "Nel blu dipinto di blu (Volare)",
    detail: "Domenico Modugno, Sanremo 1958",
    category: "Canzone",
    clues: [
      "Sanremo 1958, quando un uomo apre le braccia sul palco.",
      "Sopra le nuvole, felice di stare lassù.",
      "In un sogno, con le mani e la faccia colorate.",
      "Perché un sogno così non ritorna mai più.",
    ],
  },
  {
    id: "qd-012",
    answer: "Bella ciao",
    category: "Canzone",
    clues: [
      "Una mattina, appena svegli, scoprendo che è arrivato l'invasore.",
      "In montagna, sotto l'ombra di un bel fior.",
      "Cantata in coro, anche da una banda di rapinatori in tuta rossa e maschera di Dalí.",
      "Perché si sentiva di morir da partigiano.",
    ],
  },
  {
    id: "qd-013",
    answer: "Azzurro",
    detail: "Adriano Celentano, 1968 · scritta da Paolo Conte",
    category: "Canzone",
    clues: [
      "D'estate, quando la città si svuota e lei è partita per le spiagge.",
      "Cercando un po' d'Africa in giardino.",
      "Su un treno dei desideri che va all'incontrario.",
      "Perché il pomeriggio è troppo… di quel colore.",
    ],
  },
  {
    id: "qd-014",
    answer: "Bohemian Rhapsody",
    detail: "Queen, 1975",
    category: "Canzone",
    clues: [
      "Quando si confessa alla mamma di aver appena ucciso un uomo.",
      "Tra una ballata, un'opera e un pezzo rock, tutto in sei minuti.",
      "Galileo, Figaro, Scaramouche, e teste che sbattono in macchina.",
      "Perché niente conta davvero, comunque soffi il vento.",
    ],
  },
  {
    id: "qd-015",
    answer: "Sarà perché ti amo",
    detail: "Ricchi e Poveri, 1981",
    category: "Canzone",
    clues: [
      "A ogni matrimonio, quando i parenti si alzano tutti insieme.",
      "In pista, in Italia e in mezza Europa, da più di quarant'anni.",
      "«Che confusione!», cantata in coro mentre si vola sempre più in alto.",
      "Perché… beh, ti amo.",
    ],
  },
  {
    id: "qd-016",
    answer: "Despacito",
    detail: "Luis Fonsi e Daddy Yankee, 2017",
    category: "Canzone",
    clues: [
      "Nell'estate del 2017, quando era impossibile sfuggirle.",
      "A Porto Rico, in un quartiere colorato diventato meta di turisti.",
      "Pasito a pasito, suave suavecito.",
      "Perché tutto va fatto… lentamente.",
    ],
  },
  {
    id: "qd-017",
    answer: "Vita spericolata",
    detail: "Vasco Rossi, Sanremo 1983",
    category: "Canzone",
    clues: [
      "Sanremo 1983: arriva penultima, poi diventa un inno.",
      "In un mondo pieno di guai, magari al Roxy Bar.",
      "Una vita come quelle dei film, una vita esagerata.",
      "Perché vuole vivere come Steve McQueen.",
    ],
  },
  {
    id: "qd-018",
    answer: "Imagine",
    detail: "John Lennon, 1971",
    category: "Canzone",
    clues: [
      "Nel 1971, seduto a un pianoforte bianco.",
      "In un mondo senza confini, senza paradiso e senza inferno.",
      "Chiudendo gli occhi e pensando a tutta la gente che vive in pace.",
      "Perché forse è un sognatore, ma non è l'unico.",
    ],
  },
  {
    id: "qd-019",
    answer: "Il cielo in una stanza",
    detail: "Gino Paoli, 1960 · cantata da Mina",
    category: "Canzone",
    clues: [
      "Quando sei qui con me.",
      "Tra pareti che diventano alberi infiniti.",
      "Con un'armonica che sembra un organo che vibra.",
      "Perché quel soffitto viola non esiste più.",
    ],
  },
  {
    id: "qd-020",
    answer: "We Are the Champions",
    detail: "Queen, 1977",
    category: "Canzone",
    clues: [
      "Alla fine di ogni finale, mentre qualcuno alza una coppa.",
      "Negli stadi di tutto il mondo.",
      "Cantata a squarciagola da chi ha appena vinto, abbracciato a chi non conosce.",
      "Perché non c'è tempo per i perdenti.",
    ],
  },

  // ─── Personaggi ───
  {
    id: "qd-021",
    answer: "Harry Potter",
    category: "Personaggio",
    clues: [
      "Il giorno del suo undicesimo compleanno, quando arriva una lettera che non deve leggere.",
      "In un sottoscala, prima; poi in un castello in Scozia.",
      "Con una cicatrice a forma di saetta e gli occhiali tondi.",
      "Perché è il ragazzo che è sopravvissuto.",
    ],
  },
  {
    id: "qd-022",
    answer: "Pinocchio",
    category: "Personaggio",
    clues: [
      "Quando un falegname senza soldi trova un ciocco che parla.",
      "Nel paese dei balocchi e nella pancia di un pesce enorme.",
      "Ogni bugia si vede: cresce in mezzo alla faccia.",
      "Perché vuole diventare un bambino vero.",
    ],
  },
  {
    id: "qd-023",
    answer: "Leonardo da Vinci",
    category: "Personaggio",
    clues: [
      "Nel Rinascimento, quando un uomo scriveva al contrario per non farsi leggere.",
      "Tra Firenze, Milano e un castello sulla Loira.",
      "Disegnando macchine volanti e un uomo dentro un cerchio.",
      "Perché qualcuno deve pur spiegare quel sorriso.",
    ],
  },
  {
    id: "qd-024",
    answer: "Cristoforo Colombo",
    category: "Personaggio",
    clues: [
      "Quando l'Europa pensava che dall'altra parte del mare ci fossero solo spezie.",
      "Partito da Palos, arrivato su un'isola che chiamò San Salvador.",
      "Con tre caravelle e un equipaggio che voleva tornare indietro.",
      "Perché cercava le Indie e trovò un continente.",
    ],
  },
  {
    id: "qd-025",
    answer: "Albert Einstein",
    category: "Personaggio",
    clues: [
      "Nel 1905, quando un impiegato dell'ufficio brevetti cambiò la fisica.",
      "Tra Ulma, Berna e Princeton.",
      "Con i capelli spettinati e la lingua fuori in una foto famosa.",
      "Perché tutto è relativo. E = mc².",
    ],
  },
  {
    id: "qd-026",
    answer: "Napoleone Bonaparte",
    category: "Personaggio",
    clues: [
      "Quando un giovane ufficiale corso decise che l'Europa gli stava stretta.",
      "Da Ajaccio a Sant'Elena, passando per l'Elba.",
      "Con la mano infilata nel panciotto e il cappello di traverso.",
      "Perché a Waterloo le cose andarono male.",
    ],
  },
  {
    id: "qd-027",
    answer: "Diego Armando Maradona",
    category: "Personaggio",
    clues: [
      "In un pomeriggio di giugno del 1986, contro l'Inghilterra.",
      "Dalle baracche di Villa Fiorito a uno stadio che oggi porta il suo nome.",
      "Con la mano de Dios e la maglia numero 10.",
      "Perché a Napoli è più di un santo.",
    ],
  },
  {
    id: "qd-028",
    answer: "Valentino Rossi",
    category: "Personaggio",
    clues: [
      "Per vent'anni, la domenica all'ora di pranzo l'Italia si fermava.",
      "Da Tavullia a tutti i circuiti del mondo.",
      "Con il numero 46, parlando alla moto prima di partire.",
      "Perché il Dottore ha vinto nove titoli mondiali.",
    ],
  },
  {
    id: "qd-029",
    answer: "Raffaella Carrà",
    category: "Personaggio",
    clues: [
      "Il sabato sera della TV in bianco e nero, quando un ombelico scandalizzò l'Italia.",
      "Tra Bellaria, Roma e una Spagna che la adora.",
      "Con un caschetto biondo che non si spostava mai, nemmeno ballando il Tuca Tuca.",
      "Perché a far l'amore si comincia da… dove?",
    ],
  },
  {
    id: "qd-030",
    answer: "Steve Jobs",
    category: "Personaggio",
    clues: [
      "Nel 2007, quando su un palco tirò fuori dalla tasca un telefono senza tasti.",
      "Da un garage di Los Altos a Cupertino.",
      "Con dolcevita nero, jeans e scarpe da ginnastica.",
      "Perché bisogna restare affamati, restare folli.",
    ],
  },
  {
    id: "qd-031",
    answer: "Dante Alighieri",
    category: "Personaggio",
    clues: [
      "Nell'anno del primo Giubileo, quando un uomo di 35 anni si perse.",
      "Esiliato da Firenze, finì i suoi giorni a Ravenna.",
      "Con il naso aquilino, la corona d'alloro e una guida di nome Virgilio.",
      "Perché per Beatrice si va anche all'Inferno.",
    ],
  },
  {
    id: "qd-032",
    answer: "Michael Jackson",
    category: "Personaggio",
    clues: [
      "Da bambino cantava con quattro fratelli.",
      "In un ranch con le giostre chiamato Neverland.",
      "Con un guanto bianco solo, camminando all'indietro come sulla luna.",
      "Perché il re del pop è uno solo.",
    ],
  },

  // ─── Luoghi ───
  {
    id: "qd-033",
    answer: "Venezia",
    category: "Luogo",
    clues: [
      "Ogni inverno, quando l'acqua sale e spuntano le passerelle.",
      "Su più di cento isolette in mezzo a una laguna.",
      "Si gira in gondola o in vaporetto, mai in macchina.",
      "Perché qui a Carnevale ci si mette la maschera.",
    ],
  },
  {
    id: "qd-034",
    answer: "Torre di Pisa",
    category: "Luogo",
    clues: [
      "Dal 1173, e da allora non ha mai smesso di pensarci.",
      "In un prato chiamato dei Miracoli.",
      "Storta, ma non cade.",
      "Perché il terreno era troppo molle, e i turisti la reggono con una mano in foto.",
    ],
  },
  {
    id: "qd-035",
    answer: "Colosseo",
    category: "Luogo",
    clues: [
      "Inaugurato con cento giorni di giochi, sotto l'imperatore Tito.",
      "Dove prima c'era il laghetto della villa di Nerone.",
      "Cinquantamila spettatori, belve sotto il pavimento e un telo per il sole.",
      "Perché i gladiatori dovevano pur combattere da qualche parte.",
    ],
  },
  {
    id: "qd-036",
    answer: "Stonehenge",
    category: "Luogo",
    clues: [
      "Al solstizio d'estate, quando il sole sorge nel punto esatto.",
      "In una piana del sud dell'Inghilterra.",
      "Pietre enormi in cerchio, alcune portate da più di 200 km di distanza.",
      "Perché? Nessuno lo sa davvero: calendario, tempio o cimitero.",
    ],
  },
  {
    id: "qd-037",
    answer: "Las Vegas",
    category: "Luogo",
    clues: [
      "Di notte, quando non è mai notte.",
      "In mezzo al deserto del Nevada.",
      "Tra una piramide, una Torre Eiffel finta e matrimoni lampo celebrati da Elvis.",
      "Perché quello che succede qui, resta qui.",
    ],
  },
  {
    id: "qd-038",
    answer: "Polo Nord",
    category: "Luogo",
    clues: [
      "Quando per sei mesi il sole non tramonta, e per sei non sorge.",
      "In cima al mondo, dove ogni direzione è sud.",
      "Su un mare ghiacciato, senza terra sotto i piedi.",
      "Perché è lì che arrivano tutte le letterine di dicembre.",
    ],
  },
  {
    id: "qd-039",
    answer: "Monte Everest",
    category: "Luogo",
    clues: [
      "In primavera, quando arriva la finestra di bel tempo e si forma la coda.",
      "Al confine tra Nepal e Tibet.",
      "Con ossigeno in bombole, sherpa e 8.848 metri sotto i piedi.",
      "Perché è lì. (Lo disse George Mallory.)",
    ],
  },
  {
    id: "qd-040",
    answer: "Città del Vaticano",
    category: "Luogo",
    clues: [
      "Ogni domenica a mezzogiorno, quando qualcuno si affaccia alla finestra.",
      "Dentro una capitale, con le sue poste e i suoi francobolli.",
      "Sorvegliato da guardie svizzere in divisa a righe.",
      "Perché quando esce il fumo bianco, c'è un nuovo Papa.",
    ],
  },
  {
    id: "qd-041",
    answer: "Area 51",
    category: "Luogo",
    clues: [
      "Di notte, quando nel cielo del deserto qualcosa si accende.",
      "In una base militare che per anni, ufficialmente, non esisteva.",
      "Con cartelli che vietano di avvicinarsi e telecamere ovunque.",
      "Perché lì dentro, dicono, tengono gli alieni.",
    ],
  },

  // ─── Eventi ───
  {
    id: "qd-042",
    answer: "Lo sbarco sulla Luna",
    detail: "Apollo 11, 1969",
    category: "Evento",
    clues: [
      "Il 20 luglio 1969, in piena notte per chi guardava dall'Italia.",
      "Nel Mare della Tranquillità.",
      "Un piccolo passo, uno stivale nella polvere.",
      "Perché bisognava arrivarci prima dei russi.",
    ],
  },
  {
    id: "qd-043",
    answer: "La caduta del Muro di Berlino",
    detail: "9 novembre 1989",
    category: "Evento",
    clues: [
      "Una sera di novembre del 1989, per un annuncio sbagliato in conferenza stampa.",
      "Nel cuore di una città divisa in due.",
      "A colpi di martello e piccone, tra champagne e lacrime.",
      "Perché la Guerra Fredda stava finendo.",
    ],
  },
  {
    id: "qd-044",
    answer: "La scoperta della penicillina",
    detail: "Alexander Fleming, 1928",
    category: "Evento",
    clues: [
      "Nel 1928, al ritorno dalle vacanze.",
      "In un laboratorio disordinato di Londra.",
      "Una muffa cresciuta per sbaglio su una piastra dimenticata.",
      "Perché da allora un'infezione non è più una condanna.",
    ],
  },
  {
    id: "qd-045",
    answer: "La spedizione dei Mille",
    detail: "Garibaldi, 1860",
    category: "Evento",
    clues: [
      "Nel maggio del 1860, partendo di notte da Quarto.",
      "Sbarcati a Marsala, risalendo fino all'incontro di Teano.",
      "Volontari con la camicia rossa, e non erano molti di più di mille.",
      "Perché l'Italia andava fatta.",
    ],
  },
  {
    id: "qd-046",
    answer: "L'eruzione del Vesuvio a Pompei",
    detail: "79 d.C.",
    category: "Evento",
    clues: [
      "Un giorno del 79 dopo Cristo, forse d'autunno.",
      "Ai piedi di una montagna che nessuno credeva pericolosa.",
      "Una nube a forma di pino, poi cenere per giorni.",
      "Perché così una città intera è rimasta ferma nel tempo.",
    ],
  },
  {
    id: "qd-047",
    answer: "La presa della Bastiglia",
    detail: "Rivoluzione francese, 1789",
    category: "Evento",
    clues: [
      "Il 14 luglio 1789.",
      "In una fortezza-prigione di Parigi che quel giorno aveva solo sette detenuti.",
      "Con picche, fucili e una folla affamata.",
      "Perché il popolo non ne poteva più del re (e delle brioche).",
    ],
  },
  {
    id: "qd-048",
    answer: "Woodstock",
    detail: "Festival, agosto 1969",
    category: "Evento",
    clues: [
      "Nell'agosto del 1969, tre giorni di pioggia e fango.",
      "In una fattoria dello stato di New York.",
      "Mezzo milione di persone e Jimi Hendrix che all'alba suona l'inno americano.",
      "Perché si cantava pace e amore.",
    ],
  },
  {
    id: "qd-049",
    answer: "Il disastro di Chernobyl",
    detail: "26 aprile 1986",
    category: "Evento",
    clues: [
      "Alle 1:23 di notte del 26 aprile 1986.",
      "In Ucraina, vicino a una città rimasta vuota da allora.",
      "Durante un test di sicurezza, il reattore numero 4 esplode.",
      "Perché quella notte il nucleare sfuggì di mano.",
    ],
  },

  // ─── Oggetti ───
  {
    id: "qd-050",
    answer: "Il cubo di Rubik",
    category: "Oggetto",
    clues: [
      "Nel 1974, quando un professore di architettura voleva spiegare lo spazio ai suoi studenti.",
      "A Budapest, poi in tutte le camerette degli anni '80.",
      "Sei facce, nove quadratini ciascuna, e miliardi di combinazioni.",
      "Perché tutti i colori tornino al loro posto.",
    ],
  },
  {
    id: "qd-051",
    answer: "La moka",
    category: "Oggetto",
    clues: [
      "Ogni mattina, prima di chiunque altro in casa.",
      "Sul fornello, in tutte le cucine d'Italia.",
      "Acqua sotto, polvere in mezzo, e un borbottio che annuncia la fine.",
      "Perché senza caffè non si parte. Con l'omino coi baffi.",
    ],
  },
  {
    id: "qd-052",
    answer: "Il telecomando",
    category: "Oggetto",
    clues: [
      "Quando comincia la partita, ma c'è anche il film.",
      "Sul divano, o meglio, sotto il cuscino del divano.",
      "Si punta, si preme, e le pile finiscono sempre nel momento sbagliato.",
      "Perché alzarsi per cambiare canale è roba del passato.",
    ],
  },
  {
    id: "qd-053",
    answer: "Il paracadute",
    category: "Oggetto",
    clues: [
      "Dopo il salto, contando fino a tre.",
      "A quattromila metri, fuori da un portellone aperto.",
      "Si tira una maniglia e si apre una cupola di stoffa.",
      "Perché atterrare è meglio che cadere.",
    ],
  },
  {
    id: "qd-054",
    answer: "La clessidra",
    category: "Oggetto",
    clues: [
      "Quando il tempo scorre, ma si vede.",
      "Sui tavoli dei giochi da tavolo e nelle mani di qualche strega cattiva.",
      "Due bulbi di vetro, un collo stretto e sabbia che scende.",
      "Per sapere quando il tempo è finito. Poi la si gira.",
    ],
  },
  {
    id: "qd-055",
    answer: "Lo specchio",
    category: "Oggetto",
    clues: [
      "Ogni mattina, appena svegli, per un incontro che non sempre fa piacere.",
      "In bagno, in ascensore e nella stanza di una regina cattiva.",
      "Ti guarda esattamente come lo guardi tu, ma al contrario.",
      "Per sapere chi è la più bella del reame.",
    ],
  },
  {
    id: "qd-056",
    answer: "La bussola",
    category: "Oggetto",
    clues: [
      "Quando ti sei perso e non c'è campo.",
      "Nella tasca di un esploratore o sul ponte di una nave.",
      "Un ago che trema e poi si ferma, sempre nella stessa direzione.",
      "Perché il nord non si sposta.",
    ],
  },
  {
    id: "qd-057",
    answer: "Il salvadanaio",
    category: "Oggetto",
    clues: [
      "Ogni volta che avanza una moneta.",
      "Sul comodino dei bambini.",
      "Una fessura per entrare e spesso nessuna porta per uscire: per aprirlo va rotto.",
      "Per risparmiare. E spesso ha la forma di un maialino.",
    ],
  },
  {
    id: "qd-058",
    answer: "Il frigorifero",
    category: "Oggetto",
    clues: [
      "Alle due di notte, quando ti viene fame.",
      "In cucina, coperto di calamite e disegni dei bambini.",
      "Aprendo la porta si accende una luce: ma si spegnerà davvero quando la chiudi?",
      "Perché il cibo, al freddo, dura di più.",
    ],
  },

  // ─── Sport ───
  {
    id: "qd-059",
    answer: "Il Giro d'Italia",
    category: "Sport",
    clues: [
      "A maggio, quando le strade si chiudono e si aspetta per ore un passaggio di pochi secondi.",
      "Su e giù per lo Stivale, con lo Stelvio e lo Zoncolan.",
      "Tre settimane di pedali, inseguendo una maglia del colore del giornale che lo organizza.",
      "Per indossare la maglia rosa all'ultima tappa.",
    ],
  },
  {
    id: "qd-060",
    answer: "Il Palio di Siena",
    category: "Sport",
    clues: [
      "Il 2 luglio e il 16 agosto, da secoli.",
      "In una piazza a forma di conchiglia.",
      "Tre giri, cavalli montati a pelo e fantini che possono anche cadere.",
      "Per vincere un drappo dipinto e far festa in contrada.",
    ],
  },
  {
    id: "qd-061",
    answer: "Le Olimpiadi",
    category: "Sport",
    clues: [
      "Ogni quattro anni, quando una fiamma parte dalla Grecia.",
      "Ogni volta in una città diversa del mondo.",
      "Sotto cinque cerchi colorati intrecciati.",
      "Per l'oro, l'argento o il bronzo. Ma l'importante è partecipare.",
    ],
  },
  {
    id: "qd-062",
    answer: "Il Super Bowl",
    detail: "Finale del football americano",
    category: "Sport",
    clues: [
      "Una domenica di febbraio, a notte fonda per noi.",
      "In uno stadio americano, ogni anno diverso.",
      "Con spot da milioni di dollari e un concerto a metà partita.",
      "Per vincere il trofeo Vince Lombardi.",
    ],
  },
  {
    id: "qd-063",
    answer: "Wimbledon",
    category: "Sport",
    clues: [
      "A inizio estate, quando a Londra si mangiano fragole con panna.",
      "Sull'erba di un club nel sud-ovest di Londra.",
      "Vestiti rigorosamente di bianco, con i reali in tribuna.",
      "Per alzare il trofeo più antico del tennis.",
    ],
  },
  {
    id: "qd-064",
    answer: "La Ferrari",
    category: "Sport",
    clues: [
      "Ogni domenica di vittoria, quando suonano le campane del paese.",
      "Da Maranello a tutti i circuiti del mondo.",
      "Rossa, con un cavallino rampante sul muso.",
      "Per vincere, e far impazzire i tifosi a Monza.",
    ],
  },
  {
    id: "qd-065",
    answer: "La maratona",
    category: "Sport",
    clues: [
      "Nel 490 avanti Cristo, dopo una battaglia vinta.",
      "Da una piana greca fino ad Atene.",
      "Quarantadue chilometri e 195 metri, di corsa.",
      "Per portare la notizia della vittoria. Il primo, si dice, morì appena arrivato.",
    ],
  },
  {
    id: "qd-066",
    answer: "Italia campione del mondo 2006",
    category: "Sport",
    clues: [
      "Il 9 luglio, in una notte d'estate.",
      "All'Olimpiastadion, davanti a quasi settantamila persone.",
      "Una testata, un rigore di Grosso e il cielo azzurro sopra Berlino.",
      "Perché l'Italia era campione per la quarta volta.",
    ],
  },

  // ─── TV ───
  {
    id: "qd-067",
    answer: "Il Festival di Sanremo",
    category: "TV",
    clues: [
      "A febbraio, per cinque sere, l'Italia va a letto tardi.",
      "In un teatro di una città ligure dei fiori.",
      "Con l'orchestra, i fiori e un presentatore che dice «dirige il maestro…».",
      "Per vincere e poi andare all'Eurovision.",
    ],
  },
  {
    id: "qd-068",
    answer: "Chi vuol essere milionario?",
    category: "TV",
    clues: [
      "Quando una risposta può cambiarti la vita, ma hai ancora l'aiuto del pubblico.",
      "In uno studio buio, su una sedia alta, davanti a Gerry Scotti.",
      "Quattro risposte, A B C D, e la domanda «è la sua risposta definitiva?».",
      "Per arrivare all'ultima domanda e vincere un milione.",
    ],
  },
  {
    id: "qd-069",
    answer: "I Simpson",
    category: "TV",
    clues: [
      "Da decenni, all'ora di pranzo su Italia 1.",
      "A Springfield, città che non sta in nessuno stato preciso.",
      "Gialli, con quattro dita e una ciambella sempre in mano.",
      "Per scoprire che lo avevano predetto, come sempre.",
    ],
  },
  {
    id: "qd-070",
    answer: "Striscia la notizia",
    category: "TV",
    clues: [
      "Ogni sera prima di cena, da più di trent'anni.",
      "Su Canale 5, dietro un bancone con due conduttori.",
      "Con le veline sul bancone e un pupazzo rosso che urla.",
      "Perché qualcuno deve pur consegnare il Tapiro d'oro.",
    ],
  },
  {
    id: "qd-071",
    answer: "Il Grande Fratello",
    category: "TV",
    clues: [
      "Dal 2000, quando guardare gente che dorme diventò uno spettacolo.",
      "In una casa piena di telecamere, a Cinecittà.",
      "Concorrenti chiusi dentro, nomination e un confessionale.",
      "Perché qualcuno ti guarda sempre. Come nel romanzo di Orwell.",
    ],
  },
  {
    id: "qd-072",
    answer: "Squid Game",
    category: "TV",
    clues: [
      "Nell'autunno del 2021, quando tutti cercavano una tuta verde.",
      "Su un'isola segreta in Corea del Sud.",
      "Giochi da bambini, guardie con le maschere e una bambola che si gira.",
      "Per un premio enorme. Ma chi perde viene eliminato… per davvero.",
    ],
  },

  // ─── Cibo ───
  {
    id: "qd-073",
    answer: "La pizza Margherita",
    category: "Cibo",
    clues: [
      "Nel giugno del 1889, per una visita reale.",
      "A Napoli, in un forno a legna.",
      "Rossa, bianca e verde come la bandiera.",
      "In onore di una regina.",
    ],
  },
  {
    id: "qd-074",
    answer: "Il tiramisù",
    category: "Cibo",
    clues: [
      "Dopo cena, quando serve una scossa.",
      "Nel Nord-Est, tra Veneto e Friuli, che ancora litigano su chi l'ha inventato.",
      "Savoiardi bagnati nel caffè, crema al mascarpone e cacao sopra.",
      "Perché il nome promette di tirarti su.",
    ],
  },
  {
    id: "qd-075",
    answer: "La carbonara",
    category: "Cibo",
    clues: [
      "Nel dopoguerra, forse grazie ai soldati americani.",
      "A Roma, e guai a farla diversamente.",
      "Guanciale, uovo, pecorino e pepe. Se ci metti la panna ti cacciano.",
      "Perché si dice che fosse il piatto dei carbonai.",
    ],
  },
  {
    id: "qd-076",
    answer: "La Nutella",
    category: "Cibo",
    clues: [
      "Nel 1964, figlia di un dopoguerra in cui il cacao costava troppo.",
      "Ad Alba, in Piemonte.",
      "Nocciole, cacao e un barattolo di vetro che poi diventa bicchiere.",
      "Per la merenda. O direttamente col cucchiaio.",
    ],
  },
  {
    id: "qd-077",
    answer: "Il sushi",
    category: "Cibo",
    clues: [
      "Nato per conservare il pesce, oggi lo si ordina il venerdì sera.",
      "In Giappone, o su un nastro che gira in un locale qualunque.",
      "Riso, alga, pesce crudo e bacchette.",
      "Perché «all you can eat» significa davvero tutto quello che riesci a mangiare.",
    ],
  },
  {
    id: "qd-078",
    answer: "Il panettone",
    category: "Cibo",
    clues: [
      "Da novembre in poi, quando invade i supermercati.",
      "A Milano, dove si racconta che sia nato dall'errore di un garzone.",
      "Alto, a cupola, con canditi e uvetta che qualcuno toglie sempre.",
      "Perché a Natale non può mancare, in eterna sfida col pandoro.",
    ],
  },

  // ─── Concetti ───
  {
    id: "qd-079",
    answer: "Il tempo",
    category: "Concetto",
    clues: [
      "Sempre, anche adesso, mentre ascolti.",
      "Sull'orologio, sul calendario e nelle rughe.",
      "Passa, vola, si perde, ma non torna mai indietro.",
      "Perché altrimenti succederebbe tutto nello stesso momento.",
    ],
  },
  {
    id: "qd-080",
    answer: "La nostalgia",
    category: "Concetto",
    clues: [
      "Quando senti una canzone di quando avevi quindici anni.",
      "Nel cuore di chi vive lontano da casa.",
      "Una dolce tristezza per qualcosa che non c'è più.",
      "Perché si stava meglio quando si stava peggio.",
    ],
  },
  {
    id: "qd-081",
    answer: "Il déjà vu",
    category: "Concetto",
    clues: [
      "Un attimo qualunque, nel mezzo di una conversazione.",
      "Nella testa, per un secondo, poi sparisce.",
      "Come in Matrix, quando lo stesso gatto nero passa due volte.",
      "Perché il cervello ogni tanto si confonde. È già successo, vero?",
    ],
  },
  {
    id: "qd-082",
    answer: "La gelosia",
    category: "Concetto",
    clues: [
      "Quando il telefono dell'altro si illumina.",
      "Nelle coppie, ma anche tra fratelli.",
      "Un mostro dagli occhi verdi, scriveva Shakespeare.",
      "Perché si ha paura di perdere chi si ama.",
    ],
  },
  {
    id: "qd-083",
    answer: "L'eco",
    category: "Concetto",
    clues: [
      "Quando gridi in montagna e qualcuno risponde subito.",
      "In una valle, in una grotta o in una stanza vuota.",
      "Ripete sempre l'ultima parola… parola… parola.",
      "Perché il suono rimbalza e torna indietro.",
    ],
  },
  {
    id: "qd-084",
    answer: "Il jet lag",
    category: "Concetto",
    clues: [
      "I primi giorni dopo un lungo viaggio verso est o verso ovest.",
      "In un hotel dall'altra parte del mondo, alle 4 di notte, svegli come grilli.",
      "Il corpo dice notte, l'orologio dice mezzogiorno.",
      "Perché hai attraversato troppi fusi orari in poche ore.",
    ],
  },
  {
    id: "qd-085",
    answer: "Lo sbadiglio",
    category: "Concetto",
    clues: [
      "Quando qualcuno vicino a te lo fa.",
      "Durante una riunione, una lezione o un film noioso.",
      "Bocca spalancata, occhi che lacrimano. Probabilmente lo stai facendo anche tu adesso.",
      "Perché è contagioso, e nessuno sa bene a cosa serva.",
    ],
  },
  {
    id: "qd-086",
    answer: "Il silenzio",
    category: "Concetto",
    clues: [
      "Quando un bambino smette di fare rumore, e ti preoccupi.",
      "In una biblioteca, in una chiesa, in cima a una montagna.",
      "È d'oro, dice il proverbio.",
      "Perché a volte è la risposta migliore.",
    ],
  },
  {
    id: "qd-087",
    answer: "La paura",
    category: "Concetto",
    clues: [
      "Quando si sente un rumore in casa, di notte.",
      "Sotto il letto, al buio, in un film horror.",
      "Il cuore accelera e i peli si rizzano.",
      "Per farci scappare quando c'è un pericolo.",
    ],
  },

  // ─── Altri film ───
  {
    id: "qd-088",
    answer: "E.T. l'extra-terrestre",
    detail: "Steven Spielberg, 1982",
    category: "Film",
    clues: [
      "La notte di Halloween, travestito da fantasma.",
      "In una cittadina della California, nascosto in un armadio pieno di peluche.",
      "Con un dito che si illumina e una bicicletta che vola davanti alla luna.",
      "Perché vuole telefonare a casa.",
    ],
  },
  {
    id: "qd-089",
    answer: "Frozen",
    detail: "Disney, 2013",
    category: "Film",
    clues: [
      "Durante un'incoronazione, quando un segreto non si può più nascondere.",
      "In un regno nordico e su una montagna di ghiaccio.",
      "Con un pupazzo di neve che sogna l'estate.",
      "Perché bisogna lasciarlo andare. Let it go!",
    ],
  },
  {
    id: "qd-090",
    answer: "Rocky",
    detail: "Sylvester Stallone, 1976",
    category: "Film",
    clues: [
      "A Capodanno, contro il campione del mondo.",
      "A Filadelfia, salendo di corsa una scalinata.",
      "Allenandosi a pugni su quarti di bue in una cella frigorifera.",
      "Per restare in piedi fino all'ultimo round. «Adriana!»",
    ],
  },
  {
    id: "qd-091",
    answer: "Il Gladiatore",
    detail: "Ridley Scott, 2000 · Russell Crowe",
    category: "Film",
    clues: [
      "Quando muore l'imperatore e il figlio prende il potere.",
      "Dalle foreste della Germania all'arena di Roma.",
      "Generale, poi schiavo, poi combattente acclamato dalla folla.",
      "Per vendicare moglie e figlio. «Al mio segnale, scatenate l'inferno.»",
    ],
  },

  // ─── Altre canzoni ───
  {
    id: "qd-092",
    answer: "L'italiano",
    detail: "Toto Cutugno, 1983",
    category: "Canzone",
    clues: [
      "Ogni volta che un italiano all'estero sente nostalgia.",
      "Tra gli spaghetti al dente e un partigiano come presidente.",
      "Con la chitarra in mano.",
      "Perché ne è fiero: è un italiano vero.",
    ],
  },
  {
    id: "qd-093",
    answer: "Gangnam Style",
    detail: "PSY, 2012",
    category: "Canzone",
    clues: [
      "Nel 2012, il primo video a superare un miliardo di visualizzazioni.",
      "In un quartiere ricco di Seul.",
      "Ballando come se si cavalcasse un cavallo invisibile.",
      "Perché quello è lo stile del quartiere.",
    ],
  },
  {
    id: "qd-094",
    answer: "Thriller",
    detail: "Michael Jackson, 1982",
    category: "Canzone",
    clues: [
      "Nel 1983, in un video lungo come un cortometraggio.",
      "In un cimitero, di notte.",
      "Zombie che ballano in sincrono e una risata spettrale alla fine.",
      "Perché è il disco più venduto della storia.",
    ],
  },

  // ─── Altri personaggi ───
  {
    id: "qd-095",
    answer: "Marilyn Monroe",
    category: "Personaggio",
    clues: [
      "Al compleanno di un presidente, cantando con voce sussurrata.",
      "Tra Los Angeles e le luci di Hollywood.",
      "Un abito bianco che si solleva su una grata della metropolitana.",
      "Perché gli uomini preferiscono le bionde.",
    ],
  },
  {
    id: "qd-096",
    answer: "Giulio Cesare",
    category: "Personaggio",
    clues: [
      "Alle Idi di marzo.",
      "Dalla Gallia al Senato di Roma, passando per un piccolo fiume.",
      "Ventitré pugnalate, e tra gli assassini anche un figlio adottivo.",
      "Perché il dado era tratto.",
    ],
  },
  {
    id: "qd-097",
    answer: "Sherlock Holmes",
    category: "Personaggio",
    clues: [
      "Quando Scotland Yard non ci capisce niente.",
      "Al 221B di Baker Street.",
      "Pipa, cappello da cacciatore e lente d'ingrandimento.",
      "Perché è elementare, Watson!",
    ],
  },

  // ─── Altri luoghi ───
  {
    id: "qd-098",
    answer: "Le piramidi di Giza",
    category: "Luogo",
    clues: [
      "Più di 4.500 anni fa.",
      "Alle porte del Cairo, ai margini del deserto.",
      "Blocchi di pietra enormi e una sfinge che fa la guardia.",
      "Per custodire il faraone per l'eternità.",
    ],
  },
  {
    id: "qd-099",
    answer: "Il Triangolo delle Bermuda",
    category: "Luogo",
    clues: [
      "Quando una nave o un aereo spariscono senza lasciare traccia.",
      "Nell'Atlantico, tra Miami, Porto Rico e un arcipelago britannico.",
      "Nessun segnale di soccorso, nessun rottame.",
      "Perché lì, dicono, succede qualcosa di inspiegabile.",
    ],
  },
  {
    id: "qd-100",
    answer: "Hollywood",
    category: "Luogo",
    clues: [
      "Ogni anno, la notte degli Oscar.",
      "Sulle colline di Los Angeles, sotto una scritta bianca gigante.",
      "Stelle sul marciapiede e impronte delle mani nel cemento.",
      "Perché è la fabbrica dei sogni del cinema.",
    ],
  },

  // ─── Altri eventi ───
  {
    id: "qd-101",
    answer: "Il primo volo dei fratelli Wright",
    detail: "Kitty Hawk, 1903",
    category: "Evento",
    clues: [
      "Il 17 dicembre 1903, per dodici secondi.",
      "Sulle dune di Kitty Hawk, in North Carolina.",
      "Due fratelli che riparavano biciclette e un aereo di legno e tela.",
      "Perché l'uomo voleva volare.",
    ],
  },
  {
    id: "qd-102",
    answer: "L'invenzione della stampa",
    detail: "Gutenberg, metà del '400",
    category: "Evento",
    clues: [
      "Intorno al 1450, in Germania.",
      "In una bottega di Magonza.",
      "Lettere di metallo mobili, inchiostro e un torchio da vino adattato.",
      "Per stampare la prima Bibbia, e far circolare le idee.",
    ],
  },

  // ─── Altri oggetti ───
  {
    id: "qd-103",
    answer: "Il post-it",
    category: "Oggetto",
    clues: [
      "Nel 1968, da una colla venuta male.",
      "Sul frigo, sul monitor, sui libri di scuola.",
      "Un quadratino giallo che si attacca e si stacca.",
      "Per non dimenticare niente.",
    ],
  },
  {
    id: "qd-104",
    answer: "Gli occhiali",
    category: "Oggetto",
    clues: [
      "Quando le lettere iniziano a ballare.",
      "Sul naso, oppure sulla testa mentre li cerchi.",
      "Due lenti, due stanghette e un panno per pulirle.",
      "Per vederci meglio.",
    ],
  },

  // ─── Altro sport ───
  {
    id: "qd-105",
    answer: "Italia-Germania 4-3",
    detail: "Semifinale Mondiali 1970",
    category: "Sport",
    clues: [
      "Il 17 giugno 1970, una notte che in Italia finì quasi all'alba.",
      "All'Azteca di Città del Messico.",
      "Cinque gol nei tempi supplementari.",
      "Perché la chiamano «la partita del secolo».",
    ],
  },
  {
    id: "qd-106",
    answer: "Il curling",
    category: "Sport",
    clues: [
      "Ogni quattro anni, quando tutti si scoprono esperti.",
      "Su una pista di ghiaccio.",
      "Una pietra di granito che scivola e due compagni che strofinano con la scopa.",
      "Per mandare la pietra il più vicino possibile al centro del bersaglio.",
    ],
  },

  // ─── Altra TV ───
  {
    id: "qd-107",
    answer: "La Ruota della Fortuna",
    category: "TV",
    clues: [
      "Prima di cena negli anni '90, con Mike Bongiorno.",
      "In uno studio con un tabellone pieno di lettere.",
      "Si gira, si spera, si compra una vocale.",
      "Per risolvere la frase e vincere i premi.",
    ],
  },
  {
    id: "qd-108",
    answer: "Il commissario Montalbano",
    category: "TV",
    clues: [
      "Il lunedì sera da più di vent'anni, spesso in replica.",
      "A Vigàta, una Sicilia che non esiste sulle mappe.",
      "Una casa sul mare, un vice dongiovanni e un agente che storpia i nomi.",
      "Perché quando risponde al telefono dice il suo cognome e poi «sono!».",
    ],
  },
  {
    id: "qd-109",
    answer: "Il Trono di Spade",
    category: "TV",
    clues: [
      "Quando l'inverno sta arrivando.",
      "Nei Sette Regni di Westeros.",
      "Draghi, nozze di sangue e personaggi che muoiono quando meno te lo aspetti.",
      "Per sedersi su una sedia molto scomoda e governare tutti.",
    ],
  },

  // ─── Altro cibo ───
  {
    id: "qd-110",
    answer: "La polenta",
    category: "Cibo",
    clues: [
      "Nelle sere d'inverno, girando il mestolo per quaranta minuti.",
      "Su un tagliere di legno al centro del tavolo, al Nord.",
      "Farina di mais, acqua e un paiolo di rame.",
      "Per accompagnare spezzatino e funghi. Si taglia col filo.",
    ],
  },
  {
    id: "qd-111",
    answer: "Il cornetto",
    category: "Cibo",
    clues: [
      "Ogni mattina, appena entri al bar.",
      "Accanto al cappuccino, in ogni bar d'Italia.",
      "A forma di mezzaluna, vuoto o con la crema.",
      "Perché la colazione al bar è sacra.",
    ],
  },
  {
    id: "qd-112",
    answer: "Il pesto",
    category: "Cibo",
    clues: [
      "D'estate, quando il basilico è al massimo.",
      "A Genova, in un mortaio di marmo.",
      "Basilico, pinoli, aglio, formaggio e olio.",
      "Per condire le trofie. E in aeroporto te lo sequestrano.",
    ],
  },

  // ─── Cartoni ───
  {
    id: "qd-113",
    answer: "Holly e Benji",
    category: "Cartone",
    clues: [
      "Ogni pomeriggio negli anni '80, una partita che durava diversi episodi.",
      "Su un campo infinito, dove la porta sembra lontana chilometri.",
      "Tiri che bucano la rete e un portiere con il cappellino.",
      "Perché il capitano sogna di vincere un mondiale con il Giappone.",
    ],
  },
  {
    id: "qd-114",
    answer: "I Puffi",
    category: "Cartone",
    clues: [
      "Quando un mago cattivo con un gatto rosso esce a caccia.",
      "In un villaggio di case a forma di fungo.",
      "Alti due mele o poco più, e tutti blu.",
      "Perché Gargamella non si arrende mai.",
    ],
  },
  {
    id: "qd-115",
    answer: "Dragon Ball",
    category: "Cartone",
    clues: [
      "Ogni volta che qualcuno riesce a riunirle tutte e sette.",
      "Dalla Terra fino al pianeta Namecc.",
      "Un ragazzino con la coda da scimmia che viaggia su una nuvola.",
      "Per chiedere un desiderio al drago Shenron.",
    ],
  },
  {
    id: "qd-116",
    answer: "Lupin III",
    category: "Cartone",
    clues: [
      "Ogni volta che arriva un biglietto che annuncia un furto.",
      "In giro per il mondo, spesso su una Fiat 500 gialla.",
      "Un pistolero, un samurai e una donna che lo tradisce sempre.",
      "Perché l'ispettore Zenigata non riesce mai a prenderlo.",
    ],
  },
  {
    id: "qd-117",
    answer: "SpongeBob",
    category: "Cartone",
    clues: [
      "Ogni mattina, quando suona la sveglia e grida «sono pronto!».",
      "In un ananas in fondo al mar.",
      "Giallo, quadrato e con i pantaloni marroni.",
      "Per preparare panini al Krusty Krab.",
    ],
  },
  {
    id: "qd-118",
    answer: "Peppa Pig",
    category: "Cartone",
    clues: [
      "Ogni volta che piove e si formano le pozzanghere.",
      "In una casetta in cima a una collina.",
      "Rosa, con un fratellino che adora i dinosauri.",
      "Per saltare nel fango. Oink!",
    ],
  },
  {
    id: "qd-119",
    answer: "Heidi",
    category: "Cartone",
    clues: [
      "Quando la zia la porta in montagna e la lascia lì.",
      "Sulle Alpi svizzere, poi a Francoforte.",
      "Con le capre, un nonno burbero e un'amica in sedia a rotelle.",
      "Perché le caprette le fanno ciao.",
    ],
  },

  // ─── Videogiochi ───
  {
    id: "qd-120",
    answer: "Super Mario",
    category: "Videogioco",
    clues: [
      "Dal 1985, ogni volta che una principessa viene rapita.",
      "Nel Regno dei Funghi, tra tubi verdi.",
      "Salti, monete e un fungo che ti fa diventare grande.",
      "Perché la principessa è sempre in un altro castello.",
    ],
  },
  {
    id: "qd-121",
    answer: "Tetris",
    category: "Videogioco",
    clues: [
      "Nel 1984, in un centro di ricerca di Mosca.",
      "In una colonna stretta che si riempie dal basso.",
      "Pezzi di quattro quadratini che cadono e vanno girati al volo.",
      "Per completare le righe e farle sparire.",
    ],
  },
  {
    id: "qd-122",
    answer: "Pac-Man",
    category: "Videogioco",
    clues: [
      "Nel 1980, quando le sale giochi erano piene di gettoni.",
      "In un labirinto blu.",
      "Una pizza a cui manca una fetta, inseguita da quattro fantasmi.",
      "Per mangiare tutti i puntini. E le ciliegie.",
    ],
  },
  {
    id: "qd-123",
    answer: "Fortnite",
    category: "Videogioco",
    clues: [
      "Dal 2017, quando i ragazzini iniziarono a ballare in modo strano.",
      "Su un'isola dove si arriva lanciandosi da un bus volante.",
      "Cento giocatori, una tempesta che si stringe e costruzioni in pochi secondi.",
      "Per restare l'ultimo in piedi e prendersi la Vittoria Reale.",
    ],
  },
  {
    id: "qd-124",
    answer: "Minecraft",
    category: "Videogioco",
    clues: [
      "Quando cala la notte e escono gli zombie.",
      "In un mondo infinito fatto di cubi.",
      "Si scava, si costruisce, e un mostro verde esplode quando ti si avvicina.",
      "Perché con i blocchi puoi costruire qualsiasi cosa.",
    ],
  },
  {
    id: "qd-125",
    answer: "Pokémon",
    category: "Videogioco",
    clues: [
      "Dal 1996, quando un ragazzino di dieci anni lascia casa per un lungo viaggio.",
      "Nell'erba alta, dove si nascondono.",
      "Lanciando una sfera bianca e rossa.",
      "Per prenderli tutti e diventare il migliore.",
    ],
  },

  // ─── Animali ───
  {
    id: "qd-126",
    answer: "Il camaleonte",
    category: "Animale",
    clues: [
      "Quando ha paura o cambia umore.",
      "Sui rami delle foreste del Madagascar.",
      "Occhi che girano ognuno per conto suo e una lingua lunga quanto il corpo.",
      "Perché cambia colore.",
    ],
  },
  {
    id: "qd-127",
    answer: "Il pinguino",
    category: "Animale",
    clues: [
      "In pieno inverno, quando il papà tiene l'uovo sulle zampe per mesi.",
      "Al Polo Sud, ma non al Polo Nord.",
      "Cammina goffo, ma sott'acqua sembra volare.",
      "Perché è un uccello che non vola, sempre vestito in frac.",
    ],
  },
  {
    id: "qd-128",
    answer: "Il salmone",
    category: "Animale",
    clues: [
      "Una volta nella vita, quando arriva il momento di tornare a casa.",
      "Dall'oceano su per i fiumi.",
      "Saltando le cascate controcorrente, mentre gli orsi aspettano.",
      "Per deporre le uova nel posto dove è nato.",
    ],
  },
  {
    id: "qd-129",
    answer: "La giraffa",
    category: "Animale",
    clues: [
      "Mentre dorme pochissimo, spesso in piedi.",
      "Nella savana africana, tra le acacie.",
      "Una lingua blu lunga mezzo metro e un collo con le stesse vertebre del nostro.",
      "Per arrivare alle foglie più alte.",
    ],
  },
  {
    id: "qd-130",
    answer: "Il koala",
    category: "Animale",
    clues: [
      "Per una ventina di ore al giorno, perché dorme.",
      "Sugli alberi di eucalipto, in Australia.",
      "Sembra un orsetto, ma ha il marsupio.",
      "Perché l'eucalipto dà pochissima energia, quindi meglio riposare.",
    ],
  },
  {
    id: "qd-131",
    answer: "Il polpo",
    category: "Animale",
    clues: [
      "Quando si sente in pericolo.",
      "Tra gli scogli del Mediterraneo.",
      "Tre cuori, sangue blu e otto braccia.",
      "Per scappare lasciando una nuvola d'inchiostro.",
    ],
  },
  {
    id: "qd-132",
    answer: "L'ape",
    category: "Animale",
    clues: [
      "In primavera, quando sbocciano i fiori.",
      "In una casa di cera, attorno a una regina.",
      "Balla per indicare alle compagne dove andare.",
      "Per fare il miele. E se punge, muore.",
    ],
  },

  // ─── Libri ───
  {
    id: "qd-133",
    answer: "I Promessi Sposi",
    detail: "Alessandro Manzoni",
    category: "Libro",
    clues: [
      "Nel 1628, poco prima che a Milano scoppi la peste.",
      "Su quel ramo del lago di Como.",
      "Due fidanzati separati da un signorotto prepotente e dai suoi bravi.",
      "Perché questo matrimonio non s'ha da fare.",
    ],
  },
  {
    id: "qd-134",
    answer: "Il Piccolo Principe",
    detail: "Antoine de Saint-Exupéry",
    category: "Libro",
    clues: [
      "Quando un aviatore precipita nel deserto.",
      "Su un asteroide piccolissimo, con tre vulcani e una rosa.",
      "Disegnando una pecora dentro una scatola.",
      "Perché l'essenziale è invisibile agli occhi.",
    ],
  },
  {
    id: "qd-135",
    answer: "Moby Dick",
    detail: "Herman Melville",
    category: "Libro",
    clues: [
      "Quando un capitano con una gamba d'avorio giura vendetta.",
      "Sugli oceani, a bordo della baleniera Pequod.",
      "«Chiamatemi Ismaele», e una caccia ossessiva.",
      "Per uccidere la balena bianca.",
    ],
  },
  {
    id: "qd-136",
    answer: "1984",
    detail: "George Orwell",
    category: "Libro",
    clues: [
      "In un anno che, quando fu scritto, era ancora il futuro.",
      "A Londra, dentro il Ministero della Verità.",
      "Teleschermi in ogni casa e una neolingua che serve a non pensare.",
      "Perché il Grande Fratello ti guarda.",
    ],
  },
  {
    id: "qd-137",
    answer: "Romeo e Giulietta",
    detail: "William Shakespeare",
    category: "Libro",
    clues: [
      "In pochi giorni d'estate, tra un ballo in maschera e un funerale.",
      "A Verona, tra due famiglie che si odiano.",
      "Un balcone, un frate e un veleno.",
      "Perché il loro amore era contro Montecchi e Capuleti.",
    ],
  },
  {
    id: "qd-138",
    answer: "Il Signore degli Anelli",
    detail: "J.R.R. Tolkien",
    category: "Libro",
    clues: [
      "Il giorno del centoundicesimo compleanno di uno hobbit.",
      "Dalla Contea fino al Monte Fato.",
      "Una compagnia di nove, con un elfo, un nano e un mago grigio.",
      "Per distruggere un oggetto che li domina tutti.",
    ],
  },

  // ─── Marchi ───
  {
    id: "qd-139",
    answer: "Coca-Cola",
    category: "Marchio",
    clues: [
      "Nel 1886, in una farmacia di Atlanta.",
      "In quasi ogni angolo del mondo.",
      "Una ricetta segreta chiusa in cassaforte e una bottiglia dalla forma inconfondibile.",
      "Perché a Natale ci ha regalato un Babbo Natale vestito di rosso.",
    ],
  },
  {
    id: "qd-140",
    answer: "McDonald's",
    category: "Marchio",
    clues: [
      "Nel 1955, quando un venditore di frullatori capì che quel chiosco poteva diventare un impero.",
      "Sotto due archi gialli, in quasi ogni città.",
      "Un clown, un menu per bambini con la sorpresa e patatine nel cartoccio.",
      "Perché a volte hai fame e non vuoi aspettare.",
    ],
  },
  {
    id: "qd-141",
    answer: "LEGO",
    category: "Marchio",
    clues: [
      "Dal 1958, quando un mattoncino ebbe i suoi bottoncini.",
      "A Billund, in Danimarca.",
      "Si incastrano, e pestarli a piedi nudi fa malissimo.",
      "Perché il nome viene da «gioca bene», in danese.",
    ],
  },
  {
    id: "qd-142",
    answer: "IKEA",
    category: "Marchio",
    clues: [
      "Il sabato pomeriggio, quando mezza città va lì.",
      "In un capannone blu e giallo, con un percorso obbligato.",
      "Mobili in scatola, nomi impronunciabili e una brugola in regalo.",
      "Per comprare una libreria e uscire con candele, piante e polpette.",
    ],
  },
  {
    id: "qd-143",
    answer: "Apple",
    category: "Marchio",
    clues: [
      "Dal 1976, in un garage californiano.",
      "A Cupertino, in un'enorme sede rotonda come un'astronave.",
      "Un frutto morsicato.",
      "Perché bisogna pensare diverso.",
    ],
  },
  {
    id: "qd-144",
    answer: "Vespa",
    detail: "Piaggio",
    category: "Marchio",
    clues: [
      "Nel 1946, quando l'Italia doveva ripartire.",
      "Da Pontedera alle strade di Roma in Vacanze romane.",
      "Due ruote piccole, la scocca tonda e un ronzio caratteristico.",
      "Perché, a vederla, sembra un insetto.",
    ],
  },

  // ─── Modi di dire ───
  {
    id: "qd-145",
    answer: "Piove sul bagnato",
    category: "Modo di dire",
    clues: [
      "Quando hai appena bucato una gomma e ti arriva pure la multa.",
      "Nelle giornate di chi è già sfortunato.",
      "Come un temporale su chi è già fradicio.",
      "Perché le sfortune non vengono mai da sole.",
    ],
  },
  {
    id: "qd-146",
    answer: "Non dire gatto se non ce l'hai nel sacco",
    category: "Modo di dire",
    clues: [
      "Prima della fine della partita, quando stai già festeggiando.",
      "Al mercato di una volta, dove si comprava un animale per la cena.",
      "Un sacco ben chiuso con un felino dentro.",
      "Perché non si canta vittoria troppo presto.",
    ],
  },
  {
    id: "qd-147",
    answer: "Avere le mani bucate",
    category: "Modo di dire",
    clues: [
      "Ogni volta che arriva lo stipendio, e sparisce.",
      "Nei negozi, ai saldi, negli acquisti online.",
      "Le monete scivolano via come da un colino.",
      "Perché spende tutto quello che ha.",
    ],
  },
  {
    id: "qd-148",
    answer: "Prendere due piccioni con una fava",
    category: "Modo di dire",
    clues: [
      "Quando vai in centro per una commissione e ne sbrighi due.",
      "In campagna, dove una volta si cacciavano uccelli con i legumi.",
      "Un solo seme, due uccelli.",
      "Perché con un solo sforzo ottieni due risultati.",
    ],
  },
  {
    id: "qd-149",
    answer: "Essere al verde",
    category: "Modo di dire",
    clues: [
      "A fine mese, prima dello stipendio.",
      "Nel portafoglio vuoto.",
      "Come le candele delle aste di una volta, colorate in fondo: quando si arrivava lì, era finita.",
      "Perché non hai più un soldo.",
    ],
  },
  {
    id: "qd-150",
    answer: "Chi dorme non piglia pesci",
    category: "Modo di dire",
    clues: [
      "All'alba, quando i pescatori sono già in mare.",
      "Su una barca, mentre qualcuno russa.",
      "Una rete vuota per chi è rimasto a letto.",
      "Perché chi è pigro non ottiene niente.",
    ],
  },

  // ─── Mestieri ───
  {
    id: "qd-151",
    answer: "Il pompiere",
    category: "Mestiere",
    clues: [
      "Quando suona l'allarme, a qualsiasi ora.",
      "In cima a una scala lunghissima o dentro un camion rosso.",
      "Casco, idrante e a volte un gatto da recuperare su un albero.",
      "Per spegnere gli incendi.",
    ],
  },
  {
    id: "qd-152",
    answer: "L'astronauta",
    category: "Mestiere",
    clues: [
      "Dopo anni di addestramento, alla fine del conto alla rovescia.",
      "Fuori dall'atmosfera, a 400 km d'altezza.",
      "In tuta pressurizzata, fluttuando e bevendo l'acqua a bolle.",
      "Per esplorare lo spazio. Come Samantha Cristoforetti.",
    ],
  },
  {
    id: "qd-153",
    answer: "Il dentista",
    category: "Mestiere",
    clues: [
      "Ogni sei mesi, se sei bravo.",
      "Su una poltrona reclinabile, con una lampada in faccia.",
      "Ti fa domande mentre hai la bocca piena di attrezzi.",
      "Per curarti una carie.",
    ],
  },
  {
    id: "qd-154",
    answer: "Il sommelier",
    category: "Mestiere",
    clues: [
      "A una cena importante, quando si sceglie la bottiglia.",
      "Nei ristoranti eleganti, tra la cantina e i tavoli.",
      "Fa roteare il bicchiere, annusa e parla di frutti di bosco.",
      "Per consigliare il vino giusto.",
    ],
  },
  {
    id: "qd-155",
    answer: "Il postino",
    category: "Mestiere",
    clues: [
      "Ogni mattina, tranne la domenica.",
      "Di casa in casa, in motorino o in bicicletta.",
      "Una borsa piena di buste e, a volte, un cane che lo insegue.",
      "Per consegnare la posta. Suona sempre due volte.",
    ],
  },
  {
    id: "qd-156",
    answer: "Il mimo",
    category: "Mestiere",
    clues: [
      "Durante uno spettacolo in piazza, in silenzio totale.",
      "Dentro una scatola invisibile.",
      "Faccia bianca, maglia a righe e guanti bianchi.",
      "Per raccontare tutto senza dire una parola.",
    ],
  },
];
