import styled, { css } from 'styled-components';

import { flexcc } from 'styles/variables';

export const BackgroundBase = styled.div`
  ${flexcc}
  width: 100%;
  flex-grow: 1;
  flex-shrink: 1;
  position: relative;
`;

const svgBase = css`
  position: absolute;
  margin: 30px;
  height: 150px;
  width: 150px;
`;

export const BackgroundLeft = styled.img`
  ${svgBase}
  bottom: 0;
  left: 0;
`;

export const BackgroundRight = styled.img`
  ${svgBase}
  top: 0;
  right: 0;
`;
