import type { AstaItem } from "./types";

// ───────────── GIOCATTOLI VINTAGE ─────────────
// Giocattoli d'epoca e da collezione. Le foto sono rappresentative.
const items: AstaItem[] = [
  {
    id: "hot-wheels-camaro",
    name: "Modellino Hot Wheels Chevrolet Camaro (2013)",
    category: "giocattoli",
    description: "Una macchinina di metallo rossa con strisce bianche sul cofano e cerchi cromati.",
    clues: [
      "Sta nel palmo di una mano.",
      "Alcuni modelli di questa marca valgono quanto una casa.",
      "Questo è uscito nella serie base, venduta al supermercato.",
    ],
    value: 2,
    image: "/asta/hot-wheels-camaro.jpg",
    credit: "BenedictLiang · CC0",
    source: "https://commons.wikimedia.org/wiki/File:HOT_WHEELS_MAINLINE_2013_-_CHEVY_CAMARO.jpg",
    valueNote:
      "Hot Wheels «mainline» recenti, senza blister: 1–3 € su eBay e Vinted. Le rarità degli anni '60 (redline) possono valere migliaia di euro. Foto rappresentativa.",
  },
  {
    id: "game-boy-dmg-01",
    name: "Nintendo Game Boy originale (1989), usato",
    category: "giocattoli",
    description: "Una console portatile grigia e ingiallita, con lo schermo verdastro, la croce direzionale e due tasti viola.",
    clues: [
      "Funziona con quattro pile stilo e dura una trentina di ore.",
      "Il suo gioco più famoso era fatto di mattoncini che cadono.",
      "Ne sono stati venduti oltre cento milioni di esemplari.",
    ],
    value: 70,
    image: "/asta/game-boy-dmg-01.jpg",
    credit: "Raimond Spekking · CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Nintendo_Game_Boy_DMG-01-0243.jpg",
    valueNote:
      "Game Boy DMG-01 usati e funzionanti, senza scatola: circa 50–90 € su eBay e Subito (2025). Gli esemplari sigillati valgono molto di più. Foto rappresentativa.",
  },
  {
    id: "subbuteo-anni-70",
    name: "Set Subbuteo anni '70 con squadre e palloni",
    category: "giocattoli",
    description: "Un panno verde da gioco con porte, omini su basi semisferiche e una serie di palloni colorati.",
    clues: [
      "Si gioca con un dito solo.",
      "Il nome viene dal nome latino di un falco.",
      "Un set completo d'epoca, con due squadre e accessori, si trova facilmente ai mercatini.",
    ],
    value: 150,
    image: "/asta/subbuteo-anni-70.jpg",
    credit: "Sportingn · CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Subbuteo_equipment.JPG",
    valueNote:
      "Set Subbuteo vintage anni '70 con squadre e accessori: circa 80–250 € su eBay e Catawiki (2025); singole squadre rare possono valere di più. Stima indicativa. Foto rappresentativa.",
  },
  {
    id: "robot-latta-robby",
    name: "Robot di latta Robby a carica",
    category: "giocattoli",
    description: "Un robot di latta nero e rosso con la testa a cupola trasparente, antenne e braccia snodate.",
    clues: [
      "È il robot di un film di fantascienza del 1956.",
      "Sembra un pezzo da museo giapponese degli anni '50.",
      "È una riproduzione moderna, fatta dagli stessi stampi, venduta nuova in scatola.",
    ],
    value: 180,
    image: "/asta/robot-latta-robby.jpg",
    credit: "D J Shin · CC BY-SA 3.0",
    source: "https://commons.wikimedia.org/wiki/File:Osaka_Tin_Toy_Institute_%E2%80%93_The_Tin_Age_Collection_%E2%80%93_Mechanized_Robot_%E2%80%93_Robby_the_Robot_%E2%80%93_Front.jpg",
    valueNote:
      "Riedizioni moderne del «Mechanized Robot» (Osaka Tin Toy Institute, Tin Age Collection): circa 150–250 € nuove. L'originale Nomura del 1956 in scatola supera i 2.000–4.000 €.",
  },
  {
    id: "lego-millennium-falcon",
    name: "LEGO Star Wars Millennium Falcon UCS 10179 (2007), montato",
    category: "giocattoli",
    description: "Un'enorme astronave grigia a forma di disco costruita con i mattoncini, piena di dettagli.",
    clues: [
      "Pesa più di dieci chili e ha oltre cinquemila pezzi.",
      "Quando uscì costava circa 500 dollari ed era il set più grande mai prodotto.",
      "È fuori produzione da oltre quindici anni.",
    ],
    value: 1800,
    image: "/asta/lego-millennium-falcon.jpg",
    credit: "Cappo80 · Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Millennium_falcon_lego.jpg",
    valueNote:
      "Set LEGO 10179 usato, completo, senza scatola: circa 1.300–2.200 € (BrickEconomy, eBay, 2025); sigillato supera i 5.000 €. Stima indicativa. Foto rappresentativa.",
  },
  {
    id: "marklin-locomotiva-1902",
    name: "Locomotiva a vapore Märklin scartamento 2 (1902)",
    category: "giocattoli",
    description: "Una locomotiva giocattolo di latta nera con ruote rosse e tender, decorata a mano con filetti dorati.",
    clues: [
      "Più che un giocattolo era un regalo per bambini molto ricchi.",
      "Riproduce una locomotiva inglese, ma è stata fatta in Germania.",
      "Ha più di 120 anni e un marchio che produce trenini ancora oggi.",
    ],
    value: 12000,
    image: "/asta/marklin-locomotiva-1902.jpg",
    credit: "Bourbaki 2021 · CC BY-SA 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Technorama_Winterthur_M%C3%A4rklin_Spur_2_Englische_Dampflokomotive_LNWR_1902.jpeg",
    valueNote:
      "Locomotive Märklin in scartamento 2 dei primi del Novecento con tender, in buone condizioni: circa 6.000–20.000 € alle aste specializzate (Christie's, Vectis, Bertoia). Stima indicativa. Foto rappresentativa (esemplare museale).",
  },
];

export default items;
