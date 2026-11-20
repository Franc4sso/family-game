import React, { useMemo, useState } from "react";
import type { Dispatch, ReactNode } from "react";
import type { GameAction } from "@/types/actions.types";
import type { FrecceCategory } from "@/data/freccette/types";
import { FRECCE_CATEGORIES, FRECCE_GROUPS } from "@/data/freccette";
import {
  FC_MAX_PLAYERS,
  FC_MIN_PLAYERS,
  createFreccette,
  ranking,
  searchAnswers,
  throwDart,
  type FrecceState,
} from "@/services/freccetteService";
import "../../../css/freccette.css";

interface FreccetteScreenProps {
  dispatch: Dispatch<GameAction>;
}

/** Punto delle migliaia anche sotto i 10.000 ("2.000", non "2000"); meno tipografico.
 *  Con `decimals` il valore intero è in decimi/centesimi: fmt(92, 1) → "9,2". */
const fmt = (n: number, decimals = 0) => {
  const abs = Math.abs(n);
  const unit = 10 ** decimals;
  const int = String(Math.floor(abs / unit)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const frac = decimals ? "," + String(abs % unit).padStart(decimals, "0") : "";
  return (n < 0 ? "−" : "") + int + frac;
};
const buzz = (pattern: number | number[]) => navigator.vibrate?.(pattern);

function Board({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 300" aria-hidden="true">
      <circle cx="150" cy="150" r="148" fill="#111111" />
      <circle cx="150" cy="150" r="118" fill="#C42E24" />
      <circle cx="150" cy="150" r="88" fill="#F4F1EA" />
      <circle cx="150" cy="150" r="58" fill="#1F8A4C" />
      <circle cx="150" cy="150" r="26" fill="#C42E24" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

/** Cornice: barra in alto con uscita, corpo, azioni fisse in basso. */
function Shell({ head, onExit, confirmExit, foot, children, decor }: {
  head?: ReactNode;
  onExit: () => void;
  confirmExit?: boolean;
  foot: ReactNode;
  children: ReactNode;
  decor?: boolean;
}) {
  const [asking, setAsking] = useState(false);
  return (
    <div className="fc">
      {decor && <Board className="fc-decor" />}
      <div className="fc-wrap">
        <div className="fc-top">
          <button type="button" className="fc-x" aria-label="Esci" onClick={() => (confirmExit ? setAsking(true) : onExit())}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          {head}
        </div>
        {children}
        <div className="fc-foot">{foot}</div>
      </div>
      {asking && (
        <div className="fc-scrim" role="dialog" aria-modal="true" aria-label="Uscire dalla partita?">
          <div className="fc-dialog">
            <p className="fc-display m-0 text-[34px]">Uscire dalla partita?</p>
            <p className="m-0 text-[15px]">I punteggi andranno persi.</p>
            <div className="flex gap-2.5">
              <button type="button" className="fc-btn ghost flex-1" onClick={() => setAsking(false)}>
                Resta
              </button>
              <button type="button" className="fc-btn flex-1" onClick={onExit}>
                Esci
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function GiroHead({ game }: { game: FrecceState }) {
  return (
    <div className="fc-head">
      <span className="fc-display flex-none whitespace-nowrap text-[22px]">{game.tiebreak ? `Spareggio${game.tiebreak.round > 1 ? ` ${game.tiebreak.round}` : ""}` : `Giro ${game.giro}`}</span>
      <span className="fc-head-cat">{game.category.title}</span>
    </div>
  );
}

/** Barre che si svuotano verso lo 0, in ordine di classifica o di lancio. */
function Bars({ game, order, highlight, ranked }: { game: FrecceState; order: number[]; highlight: number; ranked?: boolean }) {
  const start = game.category.start;
  return (
    <div className="fc-bars">
      {order.map((p, k) => {
        const s = game.scores[p];
        const pct = Math.max(0, Math.min(100, (s / start) * 100));
        return (
          <div key={p} className={`fc-bar ${p === highlight ? "on" : ""} ${s <= 0 ? "down" : ""}`}>
            {ranked && <span className="fc-bar-rank">{k + 1}</span>}
            <span className="fc-bar-name">{game.players[p]}</span>
            <span className="fc-bar-track">
              <i style={{ width: `${pct}%` }} />
            </span>
            <span className="fc-bar-val">{fmt(s, game.category.decimals)}</span>
          </div>
        );
      })}
    </div>
  );
}

export function FreccetteScreen({ dispatch }: FreccetteScreenProps) {
  const [names, setNames] = useState(["", "", ""]);
  const [step, setStep] = useState<"players" | "category">("players");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [game, setGame] = useState<FrecceState | null>(null);
  /** Stato prima dell'ultimo lancio: serve a mostrare l'esito e ad annullarlo. */
  const [prev, setPrev] = useState<FrecceState | null>(null);
  const [showFinal, setShowFinal] = useState(false);

  const exit = () => dispatch({ type: "CLEAR_MODE" });

  if (!game) {
    const clean = names.map((n, i) => n.trim() || `Giocatore ${i + 1}`);
    if (step === "players") {
      return <PlayersStep names={names} setNames={setNames} onBack={exit} onNext={() => setStep("category")} />;
    }
    return (
      <CategoryStep
        selected={categoryId}
        onSelect={setCategoryId}
        onBack={() => setStep("players")}
        onStart={(cat) => {
          setGame(createFreccette(clean, cat));
          setPrev(null);
          setShowFinal(false);
        }}
      />
    );
  }

  const again = () => {
    setGame(null);
    setPrev(null);
    setShowFinal(false);
    setStep("category");
  };

  if (game.winner !== null && (showFinal || !prev)) {
    return <Final game={game} onAgain={again} onExit={exit} />;
  }

  if (prev) {
    return (
      <Outcome
        prev={prev}
        game={game}
        onExit={exit}
        onUndo={() => {
          setGame(prev);
          setPrev(null);
        }}
        onNext={() => {
          if (game.winner !== null) setShowFinal(true);
          else setPrev(null);
        }}
      />
    );
  }

  return (
    <Turn
      game={game}
      onExit={exit}
      onThrow={(answer) => {
        buzz(answer === null ? [40, 60, 40] : 30);
        setPrev(game);
        setGame(throwDart(game, answer));
      }}
    />
  );
}

// ───────────────────────── Setup: giocatori ─────────────────────────

function PlayersStep({ names, setNames, onBack, onNext }: {
  names: string[];
  setNames: (n: string[]) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const rename = (i: number, v: string) => setNames(names.map((n, j) => (j === i ? v : n)));
  return (
    <Shell
      decor
      onExit={onBack}
      foot={
        <button type="button" className="fc-btn big flex-1" onClick={onNext}>
          Scegli la categoria
          <Arrow />
        </button>
      }
    >
      <h1 className="fc-title">
        Freccette
        <br />
        <span>Challenge</span>
      </h1>
      <p className="fc-lead">
        Si parte da un numero alto. A turno dite una risposta della categoria: il suo valore si toglie dal vostro totale. Chi arriva a 0 per primo chiude il giro, e
        vince chi è andato più sotto.
      </p>
      <div className="fc-label">Giocatori, in ordine di lancio</div>
      <div className="flex flex-col gap-2">
        {names.map((n, i) => (
          <div key={i} className="fc-player">
            <span className="fc-player-n">{i + 1}</span>
            <input
              aria-label={`Nome del giocatore ${i + 1}`}
              placeholder={`Giocatore ${i + 1}`}
              value={n}
              maxLength={16}
              onChange={(e) => rename(i, e.target.value)}
            />
            {names.length > FC_MIN_PLAYERS && (
              <button type="button" aria-label={`Togli il giocatore ${i + 1}`} onClick={() => setNames(names.filter((_, j) => j !== i))}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            )}
          </div>
        ))}
        {names.length < FC_MAX_PLAYERS && (
          <button type="button" className="fc-add" onClick={() => setNames([...names, ""])}>
            + Aggiungi giocatore
          </button>
        )}
      </div>
    </Shell>
  );
}

// ───────────────────────── Setup: categoria ─────────────────────────

function CategoryStep({ selected, onSelect, onBack, onStart }: {
  selected: string | null;
  onSelect: (id: string) => void;
  onBack: () => void;
  onStart: (c: FrecceCategory) => void;
}) {
  const [group, setGroup] = useState<string>(() => FRECCE_GROUPS.find((g) => g.ids.includes(selected ?? ""))?.id ?? FRECCE_GROUPS[0].id);
  const shown = FRECCE_GROUPS.find((g) => g.id === group)!.ids.map((id) => FRECCE_CATEGORIES.find((c) => c.id === id)!).filter(Boolean);
  const cat = FRECCE_CATEGORIES.find((c) => c.id === selected) ?? null;
  const random = () => {
    const pick = FRECCE_CATEGORIES[Math.floor(Math.random() * FRECCE_CATEGORIES.length)];
    onSelect(pick.id);
    setGroup(FRECCE_GROUPS.find((g) => g.ids.includes(pick.id))?.id ?? group);
  };
  return (
    <Shell
      onExit={onBack}
      head={<span className="fc-head-cat">{FRECCE_CATEGORIES.length} categorie</span>}
      foot={
        <div className="flex flex-1 flex-col gap-2.5">
          {cat && (
            <p className="fc-rule m-0">
              {cat.rule} Sopra {fmt(cat.max, cat.decimals)} è fuori bersaglio.
            </p>
          )}
          <div className="flex gap-2.5">
            <button type="button" className="fc-btn ghost" onClick={random}>
              A caso
            </button>
            <button type="button" className="fc-btn big flex-1" disabled={!cat} onClick={() => cat && onStart(cat)}>
              Lancia
              <Arrow />
            </button>
          </div>
        </div>
      }
    >
      <h1 className="fc-title small">Scegli la categoria</h1>
      <div className="fc-tabs" role="tablist" aria-label="Gruppi di categorie">
        {FRECCE_GROUPS.map((g) => (
          <button key={g.id} type="button" role="tab" aria-selected={g.id === group} className={g.id === group ? "on" : ""} onClick={() => setGroup(g.id)}>
            {g.label}
          </button>
        ))}
      </div>
      <div className="fc-grid">
        {shown.map((c) => (
          <button key={c.id} type="button" className={`fc-cat ${c.id === selected ? "on" : ""}`} aria-pressed={c.id === selected} onClick={() => onSelect(c.id)}>
            <span className="fc-cat-name">
              {c.title}
              <small>{c.unit}</small>
            </span>
            <span className="flex flex-col gap-1">
              <span className="fc-cat-start">{fmt(c.start, c.decimals)}</span>
              <small className="fc-cat-max">bersaglio fino a {fmt(c.max, c.decimals)}</small>
            </span>
          </button>
        ))}
      </div>
    </Shell>
  );
}

// ───────────────────────── Turno ─────────────────────────

function Turn({ game, onExit, onThrow }: { game: FrecceState; onExit: () => void; onThrow: (answer: number | null) => void }) {
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<number | null>(null);
  const hits = useMemo(() => searchAnswers(game, query), [game, query]);
  const player = game.turn;
  const name = game.players[player];
  const pickedAnswer = picked === null ? null : game.category.answers[picked];
  const first = game.throws.length === 0;
  const order = game.tiebreak ? game.tiebreak.players : game.players.map((_, i) => i);

  return (
    <Shell
      head={<GiroHead game={game} />}
      onExit={onExit}
      confirmExit
      foot={
        <>
          <button type="button" className="fc-btn ghost small" onClick={() => onThrow(null)}>
            Non c'è
            <br />
            turno perso
          </button>
          <button type="button" className="fc-btn big flex-[2]" disabled={picked === null} onClick={() => onThrow(picked)}>
            {pickedAnswer ? `Lancia ${pickedAnswer.name}` : "Scegli la risposta"}
          </button>
        </>
      }
    >
      {first && (
        <div className="fc-readout">
          <b>Da leggere ad alta voce</b>
          {game.category.rule} Si parte da {fmt(game.category.start, game.category.decimals)}. Chi dice una risposta che vale più di {fmt(game.category.max, game.category.decimals)} va fuori bersaglio e perde il turno.
        </div>
      )}
      {game.tiebreak && (
        <div className="fc-readout">
          <b>Spareggio</b>
          {game.tiebreak.players.map((p) => game.players[p]).join(", ")} sono a pari valore. Una risposta a testa: vince il valore più alto.
        </div>
      )}
      {!game.tiebreak && <Bars game={game} order={order} highlight={player} />}

      <div className="fc-now">
        <div className="flex min-w-0 flex-col gap-1">
          <span className="fc-now-label">Tocca a</span>
          <span className="fc-now-name">{name}</span>
        </div>
        <span className={`fc-now-score ${fmt(game.scores[player], game.category.decimals).length > 4 ? "long" : ""}`}>{fmt(game.scores[player], game.category.decimals)}</span>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="fc-search" className="fc-label">
          Cosa ha detto {name}?
        </label>
        <input
          id="fc-search"
          className="fc-search"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder="Scrivi le prime lettere…"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPicked(null);
          }}
        />
        {hits.length > 0 && (
          <div className="fc-hits">
            {hits.map((h) => (
              <button
                key={h.index}
                type="button"
                disabled={h.usedBy !== null}
                className={h.index === picked ? "on" : ""}
                onClick={() => setPicked(h.index)}
              >
                <span className="min-w-0">
                  <span className={h.usedBy !== null ? "line-through" : ""}>{h.answer.name}</span>
                  {h.via && <small> · {h.via}</small>}
                </span>
                {h.usedBy !== null ? (
                  <small>già detta da {game.players[h.usedBy]}</small>
                ) : (
                  h.index === picked && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  )
                )}
              </button>
            ))}
          </div>
        )}
        {query.trim() !== "" && hits.length === 0 && <p className="fc-hint m-0">Nessuna risposta trovata: se non è in lista, il turno è perso.</p>}
        {query.trim() === "" && <p className="fc-hint m-0">Il valore si scopre solo dopo il lancio. Sopra {fmt(game.category.max, game.category.decimals)}: fuori bersaglio.</p>}
      </div>
    </Shell>
  );
}

// ───────────────────────── Esito del lancio ─────────────────────────

function Outcome({ prev, game, onExit, onUndo, onNext }: {
  prev: FrecceState;
  game: FrecceState;
  onExit: () => void;
  onUndo: () => void;
  onNext: () => void;
}) {
  const t = game.throws[game.throws.length - 1];
  const name = game.players[t.player];
  const answer = t.answer === null ? null : game.category.answers[t.answer];
  const rankBefore = ranking(prev).indexOf(t.player) + 1;
  const order = ranking(game);
  const rankAfter = order.indexOf(t.player) + 1;

  let note: string;
  if (t.offBoard) note = `${answer!.name} vale ${fmt(answer!.value, game.category.decimals)}, oltre il tetto di ${fmt(game.category.max, game.category.decimals)}: fuori bersaglio, turno perso.`;
  else if (t.tiebreak) note = answer ? `${name} lancia ${fmt(t.value, game.category.decimals)} nello spareggio.` : `Fuori lista: nello spareggio vale 0.`;
  else if (!answer) note = `Non era in lista: turno perso, ${name} resta a ${fmt(t.after, game.category.decimals)}.`;
  else if (t.after <= 0) note = `${name} ha sfondato lo zero! Si finisce il giro: vince chi va più sotto.`;
  else if (rankAfter < rankBefore) note = `${name} passa dal ${rankBefore}° al ${rankAfter}° posto.`;
  else if (rankAfter === 1) note = `${name} resta il più vicino allo 0.`;
  else note = `${name} è ${rankAfter}° in classifica.`;

  // Come continua: chi ha lanciato in questo giro, chi tocca, chi manca
  const giroPlayers = prev.tiebreak ? prev.tiebreak.players : prev.players.map((_, i) => i);
  const donePos = giroPlayers.indexOf(t.player);
  const giroClosed = !prev.tiebreak && game.giro !== prev.giro;

  let cta: string;
  if (game.winner !== null) cta = "Chi ha vinto?";
  else if (game.tiebreak && (!prev.tiebreak || game.tiebreak.round !== prev.tiebreak.round)) cta = "Allo spareggio";
  else cta = `Tocca a ${game.players[game.turn]}`;

  let continues: string;
  if (game.winner !== null) continues = "La partita è finita.";
  else if (game.tiebreak && (!prev.tiebreak || game.tiebreak.round !== prev.tiebreak.round)) continues = "Pari valore sotto lo zero: si va allo spareggio.";
  else if (giroClosed) continues = `Nessuno è arrivato a 0: si passa al giro ${game.giro}.`;
  else if (game.scores.some((s) => s <= 0)) continues = "Qualcuno è già sotto lo zero: si finisce il giro.";
  else continues = "Nessuno è ancora arrivato a 0: si continua.";

  return (
    <Shell
      head={<GiroHead game={prev} />}
      onExit={onExit}
      confirmExit
      foot={
        <>
          <button type="button" className="fc-btn ghost small" onClick={onUndo}>
            Annulla
          </button>
          <button type="button" className="fc-btn big flex-[2]" onClick={onNext}>
            {cta}
            <Arrow />
          </button>
        </>
      }
    >
      <div className="fc-result">
        <span className="fc-now-label">{t.offBoard ? "Fuori bersaglio" : `${name} ha detto`}</span>
        <div className="fc-result-row">
          <span className="fc-result-name">{answer ? answer.name : "Fuori lista"}</span>
          <span className={`fc-result-val ${t.offBoard ? "off" : ""}`}>{t.offBoard ? fmt(answer!.value, game.category.decimals) : answer ? `−${fmt(t.value, game.category.decimals)}` : "0"}</span>
        </div>
        {!t.tiebreak && (
          <div className="fc-result-math">
            <s>{fmt(t.before, game.category.decimals)}</s>
            <Arrow />
            <b className={fmt(t.after, game.category.decimals).length > 4 ? "long" : ""}>{fmt(t.after, game.category.decimals)}</b>
            <span>{t.after > 0 ? "mancano per lo 0" : "sotto lo zero"}</span>
          </div>
        )}
      </div>

      <div className={`fc-note ${!answer || t.offBoard ? "bad" : ""}`}>{note}</div>

      {!t.tiebreak && (
        <div className="flex flex-col gap-2">
          <div className="fc-label">Classifica · chi è più vicino</div>
          <Bars game={game} order={order} highlight={t.player} ranked />
        </div>
      )}

      <div className="fc-next">
        <span className="fc-label">{prev.tiebreak ? "Spareggio" : `Come continua il giro ${prev.giro}`}</span>
        <div className="fc-chain">
          {giroPlayers.map((p, k) => (
            <React.Fragment key={p}>
              {k > 0 && <i>›</i>}
              <span className={k <= donePos ? "done" : p === game.turn && !giroClosed && game.winner === null ? "next" : ""}>{game.players[p]}</span>
            </React.Fragment>
          ))}
          {!prev.tiebreak && game.winner === null && !game.tiebreak && !prev.scores.some((s) => s <= 0) && !game.scores.some((s) => s <= 0) && <i>› poi giro {prev.giro + 1}</i>}
        </div>
        <p className="fc-hint m-0">{continues}</p>
      </div>
    </Shell>
  );
}

// ───────────────────────── Finale ─────────────────────────

function Final({ game, onAgain, onExit }: { game: FrecceState; onAgain: () => void; onExit: () => void }) {
  const w = game.winner!;
  const last = [...game.throws].reverse().find((t) => t.player === w && !t.tiebreak)!;
  const lastAnswer = last.answer === null ? null : game.category.answers[last.answer];
  const above = game.players.map((_, i) => i).filter((i) => game.scores[i] > 0).sort((a, b) => game.scores[b] - game.scores[a]);
  const below = game.players.map((_, i) => i).filter((i) => game.scores[i] <= 0).sort((a, b) => game.scores[b] - game.scores[a]);
  const hadTiebreak = game.throws.some((t) => t.tiebreak);
  const sole = below.length <= 1;

  return (
    <Shell
      onExit={onExit}
      head={<span className="fc-head-cat">Giro {game.giro} · {below.length === 1 ? "uno sotto lo zero" : `${below.length} sotto lo zero`}</span>}
      foot={
        <>
          <button type="button" className="fc-btn ghost small" onClick={onExit}>
            Esci
          </button>
          <button type="button" className="fc-btn big dark flex-[2]" onClick={onAgain}>
            Nuova categoria
          </button>
        </>
      }
    >
      <h1 className="fc-title">
        {game.players[w]}
        <br />
        <span>vince</span>
      </h1>
      <p className="fc-lead">
        {hadTiebreak
          ? "Ha vinto lo spareggio."
          : sole
            ? `Ha sfondato lo zero da ${fmt(last.before, game.category.decimals)}${lastAnswer ? ` con ${lastAnswer.name} (${fmt(last.value, game.category.decimals)})` : ""}.`
            : `È andato più sotto di tutti: da ${fmt(last.before, game.category.decimals)}${lastAnswer ? ` con ${lastAnswer.name} (${fmt(last.value, game.category.decimals)})` : ""}.`}
      </p>

      <div className="fc-final">
        {above.map((p) => (
          <div key={p} className="fc-final-row">
            <span>{game.players[p]}</span>
            <b>{fmt(game.scores[p], game.category.decimals)}</b>
          </div>
        ))}
        <div className="fc-zero">
          <b>0</b>
          <i />
          <span>Linea di tiro</span>
        </div>
        {below.map((p) => (
          <div key={p} className={`fc-final-row ${p === w ? "win" : ""}`}>
            <span>{game.players[p]}</span>
            <b>{fmt(game.scores[p], game.category.decimals)}</b>
          </div>
        ))}
      </div>
      <p className="fc-hint m-0">Più si scende sotto lo zero, meglio è. A pari valore: lancio di spareggio.</p>
    </Shell>
  );
}
