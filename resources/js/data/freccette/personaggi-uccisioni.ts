import type { FrecceCategory } from "./types";

export const personaggiUccisioni: FrecceCategory = {
  id: "personaggi-uccisioni",
  title: "Quanti ne ha fatti fuori",
  unit: "vittime",
  rule: "Si toglie quante vittime la List of Deaths Wiki attribuisce al personaggio nei suoi film e nelle sue serie TV (fumetti, romanzi e videogiochi esclusi). Come fa la wiki, contano anche le uccisioni fuori campo, solo citate, condivise od ordinate da lui e le morti che provoca indirettamente, quindi anche quelle del suo drago o di un esercito che crolla con lui (John Wick vale 455, Daenerys più di 750 mila).",
  start: 730,
  max: 290,
  source: "List of Deaths Wiki (Fandom), totale della sezione \"Kill Count\" nella pagina di ogni personaggio — https://listofdeaths.fandom.com (es. https://listofdeaths.fandom.com/wiki/Jonathan_%22John%22_Wick). Quando la pagina comprende anche fumetti, romanzi, videogiochi o teatro si sommano solo i totali dei film e delle serie riportati nella pagina stessa (John Wick, Vedova Nera, Iron Man, Freddy Krueger, Michael Myers, Jigsaw, Daryl Dixon, Vecna, Indiana Jones, Rey, Cassian Andor, Riddler); per Ghostface, senza totale generale, si sommano i totali dei film. Dati al 20/11/2026",
  answers: [
    { name: "Abominio", value: 27, aliases: ["Abomination", "Emil Blonsky"] }, // LoD Kill Count, L'incredibile Hulk, Shang-Chi, She-Hulk
    { name: "Abraham Ford", value: 104, aliases: ["Abraham"] }, // LoD Kill Count, The Walking Dead (serie)
    { name: "Aegon II Targaryen", value: 25, aliases: ["Aegon"] }, // LoD Kill Count, House of the Dragon
    { name: "Aemond Targaryen", value: 64, aliases: ["Aemond"] }, // LoD Kill Count, House of the Dragon
    { name: "Agatha Harkness", value: 69, aliases: ["Agatha"] }, // LoD Kill Count, WandaVision + Agatha All Along
    { name: "Ahsoka Tano", value: 4002919, aliases: ["Ahsoka"] }, // LoD Kill Count, The Clone Wars (film e serie), Rebels, The Mandalorian, Tales of the Jedi
    { name: "Aldo Raine", value: 257, aliases: ["Aldo l'Apache", "L'Apache"] }, // LoD Kill Count, Bastardi senza gloria (uccisioni condivise dei Bastardi incluse)
    { name: "Alejandro Gillick", value: 26, aliases: ["Alejandro"] }, // LoD Kill Count, Sicario + Soldado
    { name: "Alpha", value: 109, aliases: ["Alpha dei Sussurratori"] }, // LoD Kill Count, The Walking Dead + Tales of the Walking Dead
    { name: "Amanda Waller", value: 31, aliases: ["Waller"] }, // LoD Kill Count, Suicide Squad, The Suicide Squad, Peacemaker, Black Adam, Creature Commandos
    { name: "Amanda Young", value: 10, aliases: [] }, // LoD Kill Count, film Saw
    { name: "Ant-Man", value: 79, aliases: ["Scott Lang"] }, // LoD Kill Count, film Marvel
    { name: "Anton Chigurh", value: 13, aliases: [] }, // LoD Kill Count, Non è un paese per vecchi
    { name: "Aquaman", value: 303, aliases: ["Arthur Curry"] }, // LoD Kill Count, film DC (Jason Momoa) + cameo in Peacemaker
    { name: "Aragorn", value: 11818, aliases: ["Grampasso"] }, // LoD Kill Count, trilogia del Signore degli Anelli
    { name: "Art il Clown", value: 50, aliases: ["Art the Clown"] }, // LoD Kill Count, All Hallows' Eve + Terrifier 1-3
    { name: "Arthur Fleck", value: 8, aliases: ["Joker di Joaquin Phoenix"] }, // LoD Kill Count, Joker (2019)
    { name: "Arthur Shelby", value: 18, aliases: [] }, // LoD Kill Count, Peaky Blinders + The Immortal Man
    { name: "Arwen", value: 9, aliases: [] }, // LoD Kill Count, trilogia del Signore degli Anelli
    { name: "Arya Stark", value: 213370, aliases: ["Arya"] }, // LoD Kill Count, Il Trono di Spade st. 1-8 (st. 8: Re della Notte e i suoi non morti)
    { name: "Ash Williams", value: 65, aliases: ["Ash"] }, // LoD Kill Count, La casa 1-2, L'armata delle tenebre, Ash vs Evil Dead
    { name: "Avvoltoio", value: 3, aliases: ["Vulture", "Adrian Toomes"] }, // LoD Kill Count, film Marvel (Michael Keaton)
    { name: "Azog", value: 12, aliases: ["Azog il Profanatore"] }, // LoD Kill Count, trilogia dello Hobbit
    { name: "Barristan Selmy", value: 11, aliases: ["Barristan"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Batman", value: 41, aliases: ["Bruce Wayne"] }, // LoD Kill Count, trilogia di Nolan
    { name: "Bella Swan", value: 20, aliases: ["Bella"] }, // LoD Kill Count, film di Twilight
    { name: "Bellatrix Lestrange", value: 4, aliases: ["Bellatrix"] }, // LoD Kill Count, film di Harry Potter
    { name: "Beta", value: 61, aliases: [] }, // LoD Kill Count, The Walking Dead (serie)
    { name: "Bilbo Baggins", value: 12, aliases: ["Bilbo", "Bilbo Beggins"] }, // LoD Kill Count, Lo Hobbit + Signore degli Anelli
    { name: "Bill", value: 8, aliases: ["Snake Charmer"] }, // LoD Kill Count, Kill Bill
    { name: "Billy Butcher", value: 36, aliases: ["Butcher"] }, // LoD Kill Count, The Boys + Gen V + corto Butcher
    { name: "Billy Loomis", value: 4, aliases: [] }, // LoD Kill Count, Scream (1996) + apparizioni in Scream (2022) e Scream VI
    { name: "Black Adam", value: 195, aliases: ["Teth-Adam"] }, // LoD Kill Count, Black Adam (2022)
    { name: "Black Panther", value: 53, aliases: ["Pantera Nera", "T'Challa"] }, // LoD Kill Count, film Marvel (Chadwick Boseman)
    { name: "Blade", value: 1422, aliases: [] }, // LoD Kill Count, Blade 1-3, corto Blood Thirsty, Deadpool & Wolverine (Wesley Snipes)
    { name: "Bloodsport", value: 17, aliases: ["Robert DuBois"] }, // LoD Kill Count, The Suicide Squad
    { name: "Blue", value: 14, aliases: ["Blue il velociraptor"] }, // LoD Kill Count, film Jurassic World + serie Camp Cretaceous
    { name: "Bo-Katan Kryze", value: 118, aliases: ["Bo-Katan"] }, // LoD Kill Count, The Clone Wars, Rebels, The Mandalorian
    { name: "Boromir", value: 17, aliases: [] }, // LoD Kill Count, trilogia del Signore degli Anelli
    { name: "Brienne di Tarth", value: 26, aliases: ["Brienne", "Brienne of Tarth"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Brightburn", value: 287, aliases: ["Brandon Breyer"] }, // LoD Kill Count, Brightburn - L'angelo del male (2019)
    { name: "Bucky Barnes", value: 90, aliases: ["Soldato d'Inverno", "Winter Soldier", "Bucky"] }, // LoD Kill Count, film e serie Marvel
    { name: "Budd", value: 8, aliases: ["Sidewinder"] }, // LoD Kill Count, Kill Bill
    { name: "Candyman", value: 62, aliases: ["Daniel Robitaille"] }, // LoD Kill Count, film Candyman 1-3 + Candyman (2021)
    { name: "Capitan America", value: 214, aliases: ["Captain America", "Steve Rogers"] }, // LoD Kill Count, film Marvel
    { name: "Capitan Marvel", value: 98, aliases: ["Captain Marvel", "Carol Danvers"] }, // LoD Kill Count, film Marvel
    { name: "Capitan Uncino", value: 2, aliases: ["Captain Hook", "Uncino"] }, // LoD Kill Count, Hook - Capitan Uncino (1991, Dustin Hoffman)
    { name: "Caraxes", value: 12, aliases: [] }, // LoD Kill Count, House of the Dragon
    { name: "Carl Grimes", value: 124, aliases: ["Carl"] }, // LoD Kill Count, The Walking Dead (serie)
    { name: "Cassian Andor", value: 64, aliases: ["Cassian", "Andor"] }, // LoD, totali di Andor 45 + Rogue One 19 (Kill Count 65 meno il fumetto)
    { name: "Catelyn Stark", value: 1, aliases: ["Catelyn"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Cersei Lannister", value: 187, aliases: ["Cersei"] }, // LoD Kill Count, Il Trono di Spade (st. 6: tempio di Baelor)
    { name: "Chewbacca", value: 46, aliases: ["Chewie"] }, // LoD Kill Count, film e serie di Star Wars
    { name: "Chucky", value: 159, aliases: ["Charles Lee Ray"] }, // LoD Kill Count, film La bambola assassina + serie Chucky
    { name: "Ciri", value: 24, aliases: ["Cirilla"] }, // LoD Kill Count, serie The Witcher st. 1-4 + The Rats: A Witcher Tale
    { name: "Clay Morrow", value: 33, aliases: [] }, // LoD Kill Count, Sons of Anarchy
    { name: "Cliff Booth", value: 4, aliases: [] }, // LoD Kill Count, C'era una volta a... Hollywood
    { name: "Conte Dracula", value: 15, aliases: ["Dracula"] }, // LoD Kill Count, Dracula di Bela Lugosi (Dracula 1931 + Il cervello di Frankenstein)
    { name: "Cyborg", value: 10, aliases: ["Victor Stone"] }, // LoD Kill Count, Justice League + Zack Snyder's Justice League
    { name: "Daario Naharis", value: 25, aliases: ["Daario"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Daemon Targaryen", value: 54, aliases: ["Daemon"] }, // LoD Kill Count, House of the Dragon
    { name: "Daenerys Targaryen", value: 753052, aliases: ["Daenerys", "Khaleesi", "Madre dei draghi"] }, // LoD Kill Count, Il Trono di Spade, vittime dei draghi incluse
    { name: "Damon Salvatore", value: 228, aliases: ["Damon"] }, // LoD Kill Count, The Vampire Diaries
    { name: "Daredevil", value: 33, aliases: ["Matt Murdock"] }, // LoD Kill Count, serie Marvel (Daredevil, The Defenders, Born Again)
    { name: "Darkseid", value: 780244125700007, aliases: [] }, // LoD Kill Count, Zack Snyder's Justice League
    { name: "Daryl Dixon", value: 1671, aliases: ["Daryl"] }, // LoD, totali delle serie The Walking Dead + Daryl Dixon (Kill Count 3.379 meno i videogiochi Survival Instinct 631 e Onslaught 1.077)
    { name: "Davy Jones", value: 98, aliases: [] }, // LoD Kill Count, Pirati dei Caraibi 2-3
    { name: "Deadpool", value: 204, aliases: ["Wade Wilson"] }, // LoD Kill Count, Deadpool 1-2, Deadpool & Wolverine, corto No Good Deed
    { name: "Demogorgone", value: 13, aliases: ["Demogorgon"] }, // LoD Kill Count, Stranger Things (il Demogorgone della st. 1)
    { name: "Dexter", value: 193, aliases: ["Dexter Morgan"] }, // LoD Kill Count, Dexter + Early Cuts, New Blood, Original Sin, Resurrection
    { name: "Ditocorto", value: 5, aliases: ["Petyr Baelish", "Littlefinger"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Django", value: 42, aliases: ["Django Freeman"] }, // LoD Kill Count, Django Unchained (+ cameo in Un milione di modi per morire nel West)
    { name: "Doctor Octopus", value: 11, aliases: ["Dottor Octopus", "Doc Ock", "Otto Octavius"] }, // LoD Kill Count, Spider-Man 2 (Alfred Molina)
    { name: "Doctor Strange", value: 15, aliases: ["Dottor Strange", "Stephen Strange"] }, // LoD Kill Count, film Marvel
    { name: "Dominic Toretto", value: 143, aliases: ["Dom Toretto", "Toretto"] }, // LoD Kill Count, film di Fast & Furious + corti
    { name: "Dormammu", value: 13, aliases: [] }, // LoD Kill Count, Doctor Strange (2016)
    { name: "Draco Malfoy", value: 1, aliases: ["Draco"] }, // LoD Kill Count, film di Harry Potter
    { name: "Drax", value: 28, aliases: ["Drax il Distruttore"] }, // LoD Kill Count, film Marvel + I Am Groot
    { name: "Drogon", value: 752921, aliases: [] }, // LoD Kill Count, Il Trono di Spade
    { name: "Dutch", value: 44, aliases: ["Dutch Schaefer", "Alan Schaefer"] }, // LoD Kill Count, Predator (1987)
    { name: "Edward Cullen", value: 21, aliases: ["Edward"] }, // LoD Kill Count, film di Twilight
    { name: "Ego", value: 107, aliases: [] }, // LoD Kill Count, Guardiani della Galassia 1-2
    { name: "Electro", value: 26, aliases: ["Max Dillon"] }, // LoD Kill Count, The Amazing Spider-Man 2 (Jamie Foxx)
    { name: "Elle Driver", value: 10, aliases: ["California Mountain Snake"] }, // LoD Kill Count, Kill Bill
    { name: "Ellie Williams", value: 9, aliases: ["Ellie"] }, // LoD Kill Count, serie The Last of Us (HBO)
    { name: "Eren Jaeger", value: 1600000240, aliases: ["Eren", "Eren Yeager"] }, // LoD Kill Count, anime L'attacco dei giganti
    { name: "Euron Greyjoy", value: 10, aliases: ["Euron"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Falcon", value: 44, aliases: ["Sam Wilson"] }, // LoD Kill Count, film e serie Marvel
    { name: "Flash", value: 10, aliases: ["The Flash", "Barry Allen"] }, // LoD Kill Count, film DC (Ezra Miller) + crossover Arrow e Peacemaker
    { name: "Frank Martin", value: 31, aliases: ["The Transporter"] }, // LoD Kill Count, The Transporter 1-3
    { name: "Freddy Krueger", value: 80, aliases: ["Freddy"] }, // LoD Kill Count "Original Timeline" (film), fumetti esclusi
    { name: "Frenchie", value: 31, aliases: [] }, // LoD Kill Count, The Boys
    { name: "Frodo", value: 1, aliases: ["Frodo Baggins", "Frodo Beggins"] }, // LoD Kill Count, trilogia del Signore degli Anelli
    { name: "Frollo", value: 2, aliases: ["Giudice Claude Frollo", "Claude Frollo"] }, // LoD Kill Count, Il gobbo di Notre Dame (1996)
    { name: "Front Man", value: 2297, aliases: ["Hwang In-ho"] }, // LoD Kill Count, Squid Game st. 1-3 (compresa la sezione "Before the Series")
    { name: "Galadriel", value: 1, aliases: [] }, // LoD Kill Count, Signore degli Anelli + Lo Hobbit
    { name: "Gamora", value: 5, aliases: [] }, // LoD Kill Count, film Marvel
    { name: "Gandalf", value: 10254, aliases: ["Gandalf il Bianco", "Gandalf il Grigio"] }, // LoD Kill Count, trilogie del Signore degli Anelli e dello Hobbit
    { name: "Generale Kai", value: 26, aliases: ["Kai"] }, // LoD Kill Count, Kung Fu Panda 3-4
    { name: "Generale Zod", value: 5020, aliases: ["Zod", "General Zod"] }, // LoD Kill Count, film DC (L'uomo d'acciaio, Batman v Superman, The Flash)
    { name: "Geralt di Rivia", value: 171, aliases: ["Geralt", "The Witcher", "Lo Strigo"] }, // LoD Kill Count, serie The Witcher st. 1-4 + film animati
    { name: "Ghostface", value: 72, aliases: ["Scream"] }, // LoD, somma dei totali dei film Scream 1-7 (tutti gli assassini mascherati)
    { name: "Gimli", value: 11757, aliases: [] }, // LoD Kill Count, trilogia del Signore degli Anelli
    { name: "Glenn Rhee", value: 271, aliases: ["Glenn"] }, // LoD Kill Count, The Walking Dead (serie)
    { name: "Godzilla", value: 6152, aliases: [] }, // LoD Kill Count, Godzilla del MonsterVerse (film + serie Monarch)
    { name: "Gojo Satoru", value: 1010, aliases: ["Gojo", "Satoru Gojo"] }, // LoD Kill Count, anime Jujutsu Kaisen
    { name: "Gollum", value: 5028, aliases: ["Sméagol"] }, // LoD Kill Count, Signore degli Anelli + Lo Hobbit
    { name: "Green Goblin", value: 22, aliases: ["Goblin", "Norman Osborn"] }, // LoD Kill Count, Spider-Man di Sam Raimi (Willem Dafoe)
    { name: "Grogu", value: 9, aliases: ["Baby Yoda"] }, // LoD Kill Count, The Mandalorian + The Book of Boba Fett
    { name: "Groot", value: 155, aliases: [] }, // LoD Kill Count, film Marvel + I Am Groot (Groot figlio)
    { name: "Gus Fring", value: 60, aliases: ["Gustavo Fring"] }, // LoD Kill Count, Breaking Bad + Better Call Saul
    { name: "HAL 9000", value: 4, aliases: ["HAL"] }, // LoD Kill Count, 2001: Odissea nello spazio + 2010
    { name: "Han Solo", value: 58, aliases: [] }, // LoD Kill Count, film di Star Wars
    { name: "Hank Schrader", value: 2, aliases: ["Hank"] }, // LoD Kill Count, Breaking Bad + Better Call Saul
    { name: "Hannibal Lecter", value: 41, aliases: ["Hannibal", "Hannibal the Cannibal"] }, // LoD Kill Count, film (Hannibal Lecter - Le origini del male, Red Dragon, Il silenzio degli innocenti, Hannibal)
    { name: "Hans Landa", value: 5, aliases: ["Colonnello Landa"] }, // LoD Kill Count, Bastardi senza gloria
    { name: "Harley Quinn", value: 85, aliases: ["Harleen Quinzel"] }, // LoD Kill Count, Suicide Squad, Birds of Prey, The Suicide Squad
    { name: "Harry Potter", value: 17, aliases: [] }, // LoD Kill Count, film di Harry Potter
    { name: "Hector Barbossa", value: 57, aliases: ["Barbossa", "Capitan Barbossa"] }, // LoD Kill Count, I pirati dei Caraibi 1-5
    { name: "Hela", value: 371, aliases: [] }, // LoD Kill Count, Thor: Ragnarok
    { name: "Hermione Granger", value: 1, aliases: ["Hermione"] }, // LoD Kill Count, film di Harry Potter
    { name: "Hodor", value: 3, aliases: [] }, // LoD Kill Count, Il Trono di Spade
    { name: "Hughie Campbell", value: 9, aliases: ["Hughie"] }, // LoD Kill Count, The Boys
    { name: "Hulk", value: 147, aliases: ["Bruce Banner"] }, // LoD Kill Count, film e serie Marvel
    { name: "Il Governatore", value: 228, aliases: ["Governatore", "The Governor", "Philip Blake"] }, // LoD Kill Count, The Walking Dead (serie)
    { name: "Il Mandaloriano", value: 351, aliases: ["Mandaloriano", "The Mandalorian", "Din Djarin", "Mando"] }, // LoD Kill Count, The Mandalorian st. 1-2 + The Book of Boba Fett
    { name: "Il Mastino", value: 58, aliases: ["Sandor Clegane", "Mastino"] }, // LoD Kill Count, Il Trono di Spade (+ 1 da Histories & Lore)
    { name: "Il Pinguino", value: 36, aliases: ["Pinguino", "The Penguin", "Oswald Cobb", "Oz Cobb"] }, // LoD Kill Count, The Batman (2022) + serie The Penguin
    { name: "Indiana Jones", value: 48, aliases: ["Indy", "Henry Jones Jr."] }, // LoD, totali dei film I predatori dell'arca perduta 9, Il tempio maledetto 9, L'ultima crociata 22, Il regno del teschio di cristallo 8 (Kill Count 57, che comprende il fumetto Fate of Atlantis)
    { name: "Indominus Rex", value: 40, aliases: ["Indominus"] }, // LoD Kill Count, Jurassic World + serie Camp Cretaceous
    { name: "Invincible", value: 101, aliases: ["Mark Grayson"] }, // LoD Kill Count, serie animata Invincible
    { name: "Iron Man", value: 75523, aliases: ["Tony Stark"] }, // LoD, totali dei film Marvel (Kill Count 75.562 meno i fumetti)
    { name: "Ispettore Callaghan", value: 45, aliases: ["Callaghan", "Harry Callaghan", "Dirty Harry"] }, // LoD Kill Count, i 5 film di Dirty Harry
    { name: "Jack Horner", value: 67, aliases: ["Big Jack Horner"] }, // LoD Kill Count, Il gatto con gli stivali 2 - L'ultimo desiderio
    { name: "Jack Sparrow", value: 35, aliases: ["Capitan Jack Sparrow"] }, // LoD Kill Count, I pirati dei Caraibi 1-5
    { name: "Jack Torrance", value: 1, aliases: [] }, // LoD Kill Count, Shining (film)
    { name: "Jaime Lannister", value: 37, aliases: ["Jaime", "Sterminatore di re"] }, // LoD Kill Count, Il Trono di Spade
    { name: "James Bond", value: 530, aliases: ["007", "Bond"] }, // LoD Kill Count, tutti i film di 007 (tutti gli attori, Casino Royale 1967 incluso)
    { name: "Jason Voorhees", value: 24882, aliases: ["Jason"] }, // LoD Kill Count "Canon - Films" (film di Venerdì 13), fumetti e romanzi esclusi
    { name: "Jesse Pinkman", value: 6, aliases: ["Jesse"] }, // LoD Kill Count, Breaking Bad, Better Call Saul, El Camino
    { name: "Jigsaw", value: 32, aliases: ["John Kramer", "Enigmista"] }, // LoD, totali dei film Saw (Kill Count 308 meno i videogiochi)
    { name: "Jim Hopper", value: 37, aliases: ["Hopper"] }, // LoD Kill Count, Stranger Things st. 1-5
    { name: "Joe Goldberg", value: 24, aliases: ["Joe"] }, // LoD Kill Count, serie You st. 1-5
    { name: "Joel Miller", value: 50, aliases: ["Joel"] }, // LoD Kill Count, serie The Last of Us (HBO)
    { name: "Joffrey Baratheon", value: 42, aliases: ["Joffrey"] }, // LoD Kill Count, Il Trono di Spade
    { name: "John Wick", value: 455, aliases: ["Baba Yaga"] }, // LoD, totali dei film John Wick 1-4 + Ballerina (Kill Count 510 meno i fumetti)
    { name: "Joker", value: 59, aliases: ["Joker di Heath Ledger"] }, // LoD Kill Count, trilogia di Nolan
    { name: "Joker di Jack Nicholson", value: 57, aliases: ["Jack Napier"] }, // LoD Kill Count, Batman (1989)
    { name: "Jon Snow", value: 219, aliases: ["Jon"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Jorah Mormont", value: 49, aliases: ["Jorah"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Jules Winnfield", value: 3, aliases: ["Jules"] }, // LoD Kill Count, Pulp Fiction
    { name: "Katniss Everdeen", value: 70, aliases: ["Katniss"] }, // LoD Kill Count, film Hunger Games
    { name: "Kenny McCormick", value: 13, aliases: ["Kenny"] }, // LoD Kill Count, South Park
    { name: "Khal Drogo", value: 2, aliases: ["Drogo"] }, // LoD Kill Count, Il Trono di Spade st. 1
    { name: "Kilgrave", value: 11, aliases: [] }, // LoD Kill Count, Jessica Jones
    { name: "Killmonger", value: 2207, aliases: ["Erik Killmonger"] }, // LoD Kill Count, Black Panther 1-2 (comprese le uccisioni 1992-2017 prima del film)
    { name: "Kimiko", value: 29, aliases: ["Kimiko Miyashiro"] }, // LoD Kill Count, The Boys
    { name: "King Kong", value: 82, aliases: ["Kong"] }, // LoD Kill Count, Kong del MonsterVerse (film + serie Skull Island e Monarch)
    { name: "Kylo Ren", value: 81, aliases: ["Ben Solo"] }, // LoD Kill Count, film e serie di Star Wars
    { name: "La Montagna", value: 16, aliases: ["Gregor Clegane", "Montagna"] }, // LoD Kill Count, Il Trono di Spade
    { name: "La Sposa", value: 81, aliases: ["Beatrix Kiddo", "Black Mamba"] }, // LoD Kill Count, Kill Bill vol. 1-2
    { name: "Lagertha", value: 82, aliases: ["Lagertha Lothbrok"] }, // LoD Kill Count, Vikings
    { name: "Lalo Salamanca", value: 23, aliases: ["Lalo"] }, // LoD Kill Count, Better Call Saul
    { name: "Leatherface", value: 64, aliases: ["Faccia di cuoio"] }, // LoD Kill Count "By Film", Non aprite quella porta (fumetti esclusi)
    { name: "Legolas", value: 12002, aliases: [] }, // LoD Kill Count, Signore degli Anelli + Lo Hobbit
    { name: "Leia", value: 15, aliases: ["Principessa Leia", "Leia Organa"] }, // LoD Kill Count, film e serie di Star Wars
    { name: "Léon", value: 25, aliases: ["Léon Montana"] }, // LoD Kill Count, Léon (1994)
    { name: "Levi Ackerman", value: 71, aliases: ["Levi", "Capitano Levi"] }, // LoD Kill Count, anime L'attacco dei giganti
    { name: "Lex Luthor", value: 18, aliases: [] }, // LoD Kill Count, Superman (2025) + Peacemaker (Nicholas Hoult)
    { name: "Light Yagami", value: 135424, aliases: ["Kira", "Light"] }, // LoD Kill Count, anime Death Note
    { name: "Lo squalo", value: 6, aliases: ["Squalo", "Jaws", "Bruce"] }, // LoD Kill Count, Lo squalo (1975)
    { name: "Loki", value: 132, aliases: [] }, // LoD Kill Count, film Marvel
    { name: "Lord Shen", value: 50, aliases: ["Shen"] }, // LoD Kill Count, Kung Fu Panda 2 + Kung Fu Panda 4
    { name: "Lord Voldemort", value: 72, aliases: ["Voldemort", "Tu-Sai-Chi", "Colui-Che-Non-Deve-Essere-Nominato"] }, // LoD Kill Count, film di Harry Potter
    { name: "Lorne Malvo", value: 36, aliases: ["Malvo"] }, // LoD Kill Count, Fargo st. 1
    { name: "Luke Skywalker", value: 1549324, aliases: ["Luke"] }, // LoD Kill Count, film di Star Wars + The Mandalorian (Morte Nera inclusa)
    { name: "M3GAN", value: 7, aliases: ["Megan"] }, // LoD Kill Count, M3GAN + M3GAN 2.0
    { name: "Maggie Rhee", value: 1275, aliases: ["Maggie", "Maggie Greene"] }, // LoD Kill Count, The Walking Dead + Dead City
    { name: "Magneto", value: 83, aliases: ["Erik Lehnsherr"] }, // LoD Kill Count, film X-Men della Fox (Ian McKellen e Michael Fassbender)
    { name: "Malekith", value: 108, aliases: [] }, // LoD, totale di Thor: The Dark World (Kill Count 108, il fumetto prequel non aggiunge vittime)
    { name: "Mandarino", value: 124, aliases: ["Mandarin", "Wenwu", "Xu Wenwu"] }, // LoD Kill Count, Shang-Chi e la leggenda dei Dieci Anelli
    { name: "Mantis", value: 85, aliases: [] }, // LoD Kill Count, film Marvel
    { name: "Mark Hoffman", value: 48, aliases: ["Hoffman"] }, // LoD Kill Count, film Saw
    { name: "Marquis Warren", value: 56, aliases: ["Maggiore Marquis Warren"] }, // LoD Kill Count, The Hateful Eight
    { name: "Megatron", value: 40, aliases: [] }, // LoD Kill Count, film Transformers live action
    { name: "Melisandre", value: 43, aliases: ["La donna rossa"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Mercoledì Addams", value: 1, aliases: ["Mercoledì", "Wednesday", "Wednesday Addams"] }, // LoD Kill Count, serie Mercoledì st. 1-2
    { name: "Michael Myers", value: 198, aliases: [] }, // LoD "Kill Count by Appearances" - Films (fumetti esclusi)
    { name: "Miles Quaritch", value: 55, aliases: ["Quaritch", "Colonnello Quaritch"] }, // LoD Kill Count, film di Avatar
    { name: "Moff Gideon", value: 30, aliases: ["Gideon"] }, // LoD Kill Count, The Mandalorian + The Book of Boba Fett
    { name: "Moon Knight", value: 74, aliases: [] }, // LoD Kill Count, serie Moon Knight
    { name: "Mostro di Frankenstein", value: 35, aliases: ["Frankenstein", "La creatura di Frankenstein"] }, // LoD Kill Count, film Universal classici (1931-1948)
    { name: "Mr. Blonde", value: 6, aliases: ["Mister Blonde", "Victor Vega"] }, // LoD Kill Count, Le iene
    { name: "Mysterio", value: 40, aliases: ["Quentin Beck"] }, // LoD Kill Count, Spider-Man: Far From Home
    { name: "Nebula", value: 116, aliases: [] }, // LoD Kill Count, film Marvel
    { name: "Ned Stark", value: 8, aliases: ["Eddard Stark"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Negan", value: 370, aliases: ["Negan Smith"] }, // LoD Kill Count, The Walking Dead, Dead City, Fear, The Ones Who Live + webserie 360 Experience
    { name: "Neville Paciock", value: 52, aliases: ["Neville", "Neville Longbottom"] }, // LoD Kill Count, film di Harry Potter
    { name: "Nick Fury", value: 24, aliases: ["Fury"] }, // LoD Kill Count, film e serie Marvel
    { name: "Norman Bates", value: 15, aliases: [] }, // LoD Kill Count, film Psycho 1-4
    { name: "Norman Stansfield", value: 4, aliases: ["Stansfield"] }, // LoD Kill Count, Léon (1994)
    { name: "O-Ren Ishii", value: 15, aliases: ["O-Ren"] }, // LoD Kill Count, Kill Bill
    { name: "Oberyn Martell", value: 1, aliases: ["Oberyn", "Vipera Rossa"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Occhio di Falco", value: 220, aliases: ["Hawkeye", "Clint Barton"] }, // LoD Kill Count, film e serie Marvel
    { name: "Oh Il-nam", value: 14561, aliases: ["Il-nam", "Giocatore 001"] }, // LoD Kill Count, Squid Game (compresa la sezione "Before The Show")
    { name: "Omni-Man", value: 7800077096, aliases: ["Nolan Grayson"] }, // LoD Kill Count, serie animata Invincible
    { name: "Optimus Prime", value: 88, aliases: ["Optimus"] }, // LoD Kill Count, film Transformers live action + Bumblebee
    { name: "Pamela Voorhees", value: 9, aliases: ["Mamma di Jason"] }, // LoD Kill Count, Venerdì 13 (1980)
    { name: "Patrick Bateman", value: 18, aliases: [] }, // LoD Kill Count, American Psycho (film)
    { name: "Patriota", value: 285, aliases: ["Homelander"] }, // LoD Kill Count, The Boys st. 1-5 + Diabolical + corto
    { name: "Paul Kersey", value: 180, aliases: ["Il giustiziere della notte"] }, // LoD Kill Count, film Il giustiziere della notte 1-5 + Death Kiss
    { name: "Peacemaker", value: 135, aliases: ["Christopher Smith"] }, // LoD Kill Count, The Suicide Squad + serie Peacemaker
    { name: "Pearl", value: 10, aliases: [] }, // LoD Kill Count, Pearl + X (2022)
    { name: "Peeta Mellark", value: 11, aliases: ["Peeta"] }, // LoD Kill Count, film Hunger Games
    { name: "Pennywise", value: 439, aliases: ["It"] }, // LoD Kill Count, It (2017), It - Capitolo due, It: Welcome to Derry (compresa la sezione "Before the Films")
    { name: "Pinhead", value: 8, aliases: [] }, // LoD Kill Count, Hellraiser (2022)
    { name: "Piton", value: 4, aliases: ["Severus Piton", "Snape", "Severus Snape"] }, // LoD Kill Count, film di Harry Potter
    { name: "Poe Dameron", value: 40, aliases: ["Poe"] }, // LoD Kill Count, trilogia sequel di Star Wars
    { name: "Predator", value: 10, aliases: ["The Predator", "Il Predatore"] }, // LoD Kill Count, il Predator del film Predator (1987)
    { name: "Presidente Snow", value: 9283, aliases: ["Coriolanus Snow", "Snow"] }, // LoD Kill Count, film Hunger Games (La ballata dell'usignolo e del serpente compresa)
    { name: "Punisher", value: 308, aliases: ["Frank Castle", "The Punisher"] }, // LoD Kill Count, Daredevil, The Punisher, Daredevil: Born Again, One Last Kill (Jon Bernthal)
    { name: "Queen Maeve", value: 8, aliases: ["Maeve"] }, // LoD Kill Count, The Boys
    { name: "Qui-Gon Jinn", value: 31, aliases: ["Qui-Gon"] }, // LoD Kill Count, La minaccia fantasma, Obi-Wan Kenobi, Tales of the Jedi
    { name: "Ragnar Lothbrok", value: 98, aliases: ["Ragnar"] }, // LoD Kill Count, Vikings
    { name: "Rambo", value: 417, aliases: ["John Rambo"] }, // LoD Kill Count, i 5 film di Rambo
    { name: "Ramsay Bolton", value: 40, aliases: ["Ramsay", "Ramsay Snow"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Re della Notte", value: 8, aliases: ["Night King"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Re Stregone di Angmar", value: 3, aliases: ["Re Stregone", "Witch-king"] }, // LoD Kill Count, Signore degli Anelli + Lo Hobbit
    { name: "Rexy", value: 12, aliases: ["T-Rex", "Tirannosauro"] }, // LoD Kill Count, il T-Rex dei film Jurassic Park/World + serie animate
    { name: "Rey", value: 50056, aliases: ["Rey Skywalker"] }, // LoD, totali dei film Il risveglio della Forza 5, Gli ultimi Jedi 13, L'ascesa di Skywalker 50.038 (Kill Count 50.064 con fumetti e romanzi)
    { name: "Rhaegal", value: 318, aliases: [] }, // LoD Kill Count, Il Trono di Spade
    { name: "Rhaenyra Targaryen", value: 27, aliases: ["Rhaenyra"] }, // LoD Kill Count, House of the Dragon
    { name: "Rick Flag", value: 26, aliases: [] }, // LoD Kill Count, Suicide Squad + The Suicide Squad (Joel Kinnaman)
    { name: "Rick Sanchez", value: 14753249068, aliases: ["Rick"] }, // LoD Kill Count, Rick and Morty st. 1-7 (Rick C-137)
    { name: "Riddler", value: 99, aliases: ["Edward Nashton"] }, // LoD, totali di The Batman 26 + The Penguin 73 (Kill Count 103 meno il fumetto Year One)
    { name: "Robb Stark", value: 7, aliases: ["Robb"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Robert Baratheon", value: 4, aliases: ["Re Robert"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Robert McCall", value: 64, aliases: ["The Equalizer", "McCall"] }, // LoD Kill Count, The Equalizer 1-3
    { name: "RoboCop", value: 87, aliases: ["Alex Murphy"] }, // LoD Kill Count, film RoboCop + serie TV e animate
    { name: "Rocket", value: 120, aliases: ["Rocket Raccoon"] }, // LoD Kill Count, film Marvel
    { name: "Ron Weasley", value: 2, aliases: ["Ron"] }, // LoD Kill Count, film di Harry Potter
    { name: "Ronan", value: 80072, aliases: ["Ronan l'Accusatore"] }, // LoD Kill Count, Captain Marvel + Guardiani della Galassia (il fumetto prequel non aggiunge vittime)
    { name: "Samvise Gamgee", value: 9, aliases: ["Sam", "Samwise Gamgee"] }, // LoD Kill Count, trilogia del Signore degli Anelli
    { name: "Sandman", value: 5, aliases: ["Uomo Sabbia", "Flint Marko"] }, // LoD Kill Count, Spider-Man 3 (Thomas Haden Church)
    { name: "Sansa Stark", value: 2, aliases: ["Sansa"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Saruman", value: 5, aliases: ["Saruman il Bianco"] }, // LoD Kill Count, Signore degli Anelli + Lo Hobbit
    { name: "Sasha Williams", value: 195, aliases: ["Sasha"] }, // LoD Kill Count, The Walking Dead (serie)
    { name: "Saul Goodman", value: 1, aliases: ["Jimmy McGill"] }, // LoD Kill Count, Better Call Saul
    { name: "Sauron", value: 11696, aliases: [] }, // LoD Kill Count, Signore degli Anelli + Lo Hobbit
    { name: "Scar", value: 9, aliases: [] }, // LoD Kill Count, Il re leone (1994), compresa la sezione "Before The Films"
    { name: "Scarlet Witch", value: 248, aliases: ["Wanda Maximoff", "Wanda"] }, // LoD Kill Count, film e serie Marvel
    { name: "Seong Gi-hun", value: 54, aliases: ["Gi-hun", "Giocatore 456"] }, // LoD Kill Count, Squid Game st. 1-3
    { name: "Shan Yu", value: 34, aliases: [] }, // LoD Kill Count, Mulan (1998)
    { name: "Shang-Chi", value: 90, aliases: [] }, // LoD Kill Count, Shang-Chi e la leggenda dei Dieci Anelli
    { name: "Shosanna Dreyfus", value: 236, aliases: ["Shosanna"] }, // LoD Kill Count, Bastardi senza gloria (incendio del cinema)
    { name: "Shrek", value: 26, aliases: [] }, // LoD Kill Count, film di Shrek + speciale TV di Halloween (Scared Shrekless)
    { name: "Silente", value: 1, aliases: ["Albus Silente", "Dumbledore"] }, // LoD Kill Count, film di Harry Potter
    { name: "Simon", value: 169, aliases: [] }, // LoD Kill Count, The Walking Dead + Dead City (il braccio destro di Negan)
    { name: "Smaug", value: 116, aliases: [] }, // LoD Kill Count, trilogia dello Hobbit
    { name: "Soldier Boy", value: 75, aliases: [] }, // LoD Kill Count, The Boys, Gen V, Vought Rising
    { name: "Spider-Man", value: 116, aliases: ["Uomo Ragno", "Peter Parker"] }, // LoD Kill Count, film Marvel (Tom Holland)
    { name: "Stannis Baratheon", value: 14, aliases: ["Stannis"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Star-Lord", value: 167, aliases: ["Peter Quill"] }, // LoD Kill Count, film Marvel
    { name: "Starlight", value: 8, aliases: ["Annie January"] }, // LoD Kill Count, The Boys
    { name: "Stefan Salvatore", value: 202, aliases: ["Stefan"] }, // LoD Kill Count, The Vampire Diaries
    { name: "Steppenwolf", value: 7874965878, aliases: [] }, // LoD Kill Count, Justice League + Zack Snyder's Justice League
    { name: "Steve Harrington", value: 3, aliases: ["Steve"] }, // LoD Kill Count, Stranger Things
    { name: "Stewie Griffin", value: 36, aliases: ["Stewie"] }, // LoD Kill Count, I Griffin
    { name: "Stu Macher", value: 4, aliases: [] }, // LoD Kill Count, Scream (1996) + Scream 7
    { name: "Stuntman Mike", value: 5, aliases: [] }, // LoD Kill Count, A prova di morte
    { name: "Superman", value: 34, aliases: ["Clark Kent", "Kal-El"] }, // LoD Kill Count, film DC (Henry Cavill)
    { name: "Surtur", value: 9720, aliases: [] }, // LoD Kill Count, Thor: Ragnarok
    { name: "Sweeney Todd", value: 10, aliases: [] }, // LoD Kill Count, Sweeney Todd - Il diabolico barbiere di Fleet Street (2007)
    { name: "Sylvie", value: 413, aliases: [] }, // LoD Kill Count, serie Loki
    { name: "Syndrome", value: 21, aliases: ["Buddy Pine"] }, // LoD Kill Count, Gli Incredibili
    { name: "T-1000", value: 8, aliases: [] }, // LoD Kill Count, Terminator 2 - Il giorno del giudizio
    { name: "T-Bag", value: 19, aliases: ["Theodore Bagwell"] }, // LoD Kill Count, Prison Break
    { name: "Tai Lung", value: 61, aliases: [] }, // LoD Kill Count, Kung Fu Panda + Kung Fu Panda 4
    { name: "Tanjiro Kamado", value: 29, aliases: ["Tanjiro"] }, // LoD Kill Count, anime Demon Slayer
    { name: "Tara Chambler", value: 86, aliases: ["Tara"] }, // LoD Kill Count, The Walking Dead (serie)
    { name: "Tauriel", value: 42, aliases: [] }, // LoD Kill Count, Lo Hobbit 2-3
    { name: "Terminator", value: 27, aliases: ["T-800"] }, // LoD Kill Count, solo Terminator (1984)
    { name: "Teschio Rosso", value: 12, aliases: ["Red Skull", "Johann Schmidt"] }, // LoD Kill Count, film Marvel
    { name: "Theon Greyjoy", value: 29, aliases: ["Theon", "Reek"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Thor", value: 1188, aliases: [] }, // LoD Kill Count, film Marvel
    { name: "Thorin Scudodiquercia", value: 10678, aliases: ["Thorin", "Thorin Oakenshield"] }, // LoD Kill Count, trilogia dello Hobbit
    { name: "Tommy Shelby", value: 48, aliases: ["Thomas Shelby"] }, // LoD Kill Count, Peaky Blinders + The Immortal Man
    { name: "Tony Montana", value: 25, aliases: ["Scarface"] }, // LoD Kill Count, Scarface (1983)
    { name: "Tony Soprano", value: 22, aliases: [] }, // LoD Kill Count, I Soprano
    { name: "Tormund", value: 58, aliases: ["Tormund Veleno dei Giganti"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Travis Bickle", value: 4, aliases: [] }, // LoD Kill Count, Taxi Driver
    { name: "Tuco Salamanca", value: 4, aliases: ["Tuco"] }, // LoD Kill Count, Breaking Bad + Better Call Saul
    { name: "Tyreese Williams", value: 77, aliases: ["Tyreese"] }, // LoD Kill Count, The Walking Dead (serie)
    { name: "Tyrion Lannister", value: 5005, aliases: ["Tyrion", "Il Folletto"] }, // LoD Kill Count, Il Trono di Spade (st. 2: altofuoco alle Acque Nere)
    { name: "Tywin Lannister", value: 28, aliases: ["Tywin"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Ultron", value: 201, aliases: [] }, // LoD Kill Count, film Marvel + serie VisionQuest
    { name: "Undici", value: 112, aliases: ["Eleven", "Jane Hopper"] }, // LoD Kill Count, Stranger Things st. 1-5
    { name: "Valak", value: 24, aliases: ["La suora", "The Nun"] }, // LoD Kill Count, film del Conjuring (The Conjuring 1-2, Annabelle 2, The Nun 1-2)
    { name: "Valchiria", value: 78, aliases: ["Valkyrie", "Brunnhilde"] }, // LoD Kill Count, film Marvel
    { name: "Vecna", value: 83, aliases: ["Henry Creel", "Uno"] }, // LoD, totale di Stranger Things (Kill Count 93 meno i 10 dello spettacolo teatrale The First Shadow)
    { name: "Vedova Nera", value: 111, aliases: ["Black Widow", "Natasha Romanoff"] }, // LoD, totali dei film Marvel (Kill Count 113 meno il fumetto)
    { name: "Venom", value: 6, aliases: ["Eddie Brock"] }, // LoD Kill Count, Spider-Man 3 (Topher Grace): il Venom di Tom Hardy non ha una pagina
    { name: "Verme Grigio", value: 49, aliases: ["Grey Worm"] }, // LoD Kill Count, Il Trono di Spade
    { name: "Vernita Green", value: 8, aliases: ["Copperhead"] }, // LoD Kill Count, Kill Bill
    { name: "Vhagar", value: 910, aliases: [] }, // LoD Kill Count, House of the Dragon (+ 1 citata in Il Trono di Spade)
    { name: "Vigilante", value: 65, aliases: ["Adrian Chase"] }, // LoD Kill Count, serie Peacemaker
    { name: "Villanelle", value: 58, aliases: [] }, // LoD Kill Count, Killing Eve st. 1-4
    { name: "Vincent Vega", value: 3, aliases: [] }, // LoD Kill Count, Pulp Fiction
    { name: "Viserys I Targaryen", value: 1, aliases: ["Re Viserys"] }, // LoD Kill Count, House of the Dragon
    { name: "Walter White", value: 29, aliases: ["Heisenberg"] }, // LoD Kill Count, Breaking Bad
    { name: "Will Turner", value: 12, aliases: [] }, // LoD Kill Count, I pirati dei Caraibi 1-3 e 5
    { name: "Wonder Woman", value: 58, aliases: ["Diana Prince"] }, // LoD Kill Count, film DC (Gal Gadot)
    { name: "Yennefer", value: 67, aliases: ["Yennefer di Vengerberg"] }, // LoD Kill Count, serie The Witcher st. 1-4
    { name: "Ygritte", value: 19, aliases: [] }, // LoD Kill Count, Il Trono di Spade
    { name: "Yondu", value: 185, aliases: ["Yondu Udonta"] }, // LoD Kill Count, Guardiani della Galassia 1-2
  ],
};
