import styled from 'styled-components';

import { flex, flexcc } from 'styles/variables';
import colors from 'styles/colors';

export const AccessCounterContainer = styled.div`
  background-color: ${colors.blue};
  width: 30px;
  height: 30px;
  ${flexcc}
`;

export const Base = styled.footer`
  ${flex('center', 'center', 'column', 'nowrap')}

  width: 100%;
  min-height: 5rem;

  border-top: 1px solid ${colors.secondaryBackground};

  p {
    width: max-content;
  }
`;
