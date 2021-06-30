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
import styled from 'styled-components/macro';

const Main = styled.main`
  background-color: #f4f4f4;
  color: #111;
`;

const IndexPage: React.FC = function () {
  return (
    <Main id="FC" className="georgia lh-title pv3">
      <Helmet>
        <title>Fati CHEN</title>
      </Helmet>
      <div className="ph2-m mw8 center ">
        <Header />
        <AboutMe />
        <News />
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
      </div>
    </Main>
  );
};

export default IndexPage;
