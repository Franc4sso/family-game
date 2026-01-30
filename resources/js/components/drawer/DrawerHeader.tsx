import React from "react";

interface DrawerHeaderProps {
  onClose: () => void;
}

export function DrawerHeader({ onClose }: DrawerHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-amber-500/30">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></div>
        <h2 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
          PANNELLO ADMIN
        </h2>
      </div>
      <button
        onClick={onClose}
        className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-all active:scale-95"
        aria-label="Chiudi"
      >
        <span className="text-2xl">×</span>
      </button>
    </div>
  );
}
