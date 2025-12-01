import { bibToObject } from "./converter";
import latexToUnicode from "latex-to-unicode";
import { CslItem, CslJson } from "./types/type";
import Cite from "citation-js";

    /**
     * @deprecated
     */
export type CiteLanguage = {
    conjunction: string;
    etal: string;
  };
    /**
     * @deprecated
     */
  export const CiteLangID: CiteLanguage = {
    conjunction: "dan",
    etal: "dkk.",
  };
  
      /**
     * @deprecated
     */
  export const CiteLangEN: CiteLanguage = {
    conjunction: "and",
    etal: "et al.",
  };
  
  export class CiteUtils {
    private cite: CslItem;

    private id?:string
    /**
     * @deprecated
     */
    private static lang: CiteLanguage = CiteLangID;

    constructor(bib:string);
    constructor(cite:CslItem)
    constructor(cite: CslItem|string) {
      if (typeof cite =='string') {
      const csl =    new Cite(cite).data[0] as CslItem;
      this.cite = csl
        
      } else{

        this.cite = cite;
      }
    }

  
    toCite(): string {
      return (new Cite(this.cite)).format("citation",{
        format:"text",
        lang:"id-ID",
        form: 'narrative',
        template:"apa"
      }).replace("&","dan");
    }

    toCiteA(): string {
   const citeString = (new Cite(this.cite)).format("citation",{
     format:"text",
     lang:"id-ID",
     template:"apa"
   });
   

   const noOpenParen = citeString.replace('(', '');
   const commaIndex = noOpenParen.lastIndexOf(', '); 

   const authorPart = noOpenParen.substring(0, commaIndex); 
   const yearPart = noOpenParen.substring(commaIndex + 2).replace(')', ''); 

   return `${authorPart.replace("&","dan")} (${yearPart})`;
}
    setCite(cite: CslItem) {
      this.cite = cite;
      return this;
    }

    getCite():CslItem{
      return this.cite
    }

    setId(id:string):CiteUtils{
      this.id =id
      return this
    }


    getId():string{

      return this.id || this.cite.id
    }
    /**
     * @deprecated
     */
    setMaxAuthors(maxAuthors: number) {
      return this;
    }
  
    static setLang(lang: CiteLanguage) {
      this.lang = lang;
      return this;
    }
  
    getTitle() {
      return this.cite.title || this.cite["original-title"];
    }
    toListItem(){
        const li =  document.createElement('li')
        li.setAttribute('id',this.getId())
        li.classList.add('citation-list-item')

    return li;
    }



    /**
     * 
     * @deprecated
     */
    formatAuthorName(){

     return ""
    }


  }

export const getBibFromDoi = async (doiurl: string): Promise<CslItem> => {
    try {
      const response = await fetch(doiurl, {
        method: "GET",
        headers: {
          Accept: "application/x-bibtex",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return bibToObject(await response.text())[0];
    } catch (error) {
      console.error("Error fetching BibTeX:", error);
      throw new Error("Failed to fetch bib tex.");
    }
  };
  
  