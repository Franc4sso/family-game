import type { FrecceCategory } from "./types";

export const sagheDurata: FrecceCategory = {
  id: "saghe-durata",
  title: "Durata di una saga intera",
  unit: "minuti",
  rule: "Conta i minuti totali per vedere tutti i film della saga usciti al cinema finora, nella versione cinematografica (niente serie TV, film per la TV o per lo streaming, niente spin-off e versioni estese): per esempio Harry Potter, 8 film, vale 1178.",
  start: 2000,
  max: 620,
  source: "Wikipedia in inglese (durata nelle schede dei film, versione cinematografica) — https://en.wikipedia.org/wiki/Harry_Potter_and_the_Philosopher%27s_Stone_(film) (dati al 20/11/2026). Per i film italiani la durata è quella di Wikipedia in italiano.",
  answers: [
    { name: "21 Jump Street", value: 221, aliases: ["22 Jump Street", "Jump Street"] }, // 2 film: 109+112
    { name: "28 giorni dopo", value: 436, aliases: ["28 Days Later", "28 anni dopo"] }, // 4 film: 113+99+115+109 — 28 giorni dopo, 28 settimane dopo, 28 anni dopo, Il tempio delle ossa
    { name: "A Quiet Place", value: 286, aliases: ["A Quiet Place - Un posto tranquillo"] }, // 3 film: 90+97+99 — compreso il prequel Giorno 1
    { name: "Ace Ventura", value: 180 }, // 2 film: 86+94 — i 2 film con Jim Carrey
    { name: "Alice in Wonderland", value: 221, aliases: ["Alice attraverso lo specchio", "Alice di Tim Burton"] }, // 2 film: 108+113 — i 2 film live-action (2010 e 2016); escluso il classico animato
    { name: "Alien", value: 841 }, // 7 film: 116+137+114+109+124+122+119 — compresi i prequel Prometheus e Covenant; esclusi gli Alien vs. Predator
    { name: "Alla ricerca di Nemo", value: 197, aliases: ["Finding Nemo", "Nemo", "Alla ricerca di Dory"] }, // 2 film: 100+97
    { name: "Alvin Superstar", value: 358, aliases: ["Alvin and the Chipmunks", "Alvin"] }, // 4 film: 91+88+87+92
    { name: "American Pie", value: 404 }, // 4 film: 95+100+96+113
    { name: "Amici miei", value: 344 }, // 3 film: 114+121+109 — Atto I, II e III (durate da it.wikipedia, Atto I nella versione al cinema, non quella estesa da 127); escluso il prequel del 2011
    { name: "Animali fantastici", value: 409, aliases: ["Fantastic Beasts"] }, // 3 film: 133+134+142
    { name: "Annabelle", value: 315 }, // 3 film: 99+110+106
    { name: "Ant-Man", value: 359 }, // 3 film: 117+118+124
    { name: "Arma letale", value: 468, aliases: ["Lethal Weapon"] }, // 4 film: 109+114+118+127
    { name: "Asterix e Obelix", value: 555, aliases: ["Asterix", "Asterix & Obelix"] }, // 5 film: 110+107+117+110+111 — i 5 film live-action; esclusi i film d'animazione
    { name: "Austin Powers", value: 278 }, // 3 film: 89+95+94 — il primo: 89 min, durata USA (internazionale 95)
    { name: "Avatar", value: 551 }, // 3 film: 162+192+197
    { name: "Avengers", value: 614, aliases: ["The Avengers"] }, // 4 film: 143+141+149+181 — i 4 film Avengers del MCU (Doomsday esce il 18/12/2026)
    { name: "Bad Boys", value: 503 }, // 4 film: 119+147+124+113
    { name: "Batman di Tim Burton e Schumacher", value: 498, aliases: ["Batman di Tim Burton", "Batman anni '90"] }, // 4 film: 126+126+121+125 — Batman (1989), Batman - Il ritorno, Batman Forever, Batman & Robin
    { name: "Benvenuti al Sud", value: 216, aliases: ["Benvenuti al Nord"] }, // 2 film: 106+110 — durate da it.wikipedia
    { name: "Beverly Hills Cop", value: 312, aliases: ["Un piedipiatti a Beverly Hills"] }, // 3 film: 105+103+104 — i 3 film al cinema; escluso Axel F (Netflix)
    { name: "Blade", value: 350 }, // 3 film: 120+117+113 — la trilogia con Wesley Snipes
    { name: "Blade Runner", value: 280 }, // 2 film: 117+163 — Blade Runner nella versione uscita al cinema nel 1982
    { name: "Bourne", value: 600, aliases: ["Jason Bourne", "The Bourne Identity"] }, // 5 film: 119+108+115+135+123 — compreso The Bourne Legacy
    { name: "Bridget Jones", value: 453, aliases: ["Il diario di Bridget Jones"] }, // 4 film: 97+108+123+125
    { name: "Captain America", value: 525 }, // 4 film: 124+136+147+118 — compreso Brave New World (2025)
    { name: "Cars", value: 324, aliases: ["Cars - Motori ruggenti"] }, // 3 film: 116+106+102
    { name: "Cattivissimo me", value: 642, aliases: ["Despicable Me", "Minions"] }, // 7 film: 94+97+89+94+91+87+90 — 4 Cattivissimo me + 3 Minions (Minions & Monsters uscito a luglio 2026)
    { name: "Chucky", value: 526, aliases: ["La bambola assassina", "Child's Play"] }, // 6 film: 87+84+90+89+86+90 — i 5 film al cinema della serie originale + il remake del 2019; esclusi Curse e Cult of Chucky (direct-to-video)
    { name: "Cinquanta sfumature", value: 348, aliases: ["Cinquanta sfumature di grigio", "Fifty Shades", "50 sfumature"] }, // 3 film: 125+118+105
    { name: "Creed", value: 379 }, // 3 film: 133+130+116
    { name: "Deadpool", value: 355 }, // 3 film: 108+119+128
    { name: "Die Hard", value: 610, aliases: ["Trappola di cristallo"] }, // 5 film: 132+124+128+128+98
    { name: "Divergent", value: 379, aliases: ["The Divergent Series"] }, // 3 film: 139+119+121
    { name: "Don Camillo", value: 545 }, // 5 film: 107+116+100+117+105 — i 5 film con Fernandel e Gino Cervi (1952-1965); durate da it.wikipedia
    { name: "Dragon Trainer", value: 304, aliases: ["How to Train Your Dragon"] }, // 3 film: 98+102+104 — trilogia animata; escluso il remake live-action del 2025
    { name: "Dune", value: 320 }, // 2 film: 155+165 — solo i film di Villeneuve; escluso il Dune di Lynch (1984); Parte tre esce il 18/12/2026
    { name: "Fantozzi", value: 934 }, // 10 film: 108+105+93+85+88+94+82+92+96+91 — i 10 film, da Fantozzi (1975) a Fantozzi 2000 - La clonazione; durate da it.wikipedia
    { name: "Fast & Furious", value: 1242, aliases: ["Fast and Furious", "The Fast and the Furious"] }, // 10 film: 107+107+104+107+130+130+137+136+143+141 — i 10 film della saga principale; escluso lo spin-off Hobbs & Shaw
    { name: "Final Destination", value: 564 }, // 6 film: 98+90+93+82+91+110
    { name: "Frozen", value: 205, aliases: ["Frozen - Il regno di ghiaccio"] }, // 2 film: 102+103
    { name: "Ghostbusters", value: 568, aliases: ["Acchiappafantasmi"] }, // 5 film: 105+108+116+124+115 — compreso il reboot del 2016
    { name: "Gli Incredibili", value: 233, aliases: ["The Incredibles", "Incredibles"] }, // 2 film: 115+118
    { name: "Grease", value: 224 }, // 2 film: 110+114
    { name: "Gremlins", value: 212 }, // 2 film: 106+106
    { name: "Guardiani della Galassia", value: 408, aliases: ["Guardians of the Galaxy"] }, // 3 film: 122+136+150 — escluso lo speciale TV di Natale
    { name: "Halloween", value: 1267 }, // 13 film: 91+92+99+88+96+88+86+90+110+105+106+105+111 — tutti i 13 film della serie, compresi Season of the Witch e i remake di Rob Zombie
    { name: "Harry Potter", value: 1178 }, // 8 film: 152+161+141+157+138+153+146+130
    { name: "Hotel Transylvania", value: 277 }, // 3 film: 91+89+97 — i 3 film al cinema; escluso Transformania (streaming)
    { name: "Hunger Games", value: 863, aliases: ["The Hunger Games"] }, // 6 film: 142+146+123+137+157+158 — compresi il prequel Ballata dell'usignolo e del serpente e L'alba sulla mietitura (USA 20/11/2026)
    { name: "I Croods", value: 193, aliases: ["The Croods", "Croods"] }, // 2 film: 98+95
    { name: "I mercenari", value: 436, aliases: ["The Expendables", "Expendables"] }, // 4 film: 103+103+126+104
    { name: "Il cavaliere oscuro", value: 456, aliases: ["Batman di Nolan", "The Dark Knight", "Trilogia del cavaliere oscuro"] }, // 3 film: 140+152+164
    { name: "Il codice da Vinci", value: 408, aliases: ["Robert Langdon", "Angeli e demoni"] }, // 3 film: 149+138+121 — i 3 film con Robert Langdon: Il codice da Vinci, Angeli e demoni, Inferno
    { name: "Il diavolo veste Prada", value: 228, aliases: ["The Devil Wears Prada"] }, // 2 film: 109+119 — compreso il 2 (maggio 2026)
    { name: "Il gatto con gli stivali", value: 192, aliases: ["Puss in Boots"] }, // 2 film: 90+102
    { name: "Il gladiatore", value: 303, aliases: ["Gladiator", "Il gladiatore II"] }, // 2 film: 155+148
    { name: "Il mistero dei Templari", value: 255, aliases: ["National Treasure"] }, // 2 film: 131+124
    { name: "Il Padrino", value: 537, aliases: ["The Godfather"] }, // 3 film: 175+200+162 — Parte III nella versione al cinema (162), non Coda
    { name: "Il pianeta delle scimmie", value: 1120, aliases: ["Planet of the Apes"] }, // 10 film: 112+95+98+88+87+120+105+130+140+145 — tutti i 10 film, compreso il remake di Burton (2001)
    { name: "Il Signore degli Anelli", value: 558, aliases: ["The Lord of the Rings", "LOTR"] }, // 3 film: 178+179+201
    { name: "Independence Day", value: 265 }, // 2 film: 145+120
    { name: "Indiana Jones", value: 635 }, // 5 film: 115+117+127+122+154
    { name: "Inside Out", value: 191 }, // 2 film: 95+96
    { name: "Insidious", value: 622, aliases: ["Oltre i confini del male"] }, // 6 film: 102+106+98+103+107+106 — compreso Out of the Further (agosto 2026)
    { name: "Io vi troverò", value: 294, aliases: ["Taken"] }, // 3 film: 94+91+109
    { name: "Iron Man", value: 381 }, // 3 film: 126+125+130
    { name: "It", value: 304 }, // 2 film: 135+169 — It (2017) e It - Capitolo due; esclusa la miniserie TV del 1990
    { name: "James Bond", value: 3208, aliases: ["007", "Agente 007"] }, // 25 film: 110+115+110+130+117+142+120+121+125+125+126+127+131+131+131+133+130+119+128+133+144+106+143+148+163
    { name: "John Wick", value: 523 }, // 4 film: 101+122+131+169 — 4 capitoli; escluso lo spin-off Ballerina
    { name: "Joker", value: 260 }, // 2 film: 122+138
    { name: "Jumanji", value: 346 }, // 3 film: 104+119+123 — Jumanji (1995), Benvenuti nella giungla, The Next Level; escluso Zathura
    { name: "Jurassic Park", value: 881, aliases: ["Jurassic World"] }, // 7 film: 127+129+92+124+128+147+134
    { name: "Karate Kid", value: 691, aliases: ["The Karate Kid"] }, // 6 film: 126+113+111+107+140+94 — tutti i 6 film, compreso il remake del 2010 e Legends (2025)
    { name: "Kill Bill", value: 247 }, // 2 film: 110+137
    { name: "Kingsman", value: 401 }, // 3 film: 129+141+131
    { name: "Kung Fu Panda", value: 371 }, // 4 film: 92+90+95+94
    { name: "L'era glaciale", value: 446, aliases: ["Ice Age"] }, // 5 film: 81+90+94+87+94 — i 5 film al cinema; escluso Buck Wild (streaming)
    { name: "La casa", value: 547, aliases: ["Evil Dead"] }, // 6 film: 85+84+81+92+96+109 — La casa, La casa 2, L'armata delle tenebre (81 min, durata USA; internazionale 89), il remake del 2013, Evil Dead Rise ed Evil Dead Burn (luglio 2026)
    { name: "La mummia", value: 366, aliases: ["The Mummy"] }, // 3 film: 125+129+112
    { name: "La notte del giudizio", value: 499, aliases: ["The Purge", "La prima notte del giudizio"] }, // 5 film: 85+104+110+97+103
    { name: "Le cronache di Narnia", value: 406, aliases: ["Narnia", "The Chronicles of Narnia"] }, // 3 film: 143+150+113
    { name: "Lo chiamavano Trinità", value: 238, aliases: ["Trinità"] }, // 2 film: 117+121 — Lo chiamavano Trinità... e ...continuavano a chiamarlo Trinità; durate da it.wikipedia (117 confermato da MYmovies, Wikidata dice 110)
    { name: "Lo Hobbit", value: 474, aliases: ["The Hobbit"] }, // 3 film: 169+161+144
    { name: "Lo squalo", value: 428, aliases: ["Jaws"] }, // 4 film: 124+116+98+90
    { name: "Mad Max", value: 564 }, // 5 film: 93+96+107+120+148 — compreso Furiosa
    { name: "Madagascar", value: 267 }, // 3 film: 85+89+93
    { name: "Magic Mike", value: 337 }, // 3 film: 110+115+112
    { name: "Maleficent", value: 216 }, // 2 film: 97+119
    { name: "Mamma ho perso l'aereo", value: 325, aliases: ["Home Alone"] }, // 3 film: 103+120+102 — i 3 usciti al cinema; esclusi i film TV/streaming
    { name: "Mamma Mia!", value: 223, aliases: ["Mamma Mia"] }, // 2 film: 109+114
    { name: "Marvel Cinematic Universe", value: 4986, aliases: ["MCU", "Marvel"] }, // 38 film: 126+112+125+114+124+143+130+112+136+122+141+117+147+115+136+133+130+134+149+118+124+181+129+134+132+156+148+126+119+161+124+150+105+128+118+127+115+145 — da Iron Man (2008) a Spider-Man: Brand New Day (2026); Avengers: Doomsday esce il 18/12/2026, escluso
    { name: "Mary Poppins", value: 270, aliases: ["Il ritorno di Mary Poppins"] }, // 2 film: 139+131
    { name: "Matrix", value: 551, aliases: ["The Matrix"] }, // 4 film: 136+138+129+148
    { name: "Maze Runner", value: 387 }, // 3 film: 113+131+143
    { name: "Men in Black", value: 407, aliases: ["MIB"] }, // 4 film: 98+88+106+115
    { name: "Mission: Impossible", value: 1103, aliases: ["Mission Impossible"] }, // 8 film: 110+123+126+133+131+147+163+170
    { name: "Monsters & Co.", value: 196, aliases: ["Monsters, Inc.", "Monsters Inc", "Monsters University"] }, // 2 film: 92+104
    { name: "MonsterVerse", value: 600, aliases: ["Godzilla e Kong", "Godzilla vs. Kong"] }, // 5 film: 123+118+131+113+115 — Godzilla (2014), Kong: Skull Island, Godzilla II, Godzilla vs. Kong, Godzilla e Kong - Il nuovo impero
    { name: "Nightmare", value: 752, aliases: ["Nightmare - Dal profondo della notte", "A Nightmare on Elm Street"] }, // 8 film: 91+87+96+93+89+89+112+95 — i 7 film 1984-1994 (compreso Nightmare - Nuovo incubo) + il remake del 2010; escluso il crossover Freddy vs. Jason
    { name: "Notte al museo", value: 310, aliases: ["Night at the Museum", "Una notte al museo"] }, // 3 film: 108+105+97 — i 3 film live-action al cinema; escluso il film animato in streaming
    { name: "Now You See Me", value: 356, aliases: ["Now You See Me - I maghi del crimine", "I maghi del crimine"] }, // 3 film: 115+129+112
    { name: "Ocean's", value: 363, aliases: ["Ocean's Eleven", "Trilogia di Ocean's"] }, // 3 film: 116+125+122 — trilogia di Soderbergh; escluso lo spin-off Ocean's 8 e l'originale del 1960
    { name: "Oceania", value: 207, aliases: ["Moana", "Vaiana"] }, // 2 film: 107+100
    { name: "Pacific Rim", value: 243 }, // 2 film: 132+111
    { name: "Paddington", value: 305 }, // 3 film: 95+104+106
    { name: "Paranormal Activity", value: 521 }, // 6 film: 86+91+84+88+84+88 — i 6 film al cinema, compreso Il segnato; escluso Next of Kin (streaming)
    { name: "Percy Jackson", value: 225 }, // 2 film: 119+106 — i 2 film; esclusa la serie TV
    { name: "Pets", value: 172, aliases: ["Pets - Vita da animali", "The Secret Life of Pets"] }, // 2 film: 86+86
    { name: "Piovono polpette", value: 185, aliases: ["Cloudy with a Chance of Meatballs"] }, // 2 film: 90+95
    { name: "Pirati dei Caraibi", value: 726, aliases: ["Pirates of the Caribbean"] }, // 5 film: 143+150+168+136+129
    { name: "Pitch Perfect", value: 320 }, // 3 film: 112+115+93
    { name: "Predator", value: 536 }, // 5 film: 107+108+107+107+107 — esclusi gli AVP e i film solo in streaming (Prey, Killer of Killers)
    { name: "Ralph Spaccatutto", value: 213, aliases: ["Wreck-It Ralph", "Ralph"] }, // 2 film: 101+112
    { name: "Rambo", value: 470 }, // 5 film: 93+96+101+91+89 — Last Blood: 89 min, durata USA/UK (internazionale 101)
    { name: "Resident Evil", value: 587 }, // 6 film: 100+93+94+97+96+107 — i 6 film di Paul W. S. Anderson con Milla Jovovich; esclusi i reboot del 2021 e del 2026
    { name: "Rio", value: 195 }, // 2 film: 94+101
    { name: "Ritorno al futuro", value: 342, aliases: ["Back to the Future"] }, // 3 film: 116+108+118
    { name: "RoboCop", value: 441 }, // 4 film: 102+117+104+118 — compreso il remake del 2014
    { name: "Rocky", value: 635 }, // 6 film: 119+119+100+91+104+102 — Rocky IV 91 e Rocky Balboa 102 sono le versioni al cinema (non director's cut); Creed a parte
    { name: "Rush Hour", value: 277, aliases: ["Rush Hour - Due mine vaganti"] }, // 3 film: 97+90+90
    { name: "Saw", value: 971, aliases: ["Saw - L'enigmista", "L'enigmista"] }, // 10 film: 103+93+108+92+92+90+90+92+93+118 — compresi Jigsaw e Spiral
    { name: "Scary Movie", value: 519 }, // 6 film: 88+82+84+83+86+96 — compreso Scary Movie (2026), uscito a giugno 2026
    { name: "Scemo & più scemo", value: 215, aliases: ["Scemo e più scemo", "Dumb and Dumber"] }, // 2 film: 106+109 — i 2 film con Jim Carrey; escluso il prequel del 2003
    { name: "Scream", value: 809 }, // 7 film: 111+120+117+111+114+122+114
    { name: "Sex and the City", value: 291 }, // 2 film: 145+146 — i 2 film; escluse le serie TV
    { name: "Sherlock Holmes", value: 257, aliases: ["Sherlock Holmes di Guy Ritchie"] }, // 2 film: 128+129
    { name: "Shrek", value: 368 }, // 4 film: 90+92+93+93
    { name: "Sing", value: 218 }, // 2 film: 108+110
    { name: "Sissi", value: 312, aliases: ["La principessa Sissi"] }, // 3 film: 102+101+109 — la trilogia con Romy Schneider
    { name: "Smetto quando voglio", value: 325 }, // 3 film: 105+118+102 — la trilogia: Smetto quando voglio, Masterclass, Ad honorem; durate da it.wikipedia
    { name: "Sonic", value: 331, aliases: ["Sonic the Hedgehog", "Sonic - Il film"] }, // 3 film: 99+122+110
    { name: "Spider-Man di Sam Raimi", value: 387, aliases: ["Spider-Man di Tobey Maguire", "Trilogia di Spider-Man"] }, // 3 film: 121+127+139
    { name: "Spider-Man di Tom Holland", value: 555, aliases: ["Spider-Man MCU"] }, // 4 film: 133+129+148+145
    { name: "Spider-Verse", value: 257, aliases: ["Spider-Man: Un nuovo universo", "Spider-Man: Across the Spider-Verse"] }, // 2 film: 117+140 — i 2 film animati; Beyond the Spider-Verse non ancora uscito
    { name: "Spy Kids", value: 361 }, // 4 film: 88+100+84+89 — i 4 film al cinema; escluso Armageddon (Netflix)
    { name: "Star Trek", value: 1518 }, // 13 film: 132+113+105+122+106+110+118+111+103+117+127+132+122 — tutti i 13 film al cinema, dal 1979 a Star Trek Beyond
    { name: "Star Wars", value: 1224, aliases: ["Guerre stellari", "Saga degli Skywalker"] }, // 9 film: 121+124+132+134+142+140+138+152+141 — solo i 9 episodi della saga degli Skywalker; esclusi Rogue One, Solo e The Clone Wars (spin-off/antologia)
    { name: "Step Up", value: 518 }, // 5 film: 103+97+107+99+112 — i 5 film; escluso lo spin-off cinese
    { name: "Super Mario", value: 190, aliases: ["Super Mario Bros.", "Super Mario Bros. - Il film"] }, // 2 film: 92+98
    { name: "Superman di Christopher Reeve", value: 485, aliases: ["Superman di Reeve"] }, // 4 film: 143+127+125+90 — i 4 film con Christopher Reeve (1978-1987)
    { name: "Terminator", value: 722, aliases: ["The Terminator"] }, // 6 film: 107+137+109+115+126+128
    { name: "The Amazing Spider-Man", value: 278, aliases: ["Spider-Man di Andrew Garfield"] }, // 2 film: 136+142
    { name: "The Conjuring", value: 493, aliases: ["L'evocazione", "Conjuring"] }, // 4 film: 112+134+112+135
    { name: "The Equalizer", value: 362, aliases: ["Equalizer"] }, // 3 film: 132+121+109
    { name: "The LEGO Movie", value: 208, aliases: ["Lego Movie"] }, // 2 film: 101+107 — i 2 film principali; esclusi LEGO Batman e LEGO Ninjago
    { name: "Thor", value: 475 }, // 4 film: 114+112+130+119
    { name: "Ti presento i miei", value: 321, aliases: ["Meet the Parents"] }, // 3 film: 108+115+98 — Ti presento i miei, Mi presenti i tuoi?, Vi presento i nostri; il 4° (Focker-in-Law) esce negli USA il 25/11/2026, escluso
    { name: "Top Gun", value: 239 }, // 2 film: 109+130
    { name: "Toy Story", value: 478 }, // 5 film: 81+92+103+100+102 — Toy Story 1-5 (il 5 uscito a giugno 2026); escluso lo spin-off Lightyear
    { name: "Transformers", value: 1002 }, // 7 film: 143+150+154+165+149+114+127 — 7 film live-action con Bumblebee; esclusi i film d'animazione (1986 e Transformers One)
    { name: "Trolls", value: 274 }, // 3 film: 92+91+91
    { name: "Tron", value: 340 }, // 3 film: 96+125+119 — compreso Tron: Ares (2025)
    { name: "Twilight", value: 607, aliases: ["The Twilight Saga"] }, // 5 film: 121+130+124+117+115
    { name: "Un weekend da bamboccioni", value: 203, aliases: ["Grown Ups"] }, // 2 film: 102+101
    { name: "Una notte da leoni", value: 301, aliases: ["The Hangover", "Hangover"] }, // 3 film: 100+101+100
    { name: "Una pallottola spuntata", value: 338, aliases: ["The Naked Gun", "Pallottola spuntata"] }, // 4 film: 85+85+83+85 — i 3 film con Leslie Nielsen + il seguito del 2025 con Liam Neeson
    { name: "Una settimana da Dio", value: 197, aliases: ["Bruce Almighty", "Un'impresa da Dio"] }, // 2 film: 101+96
    { name: "Underworld", value: 493 }, // 5 film: 121+106+89+86+91
    { name: "Venerdì 13", value: 1012, aliases: ["Friday the 13th"] }, // 11 film: 95+87+95+91+92+87+88+100+88+92+97 — gli 11 film, compreso il remake del 2009; escluso il crossover Freddy vs. Jason
    { name: "Venom", value: 318 }, // 3 film: 112+97+109
    { name: "Wicked", value: 297 }, // 2 film: 160+137
    { name: "Wolverine", value: 370 }, // 3 film: 107+126+137
    { name: "X-Men", value: 862 }, // 7 film: 104+133+104+132+131+144+114 — solo i 7 film della squadra; Wolverine e Deadpool a parte
    { name: "Zoolander", value: 191 }, // 2 film: 89+102
    { name: "Zootropolis", value: 216, aliases: ["Zootopia"] }, // 2 film: 108+108
  ],
};
