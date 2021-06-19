import React, { HTMLAttributes, useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

export const Collapsible: React.FC<
  HTMLAttributes<HTMLSpanElement> & { title: any; className?: string }
> = ({ title, children, className = '', ...props }) => {
  const $title = useRef<HTMLSpanElement>(null as any);

  const [pointerEvents, setPointerEvents] = useState({
    onPointerEnter: undefined,
    onPointerLeave: undefined,
  });

  useEffect(() => {
    const _text = d3.select($title.current).style('width', null);
    const size = $title.current.offsetWidth;
    _text
      .style('width', '0px')
      .style('padding-left', '0rem')
      .style('opacity', '0');

    setPointerEvents({
      onPointerEnter: () => {
        _text
          .transition()
          .delay(50)
          .style('width', size + 'px')
          .style('padding-left', '0.25rem')
          .style('opacity', '1');
      },
      onPointerLeave: () => {
        _text
          .interrupt()
          .transition()
          .delay(300)
          .duration(1000)
          .style('width', '0px')
          .style('padding-left', '0rem')
          .style('opacity', '0');
      },
    });
    //eslint-disable-next-line
  }, [title]);

  return (
    <span className={'flex ' + className} {...pointerEvents} {...props}>
      {children}
      <span ref={$title} className="overflow-hidden nowrap">
        {title}
      </span>
    </span>
  );
};
