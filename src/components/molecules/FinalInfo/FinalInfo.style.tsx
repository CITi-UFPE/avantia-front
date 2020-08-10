import styled from 'styled-components';

import { flexcc, flex } from 'styles/variables';

export const InfoContainer = styled.div`
  ${flexcc}
  flex-direction: column;
`;

export const IconContainer = styled.div`
  ${flex('space-between', 'center', 'row', 'nowrap')}
  margin: 20px 0;
  width: 250px;

  @media only screen and (max-width: 600px) {
    width: 150px;
  }
`;
