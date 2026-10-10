import React, { useState } from "react";
import { FeudBack, FeudScreen } from "../feud/parts";
import { IconArrowRight } from "../master/parts";
import { validateTeamName, validateUniqueTeamNames } from "@/utils/validators";
import { MAX_TEAM_NAME_LENGTH } from "@/utils/constants";
import type { GameAction } from "@/types";

interface FeudTeamSetupProps {
  dispatch: React.Dispatch<GameAction>;
  onBack: () => void;
}

/** Nomi delle squadre di Family Feud: gialla contro corallo. */
export function FeudTeamSetup({ dispatch, onBack }: FeudTeamSetupProps) {
  const [nameA, setNameA] = useState("");
  const [nameB, setNameB] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errorA = validateTeamName(nameA);
    const errorB = validateTeamName(nameB);
    const errorUnique = validateUniqueTeamNames(nameA, nameB);

    if (errorA || errorB || errorUnique) {
      setError(errorA || errorB || errorUnique);
      return;
    }

    dispatch({ type: "SET_TEAMS", payload: { nameA, nameB } });
  };

  return (
    <FeudScreen>
      <div className="flex h-11 items-center">
        <FeudBack onClick={onBack} />
      </div>

      <section className="flex flex-col gap-2.5">
        <h1 className="m-0 font-feud text-[92px] leading-[0.82] font-black text-feud-yellow uppercase">
          Family
          <br />
          Feud
        </h1>
        <p className="m-0 text-[17px] font-semibold text-feud-muted">Come si chiamano le due squadre?</p>
      </section>

      <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-5 pt-1">
        <div className="relative flex flex-col gap-2.5">
          <TeamField
            id="team-a"
            label="Squadra A"
            value={nameA}
            onChange={setNameA}
            placeholder="Famiglia Rossi"
            className="bg-feud-yellow text-feud-ink"
            labelClass="text-feud-ink-soft"
            placeholderClass="placeholder:text-feud-ink/30"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-5 z-10 flex h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full bg-feud-blue"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white font-feud text-[22px] font-black text-feud-blue">
              VS
            </span>
          </span>
          <TeamField
            id="team-b"
            label="Squadra B"
            value={nameB}
            onChange={setNameB}
            placeholder="Famiglia Bianchi"
            className="bg-feud-coral text-feud-coral-ink"
            labelClass="text-feud-coral-ink-soft"
            placeholderClass="placeholder:text-feud-coral-ink/30"
          />
        </div>

        {error && (
          <p role="alert" className="m-0 rounded-[14px] bg-feud-red px-4 py-3 text-center text-sm font-bold text-white">
            {error}
          </p>
        )}

        <div className="mt-auto flex flex-col gap-2.5">
          <p className="m-0 text-sm leading-normal text-feud-muted">
            Si gioca a round: chi vince il round prende un punto. Tre errori e la parola passa agli avversari.
          </p>
          <button
            type="submit"
            className="feud-press flex h-[60px] items-center justify-center gap-2.5 rounded-[18px] bg-white text-lg font-extrabold text-feud-ink"
          >
            Scegli la categoria
            <IconArrowRight />
          </button>
        </div>
      </form>
    </FeudScreen>
  );
}

function TeamField({
  id,
  label,
  value,
  onChange,
  placeholder,
  className,
  labelClass,
  placeholderClass,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  className: string;
  labelClass: string;
  placeholderClass: string;
}) {
  return (
    <div className={`flex flex-col gap-1 rounded-[20px] px-4 pt-3.5 pb-3 focus-within:ring-4 focus-within:ring-white ${className}`}>
      <label htmlFor={id} className={`text-xs font-extrabold tracking-[0.04em] uppercase ${labelClass}`}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        maxLength={MAX_TEAM_NAME_LENGTH}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className={`w-full bg-transparent pr-16 font-feud text-[40px] leading-[1.05] font-black uppercase focus:outline-none ${placeholderClass}`}
      />
    </div>
  );
}
