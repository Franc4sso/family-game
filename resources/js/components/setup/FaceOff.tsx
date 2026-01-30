import React, { useState } from "react";
import { Button } from "../shared/Button";
import { Card } from "../shared/Card";
import type { Team, Round } from "@/types/game.types";
import type { GameAction } from "@/types";

interface FaceOffProps {
  teamA: Team;
  teamB: Team;
  currentRound: Round;
  dispatch: React.Dispatch<GameAction>;
}

export function FaceOff({ teamA, teamB, currentRound, dispatch }: FaceOffProps) {
  const [selectedA, setSelectedA] = useState<number | null>(null);
  const [selectedB, setSelectedB] = useState<number | null>(null);
  const [customA, setCustomA] = useState<string>("");
  const [customB, setCustomB] = useState<string>("");
  const [noneA, setNoneA] = useState<boolean>(false);
  const [noneB, setNoneB] = useState<boolean>(false);

  const handleReveal = () => {
    // Allow selections to be null if captain indicates none or provided a custom answer
    const payload: any = {};
    payload.teamA_answerIndex = typeof selectedA === "number" ? selectedA : null;
    payload.teamB_answerIndex = typeof selectedB === "number" ? selectedB : null;

    if (customA) payload.teamA_custom = customA;
    else if (noneA) payload.teamA_custom = "__NONE__";

    if (customB) payload.teamB_custom = customB;
    else if (noneB) payload.teamB_custom = "__NONE__";

    dispatch({
      type: "FACEOFF_REVEAL",
      payload,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      <Card className="max-w-2xl w-full">
        <div className="text-center mb-4">
          <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-2">
            FACE-OFF!
          </h2>
          <div className="inline-block bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/50 rounded-lg px-4 py-2">
            <p className="text-base md:text-lg text-amber-200 font-semibold">{currentRound.category}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Squadra A */}
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 border-2 border-blue-500 rounded-xl p-4 shadow-xl">
            <h3 className="text-lg md:text-xl font-black text-blue-400 mb-2 text-center uppercase tracking-wide">
              {teamA.name}
            </h3>
            <p className="text-xs md:text-sm text-gray-300 mb-3 text-center">
              Risposta capitano:
            </p>
            <div className="space-y-1.5">
              {currentRound.answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedA(index)}
                  disabled={selectedB === index || !!customA || noneA}
                  className={`
                    w-full px-3 py-2.5 rounded-lg text-left transition-all text-sm md:text-base font-medium
                    ${selectedA === index
                      ? "bg-blue-600 text-white border-2 border-blue-400 shadow-lg"
                      : "bg-gray-800 text-gray-300 border border-gray-600"
                    }
                    ${selectedB === index ? "opacity-40 cursor-not-allowed" : "active:scale-95 hover:bg-gray-700"}
                  `}
                >
                  {answer.value}
                </button>
              ))}
            </div>

            <div className="mt-3 flex gap-2 items-center">
              <input
                value={customA}
                onChange={(e) => { setCustomA(e.target.value); if (e.target.value) { setNoneA(false); setSelectedA(null); } }}
                placeholder="Altra risposta..."
                className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-white text-sm border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
              <button
                onClick={() => { setNoneA(!noneA); if (!noneA) { setCustomA(""); setSelectedA(null); } }}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${noneA ? 'bg-amber-500 text-black shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              >
                Nessuna
              </button>
            </div>
          </div>

          {/* Squadra B */}
          <div className="bg-gradient-to-br from-red-900/40 to-red-800/40 border-2 border-red-500 rounded-xl p-4 shadow-xl">
            <h3 className="text-lg md:text-xl font-black text-red-400 mb-2 text-center uppercase tracking-wide">
              {teamB.name}
            </h3>
            <p className="text-xs md:text-sm text-gray-300 mb-3 text-center">
              Risposta capitano:
            </p>
            <div className="space-y-1.5">
              {currentRound.answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedB(index)}
                  disabled={selectedA === index || !!customB || noneB}
                  className={`
                    w-full px-3 py-2.5 rounded-lg text-left transition-all text-sm md:text-base font-medium
                    ${selectedB === index
                      ? "bg-red-600 text-white border-2 border-red-400 shadow-lg"
                      : "bg-gray-800 text-gray-300 border border-gray-600"
                    }
                    ${selectedA === index ? "opacity-40 cursor-not-allowed" : "active:scale-95 hover:bg-gray-700"}
                  `}
                >
                  {answer.value}
                </button>
              ))}
            </div>

            <div className="mt-3 flex gap-2 items-center">
              <input
                value={customB}
                onChange={(e) => { setCustomB(e.target.value); if (e.target.value) { setNoneB(false); setSelectedB(null); } }}
                placeholder="Altra risposta..."
                className="flex-1 px-3 py-2 rounded-lg bg-gray-800 text-white text-sm border border-gray-600 focus:border-red-500 focus:outline-none"
              />
              <button
                onClick={() => { setNoneB(!noneB); if (!noneB) { setCustomB(""); setSelectedB(null); } }}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${noneB ? 'bg-amber-500 text-black shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              >
                Nessuna
              </button>
            </div>
          </div>
        </div>

        <Button
          variant="success"
          size="lg"
          fullWidth
          disabled={
            (selectedA === null && !customA && !noneA) ||
            (selectedB === null && !customB && !noneB)
          }
          onClick={handleReveal}
        >
          ▶️ Rivela Risposte
        </Button>
      </Card>
    </div>
  );
}
