import React, { useState } from "react";
import type { Dispatch } from "react";
import type { Team, Round } from "@/types/game.types";
import type { GameAction } from "@/types/actions.types";
import { matchAnswerForFaceOff } from "@/services/matchingService";

interface FaceOffNoMasterProps {
  teamA: Team;
  teamB: Team;
  currentRound: Round;
  dispatch: Dispatch<GameAction>;
}

type Phase = "teamA" | "transition" | "teamB" | "reveal";

interface MatchResult {
  input: string;
  found: boolean;
  rank?: number;
  value?: string;
}

export function FaceOffNoMaster({
  teamA,
  teamB,
  currentRound,
  dispatch,
}: FaceOffNoMasterProps) {
  const [phase, setPhase] = useState<Phase>("teamA");
  const [teamAAnswer, setTeamAAnswer] = useState("");
  const [teamBAnswer, setTeamBAnswer] = useState("");
  const [teamAResult, setTeamAResult] = useState<MatchResult | null>(null);
  const [teamBResult, setTeamBResult] = useState<MatchResult | null>(null);
  const [winner, setWinner] = useState<"A" | "B" | undefined>(undefined);

  const handleTeamASubmit = () => {
    if (teamAAnswer.trim() === "") return;
    setPhase("transition");
  };

  const handleTransitionContinue = () => {
    setPhase("teamB");
  };

  const handleTeamBSubmit = () => {
    if (teamBAnswer.trim() === "") return;

    // Esegui il matching per vedere i risultati
    const matchA = matchAnswerForFaceOff(teamAAnswer, currentRound.answers);
    const matchB = matchAnswerForFaceOff(teamBAnswer, currentRound.answers);

    // Salva i risultati
    setTeamAResult({
      input: teamAAnswer,
      found: matchA !== null,
      rank: matchA?.rank,
      value: matchA ? currentRound.answers[matchA.index].value : undefined,
    });

    setTeamBResult({
      input: teamBAnswer,
      found: matchB !== null,
      rank: matchB?.rank,
      value: matchB ? currentRound.answers[matchB.index].value : undefined,
    });

    // Determina il vincitore
    let faceOffWinner: "A" | "B" | undefined;
    if (matchA && matchB) {
      if (matchA.rank === matchB.rank) {
        faceOffWinner = undefined; // Pareggio
      } else {
        faceOffWinner = matchA.rank < matchB.rank ? "A" : "B";
      }
    } else if (matchA) {
      faceOffWinner = "A";
    } else if (matchB) {
      faceOffWinner = "B";
    } else {
      faceOffWinner = undefined;
    }

    setWinner(faceOffWinner);

    // Passa alla fase reveal
    setPhase("reveal");
  };

  const handleContinue = () => {
    // Invia al reducer per aggiornare lo stato
    dispatch({
      type: "FACEOFF_NO_MASTER",
      payload: {
        teamA_answer: teamAAnswer,
        teamB_answer: teamBAnswer,
      },
    });
  };

  // Fase Team A
  if (phase === "teamA") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">⚡</div>
            <h1 className="text-4xl font-black text-gray-800 mb-2">Face-Off</h1>
            <p className="text-xl text-gray-600 mb-4">
              Categoria: <span className="font-bold">{currentRound.category}</span>
            </p>
            <div className="bg-blue-100 text-blue-800 px-6 py-3 rounded-xl inline-block">
              <p className="text-lg font-semibold">Turno: {teamA.name}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Scrivi la tua risposta:
              </label>
              <input
                type="text"
                value={teamAAnswer}
                onChange={(e) => setTeamAAnswer(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleTeamASubmit()}
                placeholder="Es: Cina, Stati Uniti..."
                className="w-full px-4 py-3 text-lg text-gray-800 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none placeholder-gray-400"
                autoFocus
              />
            </div>

            <button
              onClick={handleTeamASubmit}
              disabled={teamAAnswer.trim() === ""}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-lg transition-colors shadow-lg"
            >
              Conferma Risposta
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Fase Transizione
  if (phase === "transition") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="text-6xl mb-4">🔄</div>
          <h2 className="text-3xl font-black text-gray-800 mb-4">
            Passa il telefono a {teamB.name}
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Assicurati che {teamA.name} non possa vedere lo schermo.
          </p>
          <button
            onClick={handleTransitionContinue}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-12 rounded-xl text-lg transition-colors shadow-lg"
          >
            Pronto
          </button>
        </div>
      </div>
    );
  }

  // Fase Team B
  if (phase === "teamB") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">⚡</div>
            <h1 className="text-4xl font-black text-gray-800 mb-2">Face-Off</h1>
            <p className="text-xl text-gray-600 mb-4">
              Categoria: <span className="font-bold">{currentRound.category}</span>
            </p>
            <div className="bg-red-100 text-red-800 px-6 py-3 rounded-xl inline-block">
              <p className="text-lg font-semibold">Turno: {teamB.name}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Scrivi la tua risposta:
              </label>
              <input
                type="text"
                value={teamBAnswer}
                onChange={(e) => setTeamBAnswer(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleTeamBSubmit()}
                placeholder="Es: Cina, Stati Uniti..."
                className="w-full px-4 py-3 text-lg text-gray-800 border-2 border-gray-300 rounded-xl focus:border-red-500 focus:outline-none placeholder-gray-400"
                autoFocus
              />
            </div>

            <button
              onClick={handleTeamBSubmit}
              disabled={teamBAnswer.trim() === ""}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-lg transition-colors shadow-lg"
            >
              Conferma Risposta e Confronta
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Fase Reveal (mostra risultati)
  if (phase === "reveal") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-700 to-indigo-900 flex items-center justify-center p-4">
        <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎯</div>
            <h1 className="text-4xl font-black text-gray-800 mb-2">Risultati Face-Off</h1>
            <p className="text-lg text-gray-600">
              Categoria: <span className="font-bold">{currentRound.category}</span>
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {/* Risultato Team A */}
            <div className={`p-6 rounded-2xl border-4 ${
              teamAResult?.found
                ? "bg-blue-50 border-blue-500"
                : "bg-red-50 border-red-500"
            }`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-2xl font-bold text-gray-800">{teamA.name}</h3>
                {teamAResult?.found ? (
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-lg font-black text-xl">
                    #{teamAResult.rank}
                  </span>
                ) : (
                  <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-bold">
                    ❌
                  </span>
                )}
              </div>
              <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
                <p className="text-sm text-gray-500 mb-1">Risposta data:</p>
                <p className="text-lg font-semibold text-gray-800">{teamAResult?.input}</p>
                {teamAResult?.found && teamAResult.value && (
                  <p className="text-sm text-blue-600 mt-2">
                    ✓ Trovata: <span className="font-bold">{teamAResult.value}</span>
                  </p>
                )}
                {!teamAResult?.found && (
                  <p className="text-sm text-red-600 mt-2 font-semibold">
                    Non trovata nella classifica
                  </p>
                )}
              </div>
            </div>

            {/* Risultato Team B */}
            <div className={`p-6 rounded-2xl border-4 ${
              teamBResult?.found
                ? "bg-red-50 border-red-500"
                : "bg-gray-50 border-gray-400"
            }`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-2xl font-bold text-gray-800">{teamB.name}</h3>
                {teamBResult?.found ? (
                  <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-black text-xl">
                    #{teamBResult.rank}
                  </span>
                ) : (
                  <span className="bg-gray-600 text-white px-4 py-2 rounded-lg font-bold">
                    ❌
                  </span>
                )}
              </div>
              <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
                <p className="text-sm text-gray-500 mb-1">Risposta data:</p>
                <p className="text-lg font-semibold text-gray-800">{teamBResult?.input}</p>
                {teamBResult?.found && teamBResult.value && (
                  <p className="text-sm text-red-600 mt-2">
                    ✓ Trovata: <span className="font-bold">{teamBResult.value}</span>
                  </p>
                )}
                {!teamBResult?.found && (
                  <p className="text-sm text-gray-600 mt-2 font-semibold">
                    Non trovata nella classifica
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Annuncio vincitore */}
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl p-6 mb-6 text-center shadow-lg">
            {winner ? (
              <>
                <div className="text-4xl mb-2">🎉</div>
                <h2 className="text-3xl font-black text-white mb-2">
                  {winner === "A" ? teamA.name : teamB.name} vince il Face-Off!
                </h2>
                <p className="text-white font-semibold">
                  Passa alla scelta Play or Pass
                </p>
              </>
            ) : (
              <>
                <div className="text-4xl mb-2">🤝</div>
                <h2 className="text-3xl font-black text-white mb-2">
                  Pareggio!
                </h2>
                <p className="text-white font-semibold">
                  {teamAResult?.found && teamBResult?.found
                    ? "Stesso rank! Decide il master."
                    : "Nessuna risposta trovata. Riprovate!"}
                </p>
              </>
            )}
          </div>

          <button
            onClick={handleContinue}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl text-lg transition-colors shadow-lg"
          >
            Continua →
          </button>
        </div>
      </div>
    );
  }

  return null;
}
