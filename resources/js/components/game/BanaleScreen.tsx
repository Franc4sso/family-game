import React, { useEffect, useLayoutEffect, useMemo, useReducer, useRef, useState } from "react";
import type { Dispatch, ReactNode } from "react";
import type { GameAction } from "@/types/actions.types";
import {
  BANALE_DECK,
  BOG_HELP_AFTER,
  BOG_MAX_TEAMS,
  BOG_MIN_TEAMS,
  BOG_WIN_AT,
  askConcept,
  bogReducer,
  bogScore,
  cap,
  isTiebreak,
  matchOver,
  matchWinner,
  teamRef,
  type BogAction,
  type BogHistory,
  type BogMode,
  type BogState,
} from "@/services/banaleService";
import "../../../css/banale.css";

interface BanaleScreenProps {
  dispatch: Dispatch<GameAction>;
}

const MODE_LABEL: Record<BogMode, string> = { banale: "Banale", geniale: "Geniale", bersaglio: "Bersaglio" };
const ruleText = (m: BogMode, n: number) =>
  m === "banale"
    ? "Vince la risposta più comune: quella che direbbero tutti."
    : m === "geniale"
      ? "Vince la risposta più rara: quella che direbbe uno su cento."
      : `Vince la risposta che darebbero circa ${n} persone su 100.`;
const modeName = (m: BogMode, t: number) => (m === "bersaglio" ? `Bersaglio ${t}` : MODE_LABEL[m]);
const DRUM: BogMode[] = ["banale", "geniale", "bersaglio", "banale", "geniale", "bersaglio"];
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const initial = (t: string) => (t.trim()[0] || "?").toUpperCase();

/* ─── Arena: 100 pedine in isometria, si alzano secondo la regola ─── */

type ArenaKind = { kind: "idle" } | { kind: "off" } | { kind: BogMode; n?: number } | { kind: "all"; color: BogMode };

const PAWNS = Array.from({ length: 100 }, (_, i) => ({ r: Math.floor(i / 10), k: i % 10, bob: (Math.random() * -2.6).toFixed(2) + "s" }));
/* Da davanti a dietro: Bersaglio N accende le N pedine più vicine. */
const BY_FRONT = PAWNS.map((_, i) => i).sort((a, b) => PAWNS[b].r + PAWNS[b].k - (PAWNS[a].r + PAWNS[a].k));

function Arena({ view, setup, hidden }: { view: ArenaKind; setup?: boolean; hidden?: boolean }) {
  const stage = useRef<HTMLDivElement>(null);
  const [k, setK] = useState(1);
  useLayoutEffect(() => {
    const el = stage.current;
    if (!el) return;
    const fit = () => setK(Math.min(1.15, el.clientWidth / 330, el.clientHeight / 205));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const lit = new Set<number>();
  let star = -1;
  let color: BogMode = "banale";
  if (view.kind === "idle") {
    PAWNS.forEach((_, i) => (i * 37) % 100 < 58 && lit.add(i));
    star = 54;
    lit.delete(54);
  } else if (view.kind === "banale") PAWNS.forEach((_, i) => lit.add(i));
  else if (view.kind === "all") {
    PAWNS.forEach((_, i) => lit.add(i));
    color = view.color;
  } else if (view.kind === "geniale") star = 44;
  else if (view.kind === "bersaglio") {
    BY_FRONT.slice(0, view.n ?? 50).forEach((i) => lit.add(i));
    color = "bersaglio";
  }

  return (
    <div ref={stage} className={`bog-stage ${setup ? "setup" : ""} ${hidden ? "off" : ""}`} aria-hidden="true">
      <div className="bog-scaler" style={{ "--k": k.toFixed(3) } as React.CSSProperties}>
        <div className="bog-plane">
          {PAWNS.map((p, i) => {
            const cls = i === star ? "on star c-geniale" : lit.has(i) ? `on c-${color}` : "";
            return (
              <div key={i} className="bog-cell">
                <div className={`bog-pawn ${cls}`} style={{ "--d": `${(p.r + p.k) * 28}ms`, "--b": p.bob } as React.CSSProperties}>
                  <div className="bog-fig" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Lock() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}

function Chip({ mode, target }: { mode: BogMode; target: number }) {
  return (
    <span className="bog-chip">
      <i />
      {modeName(mode, target)}
    </span>
  );
}

/* ─── Schermata ─── */

export function BanaleScreen({ dispatch }: BanaleScreenProps) {
  const [teams, setTeams] = useState<string[]>(["Rossi", "Blu"]);
  const [rounds, setRounds] = useState(3);
  const [game, act] = useReducer(bogReducer, null);
  const [asking, setAsking] = useState(false);
  const [sheet, setSheet] = useState<BogHistory | null>(null);

  const exit = () => dispatch({ type: "CLEAR_MODE" });
  const toSetup = () => {
    if (game) setTeams(game.teams);
    act({ type: "reset" });
  };

  useEffect(() => setSheet(null), [game?.screen]);

  let arena: ArenaKind = { kind: "idle" };
  let showArena = true;
  if (game) {
    if (game.screen === "draw") arena = game.spun ? { kind: game.mode, n: game.target } : { kind: "off" };
    else if (game.screen === "roundEnd") arena = { kind: "all", color: game.mode };
    else if (game.screen === "win") arena = { kind: "banale" };
    else showArena = false;
  }

  let top: ReactNode = <span className="bog-top-l">Una serata, da 2 a 4 squadre</span>;
  if (game) {
    const rn = isTiebreak(game) ? "Spareggio" : game.rounds > 1 ? `Round ${game.roundNo} di ${game.rounds}` : "Round unico";
    top = (
      <>
        <span className="bog-top-l">{rn}</span>
        <span className="bog-top-r">
          {game.teams.map((t, i) => (
            <React.Fragment key={i}>
              {i > 0 && " "}
              {t} <b>{game.sets[i]}</b>
            </React.Fragment>
          ))}
        </span>
      </>
    );
  }

  return (
    <div className={`bog ${game ? `bog-m-${game.mode}` : ""}`}>
      <div className="bog-app">
        <div className="bog-top">
          <button type="button" className="bog-x" aria-label="Esci" onClick={() => (game && game.screen !== "win" ? setAsking(true) : exit())}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          {top}
        </div>
        <Arena view={arena} setup={!game} hidden={!showArena} />
        <div className="bog-screen">
          {!game && (
            <Setup
              teams={teams}
              setTeams={setTeams}
              rounds={rounds}
              setRounds={setRounds}
              onStart={() => act({ type: "start", teams: teams.map((t, i) => t.trim() || `Squadra ${i + 1}`), rounds })}
            />
          )}
          {game?.screen === "draw" && <Draw game={game} act={act} />}
          {game?.screen === "answers" && <Answers game={game} act={act} />}
          {game?.screen === "reveal" && <Reveal key={game.history.length} game={game} act={act} onList={setSheet} />}
          {game?.screen === "score" && <Score game={game} act={act} />}
          {game?.screen === "roundEnd" && <RoundEnd game={game} act={act} />}
          {game?.screen === "win" && <Win game={game} act={act} onTeams={toSetup} />}
        </div>
      </div>

      <ListSheet h={sheet} teams={game?.teams ?? []} onClose={() => setSheet(null)} />

      {asking && (
        <div className="bog-scrim" role="dialog" aria-modal="true" aria-label="Uscire dalla partita?">
          <div className="bog-dialog">
            <p className="bog-logo bog-ext-w" style={{ fontSize: 30 }}>
              Uscire dalla partita?
            </p>
            <p className="bog-sub">I punti e i round vinti andranno persi.</p>
            <div className="bog-btns">
              <button type="button" className="bog-btn small ghost" onClick={() => setAsking(false)}>
                Resta
              </button>
              <button type="button" className="bog-btn small" onClick={exit}>
                Esci
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

type Act = Dispatch<BogAction>;

function Setup({ teams, setTeams, rounds, setRounds, onStart }: {
  teams: string[];
  setTeams: (t: string[]) => void;
  rounds: number;
  setRounds: (n: number) => void;
  onStart: () => void;
}) {
  const add = () => setTeams([...teams, ["Verdi", "Gialli", "Viola"].find((n) => !teams.includes(n)) ?? "Squadra"]);
  return (
    <>
      <h1 className="bog-logo" style={{ fontSize: "clamp(44px, 13vw, 58px)" }}>
        <span className="bog-ext-b">Banale</span> <span className="bog-ext-w" style={{ fontSize: ".55em" }}>o</span>
        <br />
        <span className="bog-ext-g">Geniale</span>
      </h1>
      <p className="bog-sub bog-tagline">Indovinate quello che direbbero tutti, o quello che non direbbe nessuno.</p>
      <div className="bog-teams">
        {teams.map((t, i) => (
          <label key={i} className="bog-team-in">
            <span className="bog-badge">{initial(t)}</span>
            <input
              value={t}
              maxLength={14}
              aria-label={`Nome squadra ${i + 1}`}
              onChange={(e) => setTeams(teams.map((x, j) => (j === i ? e.target.value : x)))}
            />
            {teams.length > BOG_MIN_TEAMS && (
              <button
                type="button"
                className="bog-del"
                aria-label={`Togli ${t}`}
                onClick={(e) => {
                  e.preventDefault();
                  setTeams(teams.filter((_, j) => j !== i));
                }}
              >
                ×
              </button>
            )}
          </label>
        ))}
        {teams.length < BOG_MAX_TEAMS && (
          <button type="button" className="bog-add" onClick={add}>
            + Aggiungi squadra
          </button>
        )}
      </div>
      <div className="bog-seg">
        <p className="bog-label">Quanti round? Ognuno ha una regola sola e lo vince chi arriva a {BOG_WIN_AT}.</p>
        <div className="bog-seg-row" role="radiogroup" aria-label="Numero di round">
          {[1, 3, 5].map((n) => (
            <button key={n} type="button" role="radio" aria-checked={rounds === n} onClick={() => setRounds(n)}>
              {n} round
            </button>
          ))}
        </div>
      </div>
      <div className="bog-fill" />
      <button type="button" className="bog-btn" onClick={onStart}>
        Gioca
      </button>
    </>
  );
}

/** Rullo della regola: gira solo alla prima domanda del round. La rotazione resta tra un round e l'altro. */
let drumRot = 0;

function Draw({ game, act }: { game: BogState; act: Act }) {
  const drum = useRef<HTMLDivElement>(null);
  const [rot, setRot] = useState(drumRot);
  useEffect(() => {
    if (game.spun) return;
    /* Almeno tre giri all'indietro da dove si trova, poi si ferma sulla faccia della regola. */
    const idx = ["banale", "geniale", "bersaglio"].indexOf(game.mode) + (Math.random() < 0.5 ? 0 : 3);
    const next = (Math.floor(drumRot / 360) - 3) * 360 - idx * 60;
    drumRot = next;
    let landed = false;
    const land = () => {
      if (landed) return;
      landed = true;
      act({ type: "landed" });
    };
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setRot(next)));
    const el = drum.current;
    el?.addEventListener("transitionend", land, { once: true });
    const timer = window.setTimeout(land, reducedMotion() ? 50 : 2500);
    return () => {
      cancelAnimationFrame(raf);
      el?.removeEventListener("transitionend", land);
      window.clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.qn]);

  const first = game.teams[game.order[0]];
  const rest = game.order.slice(1).map((t) => teamRef(game.teams[t]));
  return (
    <>
      <p className="bog-label" style={{ textAlign: "center" }}>
        {game.qInRound === 1 ? (isTiebreak(game) ? "Spareggio: la regola è" : `Round ${game.roundNo}: la regola è`) : `Domanda ${game.qInRound} del round, la regola resta`}
      </p>
      <div className="bog-drum-wrap" aria-live="polite">
        <div ref={drum} className="bog-drum" style={{ transform: `rotateX(${rot}deg)` }}>
          {DRUM.map((m, i) => (
            <div key={i} className={`bog-face bog-m-${m}`} style={{ transform: `rotateX(${i * 60}deg) translateZ(68px)` }}>
              {MODE_LABEL[m]}
              {m === "bersaglio" && <em>{game.target}</em>}
            </div>
          ))}
        </div>
      </div>
      <p className="bog-rule" style={{ opacity: game.spun ? 1 : 0 }}>
        {ruleText(game.mode, game.target)}
      </p>
      <div className={`bog-qcard ${game.spun ? "" : "pre"}`}>
        <p className="bog-label">Leggila ad alta voce</p>
        <h2>{game.q.q}</h2>
        <p>
          Iniziano {teamRef(first)}, poi {rest.join(", ")}.
        </p>
      </div>
      <div className="bog-fill" />
      <button type="button" className="bog-btn mode" disabled={!game.spun} onClick={() => act({ type: "collect" })}>
        Raccogli le risposte
      </button>
    </>
  );
}

function Answers({ game, act }: { game: BogState; act: Act }) {
  const [text, setText] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const done = game.turn >= game.order.length;
  const cur = game.order[game.turn];

  /* Dopo un errore il testo resta selezionato, pronto da riscrivere; dopo una risposta buona si svuota. */
  useEffect(() => {
    setText("");
  }, [game.turn]);
  useEffect(() => {
    if (game.err && !game.suggest && !game.aiPending) input.current?.select();
  }, [game.tries.length, game.err, game.suggest, game.aiPending]);

  /* Il controllo locale non l'ha trovata: si chiede all'LLM se il concetto è in lista. */
  useEffect(() => {
    const said = game.aiPending;
    if (!said) return;
    let alive = true;
    const used = new Set(game.given.filter(Boolean).map((g) => g!.name));
    const free = game.q.a.filter((a) => !used.has(a.name)).map((a) => a.name);
    askConcept(game.q, free, said).then((name) => alive && act({ type: "aiResult", said, name }));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game.aiPending]);

  const row = (t: number, i: number) => {
    const g = game.given[t];
    if (g) {
      const note = [game.teams[t], g.help ? "con aiutino" : g.said ? `detto «${g.said}»` : ""].filter(Boolean).join(", ");
      return (
        <div key={t} className="bog-turn">
          <span className="bog-badge">{initial(game.teams[t])}</span>
          <div className="bog-who">
            <small>{note}</small>
            <span>{g.name}</span>
          </div>
          {!done && i === game.turn - 1 ? (
            <button type="button" className="bog-fix" onClick={() => act({ type: "undo" })}>
              Correggi
            </button>
          ) : (
            <span className="bog-sealed">
              <Lock /> punti coperti
            </span>
          )}
        </div>
      );
    }
    if (i === game.turn) return null;
    return (
      <div key={t} className="bog-turn wait">
        <span className="bog-badge">{initial(game.teams[t])}</span>
        <div className="bog-who">
          <small>{game.teams[t]}</small>
          <span>dopo</span>
        </div>
      </div>
    );
  };
  const before = game.order.slice(0, game.turn).map((t, i) => row(t, i));
  const after = game.order.slice(game.turn + 1).map((t, i) => row(t, i + game.turn + 1));

  const shown = game.tries.slice(-3);
  const hidden = game.tries.length - shown.length;
  const canHelp = game.tries.length >= BOG_HELP_AFTER;
  const cost = game.mode === "bersaglio" ? "la distanza conta doppio" : "valgono metà punti";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) act({ type: "submit", text });
  };

  return (
    <>
      <div className="bog-qmini">
        <Chip mode={game.mode} target={game.target} />
        <h2>{game.q.q}</h2>
      </div>
      <div className="bog-scroll">
        {before.length > 0 && <div className="bog-turns">{before}</div>}
        {!done && (
          <>
            <div className="bog-turn now">
              <span className="bog-badge">{initial(game.teams[cur])}</span>
              <div className="bog-who">
                <small>Tocca a loro</small>
                <span>{game.teams[cur]}</span>
              </div>
            </div>
            {game.helpOpen && game.helpSaved ? (
              <div className="bog-pickbox">
                <p className="bog-label">Aiutino: scegliete una di queste. Le risposte con aiutino {cost}.</p>
                <div className="bog-opts">
                  {game.helpSaved.map((o, i) => (
                    <button key={o.name} type="button" className="bog-opt" onClick={() => act({ type: "pickHelp", index: i })}>
                      {o.name}
                    </button>
                  ))}
                </div>
                <button type="button" className="bog-linkish" onClick={() => act({ type: "closeHelp" })}>
                  Torna a scrivere
                </button>
              </div>
            ) : (
              <form className="bog-entry" autoComplete="off" onSubmit={submit}>
                <input
                  ref={input}
                  className={game.err ? "bad" : ""}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Scrivi la risposta"
                  aria-label={`Risposta di ${game.teams[cur]}`}
                  enterKeyHint="done"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                />
                {game.tries.length > 0 && (
                  <div className="bog-tries">
                    {hidden > 0 && <span>altre {hidden}</span>}
                    {shown.map((x, i) => (
                      <span key={i}>
                        <s>{x.t}</s> {x.why}
                      </span>
                    ))}
                  </div>
                )}
                <p className={`bog-err ${game.aiPending ? "wait" : ""}`} role="status">
                  {game.err}
                </p>
                {game.suggest ? (
                  <div className="bog-pickbox">
                    <div className="bog-opts three like">
                      {game.suggest.options.map((o, i) => (
                        <button key={o.name} type="button" className="bog-opt" onClick={() => act({ type: "pickSuggest", index: i })}>
                          Vale come «{o.name}»
                        </button>
                      ))}
                    </div>
                    <button type="button" className="bog-linkish" onClick={() => act({ type: "rejectSuggest" })}>
                      No, è un'altra cosa
                    </button>
                  </div>
                ) : (
                  <div className={canHelp ? "bog-btns" : ""}>
                    <button type="submit" className="bog-btn small ghost">
                      Controlla
                    </button>
                    {canHelp && (
                      <button type="button" className="bog-btn small help" onClick={() => act({ type: "openHelp" })}>
                        Aiutino
                      </button>
                    )}
                  </div>
                )}
              </form>
            )}
          </>
        )}
        {after.length > 0 && <div className="bog-turns">{after}</div>}
      </div>
      {done && (
        <p className="bog-label" style={{ textAlign: "center" }}>
          Tutte le squadre hanno risposto.
        </p>
      )}
      <button type="button" className="bog-btn mode" disabled={!done} onClick={() => act({ type: "reveal" })}>
        Scopri i punti
      </button>
    </>
  );
}

function CountUp({ to, run, prefix }: { to: number; run: boolean; prefix: string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (reducedMotion()) return setV(to);
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / 1000);
      setV(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return (
    <>
      {prefix}
      {v}
    </>
  );
}

function Reveal({ game, act, onList }: { game: BogState; act: Act; onList: (h: BogHistory) => void }) {
  const h = game.history[game.history.length - 1];
  const [open, setOpen] = useState(0);
  const [banner, setBanner] = useState(false);
  useEffect(() => {
    const timers = h.res.map((_, i) => window.setTimeout(() => setOpen(i + 1), 250 + i * 650));
    timers.push(window.setTimeout(() => setBanner(true), 450 + h.res.length * 650 + 400));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [h]);

  const w = h.winner;
  const msg =
    w === null
      ? "Pari: nessuno prende la domanda."
      : `${cap(teamRef(game.teams[w]))} ${h.mode === "bersaglio" ? "ci vanno più vicino" : "prendono la domanda"} e salgono a ${game.sets[w]}.`;
  const pre = h.mode === "bersaglio" ? "a " : "";
  return (
    <>
      <div className={`bog-qmini bog-m-${h.mode}`}>
        <Chip mode={h.mode} target={h.target} />
        <h2>{h.q}</h2>
      </div>
      <div className="bog-scroll">
        <div className="bog-res">
          {h.res.map((r, i) => (
            <div key={r.team} className={`bog-row bog-m-${h.mode} ${banner && r.team === w ? "win" : ""}`}>
              <span className="t">{game.teams[r.team]}</span>
              <span className="a">{r.name}</span>
              <span className="p">
                <CountUp to={r.pts} run={open > i} prefix={pre} />
              </span>
              <span className="bog-meter">
                <b style={{ width: open > i ? `${r.pop}%` : 0 }} />
                {h.mode === "bersaglio" && <u style={{ left: `${h.target}%` }} />}
              </span>
              <span className="n">
                La direbbero {r.pop} su 100
                {r.help ? (h.mode === "bersaglio" ? ", aiutino: distanza doppia" : ", aiutino: punti a metà") : ""}
              </span>
            </div>
          ))}
        </div>
        <p className="bog-banner" style={{ opacity: banner ? 1 : 0 }}>
          {msg}
        </p>
      </div>
      <button type="button" className="bog-btn small ghost" onClick={() => onList(h)}>
        Vedi tutta la lista
      </button>
      <button type="button" className="bog-btn" onClick={() => act({ type: "next" })}>
        Avanti
      </button>
    </>
  );
}

function Score({ game, act }: { game: BogState; act: Act }) {
  const last = game.history[game.history.length - 1];
  const inRound = game.history.filter((h) => h.round === game.roundNo);
  const nx = game.teams[game.starter];
  return (
    <>
      <div className="bog-qmini">
        <span className="bog-chip">
          <i />
          {MODE_LABEL[game.mode]}
        </span>
        <h2>
          {isTiebreak(game) ? "Spareggio" : `Round ${game.roundNo}`}, dopo {inRound.length} {inRound.length === 1 ? "domanda" : "domande"}
        </h2>
      </div>
      <p className="bog-sub">Ogni gettone è una domanda vinta, con la risposta che l'ha vinta. Il primo a {BOG_WIN_AT} vince il round.</p>
      <div className="bog-towers" style={{ "--n": game.teams.length } as React.CSSProperties}>
        {game.teams.map((t, i) => {
          const won = inRound.filter((h) => h.winner === i);
          return (
            <div key={i} className="bog-tower">
              <h3>
                <span>{t}</span>
                <b>{game.sets[i]}</b>
              </h3>
              <div className="bog-stack">
                {Array.from({ length: BOG_WIN_AT }, (_, k) => {
                  const h = won[k];
                  if (!h) return <span key={k} className="bog-coin empty" />;
                  return (
                    <span key={k} className={`bog-coin bog-m-${h.mode} ${h === last ? "drop" : ""}`}>
                      {h.res.find((r) => r.team === i)?.name}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <p className="bog-label">Alla prossima iniziano {teamRef(nx)}.</p>
      <button type="button" className="bog-btn mode" onClick={() => act({ type: "nextQuestion" })}>
        Prossima domanda
      </button>
    </>
  );
}

function RoundEnd({ game, act }: { game: BogState; act: Act }) {
  const w = game.roundWinner ?? 0;
  const over = matchOver(game);
  const next = over ? "Vedi chi ha vinto" : game.roundNo >= game.rounds ? "Gioca lo spareggio" : `Estrai la regola del round ${game.roundNo + 1}`;
  const note = over ? "" : game.roundNo >= game.rounds ? "Siete pari: un round secco decide la partita." : `Mancano ${game.rounds - game.roundNo} round.`;
  const others = Math.max(...game.sets.filter((_, i) => i !== w));
  return (
    <div className="bog-win">
      <p className="bog-label" style={{ fontSize: 17, marginTop: 4 }}>
        {isTiebreak(game) ? "Spareggio" : `Round ${game.roundNo}`}, {MODE_LABEL[game.mode]}
      </p>
      <h1 className="bog-logo bog-ext-m" style={{ fontSize: "clamp(40px, 12vw, 56px)" }}>
        {cap(teamRef(game.teams[w]))} vincono il round
      </h1>
      <p className="bog-sub" style={{ color: "var(--bog-text)" }}>
        {BOG_WIN_AT} domande a {others}.
      </p>
      {(game.rounds > 1 || isTiebreak(game)) && (
        <>
          <p className="bog-label">Round vinti</p>
          <div className="bog-tallies">
            {game.teams.map((t, i) => (
              <div key={i} className={`bog-tally ${i === w ? "lead" : ""}`}>
                <span>{t}</span>
                <b>{game.roundWins[i]}</b>
              </div>
            ))}
          </div>
        </>
      )}
      <div className="bog-fill" />
      {note && <p className="bog-label">{note}</p>}
      <button type="button" className="bog-btn" onClick={() => act({ type: "continue" })}>
        {next}
      </button>
    </div>
  );
}

function Win({ game, act, onTeams }: { game: BogState; act: Act; onTeams: () => void }) {
  const w = matchWinner(game);
  const confetti = useMemo(
    () =>
      Array.from({ length: 46 }, (_, i) => ({
        mode: (["banale", "geniale", "bersaglio"] as BogMode[])[i % 3],
        left: Math.random() * 100,
        dur: 2.2 + Math.random() * 2.4,
        delay: Math.random() * 1.2,
      })),
    [],
  );
  const all = game.history.flatMap((h) => h.res.map((r) => ({ ...r, mode: h.mode, q: h.q })));
  const gen = all.filter((r) => r.mode === "geniale").sort((a, b) => b.pts - a.pts)[0];
  const ban = all.filter((r) => r.mode === "banale").sort((a, b) => b.pts - a.pts)[0];
  const single = game.rounds === 1 && !isTiebreak(game);
  const lastRound = game.history.filter((h) => h.round === game.roundNo);
  const others = game.teams
    .map((t, i) => (i === w ? null : `${single ? lastRound.filter((h) => h.winner === i).length : game.roundWins[i]} ${t}`))
    .filter(Boolean)
    .join(", ");
  const line = single ? `${BOG_WIN_AT} domande vinte, contro ${others}.` : `${game.roundWins[w]} round vinti, contro ${others}.`;
  const best = (r: (typeof all)[number] | undefined, mode: BogMode, title: string) =>
    r && (
      <div className={`bog-best bog-m-${mode}`}>
        <small>{title}</small>
        <b>{r.name}</b>
        <small>
          {game.teams[r.team]}, su «{r.q}»
        </small>
      </div>
    );
  return (
    <>
      <div className="bog-confetti" aria-hidden="true">
        {confetti.map((c, i) => (
          <span key={i} className={`bog-m-${c.mode}`} style={{ left: `${c.left}%`, animationDuration: `${c.dur}s`, animationDelay: `${c.delay}s` }} />
        ))}
      </div>
      <div className="bog-win">
        <p className="bog-label" style={{ fontSize: 18, marginTop: 8 }}>
          Hanno vinto
        </p>
        <h1 className="bog-logo bog-ext-b" style={{ fontSize: "clamp(56px, 18vw, 84px)", overflowWrap: "anywhere" }}>
          {game.teams[w]}
        </h1>
        <p className="bog-sub" style={{ fontSize: 19, color: "var(--bog-text)" }}>
          {line}
        </p>
        <div className="bog-fill" />
        {best(gen, "geniale", "La risposta più geniale")}
        {best(ban, "banale", "La risposta più banale")}
        <div className="bog-btns">
          <button type="button" className="bog-btn ghost" onClick={onTeams}>
            Squadre
          </button>
          <button type="button" className="bog-btn" onClick={() => act({ type: "rematch" })}>
            Rivincita
          </button>
        </div>
      </div>
    </>
  );
}

function ListSheet({ h, teams, onClose }: { h: BogHistory | null; teams: string[]; onClose: () => void }) {
  /* Tiene l'ultima lista aperta mentre il pannello scende. */
  const [last, setLast] = useState<BogHistory | null>(h);
  useEffect(() => {
    if (h) setLast(h);
  }, [h]);
  const cur = h ?? last;
  const q = cur ? BANALE_DECK.find((d) => d.q === cur.q) : undefined;
  const taken = new Map(cur?.res.map((r) => [r.name, teams[r.team]]) ?? []);
  return (
    <div className={`bog-sheet ${cur ? `bog-m-${cur.mode}` : ""} ${h ? "open" : ""}`} aria-hidden={!h}>
      {cur && q && (
        <div className="bog-sheet-in">
          <h2 className="bog-logo bog-ext-w" style={{ fontSize: 24, marginBottom: 8 }}>
            Tutta la lista
          </h2>
          <p className="bog-label" style={{ marginBottom: 6 }}>
            Quanto la direbbero su 100, e i punti con {modeName(cur.mode, cur.target)}.
          </p>
          {q.a.map((a) => (
            <div key={a.name} className={`bog-li ${taken.has(a.name) ? "taken" : ""}`}>
              <span>
                {a.name}
                {taken.has(a.name) ? `, ${taken.get(a.name)}` : ""}
              </span>
              <i>
                <b style={{ width: `${a.pop}%` }} />
              </i>
              <span>{cur.mode === "bersaglio" ? `a ${bogScore("bersaglio", cur.target, a.pop)}` : bogScore(cur.mode, cur.target, a.pop)}</span>
            </div>
          ))}
          <button type="button" className="bog-btn small ghost" style={{ marginTop: 12 }} onClick={onClose}>
            Chiudi
          </button>
        </div>
      )}
    </div>
  );
}
