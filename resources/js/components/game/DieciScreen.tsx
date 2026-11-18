import React, { useState } from "react";
import type { Dispatch, ReactNode } from "react";
import type { GameAction } from "@/types/actions.types";
import type { DieciTheme } from "@/data/dieciThemes";
import {
  DL_MAX_PLAYERS,
  DL_MIN_PLAYERS,
  DL_PERFECT_BONUS,
  changeTheme,
  commitRound,
  createDieci,
  guestsOf,
  nextRound,
  ranking,
  scoreRound,
  type DieciState,
} from "@/services/dieciService";
import "../../../css/dieci.css";

interface DieciScreenProps {
  dispatch: Dispatch<GameAction>;
}

type Phase = "intro" | "deal" | "order" | "reveal" | "scores";
type Slots = (number | null)[];

const LAP_OPTIONS = [1, 2, 3];
const signed = (n: number) => (n > 0 ? `+${n}` : n < 0 ? `−${-n}` : "");
const buzz = (pattern: number | number[]) => navigator.vibrate?.(pattern);

function Logo() {
  return (
    <span className="dl-logo">
      From Bottom to the <b>Top</b>
    </span>
  );
}

function ThemeCard({ theme, max, compact }: { theme: DieciTheme; max: number; compact?: boolean }) {
  return (
    <div className={`dl-card ${compact ? "compact" : ""}`}>
      <p className="dl-prompt m-0">{theme.prompt}</p>
      <div className="dl-scale">
        <div className="dl-pole hi">
          <i>{max}</i>
          <span>{theme.high}</span>
        </div>
        <div className="dl-pole lo">
          <i>1</i>
          <span>{theme.low}</span>
        </div>
      </div>
    </div>
  );
}

/** Il sentiero che sale: dieci tappe, la bandierina sulla tua. */
function Meter({ n, max }: { n: number; max: number }) {
  return (
    <div className="dl-meter" aria-hidden="true">
      {Array.from({ length: max }, (_, i) => (
        <i key={i} className={`${i < n ? "on" : ""} ${i === n - 1 ? "cur" : ""}`} style={{ "--k": ((i + 1) * 10) / max } as React.CSSProperties} />
      ))}
    </div>
  );
}

/** Cornice comune: barra in alto con uscita, corpo, azioni fisse in basso. */
function Shell({ label, onExit, confirmExit, plain, foot, children }: {
  label?: string;
  onExit: () => void;
  confirmExit?: boolean;
  /** Schermate lunghe da compilare: senza montagne sotto i testi. */
  plain?: boolean;
  foot: ReactNode;
  children: ReactNode;
}) {
  const [asking, setAsking] = useState(false);
  return (
    <div className={`dl ${plain ? "plain" : ""}`}>
      <div className="dl-wrap">
        <div className="dl-top">
          <button type="button" className="dl-x" aria-label="Esci" onClick={() => (confirmExit ? setAsking(true) : onExit())}>
            ✕
          </button>
          {label && <span className="dl-eyebrow">{label}</span>}
        </div>
        {children}
        <div className="dl-foot">{foot}</div>
      </div>
      {asking && (
        <div className="dl-scrim" role="dialog" aria-modal="true" aria-label="Uscire dalla partita?">
          <div className="dl-card flex flex-col gap-4">
            <p className="dl-prompt m-0">Uscire dalla partita?</p>
            <p className="dl-hint m-0">I punteggi andranno persi.</p>
            <div className="flex gap-2.5">
              <button type="button" className="dl-btn ghost flex-1" onClick={() => setAsking(false)}>
                Resta
              </button>
              <button type="button" className="dl-btn" onClick={onExit}>
                Esci
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function DieciScreen({ dispatch }: DieciScreenProps) {
  const [names, setNames] = useState(["", "", "", ""]);
  const [laps, setLaps] = useState(1);
  const [penalty, setPenalty] = useState(false);
  const [game, setGame] = useState<DieciState | null>(null);
  const [phase, setPhase] = useState<Phase>("intro");
  const [slots, setSlots] = useState<Slots>([]);

  const exit = () => dispatch({ type: "CLEAR_MODE" });

  if (!game) {
    const start = () => {
      const clean = names.map((n, i) => n.trim() || `Giocatore ${i + 1}`);
      setGame(createDieci(clean, laps, penalty));
      setPhase("intro");
    };
    return (
      <Setup names={names} setNames={setNames} laps={laps} setLaps={setLaps} penalty={penalty} setPenalty={setPenalty} onStart={start} onBack={exit} />
    );
  }

  if (game.finished) {
    return <Final game={game} onAgain={() => setGame(null)} onExit={exit} />;
  }

  const { round } = game;
  const captain = game.players[round.captain];
  const guests = guestsOf(game);
  const label = `Manche ${game.roundIndex + 1} di ${game.totalRounds}`;
  const shell = { label, onExit: exit, confirmExit: true };

  if (phase === "intro") {
    return (
      <Shell
        {...shell}
        foot={
          <>
            <button type="button" className="dl-btn ghost" onClick={() => setGame(changeTheme(game))}>
              Cambia tema
            </button>
            <button type="button" className="dl-btn" onClick={() => setPhase("deal")}>
              Distribuisci i numeri
            </button>
          </>
        }
      >
        <div className="dl-body">
          <div>
            <span className="dl-hand text-[22px] text-[var(--dl-hot)]">Capitano</span>
            <div className="dl-name">{captain}</div>
          </div>
          <ThemeCard theme={round.theme} max={guests.length} />
          <p className="dl-hint m-0">
            {captain} legge il tema ad alta voce e non pesca nessun numero. Poi il telefono fa il giro: ognuno guarda il suo numero in segreto.
          </p>
        </div>
      </Shell>
    );
  }

  if (phase === "deal") {
    return (
      <Deal
        key={game.roundIndex}
        game={game}
        shell={shell}
        onDone={() => {
          setSlots(guests.map(() => null));
          setPhase("order");
        }}
      />
    );
  }

  if (phase === "order") {
    const placed = slots.filter((s): s is number => s !== null);
    const pool = guests.filter((g) => !placed.includes(g));
    const firstEmpty = slots.indexOf(null);
    const place = (p: number) => setSlots(slots.map((s, i) => (i === firstEmpty ? p : s)));
    const clear = (i: number) => setSlots(slots.map((s, j) => (j === i ? null : s)));
    return (
      <Shell
        {...shell}
        foot={
          <button type="button" className="dl-btn" disabled={firstEmpty !== -1} onClick={() => setPhase("reveal")}>
            {firstEmpty !== -1 ? `Ancora ${pool.length} da piazzare` : "Conferma l'ordine"}
          </button>
        }
      >
        <div className="dl-body">
          <ThemeCard theme={round.theme} max={guests.length} compact />
          <p className="dl-hint m-0">
            {captain}, tocca i nomi dal numero <b>più basso</b> al <b>più alto</b>. Tocca una riga per liberarla.
          </p>
          <div className="dl-pool">
            {pool.map((p) => (
              <button key={p} type="button" className="dl-chip" onClick={() => place(p)}>
                {game.players[p]}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {slots.map((s, i) => {
              const edge = i === 0 ? "il più basso" : i === slots.length - 1 ? "il più alto" : "";
              return s === null ? (
                <div key={i} className={`dl-slot empty ${i === firstEmpty ? "next" : ""}`}>
                  <span className="dl-pos">{i + 1}</span>
                  <span className="grow">{edge || (i === firstEmpty ? "tocca un nome" : " ")}</span>
                </div>
              ) : (
                <button key={i} type="button" className="dl-slot" onClick={() => clear(i)} aria-label={`Togli ${game.players[s]} dalla posizione ${i + 1}`}>
                  <span className="dl-pos">{i + 1}</span>
                  <span className="grow">
                    {game.players[s]}
                    {edge && <small>{edge}</small>}
                  </span>
                  <span aria-hidden="true" className="text-[var(--dl-muted)]">✕</span>
                </button>
              );
            })}
          </div>
        </div>
      </Shell>
    );
  }

  const order = slots as number[];

  if (phase === "reveal") {
    return (
      <Reveal
        key={game.roundIndex}
        game={game}
        order={order}
        shell={shell}
        onDone={() => {
          setGame(commitRound(game, order));
          setPhase("scores");
        }}
      />
    );
  }

  // phase === "scores"
  const last = game.roundIndex + 1 >= game.totalRounds;
  const nextCaptain = game.players[(game.roundIndex + 1) % game.players.length];
  return (
    <Shell
      {...shell}
      foot={
        <button
          type="button"
          className="dl-btn"
          onClick={() => {
            setGame(nextRound(game));
            setPhase("intro");
          }}
        >
          {last ? "Classifica finale" : `Prossima manche: capitano ${nextCaptain}`}
        </button>
      }
    >
      <div className="dl-body">
        <span className="dl-hand text-[36px]">Classifica</span>
        <Standings game={game} deltas />
      </div>
    </Shell>
  );
}

// ───────────────────────── Setup ─────────────────────────

interface SetupProps {
  names: string[];
  setNames: (n: string[]) => void;
  laps: number;
  setLaps: (n: number) => void;
  penalty: boolean;
  setPenalty: (p: boolean) => void;
  onStart: () => void;
  onBack: () => void;
}

function Setup({ names, setNames, laps, setLaps, penalty, setPenalty, onStart, onBack }: SetupProps) {
  const rename = (i: number, v: string) => setNames(names.map((n, j) => (j === i ? v : n)));
  const rounds = names.length * laps;
  return (
    <Shell
      plain
      onExit={onBack}
      foot={
        <button type="button" className="dl-btn" onClick={onStart}>
          Inizia · {rounds} manche
        </button>
      }
    >
      <div className="dl-body">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="dl-hint m-0">
            Un tema e un numero segreto a testa: 1, 2, 3… uno per giocatore, capitano escluso. Ognuno dà una risposta di quell'intensità. Il capitano rimette tutti in ordine: 1 punto
            a lui e 1 al giocatore per ogni posizione esatta, +{DL_PERFECT_BONUS} se le azzecca tutte.
          </p>
        </div>

        <section className="flex flex-col gap-2">
          <span className="dl-eyebrow">Giocatori · un solo telefono</span>
          {names.map((n, i) => (
            <label key={i} className="dl-field">
              <span>{i + 1}</span>
              <input
                value={n}
                onChange={(e) => rename(i, e.target.value)}
                placeholder={`Giocatore ${i + 1}`}
                maxLength={16}
                autoComplete="off"
                autoCapitalize="words"
                enterKeyHint="done"
                aria-label={`Nome del giocatore ${i + 1}`}
              />
              {names.length > DL_MIN_PLAYERS && (
                <button type="button" aria-label={`Togli il giocatore ${i + 1}`} onClick={() => setNames(names.filter((_, j) => j !== i))}>
                  ✕
                </button>
              )}
            </label>
          ))}
          {names.length < DL_MAX_PLAYERS && (
            <button type="button" className="dl-add" onClick={() => setNames([...names, ""])}>
              + Aggiungi giocatore
            </button>
          )}
        </section>

        <section className="flex flex-col gap-2">
          <span className="dl-eyebrow">Volte da capitano a testa</span>
          <div className="dl-seg" role="group" aria-label="Volte da capitano a testa">
            {LAP_OPTIONS.map((l) => (
              <button key={l} type="button" aria-pressed={laps === l} onClick={() => setLaps(l)}>
                {l}
              </button>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <span className="dl-eyebrow">Errore del capitano</span>
          <div className="dl-seg" role="group" aria-label="Errore del capitano">
            <button type="button" aria-pressed={!penalty} onClick={() => setPenalty(false)}>
              Nessuna penalità
            </button>
            <button type="button" aria-pressed={penalty} onClick={() => setPenalty(true)}>
              −1 a errore
            </button>
          </div>
        </section>
      </div>
    </Shell>
  );
}

// ───────────────────────── Giro dei numeri ─────────────────────────

type ShellBase = { label: string; onExit: () => void; confirmExit: boolean };

function Deal({ game, shell, onDone }: { game: DieciState; shell: ShellBase; onDone: () => void }) {
  const guests = guestsOf(game);
  const [idx, setIdx] = useState(0);
  const [shown, setShown] = useState(false);
  const captain = game.players[game.round.captain];

  // Tutti hanno visto: il telefono torna al capitano
  if (idx >= guests.length) {
    return (
      <Shell
        {...shell}
        foot={
          <button type="button" className="dl-btn" onClick={onDone}>
            Sono {captain}: metto in ordine
          </button>
        }
      >
        <div className="dl-body dl-center">
          <span className="dl-eyebrow">Ridai il telefono a</span>
          <div className="dl-name">{captain}</div>
          <p className="dl-hint m-0">A turno, ognuno dice la sua risposta ad alta voce. Vietato dire il numero.</p>
          <ThemeCard theme={game.round.theme} max={guests.length} compact />
        </div>
      </Shell>
    );
  }

  const player = guests[idx];
  const name = game.players[player];

  if (!shown) {
    return (
      <Shell
        {...shell}
        foot={
          <button type="button" className="dl-btn" onClick={() => setShown(true)}>
            Sono {name}: mostra il mio numero
          </button>
        }
      >
        <div className="dl-body dl-center">
          <span className="dl-eyebrow">
            Passa il telefono a · {idx + 1} di {guests.length}
          </span>
          <div className="dl-name">{name}</div>
          <p className="dl-hint m-0">Gli altri non guardano lo schermo.</p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell
      {...shell}
      foot={
        <button
          type="button"
          className="dl-btn"
          onClick={() => {
            setShown(false);
            setIdx(idx + 1);
          }}
        >
          Visto, nascondi
        </button>
      }
    >
      <div className="dl-body">
        <div className="dl-body dl-center">
          <span className="dl-eyebrow">{name}, il tuo numero</span>
          <div className="dl-secret" aria-live="polite">
            {game.round.numbers[player]}
          </div>
          <Meter n={game.round.numbers[player]} max={guests.length} />
          <p className="dl-hint m-0">Pensa a una risposta che valga {game.round.numbers[player]} su {guests.length}.</p>
        </div>
        <ThemeCard theme={game.round.theme} max={guests.length} compact />
      </div>
    </Shell>
  );
}

// ───────────────────────── Correzione ─────────────────────────

function Reveal({ game, order, shell, onDone }: { game: DieciState; order: number[]; shell: ShellBase; onDone: () => void }) {
  const [shown, setShown] = useState(0);
  const result = scoreRound(game.round, order, game.penalty);
  const done = shown >= order.length;
  const captain = game.players[game.round.captain];

  const revealNext = () => {
    buzz(result.exact[shown] ? 30 : [40, 40, 40]);
    setShown(shown + 1);
  };

  return (
    <Shell
      {...shell}
      foot={
        done ? (
          <button type="button" className="dl-btn" onClick={onDone}>
            Vai alla classifica
          </button>
        ) : (
          <button type="button" className="dl-btn" onClick={revealNext}>
            Svela {game.players[order[shown]]}
          </button>
        )
      }
    >
      <div className="dl-body">
        <ThemeCard theme={game.round.theme} max={order.length} compact />
        <div className="flex flex-col gap-2" aria-live="polite">
          {order.map((p, i) => {
            const open = i < shown;
            const ok = result.exact[i];
            return (
              <div key={p} className={`dl-slot ${open ? `shown ${ok ? "ok" : "bad"}` : ""}`}>
                <span className="dl-pos">{i + 1}</span>
                <span className="grow">
                  {game.players[p]}
                  {open && !ok && <small>il suo posto era il {result.truth.indexOf(p) + 1}°</small>}
                </span>
                {open && (
                  <>
                    <span className="dl-grade" style={{ color: ok ? "var(--dl-ok)" : "var(--dl-bad)" }}>
                      {game.round.numbers[p]}
                    </span>
                    <span className={`dl-mark ${ok ? "ok" : "bad"}`} aria-label={ok ? "Posizione esatta" : "Posizione sbagliata"}>
                      {ok ? "✓" : "✕"}
                    </span>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {done && (
          <div className="dl-card dl-sum flex flex-col gap-1.5">
            {result.perfect && <span className="dl-lode">In vetta!</span>}
            <span className="dl-prompt">
              {result.hits} su {order.length} al posto giusto
            </span>
            <span className="dl-hint">
              {captain}: {result.captainDelta === 0 ? "nessun punto" : `${signed(result.captainDelta)} ${Math.abs(result.captainDelta) === 1 ? "punto" : "punti"}`}
              {result.perfect && ` (con il bonus vetta da +${DL_PERFECT_BONUS})`}
            </span>
          </div>
        )}
      </div>
    </Shell>
  );
}

// ───────────────────────── Classifica ─────────────────────────

function Standings({ game, deltas }: { game: DieciState; deltas?: boolean }) {
  const rows = ranking(game);
  return (
    <div className="flex flex-col gap-2">
      {rows.map((p) => {
        const place = rows.filter((q) => game.scores[q] > game.scores[p]).length + 1;
        const d = game.lastDeltas[p];
        return (
          <div key={p} className="dl-slot">
            <span className="dl-pos">{place}</span>
            <span className="grow">
              {game.players[p]}
              {deltas && p === game.round.captain && <small>capitano</small>}
            </span>
            {deltas && <span className={`dl-delta ${d < 0 ? "neg" : ""}`}>{signed(d)}</span>}
            <span className="dl-score">{game.scores[p]}</span>
          </div>
        );
      })}
    </div>
  );
}

function Final({ game, onAgain, onExit }: { game: DieciState; onAgain: () => void; onExit: () => void }) {
  const best = Math.max(...game.scores);
  const winners = game.players.filter((_, i) => game.scores[i] === best);
  return (
    <Shell
      onExit={onExit}
      label="Fine partita"
      foot={
        <>
          <button type="button" className="dl-btn ghost" onClick={onExit}>
            Esci
          </button>
          <button type="button" className="dl-btn" onClick={onAgain}>
            Rigioca
          </button>
        </>
      }
    >
      <div className="dl-body">
        <div>
          <span className="dl-hand text-[22px] text-[var(--dl-hot)]">{winners.length > 1 ? "In vetta a pari merito" : "In vetta"}</span>
          <div className="dl-name">{winners.join(" · ")}</div>
        </div>
        <Standings game={game} />
      </div>
    </Shell>
  );
}
