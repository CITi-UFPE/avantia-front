import styled from 'styled-components';

import { flex } from 'styles/variables';
import colors from 'styles/colors';

export const Base = styled.footer`
  ${flex('space-between', 'center', 'row', 'nowrap')}

  width: 100%;
  min-height: 5rem;
  padding: 0 100px;

  border-top: 1px solid ${colors.secondaryBackground};

  @media only screen and (max-width: 600px) {
    padding: 0;
    ${flex('space-evenly', 'center', 'row', 'nowrap')}
  }
`;

export const ButtonIcon = styled.img`
  width: 8px;
  margin-right: 10px;

  @media only screen and (max-width: 600px) {
    margin: 0;
  }
`;

export const ShareIcon = styled.img`
  width: 12px;
  margin-left: 10px;

  @media only screen and (max-width: 600px) {
    margin: 0;
  }
`;
