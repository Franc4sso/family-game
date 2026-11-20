import type { FrecceCategory } from "./types";

export const concertiSpettatori: FrecceCategory = {
  id: "concerti-spettatori",
  title: "Spettatori ai concerti",
  unit: "spettatori a concerto, in media",
  rule: "Si tolgono gli spettatori medi a concerto dell'artista in un suo grande tour (di solito il più seguito): spettatori totali diviso il numero di date (Coldplay, con 13.138.644 spettatori in 223 date del Music of the Spheres World Tour, vale 58.918).",
  start: 160000,
  max: 51000,
  source: "Billboard Boxscore / Pollstar tramite Wikipedia: \"List of most-attended concert tours\" (https://en.wikipedia.org/wiki/List_of_most-attended_concert_tours) per totale e numero di date dei tour in classifica; per gli altri, tabella \"Box office score data\" della pagina Wikipedia del tour (somma dei biglietti venduti diviso le date con dati; tour più seguito tra quelli con dati per data), vedi anche https://en.wikipedia.org/wiki/List_of_highest-grossing_concert_tours. Rammstein: dati per data della pagina del tour (la classifica riporta 5.025.129 su 141 da fonte non Boxscore). Italiani: Vasco Live 2022, 701.000 spettatori in 11 date (Sorrisi, https://www.sorrisi.com/musica/concerti/il-trionfo-di-vasco-701-mila-spettatori/ e AGI); Ultimo Live Stadi 2024, 412.884 biglietti in 10 date (https://en.wikipedia.org/wiki/Ultimo_Live_Stadi_2024); Laura Pausini World Tour 2023-2024, oltre 500.000 spettatori in 80 spettacoli (LaPresse, https://www.lapresse.it/spettacoli/2025/01/02/spettacolo-di-capodanno-a-messina-laura-pausini-chiude-il-suo-tour-con-numeri-record/). Tour in corso (BTS, Bad Bunny) aggiornati alle date già svolte; dati al 20/11/2026",
  answers: [
    { name: "AC/DC", value: 29697, aliases: ["ACDC"] }, // Black Ice World Tour: 4900000 / 165
    { name: "Adele", value: 21343, aliases: [] }, // Adele Live 2016–2017: 2475773 / 116 (somma Boxscore date con dati)
    { name: "Ariana Grande", value: 14521, aliases: [] }, // Sweetener World Tour: 1437588 / 99 (somma Boxscore date con dati)
    { name: "Backstreet Boys", value: 13045, aliases: ["BSB"] }, // DNA World Tour: 2361102 / 181 (somma Boxscore date con dati)
    { name: "Bad Bunny", value: 55962, aliases: [] }, // Debí Tirar Más Fotos World Tour: 3077929 / 55 (somma Boxscore date con dati)
    { name: "Beyoncé", value: 49587, aliases: ["Queen B"] }, // Renaissance World Tour: 2776854 / 56 (somma Boxscore date con dati)
    { name: "Billie Eilish", value: 17199, aliases: [] }, // Hit Me Hard and Soft: The Tour: 1513492 / 88 (somma Boxscore date con dati)
    { name: "Blackpink", value: 27273, aliases: ["Black Pink"] }, // Born Pink World Tour: 1800000 / 66
    { name: "Bon Jovi", value: 25430, aliases: [] }, // Because We Can: 2542994 / 100 (somma Boxscore date con dati)
    { name: "Bruce Springsteen", value: 32051, aliases: ["Springsteen", "The Boss"] }, // Born in the U.S.A. Tour: 5000000 / 156
    { name: "Bruno Mars", value: 17495, aliases: [] }, // 24K Magic World Tour: 3236625 / 185 (somma Boxscore date con dati)
    { name: "BTS", value: 60898, aliases: ["Bangtan Boys"] }, // Arirang World Tour (in corso): 2314140 / 38 (somma Boxscore date con dati)
    { name: "Céline Dion", value: 18128, aliases: [] }, // Taking Chances World Tour: 2193483 / 121 (somma Boxscore date con dati)
    { name: "Cher", value: 10736, aliases: [] }, // Living Proof: The Farewell Tour: 3500000 / 326
    { name: "Chris Brown", value: 42160, aliases: [] }, // Breezy Bowl XX: 1981508 / 47 (somma Boxscore date con dati)
    { name: "Coldplay", value: 58918, aliases: [] }, // Music of the Spheres World Tour: 13138644 / 223
    { name: "Daddy Yankee", value: 24377, aliases: [] }, // La Última Vuelta World Tour: 1901376 / 78 (somma Boxscore date con dati)
    { name: "Depeche Mode", value: 24899, aliases: [] }, // Memento Mori World Tour: 2689095 / 108 (somma Boxscore date con dati)
    { name: "Dire Straits", value: 31004, aliases: [] }, // On Every Street Tour: 7100000 / 229
    { name: "Dua Lipa", value: 23609, aliases: [] }, // Radical Optimism Tour: 1865117 / 79 (somma Boxscore date con dati)
    { name: "Ed Sheeran", value: 34934, aliases: ["Sheeran"] }, // ÷ Tour: 8908150 / 255
    { name: "Elton John", value: 18166, aliases: [] }, // Farewell Yellow Brick Road: 5994810 / 330
    { name: "Garth Brooks", value: 16154, aliases: [] }, // The Garth Brooks World Tour 2014–2017: 6300000 / 390
    { name: "Guns N' Roses", value: 36458, aliases: ["Guns and Roses", "GNR"] }, // Use Your Illusion Tour: 7000000 / 192
    { name: "Harry Styles", value: 29586, aliases: [] }, // Love On Tour: 5000000 / 169
    { name: "Justin Bieber", value: 19846, aliases: [] }, // Purpose World Tour: 2837943 / 143 (somma Boxscore date con dati)
    { name: "Justin Timberlake", value: 15765, aliases: [] }, // The 20/20 Experience World Tour: 1986386 / 126 (somma Boxscore date con dati)
    { name: "Karol G", value: 36582, aliases: [] }, // Mañana Será Bonito Tour: 2268106 / 62 (somma Boxscore date con dati)
    { name: "Katy Perry", value: 14861, aliases: [] }, // Prismatic World Tour: 1515864 / 102 (somma Boxscore date con dati)
    { name: "Kiss", value: 11495, aliases: [] }, // End of the Road World Tour: 1321933 / 115 (somma Boxscore date con dati)
    { name: "Lady Gaga", value: 19019, aliases: ["Gaga"] }, // Born This Way Ball: 1692693 / 89 (somma Boxscore date con dati)
    { name: "Laura Pausini", value: 6250, aliases: ["Pausini"] }, // World Tour 2023-2024: 500000 / 80 (LaPresse, "oltre 500mila")
    { name: "Linkin Park", value: 31853, aliases: [] }, // From Zero World Tour: 1178563 / 37 (somma Boxscore date con dati)
    { name: "Luis Miguel", value: 15464, aliases: [] }, // Luis Miguel Tour 2023–24: 2953686 / 191 (somma Boxscore date con dati)
    { name: "Madonna", value: 41716, aliases: [] }, // Sticky & Sweet Tour: 3545899 / 85
    { name: "Metallica", value: 61883, aliases: [] }, // M72 World Tour: 5321900 / 86
    { name: "Michael Jackson", value: 36473, aliases: ["MJ"] }, // Bad World Tour: 4559065 / 125
    { name: "Muse", value: 32447, aliases: [] }, // Simulation Theory World Tour: 1038315 / 32 (somma Boxscore date con dati)
    { name: "Oasis", value: 70439, aliases: [] }, // Oasis Live '25 Tour: 2888000 / 41
    { name: "Olivia Rodrigo", value: 16420, aliases: [] }, // Guts World Tour: 1658467 / 101 (somma Boxscore date con dati)
    { name: "One Direction", value: 49849, aliases: ["1D"] }, // Where We Are Tour: 3439560 / 69 (somma Boxscore date con dati)
    { name: "Paul McCartney", value: 25049, aliases: [] }, // Out There Tour: 1703323 / 68 (somma Boxscore date con dati)
    { name: "Pink", value: 49485, aliases: ["P!nk"] }, // Summer Carnival: 4800000 / 97
    { name: "Pink Floyd", value: 50000, aliases: [] }, // The Division Bell Tour: 5500000 / 110
    { name: "Queen + Adam Lambert", value: 21100, aliases: ["Queen"] }, // The Rhapsody Tour: 1076089 / 51 (somma Boxscore date con dati)
    { name: "Rammstein", value: 47891, aliases: [] }, // Stadium Tour: 6465310 / 135 (somma Boxscore date con dati)
    { name: "Red Hot Chili Peppers", value: 39378, aliases: ["RHCP"] }, // Unlimited Love Tour: 3347100 / 85 (somma Boxscore date con dati)
    { name: "Rihanna", value: 19044, aliases: [] }, // Diamonds World Tour: 1618745 / 85 (somma Boxscore date con dati)
    { name: "Roger Waters", value: 18772, aliases: [] }, // The Wall Live: 4129863 / 220
    { name: "Sabrina Carpenter", value: 13951, aliases: [] }, // Short n' Sweet Tour: 976604 / 70 (somma Boxscore date con dati)
    { name: "Shakira", value: 35484, aliases: [] }, // Las Mujeres Ya No Lloran World Tour: 4400000 / 124
    { name: "Take That", value: 62228, aliases: [] }, // Progress Live: 2177973 / 35 (somma Boxscore date con dati)
    { name: "Taylor Swift", value: 68242, aliases: ["Taylor"] }, // The Eras Tour: 10168008 / 149
    { name: "The Police", value: 23239, aliases: ["Police"] }, // The Police Reunion Tour: 3416188 / 147 (somma Boxscore date con dati)
    { name: "The Rolling Stones", value: 50000, aliases: ["Rolling Stones"] }, // Voodoo Lounge Tour: 6400000 / 128
    { name: "The Weeknd", value: 51629, aliases: ["Weeknd"] }, // After Hours til Dawn Tour: 8157456 / 158
    { name: "Tina Turner", value: 18349, aliases: [] }, // Break Every Rule World Tour: 4000000 / 218
    { name: "Travis Scott", value: 22787, aliases: [] }, // Circus Maximus Tour: 1731778 / 76 (somma Boxscore date con dati)
    { name: "U2", value: 66110, aliases: [] }, // U2 360° Tour: 7272046 / 110
    { name: "Ultimo", value: 41288, aliases: [] }, // Ultimo Live Stadi 2024: 412884 / 10
    { name: "Usher", value: 13564, aliases: [] }, // Past Present Future: 1112264 / 82 (somma Boxscore date con dati)
    { name: "Vasco Rossi", value: 63727, aliases: ["Vasco"] }, // Vasco Live 2022: 701000 / 11
  ],
};
