import type { AstaItem } from "./types";

// ───────────── CURIOSITÀ DALLE CASE D'ASTA ─────────────
// Oggetti strani venduti davvero su Catawiki e nelle case d'asta europee.
// Molte foto sono rappresentative: mostrano un oggetto simile, non il lotto venduto.
const items: AstaItem[] = [
  {
    id: "bibbia-piu-piccola-1727",
    name: "La Bibbia più piccola del mondo (1727)",
    category: "curiosita",
    description: "Un libricino minuscolo, più piccolo di un francobollo, con copertina e pagine stampate.",
    clues: [
      "Per leggerla serve una lente d'ingrandimento.",
      "È stata stampata quasi tre secoli fa, ed è completa e illustrata.",
      "Catawiki l'ha messa tra gli oggetti più strani venduti nel 2017.",
    ],
    value: 2400,
    image: "/asta/bibbia-piu-piccola-1727.jpg",
    credit: "Momir Alvirović · CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:The_miniature_Book_of_Psalms.jpg",
    valueNote:
      "La copia leggibile e illustrata più piccola del mondo della Bibbia, stampata nel 1727, è stata venduta su Catawiki nel 2017 per 2.400 €. Fonti: Catawiki, \"Top 10 Strangest Objects Sold at Auction in 2017\" (articolo che ha mandato l'utente); Antique Collecting (\"Weird and wonderful antiques and art sold in 2017\", che riporta 3.000 £). Foto rappresentativa (un salterio in miniatura appoggiato su un francobollo).",
  },
  {
    id: "ratto-punk-ratawiki",
    name: "Topo punk in giubbotto di pelle",
    category: "curiosita",
    description: "Un topo impagliato alto 17 cm, vestito con giubbotto di pelle e catene, con la cresta.",
    clues: [
      "Gli esperti di tassidermia lo chiamano \"antropomorfo\".",
      "Alla casa d'aste gli hanno dato un soprannome: \"Ratawiki\".",
      "È stato venduto online nel 2017, nella sezione storia naturale.",
    ],
    value: 100,
    image: "/asta/ratto-punk-ratawiki.jpg",
    credit: "Bionerd · CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Taxidermy_brown_rat_wood_bionerd.jpg",
    valueNote:
      "Ratto impagliato in stile punk (17 cm, giubbotto di pelle, catene, cresta), soprannominato \"Ratawiki\", venduto su Catawiki nel 2017 per 100 €. Fonte: Catawiki, \"These are the most bizarre objects ever sold on Catawiki\" (ottobre 2020). Foto rappresentativa (un ratto impagliato normale, senza vestiti).",
  },
  {
    id: "testa-bambola-titanic",
    name: "La testa di bambola ripescata in mare",
    category: "curiosita",
    description: "La testa di una vecchia bambola di porcellana, consumata dal mare, su una base di vetro girevole.",
    clues: [
      "Un pescatore spagnolo di tonni l'ha tirata su nel 1977 credendo fosse un sasso.",
      "Si pensa che appartenesse a una bambina di 7 anni sopravvissuta a un famoso naufragio.",
      "Il naufragio è quello del Titanic.",
    ],
    value: 6500,
    image: "/asta/testa-bambola-titanic.jpg",
    credit: "Autore sconosciuto · Pubblico dominio",
    source: "https://commons.wikimedia.org/wiki/File:Bisque_Head_Doll_with_Molded_Blond_Hair_and_Red,_Pink,_and_White_Cotton_Print_Dress.jpg",
    valueNote:
      "Testa di bambola trovata in mare nel 1977 da un pescatore spagnolo, attribuita a Eva Hart (sopravvissuta al Titanic a 7 anni). Venduta su Catawiki per 6.500 € a un collezionista belga, con base di vetro girevole. Fonti: Catawiki, \"These are the most bizarre objects ever sold on Catawiki\" (2020) e \"Haunted collectibles\" (2025). L'attribuzione al Titanic è quella del venditore, non provata. Foto rappresentativa (bambola di porcellana d'epoca intera).",
  },
  {
    id: "sirena-figi-catawiki",
    name: "Sirena delle Figi imbalsamata",
    category: "curiosita",
    description: "Una piccola creatura secca e scura, con la testa e le braccia di scimmia e la coda di pesce.",
    clues: [
      "Il circo di P.T. Barnum ne esponeva una nell'Ottocento.",
      "È un falso: metà scimmia e metà pesce, cuciti insieme.",
      "L'originale è bruciato, ma le repliche girano ancora nelle aste.",
    ],
    value: 1000,
    image: "/asta/sirena-figi-catawiki.jpg",
    credit: "Malcolm Lidbury (Pinkpasty) · CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Fiji_Mermaid_Cryptozoology.jpg",
    valueNote:
      "Replica di \"Sirena delle Figi\" (busto di scimmia cucito su una coda di pesce) venduta su Catawiki nel 2018 per 1.000 €. Fonti: Catawiki, \"These are the most bizarre objects ever sold on Catawiki\" (2020) e \"Haunted collectibles: the most chilling objects ever auctioned\" (2025). Foto rappresentativa (un'altra sirena delle Figi).",
  },
  {
    id: "zucchetto-papa-francesco",
    name: "Lo zucchetto bianco scambiato in piazza San Pietro",
    category: "curiosita",
    description: "Una piccola papalina di seta bianca, in una cornice da esposizione.",
    clues: [
      "Il proprietario precedente lo ha ceduto in cambio di uno nuovo, davanti a migliaia di persone.",
      "Lo scambio è avvenuto nel giugno 2014 durante un'udienza generale, ed è stato ripreso dalle TV.",
      "Lo indossava papa Francesco.",
    ],
    value: 16100,
    image: "/asta/zucchetto-papa-francesco.jpg",
    credit: "Darth Stabro · CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Pope_Benedict_XVI_zucchetto_SJV_(cropped).jpg",
    valueNote:
      "Zucchetto che papa Francesco scambiò con un fedele (un conduttore TV italiano) in piazza San Pietro nel giugno 2014. Venduto su Catawiki il 24 aprile 2016 per 16.100 € (circa 18.200 $), metà della stima; gran parte del ricavato è andata in beneficenza. Fonti: Catawiki (\"The 10 Most Unusual Items Ever Sold on Catawiki\"), Religion News Service / Catholic Register. Foto rappresentativa (zucchetto di Benedetto XVI).",
  },
  {
    id: "foto-fate-cottingley",
    name: "Fotografia di una bambina con le fate (1917)",
    category: "curiosita",
    description: "Una vecchia foto seppia di una bambina in un prato, con piccole fate alate che danzano davanti a lei.",
    clues: [
      "Due cuginette inglesi giuravano di aver fotografato delle fate in fondo al giardino.",
      "Ci credette persino Arthur Conan Doyle, il papà di Sherlock Holmes.",
      "Solo nel 1983 ammisero che le fate erano disegni ritagliati e fissati con gli spilli.",
    ],
    value: 17000,
    image: "/asta/foto-fate-cottingley.jpg",
    credit: "Elsie Wright · Pubblico dominio",
    source: "https://commons.wikimedia.org/wiki/File:Cottingley_Fairies_3.jpg",
    valueNote:
      "Stampa d'epoca (anni '20) della prima foto delle Fate di Cottingley, \"Alice and the Fairies\", venduta da Dominic Winter Auctioneers (Cirencester) nell'ottobre 2018 per 15.000 £ di martello (circa 17.000 €; stima 700-1.000 £). Con i diritti il totale arriva a circa 18.600 £; la seconda stampa (\"Iris with the Gnome\") fece 5.400 £. Fonti: Mental Floss, CNN, Lancashire Evening Post. Foto rappresentativa (un'altra foto della stessa serie, la terza).",
  },
  {
    id: "kit-ammazza-vampiri",
    name: "Kit ammazza-vampiri dell'Ottocento",
    category: "curiosita",
    description: "Una cassetta di legno con paletti, martello, rosario e boccette di acqua santa.",
    clues: [
      "Contiene tutto il necessario contro un mostro della Transilvania.",
      "È appartenuto a un lord inglese che aveva amministrato l'India britannica.",
      "Le offerte sono arrivate da Francia, America e Canada; ha superato di sei volte la stima.",
    ],
    value: 19700,
    image: "/asta/kit-ammazza-vampiri.jpg",
    credit: "rawdonfox · CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Vampire_killing_kit,_Royal_Armouries_(cropped).jpg",
    valueNote:
      "Kit ammazza-vampiri (paletti, martello, acqua santa, rosario), appartenuto a Lord Hailey, venduto da Hansons Auctioneers (Derbyshire) il 30 giugno 2022: martello 13.000 £, totale con diritti 16.900 £ (circa 19.700 €), stima 2.000-3.000 £. Fonti: Antique Collecting (1 luglio 2022), Euronews (20 luglio 2022). Foto rappresentativa (kit delle Royal Armouries).",
  },
  {
    id: "cacca-dinosauro-fossile",
    name: "Reperto fossile di 130 milioni di anni",
    category: "curiosita",
    description: "Un grosso blocco di pietra grigia e bitorzoluta, appoggiato su un piatto.",
    clues: [
      "I paleontologi lo chiamano coprolite.",
      "Non è un osso né un uovo: è quello che un dinosauro si è lasciato dietro.",
      "Il compratore voleva usarlo come mascotte per motivare i suoi dipendenti.",
    ],
    value: 610,
    image: "/asta/cacca-dinosauro-fossile.jpg",
    credit: "United States Geological Survey · Pubblico dominio",
    source: "https://commons.wikimedia.org/wiki/File:Coprolite.jpg",
    valueNote:
      "Escremento fossile di dinosauro (coprolite) di circa 130 milioni di anni, venduto da Bonhams a New York nell'aprile 2008 per 960 $ (circa 610 €; stima 450 $) all'imprenditore Steve Tsengas dell'Ohio, che voleva usarlo come portafortuna alle fiere. Fonti: NBC News / AP (\"Man pays nearly a grand for prehistoric poop\"), Daily Illini. Foto rappresentativa.",
  },
  {
    id: "mutande-regina-vittoria",
    name: "Mutandoni di pizzo di fine Ottocento",
    category: "curiosita",
    description: "Un paio di enormi mutandoni di cotone bianco cuciti a mano, con il bordo di pizzo.",
    clues: [
      "La vita misura circa 127 centimetri.",
      "Sono stati cuciti a mano per una signora molto importante dell'Ottocento.",
      "Li indossava la regina Vittoria in vecchiaia.",
    ],
    value: 5700,
    image: "/asta/mutande-regina-vittoria.jpg",
    credit: "The Metropolitan Museum of Art · CC0",
    source: "https://commons.wikimedia.org/wiki/File:Drawers_MET_44.160.15_CP4.jpg",
    valueNote:
      "Mutandoni della regina Vittoria degli anni 1890 (vita di circa 50 pollici), venduti da Hansons Auctioneers (Derbyshire) il 30 luglio 2008 per 4.500 £ (circa 5.700 €; stima circa 500 £). Nella stessa asta la camicia da notte arrivò a 11.000 $. Fonti: NPR, NBC News, History News Network. Foto rappresentativa (mutandoni ottocenteschi del Met).",
  },
  {
    id: "ambra-grigia-anglesey",
    name: "Il sasso trovato da un cane sulla spiaggia",
    category: "curiosita",
    description: "Un grumo grigiastro e ceroso, grande come un melone, che sembra una pietra.",
    clues: [
      "L'ha trovato un uomo che portava a spasso il cane su una spiaggia del Galles.",
      "Pesa 1,1 kg ed è stato in mare per circa 50 anni.",
      "È \"ambra grigia\", prodotta nell'intestino dei capodogli e usata nei profumi di lusso.",
    ],
    value: 15000,
    image: "/asta/ambra-grigia-anglesey.jpg",
    credit: "Wmpearl · CC0",
    source: "https://commons.wikimedia.org/wiki/File:Ambergris,_Skagway_Museum.JPG",
    valueNote:
      "Pezzo di ambra grigia (\"vomito di balena\") di 1,1 kg trovato su una spiaggia di Anglesey (Galles), venduto da Adam Partridge Auctioneers (Macclesfield) nel settembre 2015 per 11.000 £ (circa 15.000 €; stima fino a 7.000 £). Fonti: Paul Fraser Collectibles (28 settembre 2015), Antiques Trade Gazette. Foto rappresentativa.",
  },
  {
    id: "uovo-uccello-elefante",
    name: "Un uovo grande come un pallone da rugby",
    category: "curiosita",
    description: "Un uovo color crema enorme, alto più di 30 cm, su un supporto di metallo.",
    clues: [
      "Ci starebbero dentro circa 160 uova di gallina.",
      "L'uccello che lo ha deposto era alto il doppio di un uomo e viveva in Madagascar.",
      "La specie è estinta da secoli: si chiamava uccello elefante.",
    ],
    value: 15500,
    image: "/asta/uovo-uccello-elefante.jpg",
    credit: "Vassil · CC0",
    source: "https://commons.wikimedia.org/wiki/File:Mus_Nat_Hist_Nat_25022013_Aepyornis_egg.jpg",
    valueNote:
      "Uovo di uccello elefante (Aepyornis, Madagascar, anteriore al XVII secolo) alto 32 cm, venduto da Christie's Londra all'asta \"Interiors: Style and Spirit\" del 22 maggio 2012 per 12.500 £ (circa 15.500 €; stima 10.000-15.000 £). Fonte: Paul Fraser Collectibles (23 maggio 2012). Foto rappresentativa (uovo del Museo di storia naturale di Parigi).",
  },
  {
    id: "stanza-senza-porta-wisbech",
    name: "Una stanza in Inghilterra (12 m²)",
    category: "curiosita",
    description: "Una stanzetta con una finestra, incastrata sopra un vicolo tra due case.",
    clues: [
      "Il Comune la possedeva dal 1966, ma nessuno ricorda di esserci mai entrato.",
      "Non ha porte: dall'esterno non c'è modo di entrare né di uscire.",
      "Il banditore ha detto in sala che bastava la prima offerta.",
    ],
    value: 1,
    image: "/asta/stanza-senza-porta-wisbech.jpg",
    credit: "Richard Humphrey · CC BY-SA 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Ghost_Passage,_Wisbech_-_geograph.org.uk_-_4787308.jpg",
    valueNote:
      "Stanza di circa 12 m² sopra un vicolo di Wisbech (Cambridgeshire), senza porte, di proprietà del Fenland District Council dal 1966. Venduta da William H Brown all'asta di Norwich il 20 febbraio 2020 per 1 £ (circa 1 €): la base di 100 £ era stata tolta poco prima. Fonti: Lancashire Evening Post / Scotsman (21 febbraio 2020, da BBC), Wisbech Standard. Foto rappresentativa (un passaggio coperto di Wisbech).",
  },
  {
    id: "vasetto-portaspazzolini-harappa",
    name: "Il vasetto portaspazzolini",
    category: "curiosita",
    description: "Un piccolo vaso di terracotta dipinto con rozzi animali, usato in bagno per tenerci gli spazzolini.",
    clues: [
      "Il proprietario l'aveva comprato insieme a un altro vaso per 4 sterline a un mercatino.",
      "Lavorava in una casa d'aste e ne ha notato uno uguale mentre scaricava un furgone.",
      "Ha circa 4.000 anni e viene dalla civiltà della valle dell'Indo.",
    ],
    value: 90,
    image: "/asta/vasetto-portaspazzolini-harappa.jpg",
    credit: "Ismoon · CC0",
    source: "https://commons.wikimedia.org/wiki/File:Storage_jar._Mature_Harappan_period._Indus_civilization.jpg",
    valueNote:
      "Vasetto della civiltà di Harappa (circa 1900 a.C., Afghanistan) che Karl Martin, dipendente di Hansons, usava come portaspazzolini dopo averlo comprato in coppia per 4 £ a un mercatino di Willington. Venduto all'asta di antichità di Hansons nel novembre 2018 per 80 £ (circa 90 €). Fonti: Antique Collecting (28 novembre 2018), Artnet News, Fox News. Foto rappresentativa (giara harappana più grande).",
  },
  {
    id: "pistola-anello-petit-protector",
    name: "La pistola più piccola del mondo",
    category: "curiosita",
    description: "Una pistolina a tamburo grande come un'unghia, montata su un anello, con astuccio e sei proiettili.",
    clues: [
      "Si chiama \"Le Petit Protector\".",
      "La portavano al dito i nobili dell'Ottocento, per difesa personale.",
      "È fatta interamente a mano ed è lunga pochi centimetri.",
    ],
    value: 6055,
    image: "/asta/pistola-anello-petit-protector.jpg",
    credit: "Swedish Army Museum · CC BY 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Kolibri_Pistol,_AM.059256,_01.jpg",
    valueNote:
      "Revolver ad anello \"Le Petit Protector\", grande come un'unghia, fatto a mano, con astuccio originale e sei proiettili, venduto su Catawiki nel 2016 per 6.055 €. Fonte: Catawiki, \"The 10 Most Unusual Items Ever Sold on Catawiki\" (che nel testo dice anche \"quasi 7.000 €\"; ho usato la cifra del titolo). Foto rappresentativa (pistola Kolibri, la semiautomatica più piccola, non ad anello).",
  },
  {
    id: "condanna-strega-1603",
    name: "Lettera di condanna di una strega (1603)",
    category: "curiosita",
    description: "Un vecchio documento scritto fitto in tedesco antico, con la sentenza di un processo.",
    clues: [
      "Racconta di un matrimonio a cui avrebbero partecipato sette streghe e il diavolo in persona.",
      "La donna condannata si chiamava Ursula Grimm.",
      "Una curiosità crudele: le spese dell'esecuzione toccavano al marito.",
    ],
    value: 2550,
    image: "/asta/condanna-strega-1603.jpg",
    credit: "Verbum · CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Steffen_von_Niederbergheim_Hexenprozess_Akte_1.jpg",
    valueNote:
      "Documento del 1603 con la condanna a morte per stregoneria di Ursula Grimm (accusata di aver partecipato a un matrimonio con sei altre streghe e il diavolo), venduto su Catawiki per 2.550 €. Fonte: Catawiki, \"The 10 Most Unusual Items Ever Sold on Catawiki\"; un'altra lista Catawiki (2020) riporta circa 2.000 £. Foto rappresentativa (pagina a stampa di un altro processo per stregoneria, 1617).",
  },
];

export default items;
