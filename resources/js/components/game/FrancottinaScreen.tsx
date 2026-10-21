import React, { useCallback, useEffect, useState } from "react";
import type { Dispatch } from "react";
import type { GameAction } from "@/types/actions.types";
import type { FrancottinaCategory } from "@/data/francottinaWords";
import {
  FR_CATEGORIES,
  FR_MAX_TEAMS,
  FR_MIN_TEAMS,
  FR_POINTS,
  FR_TEAM_COLORS,
  FR_TURNS,
  cluesAt,
  countFrancottinaWords,
  createFrancottina,
  francottinaReducer,
  isLive,
  lastMissTeam,
  pointsAt,
  teamAt,
  type FrAction,
  type FrancottinaState,
} from "@/services/francottinaService";
import "../../../css/francottina.css";

interface FrancottinaScreenProps {
  dispatch: Dispatch<GameAction>;
}

const ROUND_OPTIONS = [4, 6, 8, 10];
const TIMER_OPTIONS: [number, string][] = [[20, "20 s"], [30, "30 s"], [45, "45 s"], [0, "Senza"]];
const pts = (n: number) => `${n} ${n === 1 ? "punto" : "punti"}`;

function Pips({ on, all, lg }: { on: number; all?: boolean; lg?: boolean }) {
  return (
    <span className={`fr-pips ${all ? "all" : ""} ${lg ? "lg" : ""}`}>
      {[0, 1, 2].map((i) => (
        <span key={i} className={`fr-pip ${i < on ? "on" : ""}`} />
      ))}
    </span>
  );
}

function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`fr-logo ${className}`}>
      Franc<b>ott</b>ina
    </span>
  );
}

export function FrancottinaScreen({ dispatch }: FrancottinaScreenProps) {
  const [names, setNames] = useState(["Squadra 1", "Squadra 2"]);
  const [rounds, setRounds] = useState(6);
  const [seconds, setSeconds] = useState(30);
  const [categories, setCategories] = useState<FrancottinaCategory[]>(FR_CATEGORIES);
  const [game, setGame] = useState<FrancottinaState | null>(null);
  const [history, setHistory] = useState<FrancottinaState[]>([]);

  const play = useCallback(
    (action: FrAction) => {
      if (!game) return;
      const next = francottinaReducer(game, action);
      if (next === game) return;
      setHistory((h) => [...h, game]);
      setGame(next);
      navigator.vibrate?.(action.type === "wrong" ? [40, 40, 40] : 30);
    },
    [game]
  );

  const undo = () => {
    setGame(history[history.length - 1]);
    setHistory((h) => h.slice(0, -1));
  };

  const start = () => {
    if (categories.length === 0) return;
    const clean = names.map((n, i) => n.trim() || `Squadra ${i + 1}`);
    setNames(clean);
    setGame(createFrancottina(clean, rounds, categories));
    setHistory([]);
  };

  if (!game) {
    return (
      <Setup
        names={names}
        setNames={setNames}
        rounds={rounds}
        setRounds={setRounds}
        seconds={seconds}
        setSeconds={setSeconds}
        categories={categories}
        setCategories={setCategories}
        onStart={start}
        onBack={() => dispatch({ type: "CLEAR_MODE" })}
      />
    );
  }

  if (game.finished) {
    return (
      <Final
        game={game}
        onAgain={() => setGame(null)}
        onExit={() => dispatch({ type: "CLEAR_MODE" })}
      />
    );
  }

  return (
    <Board
      game={game}
      seconds={seconds}
      play={play}
      onUndo={undo}
      canUndo={history.length > 0}
      onExit={() => dispatch({ type: "CLEAR_MODE" })}
    />
  );
}

// ───────────────────────── Setup ─────────────────────────

interface SetupProps {
  names: string[];
  setNames: (n: string[]) => void;
  rounds: number;
  setRounds: (n: number) => void;
  seconds: number;
  setSeconds: (n: number) => void;
  categories: FrancottinaCategory[];
  setCategories: (c: FrancottinaCategory[]) => void;
  onStart: () => void;
  onBack: () => void;
}

function Setup({ names, setNames, rounds, setRounds, seconds, setSeconds, categories, setCategories, onStart, onBack }: SetupProps) {
  const rename = (i: number, v: string) => setNames(names.map((n, j) => (j === i ? v : n)));
  const toggle = (c: FrancottinaCategory) =>
    setCategories(categories.includes(c) ? categories.filter((x) => x !== c) : FR_CATEGORIES.filter((x) => x === c || categories.includes(x)));
  const available = countFrancottinaWords(categories);

  return (
    <div className="fr">
      <div className="max-w-5xl mx-auto px-4 pt-6 pb-8 md:pt-12 grid grid-cols-1 gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-12 md:items-start">
        <div>
          <p className="fr-eyebrow">Gioco a squadre · per il conduttore</p>
          <h1 className="mt-2 mb-4 text-[clamp(56px,16.5vw,128px)] md:text-[clamp(64px,8.5vw,112px)]">
            <Logo />
          </h1>
          <p className="text-base md:text-lg text-[#c9cee6] max-w-[34ch] mb-6">
            Tre parole, una sola soluzione che le lega tutte. Chi aspetta vede più indizi, ma porta a casa meno punti.
          </p>

          <ul className="grid gap-3.5 mb-6 text-sm md:text-[15px] text-[#b9bfdc]">
            {[
              [<Pips on={1} lg />, <><b className="text-[var(--fr-fg)]">La prima squadra</b> vede una parola sola. Se indovina prende <Em>3 punti</Em>.</>],
              [<Pips on={2} lg />, <><b className="text-[var(--fr-fg)]">Se sbaglia</b>, tocca alla squadra dopo, con due parole: <Em>2 punti</Em>.</>],
              [<Pips on={3} lg />, <><b className="text-[var(--fr-fg)]">Ancora niente?</b> La squadra successiva le vede tutte e tre: <Em>1 punto</Em>.</>],
              [<Pips on={3} all lg />, <><b className="text-[var(--fr-fg)]">Sbaglia anche lei?</b> Ora può rispondere qualsiasi altra squadra. Chi indovina per primo prende <Em>1 punto</Em>.</>],
            ].map(([icon, text], i) => (
              <li key={i} className="grid grid-cols-[48px_1fr] gap-3 items-center">
                {icon}
                <span>{text}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-2">
            {["Volo", "Mano", "Sfera"].map((w, i) => (
              <React.Fragment key={w}>
                {i > 0 && <span className="fr-display text-2xl text-[var(--fr-muted)]">+</span>}
                <span className="fr-display text-[22px] font-extrabold bg-[var(--fr-paper)] text-[var(--fr-paper-ink)] px-3 pt-1 pb-0.5 rounded-[3px]">{w}</span>
              </React.Fragment>
            ))}
            <span className="fr-display text-2xl text-[var(--fr-muted)]">=</span>
            <span className="fr-display text-[22px] font-extrabold bg-[var(--fr-brass)] text-[var(--fr-paper-ink)] px-3 pt-1 pb-0.5 rounded-[3px]">Palla</span>
          </div>
        </div>

        <div className="bg-[var(--fr-stage)] border border-[var(--fr-line)] rounded-2xl p-5 md:p-6 grid gap-6">
          <h2 className="fr-display font-extrabold text-[28px] tracking-wide">Prepara la sfida</h2>

          <div className="grid gap-2.5">
            <p className="fr-eyebrow">Squadre ({names.length}/{FR_MAX_TEAMS})</p>
            {names.map((n, i) => (
              <div key={i} className="grid grid-cols-[16px_1fr_44px] gap-2.5 items-center">
                <span className="w-4 h-4 rounded-full" style={{ background: FR_TEAM_COLORS[i] }} />
                <input
                  id={`fr-team-${i}`}
                  value={n}
                  maxLength={18}
                  onChange={(e) => rename(i, e.target.value)}
                  onFocus={(e) => e.target.select()}
                  aria-label={`Nome squadra ${i + 1}`}
                  className="w-full min-w-0 bg-[var(--fr-ink)] border border-[var(--fr-line)] rounded-lg px-3 py-3 text-base font-semibold"
                />
                <button
                  onClick={() => setNames(names.filter((_, j) => j !== i))}
                  disabled={names.length <= FR_MIN_TEAMS}
                  aria-label="Rimuovi squadra"
                  className="h-11 rounded-lg text-xl text-[var(--fr-muted)] active:text-[var(--fr-fg)] disabled:opacity-25"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={() => setNames([...names, `Squadra ${names.length + 1}`])}
              disabled={names.length >= FR_MAX_TEAMS}
              className="border border-dashed border-[var(--fr-line)] rounded-lg py-3 font-semibold text-[var(--fr-muted)] active:text-[var(--fr-fg)] disabled:opacity-35"
            >
              + Aggiungi squadra
            </button>
            <p className="text-xs text-[var(--fr-muted)]">A ogni parola parte una squadra diversa, così nessuno è sempre svantaggiato.</p>
          </div>

          <div className="grid gap-2.5">
            <p className="fr-eyebrow">Categorie</p>
            <div className="flex flex-wrap gap-2">
              {FR_CATEGORIES.map((c) => {
                const on = categories.includes(c);
                return (
                  <button
                    key={c}
                    onClick={() => toggle(c)}
                    aria-pressed={on}
                    className={`min-h-11 inline-flex items-center gap-2 rounded-full border px-3.5 font-semibold transition-colors ${
                      on
                        ? "border-[var(--fr-brass)] bg-[color-mix(in_srgb,var(--fr-brass)_14%,var(--fr-ink))] text-[var(--fr-fg)]"
                        : "border-[var(--fr-line)] bg-[var(--fr-ink)] text-[var(--fr-muted)]"
                    }`}
                  >
                    {c}
                    <span className={`text-xs tabular-nums ${on ? "text-[var(--fr-brass)]" : ""}`}>{countFrancottinaWords([c])}</span>
                  </button>
                );
              })}
            </div>
            <p className="text-xs text-[var(--fr-muted)]">
              {available === 0
                ? "Scegli almeno una categoria."
                : available < rounds
                  ? `Ci sono ${available} parole in queste categorie: si giocano tutte.`
                  : `${available} parole tra cui pescare.`}
            </p>
          </div>

          <Segmented label="Parole da giocare" value={rounds} onChange={setRounds} options={ROUND_OPTIONS.map((v) => [v, String(v)])} />
          <Segmented label="Tempo per tentativo" value={seconds} onChange={setSeconds} options={TIMER_OPTIONS} />

          <button
            onClick={onStart}
            disabled={available === 0}
            className="fr-display font-extrabold text-[22px] tracking-wider bg-[var(--fr-brass)] text-[var(--fr-paper-ink)] rounded-xl py-4 active:scale-[0.98] transition-transform disabled:opacity-40"
          >
            Si gioca
          </button>
          <button onClick={onBack} className="-mt-3 text-sm text-[var(--fr-muted)] active:text-[var(--fr-fg)] py-2">
            Cambia modalità
          </button>
        </div>
      </div>
    </div>
  );
}

function Em({ children }: { children: React.ReactNode }) {
  return <b className="text-[var(--fr-brass)]">{children}</b>;
}

function Segmented({ label, value, onChange, options }: { label: string; value: number; onChange: (v: number) => void; options: [number, string][] }) {
  return (
    <div className="grid gap-2.5">
      <p className="fr-eyebrow">{label}</p>
      <div className="grid grid-flow-col auto-cols-fr bg-[var(--fr-ink)] border border-[var(--fr-line)] rounded-xl p-[3px]">
        {options.map(([v, l]) => (
          <button
            key={v}
            onClick={() => onChange(v)}
            aria-pressed={value === v}
            className={`rounded-lg py-2.5 font-semibold tabular-nums transition-colors ${
              value === v ? "bg-[var(--fr-stage-2)] text-[var(--fr-fg)] shadow-[inset_0_0_0_1px_var(--fr-line)]" : "text-[var(--fr-muted)]"
            }`}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}

// ───────────────────────── Tabellone ─────────────────────────

interface BoardProps {
  game: FrancottinaState;
  seconds: number;
  play: (a: FrAction) => void;
  onUndo: () => void;
  canUndo: boolean;
  onExit: () => void;
}

function Board({ game, seconds, play, onUndo, canUndo, onExit }: BoardProps) {
  const [peek, setPeek] = useState(false);
  const [confirmExit, setConfirmExit] = useState(false);
  const [timeLeft, setTimeLeft] = useState(seconds * 1000);
  const [running, setRunning] = useState(true);

  const word = game.deck[game.round];
  const live = isLive(game);
  const open = game.phase === "open";
  const cur = teamAt(game, game.attempt);
  const miss = lastMissTeam(game);
  const shown = game.phase === "guess" ? cluesAt(game.attempt) : 3;
  const turnKey = `${game.round}-${game.attempt}-${game.phase}`;

  // Ogni nuovo tentativo riparte con la lama in alto.
  useEffect(() => {
    setTimeLeft(seconds * 1000);
    setRunning(true);
  }, [turnKey, seconds]);

  useEffect(() => {
    setPeek(false);
    window.scrollTo(0, 0);
  }, [game.round]);

  useEffect(() => {
    if (!seconds || !live || !running) return;
    let last = performance.now();
    const id = setInterval(() => {
      const now = performance.now();
      setTimeLeft((t) => Math.max(0, t - (now - last)));
      last = now;
    }, 100);
    return () => clearInterval(id);
  }, [seconds, live, running]);

  // Vibrazione sugli esiti: festa se indovinano, colpo secco se perdono la scommessa.
  useEffect(() => {
    if (game.phase === "solved") navigator.vibrate?.([40, 60, 40]);
  }, [game.phase]);

  useEffect(() => {
    if (game.lost) navigator.vibrate?.(150);
  }, [game.lost]);

  // Schermo sempre acceso durante la partita.
  useEffect(() => {
    let lock: WakeLockSentinel | null = null;
    navigator.wakeLock?.request("screen").then((l) => (lock = l)).catch(() => {});
    return () => void lock?.release().catch(() => {});
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (k === "g") play({ type: "right" });
      else if (k === "s") play({ type: "wrong" });
      else if (k === "b") play({ type: "bet" });
      else if (k === "enter") play({ type: "next" });
      else if (k === " ") {
        e.preventDefault();
        setRunning((r) => !r);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [play]);

  const timed = seconds > 0 && live;
  const secsLeft = Math.ceil(timeLeft / 1000);
  const progress = timed ? 1 - timeLeft / (seconds * 1000) : 0;
  const isLastWord = game.round + 1 >= game.deck.length;
  const stake = pointsAt(game.attempt);

  return (
    <div className="fr">
      <div className="max-w-5xl mx-auto px-4 pt-3 pb-6">
        {/* Header */}
        <div className="flex items-center justify-between text-xs text-[var(--fr-muted)] mb-2">
          <button onClick={() => setConfirmExit(true)} className="py-2 pr-3 active:text-[var(--fr-fg)]">Esci</button>
          <span className="fr-eyebrow tabular-nums">
            <span className="text-[var(--fr-brass)]">{word.category}</span> · {game.round + 1} di {game.deck.length}
          </span>
          <button onClick={onUndo} disabled={!canUndo} className="py-2 pl-3 active:text-[var(--fr-fg)] disabled:opacity-30">Annulla</button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 mb-3 [scrollbar-width:none]">
          {game.teams.map((t, i) => {
            const active = game.phase === "guess" && i === cur;
            return (
              <div
                key={i}
                className="flex-none flex items-center gap-2 pl-2.5 pr-3 py-1.5 rounded-full border text-sm font-semibold whitespace-nowrap transition-colors"
                style={{
                  borderColor: active ? FR_TEAM_COLORS[i] : "var(--fr-line)",
                  background: active ? `color-mix(in srgb, ${FR_TEAM_COLORS[i]} 16%, var(--fr-stage))` : "var(--fr-stage)",
                }}
              >
                <span className="w-2 h-2 rounded-full" style={{ background: FR_TEAM_COLORS[i] }} />
                {t.name}
                <span
                  key={t.score}
                  className={`fr-display font-extrabold text-xl tabular-nums ${game.winner === i && game.phase === "solved" ? "fr-bump" : ""}`}
                >
                  {t.score}
                </span>
              </div>
            );
          })}
        </div>

        {/* Studio */}
        <section className="rounded-2xl border border-[var(--fr-line)] bg-gradient-to-b from-[var(--fr-stage-2)] to-[var(--fr-stage)] px-3.5 md:px-10 pb-5 md:pb-8 overflow-hidden">
          <div className="fr-gallows">
            <div className="fr-beam" />
            <div className="fr-post l" />
            <div className="fr-post r" />
            <div
              className={`fr-blade ${timed ? "" : "off"} ${timed && timeLeft > 0 && secsLeft <= 5 ? "urgent" : ""} ${timed && timeLeft === 0 ? "down" : ""}`}
              style={{ "--p": progress } as React.CSSProperties}
            >
              {timed && <span>{timeLeft === 0 ? "TEMPO!" : running ? secsLeft : `‖ ${secsLeft}`}</span>}
            </div>
          </div>

          <div className="fr-tiles">
            {word.clues.map((c, i) => (
              <div key={`${word.id}-${i}`} className={`fr-tile ${i < shown ? "open" : ""}`}>
                <div className="fr-face front">{i + 1}</div>
                <div className="fr-face back">
                  <span className="num">{i + 1}</span>
                  {c}
                </div>
              </div>
            ))}
          </div>

          <p className="fr-rule fr-eyebrow mt-4 mb-2.5 md:mt-6 md:mb-3.5">la parola che le lega</p>
          <div key={`${word.id}-${live}`} className={`fr-slot ${live ? "" : "lit"}`}>{live ? "?" : word.answer}</div>
        </section>

        {/* Turno / esito */}
        {live ? (
          <div
            key={turnKey}
            className={`mt-3.5 grid gap-3 md:grid-cols-[1fr_auto] md:items-center rounded-2xl bg-[var(--fr-stage)] border border-[var(--fr-line)] border-l-[6px] px-4 py-3.5 md:px-5 ${game.attempt > 0 || open ? "fr-shake" : ""}`}
            style={{ borderLeftColor: open ? "var(--fr-brass)" : FR_TEAM_COLORS[cur] }}
          >
            <div className="min-w-0">
              <p className="fr-eyebrow">{open ? `${game.teams[miss].name} ha sbagliato` : "Tocca a"}</p>
              <p
                className="fr-display text-[clamp(32px,9vw,48px)] break-words"
                style={{ color: open ? "var(--fr-brass)" : FR_TEAM_COLORS[cur] }}
              >
                {open ? "Tutti possono rispondere" : game.teams[cur].name}
              </p>
              <p className="text-[#c3c8e2] mt-1">
                {open ? (
                  <>Chi indovina per primo prende <Em>{pts(FR_POINTS[2])}</Em></>
                ) : (
                  <>
                    {["Una parola", "Due parole", "Tutte e tre le parole"][shown - 1]} · vale <Em>{pts(stake * (game.bet ? 2 : 1))}</Em>
                    {game.bet && <> · rischia <Em>−{stake}</Em></>}
                  </>
                )}
              </p>
              {game.lost && (
                <p className="mt-1 font-semibold text-[var(--fr-bad)]">
                  {game.teams[game.lost.team].name} perde la scommessa: −{game.lost.points}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-1 md:justify-end" aria-label="Ordine dei tentativi">
              {Array.from({ length: FR_TURNS }, (_, a) => {
                const ti = teamAt(game, a);
                const now = game.phase === "guess" && a === game.attempt;
                const past = open || a < game.attempt;
                return (
                  <div
                    key={a}
                    className={`flex flex-col items-center gap-1 px-2 py-1.5 rounded-lg text-[11px] font-bold min-w-[52px] ${now ? "bg-[var(--fr-stage-2)]" : ""} ${past ? "opacity-35 line-through" : ""}`}
                    style={{ color: now ? FR_TEAM_COLORS[ti] : "var(--fr-muted)" }}
                  >
                    <Pips on={cluesAt(a)} />
                    <span className="max-w-[72px] truncate">{game.teams[ti].name}</span>
                  </div>
                );
              })}
              <div
                className={`flex flex-col items-center gap-1 px-2 py-1.5 rounded-lg text-[11px] font-bold min-w-[52px] ${open ? "bg-[var(--fr-stage-2)]" : ""}`}
                style={{ color: open ? "var(--fr-brass)" : "var(--fr-muted)" }}
              >
                <Pips on={3} all />
                <span>Tutti</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-3.5 grid gap-4 md:grid-cols-[1fr_auto] md:items-center rounded-2xl bg-[var(--fr-stage)] border border-[var(--fr-line)] px-4 py-4 md:px-5">
            <div className="min-w-0">
              <p className={`fr-display text-[clamp(32px,9vw,46px)] break-words ${game.phase === "solved" ? "text-[var(--fr-ok)]" : "text-[var(--fr-bad)]"}`}>
                {game.phase === "solved" && game.winner !== null ? `${game.teams[game.winner].name} +${game.gained}` : "Nessuno ce l'ha fatta"}
              </p>
              {game.betWon && <p className="fr-eyebrow text-[var(--fr-brass)]">Scommessa vinta, punti doppi</p>}
              {/* I collegamenti arrivano uno alla volta: è il momento dell'"aaah". */}
              <ul key={word.id} className="mt-3 grid gap-1.5 text-[#c3c8e2]">
                {word.links.map((l, i) => (
                  <li key={l} className="fr-link" style={{ "--i": i } as React.CSSProperties}>
                    <b className="text-[var(--fr-brass)]">{word.clues[i]}</b> <span className="text-[var(--fr-muted)]">↳</span> {l}
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => play({ type: "next" })}
              className="min-h-[54px] px-5 rounded-xl bg-[var(--fr-brass)] text-[var(--fr-paper-ink)] font-bold text-[17px] active:scale-[0.97] transition-transform inline-flex items-center justify-center gap-2"
            >
              {isLastWord ? "Classifica finale" : "Prossima parola"} <Kbd>Invio</Kbd>
            </button>
          </div>
        )}

        {/* Console del conduttore */}
        {live && (
          <>
            <div className="fr-console-spacer" />
            <section className="fr-console md:mt-3.5 grid gap-2.5" aria-label="Comandi del conduttore">
              <div className="hidden md:flex justify-between gap-2.5">
                <span className="fr-eyebrow">Console del conduttore</span>
                <span className="fr-keys text-xs text-[var(--fr-muted)]">Tasti: G giusta · S sbagliata · B scommessa · Spazio pausa</span>
              </div>
              <div className="flex items-center gap-2.5 pl-3 pr-1.5 py-1.5 rounded-xl bg-[var(--fr-stage)] border border-[var(--fr-line)]">
                <span className={`flex-1 min-w-0 fr-display font-extrabold text-[22px] tracking-wider break-words ${peek ? "" : "text-[#3a4577]"}`}>
                  {peek ? word.answer : "• • •"}
                </span>
                <button
                  onClick={() => setPeek((v) => !v)}
                  className="px-3 py-2 rounded-lg border border-[var(--fr-line)] text-[13px] font-bold active:bg-[var(--fr-stage-2)]"
                >
                  {peek ? "Nascondi" : "Mostra a me"}
                </button>
              </div>

              {open ? (
                <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2.5">
                  {game.teams.map((t, i) =>
                    i === miss ? null : (
                      <button
                        key={i}
                        onClick={() => play({ type: "steal", team: i })}
                        className="min-h-[58px] rounded-xl border font-bold leading-tight flex flex-col items-center justify-center active:scale-[0.97] transition-transform"
                        style={{
                          borderColor: FR_TEAM_COLORS[i],
                          background: `color-mix(in srgb, ${FR_TEAM_COLORS[i]} 22%, var(--fr-stage))`,
                        }}
                      >
                        <span className="max-w-full truncate px-2">{t.name}</span>
                        <span className="text-[11px] font-semibold text-[var(--fr-muted)]">ha indovinato</span>
                      </button>
                    )
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={() => play({ type: "bet" })}
                    aria-pressed={game.bet}
                    className={`min-h-11 rounded-xl border font-bold text-[15px] transition-colors inline-flex items-center justify-center gap-2 ${
                      game.bet
                        ? "border-[var(--fr-brass)] bg-[color-mix(in_srgb,var(--fr-brass)_22%,var(--fr-stage))] text-[var(--fr-fg)]"
                        : "border-dashed border-[var(--fr-line)] bg-[var(--fr-stage)] text-[var(--fr-muted)]"
                    }`}
                  >
                    {game.bet ? `Scommessa: +${stake * 2} o −${stake}` : "Scommettono? Punti doppi o li perdono"} <Kbd>B</Kbd>
                  </button>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      onClick={() => play({ type: "wrong" })}
                      className="min-h-[58px] rounded-xl bg-[var(--fr-bad)] text-[#2a0503] font-bold text-[17px] active:scale-[0.97] transition-transform inline-flex items-center justify-center gap-2"
                    >
                      Sbagliata <Kbd>S</Kbd>
                    </button>
                    <button
                      onClick={() => play({ type: "right" })}
                      className="min-h-[58px] rounded-xl bg-[var(--fr-ok)] text-[#062418] font-bold text-[17px] active:scale-[0.97] transition-transform inline-flex items-center justify-center gap-2"
                    >
                      Giusta <Kbd>G</Kbd>
                    </button>
                  </div>
                </>
              )}

              <div className="flex gap-2">
                {seconds > 0 && (
                  <button
                    onClick={() => setRunning((r) => !r)}
                    disabled={timeLeft === 0}
                    className="flex-1 py-2 rounded-lg border border-[var(--fr-line)] bg-[var(--fr-stage)] text-[13px] font-bold active:bg-[var(--fr-stage-2)] disabled:opacity-35"
                  >
                    {running ? "Pausa" : "Riprendi"}
                  </button>
                )}
                <button
                  onClick={() => play({ type: "reveal" })}
                  className="flex-1 py-2 rounded-lg border border-[var(--fr-line)] bg-[var(--fr-stage)] text-[13px] font-bold active:bg-[var(--fr-stage-2)]"
                >
                  {open ? "Nessuno · svela" : "Svela"}
                </button>
              </div>
            </section>
          </>
        )}
      </div>

      {confirmExit && (
        <div className="fixed inset-0 z-30 bg-black/70 flex items-end md:items-center justify-center p-4" onClick={() => setConfirmExit(false)}>
          <div
            className="w-full max-w-sm rounded-2xl bg-[var(--fr-stage)] border border-[var(--fr-line)] p-5 grid gap-3 mb-[env(safe-area-inset-bottom)]"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-semibold">Uscire dalla partita?</p>
            <p className="text-sm text-[var(--fr-muted)]">I punteggi di questa partita andranno persi.</p>
            <div className="grid grid-cols-2 gap-2.5 mt-1">
              <button onClick={() => setConfirmExit(false)} className="py-3 rounded-xl border border-[var(--fr-line)] font-semibold">Resta</button>
              <button onClick={onExit} className="py-3 rounded-xl bg-[var(--fr-bad)] text-[#2a0503] font-bold">Esci</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return <kbd className="hidden md:inline text-[11px] font-semibold px-1.5 rounded border border-current opacity-60">{children}</kbd>;
}

// ───────────────────────── Classifica ─────────────────────────

function Final({ game, onAgain, onExit }: { game: FrancottinaState; onAgain: () => void; onExit: () => void }) {
  const ranked = game.teams.map((t, i) => ({ ...t, i })).sort((a, b) => b.score - a.score);
  const top = ranked[0].score;
  const winners = ranked.filter((t) => t.score === top);

  return (
    <div className="fr">
      <div className="max-w-xl mx-auto px-4 pt-10 pb-10 grid gap-7 justify-items-center text-center">
        <p className="fr-eyebrow">Fine partita</p>
        <h2 className="fr-logo text-[clamp(52px,15vw,104px)] break-words max-w-full">
          {winners.length > 1 ? "Pareggio!" : <>Vince <b>{winners[0].name}</b></>}
        </h2>
        <div className="w-full grid gap-2">
          {ranked.map((t) => {
            const first = t.score === top;
            return (
              <div
                key={t.i}
                className={`grid grid-cols-[36px_1fr_auto] gap-3 items-center px-4 py-3.5 rounded-xl border text-left ${
                  first ? "border-[var(--fr-brass)] bg-[color-mix(in_srgb,var(--fr-brass)_12%,var(--fr-stage))]" : "border-[var(--fr-line)] bg-[var(--fr-stage)]"
                }`}
              >
                <span className={`fr-display text-[28px] ${first ? "text-[var(--fr-brass)]" : "text-[var(--fr-muted)]"}`}>
                  {ranked.findIndex((x) => x.score === t.score) + 1}
                </span>
                <span className="flex items-center gap-2.5 min-w-0 font-bold text-lg break-words">
                  <span className="w-4 h-4 rounded-full flex-none" style={{ background: FR_TEAM_COLORS[t.i] }} />
                  {t.name}
                </span>
                <span className="fr-display text-[34px] tabular-nums">{t.score}</span>
              </div>
            );
          })}
        </div>
        <button
          onClick={onAgain}
          className="w-full fr-display font-extrabold text-[22px] tracking-wider bg-[var(--fr-brass)] text-[var(--fr-paper-ink)] rounded-xl py-4 active:scale-[0.98] transition-transform"
        >
          Nuova partita
        </button>
        <button onClick={onExit} className="-mt-4 text-sm text-[var(--fr-muted)] active:text-[var(--fr-fg)] py-2">
          Cambia modalità
        </button>
      </div>
    </div>
  );
}
