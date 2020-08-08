import styled, { css } from 'styled-components';

import { flexcc, flex } from 'styles/variables';
import colors from 'styles/colors';

export const InfoIcon = styled.img`
  width: 20px;
  margin: 0 5px;
`;

export const InfoContainer = styled.div`
  ${flex('center', 'flex-start', 'column', 'nowrap')}
  margin: 0 60px;
  ${({ disabled }: { disabled: boolean }) => (disabled && css`
    p, h1 {
      color: ${colors.gray};
    }
  `)}
`;

export const TooltipContainer = styled.div`
  ${flexcc}
`;

export const ConnectionContainer = styled.div`
  ${flexcc}
`;

export const ConnectionIcon = styled.img`
  width: 20px;
  margin: 0 5px;
`;
