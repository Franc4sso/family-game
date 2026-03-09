import React from "react";
import type { Dispatch } from "react";
import type { GameAction } from "@/types/actions.types";

interface HomeScreenProps {
  dispatch: Dispatch<GameAction>;
}

export function HomeScreen({ dispatch }: HomeScreenProps) {
  const handleModeSelect = (mode: "master" | "no-master") => {
    dispatch({ type: "SET_GAME_MODE", payload: { mode } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-gray-800 mb-4">
            Family Feud
          </h1>
          <p className="text-xl text-gray-600">
            Scegli la modalità di gioco
          </p>
        </div>

        <div className="grid gap-6 md:gap-8">
          {/* Modalità con Master */}
          <button
            onClick={() => handleModeSelect("master")}
            className="group relative bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="text-left flex-1">
                <h2 className="text-3xl font-bold mb-2">Con Master</h2>
                <p className="text-blue-100 text-sm md:text-base">
                  Un conduttore gestisce il gioco dal drawer laterale, rivela le risposte e segna gli errori.
                </p>
              </div>
              <div className="ml-4 text-5xl">🎮</div>
            </div>
          </button>

          {/* Modalità senza Master */}
          <button
            onClick={() => handleModeSelect("no-master")}
            className="group relative bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="text-left flex-1">
                <h2 className="text-3xl font-bold mb-2">Senza Master</h2>
                <p className="text-green-100 text-sm md:text-base">
                  Due giocatori si sfidano sullo stesso telefono. Le risposte vengono scritte e il matching è automatico.
                </p>
              </div>
              <div className="ml-4 text-5xl">⚡</div>
            </div>
          </button>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          Scegli la modalità che preferisci per iniziare il gioco!
        </div>
      </div>
    </div>
  );
}
