import React from 'react';
import 'tachyons/css/tachyons.min.css';
import { Helmet } from 'react-helmet';
import { AboutMe } from './AboutMe';
import { Academic } from './Academic';
import { Education } from './Education';
import { Experiences } from './Experiences';
import { Header } from './Header';
import { Presentations } from './Presentations';
import { Publications } from './Publications';
import { TOC } from './TOC';
import { GH } from './GH';

const Navigation: React.FC = () => (
  <div className="flex flex-wrap justify-end">
    <em className="gray mr2">Navigation</em>
    <TOC />
  </div>
);

const IndexPage: React.FC = () => (
  <main className="mw7 center georgia lh-title">
    <Helmet>
      <title>Fati CHEN</title>
    </Helmet>
    <Header />
    <AboutMe />
    <Navigation />
    <Education />
    <Navigation />
    <Publications />
    <Navigation />
    <Presentations />
    <Navigation />
    <Academic />
    <Navigation />
    <Experiences />
    <Navigation />
    <footer>
      2021 &mdash; Made with 💖 with Gatsby{' '}
      <GH gh="stardisblue/stardisblue.github.io" className="inline-flex" />
    </footer>
  </main>
);

export default IndexPage;
