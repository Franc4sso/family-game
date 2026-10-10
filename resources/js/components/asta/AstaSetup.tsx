import React, { useEffect, useState } from "react";
import { AstaScreen, IconBack, IconChevron, IconClose, IconHammer, Paddle, btnRed } from "./parts";
import { AstaMyItems } from "./AstaMyItems";
import { AstaCatalogBrowser } from "./AstaCatalogBrowser";
import { ASTA_CATALOG } from "@/data/asta";
import type { AstaItem } from "@/data/asta";
import { listCustomItems } from "@/services/astaCustomItems";
import {
  ASTA_BONUS_AFFARE,
  ASTA_LOTS_PER_TEAM,
  ASTA_MALUS_BIDONE,
  ASTA_MAX_TEAMS,
  ASTA_MIN_BID,
  ASTA_MIN_TEAMS,
  ASTA_SPARE_LOTS,
  ASTA_START_CREDITS,
  ASTA_TEAM_COLORS,
  formatEuro,
  paddleNumber,
  pickAstaLots,
} from "@/services/astaService";
import { MAX_TEAM_NAME_LENGTH } from "@/utils/constants";
import type { GameAction } from "@/types/actions.types";

interface AstaSetupProps {
  dispatch: React.Dispatch<GameAction>;
}

type Source = "both" | "catalog" | "mine";
type Tab = "teams" | "rules" | "lots";

const SOURCES: [Source, string][] = [
  ["both", "Tutti"],
  ["catalog", "Catalogo"],
  ["mine", "Solo miei"],
];

export function AstaSetup({ dispatch }: AstaSetupProps) {
  const [names, setNames] = useState<string[]>(["", ""]);
  const [affare, setAffare] = useState(true);
  const [bidone, setBidone] = useState(true);
  const [source, setSource] = useState<Source>("both");
  const [mine, setMine] = useState<AstaItem[]>([]);
  const [managing, setManaging] = useState(false);
  const [browsing, setBrowsing] = useState(false);
  const [tab, setTab] = useState<Tab>("teams");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!managing) listCustomItems().then(setMine);
  }, [managing]);

  if (managing) return <AstaMyItems onClose={() => setManaging(false)} />;
  if (browsing) return <AstaCatalogBrowser onClose={() => setBrowsing(false)} />;

  const finalNames = names.map((n, i) => n.trim() || `Squadra ${i + 1}`);
  const needed = names.length * ASTA_LOTS_PER_TEAM;
  const wanted = needed + ASTA_SPARE_LOTS;
  const ownPool = source === "catalog" ? [] : mine;
  const catalogPool = source === "mine" ? [] : ASTA_CATALOG;
  const available = ownPool.length + catalogPool.length;
  const lotCount = Math.min(wanted, available);
  const fromMine = Math.min(ownPool.length, lotCount);

  const start = () => {
    const lower = finalNames.map((n) => n.toLowerCase());
    if (new Set(lower).size !== lower.length) {
      setTab("teams");
      return setError("Le squadre devono avere nomi diversi");
    }
    if (available < needed) {
      setTab("lots");
      return setError(`Servono almeno ${needed} lotti per ${names.length} squadre: ne hai ${available}.`);
    }
    dispatch({
      type: "ASTA_SETUP",
      payload: { teamNames: finalNames, bonuses: { affare, bidone }, lots: pickAstaLots(catalogPool, ownPool, lotCount) },
    });
  };

  const tabs: { id: Tab; label: string; badge?: string }[] = [
    { id: "teams", label: "Squadre", badge: String(names.length) },
    { id: "rules", label: "Regole" },
    { id: "lots", label: "Lotti", badge: String(lotCount) },
  ];

  return (
    <AstaScreen tone="paper">
      <header className="flex h-11 items-center justify-between">
        <button
          type="button"
          aria-label="Indietro"
          onClick={() => dispatch({ type: "CLEAR_MODE" })}
          className="asta-press flex h-11 w-11 items-center justify-center rounded-full border-2 border-asta-ink"
        >
          <IconBack />
        </button>
        <span className="font-asta-mono text-xs font-bold text-asta-brown">CATALOGO DELLA SERATA</span>
      </header>

      <section className="relative flex flex-col gap-1.5 pr-[92px]">
        <h1 className="m-0 text-[54px] leading-[0.9] font-extrabold tracking-[-0.045em] text-asta-red">Asta Folle</h1>
        <p className="m-0 text-[15px] leading-snug font-semibold text-asta-ink-soft">
          {lotCount} lotti, valori segreti, un solo martello.
        </p>
        <span
          className="absolute -top-0.5 right-0 flex h-[82px] w-[82px] -rotate-12 flex-col items-center justify-center rounded-full border-[3px] border-asta-red leading-none text-asta-red"
          aria-hidden
        >
          <span className="text-[28px] font-extrabold tracking-[-0.03em]">{ASTA_START_CREDITS}</span>
          <span className="font-asta-mono text-[9px] font-bold">CREDITI</span>
          <span className="font-asta-mono text-[9px] font-bold">A TESTA</span>
        </span>
      </section>

      <div role="tablist" aria-label="Preparazione dell’asta" className="grid grid-cols-3 gap-1 rounded-full bg-asta-paper-track p-1">
        {tabs.map((t) => {
          const on = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`asta-tab-${t.id}`}
              aria-selected={on}
              aria-controls={`asta-pane-${t.id}`}
              onClick={() => setTab(t.id)}
              className={`asta-press flex h-11 items-center justify-center gap-1.5 rounded-full text-[15px] font-extrabold transition-colors ${
                on ? "bg-asta-ink text-asta-cream" : "text-asta-ink-soft"
              }`}
            >
              {t.label}
              {t.badge && <span className="font-asta-mono text-[11px] font-bold opacity-70">{t.badge}</span>}
            </button>
          );
        })}
      </div>

      {tab === "teams" && (
        <section key="teams" id="asta-pane-teams" role="tabpanel" aria-labelledby="asta-tab-teams" className="asta-pane flex flex-col gap-2">
          <p className="m-0 text-sm font-semibold text-asta-ink-muted">Ogni squadra alza la sua paletta per rilanciare. Scrivi i nomi.</p>
          <ul className="m-0 grid list-none grid-cols-2 gap-2 p-0">
            {names.map((name, i) => (
              <li
                key={i}
                className="relative flex flex-col gap-2 rounded-[18px] bg-asta-paper-2 px-3 pt-3 pb-2.5 shadow-[inset_0_0_0_1.5px_var(--color-asta-paper-line)] focus-within:shadow-[inset_0_0_0_2px_var(--color-asta-ink)]"
              >
                <Paddle team={{ name: finalNames[i], color: ASTA_TEAM_COLORS[i], credits: 0 }} index={i} size={44} handle className="self-start" />
                <label htmlFor={`asta-team-${i}`} className="sr-only">
                  Nome della squadra {i + 1}
                </label>
                <input
                  id={`asta-team-${i}`}
                  value={name}
                  maxLength={MAX_TEAM_NAME_LENGTH}
                  placeholder={`Squadra ${i + 1}`}
                  autoComplete="off"
                  onChange={(e) => {
                    setError(null);
                    setNames((ns) => ns.map((n, j) => (j === i ? e.target.value : n)));
                  }}
                  className="h-10 w-full border-0 border-b-2 border-asta-ink bg-transparent p-0 text-[17px] font-extrabold text-asta-ink placeholder:font-semibold placeholder:text-asta-paper-faint focus:outline-none"
                />
                {names.length > ASTA_MIN_TEAMS && (
                  <button
                    type="button"
                    aria-label={`Togli la squadra ${i + 1}`}
                    onClick={() => setNames((ns) => ns.filter((_, j) => j !== i))}
                    className="asta-press absolute top-1 right-1 flex h-11 w-11 items-center justify-center rounded-full text-asta-paper-faint"
                  >
                    <IconClose size={16} />
                  </button>
                )}
              </li>
            ))}
            {names.length < ASTA_MAX_TEAMS && (
              <li className="flex">
                <button
                  type="button"
                  onClick={() => setNames((ns) => [...ns, ""])}
                  className="asta-press flex min-h-32 flex-1 flex-col items-center justify-center gap-1.5 rounded-[18px] border-2 border-dashed border-asta-paper-dash text-asta-brown"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-dashed border-asta-paper-dash text-2xl font-bold" aria-hidden>
                    +
                  </span>
                  <span className="text-[15px] font-extrabold">Aggiungi paletta</span>
                  <span className="font-asta-mono text-[11px] font-bold text-asta-paper-faint">N. {paddleNumber(names.length)}</span>
                </button>
              </li>
            )}
          </ul>
        </section>
      )}

      {tab === "rules" && (
        <section key="rules" id="asta-pane-rules" role="tabpanel" aria-labelledby="asta-tab-rules" className="asta-pane flex flex-col gap-3">
          <dl className="m-0 flex flex-col gap-2 rounded-t-md rounded-b-[18px] bg-asta-paper-2 px-4 py-3.5 shadow-[inset_0_0_0_1.5px_var(--color-asta-paper-line)]">
            <span className="font-asta-mono text-[11px] font-bold text-asta-brown">CONDIZIONI DI VENDITA</span>
            {[
              ["Crediti a testa", String(ASTA_START_CREDITS)],
              ["Lotti per squadra", String(ASTA_LOTS_PER_TEAM)],
              ["Base d’asta", `${ASTA_MIN_BID} credito`],
              ["Vince", "chi ha i lotti di più valore"],
              ["Crediti avanzati", "non valgono nulla"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 text-base">
                <dt className="font-semibold">{k}</dt>
                <dd className="m-0 text-right font-extrabold">{v}</dd>
              </div>
            ))}
          </dl>
          <h2 className="m-0 text-[17px] font-extrabold">Premi di fine serata</h2>
          <div className="grid grid-cols-2 gap-2.5">
            <BonusToggle
              on={affare}
              onClick={() => setAffare((v) => !v)}
              kind="BONUS"
              title="Affare del secolo"
              amount={`+${formatEuro(ASTA_BONUS_AFFARE)}`}
              note="Il lotto che rende di più per credito speso"
              className="-rotate-[1.5deg] bg-asta-green text-asta-green-ink"
            />
            <BonusToggle
              on={bidone}
              onClick={() => setBidone((v) => !v)}
              kind="MALUS"
              title="Il bidone"
              amount={`−${formatEuro(-ASTA_MALUS_BIDONE)}`}
              note="A chi compra il lotto che vale meno"
              className="rotate-[1.5deg] bg-asta-red text-asta-red-ink"
            />
          </div>
          <p className="m-0 text-[13px] font-semibold text-asta-ink-muted">Tocca un premio per accenderlo o spegnerlo.</p>
        </section>
      )}

      {tab === "lots" && (
        <section key="lots" id="asta-pane-lots" role="tabpanel" aria-labelledby="asta-tab-lots" className="asta-pane flex flex-col gap-3">
          <h2 className="m-0 text-[17px] font-extrabold">Da dove arrivano i lotti</h2>
          <div role="group" aria-label="Da dove arrivano i lotti" className="grid grid-cols-3 gap-1 rounded-full bg-asta-paper-track p-1">
            {SOURCES.map(([id, label]) => (
              <button
                key={id}
                type="button"
                aria-pressed={source === id}
                onClick={() => {
                  setError(null);
                  setSource(id);
                }}
                className={`asta-press h-10 rounded-full text-sm transition-colors ${
                  source === id ? "bg-asta-ink font-extrabold text-asta-cream" : "font-bold text-asta-ink-soft"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3.5 rounded-l-md rounded-r-[30px] bg-asta-ink px-4 py-3.5 text-asta-cream">
            <span className="h-3.5 w-3.5 shrink-0 rounded-full bg-asta-paper" aria-hidden />
            <span className="flex flex-col">
              <span className="font-asta-mono text-[10px] font-bold text-asta-muted">STASERA IN CATALOGO</span>
              <span className="text-[22px] font-extrabold">{lotCount} lotti</span>
              <span className="text-[13px] font-semibold text-[#D9CCBD]">
                {lotCount - fromMine} dal catalogo pronto e {fromMine} {fromMine === 1 ? "tuo" : "tuoi"}
              </span>
            </span>
          </div>
          <LinkRow title="I miei lotti" note={mine.length === 0 ? "Aggiungi oggetti con la tua foto" : `${mine.length} ${mine.length === 1 ? "oggetto" : "oggetti"} con la tua foto`} onClick={() => setManaging(true)} />
          <LinkRow title="Sfoglia il catalogo" note={`${ASTA_CATALOG.length + mine.length} lotti disponibili`} onClick={() => setBrowsing(true)} />
        </section>
      )}

      {error && (
        <p role="alert" className="m-0 rounded-2xl bg-asta-danger-bg px-4 py-3 text-center text-sm font-bold text-asta-danger">
          {error}
        </p>
      )}

      <button type="button" onClick={start} className={`${btnRed} mt-auto h-[62px] shrink-0 text-[19px]`}>
        <IconHammer />
        Apri l’asta
      </button>
    </AstaScreen>
  );
}

function LinkRow({ title, note, onClick }: { title: string; note: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="asta-press flex h-16 items-center justify-between rounded-2xl bg-asta-paper-2 px-4 text-left shadow-[inset_0_0_0_1.5px_var(--color-asta-paper-line)]"
    >
      <span className="flex flex-col gap-0.5">
        <span className="text-base font-extrabold">{title}</span>
        <span className="text-[13px] font-semibold text-asta-ink-muted">{note}</span>
      </span>
      <IconChevron />
    </button>
  );
}

function BonusToggle({
  on,
  onClick,
  kind,
  title,
  amount,
  note,
  className,
}: {
  on: boolean;
  onClick: () => void;
  kind: string;
  title: string;
  amount: string;
  note: string;
  className: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`asta-press flex flex-col gap-[3px] rounded-2xl px-3 py-3.5 text-left transition-opacity ${className} ${on ? "" : "opacity-40"}`}
    >
      <span className="font-asta-mono text-[10px] font-bold">
        {kind} · {on ? "ACCESO" : "SPENTO"}
      </span>
      <span className="text-[17px] leading-tight font-extrabold">{title}</span>
      <span className="text-2xl font-extrabold">{amount}</span>
      <span className="text-xs leading-snug font-semibold">{note}</span>
    </button>
  );
}
