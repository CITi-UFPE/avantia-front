import styled from 'styled-components';

import { flexcc } from 'styles/variables';
import colors from 'styles/colors';

export const Base = styled.header`
  ${flexcc}
  justify-content: space-around;

  width: 100%;
  height: 5rem;

  border-bottom: 1px solid ${colors.secondaryBackground};
`;

export const WhatsappIcon = styled.img`
  width: 15px;
  margin-left: 10px;

  @media only screen and (max-width: 600px) {
    margin: 0;
  }
`;

export const Text = styled.p`
  margin: 0;
  display: inline;

  @media only screen and (max-width: 600px) {
    display: none;
  }
`;
