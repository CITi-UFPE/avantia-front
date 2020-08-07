import styled from 'styled-components';

import { border } from 'styles/variables';

export const VideoDisplay = styled.video`
  height: 100%;
  width: 60%;
  object-fit: cover;
  transform: scaleX(-1);
  position: relative;
  ${border}
`;
