import React, { useState } from "react";
import { Button } from "../shared/Button";
import { Card } from "../shared/Card";
import { validateTeamName, validateUniqueTeamNames } from "@/utils/validators";
import type { GameAction } from "@/types";

interface TeamSetupProps {
  dispatch: React.Dispatch<GameAction>;
}

export function TeamSetup({ dispatch }: TeamSetupProps) {
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
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      <Card className="max-w-md w-full">
        <div className="text-center mb-6">
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-2">
            FAMILY GAME
          </h2>
          <p className="text-gray-400 text-sm uppercase tracking-wider">Configura le squadre</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
              Squadra A
            </label>
            <input
              type="text"
              value={nameA}
              onChange={(e) => setNameA(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border-2 border-blue-500/50 rounded-xl text-white text-base focus:border-blue-400 focus:outline-none transition-all"
              placeholder="es. Famiglia Rossi"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-red-400 uppercase tracking-wider mb-2">
              Squadra B
            </label>
            <input
              type="text"
              value={nameB}
              onChange={(e) => setNameB(e.target.value)}
              className="w-full px-4 py-3 bg-gray-800 border-2 border-red-500/50 rounded-xl text-white text-base focus:border-red-400 focus:outline-none transition-all"
              placeholder="es. Famiglia Bianchi"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
              <p className="text-red-400 text-sm text-center font-medium">{error}</p>
            </div>
          )}

          <Button type="submit" variant="primary" size="lg" fullWidth>
            ▶️ Inizia Gioco
          </Button>
        </form>
      </Card>
    </div>
  );
}
