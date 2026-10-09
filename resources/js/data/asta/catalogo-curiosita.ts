import type { AstaItem } from "./types";

// ───────────── CURIOSITÀ ─────────────
// Oggetti stranissimi venduti davvero all'asta (o su eBay). Le foto sono
// rappresentative: mostrano un oggetto simile, non l'esemplare venduto.
const items: AstaItem[] = [
  {
    id: "toast-madonna-2004",
    name: "Toast al formaggio con il volto della Madonna (2004)",
    category: "curiosita",
    description: "Mezzo toast al formaggio con un morso, sulla cui crosta qualcuno giura di vedere un volto.",
    clues: [
      "Ha dieci anni ma, a detta della proprietaria, non ha mai fatto la muffa.",
      "È stato messo in vendita su eBay e ha avuto più di un milione di visite.",
      "Lo ha comprato un casinò online per farsi pubblicità.",
    ],
    value: 21500,
    image: "/asta/toast-madonna-2004.jpg",
    credit: "Willis Lam · CC BY-SA 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Grilled_Cheese_Sandwich_(16938984390).jpg",
    valueNote:
      "Venduto su eBay nel novembre 2004 per 28.000 $ al casinò online GoldenPalace.com (venditrice Diana Duyser, Florida). Fonti: NBC News, Fox News. Foto rappresentativa.",
  },
  {
    id: "mattoncino-lego-oro",
    name: "Mattoncino LEGO 2x4 in oro massiccio 14 carati",
    category: "curiosita",
    description: "Un mattoncino LEGO identico a quelli dei giocattoli, ma interamente d'oro.",
    clues: [
      "Non è mai stato venduto nei negozi.",
      "La LEGO lo regalava tra il 1979 e il 1981 a dipendenti e partner fedelissimi.",
      "Ne esistono una decina al mondo: questo arrivava da un socio italiano dell'azienda.",
    ],
    value: 18500,
    image: "/asta/mattoncino-lego-oro.jpg",
    credit: "Ziongarage · CC0",
    source: "https://commons.wikimedia.org/wiki/File:Lego_2x4_brick.jpg",
    valueNote:
      "Venduto su Catawiki nel febbraio 2017 per 19.793 $ (circa 16.000 £) a un collezionista. Fonti: NBC New York, Just Collecting. Foto rappresentativa (mattoncino normale, non d'oro).",
  },
  {
    id: "gomma-britney-spears",
    name: "Gomma da masticare masticata da Britney Spears (2004)",
    category: "curiosita",
    description: "Un pezzetto di chewing-gum già masticato, conservato con cura.",
    clues: [
      "L'ha sputata una popstar durante un viaggio a Londra.",
      "Su eBay all'epoca c'erano decine di aste simili.",
      "Nessuno ha mai potuto provare che fosse davvero la sua.",
    ],
    value: 11000,
    image: "/asta/gomma-britney-spears.jpg",
    credit: "Pascua Theus · CC BY-SA 2.5",
    source: "https://commons.wikimedia.org/wiki/File:Kaugummis.jpg",
    valueNote:
      "Secondo i media venduta su eBay nel 2004 per circa 14.000 $; non è certo che la vendita sia stata conclusa. Fonti: CBS News (via Herald Net), Paul Fraser Collectibles. PREZZO INCERTO. Foto rappresentativa.",
  },
  {
    id: "french-toast-timberlake",
    name: "French toast avanzato da Justin Timberlake (2000)",
    category: "curiosita",
    description: "Due fette di pane dorato in padella lasciate a metà su un piatto.",
    clues: [
      "Era la colazione di un cantante durante un'intervista in radio.",
      "La ragazza che l'ha comprato voleva liofilizzarlo e tenerlo sul comò.",
      "Il cantante all'epoca faceva parte degli 'N Sync.",
    ],
    value: 1100,
    image: "/asta/french-toast-timberlake.jpg",
    credit: "Ocdp · CC0",
    source: "https://commons.wikimedia.org/wiki/File:French_toast_001.jpg",
    valueNote:
      "Avanzi della colazione di Timberlake alla radio Z-100 di New York, venduti su eBay nel marzo 2000 per 1.025 $ a una fan di 19 anni. Fonti: TIME, ABC News. Foto rappresentativa.",
  },
  {
    id: "cornflake-illinois",
    name: "Cornflake a forma di Illinois (2008)",
    category: "curiosita",
    description: "Un singolo fiocco di mais trovato in una scatola di cereali, grande pochi centimetri.",
    clues: [
      "L'hanno trovato due sorelline mentre facevano colazione.",
      "eBay all'inizio ha bloccato l'asta: è vietato vendere cibo scaduto.",
      "Ha la forma di uno stato americano.",
    ],
    value: 850,
    image: "/asta/cornflake-illinois.jpg",
    credit: "Gaurav Dhwaj Khadka · CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Corn_flakes.jpg",
    valueNote:
      "Venduto su eBay nel marzo 2008 per 1.350 $ al proprietario di TriviaMania.com. Fonti: NBC News, NPR. Foto rappresentativa.",
  },
  {
    id: "fazzoletto-scarlett-johansson",
    name: "Fazzoletto usato da Scarlett Johansson (2008)",
    category: "curiosita",
    description: "Un fazzoletto di carta usato, chiuso in una bustina di plastica autografata.",
    clues: [
      "L'attrice era raffreddata e si è soffiata il naso in diretta TV.",
      "Il raffreddore gliel'aveva attaccato Samuel L. Jackson.",
      "Il ricavato è andato in beneficenza a un banco alimentare.",
    ],
    value: 3900,
    image: "/asta/fazzoletto-scarlett-johansson.jpg",
    credit: "Evan-Amos · Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Kleenex-small-box.jpg",
    valueNote:
      "Fazzoletto usato al Tonight Show di Jay Leno, venduto su eBay nel dicembre 2008 per 5.300 $ a favore di USA Harvest. Fonti: NBC Washington, Look to the Stars. Foto rappresentativa.",
  },
  {
    id: "ciocca-capelli-bieber",
    name: "Ciocca di capelli di Justin Bieber (2011)",
    category: "curiosita",
    description: "Un ciuffo di capelli castani tagliati, in una scatolina firmata.",
    clues: [
      "Il cantante li ha tagliati e regalati in uno show televisivo americano.",
      "Il ricavato è andato a un rifugio per animali.",
      "Li ha comprati lo stesso casinò online che collezionava stranezze.",
    ],
    value: 29000,
    image: "/asta/ciocca-capelli-bieber.jpg",
    credit: "Lvb1770 · CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Moscheles_Lock_of_Beethoven%27s_Hair.jpg",
    valueNote:
      "Capelli donati a Ellen DeGeneres e venduti su eBay nel marzo 2011 per 40.668 $ a GoldenPalace.com (beneficenza: The Gentle Barn). Fonti: CBS News, Pollstar. Foto rappresentativa (ciocca di Beethoven).",
  },
  {
    id: "dente-john-lennon",
    name: "Dente molare di John Lennon (anni '60)",
    category: "curiosita",
    description: "Un vecchio dente umano un po' ingiallito, con tanto di carie.",
    clues: [
      "Il proprietario lo regalò alla sua governante dopo essere stato dal dentista.",
      "È troppo fragile per fare il test del DNA.",
      "Lo ha comprato un dentista canadese per portarlo in tour.",
    ],
    value: 22500,
    image: "/asta/dente-john-lennon.jpg",
    credit: "Challiyan · CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:An_extracted_lower_first_premolar_tooth.jpg",
    valueNote:
      "Venduto da Omega Auctions (Stockport, UK) il 5 novembre 2011 per 19.500 £ al dentista Michael Zuk. Fonti: Beatles Bible, Dentistry.co.uk. Foto rappresentativa.",
  },
  {
    id: "torta-nozze-carlo-diana",
    name: "Fetta della torta nuziale di Carlo e Diana (1981)",
    category: "curiosita",
    description: "Una fetta di torta con glassa e marzapane, conservata per decenni in una scatola di latta.",
    clues: [
      "Ha più di quarant'anni: la casa d'aste sconsiglia di mangiarla.",
      "Era avvolta nella pellicola con l'etichetta «Maneggiare con cura».",
      "Viene da uno dei 23 dolci di un matrimonio reale.",
    ],
    value: 2200,
    image: "/asta/torta-nozze-carlo-diana.jpg",
    credit: "Famartin · CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:2020-01-11_21_48_49_A_slice_of_wedding_cake_in_Hamilton_Township,_Mercer_County,_New_Jersey.jpg",
    valueNote:
      "Venduta da Dominic Winter Auctioneers (Cirencester, UK) l'11 agosto 2021 per 1.850 £ (più commissioni). Fonti: CNBC, ITV News. Foto rappresentativa.",
  },
  {
    id: "biscotto-titanic",
    name: "Galletta di una scialuppa del Titanic (1912)",
    category: "curiosita",
    description: "Una galletta secca e dura, di quelle che si mettevano nei kit di sopravvivenza delle navi.",
    clues: [
      "Ha più di cent'anni e nessuno l'ha mai mangiata.",
      "L'ha conservata un passeggero della nave che soccorse i naufraghi.",
      "Il banditore l'ha chiamata «il biscotto più prezioso del mondo».",
    ],
    value: 20500,
    image: "/asta/biscotto-titanic.jpg",
    credit: "Wellcome Collection · CC BY 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Ship%27s_biscuit,_England,_1875_Wellcome_L0064860.jpg",
    valueNote:
      "Galletta «Pilot» Spillers & Bakers da una scialuppa del Titanic, venduta da Henry Aldridge & Son nell'ottobre 2015 per 15.000 £. Fonti: CNBC, TIME. Foto rappresentativa (galletta da nave del 1875).",
  },
  {
    id: "scultura-invisibile-garau",
    name: "Scultura invisibile \"Io sono\" di Salvatore Garau (2021)",
    category: "curiosita",
    description: "Uno spazio vuoto di un metro e mezzo per lato: l'opera è lì, ma non si vede.",
    clues: [
      "Il compratore ha ricevuto solo un certificato e le istruzioni per esporla.",
      "L'artista sardo dice che il vuoto è pieno di energia.",
      "È stata battuta da una casa d'aste di Milano.",
    ],
    value: 15000,
    image: "/asta/scultura-invisibile-garau.jpg",
    credit: "Philipp Berndt · CC0",
    source: "https://commons.wikimedia.org/wiki/File:Door_in_a_white_room_(Unsplash).jpg",
    valueNote:
      "Venduta da Art-Rite (Milano) nel maggio 2021 per 15.000 € (stima 6.000-9.000 €). Fonti: Artnet News, Libreriamo. Foto rappresentativa (stanza vuota).",
  },
  {
    id: "nugget-george-washington",
    name: "Crocchetta di pollo con il profilo di George Washington (2012)",
    category: "curiosita",
    description: "Una crocchetta di pollo impanata da fast food, rimasta tre anni in freezer.",
    clues: [
      "La proprietaria stava per buttarla nella spazzatura.",
      "Ricorda il profilo di un presidente americano.",
      "I soldi servivano a mandare dei bambini al campo estivo.",
    ],
    value: 6200,
    image: "/asta/nugget-george-washington.jpg",
    credit: "Jiafei Slay Queen · CC0",
    source: "https://commons.wikimedia.org/wiki/File:Chicken_nuggets_on_a_plate.jpg",
    valueNote:
      "McNugget venduta su eBay nel marzo 2012 per 8.100 $ (Rebekah Speight, Nebraska). Fonti: CBS News, NBC. Foto rappresentativa.",
  },
  {
    id: "fantasmi-in-bottiglia",
    name: "Due fantasmi chiusi in boccetta (2010)",
    category: "curiosita",
    description: "Due piccole boccette di vetro tappate, apparentemente vuote.",
    clues: [
      "La venditrice dice di averli catturati durante un esorcismo in casa.",
      "Dentro ci sarebbero un vecchio signore e una bambina.",
      "Guinness li ricorda come i fantasmi più cari mai venduti.",
    ],
    value: 1500,
    image: "/asta/fantasmi-in-bottiglia.jpg",
    credit: "DPLA · Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Glass_vial_with_cork_stopper_-_DPLA_-_20bb83cef94972da60f6706b9bd75083.jpg",
    valueNote:
      "Venduti sul sito d'aste neozelandese Trade Me nel marzo 2010 per 2.830 NZ$ (circa 1.980 $). Fonti: Arab News/AP, The Daily Star. Foto rappresentativa.",
  },
  {
    id: "meloni-yubari-king",
    name: "Coppia di meloni giapponesi Yubari King (2019)",
    category: "curiosita",
    description: "Due meloni dalla buccia retata e verde, perfettamente rotondi, con il loro picciolo a T.",
    clues: [
      "In un normale negozio giapponese ne costerebbe uno qualche decina di euro.",
      "Si tratta della prima asta della stagione, che fa sempre notizia.",
      "Li ha comprati un'azienda di bevande per farsi pubblicità.",
    ],
    value: 41000,
    image: "/asta/meloni-yubari-king.jpg",
    credit: "Captain76 · Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Yubari_melons_in_the_cardboard_box.JPG",
    valueNote:
      "Venduti alla prima asta stagionale del mercato all'ingrosso di Sapporo nel maggio 2019 per 5 milioni di yen (oltre 45.000 $) a Pokka Sapporo. Fonti: Daily Sabah/Kyodo, Wikipedia. Foto rappresentativa.",
  },
  {
    id: "m-and-m-siamesi",
    name: "Due M&M's \"siamesi\" attaccati tra loro",
    category: "curiosita",
    description: "Due confettini al cioccolato colorati, nati attaccati l'uno all'altro.",
    clues: [
      "Il venditore li definiva «rarissimi».",
      "Sono stati messi all'asta su eBay.",
      "Nessuno ha fatto a gara per averli.",
    ],
    value: 1,
    image: "/asta/m-and-m-siamesi.jpg",
    credit: "Evan-Amos · Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Plain-M%26Ms-Pile.jpg",
    valueNote:
      "Venduti su eBay nei primi anni 2000 per 1 $. Fonte: ABC News (Wolf Files, \"Unbelievable Junk Sold on eBay\"). Foto rappresentativa.",
  },
  {
    id: "nocciolo-pesca-scimmia",
    name: "Nocciolo di pesca a forma di scimmia",
    category: "curiosita",
    description: "Il nocciolo rugoso di una pesca che, guardato bene, sembra il muso di una scimmietta.",
    clues: [
      "È stato trovato dopo aver mangiato la frutta.",
      "È finito su eBay insieme ad altre stranezze.",
      "Il prezzo finale è stato più basso di quello di una pesca al mercato… o quasi.",
    ],
    value: 5,
    image: "/asta/nocciolo-pesca-scimmia.jpg",
    credit: "An.ha · CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Prunus_persica_pit.jpg",
    valueNote:
      "Venduto su eBay nei primi anni 2000 per 5,55 $. Fonte: ABC News (Wolf Files, \"Unbelievable Junk Sold on eBay\"). Foto rappresentativa.",
  },
  {
    id: "patatina-fritta-gigante",
    name: "La patatina fritta più lunga del mondo (2003)",
    category: "curiosita",
    description: "Un'unica patatina fritta lunga più di 22 centimetri, congelata subito dopo la scoperta.",
    clues: [
      "L'ha trovata un dipendente di un fast food americano.",
      "Invece di mangiarla, l'ha messa subito in freezer.",
      "Su eBay è stata presentata come la più lunga mai vista.",
    ],
    value: 180,
    image: "/asta/patatina-fritta-gigante.jpg",
    credit: "StockSnap · CC0",
    source: "https://commons.wikimedia.org/wiki/File:French_Fries.JPG",
    valueNote:
      "Patatina di 8¾ pollici trovata in un Culver's (Brookfield, Wisconsin), venduta su eBay nel luglio 2003 per 202,50 $. Fonti: Techdirt, Beloit Daily News/AP. Foto rappresentativa.",
  },
];

export default items;
