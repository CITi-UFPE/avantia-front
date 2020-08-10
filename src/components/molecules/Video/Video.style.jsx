import styled from 'styled-components';

import { border } from 'styles/variables';

export const VideoDisplay = styled.video`
  height: 100%;
  width: 80%;
  object-fit: cover;
  transform: scaleX(-1);
  position: relative;
  ${border}

  @media only screen and (max-width: 600px) {
    width: 100%;
    height: 70%;
  }
`;
