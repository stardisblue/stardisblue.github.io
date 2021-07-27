import styled from 'styled-components/macro';
export const HR = styled.hr.attrs({
  className: 'b--silver bn',
})`
  border-bottom-style: solid;
  border-bottom-width: 1px;

  @media print {
    display: none;
  }
`;
export default HR;
