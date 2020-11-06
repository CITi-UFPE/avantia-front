import styled, { css } from 'styled-components';

import { flexcc } from 'styles/variables';

export const BackgroundBase = styled.div`
  ${flexcc}
  width: 100%;
  height: calc(100vh - 140px);
  flex-grow: 1;
  flex-flow: column;
  position: relative;

  @media only screen and (max-width: 700px) {
    min-height: calc(100vh - ${({ mobileHigher }: { mobileHigher: boolean }) => (mobileHigher ? '200px' : '160px')});
  }
`;

const svgBase = css`
  position: absolute;
  margin: 30px;
  height: 150px;
  width: 150px;
  z-index: -1;
  top: 50%;
  transform: translateY(-50%);

  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

export const BackgroundLeft = styled.img`
  ${svgBase}
  left: 0;
`;

export const BackgroundRight = styled.img`
  ${svgBase}
  right: 0;
`;
