type SkillType = {
  name: string;
  content: string[] | string;
};

const skills: SkillType[] = [
  {
    name: 'Full-stack',
    content:
      'Web (react-redux, vue-vuex, rxjs, rollup) Back-end (django, express, cakephp) DB (elasticsearch, ELK-stack, neo4j, postgresql)',
  },
  {
    name: 'DevOps',
    content: 'Github, CI/CD, admin. système (nginx, apache, ssl), linux',
  },
  {
    name: 'Data Science',
    content:
      'Deep learning (deep, convolutional, graph), machine learning (PCA, random forest), jupyter-nb, keras, scypi, pandas',
  },
  {
    name: 'Langues',
    content:
      'Français, Anglais, Russe – Typescript, python, PHP, rust, java, C++',
  },
];

export default skills;
