
declare module "citation-js" {

    interface FormatOptions {
        format?: 'html' | 'text' | 'json';
        template?: string; 
        lang?: string;     
        entry?: string | string[]; 
        form?:string
    }
    interface CSLItem {
      id: string
      type: CslType
      title?: string
      "container-title"?: string
      "collection-title"?: string
      abstract?: string
      keyword?: string
      note?: string
      volume?: string | number
      issue?: string | number
      page?: string
      year?: string | number
      month?: string | number
      day?: string | number
      publisher?: string
      "publisher-place"?: string
      DOI?: string
      ISBN?: string
      ISSN?: string
      URL?: string
      language?: string
      edition?: string | number
      author?: CslName[]
      editor?: CslName[]
      translator?: CslName[]
      "reviewed-author"?: CslName[]
      "collection-editor"?: CslName[]
      "recipient"?: CslName[]
      "original-author"?: CslName[]
      "original-title"?: string
      "original-date"?: CslDate
      "issued"?: CslDate
      "accessed"?: CslDate
      "event-title"?: string
      "event-place"?: string
      "number"?: string | number
      "chapter-number"?: string | number
      "citation-number"?: string | number
      "source"?: string
      "status"?: string
      "reference-count"?: number
      "references"?: CslItem[]
    
      [key: string]: any
    }

     type CslJson = CslItem[]

 interface CslItem {
  id: string
  type: CslType
  title?: string
  "container-title"?: string
  "collection-title"?: string
  abstract?: string
  keyword?: string
  note?: string
  volume?: string | number
  issue?: string | number
  page?: string
  year?: string | number
  month?: string | number
  day?: string | number
  publisher?: string
  "publisher-place"?: string
  DOI?: string
  ISBN?: string
  ISSN?: string
  URL?: string
  language?: string
  edition?: string | number
  author?: CslName[]
  editor?: CslName[]
  translator?: CslName[]
  "reviewed-author"?: CslName[]
  "collection-editor"?: CslName[]
  "recipient"?: CslName[]
  "original-author"?: CslName[]
  "original-title"?: string
  "original-date"?: CslDate
  "issued"?: CslDate
  "accessed"?: CslDate
  "event-title"?: string
  "event-place"?: string
  "number"?: string | number
  "chapter-number"?: string | number
  "citation-number"?: string | number
  "source"?: string
  "status"?: string
  "reference-count"?: number
  "references"?: CslItem[]

  [key: string]: any
}

 interface CslName {
  family?: string
  given?: string
  "dropping-particle"?: string
  "non-dropping-particle"?: string
  particle?: string
  suffix?: string
  literal?: string
  "static-ordering"?: boolean
}

 interface CslDate {
  "date-parts"?: (string | number)[][]
  literal?: string
  raw?: string
  season?: string | number
  circa?: boolean
}

 interface CslNameWithAffiliation extends CslName {
  affiliation?: CslAffiliation[]
}

 interface CslAffiliation {
  name?: string
  address?: string
  city?: string
  region?: string
  country?: string
  postalCode?: string
}

 type CslType =
  | "article"
  | "article-journal"
  | "article-magazine"
  | "article-newspaper"
  | "book"
  | "chapter"
  | "paper-conference"
  | "entry-encyclopedia"
  | "entry-dictionary"
  | "thesis"
  | "webpage"
  | "post-weblog"
  | "report"
  | "manuscript"
  | "legislation"
  | "bill"
  | "patent"
  | "review"
  | "review-book"
  | "personal_communication"
  | "speech"
  | "interview"
  | "motion_picture"
  | "graphic"
  | "dataset"
  | "software"
  | "map"
  | "musical_score"

 type CslName = CslName | CslNameWithAffiliation


    class Cite {
        constructor(data?: string | CslJson | (string | object)[] | null | CSLItem);

        public data: CslJson;

        public format(
            type: 'citation' | 'bibliography' | 'data'|"bibtex",
            options?: FormatOptions
        ): string;
        
        public add(data: string | object | (string | object)[]): this;

        public static CSL: {
            register: {
                addLocale(lang: string, xmlString: string): void;

                addTemplate(id: string, xmlString: string): void;
            };
        };
    }

    export default Cite;
}

