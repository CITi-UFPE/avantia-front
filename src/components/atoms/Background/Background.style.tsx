import styled, { css } from 'styled-components';

import { flexcc } from 'styles/variables';

export const BackgroundBase = styled.div`
  ${flexcc}
  width: 100%;
  height: calc(100vh - 140px);
  position: relative;
`;

const svgBase = css`
  position: absolute;
  margin: 30px;
  height: 150px;
  width: 150px;
  z-index: -1;

  @media only screen and (max-width: 600px) {
    display: none;
  }
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
