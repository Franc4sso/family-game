import type { AstaItem } from "./types";

// ───────────── CIBO E VINO ─────────────
// Specialità gastronomiche e bottiglie. Le foto sono rappresentative.
const items: AstaItem[] = [
  {
    id: "grappa-pera-bottiglia",
    name: "Distillato di pere Williams con la pera dentro la bottiglia",
    category: "gusto",
    description: "Una bottiglia di vetro panciuta chiusa da un tappo a sigillo, con una pera intera che galleggia nel liquore.",
    clues: [
      "La pera è più grande del collo della bottiglia.",
      "Non ce l'hanno infilata: è cresciuta lì dentro, appesa all'albero.",
      "Lo trovi nei duty free e negli autogrill di montagna.",
    ],
    value: 25,
    image: "/asta/grappa-pera-bottiglia.jpg",
    credit: "heymrleej · CC BY-SA 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Pear_brandy_(Birnenbrand,_Poire_Williams)_with_a_pear_in_the_bottle_(17416072196).jpg",
    valueNote:
      "Acquavite o grappa di pere Williams con pera in bottiglia (0,5–0,7 l): 20–40 € nei negozi e online (2025). Foto rappresentativa.",
  },
  {
    id: "balsamico-tradizionale-extravecchio",
    name: "Aceto Balsamico Tradizionale di Modena DOP Extravecchio (100 ml)",
    category: "gusto",
    description: "Una boccetta di vetro a forma di bulbo con un liquido scuro e denso, appoggiata su una botticella di legno.",
    clues: [
      "Se ne usano poche gocce alla volta.",
      "La boccetta, disegnata da Giugiaro, è uguale per tutti i produttori.",
      "Ha passato almeno 25 anni in una batteria di botti di legni diversi.",
    ],
    value: 95,
    image: "/asta/balsamico-tradizionale-extravecchio.jpg",
    credit: "Eleonora Vittoria Rosi · CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Aceto_Balsamico_Tradizionale_di_Modena_DOP_extravecchio.jpg",
    valueNote:
      "Aceto Balsamico Tradizionale di Modena DOP Extravecchio (25 anni) in bottiglia da 100 ml: circa 80–130 € dalle acetaie e nelle enoteche (2025). Foto rappresentativa.",
  },
  {
    id: "forma-parmigiano-reggiano",
    name: "Forma intera di Parmigiano Reggiano DOP (24 mesi, circa 40 kg)",
    category: "gusto",
    description: "Una forma di formaggio intera, con la crosta dorata coperta di scritte a puntini.",
    clues: [
      "Per farla servono circa 550 litri di latte.",
      "Le banche emiliane le accettano come garanzia per i prestiti.",
      "Le scritte sulla crosta indicano il caseificio e il mese di produzione.",
    ],
    value: 850,
    image: "/asta/forma-parmigiano-reggiano.jpg",
    credit: "Wittylama · CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Wheel_of_2013_Parmigiano-Reggiano_DOP.JPG",
    valueNote:
      "Forme intere di Parmigiano Reggiano 24 mesi (circa 38–40 kg) vendute direttamente dai caseifici: circa 18–24 €/kg, cioè 700–950 € (2025). Foto rappresentativa.",
  },
  {
    id: "tartufo-bianco-alba",
    name: "Tre etti di tartufo bianco d'Alba",
    category: "gusto",
    description: "Una cassetta di legno foderata di stoffa, piena di tuberi bitorzoluti color beige.",
    clues: [
      "Non si può coltivare: lo trovano i cani, di notte.",
      "Ha un odore così forte che è vietato portarlo su certi mezzi pubblici.",
      "Il prezzo cambia ogni settimana in base a quanta pioggia è caduta in autunno.",
    ],
    value: 1350,
    image: "/asta/tartufo-bianco-alba.jpg",
    credit: "Kent Wang from London, United Kingdom · CC BY-SA 2.0",
    source: "https://commons.wikimedia.org/wiki/File:White_truffles_from_Alba.jpg",
    valueNote:
      "Borsino del Tartufo Bianco d'Alba, stagione 2025: circa 4.000–5.000 €/kg per pezzature medie; 300 g ≈ 1.200–1.500 €. Gli esemplari giganti delle aste benefiche valgono molto di più. Foto rappresentativa.",
  },
  {
    id: "caviale-oscietra-1kg",
    name: "Un chilo di caviale Oscietra in scatolette",
    category: "gusto",
    description: "Una serie di scatolette tonde di latta, grandi e piccole, con etichette azzurre e dorate.",
    clues: [
      "Va servito con un cucchiaino di madreperla, mai d'argento.",
      "Viene da un pesce che esisteva già ai tempi dei dinosauri.",
      "È più economico del Beluga, ma è comunque il secondo caviale più pregiato.",
    ],
    value: 3500,
    image: "/asta/caviale-oscietra-1kg.jpg",
    credit: "The Ogre · CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Caviar_tins_(Russian_and_Iranian).jpg",
    valueNote:
      "Caviale Oscietra (Acipenser gueldenstaedtii) d'allevamento di qualità: circa 2.500–4.500 €/kg presso i rivenditori europei (Calvisius, Kaviari, 2025). Il Beluga supera i 10.000 €/kg. Foto rappresentativa.",
  },
  {
    id: "petrus-1982",
    name: "Due bottiglie di Château Pétrus 1982",
    category: "gusto",
    description: "Due bottiglie di vino rosso con etichette ingiallite e un ritratto di un santo, sistemate in una cassa di legno.",
    clues: [
      "Viene da una tenuta di appena 11 ettari, senza nemmeno un castello.",
      "È fatto quasi solo di uve Merlot.",
      "L'annata 1982 è considerata leggendaria per i vini di Bordeaux.",
    ],
    value: 12000,
    image: "/asta/petrus-1982.jpg",
    credit: "Andrew Phillips · CC BY 2.0",
    source: "https://commons.wikimedia.org/wiki/File:Several_bottles_of_1982_Petrus.jpg",
    valueNote:
      "Pétrus 1982 (75 cl): prezzo medio circa 5.500–6.500 € a bottiglia (Wine-Searcher, aste Sotheby's e Christie's, 2025); due bottiglie ≈ 12.000 €. Foto ritagliata dall'originale.",
  },
];

export default items;
