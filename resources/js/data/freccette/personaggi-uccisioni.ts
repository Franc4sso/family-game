import type { FrecceCategory } from "./types";

export const personaggiUccisioni: FrecceCategory = {
  id: "personaggi-uccisioni",
  title: "Quanti ne ha fatti fuori",
  unit: "vittime",
  rule: "Si toglie quante vittime la List of Deaths Wiki attribuisce al personaggio nei suoi film e nelle sue serie TV (fumetti, romanzi e videogiochi esclusi). Come fa la wiki, contano anche le uccisioni fuori campo, solo citate, condivise od ordinate da lui e le morti che provoca indirettamente, quindi anche quelle del suo drago o di un esercito che crolla con lui (John Wick vale 455, Daenerys più di 750 mila).",
  start: 1000,
  max: 400,
  source: "List of Deaths Wiki (Fandom), totale della sezione \"Kill Count\" nella pagina di ogni personaggio — https://listofdeaths.fandom.com (es. https://listofdeaths.fandom.com/wiki/Jonathan_%22John%22_Wick). Quando la pagina comprende anche fumetti, romanzi o videogiochi si sommano solo i totali dei film e delle serie riportati nella pagina stessa (John Wick, Vedova Nera, Iron Man, Freddy Krueger, Michael Myers, Jigsaw); per Ghostface, senza totale generale, si sommano i totali dei film. Dati al 20/11/2026",
  answers: [
    { name: "Aldo Raine", value: 257, aliases: ["Aldo l'Apache", "L'Apache"] }, // LoD Kill Count, Bastardi senza gloria (uccisioni condivise dei Bastardi incluse)
    { name: "Anton Chigurh", value: 13, aliases: [] }, // LoD Kill Count, Non è un paese per vecchi
    { name: "Aragorn", value: 11818, aliases: ["Grampasso"] }, // LoD Kill Count, trilogia del Signore degli Anelli
    { name: "Art il Clown", value: 50, aliases: ["Art the Clown"] }, // LoD Kill Count, All Hallows' Eve + Terrifier 1-3
    { name: "Arthur Fleck", value: 8, aliases: ["Joker di Joaquin Phoenix"] }, // LoD Kill Count, Joker (2019)
    { name: "Arya Stark", value: 213370, aliases: ["Arya"] }, // LoD Kill Count, Il Trono di Spade st. 1-8 (st. 8: Re della Notte e i suoi non morti)
    { name: "Batman", value: 41, aliases: ["Bruce Wayne"] }, // LoD Kill Count, trilogia di Nolan
    { name: "Bellatrix Lestrange", value: 4, aliases: ["Bellatrix"] }, // LoD Kill Count, film di Harry Potter
    { name: "Black Panther", value: 53, aliases: ["Pantera Nera", "T'Challa"] }, // LoD Kill Count, film Marvel (Chadwick Boseman)
    { name: "Brienne di Tarth", value: 26, aliases: ["Brienne", "Brienne of Tarth"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Capitan America", value: 214, aliases: ["Captain America", "Steve Rogers"] }, // LoD Kill Count, film Marvel
    { name: "Cersei Lannister", value: 187, aliases: ["Cersei"] }, // LoD Kill Count, Il Trono di Spade (st. 6: tempio di Baelor)
    { name: "Chewbacca", value: 46, aliases: ["Chewie"] }, // LoD Kill Count, film e serie di Star Wars
    { name: "Chucky", value: 159, aliases: ["Charles Lee Ray"] }, // LoD Kill Count, film La bambola assassina + serie Chucky
    { name: "Daenerys Targaryen", value: 753052, aliases: ["Daenerys", "Khaleesi", "Madre dei draghi"] }, // LoD Kill Count, Il Trono di Spade, vittime dei draghi incluse
    { name: "Dexter", value: 193, aliases: ["Dexter Morgan"] }, // LoD Kill Count, Dexter + Early Cuts, New Blood, Original Sin, Resurrection
    { name: "Ditocorto", value: 5, aliases: ["Petyr Baelish", "Littlefinger"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Django", value: 42, aliases: ["Django Freeman"] }, // LoD Kill Count, Django Unchained (+ cameo in Un milione di modi per morire nel West)
    { name: "Doctor Strange", value: 15, aliases: ["Dottor Strange", "Stephen Strange"] }, // LoD Kill Count, film Marvel
    { name: "Drogon", value: 752921, aliases: [] }, // LoD Kill Count, Il Trono di Spade
    { name: "Dutch", value: 44, aliases: ["Dutch Schaefer", "Alan Schaefer"] }, // LoD Kill Count, Predator (1987)
    { name: "Euron Greyjoy", value: 10, aliases: ["Euron"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Freddy Krueger", value: 80, aliases: ["Freddy"] }, // LoD Kill Count "Original Timeline" (film), fumetti esclusi
    { name: "Frodo", value: 1, aliases: ["Frodo Baggins", "Frodo Beggins"] }, // LoD Kill Count, trilogia del Signore degli Anelli
    { name: "Gamora", value: 5, aliases: [] }, // LoD Kill Count, film Marvel
    { name: "Gandalf", value: 10254, aliases: ["Gandalf il Bianco", "Gandalf il Grigio"] }, // LoD Kill Count, trilogie del Signore degli Anelli e dello Hobbit
    { name: "Geralt di Rivia", value: 171, aliases: ["Geralt", "The Witcher", "Lo Strigo"] }, // LoD Kill Count, serie The Witcher st. 1-4 + film animati
    { name: "Ghostface", value: 72, aliases: ["Scream"] }, // LoD, somma dei totali dei film Scream 1-7 (tutti gli assassini mascherati)
    { name: "Gimli", value: 11757, aliases: [] }, // LoD Kill Count, trilogia del Signore degli Anelli
    { name: "Gollum", value: 5028, aliases: ["Sméagol"] }, // LoD Kill Count, Signore degli Anelli + Lo Hobbit
    { name: "Gus Fring", value: 60, aliases: ["Gustavo Fring"] }, // LoD Kill Count, Breaking Bad + Better Call Saul
    { name: "Han Solo", value: 58, aliases: [] }, // LoD Kill Count, film di Star Wars
    { name: "Hannibal Lecter", value: 41, aliases: ["Hannibal", "Hannibal the Cannibal"] }, // LoD Kill Count, film (Hannibal Lecter - Le origini del male, Red Dragon, Il silenzio degli innocenti, Hannibal)
    { name: "Hans Landa", value: 5, aliases: ["Colonnello Landa"] }, // LoD Kill Count, Bastardi senza gloria
    { name: "Harley Quinn", value: 85, aliases: ["Harleen Quinzel"] }, // LoD Kill Count, Suicide Squad, Birds of Prey, The Suicide Squad
    { name: "Harry Potter", value: 17, aliases: [] }, // LoD Kill Count, film di Harry Potter
    { name: "Hermione Granger", value: 1, aliases: ["Hermione"] }, // LoD Kill Count, film di Harry Potter
    { name: "Hodor", value: 3, aliases: [] }, // LoD Kill Count, Il Trono di Spade
    { name: "Hulk", value: 147, aliases: ["Bruce Banner"] }, // LoD Kill Count, film e serie Marvel
    { name: "Il Mastino", value: 58, aliases: ["Sandor Clegane", "Mastino"] }, // LoD Kill Count, Il Trono di Spade (+ 1 da Histories & Lore)
    { name: "Iron Man", value: 75523, aliases: ["Tony Stark"] }, // LoD, totali dei film Marvel (Kill Count 75.562 meno i fumetti)
    { name: "Ispettore Callaghan", value: 45, aliases: ["Callaghan", "Harry Callaghan", "Dirty Harry"] }, // LoD Kill Count, i 5 film di Dirty Harry
    { name: "Jack Sparrow", value: 35, aliases: ["Capitan Jack Sparrow"] }, // LoD Kill Count, I pirati dei Caraibi 1-5
    { name: "Jack Torrance", value: 1, aliases: [] }, // LoD Kill Count, Shining (film)
    { name: "Jaime Lannister", value: 37, aliases: ["Jaime", "Sterminatore di re"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Jason Voorhees", value: 24882, aliases: ["Jason"] }, // LoD Kill Count "Canon - Films" (film di Venerdì 13), fumetti e romanzi esclusi
    { name: "Jigsaw", value: 32, aliases: ["John Kramer", "Enigmista"] }, // LoD, totali dei film Saw (Kill Count 308 meno i videogiochi)
    { name: "Joffrey Baratheon", value: 42, aliases: ["Joffrey"] }, // LoD Kill Count, Il Trono di Spade
    { name: "John Wick", value: 455, aliases: ["Baba Yaga"] }, // LoD, totali dei film John Wick 1-4 + Ballerina (Kill Count 510 meno i fumetti)
    { name: "Joker", value: 59, aliases: ["Joker di Heath Ledger"] }, // LoD Kill Count, trilogia di Nolan
    { name: "Jon Snow", value: 219, aliases: ["Jon"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Jorah Mormont", value: 49, aliases: ["Jorah"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Katniss Everdeen", value: 70, aliases: ["Katniss"] }, // LoD Kill Count, film Hunger Games
    { name: "Khal Drogo", value: 2, aliases: ["Drogo"] }, // LoD Kill Count, Il Trono di Spade st. 1
    { name: "Kylo Ren", value: 81, aliases: ["Ben Solo"] }, // LoD Kill Count, film e serie di Star Wars
    { name: "La Montagna", value: 16, aliases: ["Gregor Clegane", "Montagna"] }, // LoD Kill Count, Il Trono di Spade
    { name: "La Sposa", value: 81, aliases: ["Beatrix Kiddo", "Black Mamba"] }, // LoD Kill Count, Kill Bill vol. 1-2
    { name: "Leatherface", value: 64, aliases: ["Faccia di cuoio"] }, // LoD Kill Count "By Film", Non aprite quella porta (fumetti esclusi)
    { name: "Legolas", value: 12002, aliases: [] }, // LoD Kill Count, Signore degli Anelli + Lo Hobbit
    { name: "Leia", value: 15, aliases: ["Principessa Leia", "Leia Organa"] }, // LoD Kill Count, film e serie di Star Wars
    { name: "Léon", value: 25, aliases: ["Léon Montana"] }, // LoD Kill Count, Léon (1994)
    { name: "Loki", value: 132, aliases: [] }, // LoD Kill Count, film Marvel
    { name: "Lord Voldemort", value: 72, aliases: ["Voldemort", "Tu-Sai-Chi", "Colui-Che-Non-Deve-Essere-Nominato"] }, // LoD Kill Count, film di Harry Potter
    { name: "Luke Skywalker", value: 1549324, aliases: ["Luke"] }, // LoD Kill Count, film di Star Wars + The Mandalorian (Morte Nera inclusa)
    { name: "Melisandre", value: 43, aliases: ["La donna rossa"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Michael Myers", value: 198, aliases: [] }, // LoD "Kill Count by Appearances" - Films (fumetti esclusi)
    { name: "Ned Stark", value: 8, aliases: ["Eddard Stark"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Neville Paciock", value: 52, aliases: ["Neville", "Neville Longbottom"] }, // LoD Kill Count, film di Harry Potter
    { name: "Norman Bates", value: 15, aliases: [] }, // LoD Kill Count, film Psycho 1-4
    { name: "O-Ren Ishii", value: 15, aliases: ["O-Ren"] }, // LoD Kill Count, Kill Bill
    { name: "Occhio di Falco", value: 220, aliases: ["Hawkeye", "Clint Barton"] }, // LoD Kill Count, film e serie Marvel
    { name: "Pamela Voorhees", value: 9, aliases: ["Mamma di Jason"] }, // LoD Kill Count, Venerdì 13 (1980)
    { name: "Patrick Bateman", value: 18, aliases: [] }, // LoD Kill Count, American Psycho (film)
    { name: "Patriota", value: 285, aliases: ["Homelander"] }, // LoD Kill Count, The Boys st. 1-5 + Diabolical + corto
    { name: "Paul Kersey", value: 180, aliases: ["Il giustiziere della notte"] }, // LoD Kill Count, film Il giustiziere della notte 1-5 + Death Kiss
    { name: "Pennywise", value: 439, aliases: ["It"] }, // LoD Kill Count, It (2017), It - Capitolo due, It: Welcome to Derry (compresa la sezione "Before the Films")
    { name: "Piton", value: 4, aliases: ["Severus Piton", "Snape", "Severus Snape"] }, // LoD Kill Count, film di Harry Potter
    { name: "Punisher", value: 308, aliases: ["Frank Castle", "The Punisher"] }, // LoD Kill Count, Daredevil, The Punisher, Daredevil: Born Again, One Last Kill (Jon Bernthal)
    { name: "Ragnar Lothbrok", value: 98, aliases: ["Ragnar"] }, // LoD Kill Count, Vikings
    { name: "Rambo", value: 417, aliases: ["John Rambo"] }, // LoD Kill Count, i 5 film di Rambo
    { name: "Ramsay Bolton", value: 40, aliases: ["Ramsay", "Ramsay Snow"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Re della Notte", value: 8, aliases: ["Night King"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Rhaegal", value: 318, aliases: [] }, // LoD Kill Count, Il Trono di Spade
    { name: "Robb Stark", value: 7, aliases: ["Robb"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Robert McCall", value: 64, aliases: ["The Equalizer", "McCall"] }, // LoD Kill Count, The Equalizer 1-3
    { name: "Rocket", value: 120, aliases: ["Rocket Raccoon"] }, // LoD Kill Count, film Marvel
    { name: "Ron Weasley", value: 2, aliases: ["Ron"] }, // LoD Kill Count, film di Harry Potter
    { name: "Sansa Stark", value: 2, aliases: ["Sansa"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Saul Goodman", value: 1, aliases: ["Jimmy McGill"] }, // LoD Kill Count, Better Call Saul
    { name: "Sauron", value: 11696, aliases: [] }, // LoD Kill Count, Signore degli Anelli + Lo Hobbit
    { name: "Scarlet Witch", value: 248, aliases: ["Wanda Maximoff", "Wanda"] }, // LoD Kill Count, film e serie Marvel
    { name: "Shrek", value: 26, aliases: [] }, // LoD Kill Count, film di Shrek + speciale TV di Halloween (Scared Shrekless)
    { name: "Silente", value: 1, aliases: ["Albus Silente", "Dumbledore"] }, // LoD Kill Count, film di Harry Potter
    { name: "Spider-Man", value: 116, aliases: ["Uomo Ragno", "Peter Parker"] }, // LoD Kill Count, film Marvel (Tom Holland)
    { name: "Star-Lord", value: 167, aliases: ["Peter Quill"] }, // LoD Kill Count, film Marvel
    { name: "Superman", value: 34, aliases: ["Clark Kent", "Kal-El"] }, // LoD Kill Count, film DC (Henry Cavill)
    { name: "Terminator", value: 27, aliases: ["T-800"] }, // LoD Kill Count, solo Terminator (1984)
    { name: "Theon Greyjoy", value: 29, aliases: ["Theon", "Reek"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Thor", value: 1188, aliases: [] }, // LoD Kill Count, film Marvel
    { name: "Tommy Shelby", value: 48, aliases: ["Thomas Shelby"] }, // LoD Kill Count, Peaky Blinders + The Immortal Man
    { name: "Tony Montana", value: 25, aliases: ["Scarface"] }, // LoD Kill Count, Scarface (1983)
    { name: "Tony Soprano", value: 22, aliases: [] }, // LoD Kill Count, I Soprano
    { name: "Tormund", value: 58, aliases: ["Tormund Veleno dei Giganti"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Tyrion Lannister", value: 5005, aliases: ["Tyrion", "Il Folletto"] }, // LoD Kill Count, Il Trono di Spade (st. 2: altofuoco alle Acque Nere)
    { name: "Undici", value: 112, aliases: ["Eleven", "Jane Hopper"] }, // LoD Kill Count, Stranger Things st. 1-5
    { name: "Vedova Nera", value: 111, aliases: ["Black Widow", "Natasha Romanoff"] }, // LoD, totali dei film Marvel (Kill Count 113 meno il fumetto)
    { name: "Verme Grigio", value: 49, aliases: ["Grey Worm"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Walter White", value: 29, aliases: ["Heisenberg"] }, // LoD Kill Count, Breaking Bad
    { name: "Wonder Woman", value: 58, aliases: ["Diana Prince"] }, // LoD Kill Count, film DC (Gal Gadot)
  ],
};
