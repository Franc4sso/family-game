import React, { useState } from "react";
import { BackButton, MasterScreen, IconArrowRight } from "../master/parts";
import { validateTeamName, validateUniqueTeamNames } from "@/utils/validators";
import { MAX_TEAM_NAME_LENGTH } from "@/utils/constants";
import type { GameAction } from "@/types";

interface TeamSetupProps {
  dispatch: React.Dispatch<GameAction>;
  onBack: () => void;
}

export function TeamSetup({ dispatch, onBack }: TeamSetupProps) {
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
    <MasterScreen>
      <BackButton onClick={onBack} />
      <div className="flex flex-col items-center gap-2 pt-4 text-center">
        <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-ff-muted">Nuova partita</span>
        <h1 className="font-display text-[40px] leading-none">FAMILY FEUD</h1>
        <p className="text-sm font-semibold text-ff-muted">Come si chiamano le due squadre?</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-3 pt-4">
        <TeamField
          id="team-a"
          label="Squadra A"
          value={nameA}
          onChange={setNameA}
          placeholder="es. Famiglia Rossi"
          className="bg-ff-team-a ring-[#2A3D78] focus-within:ring-ff-gold"
          labelColor="text-[#A9C4FF]"
        />

        <div className="flex items-center gap-2.5 text-xs font-extrabold tracking-[0.14em] text-ff-muted" aria-hidden>
          <span className="h-px flex-1 bg-ff-line-soft" />
          <span>CONTRO</span>
          <span className="h-px flex-1 bg-ff-line-soft" />
        </div>

        <TeamField
          id="team-b"
          label="Squadra B"
          value={nameB}
          onChange={setNameB}
          placeholder="es. Famiglia Bianchi"
          className="bg-ff-team-b ring-[#4A2C22] focus-within:ring-ff-gold"
          labelColor="text-[#FFB08C]"
        />

        {error && (
          <p role="alert" className="rounded-[14px] border border-ff-red-line bg-ff-red-bg px-4 py-3 text-center text-sm font-bold text-[#FFB0B2]">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="mt-auto flex h-[60px] items-center justify-center gap-2.5 rounded-[18px] bg-ff-gold text-[17px] font-extrabold text-ff-gold-ink active:scale-[0.98]"
        >
          Inizia la partita
          <IconArrowRight />
        </button>
      </form>
    </MasterScreen>
  );
}

function TeamField({
  id,
  label,
  value,
  onChange,
  placeholder,
  className,
  labelColor,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  className: string;
  labelColor: string;
}) {
  return (
    <div className={`flex flex-col gap-1.5 rounded-[18px] px-4 py-3.5 ring-2 transition-shadow ${className}`}>
      <label htmlFor={id} className={`text-[11px] font-extrabold uppercase tracking-[0.12em] ${labelColor}`}>
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
        className="w-full bg-transparent text-xl font-extrabold text-ff-text placeholder:font-semibold placeholder:text-ff-muted/60 focus:outline-none"
      />
    </div>
  );
}
