import type { FrecceCategory } from "./types";

export const sagheDurata: FrecceCategory = {
  id: "saghe-durata",
  title: "Durata di una saga intera",
  unit: "minuti",
  rule: "Conta i minuti totali per vedere tutti i film della saga usciti al cinema finora, nella versione cinematografica (niente serie TV, film per la TV o per lo streaming, niente spin-off e versioni estese): per esempio Harry Potter, 8 film, vale 1178.",
  start: 2200,
  max: 820,
  source: "Wikipedia in inglese (durata nelle schede dei film, versione cinematografica) — https://en.wikipedia.org/wiki/Harry_Potter_and_the_Philosopher%27s_Stone_(film) (dati al 20/11/2026)",
  answers: [
    { name: "Alien", value: 841 }, // 7 film: 116+137+114+109+124+122+119 — compresi i prequel Prometheus e Covenant; esclusi gli Alien vs. Predator
    { name: "Alla ricerca di Nemo", value: 197, aliases: ["Finding Nemo", "Nemo", "Alla ricerca di Dory"] }, // 2 film: 100+97
    { name: "American Pie", value: 404 }, // 4 film: 95+100+96+113
    { name: "Animali fantastici", value: 409, aliases: ["Fantastic Beasts"] }, // 3 film: 133+134+142
    { name: "Arma letale", value: 468, aliases: ["Lethal Weapon"] }, // 4 film: 109+114+118+127
    { name: "Avatar", value: 551 }, // 3 film: 162+192+197
    { name: "Bad Boys", value: 503 }, // 4 film: 119+147+124+113
    { name: "Bourne", value: 600, aliases: ["Jason Bourne", "The Bourne Identity"] }, // 5 film: 119+108+115+135+123 — compreso The Bourne Legacy
    { name: "Bridget Jones", value: 453, aliases: ["Il diario di Bridget Jones"] }, // 4 film: 97+108+123+125
    { name: "Cars", value: 324, aliases: ["Cars - Motori ruggenti"] }, // 3 film: 116+106+102
    { name: "Cinquanta sfumature", value: 348, aliases: ["Cinquanta sfumature di grigio", "Fifty Shades", "50 sfumature"] }, // 3 film: 125+118+105
    { name: "Creed", value: 379 }, // 3 film: 133+130+116
    { name: "Deadpool", value: 355 }, // 3 film: 108+119+128
    { name: "Die Hard", value: 610, aliases: ["Trappola di cristallo"] }, // 5 film: 132+124+128+128+98
    { name: "Dragon Trainer", value: 304, aliases: ["How to Train Your Dragon"] }, // 3 film: 98+102+104 — trilogia animata; escluso il remake live-action del 2025
    { name: "Dune", value: 320 }, // 2 film: 155+165 — solo i film di Villeneuve; escluso il Dune di Lynch (1984); Parte tre esce il 18/12/2026
    { name: "Final Destination", value: 564 }, // 6 film: 98+90+93+82+91+110
    { name: "Frozen", value: 205, aliases: ["Frozen - Il regno di ghiaccio"] }, // 2 film: 102+103
    { name: "Ghostbusters", value: 568, aliases: ["Acchiappafantasmi"] }, // 5 film: 105+108+116+124+115 — compreso il reboot del 2016
    { name: "Gli Incredibili", value: 233, aliases: ["The Incredibles", "Incredibles"] }, // 2 film: 115+118
    { name: "Gremlins", value: 212 }, // 2 film: 106+106
    { name: "Halloween", value: 1267 }, // 13 film: 91+92+99+88+96+88+86+90+110+105+106+105+111 — tutti i 13 film della serie, compresi Season of the Witch e i remake di Rob Zombie
    { name: "Harry Potter", value: 1178 }, // 8 film: 152+161+141+157+138+153+146+130
    { name: "Hunger Games", value: 863, aliases: ["The Hunger Games"] }, // 6 film: 142+146+123+137+157+158 — compresi il prequel Ballata dell'usignolo e del serpente e L'alba sulla mietitura (USA 20/11/2026)
    { name: "Il cavaliere oscuro", value: 456, aliases: ["Batman di Nolan", "The Dark Knight", "Trilogia del cavaliere oscuro"] }, // 3 film: 140+152+164
    { name: "Il gatto con gli stivali", value: 192, aliases: ["Puss in Boots"] }, // 2 film: 90+102
    { name: "Il Padrino", value: 537, aliases: ["The Godfather"] }, // 3 film: 175+200+162 — Parte III nella versione al cinema (162), non Coda
    { name: "Il pianeta delle scimmie", value: 1120, aliases: ["Planet of the Apes"] }, // 10 film: 112+95+98+88+87+120+105+130+140+145 — tutti i 10 film, compreso il remake di Burton (2001)
    { name: "Il Signore degli Anelli", value: 558, aliases: ["The Lord of the Rings", "LOTR"] }, // 3 film: 178+179+201
    { name: "Indiana Jones", value: 635 }, // 5 film: 115+117+127+122+154
    { name: "Inside Out", value: 191 }, // 2 film: 95+96
    { name: "James Bond", value: 3208, aliases: ["007", "Agente 007"] }, // 25 film: 110+115+110+130+117+142+120+121+125+125+126+127+131+131+131+133+130+119+128+133+144+106+143+148+163
    { name: "John Wick", value: 523 }, // 4 film: 101+122+131+169 — 4 capitoli; escluso lo spin-off Ballerina
    { name: "Jurassic Park", value: 881, aliases: ["Jurassic World"] }, // 7 film: 127+129+92+124+128+147+134
    { name: "Karate Kid", value: 691, aliases: ["The Karate Kid"] }, // 6 film: 126+113+111+107+140+94 — tutti i 6 film, compreso il remake del 2010 e Legends (2025)
    { name: "Kill Bill", value: 247 }, // 2 film: 110+137
    { name: "Kingsman", value: 401 }, // 3 film: 129+141+131
    { name: "Kung Fu Panda", value: 371 }, // 4 film: 92+90+95+94
    { name: "L'era glaciale", value: 446, aliases: ["Ice Age"] }, // 5 film: 81+90+94+87+94 — i 5 film al cinema; escluso Buck Wild (streaming)
    { name: "La mummia", value: 366, aliases: ["The Mummy"] }, // 3 film: 125+129+112
    { name: "Le cronache di Narnia", value: 406, aliases: ["Narnia", "The Chronicles of Narnia"] }, // 3 film: 143+150+113
    { name: "Lo Hobbit", value: 474, aliases: ["The Hobbit"] }, // 3 film: 169+161+144
    { name: "Lo squalo", value: 428, aliases: ["Jaws"] }, // 4 film: 124+116+98+90
    { name: "Mad Max", value: 564 }, // 5 film: 93+96+107+120+148 — compreso Furiosa
    { name: "Madagascar", value: 267 }, // 3 film: 85+89+93
    { name: "Mamma ho perso l'aereo", value: 325, aliases: ["Home Alone"] }, // 3 film: 103+120+102 — i 3 usciti al cinema; esclusi i film TV/streaming
    { name: "Mamma Mia!", value: 223, aliases: ["Mamma Mia"] }, // 2 film: 109+114
    { name: "Marvel Cinematic Universe", value: 4986, aliases: ["MCU", "Marvel"] }, // 38 film: 126+112+125+114+124+143+130+112+136+122+141+117+147+115+136+133+130+134+149+118+124+181+129+134+132+156+148+126+119+161+124+150+105+128+118+127+115+145 — da Iron Man (2008) a Spider-Man: Brand New Day (2026); Avengers: Doomsday esce il 18/12/2026, escluso
    { name: "Matrix", value: 551, aliases: ["The Matrix"] }, // 4 film: 136+138+129+148
    { name: "Maze Runner", value: 387 }, // 3 film: 113+131+143
    { name: "Men in Black", value: 407, aliases: ["MIB"] }, // 4 film: 98+88+106+115
    { name: "Mission: Impossible", value: 1103, aliases: ["Mission Impossible"] }, // 8 film: 110+123+126+133+131+147+163+170
    { name: "Monsters & Co.", value: 196, aliases: ["Monsters, Inc.", "Monsters Inc", "Monsters University"] }, // 2 film: 92+104
    { name: "Notte al museo", value: 310, aliases: ["Night at the Museum", "Una notte al museo"] }, // 3 film: 108+105+97 — i 3 film live-action al cinema; escluso il film animato in streaming
    { name: "Ocean's", value: 363, aliases: ["Ocean's Eleven", "Trilogia di Ocean's"] }, // 3 film: 116+125+122 — trilogia di Soderbergh; escluso lo spin-off Ocean's 8 e l'originale del 1960
    { name: "Oceania", value: 207, aliases: ["Moana", "Vaiana"] }, // 2 film: 107+100
    { name: "Paddington", value: 305 }, // 3 film: 95+104+106
    { name: "Pets", value: 172, aliases: ["Pets - Vita da animali", "The Secret Life of Pets"] }, // 2 film: 86+86
    { name: "Pirati dei Caraibi", value: 726, aliases: ["Pirates of the Caribbean"] }, // 5 film: 143+150+168+136+129
    { name: "Predator", value: 536 }, // 5 film: 107+108+107+107+107 — esclusi gli AVP e i film solo in streaming (Prey, Killer of Killers)
    { name: "Ralph Spaccatutto", value: 213, aliases: ["Wreck-It Ralph", "Ralph"] }, // 2 film: 101+112
    { name: "Rambo", value: 470 }, // 5 film: 93+96+101+91+89 — Last Blood: 89 min, durata USA/UK (internazionale 101)
    { name: "Ritorno al futuro", value: 342, aliases: ["Back to the Future"] }, // 3 film: 116+108+118
    { name: "Rocky", value: 635 }, // 6 film: 119+119+100+91+104+102 — Rocky IV 91 e Rocky Balboa 102 sono le versioni al cinema (non director's cut); Creed a parte
    { name: "Rush Hour", value: 277, aliases: ["Rush Hour - Due mine vaganti"] }, // 3 film: 97+90+90
    { name: "Saw", value: 971, aliases: ["Saw - L'enigmista", "L'enigmista"] }, // 10 film: 103+93+108+92+92+90+90+92+93+118 — compresi Jigsaw e Spiral
    { name: "Scream", value: 809 }, // 7 film: 111+120+117+111+114+122+114
    { name: "Sherlock Holmes", value: 257, aliases: ["Sherlock Holmes di Guy Ritchie"] }, // 2 film: 128+129
    { name: "Shrek", value: 368 }, // 4 film: 90+92+93+93
    { name: "Sing", value: 218 }, // 2 film: 108+110
    { name: "Sonic", value: 331, aliases: ["Sonic the Hedgehog", "Sonic - Il film"] }, // 3 film: 99+122+110
    { name: "Spider-Man di Sam Raimi", value: 387, aliases: ["Spider-Man di Tobey Maguire", "Trilogia di Spider-Man"] }, // 3 film: 121+127+139
    { name: "Spider-Man di Tom Holland", value: 555, aliases: ["Spider-Man MCU"] }, // 4 film: 133+129+148+145
    { name: "Star Wars", value: 1224, aliases: ["Guerre stellari", "Saga degli Skywalker"] }, // 9 film: 121+124+132+134+142+140+138+152+141 — solo i 9 episodi della saga degli Skywalker; esclusi Rogue One, Solo e The Clone Wars (spin-off/antologia)
    { name: "Super Mario", value: 190, aliases: ["Super Mario Bros.", "Super Mario Bros. - Il film"] }, // 2 film: 92+98
    { name: "Terminator", value: 722, aliases: ["The Terminator"] }, // 6 film: 107+137+109+115+126+128
    { name: "The Amazing Spider-Man", value: 278, aliases: ["Spider-Man di Andrew Garfield"] }, // 2 film: 136+142
    { name: "The Conjuring", value: 493, aliases: ["L'evocazione", "Conjuring"] }, // 4 film: 112+134+112+135
    { name: "Toy Story", value: 478 }, // 5 film: 81+92+103+100+102 — Toy Story 1-5 (il 5 uscito a giugno 2026); escluso lo spin-off Lightyear
    { name: "Transformers", value: 1002 }, // 7 film: 143+150+154+165+149+114+127 — 7 film live-action con Bumblebee; esclusi i film d'animazione (1986 e Transformers One)
    { name: "Twilight", value: 607, aliases: ["The Twilight Saga"] }, // 5 film: 121+130+124+117+115
    { name: "Una notte da leoni", value: 301, aliases: ["The Hangover", "Hangover"] }, // 3 film: 100+101+100
    { name: "Wolverine", value: 370 }, // 3 film: 107+126+137
    { name: "X-Men", value: 862 }, // 7 film: 104+133+104+132+131+144+114 — solo i 7 film della squadra; Wolverine e Deadpool a parte
    { name: "Zootropolis", value: 216, aliases: ["Zootopia"] }, // 2 film: 108+108
  ],
};
