import React from "react";
import { Button } from "../shared/Button";
import type { GameAction } from "@/types";

interface DrawerFooterProps {
  dispatch: React.Dispatch<GameAction>;
  onClose: () => void;
  activeTeam: "A" | "B";
}

export function DrawerFooter({ dispatch, onClose, activeTeam }: DrawerFooterProps) {
  return (
    <div className="space-y-3 pt-4 border-t border-gray-700">
      <Button
        variant="danger"
        fullWidth
        onClick={() => {
          if (confirm("Terminare il round?")) {
            dispatch({ type: "END_ROUND", payload: { winningTeam: activeTeam } });
            onClose();
          }
        }}
      >
        Termina Round
      </Button>

      <Button
        variant="secondary"
        fullWidth
        onClick={() => {
          if (confirm("Resettare completamente il gioco?")) {
            dispatch({ type: "RESET_GAME" });
            onClose();
          }
        }}
      >
        Reset Gioco
      </Button>
    </div>
  );
}
