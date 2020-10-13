import styled from 'styled-components';

import { flex } from 'styles/variables';
import colors from 'styles/colors';

export const VideoBase = styled.div`
  width: 50%;
  height: 100%;
  padding: 5px;
  border: 1px solid ${colors.secondaryBackground};

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 90%;
  object-fit: contain;
`;

export const ControlsContainer = styled.div`
  ${flex('space-between', 'center', 'row', 'nowrap  ')}
`;

export const PlayButton = styled.button`
  background-color: transparent;
  border: 0;
  padding: 0;
  outline: none;
  cursor: pointer;
  margin: 5px 10px;
`;

export const PlayIcon = styled.img`
  width: 10px;
`;
