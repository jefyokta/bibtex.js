import Cite from "citation-js";

import { id } from "./citation-lang/id";

// 2. Daftarkan konten XML LOKALISASI menggunakan fungsi yang benar: addLocale
// Parameter pertama adalah ID lokal ('id-ID'), dan parameter kedua adalah konten XML
// Note: Kita menggunakan ID 'id' saja karena beberapa library CSL memprioritaskan kode bahasa pendek.
Cite.CSL.register.addLocale("id-ID", id);

const bibtexInput = `
@article{Smith2023,
  author = {Smith, John and Doe, Jane}, 
  title = {A Comprehensive Guide to Modern Citation Tools},
  journal = {Journal of Digital Humanities},
  volume = {10},
  issue = {2},
  pages = {45-60},
  year = {2023},
  doi = {10.9999/jdha.2023.10.2.45}
}
`;

const example = new Cite(bibtexInput);

// 3. Gunakan TEMPLATE APA standar, dan set LANG: 'id-ID'
const inTextCitation = example.format("citation", {
  format: "text",
  template: "apa", // <-- Gunakan style APA standar
  lang: "id-ID", // <-- Gunakan locale yang sudah kita daftarkan
});

console.log(`The in-text citation is: ${inTextCitation}`);
