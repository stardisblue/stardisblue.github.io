import React from 'react';
import 'tachyons/css/tachyons.min.css';
import '../styles/global.scss';

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
import { HR } from '../components/ui';
import type { PageProps } from 'gatsby';

const IndexPage: React.FC<PageProps> = function ({ location }) {
  return (
    <main id="FC" className="georgia lh-title">
      <Helmet>
        <title>Fati CHEN</title>
      </Helmet>
      <div className="ph2-m mw8 center ">
        <Header />
        <AboutMe />
        <News />
        <Education />
        <Navigation />
        <HR />
        <Publications />
        <Navigation />
        <HR />
        <Presentations />
        <Navigation />
        <HR />
        <Academic />
        <Navigation />
        <HR />
        <Experiences />
        <Navigation />
        <HR />
        <Footer />
      </div>
    </main>
  );
};

export default IndexPage;
