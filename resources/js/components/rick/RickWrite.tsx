import React, { useState } from "react";
import { FactCard, FactText, Handoff, Kicker, PrimaryButton, RickLogo, RickShell } from "./RickParts";
import { RICK_MAX_ANSWER_LENGTH, RICK_POINTS, isTruth, rickWriters, shuffle } from "@/services/rickService";
import type { RickState } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";

interface RickWriteProps {
  state: RickState;
  dispatch: React.Dispatch<GameAction>;
}

type Stage = "read" | "handoff" | "input";

/**
 * Il telefono gira: prima Rick legge il fatto ad alta voce, poi ognuno lo
 * riceve coperto, scrive la sua risposta falsa e lo passa. Va montato con
 * `key={writeIndex}` così ogni giocatore riparte dalla copertina.
 */
export function RickWrite({ state, dispatch }: RickWriteProps) {
  const [stage, setStage] = useState<Stage>(state.writeIndex === 0 ? "read" : "handoff");
  const [text, setText] = useState("");
  // Ha provato a mandare la verità (o quasi): l'ha indovinata, ora deve inventarne una falsa
  const [knew, setKnew] = useState(false);
  // La risposta appena mandata era troppo vicina alla verità: finché non la cambia resta bloccata
  const [blocked, setBlocked] = useState(false);
  const fact = state.fact!;
  const writers = rickWriters(state);
  const player = state.players[writers[state.writeIndex]];
  const next = state.players[writers[state.writeIndex + 1]];
  const rick = state.players[state.rick];

  if (stage === "read") {
    return (
      <RickShell>
        <div className="flex h-11 items-center justify-between">
          <RickLogo />
          <span className="text-[13px] font-bold text-rick-muted">
            Giro {state.round + 1} di {state.rounds}
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-center gap-5">
          <Kicker className="text-rick-pink-soft">{rick.name}, leggi ad alta voce</Kicker>
          <FactCard className="rick-card">
            <Kicker className="text-rick-pink-deep">Fatto vero</Kicker>
            <FactText text={fact.text} className="mt-3 text-[24px] leading-[1.3]" />
          </FactCard>
          <p className="m-0 text-[15px] leading-snug text-rick-muted">
            Leggi la frase dicendo "qualcosa" al posto dello spazio vuoto. La risposta vera non compare più: ricordala tu.
          </p>
        </div>
        <PrimaryButton onClick={() => setStage("handoff")}>Passa il telefono a {player.name}</PrimaryButton>
      </RickShell>
    );
  }

  if (stage === "handoff") {
    return (
      <Handoff
        kicker={`${state.writeIndex + 1} di ${writers.length} · tocca a`}
        name={player.name}
        hint="Gli altri girano lo sguardo. Prendi il telefono e tienilo vicino."
        confirmLabel={`Sono ${player.name}, mostra la frase`}
        onConfirm={() => setStage("input")}
        progress={{ done: state.writeIndex, total: writers.length }}
      />
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || blocked) return;
    if (isTruth(text, fact)) {
      // Il controllo scatta solo all'invio: mentre scrive, "ano" non deve bloccare chi sta scrivendo "anoressia"
      setKnew(true);
      setBlocked(true);
      return;
    }
    // L'ordine delle risposte serve solo all'ultimo: verità compresa, sono al massimo writers + 1
    const order = shuffle(Array.from({ length: writers.length + 1 }, (_, i) => i));
    dispatch({ type: "RICK_SUBMIT_FAKE", payload: { text, order, knew } });
  };

  return (
    <RickShell>
      <div className="flex h-11 items-center justify-between">
        <span className="text-[17px] font-extrabold">{player.name}, inventa</span>
        <span className="text-[13px] font-bold text-rick-muted">
          {state.writeIndex + 1} di {writers.length}
        </span>
      </div>

      <form onSubmit={submit} className="flex flex-1 flex-col gap-4">
        <FactCard>
          <FactText text={fact.text} fill={text.trim() || undefined} className="text-[21px] leading-[1.32]" />
        </FactCard>

        <div className="flex flex-col gap-2">
          <label htmlFor="rick-fake" className="text-xs font-extrabold tracking-[0.1em] text-rick-pink-soft uppercase">
            La tua risposta falsa
          </label>
          <input
            id="rick-fake"
            value={text}
            autoFocus
            autoComplete="off"
            autoCapitalize="none"
            enterKeyHint="done"
            maxLength={RICK_MAX_ANSWER_LENGTH}
            onChange={(e) => {
              setText(e.target.value);
              setBlocked(false);
            }}
            aria-invalid={blocked}
            aria-describedby="rick-fake-help"
            className={`h-[60px] rounded-2xl border-[3px] bg-rick-panel px-4 text-[20px] font-bold text-rick-cream focus:outline-none ${
              blocked ? "border-rick-lime" : "border-rick-pink"
            }`}
          />
          <span id="rick-fake-help" className="flex justify-between gap-3 text-[13px]">
            {blocked ? (
              <span role="alert" className="font-bold text-rick-lime">
                È troppo vicina alla verità: cambiala, sennò è troppo facile.
              </span>
            ) : (
              <span />
            )}
            <span className="shrink-0 text-rick-muted">
              {text.length} / {RICK_MAX_ANSWER_LENGTH}
            </span>
          </span>
        </div>

        {knew && (
          <div role="status" className="flex gap-3 rounded-2xl bg-rick-lime p-3.5 text-rick-plum">
            <span className="shrink-0 self-start rounded-md bg-rick-plum px-1.5 py-1 text-[11px] font-extrabold text-rick-lime">
              +{RICK_POINTS.truth}
            </span>
            <span className="text-sm leading-snug font-semibold">
              <b>L'hai indovinata!</b> I punti della verità sono già tuoi e al voto non dovrai votare. Ora inventane una falsa per ingannare gli altri, e
              non dire niente.
            </span>
          </div>
        )}

        <div className="flex gap-3 rounded-2xl bg-rick-panel p-3.5">
          <span className="shrink-0 self-start rounded-md bg-rick-lime px-1.5 py-1 text-[11px] font-extrabold text-rick-plum">
            +{RICK_POINTS.fooled}
          </span>
          <span className="text-sm leading-snug text-rick-pale">
            Per ogni amico che ci casca. Scrivi qualcosa di <b className="text-rick-cream">credibile</b>, non solo divertente.
          </span>
        </div>

        <div className="mt-auto flex flex-col gap-2.5">
          <span className="text-center text-sm text-rick-muted">Dopo, lo schermo si copre da solo.</span>
          <PrimaryButton type="submit" disabled={!text.trim() || blocked}>
            {next ? `Fatto, passa a ${next.name}` : `Fatto, ridai il telefono a ${rick.name}`}
          </PrimaryButton>
        </div>
      </form>
    </RickShell>
  );
}
