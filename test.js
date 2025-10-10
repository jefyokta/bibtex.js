import { CiteUtils } from "./src";
import {bibToObject} from "./src/converter"
const bib = `@article{lee2023neural,
  author    = {David Lee and Sarah Kim and jefy okta},
  title     = {Neural Network Optimization for Real-Time Edge Computing},
  journal   = {IEEE Transactions on Neural Networks and Learning Systems},
  year      = {2023},
  volume    = {34},
  number    = {7},
  pages     = {2891--2905},
  doi       = {10.1109/TNNLS.2023.1234567},
  publisher = {IEEE}
}
`
// const bib = `
// @article{li2024flora,
//   title={The FLoRA Engine: Using Analytics to Measure and Facilitate Learners' own Regulation Activities},
//   journal={arXiv preprint arXiv:2412.09763},
//   year={2024}
// }`;



const cite = bibToObject(bib)[0];
console.log(new CiteUtils(cite).toCite())

