import styled from 'styled-components';

import { flexcc } from 'styles/variables';
import colors from 'styles/colors';

export const Base = styled.footer`
  ${flexcc}
  justify-content: flex-end;

  width: 100%;
  min-height: 5rem;

  border-top: 1px solid ${colors.secondaryBackground};
`;
