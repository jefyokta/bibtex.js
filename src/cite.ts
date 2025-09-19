import { bibToObject, objectToBib } from "./converter";
import type { CiteStorage } from "./cite-storage";
import { CiteUtils, getBibFromDoi } from "./utils";
import { Cite } from "./index";

 class CiteManager {
  private static storage: CiteStorage;

  static init(storage: CiteStorage) {
    return new CiteManager(storage)
 
  }

  static create(storage: CiteStorage){
    return this.init(storage)
  }

  constructor(storage:CiteStorage){
    CiteManager.storage = storage;
  }

  static getAll(): CiteUtils[] {
    return this.storage.getAll().map(c=>new CiteUtils(c));
  }

  static get(key: string): CiteUtils | undefined {
    const c =this.storage.get(key);
    return c ? new CiteUtils(c) : undefined;
  }

  static update(key: string, data: Cite & Record<string, string>) {
    this.storage.update(key, data);
 
  }

  static delete(key: string) {
  
    this.storage.delete(key);
 
  }

  static add(cite: Cite) {
  
    this.storage.add(cite);
 
  }

  static async addFromDoi(url:string){

  const cite =  await getBibFromDoi(url)
  this.add(cite)

  }

  static toBib(): string {
  
    return objectToBib(this.getAll().map(c=>c.getCite()));
  }
  static getStorage():CiteStorage{

    return this.storage;
  }
}


export {CiteManager}