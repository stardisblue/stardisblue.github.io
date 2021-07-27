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
import { PageProps } from 'gatsby';
import { useState } from 'react';
import { useEffect } from 'react';

const defaultOrder = [
  <Education key="edu" />,
  <Navigation key="edu-nav" />,
  <HR key="edu-hr" />,
  <Publications key="pub" />,
  <Navigation key="pub-nav" />,
  <HR key="pub-hr" />,
  <Presentations key="pres" />,
  <Navigation key="pres-nav" />,
  <HR key="pres-hr" />,
  <Academic key="aca" />,
  <Navigation key="aca-nav" />,
  <HR key="aca-hr" />,
  <Experiences key="exp" />,
];

const privateOrder = [
  <Experiences key="exp" />,
  <Navigation key="exp-nav" />,
  <HR key="exp-hr" />,
  <Education key="edu" />,
  <Navigation key="edu-nav" />,
  <HR key="edu-hr" />,
  <Academic key="aca" />,
  <Navigation key="aca-nav" />,
  <HR key="aca-hr" />,
  <Presentations key="pres" />,
  <Navigation key="pres-nav" />,
  <HR key="pres-hr" />,
  <Publications key="pub" />,
];

const IndexPage: React.FC<PageProps> = function ({ location }) {
  const [order, setOrder] = useState(defaultOrder);

  useEffect(() => {
    if (location.search === '?p') {
      setOrder(privateOrder);
    } else {
      setOrder(defaultOrder);
    }
  }, [location.hash]);

  return (
    <main id="FC" className="georgia lh-title">
      <Helmet>
        <title>Fati CHEN</title>
      </Helmet>
      <div className="ph2-m mw8 center ">
        <Header />
        <AboutMe />
        <News />
        {order}
        <Navigation />
        <HR />
        <Footer />
      </div>
    </main>
  );
};

export default IndexPage;
