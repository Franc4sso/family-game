import React from "react";

interface HamburgerButtonProps {
  onClick: () => void;
}

export function HamburgerButton({ onClick }: HamburgerButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed top-4 right-4 z-40 bg-gray-800 border-2 border-gray-600 rounded-lg p-3 touch-target-comfortable active:scale-95 transition-transform"
      aria-label="Apri controlli"
    >
      <div className="flex flex-col gap-1.5">
        <span className="block w-6 h-0.5 bg-white" />
        <span className="block w-6 h-0.5 bg-white" />
        <span className="block w-6 h-0.5 bg-white" />
      </div>
    </button>
  );
}
