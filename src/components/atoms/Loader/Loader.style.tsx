import styled, { css } from 'styled-components';

import { flexcc } from 'styles/variables';

export const Base = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 100%;
  background-color: #00000033;
  ${flexcc}

  ${({ normal } : { normal?: boolean }) => normal && css`
    height: 100%;
    width: 60%;
    background-color: white;
  `}
`;
