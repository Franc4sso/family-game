import React from "react";
import { FakeStamp, Kicker, PlayerDot, PrimaryButton, RickLogo, RickShell } from "./RickParts";
import { RICK_POINTS, joinNames, rickRevealOrder, rickVotersOf } from "@/services/rickService";
import type { RickState } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";

interface RickRevealProps {
  state: RickState;
  dispatch: React.Dispatch<GameAction>;
}

/** Le risposte false si scoprono una alla volta: chi l'ha scritta, chi ci è cascato, cosa aveva detto Rick. */
export function RickReveal({ state, dispatch }: RickRevealProps) {
  const order = rickRevealOrder(state);
  const index = order[state.revealIndex];
  const answer = state.answers[index];
  const authors = answer.authors.map((a) => state.players[a].name);
  const fooled = rickVotersOf(state, index);
  const gain = fooled.length * RICK_POINTS.fooled;
  const last = state.revealIndex + 1 >= order.length;
  const guess = state.guess?.answer === index ? state.guess : null;
  const guessRight = !!guess && answer.authors.includes(guess.player);
  const rick = state.players[state.rick];

  return (
    <RickShell>
      <div className="flex h-11 items-center justify-between">
        <RickLogo />
        <span className="text-[13px] font-bold text-rick-muted">
          Risposta {state.revealIndex + 1} di {order.length + 1}
        </span>
      </div>

      <div key={index} className="flex flex-1 flex-col justify-center gap-5">
        <div className="rick-card relative flex rotate-[1.5deg] flex-col items-center gap-2 rounded-3xl bg-rick-cream px-5 pt-12 pb-9 text-rick-plum">
          <span className="absolute top-4 left-4 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-rick-plum font-extrabold text-rick-pink">
            {index + 1}
          </span>
          <span className="text-center font-rick text-[clamp(32px,11vw,50px)] leading-[1.05] break-words [overflow-wrap:anywhere]">{answer.text}</span>
          <FakeStamp className="absolute -top-4 right-2.5" />
        </div>

        <div className="flex flex-col items-center gap-1 text-center">
          <Kicker className="text-[13px] text-rick-muted">{authors.length > 1 ? "L'hanno inventata" : "L'ha inventata"}</Kicker>
          <span className="font-rick text-[38px] leading-tight text-rick-lime">{joinNames(authors)}</span>
          {guess && (
            <span
              className={`mt-1 rounded-full px-3.5 py-1.5 text-sm font-extrabold ${
                guessRight ? "bg-rick-lime text-rick-plum" : "border-2 border-rick-line text-rick-muted"
              }`}
            >
              {guessRight
                ? `Rick aveva detto ${state.players[guess.player].name} · +${RICK_POINTS.rickAuthor} a ${rick.name}`
                : `Rick aveva detto ${state.players[guess.player].name} · sbagliato`}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3 rounded-[18px] bg-rick-panel p-4">
          {fooled.length > 0 ? (
            <>
              <Kicker className="text-[13px] text-rick-pink-soft">
                {fooled.length === 1 ? "Ci è cascato in 1" : `Ci sono cascati in ${fooled.length}`}
              </Kicker>
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                {fooled.map((p) => (
                  <li key={p} className="flex items-center gap-2 rounded-full bg-rick-plum py-1.5 pr-3.5 pl-1.5">
                    <PlayerDot name={state.players[p].name} color={state.players[p].color} />
                    <span className="text-base font-bold">{state.players[p].name}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between border-t border-rick-line pt-3">
                <span className="text-base font-bold">{joinNames(authors)} {authors.length > 1 ? "guadagnano" : "guadagna"}</span>
                <span className="font-rick text-[30px] leading-none text-rick-lime">+{gain}</span>
              </div>
            </>
          ) : (
            <span className="text-center text-base font-bold text-rick-muted">Non ci è cascato nessuno.</span>
          )}
        </div>
      </div>

      <PrimaryButton onClick={() => dispatch({ type: "RICK_REVEAL_NEXT" })}>{last ? "Scopri la verità" : "Prossima risposta"}</PrimaryButton>
    </RickShell>
  );
}
