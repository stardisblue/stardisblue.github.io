import React from 'react';
import styled from 'styled-components/macro';

export const Article: React.FC<{
  title?: any;
  titleSize?: string;
  attrs?: any;
}> = ({ title, titleSize = 'f4', attrs, children }) => (
  <article {...attrs}>
    {title && <h3 className={titleSize + ' helvetica mb2'}>{title}</h3>}
    {children}
  </article>
);
export default Article;
