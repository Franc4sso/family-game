import type { AstaItem } from "./types";

// ───────────── CIMELI FAMOSI ─────────────
// Oggetti legati a personaggi ed eventi celebri. Le foto sono rappresentative:
// mostrano un oggetto simile, non l'esemplare venduto.
const items: AstaItem[] = [
  {
    id: "muro-berlino-frammento",
    name: "Frammento del Muro di Berlino con certificato",
    category: "cimeli",
    description: "Un pezzetto di cemento grigio con una traccia di vernice rossa, incollato su un cartoncino stampato.",
    clues: [
      "Il cartoncino garantisce che è autentico.",
      "Nel novembre 1989 la gente lo staccava a colpi di martello e scalpello.",
      "Nei negozi di souvenir di Berlino se ne vendono ancora migliaia ogni anno.",
    ],
    value: 15,
    image: "/asta/muro-berlino-frammento.jpg",
    credit: "Brocken Inaglory · CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Piece_of_Berlin_Wall.jpg",
    valueNote:
      "Frammenti souvenir del Muro con certificato: 8–25 € nei negozi di Berlino e su eBay. Molti sono di dubbia provenienza. Foto rappresentativa.",
  },
  {
    id: "biglietto-woodstock-1969",
    name: "Biglietto intero per i tre giorni di Woodstock (1969)",
    category: "cimeli",
    description: "Una striscia di carta gialla con tre tagliandi colorati per venerdì, sabato e domenica, mai staccati.",
    clues: [
      "È costato 18 dollari, ma non è mai stato usato.",
      "Dopo il primo giorno i cancelli furono abbattuti e tutti entrarono gratis.",
      "Sul palco, tra gli altri, Jimi Hendrix e Janis Joplin.",
    ],
    value: 500,
    image: "/asta/biglietto-woodstock-1969.jpg",
    credit: "Autore sconosciuto · Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Woodstock_ticket.jpg",
    valueNote:
      "Biglietti interi non usati del festival di Woodstock (agosto 1969): circa 300–800 $ su eBay e Heritage Auctions; ne sono rimasti molti proprio perché nessuno li ha strappati. Stima indicativa.",
  },
  {
    id: "lettera-garibaldi",
    name: "Lettera firmata da Giuseppe Garibaldi",
    category: "cimeli",
    description: "Un foglio ingiallito scritto a mano in corsivo ottocentesco, con una firma in fondo.",
    clues: [
      "L'ha scritta un uomo che si firmava anche «il Dittatore».",
      "Viene da un'isola in mezzo al mare, dove l'autore passò gli ultimi anni.",
      "L'autore scriveva tantissimo: le sue lettere non sono affatto rare.",
    ],
    value: 1200,
    image: "/asta/lettera-garibaldi.jpg",
    credit: "Autore sconosciuto · Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Carta_garibaldi_per_fazzari.jpg",
    valueNote:
      "Lettere autografe firmate da Garibaldi: in genere 600–2.500 € alle aste italiane di autografi (Bolaffi, Gonnelli, Bertolami), di più se il contenuto è storico. Stima indicativa. Foto rappresentativa.",
  },
  {
    id: "busta-apollo-12",
    name: "Busta firmata dall'equipaggio dell'Apollo 12 (1969)",
    category: "cimeli",
    description: "Una busta da lettera con lo stemma di una missione spaziale, due timbri postali e tre firme a penna.",
    clues: [
      "Gli astronauti la firmarono prima di partire, nel caso non fossero tornati.",
      "Era la loro «assicurazione sulla vita»: nessuna compagnia voleva assicurarli.",
      "È la seconda missione che ha portato l'uomo sulla Luna, non la prima.",
    ],
    value: 2500,
    image: "/asta/busta-apollo-12.jpg",
    credit: "Anagoria · Public domain",
    source: "https://commons.wikimedia.org/wiki/File:2012-10-23_Insurance_Cover_Apollo_12_anagoria.JPG",
    valueNote:
      "Insurance cover dell'Apollo 12 firmate da Conrad, Gordon e Bean: circa 2.000–4.000 $ (RR Auction, Heritage, 2024-25). Quelle dell'Apollo 11 valgono molto di più. Stima indicativa.",
  },
  {
    id: "sigaro-churchill",
    name: "Sigaro fumato a metà da Winston Churchill",
    category: "cimeli",
    description: "Un sigaro cubano spento, con la cenere tagliata e la punta mordicchiata.",
    clues: [
      "Il suo proprietario ne fumava una decina al giorno.",
      "Lo ha raccolto da un posacenere un ufficiale durante una visita ufficiale.",
      "Chi lo ha lasciato lì ha vinto un Nobel per la letteratura e una guerra mondiale.",
    ],
    value: 7000,
    image: "/asta/sigaro-churchill.jpg",
    credit: "Meysam ghahremani1986 · CC0",
    source: "https://commons.wikimedia.org/wiki/File:Cohiba-c.jpg",
    valueNote:
      "Mozziconi di sigaro di Churchill con provenienza documentata: venduti tra circa 4.500 £ e 12.000 $ (RR Auction 2017 e 2019, Alexander Historical Auctions). Stima indicativa. Foto rappresentativa.",
  },
  {
    id: "foto-firmata-einstein",
    name: "Fotografia autografata da Albert Einstein",
    category: "cimeli",
    description: "Un ritratto in bianco e nero di un signore con i baffi e i capelli spettinati davanti a una lavagna.",
    clues: [
      "Il soggetto detestava i calzini e non li metteva quasi mai.",
      "In fondo alla foto c'è una firma in tedesco.",
      "Il firmatario ha cambiato per sempre il modo di pensare al tempo e alla luce.",
    ],
    value: 15000,
    image: "/asta/foto-firmata-einstein.jpg",
    credit: "Ferdinand Schmutzer · Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Albert_Einstein_1921_by_F_Schmutzer.jpg",
    valueNote:
      "Fotografie firmate da Einstein: in genere 10.000–25.000 $ (RR Auction, Bonhams, Heritage, 2023-25); molto di più con dediche o formule. Stima indicativa. Foto rappresentativa (senza firma).",
  },
];

export default items;
