import {CiteUtils} from "./src/index"

const r =new CiteUtils(`@article{li2024flora,
  title={The FLoRA Engine: Using Analytics to Measure and Facilitate Learners' own Regulation Activities},
  author={Li, Xinyu and Fan Lyn},
  journal={arXiv preprint arXiv:2412.09763},
  year={2024}
}`).toCiteA()

console.log(r)