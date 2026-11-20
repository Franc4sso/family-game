import type { FrecceCategory } from "./types";

export const cartoniEta: FrecceCategory = {
  id: "cartoni-eta",
  title: "Età dei personaggi dei cartoni",
  unit: "anni",
  rule: "Si toglie l'età ufficiale del personaggio nella serie o nel film: per chi non invecchia mai (come i Simpson) vale quella canonica più citata, per chi cresce durante la storia vale l'età con cui compare la prima volta (Bart Simpson vale 10, Rufy vale 17).",
  start: 110,
  max: 45,
  source: "Wiki ufficiali dei fan con citazione dell'episodio/film (Simpsons Wiki https://simpsons.fandom.com, Family Guy Wiki https://familyguy.fandom.com, The Cleveland Show Wiki https://cleveland.fandom.com, American Dad Wiki https://americandad.fandom.com, Rick and Morty Wiki https://rickandmorty.fandom.com, Gumball Wiki https://theamazingworldofgumball.fandom.com, Peppa Pig Wiki https://peppapig.fandom.com, Avatar Wiki https://avatar.fandom.com, Gravity Falls Wiki https://gravityfalls.fandom.com, Adventure Time Wiki https://adventuretime.fandom.com, PAW Patrol Wiki https://pawpatrol.fandom.com, Ghibli Wiki https://ghibli.fandom.com, Disney Wiki https://disney.fandom.com, Pixar Wiki https://pixar.fandom.com, Bulbapedia https://bulbapedia.bulbagarden.net, One Piece Wiki https://onepiece.fandom.com, Narutopedia https://naruto.fandom.com, Dragon Ball Wiki https://dragonball.fandom.com, Sailor Moon Wiki https://sailormoon.fandom.com, Doraemon Wiki https://doraemon.fandom.com, Winx Club Wiki https://winx.fandom.com), con controllo incrociato su Wikipedia italiana e inglese (https://it.wikipedia.org, https://en.wikipedia.org) — dati al 20/11/2026. Esclusi i personaggi con età discordanti o non ufficiali (es. Peter Griffin, Brian Griffin, Meg e Chris Griffin, Rick Sanchez, i bambini di South Park, Futurama, Bluey e Bingo, Russell di Up, Belle, Jasmine, Mulan, Cenerentola, Conan/Shinichi, SpongeBob, Phineas e Ferb, Candace e Doofenshmirtz, Preside Skinner, Commissario Winchester, Flynn Rider, Vanellope, Kim Possible)",
  answers: [
    { name: "Aang", value: 112, aliases: ["Avatar Aang"] },
    { name: "Aisha", value: 17, aliases: ["Layla", "Aisha delle Winx"] }, // Winx Club Wiki — 17 anni alla prima apparizione
    { name: "Alberto Scorfano", value: 14, aliases: ["Alberto"] }, // Pixar Wiki — Luca (2021): "a 14-year-old sea monster"
    { name: "Amy Mizuno", value: 14, aliases: ["Ami Mizuno", "Sailor Mercury"] },
    { name: "Anais Watterson", value: 4, aliases: ["Anais"] },
    { name: "Andy Davis", value: 6, aliases: ["Andy", "Andy di Toy Story"] },
    { name: "Anna", value: 18, aliases: ["Anna di Frozen", "Principessa Anna"] },
    { name: "Antonio Madrigal", value: 5, aliases: ["Antonio"] }, // Disney Wiki — Encanto (2021): "a 5-year-old Colombian boy"
    { name: "Ariel", value: 16, aliases: ["La sirenetta", "The Little Mermaid"] },
    { name: "Asami Sato", value: 18, aliases: ["Asami"] }, // Avatar Wiki — 18 anni nel Libro Uno: Aria (table read SDCC 2012)
    { name: "Ash Ketchum", value: 10, aliases: ["Ash", "Satoshi"] },
    { name: "Asha", value: 17, aliases: ["Asha di Wish"] },
    { name: "Ashitaka", value: 17, aliases: ["Ashitaka di Principessa Mononoke"] },
    { name: "Aurora", value: 16, aliases: ["La bella addormentata", "Rosaspina", "Sleeping Beauty"] },
    { name: "Azula", value: 14, aliases: ["Principessa Azula"] },
    { name: "Bagy", value: 37, aliases: ["Buggy", "Bagy il clown", "Buggy il clown"] }, // One Piece Wiki — 37 anni al debutto
    { name: "Banana Joe", value: 12, aliases: ["Joe Banana"] }, // Gumball Wiki — età 12
    { name: "Barbabianca", value: 72, aliases: ["Edward Newgate", "Barba Bianca", "Whitebeard"] }, // One Piece Wiki — 72 anni alla morte (Marineford)
    { name: "Barley Lightfoot", value: 19, aliases: ["Barley"] },
    { name: "Barney Gumble", value: 40, aliases: ["Barney"] },
    { name: "Bart Simpson", value: 10, aliases: ["Bart"] },
    { name: "Ben Tennyson", value: 10, aliases: ["Ben 10", "Ben"] },
    { name: "Beth Smith", value: 34, aliases: ["Beth"] },
    { name: "Biancaneve", value: 14, aliases: ["Snow White"] },
    { name: "Bloom", value: 16, aliases: ["Bloom delle Winx"] }, // Winx Club Wiki — i poteri si manifestano a 16 anni (stagione 1)
    { name: "Boa Hancock", value: 29, aliases: ["Hancock", "Imperatrice pirata"] }, // One Piece Wiki — 29 anni al debutto, 31 dopo il timeskip
    { name: "Bonnie Swanson", value: 46, aliases: ["Bonnie"] }, // Family Guy Wiki — "The Heartbreak Dog"
    { name: "Boo", value: 2, aliases: ["Boo di Monsters & Co.", "Mary Gibbs"] }, // Pixar Wiki — Monsters & Co. (2001): "a 2-year-old human toddler"
    { name: "Brook", value: 88, aliases: ["Brook di One Piece"] },
    { name: "Bruno Madrigal", value: 50, aliases: ["Bruno"] }, // Disney Wiki — Encanto (2021), 50 anni secondo Jared Bush
    { name: "Bunny Tsukino", value: 14, aliases: ["Sailor Moon", "Usagi Tsukino", "Bunny"] },
    { name: "Carl Fredricksen", value: 78, aliases: ["Carl", "Carl di Up"] },
    { name: "Carrie Krueger", value: 327, aliases: ["Carrie"] }, // Gumball Wiki — età 327
    { name: "Carter Pewterschmidt", value: 70, aliases: ["Carter"] }, // Family Guy Wiki — "Peterotica"
    { name: "Chibiusa", value: 900, aliases: ["Chibiusa Tsukino", "Sailor Chibi Moon", "Chibi Usa"] }, // Sailor Moon Wiki — Atto 21: King Endymion dice che ha 900 anni
    { name: "Chihiro", value: 10, aliases: ["Chihiro Ogino", "La città incantata"] },
    { name: "Cleveland Brown", value: 42, aliases: ["Cleveland"] }, // The Cleveland Show Wiki — "Mr. and Mrs. Brown"
    { name: "Crush", value: 150, aliases: ["Crush di Nemo", "La tartaruga di Nemo"] }, // Pixar Wiki — Alla ricerca di Nemo (2003): "150, dude, and still young!"
    { name: "Darwin Watterson", value: 10, aliases: ["Darwin"] },
    { name: "Dipper Pines", value: 12, aliases: ["Dipper"] },
    { name: "Drakul Mihawk", value: 41, aliases: ["Mihawk", "Occhi di Falco", "Dracule Mihawk"] }, // One Piece Wiki — SBS vol. 58: 41 anni al debutto
    { name: "Elio", value: 11, aliases: ["Elio Solís"] }, // Pixar Wiki — Elio (2025), Advance Kit: "an 11-year-old"
    { name: "Elsa", value: 21, aliases: ["Elsa di Frozen", "Regina Elsa"] },
    { name: "Finn", value: 12, aliases: ["Finn l'umano", "Finn the Human"] },
    { name: "Flash Parr", value: 10, aliases: ["Dash Parr", "Dash", "Flash degli Incredibili"] },
    { name: "Franky", value: 34, aliases: ["Franky di One Piece"] },
    { name: "Gaara", value: 12, aliases: ["Gaara della Sabbia"] }, // Narutopedia — Parte I: 12–13 anni
    { name: "George Pig", value: 2, aliases: ["George", "George di Peppa Pig"] }, // Peppa Pig Wiki — "George's Birthday": 2 anni
    { name: "Gian", value: 10, aliases: ["Takeshi Goda", "Takeshi Gouda", "Jaian"] }, // Doraemon Wiki — età 10
    { name: "Glenn Quagmire", value: 61, aliases: ["Quagmire"] },
    { name: "Goh", value: 10, aliases: ["Go di Pokémon"] }, // Bulbapedia — profilo ufficiale pokemon.co.jp: 10 anni
    { name: "Goku", value: 12, aliases: ["Son Goku", "Kakaroth", "Kakarot"] }, // Dragon Ball Wiki — 12 anni all'inizio di Dragon Ball (nato Age 737, storia da Age 749)
    { name: "Gumball Watterson", value: 12, aliases: ["Gumball"] },
    { name: "Hans", value: 23, aliases: ["Principe Hans"] },
    { name: "Hayley Smith", value: 19, aliases: ["Hayley"] }, // American Dad Wiki — "Paranoid Frandroid"
    { name: "Heidi", value: 5, aliases: ["Heidi di Johanna Spyri"] },
    { name: "Hiccup", value: 15, aliases: ["Hiccup Horrendous Haddock III", "Dragon Trainer"] },
    { name: "Hinata Hyuga", value: 12, aliases: ["Hinata"] }, // Narutopedia — Parte I: 12–13 anni
    { name: "Hiro Hamada", value: 14, aliases: ["Hiro", "Big Hero 6"] },
    { name: "Homer Simpson", value: 39, aliases: ["Homer", "Homer dei Simpson"] },
    { name: "Ian Lightfoot", value: 16, aliases: ["Ian", "Onward"] },
    { name: "Isabela Madrigal", value: 21, aliases: ["Isabela"] }, // Disney Wiki — Encanto (2021), 21 anni secondo Jared Bush
    { name: "Jacqueline Bouvier", value: 80, aliases: ["Jackie Bouvier", "Nonna Bouvier", "Mamma di Marge"] }, // Simpsons Wiki — "Moe Letter Blues"
    { name: "Jake", value: 28, aliases: ["Jake il cane", "Jake the Dog"] }, // Adventure Time Wiki — 28 "anni magici da cane" al debutto
    { name: "Jerry Smith", value: 35, aliases: ["Jerry"] },
    { name: "Jinbe", value: 44, aliases: ["Jimbe", "Jinbei", "Jimbei"] }, // One Piece Wiki — 44 anni al debutto, 46 dopo il timeskip
    { name: "Joe Swanson", value: 40, aliases: ["Joe"] }, // Family Guy Wiki — "Yacht Rocky"
    { name: "Judy Hopps", value: 24, aliases: ["Judy", "Zootropolis"] }, // Disney Wiki — Zootropolis (2016): 24 anni
    { name: "Kakashi Hatake", value: 26, aliases: ["Kakashi"] },
    { name: "Katara", value: 14, aliases: ["Katara di Avatar"] },
    { name: "Kiki", value: 13, aliases: ["Kiki consegne a domicilio"] },
    { name: "Korra", value: 17, aliases: ["Avatar Korra", "La leggenda di Korra"] },
    { name: "Kristoff", value: 21, aliases: ["Kristoff di Frozen"] },
    { name: "Krusty il Clown", value: 52, aliases: ["Krusty", "Krusty the Clown"] }, // Simpsons Wiki — "Once Upon a Time in Springfield"
    { name: "Kuzco", value: 18, aliases: ["Le follie dell'imperatore", "Imperatore Kuzco"] },
    { name: "Lady Oscar", value: 14, aliases: ["Oscar François de Jarjayes", "Oscar"] },
    { name: "Lilo", value: 6, aliases: ["Lilo Pelekai", "Lilo & Stitch"] },
    { name: "Lisa Simpson", value: 8, aliases: ["Lisa"] },
    { name: "Lois Griffin", value: 43, aliases: ["Lois"] }, // Family Guy Wiki — "Bigfat"
    { name: "Luca Paguro", value: 13, aliases: ["Luca"] },
    { name: "Lucinda", value: 10, aliases: ["Dawn", "Lucinda di Pokémon"] }, // Bulbapedia — DP001: il narratore dice che ha appena compiuto 10 anni
    { name: "Luisa Madrigal", value: 19, aliases: ["Luisa"] }, // Disney Wiki — Encanto (2021), 19 anni secondo Jared Bush
    { name: "Mabel Pines", value: 12, aliases: ["Mabel"] },
    { name: "Maggie Simpson", value: 1, aliases: ["Maggie"] },
    { name: "Mai", value: 15, aliases: ["Mai di Avatar"] }, // Avatar Wiki — 15 anni in Avatar: La leggenda di Aang
    { name: "Marceline", value: 1000, aliases: ["Marceline la regina dei vampiri", "Marceline the Vampire Queen"] },
    { name: "Marge Simpson", value: 34, aliases: ["Marge"] },
    { name: "Mavis", value: 118, aliases: ["Mavis Dracula", "Hotel Transylvania"] },
    { name: "Mei Kusakabe", value: 4, aliases: ["Mei di Totoro", "Il mio vicino Totoro"] },
    { name: "Mei Lee", value: 13, aliases: ["Meilin Lee", "Red", "Turning Red"] },
    { name: "Merida", value: 16, aliases: ["Ribelle", "Brave"] },
    { name: "Miguel Rivera", value: 12, aliases: ["Miguel", "Coco"] },
    { name: "Milo Thatch", value: 32, aliases: ["Milo", "Atlantis"] }, // Disney Wiki — Atlantis (2001), edizione speciale 2 dischi: 32 anni
    { name: "Mirabel Madrigal", value: 15, aliases: ["Mirabel", "Encanto"] },
    { name: "Misty", value: 10, aliases: ["Misty di Pokémon", "Kasumi"] }, // Bulbapedia — EP003 (versione giapponese): dice di avere 10 anni
    { name: "Monkey D. Rufy", value: 17, aliases: ["Rufy", "Luffy", "Monkey D. Luffy"] },
    { name: "Montgomery Burns", value: 104, aliases: ["Mr. Burns", "Signor Burns", "Charles Montgomery Burns"] },
    { name: "Morty Smith", value: 14, aliases: ["Morty"] },
    { name: "Mowgli", value: 10, aliases: ["Il libro della giungla", "Mowgli del Libro della giungla"] }, // Disney Wiki — Il libro della giungla (1967): cresciuto dai lupi fino a 10 anni
    { name: "Nami", value: 18, aliases: ["Nami di One Piece"] },
    { name: "Naruto Uzumaki", value: 12, aliases: ["Naruto"] },
    { name: "Nausicaä", value: 16, aliases: ["Nausicaä della Valle del vento"] },
    { name: "Ned Flanders", value: 60, aliases: ["Ned", "Flanders"] },
    { name: "Nefertari Bibi", value: 16, aliases: ["Bibi", "Vivi", "Nefertari Vivi", "Principessa Bibi"] }, // One Piece Wiki — 16 anni al debutto
    { name: "Nemo", value: 6, aliases: ["Alla ricerca di Nemo", "Finding Nemo"] },
    { name: "Nico Robin", value: 28, aliases: ["Robin"] },
    { name: "Nicole Watterson", value: 38, aliases: ["Nicole"] },
    { name: "Nobita Nobi", value: 10, aliases: ["Nobita"] },
    { name: "Nonno Abe Simpson", value: 83, aliases: ["Abe Simpson", "Abraham Simpson", "Nonno Simpson", "Grampa Simpson"] },
    { name: "Nonno Louie", value: 72, aliases: ["Louie Watterson", "Louie"] }, // Gumball Wiki — età 72
    { name: "Oliver Hutton", value: 11, aliases: ["Holly", "Tsubasa Ozora", "Holly di Holly e Benji"] },
    { name: "Patty Bouvier", value: 41, aliases: ["Patty"] }, // Simpsons Wiki — "Black Widower"
    { name: "Penny Fitzgerald", value: 12, aliases: ["Penny"] }, // Gumball Wiki — età 12
    { name: "Peppa Pig", value: 4, aliases: ["Peppa"] },
    { name: "Portgas D. Ace", value: 20, aliases: ["Ace", "Ace Pugno di Fuoco"] }, // One Piece Wiki — 20 anni alla morte (Marineford)
    { name: "Preside Brown", value: 50, aliases: ["Nigel Brown", "Principal Brown"] }, // Gumball Wiki — età 50
    { name: "Principessa Fiamma", value: 14, aliases: ["Flame Princess", "Fiamma"] }, // Adventure Time Wiki — 14 anni al debutto
    { name: "Quasimodo", value: 20, aliases: ["Il gobbo di Notre Dame"] },
    { name: "Rapunzel", value: 18, aliases: ["Rapunzel - L'intreccio della torre", "Tangled"] },
    { name: "Raya", value: 18, aliases: ["Raya e l'ultimo drago"] }, // Disney Wiki — Raya e l'ultimo drago (2021): "an 18-year-old"
    { name: "Richard Watterson", value: 38, aliases: ["Richard"] },
    { name: "Riley Andersen", value: 11, aliases: ["Riley", "Inside Out"] },
    { name: "Robbie Valentino", value: 16, aliases: ["Robbie"] }, // Gravity Falls Wiki — episodio 1x12 "Summerween"
    { name: "Roger", value: 1600, aliases: ["Roger l'alieno", "Roger di American Dad"] }, // American Dad Wiki — "1600 Candles"; 1600 anche in "Into the Jingleverse"
    { name: "Roronoa Zoro", value: 19, aliases: ["Zoro"] },
    { name: "Ryder", value: 10, aliases: ["Ryder di Paw Patrol", "Paw Patrol"] },
    { name: "Sakura Haruno", value: 12, aliases: ["Sakura"] },
    { name: "Sanji", value: 19, aliases: ["Sanji di One Piece"] },
    { name: "Sasuke Uchiha", value: 12, aliases: ["Sasuke"] },
    { name: "Seita", value: 14, aliases: ["Una tomba per le lucciole"] },
    { name: "Selma Bouvier", value: 41, aliases: ["Selma"] }, // Simpsons Wiki — "Black Widower"
    { name: "Setsuko", value: 4, aliases: ["Setsuko di Una tomba per le lucciole"] },
    { name: "Shin Chan", value: 5, aliases: ["Shinnosuke Nohara", "Shinnosuke"] },
    { name: "Shizuka Minamoto", value: 10, aliases: ["Shizuka"] }, // Doraemon Wiki — 10 anni (anime 1979 e 2005)
    { name: "Sokka", value: 15, aliases: ["Sokka di Avatar"] },
    { name: "Sophie Hatter", value: 18, aliases: ["Sophie", "Il castello errante di Howl"] },
    { name: "Sosuke", value: 5, aliases: ["Ponyo sulla scogliera"] },
    { name: "Stan Pines", value: 60, aliases: ["Prozio Stan", "Grunkle Stan", "Stanley Pines"] }, // Gravity Falls Wiki — episodio 2x17: 60 anni, nato il 15 giugno 1952
    { name: "Stan Smith", value: 42, aliases: ["Stan di American Dad"] }, // American Dad Wiki — "42-Year-Old Virgin", "Camera Stan"
    { name: "Stella", value: 17, aliases: ["Stella delle Winx"] }, // Winx Club Wiki — 17 anni alla prima apparizione
    { name: "Steve Smith", value: 14, aliases: ["Steve"] }, // American Dad Wiki — 14 anni (tornato a 14 in "Into the Jingleverse")
    { name: "Stewie Griffin", value: 1, aliases: ["Stewie"] },
    { name: "Suki", value: 15, aliases: ["Suki di Avatar"] }, // Avatar Wiki — Avatar Visual Dictionary p. 79: 15 anni nel Libro Uno
    { name: "Summer Smith", value: 17, aliases: ["Summer"] },
    { name: "Suneo Honekawa", value: 10, aliases: ["Suneo"] }, // Doraemon Wiki — età 10
    { name: "Suzy Pecora", value: 4, aliases: ["Suzy Sheep", "Suzy"] },
    { name: "Tenzin", value: 51, aliases: ["Tenzin di Korra"] }, // Avatar Wiki — 51 anni nel Libro Uno: Aria (Republic City tour)
    { name: "Tony Tony Chopper", value: 15, aliases: ["Chopper"] },
    { name: "Toph Beifong", value: 12, aliases: ["Toph"] },
    { name: "Tsunade", value: 51, aliases: ["Tsunade la Principessa Lumaca"] }, // Narutopedia — Parte I: 51 anni
    { name: "Ty Lee", value: 14, aliases: ["Ty Lee di Avatar"] }, // Avatar Wiki — Avatar Visual Dictionary p. 115: 14 anni
    { name: "Usop", value: 17, aliases: ["Usopp"] },
    { name: "Vaiana", value: 16, aliases: ["Moana", "Oceania"] },
    { name: "Vera", value: 10, aliases: ["May", "Vera di Pokémon"] }, // Bulbapedia — AG001: "My name's May and I'm 10 years old"
    { name: "Violetta Parr", value: 14, aliases: ["Violet Parr", "Violetta", "Violet"] },
    { name: "Wendy Corduroy", value: 15, aliases: ["Wendy"] }, // Gravity Falls Wiki — 15 anni (tweet di Alex Hirsch, 30/07/2012)
    { name: "Zuko", value: 16, aliases: ["Principe Zuko"] },
  ],
};
