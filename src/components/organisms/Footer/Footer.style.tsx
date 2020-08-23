import styled from 'styled-components';

import colors from 'styles/colors';

export const Base = styled.footer`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;

  width: 100%;
  min-height: 5rem;

  border-top: 1px solid ${colors.secondaryBackground};

  @media only screen and (max-width: 600px) {
    grid-template-columns: 0fr 2fr 1fr;
  }
`;
