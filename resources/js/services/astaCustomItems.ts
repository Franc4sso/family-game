import type { AstaItem } from "@/data/asta";

/**
 * Lotti creati dal master, salvati sul telefono (IndexedDB) così restano
 * anche chiudendo la pagina. Le foto sono già ridimensionate in JPEG.
 */
const DB_NAME = "asta-folle";
const STORE = "items";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: "id" });
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function withStore<T>(mode: IDBTransactionMode, run: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const req = run(db.transaction(STORE, mode).objectStore(STORE));
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  }).finally(() => db.close()) as Promise<T>;
}

export async function listCustomItems(): Promise<AstaItem[]> {
  try {
    return await withStore<AstaItem[]>("readonly", (s) => s.getAll() as IDBRequest<AstaItem[]>);
  } catch {
    // Navigazione privata o storage bloccato: si gioca solo col catalogo
    return [];
  }
}

export const saveCustomItem = (item: AstaItem) => withStore("readwrite", (s) => s.put(item));

export const deleteCustomItem = (id: string) => withStore("readwrite", (s) => s.delete(id));

/** Riduce la foto (lato lungo max 1280 px) per non riempire la memoria del telefono. */
export async function photoToDataUrl(file: File, maxSide = 1280): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL("image/jpeg", 0.82);
}
