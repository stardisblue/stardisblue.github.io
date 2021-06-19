import React from 'react';
import 'tachyons/css/tachyons.min.css';
import { Helmet } from 'react-helmet';
import { AboutMe } from '../components/AboutMe';
import { Academic } from '../components/Academic';
import { Education } from '../components/Education';
import { Experiences } from '../components/Experiences';
import { Header } from '../components/Header';
import { Presentations } from '../components/Presentations';
import { Publications } from '../components/Publications';
import { GH } from '../components/GH';
import { Navigation } from '../components/Navigation';

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
