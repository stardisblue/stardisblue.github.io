type SkillType = {
  name: string;
  content: string[] | string;
};

const skills = [
  {
    name: 'Full-stack',
    content:
      'Web (react-redux, vue-vuex, rxjs, rollup) Back-end (django, express, cakephp) DB (elasticsearch, ELK-stack, neo4j, postgresql)',
  },
  {
    name: 'DevOps',
    content: 'Github, CI/CD, sys. admin. (nginx, apache, ssl), linux',
  },
  {
    name: 'Data Science',
    content:
      'Deep learning (deep, convolutional, graph), machine learning (PCA, random forest), jupyter-nb, keras, scypi, pandas',
  },
  {
    name: 'Languages',
    content:
      'French, English, Russian – Typescript, python, PHP, rust, java, C++',
  },
] satisfies SkillType[];

export default skills;
