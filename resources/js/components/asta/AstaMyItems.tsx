import React, { useEffect, useRef, useState } from "react";
import { AstaScreen, BackPill, IconCamera, IconLock, IconTrash, MonoLabel, btnCream, btnRed } from "./parts";
import { ASTA_CATEGORY_LABELS } from "@/data/asta";
import type { AstaCategory, AstaItem } from "@/data/asta";
import { deleteCustomItem, listCustomItems, photoToDataUrl, saveCustomItem } from "@/services/astaCustomItems";
import { formatEuro } from "@/services/astaService";

/** I lotti creati dal master: elenco, modifica ed eliminazione. */
export function AstaMyItems({ onClose }: { onClose: () => void }) {
  const [items, setItems] = useState<AstaItem[] | null>(null);
  const [editing, setEditing] = useState<AstaItem | "new" | null>(null);

  const reload = () => listCustomItems().then(setItems);
  useEffect(() => {
    reload();
  }, []);

  if (editing) {
    return (
      <AstaItemForm
        item={editing === "new" ? null : editing}
        onDone={() => {
          setEditing(null);
          reload();
        }}
      />
    );
  }

  return (
    <AstaScreen>
      <BackPill onClick={onClose} label="Torna all'asta" />
      <div className="flex flex-col gap-0.5">
        <MonoLabel>SALVATI SU QUESTO TELEFONO</MonoLabel>
        <h1 className="text-[28px] font-extrabold leading-tight">I miei lotti</h1>
      </div>

      <button type="button" onClick={() => setEditing("new")} className={`${btnRed} h-14 text-[17px]`}>
        <IconCamera />
        Nuovo lotto
      </button>

      {items === null ? null : items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-asta-line px-4 py-8 text-center text-sm font-semibold text-asta-muted">
          Nessun lotto tuo. Fotografa un oggetto di casa, dagli un valore segreto e mettilo all'asta.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map((item) => (
            <li key={item.id} className="flex items-center gap-3 rounded-[18px] border border-asta-line bg-asta-surface p-2">
              <button type="button" onClick={() => setEditing(item)} className="flex min-w-0 flex-1 items-center gap-3 text-left">
                <img src={item.image} alt="" className="h-16 w-16 shrink-0 rounded-xl bg-asta-photo object-contain" />
                <span className="flex min-w-0 flex-col">
                  <span className="truncate text-[15px] font-extrabold">{item.name}</span>
                  <span className="font-asta-mono text-[11px] text-asta-muted">
                    {ASTA_CATEGORY_LABELS[item.category].toUpperCase()} · {formatEuro(item.value)}
                  </span>
                </span>
              </button>
              <button
                type="button"
                aria-label={`Elimina ${item.name}`}
                onClick={async () => {
                  if (!confirm(`Eliminare "${item.name}"?`)) return;
                  await deleteCustomItem(item.id);
                  reload();
                }}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-asta-muted active:scale-95"
              >
                <IconTrash />
              </button>
            </li>
          ))}
        </ul>
      )}
    </AstaScreen>
  );
}

const CATEGORIES = Object.keys(ASTA_CATEGORY_LABELS) as AstaCategory[];

function AstaItemForm({ item, onDone }: { item: AstaItem | null; onDone: () => void }) {
  const [image, setImage] = useState(item?.image ?? "");
  const [name, setName] = useState(item?.name ?? "");
  const [category, setCategory] = useState<AstaCategory>(item?.category ?? "casa");
  const [description, setDescription] = useState(item?.description ?? "");
  const [clues, setClues] = useState<string[]>([0, 1, 2].map((i) => item?.clues[i] ?? ""));
  const [value, setValue] = useState(item ? String(item.value) : "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);

  const onFile = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    try {
      setImage(await photoToDataUrl(file));
      setError(null);
    } catch {
      setError("Non riesco a leggere questa foto, provane un'altra.");
    } finally {
      setBusy(false);
    }
  };

  const save = async () => {
    const euro = Math.round(Number(value.replace(/\./g, "").replace(",", ".")));
    if (!image) return setError("Manca la foto del lotto.");
    if (!name.trim()) return setError("Dai un nome al lotto.");
    if (!Number.isFinite(euro) || euro < 0) return setError("Scrivi il valore reale in euro.");
    setBusy(true);
    try {
      await saveCustomItem({
        id: item?.id ?? `mio-${Date.now()}`,
        name: name.trim(),
        category,
        description: description.trim(),
        clues: clues.map((c) => c.trim()).filter(Boolean),
        value: euro,
        image,
      });
      onDone();
    } catch {
      setError("Salvataggio non riuscito: la memoria del telefono potrebbe essere piena.");
      setBusy(false);
    }
  };

  return (
    <AstaScreen padded={false}>
      <div className="flex h-16 items-center justify-between px-3.5">
        <BackPill onClick={onDone} label="Annulla" />
        <span className="text-xl font-extrabold">{item ? "Modifica lotto" : "Nuovo lotto"}</span>
        <span className="w-11" />
      </div>

      <div className="relative flex h-[min(42vh,300px)] w-full items-center justify-center bg-asta-photo">
        {image ? (
          <img src={image} alt="Foto del lotto" className="h-full w-full object-contain" />
        ) : (
          <span className="font-asta-mono text-xs text-asta-muted">{busy ? "CARICO LA FOTO…" : "NESSUNA FOTO"}</span>
        )}
        <div className="absolute inset-x-3.5 bottom-3 flex gap-2">
          <button type="button" onClick={() => cameraRef.current?.click()} className={`${btnRed} h-[46px] flex-1 text-[15px]`}>
            <IconCamera />
            {image ? "Rifai foto" : "Scatta foto"}
          </button>
          <button type="button" onClick={() => galleryRef.current?.click()} className={`${btnCream} h-[46px] flex-1 text-[15px]`}>
            Dalla galleria
          </button>
        </div>
        <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
        <input ref={galleryRef} type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
      </div>

      <div className="flex flex-1 flex-col gap-3 px-3.5 pb-4 pt-4">
        <label className="flex flex-col gap-1">
          <MonoLabel>NOME DEL LOTTO</MonoLabel>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="es. Telecomando anni '90"
            className="h-12 border-b-2 border-asta-cream bg-transparent text-xl font-extrabold text-asta-cream placeholder:font-semibold placeholder:text-asta-muted/60 focus:outline-none"
          />
        </label>

        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Categoria">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
              className={`h-[34px] rounded-full px-3 text-[13px] ${
                category === c ? "bg-asta-mustard font-extrabold text-asta-ink" : "border border-asta-line bg-asta-surface font-bold text-asta-muted"
              }`}
            >
              {ASTA_CATEGORY_LABELS[c]}
            </button>
          ))}
        </div>

        <label className="flex flex-col gap-1">
          <MonoLabel>DESCRIZIONE (FACOLTATIVA)</MonoLabel>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Una frase neutra, senza svelare il prezzo"
            className="h-11 rounded-xl border border-asta-line bg-asta-surface px-3 text-sm font-semibold text-asta-cream placeholder:text-asta-muted focus:border-asta-mustard focus:outline-none"
          />
        </label>

        <div className="flex flex-col gap-1.5">
          <MonoLabel>NOTE DEL BANDITORE · LE SVELI TU</MonoLabel>
          {clues.map((clue, i) => (
            <input
              key={i}
              aria-label={`Nota ${i + 1}`}
              value={clue}
              onChange={(e) => setClues((cs) => cs.map((c, j) => (j === i ? e.target.value : c)))}
              placeholder={i === 2 ? "Nota 3 (facoltativa)" : `Nota ${i + 1}`}
              className="h-[42px] rounded-xl border border-asta-line bg-asta-surface px-3 text-sm font-semibold text-asta-cream placeholder:text-asta-muted focus:border-asta-mustard focus:outline-none"
            />
          ))}
        </div>

        <label className="mt-1 flex items-center gap-3 rounded-l-md rounded-r-[22px] bg-asta-cream py-2.5 pl-4 pr-4 text-asta-ink">
          <span className="h-3 w-3 rounded-full bg-asta-bg" aria-hidden />
          <span className="flex flex-1 flex-col">
            <span className="font-asta-mono text-[10px] font-bold tracking-[0.1em] text-asta-brown">VALORE REALE IN EURO · SEGRETO</span>
            <input
              value={value}
              inputMode="numeric"
              onChange={(e) => setValue(e.target.value)}
              placeholder="es. 25"
              className="w-full bg-transparent text-[26px] font-extrabold text-asta-ink placeholder:text-asta-ink-muted/50 focus:outline-none"
            />
          </span>
          <span className="text-asta-brown"><IconLock /></span>
        </label>

        {error && <p role="alert" className="text-center text-sm font-bold text-[#FFB3A3]">{error}</p>}

        <button type="button" disabled={busy} onClick={save} className={`${btnRed} mt-auto h-[58px] text-lg`}>
          Metti in catalogo
        </button>
      </div>
    </AstaScreen>
  );
}
