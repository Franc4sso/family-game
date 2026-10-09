import React, { useEffect, useRef, useState } from "react";
import { IconClose } from "./parts";

interface AstaFullPhotoProps {
  src: string;
  title: string;
  lotLabel: string;
  onClose: () => void;
}

const MAX_SCALE = 5;

/**
 * Foto a schermo intero da mostrare a tutti: intera e larga quanto il
 * telefono, con zoom a due dita (la pagina blocca lo zoom del browser),
 * trascinamento quando è ingrandita e doppio tocco per ingrandire/tornare.
 */
export function AstaFullPhoto({ src, title, lotLabel, onClose }: AstaFullPhotoProps) {
  const [view, setView] = useState({ scale: 1, x: 0, y: 0 });
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ dist: number; scale: number } | null>(null);
  const lastTap = useRef(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const distance = () => {
    const [a, b] = [...pointers.current.values()];
    return Math.hypot(a.x - b.x, a.y - b.y);
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2) pinch.current = { dist: distance(), scale: view.scale };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const prev = pointers.current.get(e.pointerId);
    if (!prev) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointers.current.size === 2 && pinch.current) {
      const scale = Math.min(MAX_SCALE, Math.max(1, (pinch.current.scale * distance()) / pinch.current.dist));
      setView((v) => (scale === 1 ? { scale: 1, x: 0, y: 0 } : { ...v, scale }));
    } else if (pointers.current.size === 1 && view.scale > 1) {
      setView((v) => ({ ...v, x: v.x + e.clientX - prev.x, y: v.y + e.clientY - prev.y }));
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;

    if (pointers.current.size === 0) {
      const now = Date.now();
      if (now - lastTap.current < 300) {
        setView((v) => (v.scale > 1 ? { scale: 1, x: 0, y: 0 } : { scale: 2.5, x: 0, y: 0 }));
        lastTap.current = 0;
      } else {
        lastTap.current = now;
      }
    }
  };

  return (
    <div role="dialog" aria-modal="true" aria-label={`Foto: ${title}`} className="fixed inset-0 z-50 bg-black font-asta text-asta-cream">
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ touchAction: "none" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <img
          src={src}
          alt={title}
          draggable={false}
          className="h-full w-full select-none object-contain"
          style={{
            transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
            transition: pinch.current ? "none" : "transform 120ms ease-out",
          }}
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 flex h-16 items-center justify-between px-3">
        <span className="flex h-[30px] items-center rounded-full bg-asta-red px-3 font-asta-mono text-xs font-bold text-asta-red-ink">{lotLabel}</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Chiudi la foto"
          className="pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#2A2420] active:scale-95"
        >
          <IconClose />
        </button>
      </div>

      {view.scale === 1 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-black/80 to-transparent px-4 pb-6 pt-10">
          <span className="text-xl font-extrabold">{title}</span>
          <span className="font-asta-mono text-xs font-bold text-asta-muted">PIZZICA O TOCCA DUE VOLTE PER INGRANDIRE · GIRA IL TELEFONO</span>
        </div>
      )}
    </div>
  );
}
