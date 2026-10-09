import React, { useEffect, useState } from "react";
import { AstaScreen, BackPill, IconHammer, MonoLabel, Paddle, btnRed } from "./parts";
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
  pickAstaLots,
} from "@/services/astaService";
import { MAX_TEAM_NAME_LENGTH } from "@/utils/constants";
import type { GameAction } from "@/types/actions.types";

interface AstaSetupProps {
  dispatch: React.Dispatch<GameAction>;
}

type Source = "both" | "catalog" | "mine";

export function AstaSetup({ dispatch }: AstaSetupProps) {
  const [names, setNames] = useState<string[]>(["", ""]);
  const [affare, setAffare] = useState(true);
  const [bidone, setBidone] = useState(true);
  const [source, setSource] = useState<Source>("both");
  const [mine, setMine] = useState<AstaItem[]>([]);
  const [managing, setManaging] = useState(false);
  const [browsing, setBrowsing] = useState(false);
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
    if (new Set(lower).size !== lower.length) return setError("Le squadre devono avere nomi diversi");
    if (available < needed) {
      return setError(`Servono almeno ${needed} lotti per ${names.length} squadre: ne hai ${available}.`);
    }
    dispatch({
      type: "ASTA_SETUP",
      payload: { teamNames: finalNames, bonuses: { affare, bidone }, lots: pickAstaLots(catalogPool, ownPool, lotCount) },
    });
  };

  return (
    <AstaScreen>
      <div className="flex items-center justify-between">
        <BackPill onClick={() => dispatch({ type: "CLEAR_MODE" })} />
        <MonoLabel>CASA D'ASTE</MonoLabel>
      </div>

      <div className="relative flex flex-col gap-1.5 rounded-b-[22px] rounded-t-md bg-asta-cream px-[18px] pb-5 pt-[18px] text-asta-ink">
        <span className="font-asta-mono text-[11px] font-bold tracking-[0.14em] text-asta-brown">CATALOGO DELLA SERATA</span>
        <h1 className="text-[54px] font-extrabold leading-[0.88] tracking-[-0.03em] text-asta-red">
          ASTA
          <br />
          FOLLE
        </h1>
        <p className="max-w-[230px] text-sm font-semibold leading-snug text-asta-ink-soft">
          {lotCount} lotti, valori segreti, un solo martello. Vince chi porta a casa il tesoro più prezioso.
        </p>
        <span
          className="absolute bottom-[18px] right-4 flex h-[70px] w-[70px] rotate-[-12deg] items-center justify-center rounded-full border-[3px] border-asta-red text-center font-asta-mono text-[10px] font-bold leading-tight text-asta-red"
          aria-hidden
        >
          {ASTA_START_CREDITS}
          <br />
          CREDITI
          <br />A TESTA
        </span>
      </div>

      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-extrabold">Le palette in sala</h2>
        <MonoLabel>
          {names.length} / {ASTA_MAX_TEAMS}
        </MonoLabel>
      </div>
      <ul className="flex flex-col gap-1.5">
        {names.map((name, i) => (
          <li key={i} className="flex h-14 items-center gap-3 rounded-full border border-asta-line bg-asta-surface pl-1.5 pr-1.5">
            <Paddle team={{ name: finalNames[i], color: ASTA_TEAM_COLORS[i], credits: 0 }} index={i} size={44} />
            <label htmlFor={`asta-team-${i}`} className="sr-only">Nome squadra {i + 1}</label>
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
              className="min-w-0 flex-1 bg-transparent text-[17px] font-extrabold text-asta-cream placeholder:font-semibold placeholder:text-asta-muted/70 focus:outline-none"
            />
            {names.length > ASTA_MIN_TEAMS && (
              <button
                type="button"
                aria-label={`Rimuovi ${finalNames[i]}`}
                onClick={() => setNames((ns) => ns.filter((_, j) => j !== i))}
                className="flex h-11 w-11 items-center justify-center rounded-full text-asta-muted active:scale-95"
              >
                ×
              </button>
            )}
          </li>
        ))}
      </ul>
      {names.length < ASTA_MAX_TEAMS && (
        <button
          type="button"
          onClick={() => setNames((ns) => [...ns, ""])}
          className="h-12 rounded-full border-2 border-dashed border-asta-line-strong text-sm font-extrabold text-asta-mustard active:scale-[0.98]"
        >
          + Aggiungi una paletta
        </button>
      )}

      <div className="flex flex-col gap-1.5 border-y border-dashed border-asta-line py-2.5">
        <MonoLabel>CONDIZIONI DI VENDITA</MonoLabel>
        {[
          ["Lotti per squadra", String(ASTA_LOTS_PER_TEAM)],
          ["Base d'asta", `${ASTA_MIN_BID} credito`],
          ["Vince", "chi ha i lotti di più valore"],
          ["Crediti avanzati", "non valgono nulla"],
        ].map(([k, v]) => (
          <span key={k} className="flex justify-between font-asta-mono text-[13px]">
            <span>{k}</span>
            <span className="text-asta-mustard">{v}</span>
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <BonusToggle
          on={affare}
          onClick={() => setAffare((v) => !v)}
          kind="BONUS"
          title="Affare del secolo"
          amount={`+${formatEuro(ASTA_BONUS_AFFARE)}`}
          className="-rotate-[1.5deg] bg-asta-green text-asta-green-ink"
        />
        <BonusToggle
          on={bidone}
          onClick={() => setBidone((v) => !v)}
          kind="MALUS"
          title="Il bidone"
          amount={`−${formatEuro(-ASTA_MALUS_BIDONE)}`}
          className="rotate-[1.5deg] bg-asta-red text-asta-red-ink"
        />
      </div>

      <div className="flex flex-col gap-2">
        <MonoLabel>DA DOVE ARRIVANO I LOTTI</MonoLabel>
        <div className="grid grid-cols-3 gap-1 rounded-full border border-asta-line bg-asta-surface p-1">
          {(
            [
              ["both", "Tutti"],
              ["catalog", "Catalogo"],
              ["mine", "Solo miei"],
            ] as [Source, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={source === id}
              onClick={() => setSource(id)}
              className={`h-10 rounded-full text-[13px] ${source === id ? "bg-asta-cream font-extrabold text-asta-ink" : "font-bold text-asta-muted"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setManaging(true)}
          className="flex h-[52px] items-center justify-between rounded-full border border-asta-line bg-asta-surface pl-[18px] pr-2 text-sm font-bold active:scale-[0.98]"
        >
          <span>
            {lotCount} lotti · {lotCount - fromMine} dal catalogo + {fromMine} tuoi
          </span>
          <span className="flex h-9 items-center rounded-full bg-asta-cream px-3.5 font-extrabold text-asta-ink">I miei lotti</span>
        </button>
        <button
          type="button"
          onClick={() => setBrowsing(true)}
          className="h-12 rounded-full border-[1.5px] border-dashed border-asta-mustard text-sm font-extrabold text-asta-mustard active:scale-[0.98]"
        >
          Sfoglia il catalogo · {ASTA_CATALOG.length + mine.length} lotti
        </button>
      </div>

      {error && (
        <p role="alert" className="rounded-2xl border border-asta-red bg-[#2A1410] px-4 py-3 text-center text-sm font-bold text-[#FFB3A3]">
          {error}
        </p>
      )}

      <button type="button" onClick={start} className={`${btnRed} mt-auto h-[62px] text-[19px]`}>
        <IconHammer />
        Apri l'asta
      </button>
    </AstaScreen>
  );
}

function BonusToggle({
  on,
  onClick,
  kind,
  title,
  amount,
  className,
}: {
  on: boolean;
  onClick: () => void;
  kind: string;
  title: string;
  amount: string;
  className: string;
}) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`flex flex-col gap-0.5 rounded-2xl p-3 text-left transition-opacity active:scale-[0.98] ${className} ${on ? "" : "opacity-35 grayscale"}`}
    >
      <span className="font-asta-mono text-[11px] font-bold">
        {kind} · {on ? "ATTIVO" : "SPENTO"}
      </span>
      <span className="text-base font-extrabold leading-tight">{title}</span>
      <span className="text-xl font-extrabold">{amount}</span>
    </button>
  );
}
