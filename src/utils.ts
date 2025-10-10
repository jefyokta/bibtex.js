import { Cite } from "./index";
import { bibToObject } from "./converter";
import latexToUnicode from "latex-to-unicode";

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
    private maxAuthors = 2;
  
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

    getCite():Cite{
      return this.cite
    }
    getId():string{

      return this.cite.id
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
      console.log(this.cite.data.title)
      return latexToUnicode(this.cite.data.title);
    }
    toListItem(){
        const li =  document.createElement('li')
        li.setAttribute('id',this.getId())
        li.classList.add('citation-list-item')

    return li;
    }
    private parseAuthorObject(authors: { given?: string; family?: string }[]): string {
      return authors
        ?.map(a => {
          const family = a.family?.trim() || "";
          const given = a.given?.trim() || "";
          return family && given ? `${family}, ${given}` : family || given;
        })
        .filter(Boolean)
        .join(" and ");
    }

    formatAuthorname(): string {
    const authors = this.cite?.data?.author;
    if (!authors) return this.getTitle();

    const names = typeof authors === "object"
      ? this.parseAuthorObject(authors)
      : authors;

    const arr = names
      .split(" and ")
      .map(n => {
        n = n.trim();
        if (!n) return "";
        if (n.includes(",")) {
          const [family] = n.split(",").map(s => s.trim());
          return latexToUnicode(family);
        }
        const parts = n.split(" ");
        return latexToUnicode(parts[parts.length - 1]);
      })
      .filter(Boolean);

    if (arr.length === 0) return this.getTitle();

    if (arr.length > this.maxAuthors) {
      return `${arr.slice(0, this.maxAuthors).join(", ")} ${CiteUtils.lang.etal}`;
    }
    if (arr.length === 1) {
      return arr[0];
    }

    const lastAuthor = arr.pop();
    return arr.join(", ").concat(` ${CiteUtils.lang.conjunction} ${lastAuthor}`);
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
  
  