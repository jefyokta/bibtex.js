  import { id } from "./lang";
  import  CiteCJS from "citation-js";
  CiteCJS.CSL.register.addLocale("id-ID",id)
  
  /**
   * @deprecated
   */
export type Cite = {
    id: string;
    type: string;
    data: Record<string, string>;
    original:string
  };


  export { CiteManager } from "./cite";
  export * from "./cite-storage";
  export * from "./converter";
  export * from "./utils";
  