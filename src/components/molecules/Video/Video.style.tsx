import styled from 'styled-components';

import { border } from 'styles/variables';

export const VideoDisplay = styled.div`
  height: 100%;

  video {
    height: 100%;
    object-fit: cover;
    transform: scaleX(-1);
    position: relative;
    ${border}
  }

  @media only screen and (max-width: 600px) {
    width: 100%;
    height: 70%;

    video {
      width: 100%;
    }
  }
`;
