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
  | "Mestiere";

export interface QdcpCard {
  id: string;
  /** Soluzione, mostrata al master e svelata a fine carta. */
  answer: string;
  /** Dettaglio per il master, per riconoscere risposte giuste ma imprecise. */
  detail?: string;
  category: QdcpCategory;
  /**
   * Sempre nell'ordine QUANDO, DOVE, COME, PERCHÉ. Ogni indizio risponde
   * davvero alla sua domanda, anche nella forma:
   * - QUANDO? un'espressione di tempo ("Nel…", "Il 26 ottobre…", "Dal…").
   * - DOVE? un luogo ("In…", "A…", "Su…", "Tra…").
   * - COME? il modo: "Con…" oppure un gerundio ("Saltando…").
   * - PERCHÉ? un motivo o uno scopo: "Perché…" oppure "Per…".
   * Scala di difficoltà: QUANDO difficilissimo (fatto preciso da esperti,
   * nessun elemento di trama), DOVE difficile (luogo preciso ma secondario),
   * COME medio, PERCHÉ facile (il tormentone, l'icona). Ogni indizio è vero
   * e porta solo a quella risposta. La soluzione non compare mai dentro.
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
      "Una domenica notte d'aprile del 1912, con il mare piatto e senza luna.",
      "A sud di Terranova, a quasi quattro chilometri di profondità.",
      "Disegnando un ritratto a carboncino e ballando scatenati in terza classe.",
      "Perché un iceberg squarcia la nave «inaffondabile», e su quella porta c'era posto per uno solo.",
    ],
  },
  {
    id: "qd-002",
    answer: "La vita è bella",
    detail: "Roberto Benigni, 1997",
    category: "Film",
    clues: [
      "Tra il 1939 e il 1945; mezzo secolo dopo, tre statuette, una per il miglior attore.",
      "In una libreria di Arezzo, poi su un treno diretto a nord.",
      "Inventando per il figlio un gioco a punti, sorridendo fino all'ultimo.",
      "Per vincere un carro armato vero. «Buongiorno, principessa!»",
    ],
  },
  {
    id: "qd-003",
    answer: "Il Re Leone",
    detail: "Disney, 1994",
    category: "Film",
    clues: [
      "Nell'estate del 1994, con le canzoni di Elton John.",
      "In una gola stretta, travolto da una mandria di gnu.",
      "Crescendo lontano da casa con un suricato e un facocero, senza pensieri.",
      "Perché lo zio voleva il trono. Hakuna matata.",
    ],
  },
  {
    id: "qd-004",
    answer: "Ritorno al futuro",
    detail: "Robert Zemeckis, 1985",
    category: "Film",
    clues: [
      "Il 26 ottobre 1985, all'una e venti di notte.",
      "Nel parcheggio deserto di un centro commerciale.",
      "Sfruttando un fulmine che colpisce la torre dell'orologio, cronometrato al secondo.",
      "Perché i suoi genitori devono innamorarsi, o lui sparisce dalla foto. A 88 miglia orarie su una DeLorean.",
    ],
  },
  {
    id: "qd-005",
    answer: "Jurassic Park",
    detail: "Steven Spielberg, 1993",
    category: "Film",
    clues: [
      "Nell'estate del 1993, da un romanzo di Michael Crichton.",
      "Su un'isola al largo del Costa Rica, durante una tempesta.",
      "Clonando il DNA trovato nel sangue di una zanzara chiusa nell'ambra.",
      "Per riportare in vita i dinosauri. La vita trova sempre un modo.",
    ],
  },
  {
    id: "qd-006",
    answer: "Fantozzi",
    detail: "Il ragionier Ugo, Paolo Villaggio",
    category: "Film",
    clues: [
      "Dal 1975, da un libro di un comico genovese che lo interpretò per vent'anni.",
      "In un ufficio molti piani sotto quello del Megadirettore.",
      "Prendendo l'autobus al volo dalla finestra e subendo ogni umiliazione dai superiori.",
      "Perché è il ragioniere più sfortunato d'Italia. E la Corazzata Potëmkin è una cagata pazzesca!",
    ],
  },
  {
    id: "qd-007",
    answer: "Il Padrino",
    detail: "Francis Ford Coppola, 1972",
    category: "Film",
    clues: [
      "Il giorno di un matrimonio, a fine estate del 1945, a New York.",
      "In un giardino di Long Island, poi in un paese dell'entroterra siciliano.",
      "Accarezzando un gatto, facendosi baciare l'anello e lasciando una testa di cavallo nel letto.",
      "Per proteggere la famiglia: gli farà un'offerta che non potrà rifiutare.",
    ],
  },
  {
    id: "qd-008",
    answer: "Mamma, ho perso l'aereo",
    detail: "1990 · Macaulay Culkin",
    category: "Film",
    clues: [
      "Nel Natale del 1990, dopo un blackout notturno che fa saltare la sveglia.",
      "In un sobborgo di Chicago, in una casa di mattoni rossi.",
      "Riempiendo la casa di trappole: barattoli di vernice sulle scale e maniglie arroventate.",
      "Perché la famiglia è volata a Parigi per Natale dimenticandolo a casa.",
    ],
  },
  {
    id: "qd-009",
    answer: "Shrek",
    detail: "DreamWorks, 2001",
    category: "Film",
    clues: [
      "Nel 2001; fu il primo film a vincere l'Oscar per l'animazione.",
      "In una palude, e poi in una torre sorvegliata da una bestia che sputa fuoco.",
      "Partendo con un asino chiacchierone per salvare una principessa, solo per riavere la sua casa.",
      "Perché gli orchi sono come le cipolle: hanno gli strati.",
    ],
  },
  {
    id: "qd-010",
    answer: "Matrix",
    detail: "1999 · Keanu Reeves",
    category: "Film",
    clues: [
      "Nel 1999, anche se in realtà si è molto più avanti nel tempo.",
      "In un vecchio hotel abbandonato e su una nave che viaggia sotto terra.",
      "Schivando i proiettili piegati all'indietro, al rallentatore.",
      "Perché ha scelto la pillola rossa, e ha scoperto che il mondo è una simulazione.",
    ],
  },

  // ─── Canzoni ───
  {
    id: "qd-011",
    answer: "Nel blu dipinto di blu (Volare)",
    detail: "Domenico Modugno, Sanremo 1958",
    category: "Canzone",
    clues: [
      "Febbraio 1958; l'anno dopo vinse due Grammy, cantata in italiano.",
      "Su un palco della Liguria, e poi dall'altra parte dell'oceano.",
      "Con le braccia spalancate sul palco, sognando di avere mani e faccia dipinte.",
      "Perché un sogno così non ritorna mai più: «oh oh, cantare, oh oh oh oh».",
    ],
  },
  {
    id: "qd-012",
    answer: "Bella ciao",
    category: "Canzone",
    clues: [
      "Tra il 1943 e il 1945, ma diventata famosa soprattutto dopo la guerra.",
      "Dalle risaie del Vercellese ai cortei di mezzo mondo.",
      "In coro, a pugno chiuso, e persino da rapinatori in tuta rossa e maschera di Dalí.",
      "Perché è arrivato l'invasor, e si vuol morire da partigiano.",
    ],
  },
  {
    id: "qd-013",
    answer: "Azzurro",
    detail: "Adriano Celentano, 1968 · scritta da Paolo Conte",
    category: "Canzone",
    clues: [
      "Nel 1968, scritta da un avvocato di Asti per la voce di un altro.",
      "In un giardino, tra un oleandro e un baobab.",
      "Su un treno dei desideri che, nei pensieri, va all'incontrario.",
      "Perché il pomeriggio è troppo… di quel colore, e lei è partita per le spiagge.",
    ],
  },
  {
    id: "qd-014",
    answer: "Bohemian Rhapsody",
    detail: "Queen, 1975",
    category: "Canzone",
    clues: [
      "Nel 1975; la casa discografica la riteneva troppo lunga per la radio.",
      "In un vecchio studio ricavato in una fattoria del Galles.",
      "Passando da una ballata a un'opera a un pezzo hard rock, in sei minuti.",
      "Perché ha appena ucciso un uomo, e lo confessa alla mamma. Galileo, Figaro!",
    ],
  },
  {
    id: "qd-015",
    answer: "Sarà perché ti amo",
    detail: "Ricchi e Poveri, 1981",
    category: "Canzone",
    clues: [
      "Nel 1981, arrivata solo quinta a Sanremo.",
      "Nelle feste di mezza Europa, soprattutto tra Germania e Spagna.",
      "Ballando in coro, con un'emozione che cresce piano piano.",
      "Per un'emozione che fa volare sempre più in alto. «Che confusione!»",
    ],
  },
  {
    id: "qd-016",
    answer: "Despacito",
    detail: "Luis Fonsi e Daddy Yankee, 2017",
    category: "Canzone",
    clues: [
      "Nell'estate del 2017, il primo video a superare i tre miliardi di visualizzazioni.",
      "In un quartiere colorato di San Juan, affacciato sul mare dei Caraibi.",
      "Lentamente, passo dopo passo, a ritmo di reggaeton.",
      "Perché tutto va fatto «pasito a pasito, suave suavecito».",
    ],
  },
  {
    id: "qd-017",
    answer: "Vita spericolata",
    detail: "Vasco Rossi, Sanremo 1983",
    category: "Canzone",
    clues: [
      "Sanremo 1983, arrivata penultima: il cantante uscì di scena prima della fine.",
      "Da un paese dell'Appennino modenese fino agli stadi.",
      "Senza dormire mai, piena di guai, come quelle dei film.",
      "Perché vuole vivere come Steve McQueen. Al Roxy Bar, con Vasco.",
    ],
  },
  {
    id: "qd-018",
    answer: "Imagine",
    detail: "John Lennon, 1971",
    category: "Canzone",
    clues: [
      "Nel 1971, poco dopo lo scioglimento della band più famosa del mondo.",
      "In una grande villa della campagna inglese, in una stanza tutta bianca.",
      "Seduto al pianoforte, chiudendo gli occhi e pensando a un mondo senza confini.",
      "Perché forse è un sognatore, ma non è l'unico. John Lennon.",
    ],
  },
  {
    id: "qd-019",
    answer: "Il cielo in una stanza",
    detail: "Gino Paoli, 1960 · cantata da Mina",
    category: "Canzone",
    clues: [
      "Nel 1960, scritta da un genovese ispirato da una camera molto particolare.",
      "Tra quattro pareti che scompaiono.",
      "Con un'armonica che sembra un organo che vibra, mentre il soffitto diventa alberi.",
      "Perché quando sei qui con me le pareti non ci sono più. La cantò Mina.",
    ],
  },
  {
    id: "qd-020",
    answer: "We Are the Champions",
    detail: "Queen, 1977",
    category: "Canzone",
    clues: [
      "Nel 1977, scritta pensando ai cori delle curve di calcio.",
      "Negli spogliatoi e sui pullman scoperti.",
      "A squarciagola, abbracciati a sconosciuti, con una coppa alzata al cielo.",
      "Perché non c'è tempo per i perdenti. Freddie Mercury.",
    ],
  },

  // ─── Personaggi ───
  {
    id: "qd-021",
    answer: "Harry Potter",
    category: "Personaggio",
    clues: [
      "Il 31 luglio, lo stesso giorno in cui compie gli anni la sua autrice.",
      "Al numero 4 di una via di periferia inglese, in uno sgabuzzino.",
      "Con una bacchetta, una civetta bianca e una scopa volante.",
      "Perché è il ragazzo che è sopravvissuto, con la cicatrice a forma di saetta.",
    ],
  },
  {
    id: "qd-022",
    answer: "Pinocchio",
    category: "Personaggio",
    clues: [
      "Dal 1881, a puntate su un giornale per bambini.",
      "In un'osteria, in un campo dove si seminano monete e su un'isola di divertimenti.",
      "Facendosi imbrogliare da un Gatto e una Volpe e ignorando i consigli di un grillo.",
      "Perché vuole diventare un bambino vero. E le bugie gli allungano il naso.",
    ],
  },
  {
    id: "qd-023",
    answer: "Leonardo da Vinci",
    category: "Personaggio",
    clues: [
      "Dal 15 aprile 1452 al 2 maggio 1519.",
      "In un castello sulla Loira, ospite di un re.",
      "Scrivendo da destra a sinistra e disegnando macchine per volare.",
      "Perché ha dipinto l'Ultima Cena e il sorriso della Gioconda.",
    ],
  },
  {
    id: "qd-024",
    answer: "Cristoforo Colombo",
    category: "Personaggio",
    clues: [
      "Il 3 agosto, salpando mezz'ora prima dell'alba con i soldi di una regina.",
      "Su un'isola dei Caraibi, che battezzò con un nome sacro.",
      "Con tre caravelle e un equipaggio che voleva tornare indietro.",
      "Perché cercava le Indie, e invece trovò l'America.",
    ],
  },
  {
    id: "qd-025",
    answer: "Albert Einstein",
    category: "Personaggio",
    clues: [
      "Nel 1905, mentre di giorno faceva l'impiegato all'ufficio brevetti.",
      "Tra Berna e un'università del New Jersey.",
      "Con i capelli spettinati, senza calzini, facendo la linguaccia in una foto.",
      "Perché tutto è relativo. E = mc².",
    ],
  },
  {
    id: "qd-026",
    answer: "Napoleone Bonaparte",
    category: "Personaggio",
    clues: [
      "Il 5 maggio 1821, giorno a cui un poeta milanese dedicò un'ode.",
      "Su tre isole: dove nacque, dove fu esiliato, dove morì.",
      "Con la mano infilata nel panciotto e il cappello a due punte di traverso.",
      "Perché si fece imperatore dei francesi e conquistò mezza Europa, fino a Waterloo.",
    ],
  },
  {
    id: "qd-027",
    answer: "Diego Armando Maradona",
    category: "Personaggio",
    clues: [
      "Il 22 giugno 1986, contro l'Inghilterra: due gol in quattro minuti.",
      "Da una baraccopoli di Buenos Aires fino al Sud Italia.",
      "Palleggiando col sinistro, con la maglia numero 10, e segnando persino di mano.",
      "Perché a Napoli ha portato due scudetti ed è più di un santo.",
    ],
  },
  {
    id: "qd-028",
    answer: "Valentino Rossi",
    category: "Personaggio",
    clues: [
      "Dal 1996 al 2021, la domenica all'ora di pranzo.",
      "Da un paesino tra Marche e Romagna a tutti i circuiti del mondo.",
      "Con il numero 46, accovacciato a parlare con la moto prima di partire.",
      "Perché il Dottore ha vinto nove titoli mondiali.",
    ],
  },
  {
    id: "qd-029",
    answer: "Raffaella Carrà",
    category: "Personaggio",
    clues: [
      "Il sabato sera degli anni Settanta; nata a Bologna nel 1943.",
      "Tra la Romagna, Roma e una Spagna che la adora.",
      "Ballando il Tuca Tuca con un caschetto biondo che non si spostava mai.",
      "Perché com'è bello far l'amore da Trieste in giù!",
    ],
  },
  {
    id: "qd-030",
    answer: "Steve Jobs",
    category: "Personaggio",
    clues: [
      "Il 9 gennaio 2007, su un palco di San Francisco.",
      "Da un garage di Los Altos a uno studio di animazione.",
      "In dolcevita nero e jeans, chiudendo le presentazioni con «one more thing».",
      "Perché ha fondato la Mela. «Siate affamati, siate folli.»",
    ],
  },
  {
    id: "qd-031",
    answer: "Dante Alighieri",
    category: "Personaggio",
    clues: [
      "Nella settimana santa del 1300, a trentacinque anni.",
      "Morto in esilio a Ravenna, senza mai più tornare nella sua città.",
      "Attraversando tre regni dell'aldilà, con un poeta latino come guida.",
      "Perché per amore di Beatrice ha scritto la Divina Commedia.",
    ],
  },
  {
    id: "qd-032",
    answer: "Michael Jackson",
    category: "Personaggio",
    clues: [
      "Il 25 marzo 1983, in uno speciale TV per i 25 anni di una casa discografica di Detroit.",
      "Da una cittadina dell'Indiana a un ranch con le giostre.",
      "Con un guanto bianco solo, camminando all'indietro come sulla luna.",
      "Perché è il re del pop.",
    ],
  },

  // ─── Luoghi ───
  {
    id: "qd-033",
    answer: "Venezia",
    category: "Luogo",
    clues: [
      "Dal 25 marzo 421 a mezzogiorno, secondo la tradizione.",
      "Su più di cento isolette, appoggiate su milioni di pali di legno.",
      "In gondola o in vaporetto, mai in macchina, e d'inverno con gli stivali per l'acqua alta.",
      "Perché qui a Carnevale ci si mette la maschera, sotto il Ponte di Rialto.",
    ],
  },
  {
    id: "qd-034",
    answer: "Torre di Pisa",
    category: "Luogo",
    clues: [
      "Dal 1173; arrivata al terzo piano, aveva già cominciato a pensarci.",
      "In un prato, accanto a un duomo e a un battistero.",
      "Inclinata di quasi quattro metri, con otto piani di marmo bianco e sette campane.",
      "Perché il terreno era troppo molle, e i turisti fingono di reggerla in foto.",
    ],
  },
  {
    id: "qd-035",
    answer: "Colosseo",
    category: "Luogo",
    clues: [
      "Nell'80 dopo Cristo, inaugurato con cento giorni di giochi.",
      "Dove prima c'era il laghetto della villa di Nerone.",
      "Con cinquantamila spettatori, un telo per il sole e belve che salivano dal sotterraneo.",
      "Perché lì combattevano i gladiatori.",
    ],
  },
  {
    id: "qd-036",
    answer: "Stonehenge",
    category: "Luogo",
    clues: [
      "Da circa cinquemila anni, e ogni 21 giugno all'alba con migliaia di persone.",
      "In una piana erbosa vicino a Salisbury.",
      "Con pietre enormi messe in cerchio, alcune trascinate dal Galles.",
      "Perché? Calendario, tempio o cimitero: il cerchio di pietre più famoso resta un mistero.",
    ],
  },
  {
    id: "qd-037",
    answer: "Las Vegas",
    category: "Luogo",
    clues: [
      "Dal 1905 come fermata della ferrovia, e dal 1931 con il gioco d'azzardo legale.",
      "In mezzo al deserto del Mojave, non lontano da una grande diga.",
      "Con una piramide, un castello e una Torre Eiffel finti, e matrimoni lampo celebrati da Elvis.",
      "Perché quello che succede qui, resta qui. Casinò ovunque.",
    ],
  },
  {
    id: "qd-038",
    answer: "Polo Nord",
    category: "Luogo",
    clues: [
      "Il 6 aprile 1909, secondo un esploratore americano a cui non tutti credettero.",
      "Dove non c'è terra sotto i piedi, e ogni direzione è sud.",
      "Su un mare ghiacciato, tra orsi bianchi e senza nessun pinguino.",
      "Perché lì arrivano tutte le letterine per Babbo Natale.",
    ],
  },
  {
    id: "qd-039",
    answer: "Monte Everest",
    category: "Luogo",
    clues: [
      "Il 29 maggio 1953, alle undici e mezza del mattino.",
      "Sull'Himalaya, dove i nepalesi lo chiamano Sagarmatha e i tibetani Chomolungma.",
      "Con bombole d'ossigeno, sherpa e la cosiddetta «zona della morte».",
      "Perché è la montagna più alta del mondo.",
    ],
  },
  {
    id: "qd-040",
    answer: "Città del Vaticano",
    category: "Luogo",
    clues: [
      "Dall'11 febbraio 1929, con i Patti Lateranensi.",
      "Dentro una capitale, in meno di mezzo chilometro quadrato.",
      "Sorvegliato da guardie svizzere in divisa a righe.",
      "Perché lì vive il Papa, e quando esce il fumo bianco ce n'è uno nuovo.",
    ],
  },
  {
    id: "qd-041",
    answer: "Area 51",
    category: "Luogo",
    clues: [
      "Dal 1955, ma la CIA ne ha ammesso l'esistenza solo nel 2013.",
      "Vicino al lago prosciugato di Groom, nel deserto del Nevada.",
      "Con cartelli che vietano l'ingresso, aerei spia e telecamere ovunque.",
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
      "Un lunedì d'estate del 1969, alle 4:56 del mattino ora italiana.",
      "In un «mare» dove non c'è una goccia d'acqua: quello della Tranquillità.",
      "Scendendo da un modulo chiamato Eagle e lasciando un'impronta di stivale.",
      "Perché bisognava arrivarci prima dei russi. «Un piccolo passo per un uomo.»",
    ],
  },
  {
    id: "qd-043",
    answer: "La caduta del Muro di Berlino",
    detail: "9 novembre 1989",
    category: "Evento",
    clues: [
      "Una sera di novembre del 1989, per un foglietto letto male in conferenza stampa.",
      "In una città divisa in due da ventotto anni.",
      "A colpi di martello e piccone, tra lacrime e abbracci con sconosciuti.",
      "Perché Est e Ovest volevano tornare insieme, e la Guerra Fredda stava finendo.",
    ],
  },
  {
    id: "qd-044",
    answer: "La scoperta della penicillina",
    detail: "Alexander Fleming, 1928",
    category: "Evento",
    clues: [
      "Nel settembre del 1928, al ritorno dalle vacanze estive.",
      "In un laboratorio disordinato del St Mary's Hospital di Londra.",
      "Per puro caso: una muffa cresciuta su una piastra dimenticata.",
      "Perché da allora un'infezione non è più una condanna. Il primo antibiotico, di Fleming.",
    ],
  },
  {
    id: "qd-045",
    answer: "La spedizione dei Mille",
    detail: "Garibaldi, 1860",
    category: "Evento",
    clues: [
      "Nella notte tra il 5 e il 6 maggio 1860.",
      "Da uno scoglio di Quarto, vicino a Genova, fino a Marsala.",
      "Con due piroscafi e volontari in camicia rossa.",
      "Perché l'Italia andava fatta. Garibaldi.",
    ],
  },
  {
    id: "qd-046",
    answer: "L'eruzione del Vesuvio a Pompei",
    detail: "79 d.C.",
    category: "Evento",
    clues: [
      "Il 24 agosto del 79 secondo i libri; in autunno secondo una scritta a carboncino.",
      "In Campania, ai piedi di una montagna che nessuno credeva pericolosa.",
      "Con una nube a forma di pino, poi cenere e lapilli per ore.",
      "Perché il vulcano si risvegliò, e una città intera rimase ferma nel tempo.",
    ],
  },
  {
    id: "qd-047",
    answer: "La presa della Bastiglia",
    detail: "Rivoluzione francese, 1789",
    category: "Evento",
    clues: [
      "Un martedì d'estate del 1789; quella sera il re scrisse sul diario: «Niente».",
      "In una fortezza-prigione di Parigi che quel giorno aveva solo sette detenuti.",
      "Con picche, fucili e una folla affamata in cerca di polvere da sparo.",
      "Perché il popolo non ne poteva più del re: inizia la Rivoluzione francese.",
    ],
  },
  {
    id: "qd-048",
    answer: "Woodstock",
    detail: "Festival, agosto 1969",
    category: "Evento",
    clues: [
      "Dal 15 al 18 agosto 1969, sotto la pioggia.",
      "Nella fattoria di Max Yasgur, nello stato di New York.",
      "Nel fango, con fiori nei capelli e mezzo milione di persone.",
      "Per tre giorni di pace, amore e musica. Hendrix suonò l'inno americano.",
    ],
  },
  {
    id: "qd-049",
    answer: "Il disastro di Chernobyl",
    detail: "26 aprile 1986",
    category: "Evento",
    clues: [
      "Il 26 aprile 1986, all'1:23 di notte.",
      "Vicino a Pryp'jat', una città oggi vuota, con una ruota panoramica mai usata.",
      "Durante un test di sicurezza, con il reattore numero 4 che esplode.",
      "Perché quella notte il nucleare sfuggì di mano, e la nube arrivò fino in Italia.",
    ],
  },

  // ─── Oggetti ───
  {
    id: "qd-050",
    answer: "Il cubo di Rubik",
    category: "Oggetto",
    clues: [
      "Nel 1974, inventato da un professore di architettura per una lezione.",
      "A Budapest, poi in tutte le camerette degli anni Ottanta.",
      "Girando sei facce colorate, tra miliardi di combinazioni.",
      "Per far tornare ogni faccia di un solo colore.",
    ],
  },
  {
    id: "qd-051",
    answer: "La moka",
    category: "Oggetto",
    clues: [
      "Dal 1933, inventata in Piemonte da un certo Alfonso.",
      "A Omegna, sul lago d'Orta, e poi in quasi ogni cucina d'Italia.",
      "Con l'acqua sotto, la polvere in mezzo e un borbottio che annuncia la fine.",
      "Per fare il caffè a casa. Con l'omino coi baffi.",
    ],
  },
  {
    id: "qd-052",
    answer: "Il telecomando",
    category: "Oggetto",
    clues: [
      "Dal 1950, quando si chiamava «Lazy Bones» ed era collegato con un filo.",
      "Sotto il cuscino del divano.",
      "Puntando e premendo, finché le pile non finiscono nel momento sbagliato.",
      "Per cambiare canale senza alzarsi dal divano.",
    ],
  },
  {
    id: "qd-053",
    answer: "Il paracadute",
    category: "Oggetto",
    clues: [
      "Nel 1783, quando un francese si lanciò dalla torre di un osservatorio.",
      "Fuori da un portellone aperto, a quattromila metri.",
      "Tirando una maniglia, che apre una cupola di stoffa.",
      "Per non schiantarsi a terra dopo il salto.",
    ],
  },
  {
    id: "qd-054",
    answer: "La clessidra",
    category: "Oggetto",
    clues: [
      "Ai tempi delle caravelle, per misurare la velocità insieme a una corda piena di nodi.",
      "Sui tavoli dei giochi di società.",
      "Con la sabbia che scende tra due bulbi di vetro.",
      "Per sapere quando il tempo è finito. Poi la si gira.",
    ],
  },
  {
    id: "qd-055",
    answer: "Lo specchio",
    category: "Oggetto",
    clues: [
      "Da quando a Murano si capì come stendere stagno e mercurio dietro il vetro.",
      "In una galleria di Versailles, trecentocinquantasette volte.",
      "Riflettendo tutto esattamente, ma al contrario.",
      "Per sapere chi è la più bella del reame.",
    ],
  },
  {
    id: "qd-056",
    answer: "La bussola",
    category: "Oggetto",
    clues: [
      "Più di mille anni fa in Cina, con un cucchiaio di pietra che indicava il sud.",
      "In tasca a un escursionista o sul ponte di una nave.",
      "Con un ago che trema e poi si ferma, sempre nella stessa direzione.",
      "Per trovare il nord quando ti sei perso.",
    ],
  },
  {
    id: "qd-057",
    answer: "Il salvadanaio",
    category: "Oggetto",
    clues: [
      "Quando «pygg» era solo un'argilla per fare vasi, e nessuno pensava agli animali.",
      "Sul comodino dei bambini.",
      "Infilando monete in una fessura; per riaverle va rotto.",
      "Per risparmiare. E spesso ha la forma di un maialino.",
    ],
  },
  {
    id: "qd-058",
    answer: "Il frigorifero",
    category: "Oggetto",
    clues: [
      "Col boom degli anni Cinquanta, quando mandò in pensione la ghiacciaia.",
      "In cucina, coperto di calamite.",
      "Tenendo tutto al freddo; e quando apri la porta si accende una luce.",
      "Perché il cibo, al freddo, dura di più.",
    ],
  },

  // ─── Sport ───
  {
    id: "qd-059",
    answer: "Il Giro d'Italia",
    category: "Sport",
    clues: [
      "Dal 13 maggio 1909, con la partenza da Milano nel cuore della notte.",
      "Su e giù per lo Stivale, tra lo Stelvio e lo Zoncolan.",
      "Pedalando per tre settimane, tappa dopo tappa, su e giù per le montagne.",
      "Per indossare la maglia rosa all'ultima tappa.",
    ],
  },
  {
    id: "qd-060",
    answer: "Il Palio di Siena",
    category: "Sport",
    clues: [
      "Il 2 luglio e il 16 agosto, da secoli.",
      "In una piazza a forma di conchiglia, ricoperta di terra per l'occasione.",
      "Con cavalli montati a pelo, tre giri di piazza e contrade rivali.",
      "Per vincere un drappo dipinto in Piazza del Campo.",
    ],
  },
  {
    id: "qd-061",
    answer: "Le Olimpiadi",
    category: "Sport",
    clues: [
      "Dal 776 avanti Cristo, quando c'era un'unica gara di corsa.",
      "Ogni volta in una città diversa, con un villaggio costruito per gli atleti.",
      "Con una fiaccola che viaggia per mesi e la sfilata di tutte le bandiere.",
      "Per vincere una medaglia sotto i cinque cerchi. L'importante è partecipare.",
    ],
  },
  {
    id: "qd-062",
    answer: "Il Super Bowl",
    detail: "Finale del football americano",
    category: "Sport",
    clues: [
      "Dal 15 gennaio 1967, e da allora numerato in cifre romane.",
      "In uno stadio americano, ogni anno diverso.",
      "Con spot da milioni di dollari e un concerto a metà partita.",
      "Per vincere la finale del football americano.",
    ],
  },
  {
    id: "qd-063",
    answer: "Wimbledon",
    category: "Sport",
    clues: [
      "Dal 1877, organizzato da un club nato per giocare a croquet.",
      "In un club del sud-ovest di Londra.",
      "Sull'erba, vestiti rigorosamente di bianco, con fragole e panna in tribuna.",
      "Per vincere il torneo di tennis più antico del mondo.",
    ],
  },
  {
    id: "qd-064",
    answer: "La Ferrari",
    category: "Sport",
    clues: [
      "Dal 1947, ma il suo simbolo volava già su un aereo della Grande Guerra.",
      "In provincia di Modena, con una pista privata chiamata Fiorano.",
      "Con un cavallino rampante nero su sfondo giallo.",
      "Per vincere in Formula 1 e far impazzire i tifosi a Monza.",
    ],
  },
  {
    id: "qd-065",
    answer: "La maratona",
    category: "Sport",
    clues: [
      "Ai Giochi di Londra del 1908, quando si allungò per partire dal castello di Windsor.",
      "Lungo le strade di una città chiusa al traffico.",
      "Correndo in migliaia, bevendo al volo e sbattendo contro «il muro» al trentesimo chilometro.",
      "Per ricordare il soldato greco che corse fino ad Atene ad annunciare la vittoria: 42 km e 195 metri.",
    ],
  },
  {
    id: "qd-066",
    answer: "Italia campione del mondo 2006",
    category: "Sport",
    clues: [
      "Una domenica sera di luglio: 1 a 1 dopo 120 minuti, poi dagli undici metri.",
      "In uno stadio costruito per i Giochi del 1936.",
      "Con una testata, un'espulsione e cinque rigori perfetti.",
      "Perché Grosso segnò l'ultimo rigore e Cannavaro alzò la coppa.",
    ],
  },

  // ─── TV ───
  {
    id: "qd-067",
    answer: "Il Festival di Sanremo",
    category: "TV",
    clues: [
      "Dal 1951, quando si teneva in un casinò e le canzoni in gara erano venti.",
      "In un teatro della Riviera dei Fiori.",
      "Con l'orchestra, i fiori e un presentatore che dice «dirige il maestro…».",
      "Per vincere la gara della canzone italiana e andare all'Eurovision.",
    ],
  },
  {
    id: "qd-068",
    answer: "Chi vuol essere milionario?",
    category: "TV",
    clues: [
      "Dal 2000 in Italia, con un premio che all'inizio era in lire.",
      "In uno studio buio, seduti uno di fronte all'altro.",
      "Scegliendo tra quattro risposte, con l'aiuto del pubblico e il 50 e 50.",
      "Per vincere un milione. «È la sua risposta definitiva?»",
    ],
  },
  {
    id: "qd-069",
    answer: "I Simpson",
    category: "TV",
    clues: [
      "Dal 1987, come brevi intermezzi dentro lo show di un'altra persona.",
      "In una cittadina americana che non si sa in quale stato sia.",
      "Con quattro dita, la pelle gialla e una ciambella sempre in mano.",
      "Perché l'avevano predetto, come sempre. Homer, Marge, Bart, Lisa e Maggie.",
    ],
  },
  {
    id: "qd-070",
    answer: "Striscia la notizia",
    category: "TV",
    clues: [
      "Dal 1988, ideato dallo stesso autore di Drive In.",
      "Dietro un bancone, con due ragazze che ci ballano sopra.",
      "Con un pupazzo rosso che urla e inviati che inseguono i truffatori.",
      "Per consegnare il Tapiro d'oro.",
    ],
  },
  {
    id: "qd-071",
    answer: "Il Grande Fratello",
    category: "TV",
    clues: [
      "Dal 14 settembre 2000, ventiquattro ore su ventiquattro.",
      "In una casa a Cinecittà, con telecamere anche in bagno.",
      "Chiusi in casa, tra nomination e confessionale.",
      "Perché qualcuno ti guarda sempre, come nel romanzo di Orwell.",
    ],
  },
  {
    id: "qd-072",
    answer: "Squid Game",
    category: "TV",
    clues: [
      "Settembre 2021, ma il copione era stato scritto e rifiutato più di dieci anni prima.",
      "Su un'isola segreta della Corea del Sud.",
      "Con tute verdi numerate, guardie mascherate e giochi da bambini.",
      "Per un premio enorme. Ma chi perde a «un, due, tre, stella» viene eliminato per davvero.",
    ],
  },

  // ─── Cibo ───
  {
    id: "qd-073",
    answer: "La pizza Margherita",
    category: "Cibo",
    clues: [
      "Giugno 1889, durante una visita reale a Napoli.",
      "In un forno a legna di una pizzeria che oggi si chiama Brandi.",
      "Con pomodoro, mozzarella e basilico.",
      "In onore di una regina, con i colori della bandiera.",
    ],
  },
  {
    id: "qd-074",
    answer: "Il tiramisù",
    category: "Cibo",
    clues: [
      "Negli anni Sessanta, conteso ancora oggi tra due regioni.",
      "Tra Treviso e il Friuli.",
      "Con savoiardi inzuppati nel caffè, crema al mascarpone e cacao sopra.",
      "Perché il nome promette di tirarti su.",
    ],
  },
  {
    id: "qd-075",
    answer: "La carbonara",
    category: "Cibo",
    clues: [
      "Nel dopoguerra; la prima ricetta scritta compare solo nel 1954.",
      "Nel Lazio, dove ne sono gelosissimi.",
      "Con guanciale, uovo, pecorino e pepe. Se ci metti la panna ti cacciano.",
      "Perché si dice che fosse il piatto dei carbonai.",
    ],
  },
  {
    id: "qd-076",
    answer: "La Nutella",
    category: "Cibo",
    clues: [
      "Il 20 aprile 1964 il primo barattolo, erede di una crema chiamata Supercrema.",
      "Ad Alba, nelle Langhe.",
      "Spalmandola sul pane, da un barattolo di vetro che poi diventa bicchiere.",
      "Per la merenda. O direttamente col cucchiaio.",
    ],
  },
  {
    id: "qd-077",
    answer: "Il sushi",
    category: "Cibo",
    clues: [
      "Più di mille anni fa, quando il pesce si conservava nel riso fermentato e il riso si buttava via.",
      "Su un nastro che gira tra i tavoli di un ristorante.",
      "Con riso, alga e pesce crudo, mangiato con le bacchette.",
      "Perché «all you can eat» significa davvero tutto quello che riesci a mangiare.",
    ],
  },
  {
    id: "qd-078",
    answer: "Il panettone",
    category: "Cibo",
    clues: [
      "Alla corte di Ludovico il Moro, secondo la leggenda di un garzone di nome Toni.",
      "A Milano, dove se ne conserva una fetta da mangiare il 3 febbraio, a San Biagio.",
      "Con canditi e uvetta che qualcuno toglie sempre, alto e a cupola.",
      "Perché a Natale non può mancare, in eterna sfida col pandoro.",
    ],
  },

  // ─── Concetti ───
  {
    id: "qd-079",
    answer: "Il tempo",
    category: "Concetto",
    clues: [
      "Da circa 13,8 miliardi di anni, se davvero c'è stato un inizio.",
      "Sull'orologio e nelle rughe.",
      "Passando, volando, perdendosi, senza mai tornare indietro.",
      "Perché altrimenti succederebbe tutto nello stesso momento. È denaro, dicono.",
    ],
  },
  {
    id: "qd-080",
    answer: "La nostalgia",
    category: "Concetto",
    clues: [
      "Dal 1688, quando un medico svizzero la descrisse come una malattia dei soldati lontani.",
      "Nel cuore di chi vive lontano da casa.",
      "Con una dolce tristezza per qualcosa che non c'è più.",
      "Perché si stava meglio quando si stava peggio.",
    ],
  },
  {
    id: "qd-081",
    answer: "Il déjà vu",
    category: "Concetto",
    clues: [
      "Un attimo qualunque; il nome glielo diede un francese nel 1876.",
      "Nella testa, per un secondo, poi sparisce.",
      "Come in Matrix, quando lo stesso gatto nero passa due volte.",
      "Perché ti sembra di aver già vissuto quel momento.",
    ],
  },
  {
    id: "qd-082",
    answer: "La gelosia",
    category: "Concetto",
    clues: [
      "Nel 1604, su un palco inglese, quando un fazzoletto perso costò una vita.",
      "Nelle coppie, ma anche tra fratelli quando arriva un nuovo nato.",
      "Come un mostro dagli occhi verdi, scriveva Shakespeare.",
      "Per paura di perdere chi si ama, quando il suo telefono si illumina.",
    ],
  },
  {
    id: "qd-083",
    answer: "L'eco",
    category: "Concetto",
    clues: [
      "Un decimo di secondo dopo, se sei ad almeno diciassette metri.",
      "In montagna o in una grotta, dove viveva una ninfa che sapeva solo ripetere.",
      "Ripetendo sempre l'ultima parola… parola… parola.",
      "Perché il suono rimbalza e torna indietro.",
    ],
  },
  {
    id: "qd-084",
    answer: "Il jet lag",
    category: "Concetto",
    clues: [
      "Per qualche giorno: più o meno uno per ogni ora di differenza.",
      "In un hotel dall'altra parte del mondo, svegli alle 4 di notte.",
      "Con il corpo che dice notte e l'orologio che dice mezzogiorno.",
      "Perché hai attraversato troppi fusi orari in poche ore.",
    ],
  },
  {
    id: "qd-085",
    answer: "Lo sbadiglio",
    category: "Concetto",
    clues: [
      "Già nella pancia della mamma, e ogni volta che qualcuno vicino a te lo fa.",
      "In una riunione noiosa o davanti a un film lento.",
      "Spalancando la bocca, con gli occhi che lacrimano. Forse lo stai facendo adesso.",
      "Perché è contagioso, e arriva col sonno.",
    ],
  },
  {
    id: "qd-086",
    answer: "Il silenzio",
    category: "Concetto",
    clues: [
      "Per 4 minuti e 33 secondi, in un brano di John Cage.",
      "In una biblioteca o in cima a una montagna.",
      "Senza fare il minimo rumore, come un bambino che sparisce e ti fa preoccupare.",
      "Perché è d'oro, dice il proverbio.",
    ],
  },
  {
    id: "qd-087",
    answer: "La paura",
    category: "Concetto",
    clues: [
      "In una frazione di secondo, prima ancora di capire, grazie a una «mandorla» nel cervello.",
      "Sotto il letto, al buio.",
      "Con il cuore che accelera e i peli che si rizzano.",
      "Per farci scappare quando c'è un pericolo. Fa novanta.",
    ],
  },

  // ─── Altri film ───
  {
    id: "qd-088",
    answer: "E.T. l'extra-terrestre",
    detail: "Steven Spielberg, 1982",
    category: "Film",
    clues: [
      "Nel 1982; la notte di Halloween va in giro travestito da fantasma.",
      "In un armadio pieno di peluche, in una cittadina della California.",
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
      "Nel 2013, il giorno di un'incoronazione, in piena estate.",
      "In un regno nordico e su una montagna dove nasce un castello.",
      "Con poteri di ghiaccio, una renna e un pupazzo di neve che sogna l'estate.",
      "Perché bisogna lasciarlo andare. Let it go!",
    ],
  },
  {
    id: "qd-090",
    answer: "Rocky",
    detail: "Sylvester Stallone, 1976",
    category: "Film",
    clues: [
      "Il 1° gennaio 1976, l'anno del bicentenario americano.",
      "In una palestra di Filadelfia e nella cella frigorifera di una macelleria.",
      "Bevendo uova crude all'alba e prendendo a pugni quarti di bue.",
      "Per restare in piedi fino all'ultimo round contro il campione. «Adriana!»",
    ],
  },
  {
    id: "qd-091",
    answer: "Il Gladiatore",
    detail: "Ridley Scott, 2000 · Russell Crowe",
    category: "Film",
    clues: [
      "Nel 180 dopo Cristo, alla morte di un imperatore filosofo.",
      "Dalle foreste della Germania a una provincia africana.",
      "Da generale a schiavo, e da schiavo a combattente acclamato dalla folla.",
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
      "Nel 1983, scritta per Celentano, che la rifiutò.",
      "Con un canarino sopra la finestra.",
      "Con la chitarra in mano, tra spaghetti al dente e un partigiano come presidente.",
      "Perché ne è fiero: «Lasciatemi cantare». Toto Cutugno.",
    ],
  },
  {
    id: "qd-093",
    answer: "Gangnam Style",
    detail: "PSY, 2012",
    category: "Canzone",
    clues: [
      "Nel 2014, quando costrinse YouTube a cambiare il contatore delle visualizzazioni.",
      "In un quartiere ricco di Seul, a sud del fiume Han.",
      "Ballando come se si cavalcasse un cavallo invisibile.",
      "Perché fu il primo video a superare un miliardo di visualizzazioni. Oppa!",
    ],
  },
  {
    id: "qd-094",
    answer: "Thriller",
    detail: "Michael Jackson, 1982",
    category: "Canzone",
    clues: [
      "Nel 1983, con la voce di un attore di film horror che recita nel finale.",
      "In un cimitero, una notte di luna piena, dopo il cinema.",
      "Con zombie che ballano in sincrono e una risata spettrale alla fine.",
      "Perché è il disco più venduto della storia, di Michael Jackson.",
    ],
  },

  // ─── Altri personaggi ───
  {
    id: "qd-095",
    answer: "Marilyn Monroe",
    category: "Personaggio",
    clues: [
      "Il 19 maggio 1962, al Madison Square Garden.",
      "A Los Angeles, dove era nata come Norma Jeane.",
      "Con un neo sulla guancia e un abito bianco che si solleva sulla grata della metropolitana.",
      "Perché gli uomini preferiscono le bionde. «Happy birthday, Mr. President.»",
    ],
  },
  {
    id: "qd-096",
    answer: "Giulio Cesare",
    category: "Personaggio",
    clues: [
      "A metà marzo del 44 avanti Cristo.",
      "Dalla Gallia a un piccolo fiume romagnolo.",
      "Con ventitré pugnalate, anche da parte di un figlio adottivo.",
      "Perché voleva troppo potere. «Anche tu, Bruto?»",
    ],
  },
  {
    id: "qd-097",
    answer: "Sherlock Holmes",
    category: "Personaggio",
    clues: [
      "Dal 1887, nato dalla penna di un medico che scriveva per arrotondare.",
      "A Londra, in affitto da una padrona di casa di nome Hudson.",
      "Con pipa, lente d'ingrandimento e deduzioni infallibili.",
      "Perché per lui è tutto elementare, Watson!",
    ],
  },

  // ─── Altri luoghi ───
  {
    id: "qd-098",
    answer: "Le piramidi di Giza",
    category: "Luogo",
    clues: [
      "Più di 4.500 anni fa; per quasi quattromila anni la costruzione più alta del mondo.",
      "Ai margini del deserto, alle porte del Cairo.",
      "Con blocchi di pietra enormi, e una sfinge che fa la guardia.",
      "Per custodire il faraone per l'eternità.",
    ],
  },
  {
    id: "qd-099",
    answer: "Il Triangolo delle Bermuda",
    category: "Luogo",
    clues: [
      "Dal 5 dicembre 1945, quando cinque aerei della Marina americana decollarono e non tornarono.",
      "Nell'Atlantico, al largo della Florida.",
      "Senza un segnale di soccorso, senza un rottame: navi e aerei spariti nel nulla.",
      "Perché lì, dicono, succede qualcosa di inspiegabile, tra Miami, Porto Rico e un'isola britannica.",
    ],
  },
  {
    id: "qd-100",
    answer: "Hollywood",
    category: "Luogo",
    clues: [
      "Dal 1923, quando una scritta bianca pubblicizzava delle case e finiva con «land».",
      "Su una collina di Los Angeles.",
      "Con stelle sul marciapiede e impronte delle mani nel cemento.",
      "Perché è la fabbrica dei sogni del cinema americano.",
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
      "Con un aereo di legno e tela costruito da due ragazzi che riparavano biciclette.",
      "Perché l'uomo voleva volare, e per la prima volta un aereo a motore si stacca da terra.",
    ],
  },
  {
    id: "qd-102",
    answer: "L'invenzione della stampa",
    detail: "Gutenberg, metà del '400",
    category: "Evento",
    clues: [
      "Intorno al 1450, poco prima della caduta di Costantinopoli.",
      "In una bottega di Magonza.",
      "Con lettere di metallo mobili, inchiostro e un torchio da vino adattato.",
      "Per fare la prima Bibbia coi caratteri mobili, e far circolare le idee. Gutenberg.",
    ],
  },

  // ─── Altri oggetti ───
  {
    id: "qd-103",
    answer: "Il post-it",
    category: "Oggetto",
    clues: [
      "Nel 1968, da una colla venuta male; nei negozi solo nel 1980.",
      "Sul frigo, sul monitor, sui libri di scuola.",
      "Attaccandolo e staccandolo quante volte vuoi.",
      "Per non dimenticare niente: il foglietto giallo.",
    ],
  },
  {
    id: "qd-104",
    answer: "Gli occhiali",
    category: "Oggetto",
    clues: [
      "Alla fine del Duecento; nel 1306 un frate ne parlò in una predica come di una novità.",
      "Sul naso, o sulla testa mentre li cerchi.",
      "Con due lenti, due stanghette e un panno per pulirle.",
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
      "Il 17 giugno 1970, una notte finita quasi all'alba per chi guardava da casa.",
      "All'Azteca di Città del Messico, dove oggi c'è una targa a ricordarla.",
      "Con cinque gol nei tempi supplementari.",
      "Perché è passata alla storia come «la partita del secolo».",
    ],
  },
  {
    id: "qd-106",
    answer: "Il curling",
    category: "Sport",
    clues: [
      "Dal Cinquecento, sugli stagni ghiacciati della Scozia.",
      "Su una pista ghiacciata, con un bersaglio dipinto sotto il ghiaccio.",
      "Facendo scivolare una pietra di granito e strofinando il ghiaccio con la scopa.",
      "Per mandare la pietra il più vicino possibile al centro del bersaglio.",
    ],
  },

  // ─── Altra TV ───
  {
    id: "qd-107",
    answer: "La Ruota della Fortuna",
    category: "TV",
    clues: [
      "Dal 1989 in Italia, e per tutti gli anni Novanta prima di cena.",
      "In uno studio con un grande tabellone di lettere.",
      "Girando, sperando di non finire su «Bancarotta» e comprando una vocale.",
      "Per indovinare la frase e vincere i premi. Con Mike Bongiorno.",
    ],
  },
  {
    id: "qd-108",
    answer: "Il commissario Montalbano",
    category: "TV",
    clues: [
      "Dal 1999 in TV, dai romanzi di uno scrittore di Porto Empedocle.",
      "A Vigàta, una Sicilia che non esiste sulle mappe.",
      "Mangiando bene, nuotando al mattino e risolvendo casi con un vice dongiovanni.",
      "Perché quando risponde al telefono dice il cognome e poi «sono!».",
    ],
  },
  {
    id: "qd-109",
    answer: "Il Trono di Spade",
    category: "TV",
    clues: [
      "Dal 2011 al 2019, con un finale che i fan non hanno mai perdonato.",
      "In un continente immaginario con un muro di ghiaccio a nord.",
      "Con draghi, nozze di sangue e personaggi che muoiono quando meno te lo aspetti.",
      "Per sedersi su quella sedia di ferro e governare i Sette Regni. L'inverno sta arrivando.",
    ],
  },

  // ─── Altro cibo ───
  {
    id: "qd-110",
    answer: "La polenta",
    category: "Cibo",
    clues: [
      "Prima si faceva con farro e grano saraceno; poi arrivò un cereale dall'America.",
      "In un paiolo di rame, al Nord.",
      "Mescolando farina gialla e acqua per quaranta minuti, poi rovesciandola su un tagliere.",
      "Per accompagnare spezzatino e funghi. Si taglia col filo.",
    ],
  },
  {
    id: "qd-111",
    answer: "Il cornetto",
    category: "Cibo",
    clues: [
      "Dal 1683, si racconta, per festeggiare la fine dell'assedio di Vienna.",
      "Al bancone del bar, ogni mattina.",
      "Con la crema, la marmellata o vuoto, inzuppato nel cappuccino.",
      "Perché la colazione al bar è sacra. A Milano lo chiamano brioche.",
    ],
  },
  {
    id: "qd-112",
    answer: "Il pesto",
    category: "Cibo",
    clues: [
      "Dal 1863, nero su bianco in un ricettario della «cuciniera» ligure.",
      "In un mortaio di marmo, con un pestello di legno.",
      "Pestando basilico, pinoli, aglio, formaggio e olio.",
      "Per condire le trofie. E in aeroporto te lo sequestrano.",
    ],
  },

  // ─── Cartoni ───
  {
    id: "qd-113",
    answer: "Holly e Benji",
    category: "Cartone",
    clues: [
      "In Italia dal 1986, da un fumetto giapponese del 1981.",
      "Su un campo che sembra non finire mai.",
      "Con tiri che bucano la rete e partite che durano diversi episodi.",
      "Perché il capitano sogna di vincere un mondiale con il Giappone.",
    ],
  },
  {
    id: "qd-114",
    answer: "I Puffi",
    category: "Cartone",
    clues: [
      "Dal 1958, nati come comparse nel fumetto di un disegnatore belga.",
      "In un villaggio di case a forma di fungo.",
      "Con un capo dalla barba bianca e una sola femmina nel villaggio.",
      "Perché Gargamella vuole catturarli. Alti due mele o poco più, e tutti blu.",
    ],
  },
  {
    id: "qd-115",
    answer: "Dragon Ball",
    category: "Cartone",
    clues: [
      "Dal 1984, ispirato a un antico romanzo cinese su un re scimmia.",
      "Su un'isoletta con una casa rosa abitata da un vecchio maestro.",
      "Con la coda da scimmia, viaggiando su una nuvola.",
      "Per riunire sette sfere e chiedere un desiderio al drago Shenron.",
    ],
  },
  {
    id: "qd-116",
    answer: "Lupin III",
    category: "Cartone",
    clues: [
      "Dal 1967, nipote immaginario di un ladro gentiluomo dei romanzi francesi.",
      "In giro per il mondo, su una piccola utilitaria gialla.",
      "Con un pistolero, un samurai e una donna che lo tradisce sempre.",
      "Perché l'ispettore Zenigata non riesce mai a prenderlo.",
    ],
  },
  {
    id: "qd-117",
    answer: "SpongeBob",
    category: "Cartone",
    clues: [
      "Dal 1999, creato da un ex biologo marino.",
      "A Bikini Bottom.",
      "Con un vicino brontolone che suona il clarinetto e un capo granchio avaro.",
      "Perché vive in un ananas in fondo al mar, ed è giallo e quadrato.",
    ],
  },
  {
    id: "qd-118",
    answer: "Peppa Pig",
    category: "Cartone",
    clues: [
      "Dal 2004, episodi da cinque minuti nati in Inghilterra.",
      "In una casetta in cima a una collina.",
      "Con un fratellino che adora i dinosauri e un papà convinto di sapere tutto.",
      "Per saltare nelle pozzanghere di fango. Oink!",
    ],
  },
  {
    id: "qd-119",
    answer: "Heidi",
    category: "Cartone",
    clues: [
      "Dal 1880 in un libro svizzero; nel 1974 animata da chi poi fondò lo Studio Ghibli.",
      "Su un alpeggio, poi a Francoforte.",
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
      "Dal 1981, quando si chiamava Jumpman e sfidava un gorilla.",
      "Tra tubi verdi e castelli, nel Regno dei Funghi.",
      "Saltando, raccogliendo monete e mangiando funghi che ti fanno crescere.",
      "Perché la principessa è sempre in un altro castello.",
    ],
  },
  {
    id: "qd-121",
    answer: "Tetris",
    category: "Videogioco",
    clues: [
      "Nel 1984 a Mosca; il suo autore non ci guadagnò nulla per dodici anni.",
      "In una colonna stretta che si riempie dal basso, e dentro ogni Game Boy.",
      "Girando al volo pezzi di quattro quadratini che cadono.",
      "Per completare le righe e farle sparire.",
    ],
  },
  {
    id: "qd-122",
    answer: "Pac-Man",
    category: "Videogioco",
    clues: [
      "Nel 1980, quando in Giappone si chiamava ancora Puck-Man.",
      "In un labirinto blu.",
      "Scappando da quattro fantasmi colorati.",
      "Per mangiare tutti i puntini. E le ciliegie.",
    ],
  },
  {
    id: "qd-123",
    answer: "Fortnite",
    category: "Videogioco",
    clues: [
      "Dal 2017, quando la modalità più famosa fu aggiunta in appena due mesi.",
      "Su un'isola dove si arriva lanciandosi da un bus volante.",
      "Costruendo muri in pochi secondi e fuggendo da una tempesta che si stringe.",
      "Per restare l'ultimo in piedi e prendersi la Vittoria Reale.",
    ],
  },
  {
    id: "qd-124",
    answer: "Minecraft",
    category: "Videogioco",
    clues: [
      "Dal 2009, creato da uno svedese e poi venduto per due miliardi e mezzo di dollari.",
      "In un mondo infinito, generato a caso, dove tutto si può scavare.",
      "Scavando e costruendo di giorno, e di notte scappando da un mostro verde che esplode.",
      "Perché con i blocchi puoi costruire qualsiasi cosa.",
    ],
  },
  {
    id: "qd-125",
    answer: "Pokémon",
    category: "Videogioco",
    clues: [
      "Dal 1996, nato dalla passione d'infanzia di un giapponese per la caccia agli insetti.",
      "Nell'erba alta.",
      "Lanciando una sfera bianca e rossa.",
      "Per prenderli tutti e diventare il migliore. Pikachu!",
    ],
  },

  // ─── Animali ───
  {
    id: "qd-126",
    answer: "Il camaleonte",
    category: "Animale",
    clues: [
      "Quando ha paura o cambia umore, e non per mimetizzarsi come credono quasi tutti.",
      "Sui rami delle foreste del Madagascar.",
      "Con occhi che girano ognuno per conto suo e una lingua lunga quanto il corpo.",
      "Perché cambia colore, e così è diventato il simbolo di chi cambia idea.",
    ],
  },
  {
    id: "qd-127",
    answer: "Il pinguino",
    category: "Animale",
    clues: [
      "In pieno inverno, quando il papà tiene l'uovo sulle zampe per due mesi senza mangiare.",
      "Nell'emisfero sud, mai al Polo Nord.",
      "Camminando goffo sul ghiaccio, ma volando sott'acqua.",
      "Perché è un uccello che non vola, sempre vestito in frac.",
    ],
  },
  {
    id: "qd-128",
    answer: "Il salmone",
    category: "Animale",
    clues: [
      "Una volta nella vita, quando è ora di tornare nel posto dove è nato.",
      "Dall'oceano su per i fiumi.",
      "Saltando le cascate controcorrente, mentre gli orsi aspettano.",
      "Per deporre le uova dove è nato. Rosa, e buono affumicato.",
    ],
  },
  {
    id: "qd-129",
    answer: "La giraffa",
    category: "Animale",
    clues: [
      "Di notte, per meno di due ore, e spesso in piedi.",
      "Nella savana africana, tra le acacie.",
      "Con una lingua blu lunga mezzo metro e le macchie come un puzzle.",
      "Per arrivare alle foglie più alte, col collo più lungo del mondo animale.",
    ],
  },
  {
    id: "qd-130",
    answer: "Il koala",
    category: "Animale",
    clues: [
      "Per una ventina di ore al giorno, a occhi chiusi.",
      "Sugli alberi di eucalipto.",
      "Abbracciato ai rami, col marsupio e le orecchie pelose.",
      "Perché l'eucalipto dà pochissima energia, quindi meglio dormire. Sembra un orsetto, ma non lo è.",
    ],
  },
  {
    id: "qd-131",
    answer: "Il polpo",
    category: "Animale",
    clues: [
      "Una volta sola nella vita, quando la mamma sorveglia le uova senza mangiare, e poi muore.",
      "In una tana tra gli scogli del Mediterraneo.",
      "Con tre cuori, sangue blu e otto braccia.",
      "Per scappare lasciando una nuvola d'inchiostro.",
    ],
  },
  {
    id: "qd-132",
    answer: "L'ape",
    category: "Animale",
    clues: [
      "Per circa sei settimane d'estate, finché le ali non si consumano a forza di lavorare.",
      "In una casa di cera, attorno a una regina.",
      "Ballando per indicare alle compagne dove andare.",
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
      "La sera del 7 novembre 1628.",
      "Tra un paesino di lago, Monza e Milano.",
      "Con un frate coraggioso, una monaca dal segreto e due fidanzati separati da un prepotente.",
      "Perché questo matrimonio non s'ha da fare.",
    ],
  },
  {
    id: "qd-134",
    answer: "Il Piccolo Principe",
    detail: "Antoine de Saint-Exupéry",
    category: "Libro",
    clues: [
      "Nel 1943, pubblicato a New York da un pilota francese in esilio.",
      "Nel deserto del Sahara, e su un asteroide piccolissimo.",
      "Disegnando una pecora dentro una scatola e addomesticando una volpe.",
      "Perché l'essenziale è invisibile agli occhi.",
    ],
  },
  {
    id: "qd-135",
    answer: "Moby Dick",
    detail: "Herman Melville",
    category: "Libro",
    clues: [
      "Nel 1851, ispirato al naufragio della baleniera Essex.",
      "Su una nave partita dall'isola di Nantucket.",
      "Con un capitano dalla gamba d'avorio e un ramponiere tatuato.",
      "Per uccidere la balena bianca. «Chiamatemi Ismaele.»",
    ],
  },
  {
    id: "qd-136",
    answer: "1984",
    detail: "George Orwell",
    category: "Libro",
    clues: [
      "Scritto nel 1948; c'è chi dice che il titolo sia nato invertendo le ultime due cifre.",
      "In un ministero dove si riscrivono i giornali vecchi.",
      "Con teleschermi in ogni casa e una lingua inventata per non pensare.",
      "Perché il Grande Fratello ti guarda.",
    ],
  },
  {
    id: "qd-137",
    answer: "Romeo e Giulietta",
    detail: "William Shakespeare",
    category: "Libro",
    clues: [
      "In pochi giorni di luglio, due settimane prima che lei compia quattordici anni.",
      "Tra una festa in maschera, la cella di un frate e una cripta, con un esilio a Mantova.",
      "Con un duello, un veleno e un sonno che sembra morte.",
      "Perché il loro amore era contro Montecchi e Capuleti. Il balcone di Verona.",
    ],
  },
  {
    id: "qd-138",
    answer: "Il Signore degli Anelli",
    detail: "J.R.R. Tolkien",
    category: "Libro",
    clues: [
      "Alla fine della Terza Era, scritto in dodici anni da un professore di Oxford.",
      "Da un villaggio di case scavate nella collina fino a un vulcano.",
      "Con una compagnia di nove: un elfo, un nano, un mago grigio e quattro hobbit.",
      "Per distruggere quello che li domina tutti. «Il mio tesssoro.»",
    ],
  },

  // ─── Marchi ───
  {
    id: "qd-139",
    answer: "Coca-Cola",
    category: "Marchio",
    clues: [
      "Nel 1886, in una farmacia di Atlanta, a cinque centesimi al bicchiere.",
      "In quasi tutti i paesi del mondo, tranne Cuba e Corea del Nord.",
      "Con una ricetta segreta chiusa in cassaforte e una bottiglia dalla forma inconfondibile.",
      "Perché a Natale ci ha regalato un Babbo Natale vestito di rosso.",
    ],
  },
  {
    id: "qd-140",
    answer: "McDonald's",
    category: "Marchio",
    clues: [
      "Dal 1955, quando un venditore di frullatori rilevò il chiosco di due fratelli.",
      "In Italia dal 1985, prima di tutto a Bolzano.",
      "Con un clown, un menu per bambini con la sorpresa e patatine nel cartoccio.",
      "Perché a volte hai fame e non vuoi aspettare. Il Big Mac sotto due archi gialli.",
    ],
  },
  {
    id: "qd-141",
    answer: "LEGO",
    category: "Marchio",
    clues: [
      "Dal 1932, quando un falegname danese faceva ancora giocattoli di legno.",
      "A Billund, in Danimarca.",
      "Incastrando mattoncini colorati; e pestarli a piedi nudi fa malissimo.",
      "Perché il nome viene da «gioca bene», in danese.",
    ],
  },
  {
    id: "qd-142",
    answer: "IKEA",
    category: "Marchio",
    clues: [
      "Dal 1943, fondata da un diciassettenne che vendeva fiammiferi.",
      "In un capannone con un percorso obbligato.",
      "Con mobili in scatola, nomi impronunciabili e una brugola in regalo.",
      "Per comprare una libreria e uscire con candele, piante e polpette.",
    ],
  },
  {
    id: "qd-143",
    answer: "Apple",
    category: "Marchio",
    clues: [
      "Dal 1° aprile 1976; il terzo socio vendette la sua quota per 800 dollari.",
      "A Cupertino, in una sede rotonda come un'astronave.",
      "Con un frutto morsicato sul logo.",
      "Perché bisogna pensare diverso. iPhone, iPad e Mac.",
    ],
  },
  {
    id: "qd-144",
    answer: "Vespa",
    detail: "Piaggio",
    category: "Marchio",
    clues: [
      "Dal 1946, disegnata da un ingegnere aeronautico a cui le moto non piacevano.",
      "A Pontedera, in provincia di Pisa.",
      "Su due ruote piccole, con la scocca tonda e un ronzio caratteristico.",
      "Perché, a vederla e a sentirla, sembra un insetto. Lo scooter di Vacanze romane.",
    ],
  },

  // ─── Altri film ───
  {
    id: "qd-157",
    answer: "Forrest Gump",
    detail: "Robert Zemeckis, 1994 · Tom Hanks",
    category: "Film",
    clues: [
      "Nel 1994; vinse sei Oscar, battendo Pulp Fiction.",
      "Su una panchina di Savannah, in Georgia, in attesa dell'autobus.",
      "Correndo per più di tre anni da un oceano all'altro, senza un vero motivo.",
      "Perché la vita è come una scatola di cioccolatini: non sai mai quello che ti capita.",
    ],
  },
  {
    id: "qd-158",
    answer: "Guerre stellari",
    detail: "Star Wars, George Lucas, 1977",
    category: "Film",
    clues: [
      "Nel 1977, ma la storia si svolge tanto tempo fa.",
      "Su un pianeta desertico con due soli, e su una stazione grande come una luna.",
      "Con spade di luce, un vecchio maestro e un contrabbandiere con un copilota peloso.",
      "Per sconfiggere l'Impero e il suo cavaliere nero che respira forte. Che la Forza sia con te.",
    ],
  },
  {
    id: "qd-159",
    answer: "Lo squalo",
    detail: "Steven Spielberg, 1975",
    category: "Film",
    clues: [
      "Nell'estate del 1975, a ridosso del 4 luglio, con le spiagge piene di turisti.",
      "Sull'isola di Amity, al largo del New England.",
      "Con due note di violoncello sempre più veloci e una pinna che spunta dall'acqua.",
      "Perché un enorme predatore marino divora i bagnanti. «Ci serve una barca più grossa.»",
    ],
  },
  {
    id: "qd-160",
    answer: "Toy Story",
    detail: "Pixar, 1995",
    category: "Film",
    clues: [
      "Nel 1995, il primo lungometraggio fatto interamente al computer.",
      "Nella cameretta di un bambino di nome Andy.",
      "Con un cowboy col cappello e un astronauta convinto di saper volare.",
      "Perché i giocattoli si animano quando nessuno li guarda. «Verso l'infinito e oltre!»",
    ],
  },
  {
    id: "qd-161",
    answer: "Nuovo Cinema Paradiso",
    detail: "Giuseppe Tornatore, 1988",
    category: "Film",
    clues: [
      "Nel 1988, e due anni dopo l'Oscar come miglior film straniero.",
      "In un paesino siciliano, dentro una cabina di proiezione.",
      "Con un proiezionista che fa amicizia con un bambino, e un parroco che censura i baci.",
      "Per ritrovare tutti i baci tagliati, montati in un'unica pellicola. Musiche di Morricone.",
    ],
  },
  {
    id: "qd-162",
    answer: "Ghostbusters",
    detail: "1984 · Bill Murray, Dan Aykroyd",
    category: "Film",
    clues: [
      "Nel 1984, con Bill Murray e Dan Aykroyd.",
      "In una vecchia caserma dei pompieri di New York.",
      "Con zaini nucleari sulle spalle e un gigantesco omino di marshmallow.",
      "Per catturare i fantasmi. «Who you gonna call?»",
    ],
  },

  // ─── Altre serie TV ───
  {
    id: "qd-163",
    answer: "Friends",
    category: "TV",
    clues: [
      "Dal 1994 al 2004: dieci stagioni e un finale visto da oltre 50 milioni di americani.",
      "In un caffè di New York chiamato Central Perk.",
      "Con sei amici, un divano arancione e una scimmietta di nome Marcel.",
      "Perché ci sono sempre l'uno per l'altro: Rachel, Ross, Monica, Chandler, Joey e Phoebe.",
    ],
  },
  {
    id: "qd-164",
    answer: "Breaking Bad",
    category: "TV",
    clues: [
      "Dal 2008 al 2013, a partire dal cinquantesimo compleanno di un professore.",
      "Ad Albuquerque, in un camper nel deserto del New Mexico.",
      "Con un professore di chimica malato e un suo ex studente, in maschera antigas.",
      "Per lasciare soldi alla famiglia, cucinando metanfetamina blu. «Sono io quello che bussa.»",
    ],
  },
  {
    id: "qd-165",
    answer: "La casa di carta",
    category: "TV",
    clues: [
      "Dal 2017, quando una serie spagnola poco vista esplose grazie a Netflix.",
      "Nella Zecca di Spagna, a Madrid.",
      "Con tute rosse, maschere di Dalí e nomi di città al posto di quelli veri.",
      "Perché il Professore ha pianificato il colpo perfetto. E si canta «Bella ciao».",
    ],
  },
  {
    id: "qd-166",
    answer: "Stranger Things",
    category: "TV",
    clues: [
      "Dal 2016, ma la storia comincia nel novembre del 1983.",
      "A Hawkins, una cittadina dell'Indiana, e in un mondo capovolto.",
      "In bicicletta, con i walkie-talkie e una ragazzina rasata che sposta le cose col pensiero.",
      "Per ritrovare un amico scomparso nel Sottosopra. Undici adora i waffle.",
    ],
  },
  {
    id: "qd-167",
    answer: "Don Matteo",
    category: "TV",
    clues: [
      "Dal 2000 su Rai 1, con un protagonista che al cinema era stato Trinità.",
      "A Gubbio, e poi a Spoleto.",
      "In bicicletta e con la tonaca, risolvendo i casi prima dei carabinieri.",
      "Perché un prete detective ne sa sempre più del maresciallo Cecchini.",
    ],
  },
  {
    id: "qd-168",
    answer: "La signora in giallo",
    category: "TV",
    clues: [
      "Dal 1984 al 1996, con un'attrice inglese nata nel 1925.",
      "A Cabot Cove, un paesino del Maine.",
      "Battendo a macchina i suoi romanzi e risolvendo omicidi meglio dello sceriffo.",
      "Perché ovunque arrivi Jessica Fletcher, qualcuno muore.",
    ],
  },

  // ─── Altri personaggi ───
  {
    id: "qd-169",
    answer: "Totò",
    category: "Personaggio",
    clues: [
      "Dal 1898, principe con una lunghissima fila di titoli nobiliari.",
      "Nel rione Sanità di Napoli.",
      "Con la bombetta in testa e una faccia snodabile come una marionetta.",
      "Perché «siamo uomini o caporali?» e «e io pago!». Il principe della risata.",
    ],
  },
  {
    id: "qd-170",
    answer: "Elvis Presley",
    category: "Personaggio",
    clues: [
      "Dall'8 gennaio 1935 al 16 agosto 1977.",
      "A Graceland, una villa di Memphis.",
      "Muovendo il bacino, col ciuffo impomatato e la tuta bianca coi brillantini.",
      "Perché è il re del rock and roll.",
    ],
  },
  {
    id: "qd-171",
    answer: "Charlie Chaplin",
    category: "Personaggio",
    clues: [
      "Dal 1914, ma la sua voce al cinema si sentì solo nel 1940.",
      "Dai sobborghi poveri di Londra agli studi di Hollywood.",
      "Con bombetta, bastone, baffetti e scarpe enormi, camminando a papera.",
      "Perché è Charlot, il vagabondo che fa ridere senza dire una parola.",
    ],
  },
  {
    id: "qd-172",
    answer: "Mahatma Gandhi",
    category: "Personaggio",
    clues: [
      "Dal 2 ottobre 1869; oggi quel giorno è la Giornata internazionale della non violenza.",
      "Dal Sudafrica all'India, fino al mare per raccogliere il sale.",
      "Con occhiali tondi, un telo bianco e un arcolaio, senza mai usare la violenza.",
      "Per liberare l'India dagli inglesi, senza armi.",
    ],
  },
  {
    id: "qd-173",
    answer: "Alberto Sordi",
    category: "Personaggio",
    clues: [
      "Dal 15 giugno 1920 al 24 febbraio 2003, sempre a Roma.",
      "In una villa vicino alle Terme di Caracalla.",
      "Doppiando Oliver Hardy da giovane, e poi interpretando l'italiano medio in centinaia di film.",
      "Perché «Maccarone, m'hai provocato e io me te magno!»",
    ],
  },
  {
    id: "qd-174",
    answer: "Cleopatra",
    category: "Personaggio",
    clues: [
      "Nel I secolo avanti Cristo, l'ultima della sua dinastia.",
      "Ad Alessandria d'Egitto.",
      "Con il trucco nero sugli occhi, i bagni nel latte d'asina e due amanti romani.",
      "Perché si fece mordere da un aspide. L'ultima regina d'Egitto.",
    ],
  },
  {
    id: "qd-175",
    answer: "Spider-Man",
    category: "Personaggio",
    clues: [
      "Dall'agosto del 1962, nell'ultimo numero di una rivista che stava per chiudere.",
      "Nel Queens, a New York, tra i grattacieli.",
      "Arrampicandosi sui muri e lanciando ragnatele, con una maschera rossa e blu.",
      "Perché da un grande potere derivano grandi responsabilità.",
    ],
  },

  // ─── Mestieri ───
  {
    id: "qd-151",
    answer: "Il pompiere",
    category: "Mestiere",
    clues: [
      "Già nell'antica Roma, quando li chiamavano vigiles e giravano con secchi di corda.",
      "In cima a una scala lunghissima.",
      "Con casco e idrante, e a volte salendo su un albero per un gatto.",
      "Per spegnere gli incendi.",
    ],
  },
  {
    id: "qd-152",
    answer: "L'astronauta",
    category: "Mestiere",
    clues: [
      "Dopo anni di addestramento, anche in piscina e su un aereo che precipita apposta.",
      "A 400 km d'altezza, girando intorno alla Terra ogni novanta minuti.",
      "In tuta pressurizzata, fluttuando e bevendo l'acqua a bolle.",
      "Per esplorare lo spazio. Come Samantha Cristoforetti.",
    ],
  },
  {
    id: "qd-153",
    answer: "Il dentista",
    category: "Mestiere",
    clues: [
      "Nel Medioevo lo faceva il barbiere, in piazza.",
      "Su una poltrona reclinabile, con una lampada in faccia.",
      "Facendoti domande mentre hai la bocca piena di attrezzi.",
      "Per curarti una carie.",
    ],
  },
  {
    id: "qd-154",
    answer: "Il sommelier",
    category: "Mestiere",
    clues: [
      "Una volta badava alle bestie da soma e alle provviste di un signore in viaggio.",
      "Tra la cantina e i tavoli di un ristorante elegante.",
      "Facendo roteare il bicchiere, annusando e parlando di frutti di bosco.",
      "Per consigliare il vino giusto.",
    ],
  },
  {
    id: "qd-155",
    answer: "Il postino",
    category: "Mestiere",
    clues: [
      "Dal 1840, quando in Inghilterra comparve il primo francobollo.",
      "Di casa in casa, in motorino o in bicicletta.",
      "Con una borsa piena di buste, e a volte un cane che lo insegue.",
      "Per consegnare la posta. Suona sempre due volte.",
    ],
  },
  {
    id: "qd-156",
    answer: "Il mimo",
    category: "Mestiere",
    clues: [
      "Già nel teatro dell'antica Roma; nel Novecento ebbe un maestro francese di nome Marceau.",
      "In piazza, davanti a un cappello per le offerte.",
      "Con faccia bianca e guanti bianchi, toccando una scatola invisibile.",
      "Per raccontare tutto senza dire una parola.",
    ],
  },
];
