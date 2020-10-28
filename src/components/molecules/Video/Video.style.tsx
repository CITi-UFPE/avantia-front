import styled from 'styled-components';

import { border } from 'styles/variables';

export const VideoDisplay = styled.div`
  width: 100%;
  max-height: 100%;

  video {
    width: 100%;
    max-height: 100%;
    object-fit: cover;
    transform: scaleX(-1);
    position: relative;
    ${border}
  }
`;

export const BrowserContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
`;
