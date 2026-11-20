import type { FrecceCategory } from "./types";

export const cibiPrezzoChilo: FrecceCategory = {
  id: "cibi-prezzo-chilo",
  title: "Quanto costa al chilo",
  unit: "euro al chilo",
  rule: "Si toglie il prezzo al chilo in Italia, arrotondato all'euro (sotto 1 euro vale 1; per i liquidi conta il litro): i cibi di tutti i giorni come li vendeva Carrefour online il 20/11/2026, quelli di lusso nei negozi specializzati. Ad esempio la pasta vale 1, lo zafferano 7150.",
  start: 140,
  max: 55,
  source: "Spesa quotidiana: Carrefour Italia, spesa online, prezzo al kg/l indicato sul sito (prezzo pieno, senza promozioni), linea Carrefour Classic quando c'è, altrimenti la marca o il prodotto sfuso più comune — https://www.carrefour.it/spesa-online/ ; tartufi freschi: Tartufi Morra, Alba — https://www.tartufimorra.com/collections/tartufi-freschi ; caviale: Calvisius, latta da 1 kg — https://www.calvisius.com/caviar/ ; aceto balsamico tradizionale e zafferano in pistilli: Eataly spesa online — https://www.eataly.it/ ; jamón ibérico: Joselito, negozio online ufficiale — https://www.joselito.com/products/jamon-gran-reserva-loncheado (prezzi rilevati il 20/11/2026)",
  answers: [
    { name: "Acciughe", value: 24, aliases: ["Alici", "Filetti di acciughe"] }, // Carrefour, 20/11/2026 — Capri Filetti di Acciughe all'Olio di Girasole 80 g, 23,63 €/kg
    { name: "Aceto balsamico di Modena", value: 6, aliases: ["Aceto balsamico", "Balsamico"] }, // Carrefour, 20/11/2026 — Ponti Aceto Balsamico di Modena IGP 500 ml, 6,18 €/l
    { name: "Aceto balsamico tradizionale", value: 999, aliases: ["Aceto balsamico tradizionale di Modena", "Balsamico tradizionale"] }, // Eataly, 20/11/2026 — Giusti Aceto Balsamico Tradizionale di Modena DOP Affinato 100 ml, 999,00 €/l
    { name: "Aglio", value: 10 }, // Carrefour, 20/11/2026 — Aglio Secco 100 g, 10,00 €/kg
    { name: "Agnello", value: 19, aliases: ["Costolette di agnello"] }, // Carrefour, 20/11/2026 — Costolette di Agnello, 19,00 €/kg
    { name: "Anacardi", value: 23, aliases: ["Anacardo"] }, // Carrefour, 20/11/2026 — Carrefour Classic Anacardi Tostati e Salati 175 g, 22,80 €/kg a prezzo pieno
    { name: "Ananas", value: 2 }, // Carrefour, 20/11/2026 — Ananas extra Costa Rica, 1,95 €/kg
    { name: "Arachidi", value: 6, aliases: ["Noccioline"] }, // Carrefour, 20/11/2026 — Arachidi Jumbo Life Sfusi, 6,28 €/kg
    { name: "Arance", value: 2, aliases: ["Arancia"] }, // Carrefour, 20/11/2026 — Arance Navelinas 1,5 kg, 2,19 €/kg
    { name: "Avocado", value: 8 }, // Carrefour, 20/11/2026 — Avocado Hass 550 g, 7,96 €/kg
    { name: "Baccalà", value: 35 }, // Carrefour, 20/11/2026 — Filetto di Baccalà Ammollato, 34,90 €/kg
    { name: "Banane", value: 2, aliases: ["Banana"] }, // Carrefour, 20/11/2026 — Banane, 2,00 €/kg
    { name: "Bastoncini di pesce", value: 13, aliases: ["Bastoncini di merluzzo", "Bastoncini"] }, // Carrefour, 20/11/2026 — FRoSTA 10 Bastoncini di Filetti di Merluzzo 300 g, 13,29 €/kg a prezzo pieno
    { name: "Biscotti", value: 4, aliases: ["Biscotti frollini", "Frollini", "Macine"] }, // Carrefour, 20/11/2026 — Mulino Bianco Macine 800 g, 4,49 €/kg
    { name: "Bistecca fiorentina", value: 28, aliases: ["Fiorentina"] }, // Carrefour, 20/11/2026 — Costata Fiorentina di Bovino Adulto, 28,48 €/kg
    { name: "Bottarga", value: 160, aliases: ["Bottarga di muggine"] }, // Carrefour, 20/11/2026 — Bottarga di muggine, 159,60 €/kg
    { name: "Branzino", value: 16, aliases: ["Spigola"] }, // Carrefour, 20/11/2026 — Branzino 300/400, 15,91 €/kg
    { name: "Bresaola", value: 42 }, // Carrefour, 20/11/2026 — Carrefour Classic Bresaola della Valtellina IGP 80 g, 42,38 €/kg
    { name: "Burro", value: 15 }, // Carrefour, 20/11/2026 — Parmareggio Burro 200 g, 15,45 €/kg
    { name: "Cacao amaro", value: 36, aliases: ["Cacao"] }, // Carrefour, 20/11/2026 — Perugina Cacao Amaro in Polvere 75 g, 35,87 €/kg
    { name: "Caffè macinato", value: 13, aliases: ["Caffè"] }, // Carrefour, 20/11/2026 — Carrefour Classic Caffè Gusto e Aroma Gusto Rotondo 250 g, 13,00 €/kg
    { name: "Cannella", value: 76 }, // Carrefour, 20/11/2026 — Italpepe Cannella Macinata 38 g, 76,05 €/kg
    { name: "Capperi", value: 18 }, // Carrefour, 20/11/2026 — Carrefour Classic Capperi in Aceto di Vino 210 g, 18,09 €/kg
    { name: "Carne macinata", value: 12, aliases: ["Macinato", "Macinato di manzo"] }, // Carrefour, 20/11/2026 — Carne Macinata di Bovino Confezione Risparmio, 11,99 €/kg
    { name: "Carote", value: 1, aliases: ["Carota"] }, // Carrefour, 20/11/2026 — Carote sacchetto 1 kg, 1,38 €/kg
    { name: "Caviale Beluga", value: 8000, aliases: ["Beluga"] }, // Calvisius, 20/11/2026 — Calvisius Beluga, latta da 1000 g, 8000 €
    { name: "Caviale Oscietra", value: 2186, aliases: ["Oscietra", "Osetra"] }, // Calvisius, 20/11/2026 — Ars Italica Oscietra Classic, latta da 1000 g, 2186 €
    { name: "Caviale siberiano", value: 2000, aliases: ["Caviale di storione siberiano"] }, // Calvisius, 20/11/2026 — Calvisius Siberian Classic, latta da 1000 g, 2000 €
    { name: "Ceci", value: 4 }, // Carrefour, 20/11/2026 — Carrefour Ceci 500 g, 3,96 €/kg
    { name: "Champignon", value: 7, aliases: ["Funghi champignon", "Funghi"] }, // Carrefour, 20/11/2026 — Funghi Champignon sgambati, 7,27 €/kg
    { name: "Cioccolato al latte", value: 20, aliases: ["Milka"] }, // Carrefour, 20/11/2026 — Milka Latte Alpino 90 g, 19,89 €/kg
    { name: "Cioccolato fondente", value: 15, aliases: ["Cioccolato"] }, // Carrefour, 20/11/2026 — Carrefour Cioccolato Fondente 50% Extra 100 g, 14,90 €/kg
    { name: "Cipolle", value: 2, aliases: ["Cipolla"] }, // Carrefour, 20/11/2026 — Cipolle dorate 750 g, 2,11 €/kg
    { name: "Corn flakes", value: 7, aliases: ["Cornflakes", "Cereali"] }, // Carrefour, 20/11/2026 — Kellogg's Corn Flakes 375 g, 7,07 €/kg
    { name: "Costata", value: 23, aliases: ["Costata di manzo"] }, // Carrefour, 20/11/2026 — Costata con Osso di Bovino Adulto, 23,49 €/kg
    { name: "Cotechino", value: 16 }, // Carrefour, 20/11/2026 — Negroni Cotechino 100% Italiano 500 g, 15,98 €/kg
    { name: "Couscous", value: 3, aliases: ["Cous cous", "Cuscus"] }, // Carrefour, 20/11/2026 — Cous Cous 800 g, 3,10 €/kg
    { name: "Cozze", value: 8 }, // Carrefour, 20/11/2026 — Cozze allevate, 7,90 €/kg
    { name: "Culatello", value: 100 }, // Carrefour, 20/11/2026 — Villani Culatello Classico 90 g, 99,89 €/kg
    { name: "Emmental", value: 15, aliases: ["Emmentaler", "Emmenthal"] }, // Carrefour, 20/11/2026 — Carrefour Classic Emmental Olandese Fette 200 g, 14,95 €/kg
    { name: "Fagioli", value: 5, aliases: ["Fagioli borlotti", "Borlotti"] }, // Carrefour, 20/11/2026 — Carrefour Fagioli borlotti 500 g, 4,96 €/kg
    { name: "Farina", value: 1, aliases: ["Farina 00"] }, // Carrefour, 20/11/2026 — Carrefour Classic Farina di Grano Tenero Tipo "00" 1 kg, 0,75 €/kg
    { name: "Filetto di manzo", value: 38, aliases: ["Filetto", "Filetto di bovino"] }, // Carrefour, 20/11/2026 — Filetto di Bovino, 37,50 €/kg
    { name: "Gamberi", value: 24, aliases: ["Gamberetti"] }, // Carrefour, 20/11/2026 — Gamberi Indopacifici sgusciati congelati 350 g, 23,90 €/kg
    { name: "Gnocchi", value: 2, aliases: ["Gnocchi di patate"] }, // Carrefour, 20/11/2026 — Carrefour Original Gnocchi di Patate 500 g, 2,38 €/kg
    { name: "Gorgonzola", value: 12 }, // Carrefour, 20/11/2026 — Gorgonzola DOP Dolce, 11,92 €/kg
    { name: "Grana Padano", value: 15, aliases: ["Grana"] }, // Carrefour, 20/11/2026 — Grana Padano DOP 20 Mesi da Banco, 14,90 €/kg
    { name: "Jamón ibérico", value: 421, aliases: ["Jamón", "Pata negra", "Prosciutto iberico", "Jamón Joselito"] }, // Joselito, 20/11/2026 — Jamón Joselito Gran Reserva affettato 70 g, 29,50 € (421 €/kg)
    { name: "Ketchup", value: 5 }, // Carrefour, 20/11/2026 — Carrefour Classic Ketchup 280 g, 4,61 €/kg
    { name: "Kiwi", value: 6 }, // Carrefour, 20/11/2026 — Kiwi Hayward I categoria Italia, 5,98 €/kg
    { name: "Latte", value: 2, aliases: ["Latte intero"] }, // Carrefour, 20/11/2026 — Granarolo Latte Intero UHT 1 l, 1,85 €/l
    { name: "Lenticchie", value: 3 }, // Carrefour, 20/11/2026 — Lenticchie 800 g, 3,10 €/kg
    { name: "Liquirizia", value: 100, aliases: ["Liquirizia in stecche", "Bastoncini di liquirizia"] }, // Carrefour, 20/11/2026 — Liquirizia in Stecche 20 g, 100,00 €/kg
    { name: "Maionese", value: 4 }, // Carrefour, 20/11/2026 — Carrefour Classic Maionese 480 g, 3,98 €/l
    { name: "Mandorle", value: 20, aliases: ["Mandorla"] }, // Carrefour, 20/11/2026 — Carrefour il Mercato Mandorle sgusciate 250 g, 20,00 €/kg
    { name: "Marmellata", value: 5, aliases: ["Marmellata di arance", "Confettura"] }, // Carrefour, 20/11/2026 — Carrefour Classic Marmellata di Arancia 400 g, 4,50 €/kg
    { name: "Mascarpone", value: 9 }, // Carrefour, 20/11/2026 — Polenghi Lombardo Mascarpone 250 g, 8,76 €/kg
    { name: "Melanzane", value: 2, aliases: ["Melanzana"] }, // Carrefour, 20/11/2026 — Melanzane tonde globose I categoria Italia, 1,99 €/kg
    { name: "Mele", value: 1, aliases: ["Mela"] }, // Carrefour, 20/11/2026 — Carrefour il Mercato Mele Golden Delicious 2 kg, 1,24 €/kg a prezzo pieno
    { name: "Miele", value: 11 }, // Carrefour, 20/11/2026 — Carrefour Classic Miele Millefiori 500 g, 10,98 €/kg
    { name: "Mortadella", value: 17 }, // Carrefour, 20/11/2026 — Carrefour Classic Mortadella Bologna IGP 120 g, 16,58 €/kg
    { name: "Mozzarella", value: 8 }, // Carrefour, 20/11/2026 — Carrefour Classic Mozzarella 3 x 125 g, 7,97 €/kg
    { name: "Mozzarella di bufala", value: 17, aliases: ["Bufala"] }, // Carrefour, 20/11/2026 — Vallelata Mozzarella di Bufala Campana DOP 180 g, 16,61 €/kg
    { name: "Nocciole", value: 10, aliases: ["Nocciola"] }, // Carrefour, 20/11/2026 — Nocciole Tostate Sfuse 500 g, 10,28 €/kg
    { name: "Noci", value: 29, aliases: ["Noce", "Noci sgusciate"] }, // Carrefour, 20/11/2026 — Carrefour il Mercato Noci sgusciate 170 g, 29,41 €/kg
    { name: "Nutella", value: 10 }, // Carrefour, 20/11/2026 — Nutella 400 g, 9,98 €/kg
    { name: "Olio extravergine", value: 9, aliases: ["Olio d'oliva", "Olio", "Olio EVO"] }, // Carrefour, 20/11/2026 — Monini Classico Olio Extra Vergine di Oliva 1 l, 8,79 €/l a prezzo pieno
    { name: "Olive", value: 11, aliases: ["Olive nere"] }, // Carrefour, 20/11/2026 — Carrefour Classic Olive Nere Denocciolate in Salamoia, 10,60 €/kg sgocciolate
    { name: "Orata", value: 15 }, // Carrefour, 20/11/2026 — Orata Allevata Grecia 300/400 g da banco, 14,91 €/kg
    { name: "Pancetta", value: 27 }, // Carrefour, 20/11/2026 — Carrefour Classic Pancetta Arrotolata 100 g, 26,90 €/kg
    { name: "Pandoro", value: 8 }, // Carrefour, 20/11/2026 — Melegatti Pandoro Originale Verona 750 g, 7,85 €/kg
    { name: "Pane", value: 5, aliases: ["Filone"] }, // Carrefour, 20/11/2026 — Filone di Grano Tenero, 5,38 €/kg
    { name: "Panettone", value: 6 }, // Carrefour, 20/11/2026 — GS Gran Festa Panettone 1000 g, 5,59 €/kg
    { name: "Parmigiano Reggiano", value: 27, aliases: ["Parmigiano"] }, // Carrefour, 20/11/2026 — Parmigiano Reggiano DOP 22 mesi, 26,90 €/kg
    { name: "Passata di pomodoro", value: 1, aliases: ["Passata", "Salsa di pomodoro"] }, // Carrefour, 20/11/2026 — Carrefour Classic Passata di Pomodoro 700 g, 0,99 €/kg
    { name: "Pasta", value: 1, aliases: ["Spaghetti"] }, // Carrefour, 20/11/2026 — Carrefour Classic Spaghetti N.5 1 kg, 1,29 €/kg
    { name: "Patate", value: 2, aliases: ["Patata"] }, // Carrefour, 20/11/2026 — Patate 1 kg, 1,65 €/kg
    { name: "Patatine", value: 6, aliases: ["Patatine in busta", "Chips"] }, // Carrefour, 20/11/2026 — Carrefour Classic Patatine Classiche 200 g, 6,45 €/kg
    { name: "Pecorino romano", value: 24, aliases: ["Pecorino"] }, // Carrefour, 20/11/2026 — Carrefour Pecorino Romano DOP 250 g, 23,80 €/kg
    { name: "Pelati", value: 5, aliases: ["Pomodori pelati"] }, // Carrefour, 20/11/2026 — Cirio Pelati 400 g, 5,16 €/kg sgocciolati
    { name: "Pepe nero", value: 32, aliases: ["Pepe"] }, // Carrefour, 20/11/2026 — Carrefour Classic Pepe Nero Macinato 50 g, 31,80 €/kg
    { name: "Peperoni", value: 5, aliases: ["Peperone"] }, // Carrefour, 20/11/2026 — Peperoni Rossi 1 kg Italia I categoria, 4,78 €/kg
    { name: "Petto di pollo", value: 11, aliases: ["Pollo"] }, // Carrefour, 20/11/2026 — Petto di Pollo 1000 g, 10,99 €/kg
    { name: "Pinoli", value: 128, aliases: ["Pinolo"] }, // Carrefour, 20/11/2026 — Fatina Pinoli del Tirreno Sgusciati 70 g, 128,29 €/kg
    { name: "Piselli", value: 4 }, // Carrefour, 20/11/2026 — Carrefour Piselli Fini 410 g, 4,41 €/kg sgocciolati
    { name: "Pistacchi", value: 23, aliases: ["Pistacchio"] }, // Carrefour, 20/11/2026 — Carrefour il Mercato Pistacchi tostati e salati 220 g, 22,73 €/kg
    { name: "Polpo", value: 22, aliases: ["Polipo"] }, // Carrefour, 20/11/2026 — Polpo Marocco Decongelato, 21,90 €/kg
    { name: "Pomodori", value: 3, aliases: ["Pomodoro"] }, // Carrefour, 20/11/2026 — Pomodoro tondo grappolo I categoria Italia, 2,99 €/kg
    { name: "Prosciutto cotto", value: 19 }, // Carrefour, 20/11/2026 — Carrefour Classic Prosciutto Cotto Alta Qualità 120 g, 19,08 €/kg
    { name: "Prosciutto crudo", value: 33 }, // Carrefour, 20/11/2026 — Carrefour Classic Prosciutto Crudo 90 g, 33,22 €/kg
    { name: "Ricotta", value: 4 }, // Carrefour, 20/11/2026 — Carrefour Classic Ricotta 250 g, 4,36 €/kg
    { name: "Riso", value: 3, aliases: ["Riso Carnaroli"] }, // Carrefour, 20/11/2026 — Carrefour Classic Riso Carnaroli 1 kg, 3,19 €/kg
    { name: "Salame", value: 23, aliases: ["Salame Milano"] }, // Carrefour, 20/11/2026 — Salame Milano Volpi da Banco, 22,50 €/kg
    { name: "Sale", value: 1, aliases: ["Sale fino"] }, // Carrefour, 20/11/2026 — Carrefour Classic Sale Marino Fino 1 kg, 0,37 €/kg
    { name: "Salmone", value: 20, aliases: ["Filetto di salmone", "Salmone fresco"] }, // Carrefour, 20/11/2026 — Filetto di Salmone Allevato, 19,90 €/kg
    { name: "Salmone affumicato", value: 50 }, // Carrefour, 20/11/2026 — The Icelander Salmone Islandese Affumicato 100 g, 49,90 €/kg
    { name: "Salsiccia", value: 11, aliases: ["Salsicce"] }, // Carrefour, 20/11/2026 — i Selezionati Carrefour Macelleria Salsiccia, 11,00 €/kg
    { name: "Speck", value: 25 }, // Carrefour, 20/11/2026 — Carrefour Classic Speck Alto Adige IGP 100 g, 24,90 €/kg
    { name: "Tartufo bianco d'Alba", value: 4900, aliases: ["Tartufo bianco", "Tartufo"] }, // Tartufi Morra, 20/11/2026 — Tartufo bianco fresco, 147 € per 30 g / 490 € per 100 g
    { name: "Tartufo nero estivo", value: 400, aliases: ["Scorzone"] }, // Tartufi Morra, 20/11/2026 — Tartufo nero estivo fresco, 40 € per 100 g
    { name: "Tartufo nero invernale", value: 1900, aliases: ["Tartufo nero"] }, // Tartufi Morra, 20/11/2026 — Tartufo nero invernale fresco, 190 € per 100 g
    { name: "Tè in bustine", value: 77, aliases: ["Tè", "Tè nero", "Tea"] }, // Carrefour, 20/11/2026 — Twinings English Breakfast Tè Nero 25 filtri 50 g, 77,00 €/kg
    { name: "Tonno in scatola", value: 25, aliases: ["Tonno", "Tonno sott'olio"] }, // Carrefour, 20/11/2026 — Rio Mare Tonno all'Olio Extra Vergine di Oliva 3 x 65 g, 24,87 €/kg a prezzo pieno
    { name: "Tortellini", value: 14 }, // Carrefour, 20/11/2026 — Barilla Emiliane Tortellini Pasta all'Uovo 250 g, 13,96 €/kg
    { name: "Uova", value: 5, aliases: ["Uovo"] }, // Carrefour, 20/11/2026 — Carrefour Classic Uova Fresche Allevate a Terra Grandi x6 (384 g), 4,92 €/kg
    { name: "Uva", value: 4 }, // Carrefour, 20/11/2026 — Uva bianca senza semi sfusa 1 kg Italia, 3,99 €/kg
    { name: "Vaniglia in bacca", value: 1897, aliases: ["Vaniglia", "Bacca di vaniglia", "Baccello di vaniglia"] }, // Carrefour, 20/11/2026 — Paneangeli Vaniglia in bacca 1 pz (3 g), 1896,67 €/kg
    { name: "Würstel", value: 7, aliases: ["Wurst"] }, // Carrefour, 20/11/2026 — Carrefour Classic Würstel di Suino 100 g, 6,90 €/kg
    { name: "Yogurt", value: 4, aliases: ["Yogurt bianco", "Yoghurt"] }, // Carrefour, 20/11/2026 — Müller Bianco Crema di Yogurt 500 g, 3,90 €/kg
    { name: "Zafferano", value: 7150, aliases: ["Zafferano in polvere", "Zafferano in bustine"] }, // Carrefour, 20/11/2026 — Carrefour Classic Zafferano 4 x 0,15 g, 7150 €/kg
    { name: "Zafferano in pistilli", value: 11900, aliases: ["Zafferano in stimmi", "Pistilli di zafferano"] }, // Eataly, 20/11/2026 — Elika Zafferano in pistilli 1 g, 11.900 €/kg
    { name: "Zucchero", value: 1, aliases: ["Zucchero semolato"] }, // Carrefour, 20/11/2026 — Carrefour Classic Zucchero Semolato Bianco 1 kg, 1,09 €/kg
    { name: "Zucchine", value: 3, aliases: ["Zucchina"] }, // Carrefour, 20/11/2026 — Zucchine Italia I categoria, 2,58 €/kg
  ],
};
