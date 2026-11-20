import type { FrecceCategory } from "./types";
import { calorieBruciate } from "./calorie-bruciate";
import { canzoniDurata } from "./canzoni-durata";
import { capitaliDistanzaRoma } from "./capitali-distanza-roma";
import { cartoniEta } from "./cartoni-eta";
import { cibiCalorie } from "./cibi-calorie";
import { cibiPrezzoChilo } from "./cibi-prezzo-chilo";
import { classiciDisneyNumero } from "./classici-disney-numero";
import { concertiSpettatori } from "./concerti-spettatori";
import { dragonballLivelloCombattimento } from "./dragonball-livello-combattimento";
import { eventiStoriciAnno } from "./eventi-storici-anno";
import { filmDurata } from "./film-durata";
import { filmMorti } from "./film-morti";
import { filmVotoImdb } from "./film-voto-imdb";
import { harrypotterPersonaggiNumeroFilm } from "./harrypotter-personaggi-numero-film";
import { harrypotterEtaMorte } from "./harrypotter-eta-morte";
import { harrypotterMinuti } from "./harrypotter-minuti";
import { invenzioniAnno } from "./invenzioni-anno";
import { marvelAttoriEta } from "./marvel-attori-eta";
import { marvelFilmPersonaggi } from "./marvel-film-personaggi";
import { marvelMinuti } from "./marvel-minuti";
import { personaggiUccisioni } from "./personaggi-uccisioni";
import { programmiTvEdizioni } from "./programmi-tv-edizioni";
import { sagheDurata } from "./saghe-durata";
import { sanremoConduzioni } from "./sanremo-conduzioni";
import { serieTvEpisodi } from "./serie-tv-episodi";
import { serieTvVotoImdb } from "./serie-tv-voto-imdb";
import { spotifyStream } from "./spotify-stream";
import { statiAbitanti } from "./stati-abitanti";
import { stipendiLavori } from "./stipendi-lavori";
import { youtubeVisualizzazioni } from "./youtube-visualizzazioni";

/** Gruppi per le linguette della scelta categoria, nell'ordine in cui compaiono. */
const GROUPS: { id: string; label: string; categories: FrecceCategory[] }[] = [
  { id: "schermo", label: "Serie TV e film", categories: [serieTvEpisodi, serieTvVotoImdb, programmiTvEdizioni, filmDurata, sagheDurata, filmVotoImdb, filmMorti, personaggiUccisioni, cartoniEta] },
  {
    id: "saghe",
    label: "Saghe e fandom",
    categories: [
      harrypotterMinuti, harrypotterPersonaggiNumeroFilm, harrypotterEtaMorte,
      marvelMinuti, marvelFilmPersonaggi, marvelAttoriEta, classiciDisneyNumero, dragonballLivelloCombattimento,
    ],
  },
  { id: "musica", label: "Musica", categories: [canzoniDurata, spotifyStream, youtubeVisualizzazioni, concertiSpettatori, sanremoConduzioni] },
  { id: "storia", label: "Storia", categories: [eventiStoriciAnno, invenzioniAnno] },
  { id: "mondo", label: "Mondo", categories: [statiAbitanti, capitaliDistanzaRoma] },
  { id: "vita", label: "Vita di tutti i giorni", categories: [stipendiLavori, cibiPrezzoChilo, cibiCalorie, calorieBruciate] },
].filter((g) => g.categories.length > 0);

export const FRECCE_CATEGORIES: FrecceCategory[] = GROUPS.flatMap((g) => g.categories);

export const FRECCE_GROUPS: { id: string; label: string; ids: string[] }[] = GROUPS.map((g) => ({ id: g.id, label: g.label, ids: g.categories.map((c) => c.id) }));
