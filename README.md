# bibtex.js

**bibtex.js** is a JavaScript library for converting BibTeX entries into JavaScript objects and managing them with simple storage features.

## ✨ Features

- Convert BibTeX to JavaScript objects
- Convert JavaScript objects back to BibTeX
- Citation management with custom storage
- Supports browsers and other JavaScript environments

## 📦 Installation

Using **Bun**:
```sh
bun add bibtex.js
```

Using **npm**:
```sh
npm install bibtex.js
```

## 🚀 Usage

### 1. Convert BibTeX to Object and Vice Versa

```ts
import { bibToObject, objectToBib } from "bibtex.js";

const bibtexEntry = `@article{sample,
  author = {John Doe},
  title = {Example Article},
  journal = {Sample Journal},
  year = {2024}
}`;

const cite = bibToObject(bibtexEntry);
console.log(cite);  // JavaScript object from BibTeX entry

const bib = objectToBib(cite);
console.log(bib);  // Converts back to BibTeX format
```

### 2. Citation Storage Management

You can use the built-in storage or define your own to store BibTeX citations.

#### Using Built-in Storage

```ts
import { CiteManager } from "bibtex.js";
const bibtexEntry = `@article{sample,
  author = {John Doe},
  title = {Example Article},
  journal = {Sample Journal},
  year = {2024}
}`;
CiteManager.init(new CiteLocalStorage(bibtexEntry))

//will returned as  Cite[]
CiteManager.getAll()


```

## 📜 License

This project is licensed under the MIT License.

