import Citation from "citation-js"
import {  CslJson } from "./types/type";
 
export const objectToBib = (cite: CslJson): string => {
    return  new Citation(cite).format("bibtex",{
      format:"text"
    });
  };
  
export const bibToObject = (bibContent: string):CslJson => {
    try {
          return new Citation(bibContent).data as CslJson
    } catch (e) {
      console.warn("error:",e)
      return []
      
    }

  };
  