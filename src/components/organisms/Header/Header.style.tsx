import styled from 'styled-components';

import { flexcc } from 'styles/variables';

export const Base = styled.header`
  ${flexcc}
  justify-content: space-around;
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 5rem;

  border-bottom: 1px solid #B2B2B2;
`;