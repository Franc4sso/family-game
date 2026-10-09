import type { AstaItem } from "./types";

// ───────────── CURIOSITÀ DAL WEB ─────────────
// Stranezze vendute davvero su eBay, in aste di beneficenza, mercati
// giapponesi e aste governative. Quasi tutte le foto sono rappresentative.
const items: AstaItem[] = [
  {
    id: "web-patatina-germogliata",
    name: "La patatina di McDonald's che ha messo i germogli",
    category: "curiosita",
    description: "Una porzione di patatine fritte nel classico cartoncino rosso.",
    clues: [
      "È nata da una scommessa tra marito e moglie.",
      "Il venditore, un poliziotto inglese, giurava di poter vendere online qualsiasi spazzatura.",
      "Su eBay l'hanno guardata in tanti, ma quasi nessuno ha voluto pagarla.",
    ],
    value: 1,
    image: "/asta/web-patatina-germogliata.jpg",
    credit: "Kici · Pubblico dominio",
    source: "https://commons.wikimedia.org/wiki/File:McDonald%27s_French_fries_Potato_(01).jpg",
    valueNote:
      "Nel marzo 2009 il poliziotto Matthew Young di Chadderton (Oldham) mise su eBay una patatina di McDonald's a cui era spuntato un germoglio, per vincere una scommessa con la moglie: fu venduta a un acquirente misterioso per 99 pence (circa 1 €). Fonte: Oldham Chronicle, 4 marzo 2009. Foto rappresentativa.",
  },
  {
    id: "web-aria-spiaggia-caister",
    name: "Un barattolo pieno di aria di mare inglese",
    category: "curiosita",
    description: "Un barattolo di vetro con il tappo a vite, apparentemente vuoto.",
    clues: [
      "Dentro c'è il profumo di una spiaggia del Norfolk.",
      "Il venditore l'aveva messo online solo per fare uno scherzo agli amici.",
      "L'ha comprato un signore del Galles, e il venditore ora pensa alla \"spiaggia in scatola\".",
    ],
    value: 12,
    image: "/asta/web-aria-spiaggia-caister.jpg",
    credit: "Dwight Burdette · CC BY 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Mason_Jar_with_Screw_Top.JPG",
    valueNote:
      "Thomas McGuechen, 32 anni, di Caister-on-Sea mise su eBay per scherzo un barattolo di \"aria della spiaggia di Caister\": lo comprò un acquirente gallese per 10 sterline (circa 12 €). Fonte: Great Yarmouth Mercury (\"SOLD! £10 jar of air from Caister beach snapped up by Welsh buyer\"); data esatta non indicata, anni 2010. Foto rappresentativa.",
  },
  {
    id: "web-palla-di-neve-texas",
    name: "Palla di neve del primo Natale bianco in Texas (2004)",
    category: "curiosita",
    description: "Una palla di neve grande come un pallone, stretta in un guanto.",
    clues: [
      "Viene da una città dove la neve non si vedeva da più di un secolo.",
      "Fino alla consegna è rimasta nel freezer, accanto al gelato.",
      "L'hanno contesa 18 offerenti su eBay.",
    ],
    value: 70,
    image: "/asta/web-palla-di-neve-texas.jpg",
    credit: "A. Sobolev · Pubblico dominio",
    source: "https://commons.wikimedia.org/wiki/File:%D0%A1%D0%BD%D0%B5%D0%B6%D0%BE%D0%BA1.jpg",
    valueNote:
      "Oscar Garza fece una palla di neve il giorno di Natale 2004 a Brownsville (Texas), durante una storica nevicata, e la mise su eBay: nel gennaio 2005 un acquirente anonimo si impegnò a pagarla 92 $ (circa 70 €). Fonte: Associated Press via NBC News, 11 gennaio 2005. Foto rappresentativa.",
  },
  {
    id: "web-mutande-madoff",
    name: "Le mutande sequestrate al più grande truffatore di Wall Street",
    category: "curiosita",
    description: "Un paio di boxer a righe, parte di un lotto di quattordici.",
    clues: [
      "Le ha messe all'asta il governo degli Stati Uniti.",
      "Il proprietario è finito in carcere per una truffa da miliardi di dollari.",
      "Arrivavano dalla villa di Palm Beach di Bernie Madoff.",
    ],
    value: 145,
    image: "/asta/web-mutande-madoff.jpg",
    credit: "williamnyk · CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Striped_boxer_shorts.jpg",
    valueNote:
      "Nelle aste dei beni confiscati a Bernie Madoff organizzate dagli US Marshals, un lotto di 14 paia di boxer sequestrati nella villa di Palm Beach fu venduto nel 2011 per 200 $ (circa 145 €). Fonti: Fortune (2016, \"Bernie Madoff auction\"), Paul Fraser Collectibles. Foto rappresentativa.",
  },
  {
    id: "web-scatola-dybbuk",
    name: "Il mobiletto \"maledetto\" del Dybbuk",
    category: "curiosita",
    description: "Un piccolo mobile portabottiglie in legno intagliato, con un'anta.",
    clues: [
      "Secondo la leggenda dentro c'è uno spirito del folklore ebraico.",
      "Il venditore su eBay scrisse: \"Non voglio più questa scatola, in nessun modo\".",
      "La sua storia ha ispirato il film horror \"The Possession\".",
    ],
    value: 220,
    image: "/asta/web-scatola-dybbuk.jpg",
    credit: "Philadelphia Museum of Art (1906) · Pubblico dominio",
    source: "https://commons.wikimedia.org/wiki/File:Carved_wine_cabinet,_Renaissance_style_from_Annual_report_of_the_Philadelphia_Museum_of_Art_(1906).jpg",
    valueNote:
      "La \"Dybbuk box\", un portabottiglie di legno che si diceva infestato, fu venduta su eBay nel febbraio 2004 dallo studente Iosif Neitzke: dopo una guerra di rilanci negli ultimi minuti passò da 108 a 280 $ (circa 220 €), vinta dal curatore Jason Haxton. Fonti: The Forward, Skeptoid. Foto rappresentativa (mobiletto d'epoca simile).",
  },
  {
    id: "web-acqua-elvis",
    name: "Tre cucchiai d'acqua dal bicchiere di Elvis",
    category: "curiosita",
    description: "Un po' d'acqua limpida in un bicchiere, niente di più.",
    clues: [
      "Il bicchiere è stato preso al volo durante un concerto del 1977.",
      "Il venditore ha tenuto il bicchiere e ha messo all'asta solo il contenuto.",
      "Il Re del rock 'n' roll ci aveva bevuto sul palco a Charlotte.",
    ],
    value: 350,
    image: "/asta/web-acqua-elvis.jpg",
    credit: "Mia Gaitanidis · CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Glass_of_water,_detail.jpg",
    valueNote:
      "Wade Jones (Belmont, North Carolina) vendette su eBay a cavallo tra dicembre 2004 e gennaio 2005 circa tre cucchiai d'acqua dal bicchiere di polistirolo da cui Elvis aveva bevuto in un concerto del 1977: offerta vincente 455 $ (circa 350 €), riserva raggiunta. Fonti: NPR (\"The King's Cup Now on Sale\", 30/12/2004), Museum of Hoaxes, Elvis Information Network. Foto rappresentativa.",
  },
  {
    id: "web-dorito-mitra-papale",
    name: "Il Dorito a forma di mitra del Papa",
    category: "curiosita",
    description: "Una manciata di tortilla chips arancioni al formaggio.",
    clues: [
      "È uscito da un normalissimo sacchetto di patatine.",
      "Chi lo ha trovato ci ha visto il copricapo di un Papa.",
      "Lo ha comprato lo stesso casinò online del toast con la Madonna.",
    ],
    value: 920,
    image: "/asta/web-dorito-mitra-papale.jpg",
    credit: "Scott Ehardt · Pubblico dominio",
    source: "https://commons.wikimedia.org/wiki/File:Doritos.jpg",
    valueNote:
      "Nel 2005 una singola tortilla chip Doritos a forma di mitra papale fu venduta su eBay al casinò online GoldenPalace.com per 1.209 $ (circa 920 €). Fonti: lovemoney.com (\"The weirdest things sold on eBay\"), National Storage, forum AnandTech (marzo 2005). Foto rappresentativa.",
  },
  {
    id: "web-quadro-stregato-ebay",
    name: "Il \"quadro stregato\" di eBay",
    category: "curiosita",
    description: "Un dipinto degli anni '70 con un bambino e una bambola davanti a una porta a vetri.",
    clues: [
      "I venditori chiedevano di firmare una liberatoria prima di comprarlo.",
      "Giuravano che di notte il bambino e la bambola uscissero dalla cornice.",
      "Si chiama \"The Hands Resist Him\": l'annuncio ebbe 30.000 visite.",
    ],
    value: 1050,
    image: "/asta/web-quadro-stregato-ebay.jpg",
    credit: "Mtorrite · CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Porcelain_doll_in_period_dress._France,_1877.jpg",
    valueNote:
      "Il dipinto \"The Hands Resist Him\" di Bill Stoneham (1972) fu messo su eBay nel febbraio 2000 come \"Haunted Painting\" e venduto per 1.025 $ (circa 1.050 €) a una galleria del Michigan. Fonti: Wikipedia (The Hands Resist Him), Daily Dot. Foto rappresentativa (bambola d'epoca, il quadro è coperto da copyright).",
  },
  {
    id: "web-abito-sposa-ex-moglie",
    name: "L'abito da sposa dell'ex moglie, indossato dal marito",
    category: "curiosita",
    description: "Un abito da sposa bianco in pizzo e tulle, a gonna ampia.",
    clues: [
      "Il venditore lo ha trovato in soffitta dopo il divorzio.",
      "Per le foto dell'annuncio lo ha indossato lui, barba compresa.",
      "L'annuncio ironico è diventato virale: 113 offerte partendo da 1 dollaro.",
    ],
    value: 3200,
    image: "/asta/web-abito-sposa-ex-moglie.jpg",
    credit: "The wub · CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:1957_wedding_dress.jpg",
    valueNote:
      "Nell'aprile 2004 Larry Star (stato di Washington) mise su eBay l'abito da sposa dell'ex moglie, posando lui stesso con l'abito e scrivendo un annuncio comico: asta senza riserva chiusa il 28/04/2004 a 3.850 $ (circa 3.200 €) dopo 113 offerte. Fonti: Snopes, Seattle Times, NPR, copia archiviata dell'annuncio (University of Minnesota Duluth). Foto rappresentativa.",
  },
  {
    id: "web-anguria-nera-densuke",
    name: "Anguria nera Densuke di Hokkaido",
    category: "curiosita",
    description: "Un'anguria dalla buccia nera e lucida, senza strisce, con l'etichetta del produttore.",
    clues: [
      "Cresce solo in una cittadina del nord del Giappone.",
      "Pesava circa 8 chili.",
      "È stata battuta alla prima asta della stagione al mercato all'ingrosso.",
    ],
    value: 3900,
    image: "/asta/web-anguria-nera-densuke.jpg",
    credit: "puamelia · CC BY-SA 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Densuke_watermelon.jpg",
    valueNote:
      "Nel giugno 2008 un'anguria nera Densuke di Tōma (Hokkaido) da circa 8 kg fu venduta alla prima asta della stagione per 650.000 yen (circa 6.100 $, ~3.900 €), record per un'anguria in Giappone. Fonti: Associated Press via NBC News e Fox News. Foto di angurie Densuke (non l'esemplare venduto).",
  },
  {
    id: "web-hamburger-faze-rug",
    name: "Hamburger mezzo mangiato da uno youtuber famoso",
    category: "curiosita",
    description: "Un doppio cheeseburger con insalata e cipolla, avvolto nella carta.",
    clues: [
      "È stato conservato nella resina, montato su una targa di legno.",
      "Viene da un video in cui uno youtuber si intrufolava nelle case dei colleghi.",
      "Era il lotto più pagato dell'asta, più degli oggetti di MrBeast.",
    ],
    value: 6000,
    image: "/asta/web-hamburger-faze-rug.jpg",
    credit: "Willis Lam · CC BY-SA 2.0",
    source: "https://commons.wikimedia.org/wiki/File:In-N-Out_Double_Double_(43794328775).jpg",
    valueNote:
      "Nell'asta benefica di Goldin con lo youtuber Airrack (a favore di Make-A-Wish, chiusa il 29 giugno 2026), il Double-Double di In-N-Out mezzo mangiato da FaZe Rug, conservato in resina, è stato venduto per poco più di 7.000 $ (circa 6.000 €). Fonti: Dexerto, The Straits Times, Bilanz/Cash.ch. Foto rappresentativa.",
  },
  {
    id: "web-uva-ruby-roman",
    name: "Un grappolo d'uva Ruby Roman (2016)",
    category: "curiosita",
    description: "Un grappolo di acini rossi grandi come palline da ping pong.",
    clues: [
      "Ogni acino deve pesare almeno 20 grammi per avere il marchio.",
      "Il grappolo contava una trentina di acini.",
      "È stato il primo grappolo della stagione all'asta di Kanazawa, in Giappone.",
    ],
    value: 9500,
    image: "/asta/web-uva-ruby-roman.jpg",
    credit: "Editor at Large · CC BY-SA 2.5",
    source: "https://commons.wikimedia.org/wiki/File:Red_grapes.jpg",
    valueNote:
      "Nel luglio 2016 il primo grappolo di uva Ruby Roman della stagione fu venduto al mercato all'ingrosso di Kanazawa per 1,1 milioni di yen (circa 10.900 $, ~9.500 €) a un dettagliante di Amagasaki. Fonti: Arab News/AFP, Fruitnet, Wikipedia (Ruby Roman). Foto rappresentativa (uva rossa comune).",
  },
  {
    id: "web-wc-john-lennon",
    name: "Il water di casa di una rockstar",
    category: "curiosita",
    description: "Un vecchio water di porcellana bianca.",
    clues: [
      "Il muratore che lo smontò lo tenne nel capanno per 40 anni.",
      "Era stato stimato meno di mille sterline, ma è andato molto oltre.",
      "Veniva da Tittenhurst Park, la villa di John Lennon.",
    ],
    value: 11500,
    image: "/asta/web-wc-john-lennon.jpg",
    credit: "Pierpao · CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Vintage_water_closet_in_Trieste_2.jpg",
    valueNote:
      "Il water usato da John Lennon a Tittenhurst Park (1969-1972), conservato per 40 anni dal costruttore John Hancock, fu venduto il 28 agosto 2010 alla Beatles Convention di Liverpool per 9.500 £ (circa 11.500 €), dieci volte la stima. Fonti: Beatles Bible, CTV News, Paul Fraser Collectibles. Foto rappresentativa.",
  },
  {
    id: "web-dentiera-churchill",
    name: "La dentiera che ha \"vinto\" la guerra",
    category: "curiosita",
    description: "Una dentiera parziale superiore, con gengiva rosa e denti finti.",
    clues: [
      "Era fatta apposta un po' larga, per non cambiare il modo di parlare del proprietario.",
      "Il suo proprietario teneva discorsi alla radio durante la Seconda guerra mondiale.",
      "Apparteneva a Winston Churchill: è un record del Guinness.",
    ],
    value: 18000,
    image: "/asta/web-dentiera-churchill.jpg",
    credit: "Tiia Monto · CC BY 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Full_dentures.jpg",
    valueNote:
      "Una dentiera parziale superiore di Winston Churchill, realizzata dal tecnico Derek Cudlipp, fu venduta nel luglio 2010 da Keys ad Aylsham (Norfolk) per 15.200 £ (circa 18.000 €), tre volte la stima: è nel Guinness come la dentiera più cara mai venduta all'asta. Fonti: Guinness World Records, Time, dentistry.co.uk. Foto rappresentativa.",
  },
  {
    id: "web-radiografie-marilyn",
    name: "Tre radiografie di una diva di Hollywood",
    category: "curiosita",
    description: "Una radiografia del torace in bianco e nero, con costole e polmoni ben visibili.",
    clues: [
      "Sono state scattate in un ospedale di Los Angeles nel 1954.",
      "Il banditore pensava non superassero i 5.000 dollari.",
      "La paziente era Marilyn Monroe, allora ventottenne.",
    ],
    value: 37000,
    image: "/asta/web-radiografie-marilyn.jpg",
    credit: "Mikael Häggström · CC0",
    source: "https://commons.wikimedia.org/wiki/File:Normal_posteroanterior_(PA)_chest_radiograph_(X-ray).jpg",
    valueNote:
      "Tre radiografie di torace e bacino di Marilyn Monroe (Cedars of Lebanon Hospital, 1954) furono vendute nel giugno 2010 all'asta Hollywood Legends di Julien's Auctions a Las Vegas per 45.000 $ (circa 37.000 €), contro una stima di 800-1.200 $ ciascuna. Fonti: Marketplace (APM), Diagnostic Imaging, China Daily. Foto rappresentativa (radiografia anonima).",
  },
];

export default items;
