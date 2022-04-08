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
import { Footer } from '../components/Footer';
import { News } from '../components/News';
import {
  subtitle,
  aboutme,
  experiences,
  education,
  academics,
  presentations,
  publications,
} from '../lang/fr';

const IndexPage: React.FC = function () {
  return (
    <main id="FC" className="georgia lh-title">
      <Helmet>
        <title>Fati CHEN</title>
      </Helmet>
      <div className="ph2-m mw8 center ">
        <Header subtitle={subtitle} />
        <AboutMe {...aboutme} />
        {/* <Keywords /> */}
        <News />
        <Experiences {...experiences} />
        <Academic {...academics} />
        <Education {...education} />
        <Presentations {...presentations} />
        <Publications {...publications} />
        <Footer />
      </div>
    </main>
  );
};

export default IndexPage;
