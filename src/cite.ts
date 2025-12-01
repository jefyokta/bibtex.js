import { bibToObject, objectToBib } from "./converter";
import type { CiteStorage } from "./cite-storage";
import { CiteUtils, getBibFromDoi } from "./utils";
type Awaitable<T> = T | Promise<T>;

/**
 * @deprecated
 */
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

static getAll(): Awaitable<CiteUtils[]> {
  const result = this.storage.getAll();
  return []
}

  static get(key: string): Awaitable<CiteUtils> | undefined {
    const c =this.storage.get(key);
    return  undefined
  }

  static update(key: string, data: Record<string, string>) {
   const res = this.storage.update(key, data);
   if (res instanceof Promise) {
    res.then(()=>{})    
   }
 
  }

  static delete(key: string) {
  
    const res =this.storage.remove(key)
    res instanceof Promise && res.then(()=>{})
 
  }

  static add(cite: any) {
  const res =  this.storage.add(cite)
  res instanceof Promise && res.then(()=>{})

 
  }

  static async addFromDoi(url:string){

      const cite =  await getBibFromDoi(url)
      this.add(cite)

  }

 static toBib(): Awaitable<string> {
  const cites = this.getAll();

  if (cites instanceof Promise) {
    // return cites.then(list => objectToBib(list.map(c => c.getCite())));
  }
  // const result = objectToBib(cites.map(c => c.getCite()));
  return '';
}

  static getStorage():CiteStorage{

    return this.storage;
  }


}


export {CiteManager}