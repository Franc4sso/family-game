import React from "react";
import { Button } from "../shared/Button";

interface UndoButtonProps {
  onUndo: () => void;
  disabled: boolean;
}

export function UndoButton({ onUndo, disabled }: UndoButtonProps) {
  return (
    <Button
      variant="secondary"
      fullWidth
      onClick={onUndo}
      disabled={disabled}
    >
      ↩️ Annulla Ultima Azione
    </Button>
  );
}
