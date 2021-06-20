import React from 'react';
import { GH } from './URL';
import { TOC } from './TOC';
import { A, Collapsible, Links } from './ui';
import { Observable } from './icons';

export const Header: React.FC = () => (
  <header>
    <h1 className="helvetica mb0">Fati CHEN</h1>
    <h2 className="f4 i normal mb3 mt0">
      Ph.D. Student in Visual Analytics <span className="fs-normal">📊</span>
    </h2>

    <div className="flex flex-wrap justify-between">
      <Links>
        {(cls) => (
          <>
            <A
              href="mailto:fati.chen@lirmm.fr"
              title="fati.chen@lirmm.fr"
              className={cls}
            >
              ✉ fati.chen@lirmm.fr
            </A>
            <GH gh="stardisblue" className={cls} />
            <A
              href="https://observablehq.com/@stardisblue"
              title="@stardisblue"
              className={cls}
            >
              <Collapsible title="@stardisblue" className="items-baseline">
                <Observable />
              </Collapsible>
            </A>
          </>
        )}
      </Links>
      <TOC show={false} />
    </div>
    <hr />
  </header>
);
