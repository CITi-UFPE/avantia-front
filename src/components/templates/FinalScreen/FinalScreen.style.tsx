import styled from 'styled-components';

import colors from 'styles/colors';
import { flexcc, flex } from 'styles/variables';

import secBackgroundSvg from 'assets/secondary-background.svg';

export const BackgroundBase = styled.div`
  ${flexcc}
  background-image: url(${secBackgroundSvg});
  width: 100%;
  height: 100%;
`;

export const ContentContainer = styled.div`
  ${flex('space-between', 'center', 'column', 'nowrap')}
  background-color: ${colors.white};
  width: 40%;
  height: 100%;
  padding: 60px 50px 10px;

  @media only screen and (max-width: 850px) {
    width: 60%;
  }
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;
