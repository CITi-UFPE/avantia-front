import styled from 'styled-components';

import { flexcc, flex } from 'styles/variables';

export const InfoIcon = styled.img`
  width: 20px;
  margin: 0 5px;
`;

export const InfoContainer = styled.div`
  ${flex('center', 'flex-start', 'column', 'nowrap')}
  margin: 0 60px;
`;

export const TooltipContainer = styled.div`
  ${flexcc}
`;

export const ConnectionContainer = styled.div``;

export const ConnectionIcon = styled.img`
  width: 50px;
`;
