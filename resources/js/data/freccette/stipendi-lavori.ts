import type { FrecceCategory } from "./types";

export const stipendiLavori: FrecceCategory = {
  id: "stipendi-lavori",
  title: "Quanto guadagna chi fa questo lavoro",
  unit: "migliaia di euro lordi all'anno",
  rule: "Nomina un lavoro: vale quanto guadagna in media in Italia in un anno, in migliaia di euro lordi arrotondati al migliaio. Per i dipendenti conta la retribuzione lorda annua media (o quella da contratto nazionale), per professionisti e titolari di attività il reddito medio dichiarato (il notaio vale 165, il barista 24).",
  start: 200,
  max: 76,
  source:
    "Professionisti iscritti alle Casse (tab. 2.9.1), sportivi e giornalisti dipendenti INPS (tab. 2.9) e lavoratori autonomi soggetti a ISA (tab. 2.9.2): Centro Studi Itinerari Previdenziali, Tredicesima indagine sulle entrate fiscali, settembre 2026, redditi 2024 — https://www.itinerariprevidenziali.it/wp-content/uploads/2026/09/Tredicesima-indagine-sulle-entrate-fiscali-1.pdf; " +
    "Dipendenti pubblici: Ragioneria Generale dello Stato, Conto annuale 2024, retribuzione media lordo dipendente per contratto/categoria (personale a tempo indeterminato), calcolata dagli open data con il metodo RGS (verificato sui valori 2023 pubblicati) — https://contoannuale.rgs.mef.gov.it/web/sicosito/download; " +
    "Deputato: Camera dei deputati, indennità parlamentare lorda 10.435 € al mese x 12 — https://www.camera.it/leg19/383?conoscerelacamera=4; " +
    "Dipendenti privati, minimi da CCNL a tempo pieno: Pubblici esercizi Fipe, 4° livello da giugno 2026 (1.692,69 € x 14) — https://www.lexplain.it/tabelle-retributive-ccnl-pubblici-esercizi-ristorazione-e-turismo-2024-2027/; Terziario Confcommercio, 4° livello da novembre 2026 (1.816,68 € x 14) — https://www.lexplain.it/tabelle-retributive-ccnl-commercio-2024-2027-dopo-il-rinnovo/; Metalmeccanica industria, livello D2 da giugno 2026 (1.979,37 € x 13) — https://www.dottrinalavoro.it/notizie-c/ccnl-metalmeccanica-industria-nuovi-minimi-tabellari-giugno-2026; Lavoro domestico, livello CS convivente dal 1° gennaio 2026 (1.193,84 € x 13) — https://www.informazionefiscale.it/colf-badanti-tabella-retribuzioni-2026-aumento-stipendio (dati al 20/11/2026)",
  answers: [
    { name: "Agente di commercio", value: 70, aliases: ["Rappresentante", "Rappresentante di commercio"] }, // Itinerari Prev. tab. 2.9.2 ISA "Intermediari del commercio" 69,5k, 2024
    { name: "Agente di polizia penitenziaria", value: 42, aliases: ["Guardia carceraria", "Secondino", "Polizia penitenziaria"] }, // RGS Conto annuale, Polizia penitenziaria 41.981, 2024
    { name: "Agente di viaggio", value: 30, aliases: ["Agente di viaggi", "Titolare di agenzia di viaggi"] }, // Itinerari Prev. tab. 2.9.2 ISA 29,5k, 2024
    { name: "Agente immobiliare", value: 49, aliases: ["Mediatore immobiliare"] }, // Itinerari Prev. tab. 2.9.2 ISA 48,9k, 2024
    { name: "Agronomo", value: 32, aliases: ["Agronoma", "Dottore agronomo", "Dottore forestale"] }, // Itinerari Prev. tab. 2.9.1 Casse 31.913, 2024
    { name: "Albergatore", value: 34, aliases: ["Albergatrice", "Titolare di albergo", "Titolare di hotel"] }, // Itinerari Prev. tab. 2.9.2 ISA 34,1k, 2024
    { name: "Amministratore di condominio", value: 54, aliases: ["Amministratrice di condominio"] }, // Itinerari Prev. tab. 2.9.2 ISA 53,7k, 2024
    { name: "Architetto", value: 38, aliases: ["Architetta"] }, // Itinerari Prev. tab. 2.9.1 Casse (Inarcassa) 38.192, 2024
    { name: "Avvocato", value: 52, aliases: ["Avvocata", "Avvocatessa", "Legale"] }, // Itinerari Prev. tab. 2.9.1 Casse (Cassa Forense) 51.912, 2024
    { name: "Avvocato dello Stato", value: 190, aliases: ["Avvocata dello Stato", "Avvocatura dello Stato"] }, // RGS Conto annuale, Avvocatura di Stato 189.531, 2024
    { name: "Badante", value: 16 }, // CCNL lavoro domestico, CS convivente 1.193,84 x 13, 2026
    { name: "Barista", value: 24, aliases: ["Barman", "Barwoman"] }, // CCNL Pubblici esercizi, 4° livello 1.692,69 x 14, 2026
    { name: "Benzinaio", value: 24, aliases: ["Benzinaia", "Gestore di distributore"] }, // Itinerari Prev. tab. 2.9.2 ISA 24,3k, 2024
    { name: "Biologo", value: 22, aliases: ["Biologa"] }, // Itinerari Prev. tab. 2.9.1 Casse 22.025, 2024
    { name: "Cameriere", value: 24, aliases: ["Cameriera"] }, // CCNL Pubblici esercizi, 4° livello 1.692,69 x 14, 2026
    { name: "Carabiniere", value: 45, aliases: ["Carabiniera"] }, // RGS Conto annuale, Carabinieri 45.227, 2024
    { name: "Chimico", value: 48, aliases: ["Chimica", "Fisico", "Fisica"] }, // Itinerari Prev. tab. 2.9.1 Casse "Chimici e Fisici" 47.963, 2024
    { name: "Commercialista", value: 97, aliases: ["Dottore commercialista", "Dottoressa commercialista"] }, // Itinerari Prev. tab. 2.9.1 Casse (CNPADC) 96.846, 2024
    { name: "Commesso", value: 25, aliases: ["Commessa", "Cassiere", "Cassiera"] }, // CCNL Terziario Confcommercio, 4° livello 1.816,68 x 14, 2026
    { name: "Consulente del lavoro", value: 59 }, // Itinerari Prev. tab. 2.9.1 Casse 59.386, 2024
    { name: "Dentista", value: 74, aliases: ["Odontoiatra"] }, // Itinerari Prev. tab. 2.9.1 Casse (Enpam odontoiatri) 74.200, 2024
    { name: "Deputato", value: 125, aliases: ["Deputata", "Parlamentare", "Onorevole"] }, // Camera dei deputati, indennità 10.435 x 12, 2026
    { name: "Diplomatico", value: 93, aliases: ["Diplomatica"] }, // RGS Conto annuale, Carriera diplomatica 92.964, 2024
    { name: "Edicolante", value: 17, aliases: ["Giornalaio", "Giornalaia"] }, // Itinerari Prev. tab. 2.9.2 ISA "Giornalai" 17,3k, 2024
    { name: "Erborista", value: 20 }, // Itinerari Prev. tab. 2.9.2 ISA 19,7k, 2024
    { name: "Estetista", value: 17 }, // Itinerari Prev. tab. 2.9.2 ISA 16,5k, 2024
    { name: "Farmacista titolare", value: 113, aliases: ["Farmacista", "Titolare di farmacia"] }, // Itinerari Prev. tab. 2.9.1 (stima su dati Federfarma) 112.525, 2024
    { name: "Finanziere", value: 46, aliases: ["Finanziera", "Guardia di Finanza"] }, // RGS Conto annuale, Guardia di Finanza 46.401, 2024
    { name: "Fioraio", value: 18, aliases: ["Fioraia", "Fiorista"] }, // Itinerari Prev. tab. 2.9.2 ISA 17,5k, 2024
    { name: "Geologo", value: 42, aliases: ["Geologa"] }, // Itinerari Prev. tab. 2.9.1 Casse 42.277, 2024
    { name: "Geometra", value: 40 }, // Itinerari Prev. tab. 2.9.1 Casse (Cipag) 40.381, 2024
    { name: "Gioielliere", value: 27, aliases: ["Gioielliera", "Orologiaio", "Orologiaia"] }, // Itinerari Prev. tab. 2.9.2 ISA 27,0k, 2024
    { name: "Giornalista", value: 70, aliases: ["Giornalista dipendente"] }, // Itinerari Prev. tab. 2.9 INPS ex Inpgi dipendenti 70.219, 2024
    { name: "Giornalista freelance", value: 18, aliases: ["Giornalista libero professionista"] }, // Itinerari Prev. tab. 2.9.1 Casse 18.341, 2024
    { name: "Guida turistica", value: 25, aliases: ["Guida"] }, // Itinerari Prev. tab. 2.9.2 ISA 25,2k, 2024
    { name: "Impiegato comunale", value: 34, aliases: ["Impiegata comunale", "Dipendente comunale"] }, // RGS Conto annuale, Regioni e autonomie locali 33.613, 2024
    { name: "Impiegato ministeriale", value: 37, aliases: ["Impiegata ministeriale", "Dipendente di un ministero"] }, // RGS Conto annuale, Ministeri 37.280, 2024
    { name: "Impresario di pompe funebri", value: 44, aliases: ["Titolare di pompe funebri", "Pompe funebri"] }, // Itinerari Prev. tab. 2.9.2 ISA 43,6k, 2024
    { name: "Infermiere", value: 36, aliases: ["Infermiera"] }, // RGS Conto annuale, SSN "Professionisti della salute e funzionari" 36.150, 2024
    { name: "Informatico freelance", value: 60, aliases: ["Informatico libero professionista", "Consulente informatico"] }, // Itinerari Prev. tab. 2.9.2 ISA "Informatici" 60,3k, 2024
    { name: "Ingegnere", value: 64, aliases: ["Ingegnera"] }, // Itinerari Prev. tab. 2.9.1 Casse (Inarcassa) 64.269, 2024
    { name: "Insegnante", value: 33, aliases: ["Docente", "Maestro", "Maestra", "Professore di scuola", "Professoressa di scuola"] }, // RGS Conto annuale, Scuola docenti di ruolo 32.908, 2024
    { name: "Macellaio", value: 19, aliases: ["Macellaia"] }, // Itinerari Prev. tab. 2.9.2 ISA 19,4k, 2024
    { name: "Magistrato", value: 154, aliases: ["Magistrata", "Giudice", "Pubblico ministero", "PM"] }, // RGS Conto annuale, Magistratura ordinaria 154.401, 2024
    { name: "Meccanico", value: 29, aliases: ["Meccanica", "Autoriparatore"] }, // Itinerari Prev. tab. 2.9.2 ISA 29,2k, 2024
    { name: "Medico", value: 91, aliases: ["Medica", "Medico ospedaliero", "Medica ospedaliera"] }, // RGS Conto annuale, SSN dirigenti medici 90.758, 2024
    { name: "Militare dell'Aeronautica", value: 48, aliases: ["Aviere", "Aeronautica militare"] }, // RGS Conto annuale, Aeronautica 48.213, 2024
    { name: "Militare dell'Esercito", value: 41, aliases: ["Soldato", "Soldatessa", "Militare"] }, // RGS Conto annuale, Esercito 40.925, 2024
    { name: "Militare della Marina", value: 51, aliases: ["Marinaio", "Marina militare"] }, // RGS Conto annuale, Marina 50.670, 2024
    { name: "Negoziante di abbigliamento", value: 17, aliases: ["Titolare di negozio di abbigliamento", "Negoziante di scarpe"] }, // Itinerari Prev. tab. 2.9.2 ISA 16,7k, 2024
    { name: "Negoziante di alimentari", value: 17, aliases: ["Alimentarista", "Salumiere", "Salumiera", "Droghiere"] }, // Itinerari Prev. tab. 2.9.2 ISA 17,4k, 2024
    { name: "Notaio", value: 165, aliases: ["Notaia", "Notaro"] }, // Itinerari Prev. tab. 2.9.1 Casse (Cassa del Notariato) 164.758, 2024
    { name: "Operaio metalmeccanico", value: 26, aliases: ["Operaia metalmeccanica", "Operaio", "Operaia", "Metalmeccanico"] }, // CCNL Metalmeccanica industria, livello D2 1.979,37 x 13, 2026
    { name: "Operatore socio-sanitario", value: 28, aliases: ["OSS", "Operatrice socio-sanitaria"] }, // RGS Conto annuale, SSN "Operatori" 28.421, 2024
    { name: "Panettiere", value: 28, aliases: ["Panettiera", "Fornaio", "Fornaia"] }, // Itinerari Prev. tab. 2.9.2 ISA 27,9k, 2024
    { name: "Parrucchiere", value: 18, aliases: ["Parrucchiera", "Acconciatore", "Acconciatrice", "Barbiere"] }, // Itinerari Prev. tab. 2.9.2 ISA "Acconciatori" 18,1k, 2024
    { name: "Perito industriale", value: 57 }, // Itinerari Prev. tab. 2.9.1 Casse 57.487, 2024
    { name: "Poliziotto", value: 45, aliases: ["Poliziotta", "Agente di polizia", "Polizia di Stato"] }, // RGS Conto annuale, Polizia di Stato 45.153, 2024
    { name: "Preside", value: 94, aliases: ["Dirigente scolastico", "Dirigente scolastica"] }, // RGS Conto annuale, Dirigenti scolastici 93.900, 2024
    { name: "Professore universitario", value: 77, aliases: ["Professoressa universitaria", "Docente universitario", "Docente universitaria"] }, // RGS Conto annuale, Professori universitari 76.545, 2024
    { name: "Psicologo", value: 26, aliases: ["Psicologa", "Psicoterapeuta"] }, // Itinerari Prev. tab. 2.9.1 Casse (Enpap) 26.000, 2024
    { name: "Ragioniere", value: 66, aliases: ["Ragioniera"] }, // Itinerari Prev. tab. 2.9.1 Casse (Cassa Ragionieri) 65.897, 2024
    { name: "Ricercatore universitario", value: 51, aliases: ["Ricercatrice universitaria"] }, // RGS Conto annuale, Ricercatori universitari 51.303, 2024
    { name: "Ristoratore", value: 26, aliases: ["Ristoratrice", "Titolare di ristorante", "Titolare di pizzeria"] }, // Itinerari Prev. tab. 2.9.2 ISA 26,1k, 2024
    { name: "Segretario comunale", value: 91, aliases: ["Segretaria comunale"] }, // RGS Conto annuale, Segretari comunali e provinciali 91.311, 2024
    { name: "Sportivo professionista", value: 250, aliases: ["Atleta professionista", "Calciatore", "Calciatrice"] }, // Itinerari Prev. tab. 2.9 INPS sportivi professionisti ~250k, 2024
    { name: "Tabaccaio", value: 51, aliases: ["Tabaccaia", "Titolare di tabaccheria"] }, // Itinerari Prev. tab. 2.9.2 ISA 50,7k, 2024
    { name: "Titolare di agriturismo", value: 18, aliases: ["Agriturismo"] }, // Itinerari Prev. tab. 2.9.2 ISA 17,7k, 2024
    { name: "Titolare di autoscuola", value: 39, aliases: ["Autoscuola", "Titolare di scuola guida"] }, // Itinerari Prev. tab. 2.9.2 ISA 39,2k, 2024
    { name: "Titolare di bar", value: 21, aliases: ["Gestore di bar", "Gelataio", "Gelataia", "Pasticciere", "Pasticciera"] }, // Itinerari Prev. tab. 2.9.2 ISA "Bar, gelaterie, pasticcerie" 20,5k, 2024
    { name: "Titolare di discoteca", value: 12, aliases: ["Gestore di discoteca", "Titolare di scuola di danza"] }, // Itinerari Prev. tab. 2.9.2 ISA 11,7k, 2024
    { name: "Titolare di ferramenta", value: 34, aliases: ["Ferramenta"] }, // Itinerari Prev. tab. 2.9.2 ISA 34,2k, 2024
    { name: "Titolare di lavanderia", value: 16, aliases: ["Titolare di tintoria", "Tintore"] }, // Itinerari Prev. tab. 2.9.2 ISA "Tintorie e lavanderie" 16,4k, 2024
    { name: "Titolare di stabilimento balneare", value: 28, aliases: ["Balneare", "Gestore di lido", "Gestore di stabilimento balneare"] }, // Itinerari Prev. tab. 2.9.2 ISA 27,8k, 2024
    { name: "Veterinario", value: 31, aliases: ["Veterinaria"] }, // Itinerari Prev. tab. 2.9.1 Casse (Enpav) 30.937, 2024
    { name: "Vigile del fuoco", value: 42, aliases: ["Pompiere", "Vigilessa del fuoco"] }, // RGS Conto annuale, Vigili del fuoco 41.760, 2024
  ],
};
