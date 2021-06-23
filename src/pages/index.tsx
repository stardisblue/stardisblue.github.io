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
import { Navigation } from '../components/TableOfContent';
import { Footer } from '../components/Footer';
import { News } from '../components/News';

const IndexPage: React.FC = () => (
  <main id="FC" className="mw8 center georgia lh-title ph2-m mb3">
    <Helmet>
      <title>Fati CHEN</title>
    </Helmet>
    <Header />
    <AboutMe />
    <News />
    <hr />
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
    <Footer />
  </main>
);

export default IndexPage;
