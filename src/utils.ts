import { bibToObject } from "./converter";

export type CiteLanguage = {
    conjunction: string;
    etal: string;
  };
  
  export const CiteLangID: CiteLanguage = {
    conjunction: "dan",
    etal: "dkk.",
  };
  
  export const CiteLangEN: CiteLanguage = {
    conjunction: "and",
    etal: "et al.",
  };
  
  export class CiteUtils {
    private cite: Cite;
    private static lang: CiteLanguage = CiteLangID;
    private maxAuthors = 5;
  
    constructor(cite: Cite) {
      this.cite = cite;
    }
    toCiteA(): string {
      return `${this.formatAuthorname()} (${this.cite.data.year})`;
    }
    toCite(): string {
      return `(${this.formatAuthorname()}, ${this.cite.data.year})`;
    }
    setCite(cite: Cite) {
      this.cite = cite;
      return this;
    }
  
    setMaxAuthors(maxAuthors: number) {
      this.maxAuthors = maxAuthors;
      return this;
    }
  
    static setLang(lang: CiteLanguage) {
      this.lang = lang;
      return this;
    }
  
    getTitle() {
      return this.cite.data.title;
    }
  
    formatAuthorname() {
      const names = this.cite.data.author;
      if (!names) return "";
  
      if (!names.includes(" and ")) {
        return names.split(",")[0] || names;
      }
  
      const arr = names.split(" and ");
      const nameArray = arr.map((name) => {
        if (name.includes(",")) {
          const nameParts = name.split(",");
          return ` ${nameParts[0]}`.trim();
        }
        return name;
      });
  
      if (nameArray.length > this.maxAuthors) {
        return nameArray.slice(0, 5).join(", ") + " " + CiteUtils.lang.etal;
      }
  
      if (nameArray.length > 1) {
        return (
          nameArray.slice(0, -1).join(", ") +
          ` ${CiteUtils.lang.conjunction} ` +
          nameArray[nameArray.length - 1]
        );
      }
  
      return names;
    }
  }

export const getBibFromDoi = async (doiurl: string): Promise<Cite> => {
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
  
  