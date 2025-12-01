import { Cite } from "./index";
import Dexie, { Table } from "dexie";

export interface CiteStorage {
  getAll(): Cite[] | Promise<Cite[]>;
  get(key: string): Cite | Promise<Cite> |undefined;
  update(key: string, data: Partial<Cite>): void | Promise<void>;
  remove(key: string): void | Promise<void>;
  add(cite: Cite): void | Promise<void>;
}

export interface CiteStorageConstructor<T>{
    new(bibContent?:string|Cite[]):CiteStorage;
    fromObject(cites:Cite[]):T;
    fromBib(cites:string):T;

}

export class CiteLocalStorage implements CiteStorage {
  constructor(bibContent?: string | Cite[]) {
    if(bibContent){
      let cites = bibContent;
      if (typeof bibContent == 'string') {
        //  cites = bibToObject(bibContent);
      }
      localStorage.setItem("cites", JSON.stringify(cites));
    }
  }
  static fromObject(cites:Cite[]){
    return new CiteLocalStorage(cites)

  }
  getAll() {
    const cs = localStorage.getItem("cites");
    const cites: Cite[] = JSON.parse(cs || "[]");
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

  remove(key: string) {
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

export class CiteIndexDB extends Dexie implements CiteStorage {
  cites!: Table<Cite, string>;

  constructor() {
    super("CiteDB");
    this.version(1).stores({
      cites: "id",
    });

    this.cites = this.table("cites");

  }

  static async create(bibContent?: string | Cite[]){
    const db = new CiteIndexDB;
    await db.init(bibContent);
    return db;

  }

  static fromObject(cites: Cite[]) {
    return  CiteIndexDB.create(cites);
  }

  static fromBib(bib: string) {
    // return  CiteIndexDB.create(bibToObject(bib));
  }

  private async init(bibContent?: string | Cite[]) {
    if (bibContent) {
      let cites = bibContent;
      if (typeof cites === "string") {
        // cites = bibToObject(cites);
      }
      await this.cites.bulkPut(cites as Cite[]);
    }
  }
 async getAll(): Promise<Cite[]> {
    return await this.cites.toArray();
  }

 async get(key: string): Promise<Cite | undefined> {

  return await this.cites.get(key)
  }

 async  update(key: string, data: Cite) {
  this.cites.put(data,key)
    
  }

 async remove(key: string) {
  await  this.cites.delete(key); 
  }

 async add(cite: Cite) {
   await this.cites.put(cite); 
  }
}