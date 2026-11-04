import type { AstaItem } from "./types";

// ───────────── MADE IN ITALY ─────────────
// Icone del design e dell'industria italiana. Le foto sono rappresentative.
const items: AstaItem[] = [
  {
    id: "cornetto-portafortuna",
    name: "Cornetto portafortuna rosso con coroncina",
    category: "italia",
    description: "Un cornetto rosso lucido, appuntito e ricurvo, con una coroncina argentata e un anellino per appenderlo.",
    clues: [
      "Funziona solo se qualcuno te lo regala.",
      "Deve essere rosso, rigido e cavo dentro.",
      "Lo vendono a centinaia sulle bancarelle di San Gregorio Armeno.",
    ],
    value: 5,
    image: "/asta/cornetto-portafortuna.jpg",
    credit: "Assafn · CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Small_Cornetto.jpg",
    valueNote:
      "Cornetti portafortuna in resina o plastica con coroncina metallica: 3–8 € nei negozi di souvenir di Napoli e online. Quelli in corallo vero costano molto di più. Foto rappresentativa.",
  },
  {
    id: "bollitore-alessi-graves",
    name: "Bollitore Alessi 9093 di Michael Graves",
    category: "italia",
    description: "Un bollitore da fornello in acciaio lucido a forma di cono, con manico azzurro e un uccellino rosso sul beccuccio.",
    clues: [
      "Quando l'acqua bolle, canta.",
      "Lo ha disegnato un architetto americano, ma è prodotto sul Lago d'Orta.",
      "È in catalogo dal 1985 ed è uno dei pezzi più venduti del marchio.",
    ],
    value: 190,
    image: "/asta/bollitore-alessi-graves.jpg",
    credit: "Holger Ellgaard · CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Graves_kittel_1984.jpg",
    valueNote:
      "Prezzo di listino Alessi del bollitore 9093 nel 2025: circa 180–200 € (alessi.com e rivenditori). Ancora in produzione. Foto rappresentativa.",
  },
  {
    id: "olivetti-valentine",
    name: "Macchina da scrivere Olivetti Valentine (1969)",
    category: "italia",
    description: "Una macchina da scrivere portatile in plastica rosso acceso, con tasti neri e una custodia a secchiello.",
    clues: [
      "Era pensata per essere usata ovunque, tranne che in ufficio.",
      "Il suo designer la chiamava scherzosamente «la Biro delle macchine da scrivere».",
      "È esposta al MoMA, ma ne furono prodotte decine di migliaia: si trova ancora nei mercatini.",
    ],
    value: 300,
    image: "/asta/olivetti-valentine.jpg",
    credit: "Maksym Kozlenko · CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Olivetti_Valentine_typewriter.jpg",
    valueNote:
      "Olivetti Valentine di Ettore Sottsass funzionanti con custodia: 200–450 € su eBay e Catawiki (2025). Prodotta in grandi numeri, non è rara. Foto rappresentativa.",
  },
  {
    id: "venini-vaso-fazzoletto",
    name: "Vaso «Fazzoletto» Venini in vetro zanfirico (anni '50)",
    category: "italia",
    description: "Un vaso di vetro trasparente a forma di fazzoletto ondulato, attraversato da sottilissime spirali bianche e rosa.",
    clues: [
      "Sembra un pezzo di stoffa lasciato cadere e rimasto in piedi.",
      "Nasce da un'idea di un illustratore di moda passato al vetro.",
      "È di Murano, firmato con l'incisione all'acido sotto la base: le copie abbondano.",
    ],
    value: 2500,
    image: "/asta/venini-vaso-fazzoletto.jpg",
    credit: "Ulrich Mayring · CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Vase_Fazzoletto.jpg",
    valueNote:
      "Vasi Fazzoletto di Fulvio Bianconi per Venini in zanfirico, esemplari originali anni '50 di media misura: 1.500–4.000 € alle aste (Cambi, Wright, Dorotheum). Le versioni recenti o non firmate valgono molto meno. Stima indicativa. Foto rappresentativa.",
  },
  {
    id: "lambretta-ld-150",
    name: "Lambretta LD 150 (1957) restaurata",
    category: "italia",
    description: "Uno scooter d'epoca azzurro chiaro con scocca chiusa, doppio sellino e un grande faro tondo sul manubrio.",
    clues: [
      "È stata la grande rivale di uno scooter ancora più famoso.",
      "Veniva prodotta a Milano, nel quartiere di Lambrate.",
      "Ha un motore da 150 cc e la carrozzeria che copre tutta la meccanica.",
    ],
    value: 5000,
    image: "/asta/lambretta-ld-150.jpg",
    credit: "sv1ambo · CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:1957_Lambretta_LD_150_scooter_(5956934491).jpg",
    valueNote:
      "Lambretta LD 150 restaurate e targate: circa 4.000–6.500 € tra annunci specializzati e aste di moto d'epoca (Catawiki, Subito, 2025). Stima indicativa. Foto rappresentativa.",
  },
  {
    id: "fiat-500-l-1970",
    name: "Fiat 500 L (1970) restaurata",
    category: "italia",
    description: "Una piccola utilitaria bianca a due porte con il motore dietro, i paraurti cromati e il tetto apribile in tela.",
    clues: [
      "È lunga meno di tre metri.",
      "La L sta per «Lusso»: aveva il cruscotto rivestito e i paraurti rinforzati.",
      "Ne sono state prodotte quasi quattro milioni: è il simbolo del boom economico.",
    ],
    value: 9500,
    image: "/asta/fiat-500-l-1970.jpg",
    credit: "Rutger van der Maar · CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:1970_Fiat_500_L_(11621367626).jpg",
    valueNote:
      "Fiat Nuova 500 L restaurate in buone condizioni: circa 7.500–12.000 € (quotazioni Ruoteclassiche e annunci specializzati, 2025). Stima indicativa. Foto rappresentativa.",
  },
];

export default items;
