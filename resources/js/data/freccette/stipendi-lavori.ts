import type { FrecceCategory } from "./types";

export const stipendiLavori: FrecceCategory = {
  id: "stipendi-lavori",
  title: "Quanto guadagna chi fa questo lavoro",
  unit: "migliaia di euro lordi all'anno",
  rule: "Nomina un lavoro: vale quanto guadagna in media in Italia in un anno, in migliaia di euro lordi arrotondati al migliaio. Per i dipendenti conta la retribuzione lorda annua media (o quella da contratto nazionale), per professionisti e titolari di attività il reddito medio dichiarato (il notaio vale 165, il barista 22).",
  start: 250,
  max: 100,
  source:
    "Professionisti iscritti alle Casse (tab. 2.9.1), iscritti INPS per gestione — sportivi, giornalisti dipendenti, dipendenti Poste, ufficiali giudiziari (tab. 2.9) — e lavoratori autonomi soggetti a ISA (tab. 2.9.2): Centro Studi Itinerari Previdenziali, Tredicesima indagine sulle entrate fiscali, settembre 2026, redditi 2024 — https://www.itinerariprevidenziali.it/wp-content/uploads/2026/09/Tredicesima-indagine-sulle-entrate-fiscali-1.pdf; " +
    "Dipendenti pubblici: Ragioneria Generale dello Stato, Conto annuale 2024, retribuzione media lordo dipendente per contratto/categoria (personale a tempo indeterminato), calcolata dagli open data con il metodo RGS (verificato sui valori 2023 pubblicati) — https://contoannuale.rgs.mef.gov.it/web/sicosito/download; " +
    "Deputato: Camera dei deputati, indennità parlamentare lorda 10.435 € al mese x 12 — https://www.camera.it/leg19/383?conoscerelacamera=4; Senatore: Senato della Repubblica, indennità lorda 10.385,31 € al mese x 12 — https://www.senato.it/composizione/senatori/trattamento-economico; Europarlamentare: Parlamento europeo, stipendio lordo 11.255,26 € al mese x 12 — https://www.europarl.europa.eu/meps/en/about/meps; Presidente della Repubblica: Quirinale, comunicato 3 marzo 2022, assegno personale previsto 239.182 € lordi annui — https://www.quirinale.it/it/comunicato/presidente-repubblica-riduce-assegno-personale-rinuncia-stesso-adeguamento-istat; " +
    "Sindaci e presidenti di Regione: L. 234/2021 art. 1 c. 583 (indennità dei sindaci in percentuale del trattamento dei presidenti di Regione, 13.800 € lordi al mese, x 12) — https://temi.camera.it/leg19DIL/temi/19_enti-locali e https://dait.interno.gov.it/documenti/decreto-fl-14-12-2023_1.pdf; " +
    "Dipendenti privati, minimi da CCNL a tempo pieno: Pubblici esercizi Fipe, livelli 2°-7° da giugno 2026 (x 14; 4° livello 1.692,69 €) — https://www.lexplain.it/tabelle-retributive-ccnl-pubblici-esercizi-ristorazione-e-turismo-2024-2027/, livelli e mansioni https://www.lexplain.it/ccnl-pubblici-esercizi-ristorazione-e-turismo-livelli-e-mansioni/; Terziario Confcommercio, 3° e 4° livello da novembre 2026 (x 14; 4° livello 1.816,68 €) — https://www.lexplain.it/tabelle-retributive-ccnl-commercio-2024-2027-dopo-il-rinnovo/; Metalmeccanica industria, livelli D1-A1 da giugno 2026 (x 13; D2 1.979,37 €) — https://www.dottrinalavoro.it/notizie-c/ccnl-metalmeccanica-industria-nuovi-minimi-tabellari-giugno-2026; Lavoro domestico, conviventi dal 1° gennaio 2026 (x 13; CS 1.193,84 €), tabella del Ministero del Lavoro — https://www.informazionefiscale.it/IMG/pdf/tabella-lavoro-domestico-2026.pdf; Logistica, trasporto merci e spedizione, personale viaggiante dal 1° gennaio 2026, minimo + EPA (x 14) — https://www.legacoop.coop/wp-content/uploads/2025/10/Nuovo-Testo-Unico-del-CCNL-logistica-trasporto-e-spedizione.pdf; Vigilanza privata, GPG 4° livello dal 1° aprile 2026 (1.468,88 € x 14) — https://leggeinchiaro.it/ccnl-vigilanza-servizi-fiduciari-tabelle-retributive-2026/ (dati al 20/11/2026)",
  answers: [
    { name: "Agente di commercio", value: 70, aliases: ["Rappresentante", "Rappresentante di commercio"] }, // Itinerari Prev. tab. 2.9.2 ISA "Intermediari del commercio" 69,5k, 2024
    { name: "Agente di polizia penitenziaria", value: 42, aliases: ["Guardia carceraria", "Secondino", "Polizia penitenziaria"] }, // RGS Conto annuale, Polizia penitenziaria 41.981, 2024
    { name: "Agente di viaggio", value: 30, aliases: ["Agente di viaggi", "Titolare di agenzia di viaggi"] }, // Itinerari Prev. tab. 2.9.2 ISA 29,5k, 2024
    { name: "Agente immobiliare", value: 49, aliases: ["Mediatore immobiliare"] }, // Itinerari Prev. tab. 2.9.2 ISA 48,9k, 2024
    { name: "Agronomo", value: 32, aliases: ["Agronoma", "Dottore agronomo", "Dottore forestale"] }, // Itinerari Prev. tab. 2.9.1 Casse 31.913, 2024
    { name: "Aiuto cuoco", value: 21, aliases: ["Aiuto cuoca", "Commis di cucina"] }, // CCNL Pubblici esercizi, 6° livello (commis di cucina) 1.491,57 x 14, 2026
    { name: "Albergatore", value: 34, aliases: ["Albergatrice", "Titolare di albergo", "Titolare di hotel"] }, // Itinerari Prev. tab. 2.9.2 ISA 34,1k, 2024
    { name: "Amministratore di condominio", value: 54, aliases: ["Amministratrice di condominio"] }, // Itinerari Prev. tab. 2.9.2 ISA 53,7k, 2024
    { name: "Ammiraglio", value: 160 }, // RGS Conto annuale, Marina, ufficiali generali 159.577, 2024
    { name: "Appuntato dei Carabinieri", value: 39, aliases: ["Appuntato"] }, // RGS Conto annuale, Carabinieri, appuntati 39.303, 2024
    { name: "Architetto", value: 38, aliases: ["Architetta"] }, // Itinerari Prev. tab. 2.9.1 Casse (Inarcassa) 38.192, 2024
    { name: "Attuario", value: 113, aliases: ["Attuaria"] }, // Itinerari Prev. tab. 2.9.1 Casse (Attuari, ~250 iscritti) 112.966, 2024
    { name: "Avvocato", value: 52, aliases: ["Avvocata", "Avvocatessa", "Legale"] }, // Itinerari Prev. tab. 2.9.1 Casse (Cassa Forense) 51.912, 2024
    { name: "Avvocato dello Stato", value: 190, aliases: ["Avvocata dello Stato", "Avvocatura dello Stato"] }, // RGS Conto annuale, Avvocatura di Stato 189.531, 2024
    { name: "Babysitter", value: 14, aliases: ["Baby sitter", "Tata"] }, // CCNL lavoro domestico, livello BS convivente 1.053,39 x 13, 2026
    { name: "Badante", value: 16 }, // CCNL lavoro domestico, CS convivente 1.193,84 x 13, 2026
    { name: "Barista", value: 22, aliases: [] }, // CCNL Pubblici esercizi, 5° livello (barista) 1.580,09 x 14, 2026
    { name: "Barman", value: 24, aliases: ["Barwoman"] }, // CCNL Pubblici esercizi, 4° livello (barman) 1.692,69 x 14, 2026
    { name: "Benzinaio", value: 24, aliases: ["Benzinaia", "Gestore di distributore"] }, // Itinerari Prev. tab. 2.9.2 ISA 24,3k, 2024
    { name: "Bidello", value: 24, aliases: ["Bidella", "Collaboratore scolastico", "Collaboratrice scolastica"] }, // RGS Conto annuale, Scuola, personale ATA di ruolo 23.958, 2024 (comprende anche assistenti amministrativi e tecnici)
    { name: "Biologo", value: 22, aliases: ["Biologa"] }, // Itinerari Prev. tab. 2.9.1 Casse 22.025, 2024
    { name: "Cameriere", value: 24, aliases: ["Cameriera"] }, // CCNL Pubblici esercizi, 4° livello 1.692,69 x 14, 2026
    { name: "Camionista", value: 28, aliases: ["Autista", "Autista di camion", "Autotrasportatore", "Camionista di TIR"] }, // CCNL Logistica, viaggiante B3 (patente C-E, trasporti nazionali e internazionali) 2.010,37 x 14, 2026
    { name: "Capo cuoco", value: 27, aliases: ["Capocuoco", "Capo cuoca", "Chef"] }, // CCNL Pubblici esercizi, 2° livello (capo cuoco) 1.916,34 x 14, 2026
    { name: "Cappellano militare", value: 63, aliases: ["Prete militare"] }, // RGS Conto annuale, Cappellani militari (CM09 71.033 e CM10 57.476, media pesata) ~62,5k, 2024
    { name: "Carabiniere", value: 45, aliases: ["Carabiniera"] }, // RGS Conto annuale, Carabinieri 45.227, 2024
    { name: "Chimico", value: 48, aliases: ["Chimica", "Fisico", "Fisica"] }, // Itinerari Prev. tab. 2.9.1 Casse "Chimici e Fisici" 47.963, 2024
    { name: "Colf", value: 13, aliases: ["Collaboratrice domestica", "Collaboratore domestico", "Domestica"] }, // CCNL lavoro domestico, livello B convivente 983,16 x 13, 2026
    { name: "Colonnello", value: 90, aliases: ["Tenente colonnello", "Maggiore"] }, // RGS Conto annuale, Esercito, ufficiali superiori 90.323, 2024
    { name: "Commercialista", value: 97, aliases: ["Dottore commercialista", "Dottoressa commercialista"] }, // Itinerari Prev. tab. 2.9.1 Casse (CNPADC) 96.846, 2024
    { name: "Commesso", value: 25, aliases: ["Commessa", "Cassiere", "Cassiera"] }, // CCNL Terziario Confcommercio, 4° livello 1.816,68 x 14, 2026
    { name: "Consulente del lavoro", value: 59 }, // Itinerari Prev. tab. 2.9.1 Casse 59.386, 2024
    { name: "Corriere", value: 26, aliases: ["Corriere espresso", "Fattorino", "Autista di furgone"] }, // CCNL Logistica, viaggiante G1 (patente B, corriere espresso) 1.876,08 x 14, 2026
    { name: "Cuoco", value: 24, aliases: ["Cuoca"] }, // CCNL Pubblici esercizi, 4° livello (cuoco capo partita / cucina non organizzata in partite) 1.692,69 x 14, 2026
    { name: "Dentista", value: 74, aliases: ["Odontoiatra"] }, // Itinerari Prev. tab. 2.9.1 Casse (Enpam odontoiatri) 74.200, 2024
    { name: "Deputato", value: 125, aliases: ["Deputata", "Parlamentare", "Onorevole"] }, // Camera dei deputati, indennità 10.435 x 12, 2026
    { name: "Diplomatico", value: 93, aliases: ["Diplomatica"] }, // RGS Conto annuale, Carriera diplomatica 92.964, 2024
    { name: "Direttore di carcere", value: 106, aliases: ["Direttrice di carcere", "Dirigente penitenziario"] }, // RGS Conto annuale, Carriera dirigenziale penitenziaria 105.987, 2024
    { name: "Dirigente comunale", value: 112, aliases: ["Dirigente regionale", "Dirigente di un comune"] }, // RGS Conto annuale, Regioni e autonomie locali, dirigenti 111.986, 2024
    { name: "Dirigente della Polizia di Stato", value: 99, aliases: ["Questore", "Vicequestore", "Dirigente di polizia"] }, // RGS Conto annuale, Polizia di Stato, dirigenti 98.586, 2024
    { name: "Edicolante", value: 17, aliases: ["Giornalaio", "Giornalaia"] }, // Itinerari Prev. tab. 2.9.2 ISA "Giornalai" 17,3k, 2024
    { name: "Erborista", value: 20 }, // Itinerari Prev. tab. 2.9.2 ISA 19,7k, 2024
    { name: "Estetista", value: 17 }, // Itinerari Prev. tab. 2.9.2 ISA 16,5k, 2024
    { name: "Europarlamentare", value: 135, aliases: ["Eurodeputato", "Eurodeputata", "Parlamentare europeo"] }, // Parlamento europeo, stipendio lordo 11.255,26 x 12, 2026
    { name: "Farmacista titolare", value: 113, aliases: ["Farmacista", "Titolare di farmacia"] }, // Itinerari Prev. tab. 2.9.1 (stima su dati Federfarma) 112.525, 2024
    { name: "Finanziere", value: 46, aliases: ["Finanziera", "Guardia di Finanza"] }, // RGS Conto annuale, Guardia di Finanza 46.401, 2024
    { name: "Fioraio", value: 18, aliases: ["Fioraia", "Fiorista"] }, // Itinerari Prev. tab. 2.9.2 ISA 17,5k, 2024
    { name: "Fisioterapista", value: 32 }, // Itinerari Prev. tab. 2.9.2 ISA "Paramedici indipendenti" 31,9k, 2024 (categoria che comprende anche altre professioni sanitarie autonome)
    { name: "Funzionario dell'Agenzia delle Entrate", value: 43, aliases: ["Funzionaria dell'Agenzia delle Entrate", "Funzionario del fisco"] }, // RGS Conto annuale, Agenzie fiscali, funzionari 43.453, 2024
    { name: "Generale dell'Esercito", value: 149, aliases: ["Generale"] }, // RGS Conto annuale, Esercito, ufficiali generali 149.141, 2024
    { name: "Geologo", value: 42, aliases: ["Geologa"] }, // Itinerari Prev. tab. 2.9.1 Casse 42.277, 2024
    { name: "Geometra", value: 40 }, // Itinerari Prev. tab. 2.9.1 Casse (Cipag) 40.381, 2024
    { name: "Gestore di palestra", value: 17, aliases: ["Titolare di palestra", "Gestore di impianti sportivi"] }, // Itinerari Prev. tab. 2.9.2 ISA "Gestori di impianti sportivi" 17,0k, 2024
    { name: "Gioielliere", value: 27, aliases: ["Gioielliera", "Orologiaio", "Orologiaia"] }, // Itinerari Prev. tab. 2.9.2 ISA 27,0k, 2024
    { name: "Giornalista", value: 70, aliases: ["Giornalista dipendente"] }, // Itinerari Prev. tab. 2.9 INPS ex Inpgi dipendenti 70.219, 2024
    { name: "Giornalista freelance", value: 18, aliases: ["Giornalista libero professionista"] }, // Itinerari Prev. tab. 2.9.1 Casse 18.341, 2024
    { name: "Giudice amministrativo", value: 189, aliases: ["Giudice del TAR", "Consigliere di Stato"] }, // RGS Conto annuale, Magistratura amministrativa 188.514, 2024
    { name: "Guardia costiera", value: 46, aliases: ["Capitaneria di porto", "Militare della Guardia costiera"] }, // RGS Conto annuale, Capitanerie di porto 45.563, 2024
    { name: "Guardia giurata", value: 21, aliases: ["Vigilante", "GPG", "Guardia particolare giurata"] }, // CCNL Vigilanza privata, GPG 4° livello 1.468,88 x 14, da aprile 2026
    { name: "Guida turistica", value: 25, aliases: ["Guida"] }, // Itinerari Prev. tab. 2.9.2 ISA 25,2k, 2024
    { name: "Impiegato", value: 28, aliases: ["Impiegata", "Impiegato d'ufficio"] }, // CCNL Terziario Confcommercio, 3° livello (impiegato di concetto) 2.022,31 x 14, 2026
    { name: "Impiegato comunale", value: 34, aliases: ["Impiegata comunale", "Dipendente comunale"] }, // RGS Conto annuale, Regioni e autonomie locali 33.613, 2024
    { name: "Impiegato metalmeccanico", value: 29, aliases: ["Impiegata metalmeccanica"] }, // CCNL Metalmeccanica industria, livello C3 (ex 5ª categoria) 2.211,43 x 13, 2026
    { name: "Impiegato ministeriale", value: 37, aliases: ["Impiegata ministeriale", "Dipendente di un ministero"] }, // RGS Conto annuale, Ministeri 37.280, 2024
    { name: "Impresario di pompe funebri", value: 44, aliases: ["Titolare di pompe funebri", "Pompe funebri"] }, // Itinerari Prev. tab. 2.9.2 ISA 43,6k, 2024
    { name: "Infermiere", value: 36, aliases: ["Infermiera"] }, // RGS Conto annuale, SSN "Professionisti della salute e funzionari" 36.150, 2024
    { name: "Infermiere libero professionista", value: 30, aliases: ["Infermiera libera professionista"] }, // Itinerari Prev. tab. 2.9.1 Casse (Enpapi) 29.723, 2024
    { name: "Informatico freelance", value: 60, aliases: ["Informatico libero professionista", "Consulente informatico"] }, // Itinerari Prev. tab. 2.9.2 ISA "Informatici" 60,3k, 2024
    { name: "Ingegnere", value: 64, aliases: ["Ingegnera"] }, // Itinerari Prev. tab. 2.9.1 Casse (Inarcassa) 64.269, 2024
    { name: "Insegnante", value: 33, aliases: ["Docente", "Maestro", "Maestra", "Professore di scuola", "Professoressa di scuola"] }, // RGS Conto annuale, Scuola docenti di ruolo 32.908, 2024
    { name: "Insegnante di religione", value: 37, aliases: ["Professore di religione", "Professoressa di religione"] }, // RGS Conto annuale, Scuola, docenti di religione di ruolo 37.262, 2024
    { name: "Lavapiatti", value: 19, aliases: ["Sguattero", "Sguattera"] }, // CCNL Pubblici esercizi, 7° livello (personale di fatica e pulizia di cucina) 1.390,20 x 14, 2026
    { name: "Macellaio", value: 19, aliases: ["Macellaia"] }, // Itinerari Prev. tab. 2.9.2 ISA 19,4k, 2024
    { name: "Magazziniere", value: 25, aliases: ["Magazziniera"] }, // CCNL Terziario Confcommercio, 4° livello 1.816,68 x 14, 2026
    { name: "Magistrato", value: 154, aliases: ["Magistrata", "Giudice", "Pubblico ministero", "PM"] }, // RGS Conto annuale, Magistratura ordinaria 154.401, 2024
    { name: "Magistrato della Corte dei conti", value: 174, aliases: ["Giudice contabile", "Magistrata della Corte dei conti"] }, // RGS Conto annuale, Magistratura contabile 174.304, 2024
    { name: "Maresciallo dei Carabinieri", value: 51, aliases: ["Maresciallo"] }, // RGS Conto annuale, Carabinieri, marescialli 51.148, 2024
    { name: "Meccanico", value: 29, aliases: ["Meccanica", "Autoriparatore"] }, // Itinerari Prev. tab. 2.9.2 ISA 29,2k, 2024
    { name: "Medico", value: 91, aliases: ["Medica", "Medico ospedaliero", "Medica ospedaliera"] }, // RGS Conto annuale, SSN dirigenti medici 90.758, 2024
    { name: "Militare dell'Aeronautica", value: 48, aliases: ["Aviere", "Aeronautica militare"] }, // RGS Conto annuale, Aeronautica 48.213, 2024
    { name: "Militare dell'Esercito", value: 41, aliases: ["Soldato", "Soldatessa", "Militare"] }, // RGS Conto annuale, Esercito 40.925, 2024
    { name: "Militare della Marina", value: 51, aliases: ["Marinaio", "Marina militare"] }, // RGS Conto annuale, Marina 50.670, 2024
    { name: "Negoziante di abbigliamento", value: 17, aliases: ["Titolare di negozio di abbigliamento", "Negoziante di scarpe"] }, // Itinerari Prev. tab. 2.9.2 ISA 16,7k, 2024
    { name: "Negoziante di alimentari", value: 17, aliases: ["Alimentarista", "Salumiere", "Salumiera", "Droghiere"] }, // Itinerari Prev. tab. 2.9.2 ISA 17,4k, 2024
    { name: "Notaio", value: 165, aliases: ["Notaia", "Notaro"] }, // Itinerari Prev. tab. 2.9.1 Casse (Cassa del Notariato) 164.758, 2024
    { name: "Operaio comune", value: 23, aliases: ["Operaia comune"] }, // CCNL Metalmeccanica industria, livello D1 (ex 2ª categoria) 1.784,94 x 13, 2026
    { name: "Operaio metalmeccanico", value: 26, aliases: ["Operaia metalmeccanica", "Operaio", "Operaia", "Metalmeccanico"] }, // CCNL Metalmeccanica industria, livello D2 1.979,37 x 13, 2026
    { name: "Operatore socio-sanitario", value: 28, aliases: ["OSS", "Operatrice socio-sanitaria"] }, // RGS Conto annuale, SSN "Operatori" 28.421, 2024
    { name: "Panettiere", value: 28, aliases: ["Panettiera", "Fornaio", "Fornaia"] }, // Itinerari Prev. tab. 2.9.2 ISA 27,9k, 2024
    { name: "Parrucchiere", value: 18, aliases: ["Parrucchiera", "Acconciatore", "Acconciatrice", "Barbiere"] }, // Itinerari Prev. tab. 2.9.2 ISA "Acconciatori" 18,1k, 2024
    { name: "Perito industriale", value: 57 }, // Itinerari Prev. tab. 2.9.1 Casse 57.487, 2024
    { name: "Pizzaiolo", value: 24, aliases: ["Pizzaiola"] }, // CCNL Pubblici esercizi, 4° livello 1.692,69 x 14, 2026
    { name: "Poliziotto", value: 45, aliases: ["Poliziotta", "Agente di polizia", "Polizia di Stato"] }, // RGS Conto annuale, Polizia di Stato 45.153, 2024
    { name: "Postino", value: 33, aliases: ["Postina", "Portalettere", "Dipendente di Poste"] }, // Itinerari Prev. tab. 2.9 INPS "Dipendenti Poste" 33,41k, 2024 (tutti i dipendenti di Poste, non solo i portalettere)
    { name: "Prefetto", value: 109, aliases: ["Prefetta", "Viceprefetto"] }, // RGS Conto annuale, Carriera prefettizia 108.959, 2024 (comprende viceprefetti; nel 2023 era 138.493)
    { name: "Preside", value: 94, aliases: ["Dirigente scolastico", "Dirigente scolastica"] }, // RGS Conto annuale, Dirigenti scolastici 93.900, 2024
    { name: "Presidente della Repubblica", value: 239, aliases: ["Capo dello Stato"] }, // Quirinale, assegno personale previsto 239.182 lordi annui (Mattarella ne percepisce 179.836 per sua rinuncia), comunicato 2022
    { name: "Presidente di Regione", value: 166, aliases: ["Presidente della Regione", "Governatore"] }, // Camera dei deputati, trattamento complessivo presidenti di Regione 13.800 x 12 (tetto fissato dalla Conferenza Stato-Regioni), 2026
    { name: "Professore universitario", value: 77, aliases: ["Professoressa universitaria", "Docente universitario", "Docente universitaria"] }, // RGS Conto annuale, Professori universitari 76.545, 2024
    { name: "Psicologo", value: 26, aliases: ["Psicologa", "Psicoterapeuta"] }, // Itinerari Prev. tab. 2.9.1 Casse (Enpap) 26.000, 2024
    { name: "Psicologo dell'ASL", value: 72, aliases: ["Psicologa dell'ASL", "Psicologo ospedaliero", "Psicologa ospedaliera"] }, // RGS Conto annuale, SSN dirigenti psicologi 72.437, 2024
    { name: "Quadro metalmeccanico", value: 38, aliases: ["Quadro", "Quadro aziendale"] }, // CCNL Metalmeccanica industria, livello A1 (ex 8ª Quadri) 2.907,01 x 13, 2026 (esclusa l'indennità di funzione)
    { name: "Ragioniere", value: 66, aliases: ["Ragioniera"] }, // Itinerari Prev. tab. 2.9.1 Casse (Cassa Ragionieri) 65.897, 2024
    { name: "Ricercatore universitario", value: 51, aliases: ["Ricercatrice universitaria"] }, // RGS Conto annuale, Ricercatori universitari 51.303, 2024
    { name: "Rider", value: 24, aliases: ["Ciclofattorino", "Ciclofattorina"] }, // CCNL Logistica, rider in bicicletta (lettera I, parametro 116, dopo 6 mesi) 1.728,52 x 14, 2026 (molti rider lavorano con altri contratti, pagati a consegna)
    { name: "Ristoratore", value: 26, aliases: ["Ristoratrice", "Titolare di ristorante", "Titolare di pizzeria"] }, // Itinerari Prev. tab. 2.9.2 ISA 26,1k, 2024
    { name: "Segretaria", value: 25, aliases: ["Segretario"] }, // CCNL Terziario Confcommercio, 4° livello (impiegato d'ordine con mansioni di segreteria) 1.816,68 x 14, 2026
    { name: "Segretario comunale", value: 91, aliases: ["Segretaria comunale"] }, // RGS Conto annuale, Segretari comunali e provinciali 91.311, 2024
    { name: "Senatore", value: 125, aliases: ["Senatrice"] }, // Senato della Repubblica, indennità 10.385,31 x 12, 2026
    { name: "Sindaco di un piccolo comune", value: 26, aliases: ["Sindaca di un piccolo comune", "Sindaco di paese"] }, // L. 234/2021 c. 583: comuni fino a 3.000 abitanti, 16% di 13.800 = 2.208 x 12, 2026 (dimezzata per i lavoratori dipendenti non in aspettativa)
    { name: "Sindaco di una grande città", value: 166, aliases: ["Sindaca di una grande città", "Sindaco metropolitano", "Sindaco di città metropolitana", "Sindaco di Roma", "Sindaco di Milano"] }, // L. 234/2021 c. 583: sindaci metropolitani, 100% di 13.800 x 12, 2026
    { name: "Sportivo professionista", value: 250, aliases: ["Atleta professionista", "Calciatore", "Calciatrice"] }, // Itinerari Prev. tab. 2.9 INPS sportivi professionisti ~250k, 2024
    { name: "Tabaccaio", value: 51, aliases: ["Tabaccaia", "Titolare di tabaccheria"] }, // Itinerari Prev. tab. 2.9.2 ISA 50,7k, 2024
    { name: "Titolare di agriturismo", value: 18, aliases: ["Agriturismo"] }, // Itinerari Prev. tab. 2.9.2 ISA 17,7k, 2024
    { name: "Titolare di autoscuola", value: 39, aliases: ["Autoscuola", "Titolare di scuola guida"] }, // Itinerari Prev. tab. 2.9.2 ISA 39,2k, 2024
    { name: "Titolare di bar", value: 21, aliases: ["Gestore di bar", "Gelataio", "Gelataia", "Pasticciere", "Pasticciera"] }, // Itinerari Prev. tab. 2.9.2 ISA "Bar, gelaterie, pasticcerie" 20,5k, 2024
    { name: "Titolare di discoteca", value: 12, aliases: ["Gestore di discoteca", "Titolare di scuola di danza"] }, // Itinerari Prev. tab. 2.9.2 ISA 11,7k, 2024
    { name: "Titolare di ferramenta", value: 34, aliases: ["Ferramenta"] }, // Itinerari Prev. tab. 2.9.2 ISA 34,2k, 2024
    { name: "Titolare di lavanderia", value: 16, aliases: ["Titolare di tintoria", "Tintore"] }, // Itinerari Prev. tab. 2.9.2 ISA "Tintorie e lavanderie" 16,4k, 2024
    { name: "Titolare di sala giochi", value: 41, aliases: ["Gestore di sala giochi", "Sala giochi"] }, // Itinerari Prev. tab. 2.9.2 ISA "Gestori sale da gioco" 40,6k, 2024
    { name: "Titolare di stabilimento balneare", value: 28, aliases: ["Balneare", "Gestore di lido", "Gestore di stabilimento balneare"] }, // Itinerari Prev. tab. 2.9.2 ISA 27,8k, 2024
    { name: "Ufficiale giudiziario", value: 34, aliases: ["Ufficiale giudiziaria"] }, // Itinerari Prev. tab. 2.9 INPS "Ufficiali giudiziari" 34,00k, 2024
    { name: "Veterinario", value: 31, aliases: ["Veterinaria"] }, // Itinerari Prev. tab. 2.9.1 Casse (Enpav) 30.937, 2024
    { name: "Veterinario dell'ASL", value: 92, aliases: ["Veterinaria dell'ASL", "Veterinario pubblico"] }, // RGS Conto annuale, SSN dirigenti veterinari 91.790, 2024
    { name: "Vigile del fuoco", value: 42, aliases: ["Pompiere", "Vigilessa del fuoco"] }, // RGS Conto annuale, Vigili del fuoco 41.760, 2024
    { name: "Volontario dell'Esercito", value: 22, aliases: ["Volontaria dell'Esercito", "VFP", "Volontario in ferma prefissata"] }, // RGS Conto annuale, Esercito, militari di truppa e ufficiali in ferma prefissata 21.554, 2024
  ],
};
