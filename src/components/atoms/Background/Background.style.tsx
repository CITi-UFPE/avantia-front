import styled, { css } from 'styled-components';

import { flexcc } from 'styles/variables';

import { ReactComponent as SvgLeft } from 'assets/background-left.svg';
import { ReactComponent as SvgRight } from 'assets/background-right.svg';

export const BackgroundBase = styled.div`
  ${flexcc}
  width: 100%;
  flex-grow: 1;
  position: relative;
`;

const svgBase = css`
  position: absolute;
  margin: 30px;
  height: 150px;
  width: 150px;
`;

export const BackgroundLeft = styled(SvgLeft)`
  ${svgBase}
  bottom: 0;
  left: 0;
`;

export const BackgroundRight = styled(SvgRight)`
  ${svgBase}
  top: 0;
  right: 0;
`;
