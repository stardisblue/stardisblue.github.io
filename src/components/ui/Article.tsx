import React from 'react';
import styled from 'styled-components/macro';

export const Article: React.FC<{ title: any; attrs?: any }> = ({
  title,
  attrs,
  children,
}) => (
  <article {...attrs}>
    <h3 className="f4 helvetica mb2">{title}</h3>
    {children}
  </article>
);
export default Article;
