import { bibToObject } from "./converter";

export interface CiteStorage {
  getAll(): Cite[];
  get(key: string): Cite | undefined;
  update(key: string, data: Record<string, string>): void;
  delete(key: string): void;
  add(cite: Cite): void;
}

export class CiteLocalStorage implements CiteStorage {
  constructor(bibContent: string) {
    const cites = bibToObject(bibContent);
    localStorage.setItem("cites", JSON.stringify(cites));
  }
  getAll() {
    const cs = localStorage.getItem("cites");
    const cites: Cite[] = JSON.parse(cs || "[]");
    // console.log(cites,cs);

    return cites as Cite[];
  }

  get(key: string) {
    const cites = this.getAll();
    const c = cites.find((cite) => cite.id === key) || undefined;

    return c;
  }

  update(key: string, data: Record<string, string>) {
    const cites = this.getAll();
    const index = cites.findIndex((cite) => cite.id === key);
    if (index !== -1) {
      cites[index] = { ...cites[index], ...data };
      localStorage.setItem("cites", JSON.stringify(cites));
    }
  }

  delete(key: string) {
    const cites = this.getAll();
    cites.filter((cite) => cite.id !== key);
    localStorage.setItem("cites", JSON.stringify(cites));
  }

  add(cite: Cite) {
    const oldcite = this.getAll();
    oldcite.push(cite);
    localStorage.setItem("cites", JSON.stringify(oldcite));
  }
}

export class CiteIndexDB implements CiteStorage {
  private dbName = "CiteDB";
  private storeName = "cites";
  private db: IDBDatabase | null = null;

  constructor(bibContent: string) {
    this.init();
    const cites = bibToObject(bibContent);
    cites.forEach((cite) => this.add(cite));
  }

  private init() {
    const request = indexedDB.open(this.dbName, 1);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(this.storeName)) {
        db.createObjectStore(this.storeName, { keyPath: "id" });
      }
    };

    request.onsuccess = (event: Event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
    };

    request.onerror = (event) => {
      console.error(
        "IndexedDB error:",
        (event.target as IDBOpenDBRequest).error,
      );
    };
  }

  private getStore(mode: IDBTransactionMode): IDBObjectStore | null {
    if (!this.db) {
      console.error("Database not initialized");
      return null;
    }

    const transaction = this.db.transaction(this.storeName, mode);
    return transaction.objectStore(this.storeName);
  }

  getAll(): Cite[] {
    const store = this.getStore("readonly");
    if (!store) return [];

    const request = store.getAll();
    return this.blockingRequest(request) as Cite[];
  }

  get(key: string): Cite | undefined {
    const store = this.getStore("readonly");
    if (!store) return undefined;

    const request = store.get(key);
    return this.blockingRequest(request) as Cite | undefined;
  }

  update(key: string, data: Record<string, string>) {
    const cite = this.get(key);
    if (cite) {
      this.add({ ...cite, ...data });
    }
  }

  delete(key: string) {
    const store = this.getStore("readwrite");
    if (store) {
      store.delete(key);
    }
  }

  add(cite: Cite) {
    const store = this.getStore("readwrite");
    if (store) {
      store.put(cite);
    }
  }

  private blockingRequest(request: IDBRequest): any {
    return new Promise((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    }).then((result) => {
      let output: any;
      setTimeout(() => (output = result), 0);
      return output;
    });
  }
}
